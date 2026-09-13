---
title: Input and controls
sidebar:
  order: 14
---

# Input and controls

Input handling is entirely client-side: key binds for your own features, and two levels of gating over the game's built-in controls — an all-or-nothing switch and a per-ability style mask. The server never intercepts input; it ships a mask down once and the client applies it locally.

## Key binds

```js title="client/main.js"
Key.bind("f6", "down", () => togglePanel());

// Both edges: the handler receives the key and which edge fired.
Key.bind("b", "both", (key, state) => {
  console.log(`${key} ${state}, held=${Key.isDown(key)}`);
});

Key.unbind("f6");
```

`Key.bind(key, state, handler)` takes `"down"`, `"up"`, or `"both"`; passing the handler as the second argument defaults to `"down"`. Key names are case-insensitive (`"f6"`, `"b"`, …).

Two ownership rules keep binds predictable:

- Binds fire only in-session **while no UI owns input** — an open chat box, the escape menu, the debug cursor, or a focused [web view](/guides/client/web-views/) suspends them. The native [world map](/guides/client/hud/#the-world-map) does *not*: binds keep firing while it is up, which is how a toggle bind closes it.
- Binds are **resource-owned**: they are cleared automatically when your resource stops.

A bind that should have a replicated effect relays to the server, which applies it authoritatively — the client never mutates shared state itself:

```js title="client/main.js"
Key.bind("r", "down", () => {
  Events.emitServer("mygm:vehicleToggle", { accessory: "engine" });
});
```

The matching, whitelist-validating server handler is shown in the [Events guide](/guides/concepts/events/#the-trust-boundary).

## Enabling and disabling all input

```js title="client/main.js"
Controls.setEnabled(false);  // freeze movement, combat, vehicle input; no cursor shown
Controls.setEnabled(true);
Controls.isEnabled();
```

This is the blunt instrument — cutscenes, freeze-on-countdown. For anything finer, use styles.

## Control styles: gating individual abilities

`Controls.setStyle(mask)` gates individual abilities with the bits in `Controls.Style`: `Fire`, `WeaponSelect`, `WeaponManip`, `CarDrive`, `CarInOut`, `Sprint`, `Covers`, `Crouch`, and more, plus the precomputed `All`, `None`, and `NoWeapons`.

```js title="client/main.js"
Controls.setStyle(Controls.Style.NoWeapons); // no firing/reloading/drawing; melee and movement stay
Controls.setStyle(Controls.Style.All & ~Controls.Style.CarDrive); // everything but driving
Controls.setStyle(Controls.Style.None);      // frozen
Controls.setStyle(Controls.Style.All);       // back to normal
Controls.getStyle();
```

`NoWeapons` is the classic no-weapon-zone building block. The style survives respawn, so clear it explicitly when the restriction ends.

Server-driven gating is the usual [intent pattern](/guides/concepts/ui-architecture/) — the server decides *who* is restricted, the client applies the mask:

```js title="server/main.js"
// Entering the safe zone:
clientCall(player, "controls.setStyle", { style: "noweapons" });
// Leaving:
clientCall(player, "controls.setStyle", { style: "all" });
```

```js title="client/main.js"
const STYLES = {
  all: () => Controls.Style.All,
  none: () => Controls.Style.None,
  noweapons: () => Controls.Style.NoWeapons,
};
CLIENT_CALLS["controls.setStyle"] = (a) => {
  const style = STYLES[a.style];
  if (style) Controls.setStyle(style());
};
```

Sending a named style instead of a raw number keeps the client in charge of what the bits mean and gives the server a readable vocabulary.

:::note
Style masks and `Controls.setEnabled` are honest-client presentation gates, not anti-cheat: they stop the *game* from acting on input, locally. Server-side rules (ignoring damage from players inside a safe zone, say) are the enforcement layer.
:::

## Reading the local player

Some input features need the local player's physical state:

```js title="client/main.js"
const lp = LocalPlayer;                    // null until spawned
if (lp) {
  const head = lp.getBoneTransform(Bone.Head);  // { position, rotation, forward } | null
  const vehicle = lp.getVehicle();              // Vehicle | null
  if (vehicle) {
    const trunk = vehicle.getPartTransform(VehiclePart.Trunk);
  }
}
```

`Bone` enumerates the full Mafia II skeleton, `VehiclePart` the semantic vehicle slots (doors by hinge side and row, hood, trunk); a part the model lacks returns `null`. Combined with `Camera.worldToScreen`, bone and part transforms anchor [Render2D](/guides/client/render2d/) or web-view overlays to things in the world.
