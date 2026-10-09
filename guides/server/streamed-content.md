---
title: Streamed content
sidebar:
  order: 8.5
---

# Streamed content

A server can ship game content that players do not have: new cars, and replacements for the stock ones. Players download it when they connect, before the world loads, and it is gone again when they leave. Nobody installs anything, and no script is involved. Drop the files into a resource and the server registers them.

Cars are the first kind of content that streams. Player skins, crash objects and city parts are not supported yet.

## How a resource ships content

Everything under a resource's `stream/` folder is packed into one download. The server builds it when the resource starts and every client checks it before using it. Two kinds of file are accepted:

```text title="resources/my-cars/"
package.json
stream/
  sds/cars/
    shubert_38_custom.sds      the car
    shubert_38_custom_z.sds    its winter version (optional)
  materials/
    shubert_38_custom.mtl      materials the car adds (only when it has any)
```

- `stream/sds/cars/<name>.sds` is a car archive. A `<name>_z.sds` next to it is the same car for winter sessions.
- `stream/materials/<name>.mtl` is a material library, loaded in addition to the game's own.

File names may use only `a-z`, `0-9` and `_`. Anything else in `stream/` makes the server skip the whole resource's download, so keep the folder to these files.

The resource needs nothing beyond a `package.json`. A content-only resource has no scripts:

```json title="resources/my-cars/package.json"
{
  "name": "my-cars",
  "version": "1.0.0",
  "description": "Custom cars for my server"
}
```

## Adding or replacing a car

**The file name decides.** This is the rule the game itself follows.

- A file named like a stock car **replaces** it everywhere, under its stock model ID. `shubert_38_destr.sds` replaces the burnt Shubert 38, and every script that spawns model `24` gets the new one.
- Any other name **adds** a new model. It gets an ID after the stock ones, and you spawn it by name:

```js title="server/main.js"
const car = Vehicle.spawn("shubert_38_custom", { x: -1555, y: -153, z: -20 }, { x: 0, y: 0, z: 0 });
```

`Vehicle.spawn` accepts a model name for any car, stock or streamed. Prefer the name for streamed cars: their numeric IDs depend on the order resources start in, so they can differ between two runs of the same server.

## Making a car with Illusion Toolkit

Build cars with [Illusion Toolkit](https://github.com/mafia2online/illusion-toolkit). It writes exactly the folder above, so there is nothing to assemble by hand.

1. **Clone** a stock car under a new name with `car_clone` (or the Clone action in the car editor), then edit it: model, textures, materials, tuning. The clone needs its own name throughout, and the toolkit takes care of that.
2. **Build** it, so the archive in `pc\sds\cars` is the finished car.
3. **Export** it with `car_export_m2o`. The result is a resource folder: copy it into your server's `resources/` as it is.

The export carries everything the car needs:

- **Textures** travel inside the car's archive.
- **Materials** the toolkit created for the car go into `stream/materials/<name>.mtl`. The game's own materials are never touched, and the library is released when the player leaves your server.
- **The car's settings row** (its flags and the like, from the game's vehicle table) travels inside the archive too. The game appends it to its vehicle table while the car is loaded, as it does for its own DLC cars. The row keeps the ID of the car it was cloned from, so the new car shares that car's paint choices and title.

To replace a stock car instead, build it under that car's name (`car_substitute`) and export it. A replacement keeps the stock car's settings.

## What the server checks

The server reads every car before a player can download it. A car that fails is **not shipped and not registered**: the server log names it and gives the reason, and players never receive it.

| Log message (after `refusing car '<file>':`) | What to do |
|:----|:----|
| `not a Mafia II PC SDS v19 archive` | The file is not a car archive. Export it again. |
| `it contains no car (no car entity data)` | The archive holds something else, for example a player skin. |
| `its car data is filed under another name; export the car as '<name>' instead of renaming the file` | The archive was renamed after export. The game finds a car by its name inside, so export it under the name you want. |
| `it adds textures no material uses (...); ship its materials in stream/materials/` | The car's new textures need the materials that use them. Export with the toolkit, which writes the library. |
| `its vehicles.tbl row ...` | The settings row the archive carries is not valid. Export the car again with a current toolkit. |
| `it replaces a stock car, which keeps the stock row, yet carries tables` | A replacement may not carry its own settings row. Build it with `car_substitute`. |

A material library that is not a valid Mafia II library is skipped from the download as well, with a warning in the log.

Checks run when a resource starts. The results are cached until a file under `stream/` changes, so restarting a server with many cars stays fast.

## Downloads and caching

Players download a resource's content once and keep it in their cache. A later connection reuses it unless the files changed on the server. While the download runs, the loading screen shows its progress. The world loads after the content is in place, so a streamed car is never missing when it spawns.

## Limits

- Players who are already connected when a resource starts do not receive its cars until they reconnect. Start content resources with the server.
- Stopping a resource does not remove its cars from the session. Model IDs are part of the network protocol and cannot be reused mid-session.
- A new car shows the title of the car it was cloned from. Its own title text exists only on the machine it was made on.
