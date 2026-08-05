# M2O documentation

Public, maintainer-authored guides for the M2O scripting API.

The closed-source mod remains authoritative for generated client and server API contracts. The documentation build checks out this repository at an immutable revision and composes these guides with that generated reference.

## Structure

- `guides/` contains scripting concepts and shared catalogs.
- `guides/server/` contains server-only catalogs and resources.
- Image directories live beside the Markdown document that references them.

## Contributing

Open a pull request with the guide or asset change. Keep local image references relative to the Markdown file and avoid active HTML such as scripts, forms, iframes, or inline event handlers.

### Local preview

The preview site is completely public and self-contained. It does not require the closed-source mod, Mafia II, the Services repository, platform credentials, or a documentation upload token. It renders the authored guides with the same resource-card layouts used in production; the generated scripting API reference is added later by the private publishing pipeline.

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

Open <http://localhost:4321/>. Edit Markdown or colocated images under `guides/`; Starlight rebuilds and refreshes the affected page automatically. The preview maps shared guides to `/guides/maintainer/` and server-only guides to `/guides/server/maintainer/`, matching their production routes.

Before opening a pull request, verify the affected pages at desktop and mobile widths and run:

```sh
pnpm build
git diff --check
```

`pnpm preview` serves the completed production build after `pnpm build` when you want to inspect the exact static output.

The M2O build pins the exact commit used for every published documentation deployment, so merged changes are only public after the mod documentation pipeline publishes a new revision.

Merges to `main` dispatch the private M2O documentation workflow. Configure the repository secret `M2O_DOCS_TRIGGER_TOKEN` with permission to send repository-dispatch events to `mafia2online/Mod`. The private repository owns the platform deploy token and authoritative API inputs; this public repository never receives those secrets.
