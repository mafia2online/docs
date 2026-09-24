---
title: Marker models
sidebar:
  order: 18.5
---


# Marker model indexes

`Marker.create(x, y, z, model?, virtualWorld?, triggerRadius?)` draws one of the game's trigger markers. `model` defaults to `0` and must be below `20`; a larger value throws `Marker.create: invalid marker model`.

```js
const pickup = Marker.create(x, y, z, 1, undefined, 3.0); // RTR_PARKING, 3 m trigger
```

All 20 markers are frames of the game's `fr_trigger_models` script archive. M2O's model registry marks them as DLC content, and the game names them by frame only.

| Model | Frame |
|------:|:------|
| `0` | `RTR_POUTA` |
| `1` | `RTR_PARKING` |
| `2` | `RTR_IR1` |
| `3` | `RTR_IR2` |
| `4` | `RTR_IR3` |
| `5` | `RTR_IR4` |
| `6` | `RTR_BO1` |
| `7` | `RTR_BO2` |
| `8` | `RTR_BO3` |
| `9` | `RTR_BO4` |
| `10` | `RTR_CH1` |
| `11` | `RTR_CH2` |
| `12` | `RTR_CH3` |
| `13` | `RTR_CH4` |
| `14` | `RTR_IT1` |
| `15` | `RTR_IT2` |
| `16` | `RTR_IT3` |
| `17` | `RTR_IT4` |
| `18` | `RTR_FI` |
| `19` | `RTR_PARKING01` |
