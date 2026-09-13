---
title: HUD and native UI
sidebar:
  order: 13
---

# HUD and native UI

The client owns every native UI element: the HUD layer, messages and hints, the countdown timer, the wanted display, prompts, and screen fades. None of it is replicated — the server drives it with [intents](/guides/concepts/ui-architecture/). This guide is the reference for the client half of that conversation.

## The HUD layer

```js title="client/main.js"
Hud.setVisible(false);   // hide the whole HUD (minimap, health, cash, …)
Hud.isVisible();         // current state
Hud.show(); Hud.hide();  // the same switch, imperative style
```

Visibility is refcounted natively — balance your shows and hides rather than spamming one side.

## Messages and hints

```js title="client/main.js"
// Top-of-screen message for 5 seconds.
Hud.showMessage("Round over — Sicily wins!", 5);

// Centered native hint. Areas: 0 top-left, 1 bottom-left, 2 minimap, 3 center.
Hud.showHint("Find the informant", 3);

// A persistent hint stays until destroyed by its tag.
const OBJECTIVE_TAG = 1;
Hud.showHint("Objective: reach the docks", 0, 0, 0, true, OBJECTIVE_TAG);
Hud.destroyHint(OBJECTIVE_TAG);
```

`showHint(text, area?, color?, durationSeconds?, persist?, tag?)` — a non-persistent hint expires on its own; a persistent one is removable and re-usable via its tag, which is how a live objective line works.

## Timers, wanted level, recognition

```js title="client/main.js"
Hud.startTimer(30);          // native on-screen countdown
Hud.stopTimer();

Hud.setWantedLevel(2);       // 0-4: ticket / handcuffs / revolver / thompson icons
Hud.clearWantedLevel();
Hud.setWantedTag(true);      // the wanted-person icon, independent of level
Hud.setRecognition(0.5);     // minimap recognition/search bar, 0..1
Hud.clearRecognition();
Hud.setDrunkLevel(0.8);      // screen effect
```

These are pure presentation. A "wanted" system's logic (who is wanted, what the police do) lives server-side; the server just tells each relevant client what to display.

## Questions, dialogs, and the lockpick minigame

The `Ui` global runs the native prompt screens; each resolves through a client event carrying the opaque id you passed in:

```js title="client/main.js"
Ui.showQuestion(7, "Take the job?", ["Yes", "No", "Ask for more"], 15);

Events.on("questionAnswer", (answer) => {
  // answer.questionId === 7; answer.answerId is the 1-based slot, -1 on timeout
});

Ui.showDialog(8, "Overwrite save?", "Overwrite", "Cancel", 10);
Events.on("dialogAnswer", (answer) => {
  // answer.questionId === 8; answer.answerId 1 = accepted
});

Ui.startLockpick(9, 3, 5);   // id, pins, maxFails
Events.on("lockpickResult", (result) => {
  // result.lockpickId === 9; result.result: 0 completed, 1 failed, 2 escaped
});
```

`Ui.cancelQuestion()` and `Ui.cancelLockpick()` withdraw an active prompt. When the *server* needs the outcome — unlock the door, pay the reward — relay it up with `Events.emitServer` and validate it there, as shown in [Server, client, and the UI](/guides/concepts/ui-architecture/#consequences-up).

## Screen fades and the camera

```js title="client/main.js"
Fade.out(0.5);               // to black over half a second
setTimeout(() => Fade.in(0.5), 1500);

Camera.setPosition(x, y, z, lookX, lookY, lookZ);   // scripted camera, stays until reset
Camera.interpolate(x2, y2, z2, lookX, lookY, lookZ, 3.0); // glide over 3s
Camera.reset();                                     // back to the player
Camera.isScripted();

const screen = Camera.worldToScreen(wx, wy, wz);    // { x, y, visible }
```

`worldToScreen` is the bridge between world space and anything you draw yourself ([Render2D](/guides/client/render2d/), [web views](/guides/client/web-views/)); `visible` is `false` when the point is behind the camera. Both `Fade` calls accept a second `blockInput` argument for cutscene-style transitions.

## Nametags

Tags over other players are controlled from both sides, and a tag draws only when **both** allow it:

- **Server** (per player, seen by everyone): `player.setNametagVisible`, `setNametagHealthVisible`, `setNametagText(text)` (empty restores the nickname), `setNametagColor(0xAARRGGBB)`. The owning client applies the change, so a getter reflects a set one round-trip later.
- **Client** (this viewer's own preference over *all* tags): `Nametags.setVisible(bool)`, `Nametags.setHealthVisible(bool)` and their getters.

## The world map

```js title="client/main.js"
WorldMap.open();             // scripts own the map: Tab/M do not open it in a session
WorldMap.close();
WorldMap.isOpen();           // flips true once the open fade completes
WorldMap.setWaypoint(x, y);  // GPS route; does NOT fire the server's playerWaypointSet
WorldMap.clearWaypoint();
```

The map is **modal**. While it is up it takes the gameplay controls and hides the HUD, so the player stands still under a fullscreen map. Nothing is paused by this — the world keeps running, other players keep moving, and the server sees no difference — but to the player who opened it, a map they cannot get out of is indistinguishable from a frozen game.

:::caution
The game has no built-in way to close the map, and Tab/M do not reach it. **Every `WorldMap.open()` needs a close path you provide** — a toggle bind, a timer, or a server event — or the player is stuck there until they restart the game.
:::

Key binds keep firing while the map is open, so a toggle bind is the usual pattern:

```js title="client/main.js"
Key.bind("m", "down", () => {
  if (WorldMap.isOpen()) {
    WorldMap.close();
  } else {
    WorldMap.open();
  }
});
```

Because `isOpen()` only flips true once the open fade completes, a second press during the fade takes the `open()` branch again instead of closing. Track your own "requested open" flag if the map can be driven from a fast-repeating source.

If you want a map that leaves the player in control, draw your own from [Render2D](/guides/client/render2d/) or a [web view](/guides/client/web-views/) instead; the native one is always modal.
