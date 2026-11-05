---
title: Running a server
sidebar:
  order: 3
---

# Running a server

An M2O server is a single executable plus a `server.json` configuration file and a `resources/` directory. This guide covers every configuration key, the network ports involved, and what the server publishes to clients before they connect.

## First start

Start the server once with no configuration at all. If `server.json` is missing, the server **writes a complete default file** next to the executable before starting, with every key this build understands. That generated file is the authoritative list of what is configurable — edit it rather than writing one from scratch.

## server.json

```json title="server.json"
{
  "host": "0.0.0.0",
  "port": 27015,
  "map": "",
  "maxplayers": 32,
  "server-token": "",
  "download-url": "",
  "mod": {
    "season": "summer",
    "map_file": ""
  }
}
```

### Framework keys

| Key | Default | Meaning |
|:----|:--------|:--------|
| `host` | `0.0.0.0` | Address the game socket binds to. |
| `port` | `27015` | Game traffic port (**UDP**). The HTTP info endpoint binds to `port + 1` (`27016` by default, **TCP**). |
| `map` | — | Map name reported to the server browser. |
| `maxplayers` | `32` | Connection cap. |
| `server-token` | — | Secret key used to authenticate the server against MafiaHub services (masterlist listing). |
| `download-url` | — | Web addresses players download resources from before your server, such as a CDN. See [Serve downloads from a CDN](/guides/server/streamed-content/#serve-downloads-from-a-cdn). |

### Mod keys

M2O-specific settings live under the `mod` object, so they can never collide with framework keys added later:

| Key | Values | Meaning |
|:----|:-------|:--------|
| `season` | `summer` (default), `winter` | The world season. Validated at boot; see the [Seasons](/guides/server/seasons/) guide. |
| `map_file` | path | A game-mode map asset, relative to a downloaded client resource. |

Validation is strict and happens **at boot**: an invalid value (say, a misspelled season) stops the server with an error naming the key, instead of surfacing as a half-applied world at the first connect. Unknown keys under `mod` are kept with a warning rather than rejected, so downgrading the server does not brick a config file.

:::note
The `mod` values are published to each client during the connection handshake — before any asset downloads and before any client script runs. That is why they are boot-time configuration rather than something a script flips at runtime: every client needs them in hand while its world is still loading.
:::

## Ports and firewalls

Two ports need to be reachable:

- **UDP `port`** (default 27015) — all game traffic.
- **TCP `port + 1`** (default 27016) — a small HTTP endpoint serving server metadata as JSON: mod name and version, host, `max_players`, whether a password is required, and the replicated `mod` config. The server browser and masterlist use it.

When hosting on a cloud provider, remember the game traffic is **UDP**. Platforms that proxy inbound traffic through HTTP load balancers need a dedicated IPv4 address with UDP forwarding for the game port; the TCP info endpoint can go through their normal routing.

## Resources

Drop each resource into `resources/` next to the server; every resource found there is loaded at startup, ordered by its manifest `priority` (lower starts first) and its declared `resourceDependencies`. See [Your first resource](/guides/basics/getting-started/) for the manifest format.

Console input works while the server runs. Lines that are not a built-in server command are raised to scripts through the `consoleCommand` event:

```js title="server/main.js"
Events.on("consoleCommand", (command, args) => {
  if (command === "players") {
    console.log(`${World.players.length} player(s) online`);
  }
});
```

## Masterlist

With a valid `server-token`, the server announces itself to the MafiaHub masterlist so it appears in the in-game server browser. Without one it still runs fine as a direct-connect or LAN server.
