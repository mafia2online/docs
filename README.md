# M2O documentation

Public, maintainer-authored guides for the M2O scripting API.

The closed-source mod remains authoritative for generated client and server API contracts. It publishes those contracts as immutable artifacts to MafiaHub Services. This repository downloads an exact contract revision, composes it with the public guides, generates the complete site, and deploys it to the standalone documentation service.

## Structure

- `guides/` contains scripting concepts and shared catalogs.
- `guides/server/` contains server-only catalogs and resources.
- Image directories live beside the Markdown document that references them.
- `docs.config.json` owns the published site's generator pin, branding, links, navigation inputs, and community-content mapping.
- `scripts/sync_contract.mjs` downloads and verifies the public scripting contract.
- `scripts/docs.mjs` is the single local and CI generation entrypoint.
- `src/styles/production.css` is the production theme shared by the standalone site and local preview.

The closed-source Mod repository owns only contract generation and publication. It does not render or deploy the documentation website.

## Contributing

Open a pull request with the guide or asset change. Keep local image references relative to the Markdown file and avoid active HTML such as scripts, forms, iframes, or inline event handlers.

### Local preview

The preview is completely public and does not require the closed-source mod, Mafia II, a Services checkout, platform credentials, or an upload token. It downloads the same unauthenticated, immutable scripting contract used by CI and runs the same complete generator as production, including Server API, Client API, guides, branding, navigation, and resource cards.

Install [Node.js 22 or newer](https://nodejs.org/), clone this repository, and install the pinned dependencies:

```sh
git clone https://github.com/mafia2online/docs.git
cd docs
corepack enable
corepack prepare pnpm@10.4.1 --activate
pnpm install --frozen-lockfile
```

Start the local development server:

```sh
pnpm dev
```

Open <http://localhost:4321/>. The first run downloads the current `testing` contract into the ignored `.cache/` directory. Edit Markdown, colocated images, `docs.config.json`, or `src/styles/production.css`; the complete production site rebuilds and the browser refreshes automatically. Source subdirectories organize repository files without creating extra navigation groups.

To download the contract without starting the preview:

```sh
pnpm docs:sync
```

Set `M2O_CONTRACT_CHANNEL`, `M2O_CONTRACT_REVISION`, or `M2O_SERVICES_API_URL` to select another public contract. A manual documentation deployment can pin an exact immutable revision; otherwise it resolves the selected public channel when the docs workflow starts.

Before opening a pull request, verify the affected pages at desktop and mobile widths and run:

```sh
pnpm build
git diff --check
```

The generated `dist/` is the same static artifact deployed in CI.

Merges to `main` deploy against the selected contract channel, and maintainers can run the deployment manually with an exact contract revision. This repository owns the scoped standalone documentation upload token; the Mod repository never receives site-rendering or deployment credentials. The Mod repository only publishes contracts and never triggers or controls this workflow.
