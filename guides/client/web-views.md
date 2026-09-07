---
title: Web views
sidebar:
  order: 16
---

# Web views

For interfaces richer than [Render2D](/guides/client/render2d/) widgets — menus, inventories, scoreboards with real layout — the client can open embedded browser views and drive them with HTML, CSS, and page JavaScript. The `Web` global manages the views; a small event bridge connects the page to your client script, and from there the normal [client↔server events](/guides/concepts/events/#crossing-the-network) reach the server.

## Shipping and serving pages

Put your pages inside the resource's client directory; they are streamed to players with the resource and served locally through the internal origin:

```text
fw://resources/<resource-name>/<path-inside-resource>
```

```js title="client/main.js"
const viewId = Web.createView("fw://resources/my-gamemode/client/ui/index.html", {
  width: 640,
  height: 420,
  x: 60,
  y: 60,
  zIndex: 10,
  visible: true,
  focus: true,
});
```

`createView` returns a numeric view id used by every other call. Views are windowed: position and size are pixels (`Web.getScreenSize()` for the full screen), `resizeView` and `setViewPosition` move them live, and multiple views stack by `zIndex`.

## The focus gate

A **focused** view owns the mouse and keyboard and releases the game controls; hiding or unfocusing it hands control back. This is the game/UI input boundary in one flag:

```js title="client/main.js"
Web.focusView(viewId, false);  // keep it drawn, return input to the game
Web.hideView(viewId);          // hide (also drops focus)
Web.showView(viewId);
Web.isViewVisible(viewId);
```

An unfocused, visible view is a passive overlay — a HUD panel that still renders live data while the player drives. Remember that [key binds](/guides/client/input-controls/) do not fire while a focused view owns input.

## Page ↔ script events

The page calls a global `callEvent(name, payloadJson)`; your script listens with `Web.on`. Your script calls `Web.emit`; the page receives a `CustomEvent` on `window` with the payload in `detail`:

```js title="client/main.js"
Web.on(viewId, "ui:ready", (payload) => {
  // JSON payloads arrive parsed.
  Web.emit(viewId, "m2o:init", { resource: "my-gamemode" });
});

Web.on(viewId, "ui:close", () => {
  Web.destroyView(viewId);
});
```

```js title="client/ui/index.html (page script)"
window.addEventListener("m2o:init", (e) => {
  console.log("view initialized by", e.detail.resource);
});

document.querySelector("#close").addEventListener("click", () => {
  callEvent("ui:close", "{}");
});
```

## Reaching the server

The full loop is page → client script → server and back — the page never talks to the server directly, and the client script is the place to keep the vocabulary narrow:

```js title="client/main.js"
// Page buttons relay up…
Web.on(viewId, "ui:action", (payload) => {
  Events.emitServer("mygm:ui", payload || {});
});

// …and server replies land back in the panel.
Events.on("mygm:uiResult", (data) => {
  if (viewId >= 0) Web.emit(viewId, "ui:result", data);
});
```

```js title="server/main.js"
Events.onClient("mygm:ui", (player, data) => {
  if (data.action === "heal") {
    player.restoreHealth();
    player.emit("mygm:uiResult", JSON.stringify({ message: "Healed!" }));
  }
});
```

The server-side handler follows the usual [trust rules](/guides/concepts/events/#the-trust-boundary): whitelist the actions, take the player from the handler argument, validate everything else.

## Navigation and diagnostics

`Web.loadURL(viewId, url)` navigates an existing view. Views are **origin-locked** to their owning resource: a page navigating cross-origin, to an invalid URL, or to a filtered host is refused, and a `BrowserResourceBlockedEvent` reports why (`cross-origin`, `invalid-url`, `host-filter`, `foreign-event`).

A family of browser lifecycle payloads — view created, loading started/ready/failed, navigation, popups, cursor and focus changes, and page console messages (`BrowserConsoleMessageEvent`, with the message, source, line, and severity) — is documented alongside `Web` in the [client reference](/reference/client/variables/web/); the console messages are the first place to look when a page misbehaves.

### Subscribing to browser view events

Those payload interfaces are not listed in `EventMap`, and `Web.on` does not deliver them — `Web.on(viewId, eventName)` only carries events the page itself raises with `callEvent`. Browser view events are dispatched to the shared `Events.on` table instead, named after the payload interface in camelCase and carrying the payload as a single argument:

```js title="client/main.js"
Events.on("browserInputFocusChange", (e) => {
  // e = { viewId: number, focused: boolean }
  console.log(`view ${e.viewId} focus: ${e.focused}`);
});

Events.on("browserCursorChange", (e) => {
  // e = { viewId: number, cursor: string, cursorType: number }
});

Events.on("browserResourceBlocked", (e) => {
  // e = { viewId: number, url: string, reason: string }
});
```

Every payload includes `viewId`, so a script with several views should filter on it. `browserInputFocusChange` reports the engine's actual input focus for a view, which makes it the reliable gate for suppressing game hotkeys while the player is typing into a page.

## Cleanup

Destroy views on `resourceStop` — the framework would collect them anyway, but an explicit teardown also stops your timers:

```js title="client/main.js"
Events.on("resourceStop", (resourceName) => {
  if (resourceName !== "my-gamemode") return;
  clearInterval(tickTimer);
  if (viewId >= 0) Web.destroyView(viewId);
});
```

:::tip
Create heavy views once and toggle them with `hideView`/`showView` instead of destroying and recreating — a hidden view keeps its DOM and state, and reappears instantly.
:::
