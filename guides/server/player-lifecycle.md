---
title: Player lifecycle
sidebar:
  order: 7
---

# Player lifecycle

From connection to disconnection, a player's session passes through a fixed set of server events. The most important thing this guide has to tell you is a negative: **there is no automatic respawn**. A player who dies stays dead until your game mode revives them.

## Connection and disconnection

```js title="server/main.js"
Events.on("playerConnect", (player) => {
  console.log(`${player.nickname} connected from ${player.ip} (Steam ${player.steamId})`);
  // Restore persisted state, attach blips, put the player in a virtual world…
});

Events.on("playerDisconnect", (player) => {
  // Last chance to read the player's state and clean up references.
});
```

`playerConnect` is where you restore anything you [persist](/guides/server/persistence/) — the server's own per-player state (money, weapons, collected pinups) starts fresh each session. Clean up per-player bookkeeping in `playerDisconnect`: entries in your own Maps, blips attached to the player, occupancy records.

The `Player` handle carries connection-level identity you can key storage on: `steamId`, `discordId`, `hardwareId`, plus `ping`, `ip`, and `kick(reason)`.

## Death

`playerDeath` fires on any death, with the killer (or `null` for the world) and a detailed info object:

```js title="server/main.js"
const RESPAWN_POINT = { x: -1649.5, y: 65.267, z: -9.541 };
const RESPAWN_DELAY_MS = 3000;

Events.on("playerDeath", (player, killer, info) => {
  const cause = info.vehicle ? "run over" : `weapon ${info.weaponId}`;
  const headshot = info.bodyPart === 2;
  console.log(`${player.nickname} killed by ${killer ? killer.nickname : "the world"} (${cause}${headshot ? ", headshot" : ""})`);

  setTimeout(() => {
    if (player.isDead()) {
      player.spawn(RESPAWN_POINT.x, RESPAWN_POINT.y, RESPAWN_POINT.z);
    }
  }, RESPAWN_DELAY_MS);
});

Events.on("playerSpawn", (player) => {
  // Fires on every (re)spawn: re-equip, re-apply team state, etc.
});
```

`info` (`PlayerDeathInfo`) carries `vehicle` (the run-over car, else `null`), `weaponId`, `damageType`, `bodyPart` (`2` = head), `ultimate` (instakill), `damage`, `power`, and the world-space `position`, `direction`, and `normal` of the killing blow.

:::caution
Guard the delayed respawn with `player.isDead()` — an admin command or another code path may already have revived the player, and the handle may belong to someone who since disconnected.
:::

Beyond the event, the server can drive the cycle directly: `player.kill()` (native instakill), `player.spawn(x, y, z)` (revive + teleport), `player.setHealth(value)` and `player.restoreHealth()` (which also revives a downed player).

## Damage

`playerDamage` fires for every hit a shooter resolves against a player, **before** the victim applies it:

```js title="server/main.js"
Events.on("playerDamage", (victim, info) => {
  if (info.attacker && info.bodyPart === 2) {
    notify(info.attacker, "Headshot!");
  }
});
```

Two properties of the sync model matter here:

- **Hit detection belongs to the shooter.** `bodyPart` is what the shooter's own trace resolved; the resulting health arrives with the victim's next sync, so `victim.getHealth()` immediately after the event still returns the pre-hit value.
- `power` is the pre-multiplier value; `damage` is the resolved amount.

This event is the hook for hitmarkers, damage numbers, and friendly-fire rules — for friendly fire you would compare teams and, on a violation, heal the victim back with `setHealth`. The client also receives a local `playerDamage` mirror (with extra `health`/`healthLost` fields) for zero-latency feedback on the victim's own screen.

## Movement, water, and misc state

- `player.getMovementState()` returns `"idle" | "walking" | "running" | "stopping"`; `player.isCrouching()` for stance.
- `playerSubmerged` fires when a player goes underwater (with the vehicle they sank in, or `null` on foot). The game's native drowning sequence resurfaces them at the nearest shore — you don't need to handle rescue yourself.
- `playerWeaponSwitch`, `playerWeaponFire`, and `playerWeaponThrow` trace weapon use. `playerWeaponFire` fires once per shot — keep its handler cheap.

## Waypoints

The [world map](/guides/client/hud/#the-world-map) GPS raises three server events: `playerWaypointSet` when the player drops a waypoint by clicking the map, `playerWaypointReached` when the game's native arrival check clears it, and `playerWaypointCleared` when the player removes it by clicking its marker. A waypoint set programmatically via the client's `WorldMap.setWaypoint` does **not** raise `playerWaypointSet` — only reaching it raises `playerWaypointReached`, for both origins. That asymmetry lets you distinguish "the player chose a destination" from "the script assigned one".
