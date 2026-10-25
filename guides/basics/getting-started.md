---
title: Your first resource
sidebar:
  order: 2
---

# Your first resource

Everything a game mode does in M2O lives in a **resource**: a directory with a `package.json` manifest and one or more JavaScript files. The server loads every resource in its `resources/` directory at startup, runs its server scripts in Node.js, and streams its client scripts to each player, where they run in a sandboxed V8 context.

This guide builds a minimal two-file resource and explains every field along the way.

## Directory layout

```text
resources/
└── my-gamemode/
    ├── package.json      # manifest: script roles, dependencies, load order
    ├── server/
    │   └── main.js       # runs on the server (Node.js)
    └── client/
        └── main.js       # runs on every player's machine (sandboxed V8)
```

The split matters: the two sides see **different APIs** and never share memory. The server owns authoritative game state — players, vehicles, world time, money. The client owns presentation and input — HUD, key binds, web views, the camera. They talk through [events](/guides/concepts/events/).

## The manifest

```json title="resources/my-gamemode/package.json"
{
  "name": "my-gamemode",
  "version": "1.0.0",
  "author": "You",
  "description": "My first M2O game mode",
  "mafiahub": {
    "clientScripts": ["client/main.js"],
    "serverScripts": ["server/main.js"],
    "priority": 10
  }
}
```

The top-level fields follow npm conventions. Everything M2O-specific sits under the `mafiahub` key:

| Key | Meaning |
|:----|:--------|
| `clientScripts` | Scripts executed on every connecting player. Shipped to clients. |
| `serverScripts` | Scripts executed on the server. **Never shipped to clients.** |
| `sharedScripts` | Scripts executed on both sides. Shipped to clients. Run before the role-specific ones. |
| `files` | Files shipped to clients but not executed — web-view pages, styles, images, fonts. Globs allowed. |
| `priority` | Load order. Lower numbers start earlier; a library resource should use a lower priority than the game modes that consume it. |
| `exports` | Names this resource registers for other resources to import (see below). |
| `resourceDependencies` | Resources that must be present, with semver ranges. |

Scripts run in the order you list them, shared scripts first. Paths are relative to the resource
root and must be explicit files — only `files` accepts globs, so execution order is always exactly
what the manifest says.

### What reaches the player

A resource is packaged, encrypted and streamed to each connecting client. **What ships is derived
from the roles you declare**, not from a separate list: `clientScripts`, `sharedScripts`, `files`
and `package.json` go out; `serverScripts` never does. Keep credentials, database queries and admin
checks in `serverScripts` and they stay on the server.

If a resource declares no `files`, the packager falls back to scanning the directories holding your
client scripts and warns in the server log. That fallback cannot tell a server bundle from a client
one, so declare `files` on anything that ships assets.

:::note
**Upgrading an older resource.** The earlier `client`, `server` and `clientFiles` keys still work —
they fold into the lists above. To move across, replace `"client": "client/main.js"` with
`"clientScripts": ["client/main.js"]`, `"server"` with `"serverScripts"`, and list your assets
under `"files"`.
:::

## A minimal server entry

```js title="server/main.js"
Events.on("resourceStart", (resourceName) => {
  if (resourceName !== "my-gamemode") return;
  console.log("[my-gamemode] started");

  // Server-authoritative environment: pushed to every client,
  // and replayed to anyone who joins later.
  World.setTime(15, 30);
  World.setWeather("DTFreeRideDay");
});

Events.on("playerConnect", (player) => {
  console.log(`${player.nickname} connected (ping ${player.ping}ms)`);
});
```

:::note
`resourceStart` fires once per resource as it loads, with the resource's name as the argument. Guard on your own name — the event also fires for every *other* resource that starts.
:::

## A minimal client entry

```js title="client/main.js"
Events.on("resourceStart", (resourceName) => {
  if (resourceName !== "my-gamemode") return;

  Hud.showMessage("Welcome to Empire Bay!", 5);

  Key.bind("h", "down", () => {
    Hud.setVisible(!Hud.isVisible());
  });
});
```

Key binds registered by a resource are owned by it and cleared automatically when the resource stops.

## Sharing code between resources

A resource can register values under an export name, and any other resource can retrieve them. This is how shared libraries work — the bundled `shared-utils` resource is exactly this pattern:

```json title="resources/shared-utils/package.json" {8}
{
  "name": "shared-utils",
  "version": "1.0.0",
  "mafiahub": {
    "sharedScripts": ["utils.js"],
    "exports": ["utils"],
    "priority": 0
  }
}
```

```js title="resources/shared-utils/utils.js"
const utils = {
  randomIn(arr) {
    if (!arr || arr.length === 0) return undefined;
    return arr[Math.floor(Math.random() * arr.length)];
  },
};

Exports.register("utils", utils);
```

Consuming it from another resource takes one call — and a dependency declaration so the loader guarantees `shared-utils` is present and started first:

```js title="my-gamemode/server/main.js"
const utils = Exports.get("shared-utils", "utils");
```

```json title="my-gamemode/package.json" {5-7}
{
  "name": "my-gamemode",
  "mafiahub": {
    "serverScripts": ["server/main.js"],
    "resourceDependencies": [
      { "name": "shared-utils", "version": ">=1.0.0" }
    ],
    "priority": 10
  }
}
```

`Imports.get(resourceName)` returns every export of a resource as one object when you prefer a single handle over per-name lookups. For request/response messaging between resources, see `Messages.handle` and `Messages.request` in the [server reference](/reference/server/variables/messages/).

## Cleaning up

Entities you create server-side (vehicles, [blips, markers, labels](/guides/server/world-entities/)) are not garbage-collected when your script loses the reference — they live until destroyed or until the server stops. Tear down what you created in `resourceStop`:

```js title="server/main.js"
const spawnedVehicles = [];

Events.on("resourceStop", (resourceName) => {
  if (resourceName !== "my-gamemode") return;
  for (const vehicle of spawnedVehicles) {
    try { vehicle.destroy(); } catch { /* already gone */ }
  }
  spawnedVehicles.length = 0;
});
```

## Editor autocomplete

The same TypeScript declarations that generate this reference are published on npm as [`@mafia2online/types`](https://www.npmjs.com/package/@mafia2online/types). Install it as a dev dependency of your resource:

```sh
npm install --save-dev @mafia2online/types
```

The package has one entry per side: `@mafia2online/types/server` and `@mafia2online/types/client`. Give each side its own `tsconfig.json` that names its entry in `types`, and your editor gets autocomplete and type checking for the whole API, even in plain JavaScript files:

```jsonc title="server/tsconfig.json"
{
  "compilerOptions": {
    "lib": ["ES2022"],
    "types": ["@mafia2online/types/server"],
    "allowJs": true,
    "checkJs": true,
    "noEmit": true
  },
  "include": ["**/*.js"]
}
```

```jsonc title="client/tsconfig.json"
{
  "compilerOptions": {
    "lib": ["ES2022"],
    "types": ["@mafia2online/types/client"],
    "allowJs": true,
    "checkJs": true,
    "noEmit": true
  },
  "include": ["**/*.js"]
}
```

Everything is declared as a global, the way the runtime installs it: `Events`, `Player`, `Vector3` and the rest need no import. Leave `DOM` out of `lib`; it would declare a second `console` and `setTimeout`.

:::caution
Load the server and client declarations **separately** — a global documented in one environment does not exist in the other. `World` exists in both but with different members; `Hud` is client-only; `PhoneBook` is server-only.
:::

:::tip
The package version is the server release version. Install the one matching the server you deploy to; a newer package may declare bindings an older server does not have.
:::

## Where to go next

- [Events](/guides/concepts/events/) — how the two environments communicate.
- [Server, client, and the UI](/guides/concepts/ui-architecture/) — why UI calls live on the client and how the server drives them.
- [Running a server](/guides/basics/server-setup/) — `server.json` and hosting.
