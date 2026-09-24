---
title: Overview
sidebar:
  order: 1
---

M2O resources run JavaScript in one of two environments:

- **Server resources** run in Node.js and own authoritative game state — players, vehicles, world, money.
- **Client resources** run in a sandboxed V8 context on each player's machine and control local presentation and input — HUD, key binds, web views, the camera.

Use the navigation to browse the globals available to the selected environment. The same declarations that generate this reference can be loaded by an editor for autocomplete and type checking.

## Server example

```js
Events.on("playerConnect", (player) => {
  // HUD text is local to the owning client: send an intent and let the client draw it.
  player.emit("mygm:welcome", JSON.stringify({ text: `Welcome, ${player.nickname}`, seconds: 5 }));

  const spawn = new Vector3(250, 120, 0);
  const vehicle = Vehicle.spawn(32, spawn);
  vehicle.setColor(140, 20, 20);
});
```

## Client example

```js
Events.on("mygm:welcome", (data) => {
  Hud.showMessage(data.text, data.seconds);
});

Key.bind("f6", () => {
  Hud.setVisible(!Hud.isVisible());
});

const player = LocalPlayer;
if (player) {
  const screen = Camera.worldToScreen(player.position.x, player.position.y, player.position.z);
  console.log(screen.x, screen.y, screen.visible);
}
```

:::caution
Server and client declarations must be loaded separately. A global shown in one environment is not automatically available in the other.
:::

## Finding your way

**Start here:**

- [Your first resource](/guides/basics/getting-started/) — the manifest, script roles, and sharing code between resources.
- [Running a server](/guides/basics/server-setup/) — `server.json`, ports, and hosting.

**The two ideas everything builds on:**

- [Events](/guides/concepts/events/) — listeners, the client↔server bridge, and the trust boundary.
- [Server, client, and the UI](/guides/concepts/ui-architecture/) — why UI is client-side and the intent pattern that follows.

**Server-side systems:** [chat and commands](/guides/server/chat-commands/), the [player lifecycle](/guides/server/player-lifecycle/), [vehicles](/guides/server/vehicles/), [world entities and triggers](/guides/server/world-entities/), [shops and economy](/guides/server/shops-economy/), [persistence](/guides/server/persistence/), and [seasons](/guides/server/seasons/).

**Client-side systems:** the [HUD and native UI](/guides/client/hud/), [input and controls](/guides/client/input-controls/), [Render2D](/guides/client/render2d/), and [web views](/guides/client/web-views/).

**Illustrated catalogs:** [weapon IDs](/guides/catalogs/weapons/), [map blip icons](/guides/catalogs/map-blips/), [vehicle wheel models](/guides/catalogs/wheels/), [weather templates](/guides/catalogs/weather/), [marker models](/guides/catalogs/markers/), [prop models](/guides/catalogs/props/), [character models](/guides/catalogs/character-models/), [hand props](/guides/catalogs/hand-props/), and [animation clips](/guides/catalogs/animations/).
