---
title: Vehicles
sidebar:
  order: 8
---

# Vehicles

Vehicles are fully server-authoritative: everything from the engine toggle to wheel models, fuel, and the entry lock is set on the server's `Vehicle` handle and replicated to every client — including players who join later. This guide walks the lifecycle from spawn to cleanup, and covers the state surface along the way.

## Spawning

The model ID is a numeric index into the car registry; see the [vehicle catalog](/guides/catalogs/vehicles/) for a visual reference of IDs to models.

```js title="server/main.js"
const p = player.position;
const vehicle = Vehicle.spawn(
  32,                                   // model id: see the vehicle catalog
  new Vector3(p.x + 4, p.y, p.z),       // position (optional)
  Quaternion.fromEuler(0, 0, 90)        // rotation (optional; Euler Vector3 also accepted)
);
vehicle.setColor(140, 20, 20);
```

`vehicleSpawn` fires for every spawned vehicle and `vehicleDestroy` when one is removed. Destroy what you create — vehicles outlive the script reference:

```js title="server/main.js"
vehicle.destroy();
```

## State surface

Every setter replicates; every mirror is a `readonly` property on the handle.

| Area | API |
|:-----|:----|
| Accessories | `toggleEngine`/`setEngine`, `toggleLights`, `toggleLeftIndicator`/`RightIndicator`, `toggleHazard`, `toggleSiren`, `toggleBeacon`, `toggleHorn`, `toggleHood`, `toggleTrunk` — each with a matching getter |
| Appearance | `setColor(r,g,b)`, `setColorSecondary`, `setDirt(level)`, `setTuning(level)`, `setWipers`, `setPlate(text)` |
| Wheels | `setWheelModel(group, name)` (group 0 front / 1 rear / 2 spare — names in the [wheel catalog](/guides/catalogs/wheels/)), `setWheelState(index, state)` with `VehicleWheelState.Normal`/`Deflated`/`BlownOut` |
| Condition | `repair()` (full native restore: deformation, doors, panels, wheels, paint), `explode()`, `setEngineHealth(health)` |
| Fuel | `setFuel(fuel)`, `getFuel()`, `getFuelCapacity()` — the gauge and fuel consumption are native |
| Driving | `setSpeedLimiter(enabled)` + `setSpeedLimiterSpeed(kmh)` (the retail cruise cap, server-only; negative speed = model default) |
| Locking | `setLockState(0 \| 1 \| 2)` (unlocked / breakable / locked) or `setLocked(bool)` — the server-authoritative entry lock |
| Radio | `setRadioStation(id)`, `clearRadio()`, `setRadioLocked(bool)`; the driver switching stations fires `vehicleRadioChange` |
| Police | `setWantedLevel(level)` / `clearWantedLevel()` — the car's own wanted icon |

:::note
A destroyed wreck cannot be entered, so a command like `/repair` bound to `player.getVehicle()` cannot reach it. Keep a reference from the `vehicleExplode` event if you want to un-wreck vehicles (`repair()` works on the wreck itself).
:::

## Occupancy

Four events bracket every seat change, in order: `vehiclePlayerEntering` (with the seat index), `vehiclePlayerEntered`, `vehiclePlayerExiting`, `vehiclePlayerExited`. `player.getVehicle()` returns the occupied vehicle or `null`; `player.putInVehicle(vehicle, seat?)` and `player.removeFromVehicle()` move players by force.

Water is detected too: `vehicleSubmerged` / `vehicleSurfaced` fire as a vehicle sinks and re-emerges (client detectors report; the server dedupes).

## Pattern: cleaning up abandoned vehicles

A game mode with a `/veh` command accumulates vehicles forever unless it removes them. The subtlety is interest streaming: multiplayer streams entities around each player on the XY ground plane with a **100-unit radius**, so a vehicle must not vanish just beyond someone's streaming boundary — they might be walking back to it. Protect a slightly larger radius, and only start the abandonment clock while no one is inside *or nearby*:

```js title="server/main.js"
const ABANDON_TIMEOUT_MS = 5 * 60 * 1000;
const SWEEP_INTERVAL_MS = 10 * 1000;
const PROTECTION_RADIUS = 125;          // > the 100-unit streaming radius
const GLOBAL_VIRTUAL_WORLD = 0xFFFFFFFF;

const tracked = new Map(); // vehicle.id -> { vehicle, occupants: Set, abandonedSince }

Events.on("vehicleSpawn", (vehicle) => {
  tracked.set(vehicle.id, { vehicle, occupants: new Set(), abandonedSince: null });
});
Events.on("vehicleDestroy", (vehicle) => tracked.delete(vehicle.id));

Events.on("vehiclePlayerEntered", (vehicle, player) => {
  const state = tracked.get(vehicle.id);
  if (state) { state.occupants.add(player.id); state.abandonedSince = null; }
});
Events.on("vehiclePlayerExited", (vehicle, player) => {
  tracked.get(vehicle.id)?.occupants.delete(player.id);
});
Events.on("playerDisconnect", (player) => {
  for (const state of tracked.values()) state.occupants.delete(player.id);
});

function isPlayerNear(vehicle) {
  const v = vehicle.position, vw = vehicle.virtualWorld;
  const radiusSq = PROTECTION_RADIUS * PROTECTION_RADIUS;
  for (const player of World.players) {
    const pw = player.virtualWorld;
    const visible = pw === vw || pw === GLOBAL_VIRTUAL_WORLD || vw === GLOBAL_VIRTUAL_WORLD;
    if (!visible) continue;
    const dx = player.position.x - v.x, dy = player.position.y - v.y;
    if (dx * dx + dy * dy <= radiusSq) return true;
  }
  return false;
}

setInterval(() => {
  const now = Date.now();
  for (const [id, state] of tracked) {
    if (state.occupants.size > 0 || isPlayerNear(state.vehicle)) {
      state.abandonedSince = null;
      continue;
    }
    if (state.abandonedSince === null) { state.abandonedSince = now; continue; }
    if (now - state.abandonedSince < ABANDON_TIMEOUT_MS) continue;

    tracked.delete(id); // remove first: destroy() synchronously emits vehicleDestroy
    state.vehicle.destroy();
  }
}, SWEEP_INTERVAL_MS);
```

Three details carry over to any entity bookkeeping you write:

1. **Distance on XY only** — streaming ignores height, so should the protection check.
2. **Virtual worlds partition visibility** — a player in another virtual world cannot see the vehicle and should not protect it.
3. **`destroy()` emits `vehicleDestroy` synchronously** — delete your map entry before calling it, or your own handler will run mid-iteration.

## World-level driving settings

`World.setDrivingMode("arcade" | "simulation")` switches the global handling model for everyone, and `World.cycleTrafficLights()` bumps the traffic-light epoch so every client re-picks the same light states. Both replicate like the rest of the world state.
