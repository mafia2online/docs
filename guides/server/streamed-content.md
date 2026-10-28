---
title: Streamed content
sidebar:
  order: 8.5
---

# Streamed content

A server can ship game content that players do not have: new cars, replacements for the stock ones, and edits to the city itself. Players download it when they connect, before the world loads, and it is gone again when they leave. Nobody installs anything, and no script is involved. Drop the files into a resource and the server registers them.

Two kinds of content stream today: **cars**, and **map edits** made with Illusion Toolkit (changed districts, new interiors, moved load zones). Player skins are not supported yet.

## How a resource ships content

Everything under a resource's `stream/` folder is packed into one download. The server builds it when the resource starts and every client checks it before using it. A car resource looks like this:

```text title="resources/my-cars/"
package.json
stream/
  sds/cars/
    shubert_38_custom.sds      the car
    shubert_38_custom_z.sds    its winter version (optional)
  materials/
    shubert_38_custom.mtl      materials the car adds (only when it has any)
```

These kinds of file are accepted:

- `stream/sds/cars/<name>.sds` is a car archive. A `<name>_z.sds` next to it is the same car for winter sessions.
- `stream/sds/<path>.sds.patch` is a patch of one of the game's own archives, at the same path the game has it (`stream/sds/city/uppertown.sds.patch` patches `sds/city/uppertown.sds`). See [Map edits](#map-edits).
- `stream/sds/<path>.sds` outside `cars/` is an archive the game does not have, such as a new interior under `sds/shops/`.
- `stream/materials/<name>.mtl` is a material library, loaded in addition to the game's own.

Folder and file names may use only `a-z`, `0-9` and `_`. Anything else in `stream/` makes the server skip the whole resource's download, so keep the folder to these files.

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

## Map edits

A map edit changes the city: a district with new buildings or interiors, a new interior of its own, load zones moved so a new area stays loaded. It ships the way the game ships its own DLC changes, as **patches** of the game's archives rather than copies of them. Players never replace a game file: the patch is applied in memory while they are on your server, and their game is untouched when they leave.

Edits made with [Illusion Toolkit](https://github.com/mafia2online/illusion-toolkit) export ready to use. A typical resource:

```text title="resources/greenfield/"
package.json
stream/
  sds/
    city/
      greenfield.sds.patch           the district, summer
      greenfield_z.sds.patch         the district, winter
    city_univers/
      city_univers.sds.patch         load zones and the interior table
    shops/
      grn_vilgm.sds                  a new interior (the whole archive)
  materials/
    greenfield.mtl                   materials the district adds
    greenfield_z.mtl
    grn_vilgm.mtl                    materials the interior adds
```

The game path decides what each file is, so no list or script is needed:

- an archive the game ships travels as a **patch** (`<archive>.sds.patch`) against the game's own bytes;
- an archive the game does not have travels **whole** (`<archive>.sds`);
- the materials an archive adds travel in a library named after it.

### Exporting from Illusion Toolkit

1. Edit the map in the toolkit as usual and **Save**. You do not need to **Build** into your game first; an archive you already built exports all the same.
2. Open **File → Export…**. This is the same window as **Build SDS…**, with a destination at the top. Choose **M2O resource**.
3. Name the export (for example `greenfield`) and choose its folder. The list shows every archive you edited; tick the ones this export ships. An edit that spans several archives (a new interior plus `city_univers`, or summer and winter) must ship them together.
4. **Export.** Copy the folder's `stream` into your resource (`resources/<name>/stream`) and add a `package.json` like the one above.

The export is saved as a project: the window opens on it next time with its archives ticked, and exporting again replaces that folder. Archives that match the game are left out, and a failed export leaves the folder as it was.

The toolkit refuses an export it cannot make correctly, and says why:

- **The game's own archive is no longer the original** and no backup of it was found. A patch must be made against the bytes every player has. Restore the archive (or verify the game files in Steam) and export again.
- **A mesh uses a material that no library defines**, or the edit **changes one of the game's own materials**. The game keeps its own definition of a material it knows, so make a new material instead.
- **A name M2O cannot stream** (anything but `a-z`, `0-9` and `_`).

### Seasons

Summer and winter are different archives: `greenfield.sds` and `greenfield_z.sds`. A patch applies to exactly one of them, so an edit only appears in the season it was made for. Edit both and export both to change both. A session loads only its own season's archives (see [Seasons](/guides/server/seasons/)).

### Load zones and interiors

The city stays loaded only inside its load zones, the box volumes in `city_univers`. A new area outside them needs the zones moved or added, and a new interior needs its load and unload zones and a row in the game's shop table, all of which live in `city_univers`. That is why such an edit ships a `city_univers.sds.patch` next to the district. Players get it before the world opens, so the zones are right from the moment they spawn.

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

Map files are checked the same way: a new archive must be a Mafia II PC archive, and a patch must be a native SDS patch. A file that is neither is not shipped.

Checks run when a resource starts. The results are cached until a file under `stream/` changes, so restarting a server with many cars stays fast.

## Downloads and caching

Players download a resource's content once and keep it in their cache. A later connection reuses it unless the files changed on the server. While the download runs, the loading screen shows its progress. The world loads after the content is in place, so a streamed car is never missing when it spawns and a map edit is there from the first frame.

## Limits

- Players who are already connected when a resource starts do not receive its cars until they reconnect. Start content resources with the server.
- Stopping a resource does not remove its cars from the session. Model IDs are part of the network protocol and cannot be reused mid-session.
- A new car shows the title of the car it was cloned from. Its own title text exists only on the machine it was made on.
- One archive takes one patch. When two resources patch the same archive, players apply the first one and ignore the second, and their game log says so. Combine edits to the same district, or to `city_univers`, in one export.
- Map edits apply when the world opens. Starting or changing a map resource on a running server reaches players when they reconnect.
- Players need the original game archives. A player whose game files were modified by hand may see an edit applied wrongly; verifying the game files in Steam fixes it.
