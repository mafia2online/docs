---
title: Vehicles
sidebar:
  order: 21
---

# Vehicle IDs

Vehicles in Mafia II are identified by a numeric model ID. Use the table below when spawning a vehicle, changing its model, or checking which car a player is currently driving.

Vehicle spawning is an authoritative server operation. M2O creates the vehicle on the server and replicates it to connected players, including players who stream it in later.

## Spawning a vehicle on the server

Call `Vehicle.spawn(modelId, position, rotation)` from a server resource:

```js
const p = player.position;
const vehicle = Vehicle.spawn(
  32,                                   // model id: see the table below
  new Vector3(p.x + 4, p.y, p.z),       // position (optional)
  Quaternion.fromEuler(0, 0, 90)        // rotation (optional; Euler Vector3 also accepted)
);
```

The first argument is an ID from this page. See the [vehicles guide](/guides/server/vehicles/) for the full state surface (color, wheels, fuel, locking, and more) once the vehicle is spawned.

## Available vehicles

| ID | Preview |
|:---|:--------|
| `1` | <img src="./vehicles/1.jpg" alt="Vehicle ID 1" loading="lazy"> |
| `2` | <img src="./vehicles/2.jpg" alt="Vehicle ID 2" loading="lazy"> |
| `3` | <img src="./vehicles/3.jpg" alt="Vehicle ID 3" loading="lazy"> |
| `4` | <img src="./vehicles/4.jpg" alt="Vehicle ID 4" loading="lazy"> |
| `5` | <img src="./vehicles/5.jpg" alt="Vehicle ID 5" loading="lazy"> |
| `6` | <img src="./vehicles/6.jpg" alt="Vehicle ID 6" loading="lazy"> |
| `7` | <img src="./vehicles/7.jpg" alt="Vehicle ID 7" loading="lazy"> |
| `8` | <img src="./vehicles/8.jpg" alt="Vehicle ID 8" loading="lazy"> |
| `9` | <img src="./vehicles/9.jpg" alt="Vehicle ID 9" loading="lazy"> |
| `10` | <img src="./vehicles/10.jpg" alt="Vehicle ID 10" loading="lazy"> |
| `11` | <img src="./vehicles/11.jpg" alt="Vehicle ID 11" loading="lazy"> |
| `12` | <img src="./vehicles/12.jpg" alt="Vehicle ID 12" loading="lazy"> |
| `13` | <img src="./vehicles/13.jpg" alt="Vehicle ID 13" loading="lazy"> |
| `14` | <img src="./vehicles/14.jpg" alt="Vehicle ID 14" loading="lazy"> |
| `15` | <img src="./vehicles/15.jpg" alt="Vehicle ID 15" loading="lazy"> |
| `16` | <img src="./vehicles/16.jpg" alt="Vehicle ID 16" loading="lazy"> |
| `17` | <img src="./vehicles/17.jpg" alt="Vehicle ID 17" loading="lazy"> |
| `18` | <img src="./vehicles/18.jpg" alt="Vehicle ID 18" loading="lazy"> |
| `19` | <img src="./vehicles/19.jpg" alt="Vehicle ID 19" loading="lazy"> |
| `20` | <img src="./vehicles/20.jpg" alt="Vehicle ID 20" loading="lazy"> |
| `21` | <img src="./vehicles/21.jpg" alt="Vehicle ID 21" loading="lazy"> |
| `22` | <img src="./vehicles/22.jpg" alt="Vehicle ID 22" loading="lazy"> |
| `23` | <img src="./vehicles/23.jpg" alt="Vehicle ID 23" loading="lazy"> |
| `24` | <img src="./vehicles/24.jpg" alt="Vehicle ID 24" loading="lazy"> |
| `25` | <img src="./vehicles/25.jpg" alt="Vehicle ID 25" loading="lazy"> |
| `26` | <img src="./vehicles/26.jpg" alt="Vehicle ID 26" loading="lazy"> |
| `27` | <img src="./vehicles/27.jpg" alt="Vehicle ID 27" loading="lazy"> |
| `28` | <img src="./vehicles/28.jpg" alt="Vehicle ID 28" loading="lazy"> |
| `29` | <img src="./vehicles/29.jpg" alt="Vehicle ID 29" loading="lazy"> |
| `30` | <img src="./vehicles/30.jpg" alt="Vehicle ID 30" loading="lazy"> |
| `31` | <img src="./vehicles/31.jpg" alt="Vehicle ID 31" loading="lazy"> |
| `32` | <img src="./vehicles/32.jpg" alt="Vehicle ID 32" loading="lazy"> |
| `33` | <img src="./vehicles/33.jpg" alt="Vehicle ID 33" loading="lazy"> |
| `34` | <img src="./vehicles/34.jpg" alt="Vehicle ID 34" loading="lazy"> |
| `35` | <img src="./vehicles/35.jpg" alt="Vehicle ID 35" loading="lazy"> |
| `36` | <img src="./vehicles/36.jpg" alt="Vehicle ID 36" loading="lazy"> |
| `37` | <img src="./vehicles/37.jpg" alt="Vehicle ID 37" loading="lazy"> |
| `38` | <img src="./vehicles/38.jpg" alt="Vehicle ID 38" loading="lazy"> |
| `39` | <img src="./vehicles/39.jpg" alt="Vehicle ID 39" loading="lazy"> |
| `40` | <img src="./vehicles/40.jpg" alt="Vehicle ID 40" loading="lazy"> |
| `41` | <img src="./vehicles/41.jpg" alt="Vehicle ID 41" loading="lazy"> |
| `42` | <img src="./vehicles/42.jpg" alt="Vehicle ID 42" loading="lazy"> |
| `43` | <img src="./vehicles/43.jpg" alt="Vehicle ID 43" loading="lazy"> |
| `44` | <img src="./vehicles/44.jpg" alt="Vehicle ID 44" loading="lazy"> |
| `45` | <img src="./vehicles/45.jpg" alt="Vehicle ID 45" loading="lazy"> |
| `46` | <img src="./vehicles/46.jpg" alt="Vehicle ID 46" loading="lazy"> |
| `47` | <img src="./vehicles/47.jpg" alt="Vehicle ID 47" loading="lazy"> |
| `48` | <img src="./vehicles/48.jpg" alt="Vehicle ID 48" loading="lazy"> |
| `49` | <img src="./vehicles/49.jpg" alt="Vehicle ID 49" loading="lazy"> |
| `50` | <img src="./vehicles/50.jpg" alt="Vehicle ID 50" loading="lazy"> |
| `51` | <img src="./vehicles/51.jpg" alt="Vehicle ID 51" loading="lazy"> |
| `52` | <img src="./vehicles/52.jpg" alt="Vehicle ID 52" loading="lazy"> |
| `53` | <img src="./vehicles/53.jpg" alt="Vehicle ID 53" loading="lazy"> |
| `54` | <img src="./vehicles/54.jpg" alt="Vehicle ID 54" loading="lazy"> |
| `55` | <img src="./vehicles/55.jpg" alt="Vehicle ID 55" loading="lazy"> |
| `56` | <img src="./vehicles/56.jpg" alt="Vehicle ID 56" loading="lazy"> |
| `57` | <img src="./vehicles/57.jpg" alt="Vehicle ID 57" loading="lazy"> |
