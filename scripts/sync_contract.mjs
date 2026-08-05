import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cacheRoot = path.join(repositoryRoot, ".cache", "contracts");
const allowedPath = /^(?:reference\.config\.json|targets\/shared\.d\.ts|targets\/[a-z0-9][a-z0-9-]{0,63}\/(?:api\.d\.ts|metadata\.json|tsconfig\.json))$/;
const maxFiles = 64;
const maxSize = 16 * 1024 * 1024;

export const syncContract = async () => {
  if (process.env.M2O_CONTRACT_ROOT) return path.resolve(process.env.M2O_CONTRACT_ROOT);
  const apiRoot = (process.env.M2O_SERVICES_API_URL || "https://api.mafiahub.dev").replace(/\/graphql\/?$/, "").replace(/\/$/, "");
  const channel = process.env.M2O_CONTRACT_CHANNEL ?? "testing";
  const requestedRevision = process.env.M2O_CONTRACT_REVISION;
  const manifestUrl = requestedRevision
    ? `${apiRoot}/documentation-contracts/m2o/releases/${requestedRevision}/manifest.json`
    : `${apiRoot}/documentation-contracts/m2o/${channel}/manifest.json`;
  const response = await fetch(manifestUrl);
  if (!response.ok) throw new Error(`Unable to download scripting contract manifest (${response.status}) from ${manifestUrl}`);
  const manifest = await response.json();
  if (manifest.schemaVersion !== 1 || manifest.slug !== "m2o" || manifest.channel !== channel || !/^[a-f0-9]{64}$/.test(manifest.revision ?? "") || !Array.isArray(manifest.files)) throw new Error("Services returned an invalid scripting contract manifest");
  if (requestedRevision && manifest.revision !== requestedRevision) throw new Error("Services returned a different scripting contract revision");
  if (!manifest.files.length || manifest.files.length > maxFiles || manifest.files.reduce((total, file) => total + (file.size ?? 0), 0) > maxSize || manifest.files.some((file) => !allowedPath.test(file.path ?? "") || !/^[a-f0-9]{64}$/.test(file.sha256 ?? "") || !Number.isSafeInteger(file.size) || file.size < 0)) throw new Error("Scripting contract manifest contains invalid files");
  const paths = new Set(manifest.files.map((file) => file.path));
  if (paths.size !== manifest.files.length || !paths.has("reference.config.json") || !paths.has("targets/shared.d.ts")) throw new Error("Scripting contract manifest is incomplete");
  const targets = new Set([...paths].filter((file) => file.startsWith("targets/") && file !== "targets/shared.d.ts").map((file) => file.split("/")[1]));
  if (!targets.size || [...targets].some((target) => !["api.d.ts", "metadata.json", "tsconfig.json"].every((file) => paths.has(`targets/${target}/${file}`)))) throw new Error("Scripting contract targets are incomplete");

  await mkdir(cacheRoot, { recursive: true });
  const destination = path.join(cacheRoot, manifest.revision);
  const existing = await readFile(path.join(destination, "manifest.json"), "utf8").then(JSON.parse).catch(() => null);
  if (existing?.revision === manifest.revision) {
    const valid = await Promise.all(manifest.files.map(async (file) => {
      const body = await readFile(path.join(destination, file.path)).catch(() => null);
      return body && body.length === file.size && createHash("sha256").update(body).digest("hex") === file.sha256;
    }));
    if (valid.every(Boolean)) return destination;
  }

  const temporary = await mkdtemp(path.join(cacheRoot, "download-"));
  try {
    for (const file of manifest.files) {
      const fileUrl = `${apiRoot}/documentation-contracts/m2o/releases/${manifest.revision}/files/${file.path.split("/").map(encodeURIComponent).join("/")}`;
      const fileResponse = await fetch(fileUrl);
      if (!fileResponse.ok) throw new Error(`Unable to download ${file.path} (${fileResponse.status})`);
      const body = Buffer.from(await fileResponse.arrayBuffer());
      if (body.length !== file.size || createHash("sha256").update(body).digest("hex") !== file.sha256) throw new Error(`Contract integrity check failed for ${file.path}`);
      const output = path.join(temporary, file.path);
      await mkdir(path.dirname(output), { recursive: true });
      await writeFile(output, body);
    }
    await writeFile(path.join(temporary, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
    await rm(destination, { recursive: true, force: true });
    await rename(temporary, destination);
  } catch (error) {
    await rm(temporary, { recursive: true, force: true });
    throw error;
  }
  return destination;
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  syncContract().then((root) => console.log(root)).catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
