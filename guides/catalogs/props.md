---
title: Prop models
sidebar:
  order: 22
---


# Prop model indexes

`Prop.create(x, y, z, model, rotation?, collision?, virtualWorld?)` takes a flat index into M2O's prop registry. Each entry is a static world object from the game's `city_crash` archive, named by its frame in that archive; many frame names are Czech, as the game shipped them.

```js
const bench = Prop.create(x, y, z, 14, new Vector3(0, 0, Math.PI / 2)); // lavicka, a park bench
```

The server does not check the index. A prop with an unknown index is still created and counts toward the 32-prop limit, but every client logs `unknown model` and shows nothing, so check new indexes in game.

| Index | Model | Group |
|------:|:------|:------|
| `0` | `quercus01` | Trees & plants |
| `1` | `quercus02` | Trees & plants |
| `2` | `pinus01` | Trees & plants |
| `3` | `populus01` | Trees & plants |
| `4` | `acer01` | Trees & plants |
| `5` | `ailanthus01` | Trees & plants |
| `6` | `bush01` | Trees & plants |
| `7` | `bush05` | Trees & plants |
| `8` | `hedgerow` | Trees & plants |
| `9` | `sud02` | Barrels, boxes, containers |
| `10` | `cpapirovy_box` | Barrels, boxes, containers |
| `11` | `bedna_6sten` | Barrels, boxes, containers |
| `12` | `Kont01` | Barrels, boxes, containers |
| `13` | `Kont02` | Barrels, boxes, containers |
| `14` | `lavicka` | Street furniture |
| `15` | `zidle` | Street furniture |
| `16` | `kos` | Street furniture |
| `17` | `popelnic` | Street furniture |
| `18` | `hydrant` | Street furniture |
| `19` | `mailbox` | Street furniture |
| `20` | `newstand` | Street furniture |
| `21` | `busstop` | Street furniture |
| `22` | `parkmetr` | Street furniture |
| `23` | `lampa_dum01` | Lamps |
| `24` | `lampNadTun` | Lamps |
| `25` | `stop` | Signs |
| `26` | `parking` | Signs |
| `27` | `donotenter` | Signs |
| `28` | `acer02` | Trees |
| `29` | `ailanthus02` | Trees |
| `30` | `ailanthus03` | Trees |
| `31` | `ailanthus04` | Trees |
| `32` | `ailanthus05` | Trees |
| `33` | `celtis01` | Trees |
| `34` | `fraxinus01` | Trees |
| `35` | `picea01` | Trees |
| `36` | `prunus01` | Trees |
| `37` | `bush02` | Bushes & plants |
| `38` | `bush03` | Bushes & plants |
| `39` | `bush04` | Bushes & plants |
| `40` | `bush06` | Bushes & plants |
| `41` | `bush07` | Bushes & plants |
| `42` | `bush08` | Bushes & plants |
| `43` | `bush09` | Bushes & plants |
| `44` | `bush10` | Bushes & plants |
| `45` | `bush11` | Bushes & plants |
| `46` | `hedgerow_long` | Bushes & plants |
| `47` | `plant_red01` | Bushes & plants |
| `48` | `plant_yelow01` | Bushes & plants |
| `49` | `weed_big01` | Weeds / grass tufts |
| `50` | `weed_big02` | Weeds / grass tufts |
| `51` | `weed_big03` | Weeds / grass tufts |
| `52` | `weed_big04` | Weeds / grass tufts |
| `53` | `weed_big05` | Weeds / grass tufts |
| `54` | `weed_small01` | Weeds / grass tufts |
| `55` | `weed_small02` | Weeds / grass tufts |
| `56` | `weed_small03` | Weeds / grass tufts |
| `57` | `sud03` | Barrels, boxes & crates |
| `58` | `sud04` | Barrels, boxes & crates |
| `59` | `sud_bezdom` | Barrels, boxes & crates |
| `60` | `sudpristav` | Barrels, boxes & crates |
| `61` | `cpapirovy_box_4` | Barrels, boxes & crates |
| `62` | `cpapirovy_box_5` | Barrels, boxes & crates |
| `63` | `cpapirovy_box_8` | Barrels, boxes & crates |
| `64` | `vana_olej` | Bins, shelves & tubs |
| `65` | `rafek4` | Bins, shelves & tubs |
| `66` | `rafky01` | Bins, shelves & tubs |
| `67` | `rafky02` | Bins, shelves & tubs |
| `68` | `lavicka_planetarium` | Bins, shelves & tubs |
| `69` | `mailboxS` | Street furniture |
| `70` | `newsbox` | Street furniture |
| `71` | `newstand_new` | Street furniture |
| `72` | `telefonbudka` | Street furniture |
| `73` | `clock` | Street furniture |
| `74` | `hlasic` | Street furniture |
| `75` | `pachole01` | Street furniture |
| `76` | `lampLuxus` | Lamps |
| `77` | `lampl` | Lamps |
| `78` | `lamph` | Lamps |
| `79` | `lampa_dalnice` | Lamps |
| `80` | `lampa_dum02` | Lamps |
| `81` | `lampa_dum03` | Lamps |
| `82` | `lampa_dum04` | Lamps |
| `83` | `lampa_dum05` | Lamps |
| `84` | `spd10` | Signs, cones & barriers |
| `85` | `spd50` | Signs, cones & barriers |
| `86` | `spd80` | Signs, cones & barriers |
| `87` | `onewayleftarrow` | Signs, cones & barriers |
| `88` | `onewayrightarrow` | Signs, cones & barriers |
| `89` | `semfo` | Signs, cones & barriers |
| `90` | `kuzel01` | Signs, cones & barriers |
| `91` | `kuzel02` | Signs, cones & barriers |
| `92` | `road_block` | Signs, cones & barriers |
| `93` | `roadblck` | Signs, cones & barriers |
| `94` | `roadclosed` | Signs, cones & barriers |
| `95` | `green_plot_pletivo` | Fences, railings & gates |
| `96` | `plotH3m` | Fences, railings & gates |
| `97` | `plotL3m` | Fences, railings & gates |
| `98` | `dplot01` | Fences, railings & gates |
| `99` | `zabradli_rov2m` | Fences, railings & gates |
| `100` | `zabradli_sloupek` | Fences, railings & gates |
| `101` | `green_door_branka_vysoka` | Fences, railings & gates |
| `102` | `green_door_vrata_vysoka` | Fences, railings & gates |
| `103` | `green_door_brana_mriz` | Fences, railings & gates |
| `104` | `plechpl01` | Fences, railings & gates |
| `105` | `pneu02` | Tyres |
| `106` | `pneu03` | Tyres |
| `107` | `pneu02_static` | Tyres |
| `108` | `pneu03_static` | Tyres |
| `109` | `wreck03` | Misc standalone objects |
| `110` | `wreck04` | Misc standalone objects |
| `111` | `vodojem` | Misc standalone objects |
