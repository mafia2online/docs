---
title: Map blips
sidebar:
  order: 18
---

# Map blip icons

Mafia II map icons are selected with a `(library, iconId)` pair. Library `0` contains twelve icons addressed by IDs `1` through `12`; the other available libraries contain one icon each at ID `0`.

Blips are authoritative server entities. They replicate to connected players, can remain at a fixed world position, and can follow a player or vehicle.

## Creating a map blip on the server

Use `Blip.create(x, y, z, library, iconId, color?, virtualWorld?)` from a server resource:

```js
const droppedBlips = [];

Events.on("playerCommand", (player, command) => {
  if (command !== "dropblip") return;

  const position = player.position;
  const blip = Blip.create(
    position.x,
    position.y,
    position.z,
    0, // Library
    1, // Icon ID
    5  // Navigation palette index
  );

  droppedBlips.push(blip);
});
```

Call `blip.setIcon(library, iconId)` to change an existing icon. `blip.attachToPlayer(player)` and `blip.attachToVehicle(vehicle)` make it follow an entity; `blip.destroy()` removes it. Keep references to created blips so your resource can destroy them when they are no longer needed.

The optional `color` is an index from `0` to `8` into the game's navigation palette; a blip created without one uses `1`. The game names these entries after what it uses them for (default, player, enemy, neutral, friendly, objective, vehicle, shop, police), and the names do not describe the colour that renders: in game, `0` draws black, `7` red, and `8` green. Place a test blip before relying on any other index for a particular colour.

## Available map icons

| Library | Icon ID | Preview |
|--------:|--------:|:--------|
| `0` | `1` | <img src="./blips/1.png" alt="Map blip library 0 icon 1" loading="lazy"> |
| `0` | `2` | <img src="./blips/2.png" alt="Map blip library 0 icon 2" loading="lazy"> |
| `0` | `3` | <img src="./blips/3.png" alt="Map blip library 0 icon 3" loading="lazy"> |
| `0` | `4` | <img src="./blips/4.png" alt="Map blip library 0 icon 4" loading="lazy"> |
| `0` | `5` | <img src="./blips/5.png" alt="Map blip library 0 icon 5" loading="lazy"> |
| `0` | `6` | <img src="./blips/6.png" alt="Map blip library 0 icon 6" loading="lazy"> |
| `0` | `7` | <img src="./blips/7.png" alt="Map blip library 0 icon 7" loading="lazy"> |
| `0` | `8` | <img src="./blips/8.png" alt="Map blip library 0 icon 8" loading="lazy"> |
| `0` | `9` | <img src="./blips/9.png" alt="Map blip library 0 icon 9" loading="lazy"> |
| `0` | `10` | <img src="./blips/10.png" alt="Map blip library 0 icon 10" loading="lazy"> |
| `0` | `11` | <img src="./blips/11.png" alt="Map blip library 0 icon 11" loading="lazy"> |
| `0` | `12` | <img src="./blips/12.png" alt="Map blip library 0 icon 12" loading="lazy"> |
| `1` | `0` | <img src="./blips/13.png" alt="Map blip library 1 icon 0" loading="lazy"> |
| `2` | `0` | <img src="./blips/14.png" alt="Map blip library 2 icon 0" loading="lazy"> |
| `3` | `0` | <img src="./blips/15.png" alt="Map blip library 3 icon 0" loading="lazy"> |
| `4` | `0` | <img src="./blips/16.png" alt="Map blip library 4 icon 0" loading="lazy"> |
| `5` | `0` | <img src="./blips/17.png" alt="Map blip library 5 icon 0" loading="lazy"> |
| `6` | `0` | <img src="./blips/18.png" alt="Map blip library 6 icon 0" loading="lazy"> |
| `7` | `0` | <img src="./blips/19.png" alt="Map blip library 7 icon 0" loading="lazy"> |
| `8` | `0` | <img src="./blips/20.png" alt="Map blip library 8 icon 0" loading="lazy"> |
| `9` | `0` | <img src="./blips/21.png" alt="Map blip library 9 icon 0" loading="lazy"> |
| `10` | `0` | <img src="./blips/22.png" alt="Map blip library 10 icon 0" loading="lazy"> |
| `11` | `0` | <img src="./blips/23.png" alt="Map blip library 11 icon 0" loading="lazy"> |
| `12` | `0` | <img src="./blips/24.png" alt="Map blip library 12 icon 0" loading="lazy"> |
| `13` | `0` | <img src="./blips/25.png" alt="Map blip library 13 icon 0" loading="lazy"> |
| `14` | `0` | <img src="./blips/26.png" alt="Map blip library 14 icon 0" loading="lazy"> |
| `16` | `0` | <img src="./blips/27.png" alt="Map blip library 16 icon 0" loading="lazy"> |
| `17` | `0` | <img src="./blips/28.png" alt="Map blip library 17 icon 0" loading="lazy"> |
| `18` | `0` | <img src="./blips/29.png" alt="Map blip library 18 icon 0" loading="lazy"> |
| `19` | `0` | <img src="./blips/30.png" alt="Map blip library 19 icon 0" loading="lazy"> |
| `21` | `0` | <img src="./blips/31.png" alt="Map blip library 21 icon 0" loading="lazy"> |
| `22` | `0` | <img src="./blips/32.png" alt="Map blip library 22 icon 0" loading="lazy"> |
| `23` | `0` | <img src="./blips/33.png" alt="Map blip library 23 icon 0" loading="lazy"> |
| `24` | `0` | <img src="./blips/34.png" alt="Map blip library 24 icon 0" loading="lazy"> |
| `25` | `0` | <img src="./blips/35.png" alt="Map blip library 25 icon 0" loading="lazy"> |
| `26` | `0` | <img src="./blips/36.png" alt="Map blip library 26 icon 0" loading="lazy"> |
