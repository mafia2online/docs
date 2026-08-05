import { createServer } from "node:http";
import { watch } from "node:fs";
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { syncContract } from "./sync_contract.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cache = path.join(root, ".cache");
const command = process.argv[2];
const ignored = new Set([".cache", ".git", "dist", "node_modules"]);
const targetName = /^[a-z0-9][a-z0-9-]{0,63}$/;

const run = (executable, args, options = {}) => {
  const result = spawnSync(executable, args, { cwd: root, env: process.env, stdio: "inherit", ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${executable} exited with status ${result.status}`);
};

const createRenderConfig = async (contractRoot) => {
  const [site, reference] = await Promise.all([
    readFile(path.join(root, "docs.config.json"), "utf8").then(JSON.parse),
    readFile(path.join(contractRoot, "reference.config.json"), "utf8").then(JSON.parse),
  ]);
  const { servicesCliVersion, ...publicConfig } = site;
  if (publicConfig.targets !== undefined) throw new Error("docs.config.json must not define scripting API targets");
  if (!reference || reference.schemaVersion !== 1 || !reference.targets || typeof reference.targets !== "object" || Array.isArray(reference.targets) || !Object.keys(reference.targets).length) throw new Error("Scripting contract reference.config.json is invalid");
  if (typeof servicesCliVersion !== "string" || !/^[0-9A-Za-z.+-]+$/.test(servicesCliVersion)) throw new Error("docs.config.json has an invalid servicesCliVersion");
  for (const [name, target] of Object.entries(reference.targets)) {
    if (!targetName.test(name) || !target || typeof target !== "object" || typeof target.label !== "string" || typeof target.description !== "string" || target.entryPoint !== `targets/${name}/api.d.ts` || target.tsconfig !== `targets/${name}/tsconfig.json`) {
      throw new Error(`Scripting contract target ${name} is invalid`);
    }
  }
  const targets = Object.fromEntries(Object.entries(reference.targets).map(([name, target]) => [name, {
    label: target.label,
    description: target.description,
    entryPoint: path.resolve(contractRoot, target.entryPoint),
    tsconfig: path.resolve(contractRoot, target.tsconfig),
  }]));
  const config = {
    ...publicConfig,
    logo: publicConfig.logo ? path.resolve(root, publicConfig.logo) : undefined,
    theme: publicConfig.theme ? path.resolve(root, publicConfig.theme) : undefined,
    targets,
  };
  await mkdir(cache, { recursive: true });
  const configPath = path.join(cache, "render.config.json");
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`);
  return { configPath, servicesCliVersion };
};

const generate = async (output) => {
  const contractRoot = await syncContract();
  const contractRevision = await readFile(path.join(contractRoot, "manifest.json"), "utf8").then((value) => JSON.parse(value).revision).catch(() => "local");
  await mkdir(cache, { recursive: true });
  await writeFile(path.join(cache, "contract-revision"), `${contractRevision}\n`);
  const { configPath, servicesCliVersion } = await createRenderConfig(contractRoot);
  const contentRevision = spawnSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).stdout.trim() || "working-tree";
  const args = ["docs", "generate", "--config", configPath, "--out", output, "--content-root", root, "--content-revision", contentRevision, "--site-url", process.env.M2O_DOCS_SITE_URL ?? "http://127.0.0.1:4321", "--base-path", process.env.M2O_DOCS_BASE_PATH ?? "/"];
  const localCli = process.env.MAFIAHUB_SERVICES_CLI_ENTRYPOINT;
  if (localCli) run(process.execPath, [path.resolve(localCli), ...args]);
  else run("pnpm", ["dlx", `@mafiahub/services-cli@${servicesCliVersion}`, ...args]);
  const manifestPath = path.join(output, "manifest.json");
  const siteManifest = JSON.parse(await readFile(manifestPath, "utf8"));
  siteManifest.sources.reference.revision = contractRevision;
  siteManifest.sources.reference.channel = process.env.M2O_CONTRACT_CHANNEL ?? "testing";
  await writeFile(manifestPath, `${JSON.stringify(siteManifest, null, 2)}\n`);
};

const serve = async () => {
  let generation = 0;
  let current = path.join(cache, "preview-0");
  const clients = new Set();
  const rebuild = async () => {
    const next = path.join(cache, `preview-${++generation}`);
    await generate(next);
    const previous = current;
    current = next;
    if (previous !== next) await rm(previous, { recursive: true, force: true });
    for (const response of clients) response.write("data: reload\n\n");
    console.log("Documentation preview refreshed.");
  };
  await rebuild();

  const server = createServer(async (request, response) => {
    if (request.url === "/__reload") {
      response.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });
      response.write("data: ready\n\n");
      clients.add(response);
      request.on("close", () => clients.delete(response));
      return;
    }
    try {
      const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
      const relative = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
      const candidate = path.resolve(current, `.${relative}`);
      if (!candidate.startsWith(`${path.resolve(current)}${path.sep}`)) throw new Error("unsafe path");
      const file = (await stat(candidate).catch(() => null))?.isFile() ? candidate : path.join(candidate, "index.html");
      let body = await readFile(file);
      const extension = path.extname(file).toLowerCase();
      if (extension === ".html") body = Buffer.from(body.toString("utf8").replace("</body>", '<script>new EventSource("/__reload").onmessage=(event)=>{if(event.data==="reload")location.reload()}</script></body>'));
      const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp" };
      response.writeHead(200, { "Content-Type": types[extension] ?? "application/octet-stream" });
      response.end(body);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });
  server.listen(4321, "127.0.0.1", () => console.log("Production documentation preview: http://127.0.0.1:4321/"));

  let timer;
  let rebuilding = false;
  const watcher = watch(root, { recursive: true }, (_event, filename) => {
    if (!filename || filename.split(path.sep).some((segment) => ignored.has(segment))) return;
    clearTimeout(timer);
    timer = setTimeout(async () => {
      if (rebuilding) return;
      rebuilding = true;
      try { await rebuild(); } catch (error) { console.error(`Preview rebuild failed: ${error instanceof Error ? error.message : error}`); }
      finally { rebuilding = false; }
    }, 250);
  });
  const shutdown = () => { watcher.close(); server.close(); };
  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
};

if (command === "build") await generate(path.join(root, "dist"));
else if (command === "dev") await serve();
else throw new Error("Usage: node scripts/docs.mjs <build|dev>");
