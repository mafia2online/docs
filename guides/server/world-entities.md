---
title: World entities and triggers
sidebar:
  order: 9
---

# World entities and triggers

Beyond players and vehicles, the server can place eight kinds of world entity: map blips, 3D markers, floating text labels, static props, NPCs, invisible blockers, spike strips, and "press Use" action points. All are created server-side, replicated to clients, and replayed to late joiners; most are **interest-streamed**, appearing only for players near them.

Every entity type shares the `Entity` base: `position`, `rotation`, `virtualWorld` + `setVirtualWorld(world)`, `setVisibleTo(player | null)`, and `destroy()`. Each type also has a hard cap on simultaneous instances — creation throws once the cap is reached, so wrap bulk creation in `try`/`catch` and reuse instances where you can.

| Type | Create | Cap | Streamed |
|:-----|:-------|----:|:---------|
| `Blip` | `Blip.create(x, y, z, library, iconId, color?, virtualWorld?)` | 256 | no — map-wide |
| `Marker` | `Marker.create(x, y, z, model?, virtualWorld?, triggerRadius?)` | 256 | yes |
| `TextLabel` | `TextLabel.create(x, y, z, text, fontSize?, drawDistance?, virtualWorld?)` | 512 | yes |
| `Prop` | `Prop.create(x, y, z, model, rotation?, collision?, virtualWorld?)` | 32 | yes |
| `Npc` | `Npc.create(x, y, z, model, name?, rotation?, invincible?, virtualWorld?)` | 16 | yes |
| `Blocker` | `Blocker.create(x, y, z, sizeX, sizeY, sizeZ, typeMask?, rotation?, virtualWorld?)` | 64 | yes |
| `SpikeStrip` | `SpikeStrip.create(x, y, z, length?, heading?, virtualWorld?)` | 128 | yes |
| `ActionPoint` | `ActionPoint.create(x, y, z, radius?, textId?, virtualWorld?)` | 256 | yes |

## Blips

Map icons, drawn for everyone regardless of distance. An icon is a `(library, id)` pair from the game's atlas — see the illustrated [blip icon catalog](/guides/catalogs/map-blips/) — and `color` is an index (`0`–`8`) into the navigation palette, whose entries are named for their use rather than their colour (see the catalog for what renders). Blips can follow entities:

```js title="server/main.js"
Events.on("playerConnect", (player) => {
  const blip = Blip.create(0, 0, 0, 0, 3, 1); // StarBig, player-blue
  blip.attachToPlayer(player);
  playerBlips.set(player.id, blip);           // destroy it on playerDisconnect
});
```

`setIcon(library, id)` restyles a live blip; `attachToVehicle(vehicle)` follows a car.

## Markers and trigger volumes

Markers are floating 3D icons; `model` picks one of the [marker models](/guides/catalogs/markers/). Created with a `triggerRadius`, a marker doubles as a **native trigger volume**: `markerHit` and `markerLeave` fire server-side when a player's body crosses the sphere — event-driven on the client, no per-tick polling on your side.

```js title="server/main.js"
const pickup = Marker.create(x, y, z, 0, undefined, 3.0); // model 0 (RTR_POUTA), 3m trigger
pickup.setScale(1.5);
pickup.setColor(255, 80, 0);

Events.on("markerHit", (marker, player) => {
  if (marker.id !== pickup.id) return;
  notify(player, "Checkpoint reached!");
});
```

## Text labels

World-space text drawn by clients. `\n` makes multi-line text; `setStyle` picks the treatment (`0` none, `1` shadow, `2` outline, `3` box); `setDrawDistance`/`setFadeDistance` control visibility falloff.

The `setVisibleTo(player)` restriction from the `Entity` base is especially useful here — a label only one player can see makes per-player objective text with no client scripting at all:

```js title="server/main.js"
const label = TextLabel.create(x, y, z + 2.0, "Your target\nis here", 18, 40);
label.setStyle(3);
label.setVisibleTo(player);   // replicated only to this player's client
```

## Props, blockers, and spike strips

- **Props** are non-destructible static world objects (crates, trees, crash meshes) from the server's prop registry; `model` is a flat index into it, listed in the [prop catalog](/guides/catalogs/props/). `collision: false` makes decoration players and cars pass through, and the `collision` property can be flipped live.
- **Blockers** are invisible collision boxes. The `typeMask` selects what they stop — vehicles, pedestrians, or both — which makes them the building block for closing a street or fencing an event area without visible geometry.
- **Spike strips** are invisible line triggers (`length` meters at `heading` radians): a car driving across an enabled strip gets a tyre punctured (`setEnabled(false)` disarms without destroying).

## NPCs

Server-driven humans, held at the pose the server gives them — no wandering AI. They are invincible unless created with `invincible: false`, in which case shots damage them and `npcDeath` fires **once** server-side however many clients saw the hit (the server owns NPC health):

```js title="server/main.js"
const guard = Npc.create(x, y, z, 12, "Doorman", undefined, false);

Events.on("npcDeath", (npc, killer, info) => {
  if (killer) notify(killer, `You killed ${npc.getNametagText() || "an NPC"}.`);
  setTimeout(() => npc.respawn(), 10_000); // back to full health, same spot
});
```

The `model` argument is an index into the same registry as `player.setModel`; see the [character model catalog](/guides/catalogs/character-models/).

NPCs carry the same nametag controls as players: `setNametagText`, `setNametagColor`, `setNametagVisible`, `setNametagHealthVisible`.

## Action points

An action point is an invisible "press Use" spot: a player standing inside `radius` sees the native use prompt (with the `C_TextDatabase` text id you pass, or no label for `0`), and pressing Use fires `actionPointHit` server-side:

```js title="server/main.js"
const door = ActionPoint.create(x, y, z, 1.5);

Events.on("actionPointHit", (actionPoint, player) => {
  if (actionPoint.id !== door.id) return;
  // Open the door, start the mission, show a prompt…
});
```

Markers-with-radius answer "did the player walk here"; action points answer "did the player deliberately interact here". Pick per intent.

## Virtual worlds

Every entity and player has a `virtualWorld`. Entities are only visible to players in the same virtual world (the global world `0xFFFFFFFF` sees and is seen by all), which is the standard tool for parallel instances: interiors, per-group minigames, or staging areas — same map, isolated populations.

## Teardown discipline

Nothing you create is tied to your script's lifetime. Track every handle and destroy them in `resourceStop`, and remove per-player entities in `playerDisconnect`:

```js title="server/main.js"
Events.on("resourceStop", (resourceName) => {
  if (resourceName !== "my-gamemode") return;
  for (const blip of playerBlips.values()) { try { blip.destroy(); } catch {} }
  playerBlips.clear();
});
```
