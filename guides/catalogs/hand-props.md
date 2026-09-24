---
title: Hand props
sidebar:
  order: 17.5
---


# Hand prop IDs

`player.modelToHands(enabled, leftModelId, rightModelId)` and `player.modelToMouth(modelId)` place a visual model in a player's hands or mouth. Both take a row ID from the game's `weapons.tbl`, the same table the [weapon IDs](/guides/catalogs/weapons/) come from, but they also accept the rows that are props rather than weapons: cases, tools, food, handcuffs and so on.

```js
player.modelToHands(true, -1, 46); // suitcase in the right hand; -1 leaves the left hand empty
player.modelToMouth(-1);           // clear the mouth slot
player.clearHandModels();          // clear both hands and the mouth
```

An ID that is not in the table below clears that slot. The hand slots are shared with the equipped weapon, and `modelToHands(false, ...)` clears both hands but leaves the mouth. Names are the ones `weapons.tbl` uses, many of them Czech; rows marked **Weapon** are also listed in the weapon catalogue.

| ID | Name | Model file | Weapon |
|---:|:-----|:-----------|:------:|
| `2` | .38 MP2 | `38mp` | yes |
| `3` | Mauser C-96 | `Mauser` | yes |
| `4` | Colt 1911 | `c1911` | yes |
| `5` | Colt 1911 Ext | `ColtEM` | yes |
| `6` | .357 Magnum | `Magnum` | yes |
| `7` | Grenade Sicily | `grenad` | yes |
| `8` | Remington 870 | `shotgn` | yes |
| `9` | M3 Grease gun | `M3grease` | yes |
| `10` | MP 40 | `MP40` | yes |
| `11` | Thompson 1928 | `tommy` | yes |
| `12` | Thomson M1A1 | `ThomM1` | yes |
| `13` | Beretta 38A | `Berett` | yes |
| `14` | MG42 | `MG42` | yes |
| `15` | M1 Garand | `Garand` | yes |
| `16` | Stielhandgranate 24 | `Sthg24` | yes |
| `17` | Mauser 98k | `MAU98K` | yes |
| `18` | Mauser 98k sniper | `SNIPER` | yes |
| `19` | Bazooka | `Bazook` | yes |
| `20` | Grenade MkII | `grenad` | yes |
| `21` | Molotov | `Molotov2` | yes |
| `22` | Knife | `knife` | yes |
| `23` | Knuckleduster | `Boxer` | yes |
| `24` | Wrench | `Hasak` | yes |
| `25` | Pipe | `Pipe_FMV` | yes |
| `26` | Chopper | `Sekac` | yes |
| `27` | Crowbar | `pacidl` | yes |
| `28` | Pendrek | `pendrk` | yes |
| `29` | Bottle | `Lahev` | yes |
| `30` | Torch | `baterk` | yes |
| `31` | Sterka na okna | `sterka` |  |
| `32` | Baseball bat | `Palka` | yes |
| `33` | Cue | `TAGO` | yes |
| `34` | Shovel | `lopata` | yes |
| `35` | Snow shovel | `lopata_na_snih` |  |
| `36` | Pick | `-` |  |
| `37` | Broom | `KOSTE` |  |
| `38` | Gasoline container | `kanistr` |  |
| `39` | money | `money` |  |
| `40` | suit | `CS_jacketANIM` |  |
| `41` | PaperBag | `CS_taskaANIM` |  |
| `42` | Pencil | `tuzka` |  |
| `43` | Box | `DE_bedna` |  |
| `44` | Bottle | `DE_lahev01` |  |
| `45` | Keys | `POklice` |  |
| `46` | Suitcase | `kufrik` |  |
| `47` | Newspaper | `news_small` |  |
| `48` | HotDog | `7hotdog` |  |
| `49` | Coffee | `kafe_salek` |  |
| `50` | Beer | `FB_beer_full` |  |
| `51` | Seagift Box | `SG_bedna` |  |
| `52` | Policeblok | `POLICE_blok` |  |
| `53` | Pouta-POLICE | `pouta` |  |
| `54` | ball | `ball_basket` |  |
| `55` | LTC | `POLICE_listek` |  |
| `56` | Policepencil | `POLICE_tuzka` |  |
| `57` | Penalty | `POLICE_listek` |  |
| `58` | Cigarette Blues | `cig_blues` |  |
| `59` | Cigarette Reds | `cig_reds1` |  |
| `60` | Cigarette Whites | `cig_whites` |  |
| `61` | Cigaret | `FB_cigareta_ingame` |  |
| `62` | lighter | `FB_zippo_SCRIPT` |  |
| `63` | Pouzdro | `batoh` |  |
| `64` | Pouta-PRISON | `pouta` |  |
| `65` | Burger | `hamburgr` |  |
| `66` | Sandwich | `sandwich` |  |
| `68` | Panak whisky | `FB_shot_glass` |  |
| `69` | Beer - empty | `FB_beer_empty` |  |
| `70` | stredni kufr | `kufr1` |  |
| `71` | brasna svetla | `brasna_ingame` |  |
| `72` | brasna tmava | `brasna01_ingame` |  |
| `73` | kabelka bila | `kabelka_ingame` |  |
| `74` | kabelka ruzova | `kabelka02_ingame` |  |
| `75` | kabelka cerna | `kabelka03_ingame` |  |
| `76` | kufr velky bily | `kufr01_ingame` |  |
| `77` | kufr velky zeleny | `kufr04_ingame` |  |
| `78` | kulomet item | `kufr04_ingame` |  |
| `79` | ketchup | `ketchup_i` |  |
| `80` | bankovka | `penize` |  |
| `81` | svazek bankovek | `balik_penez` |  |
| `82` | hadr bar | `hadr_bar` |  |
| `83` | Charge | `c-4` |  |
| `84` | Prison dress | `hromadka_satu` |  |
| `86` | Vidlicka | `FB_vidlicka` |  |
| `87` | Nuz | `FB_nuz` |  |
| `88` | Roznetka | `c-4-roznetka` |  |
| `89` | Sachova figurka - bila | `06_dama_bila_[B]` |  |
| `90` | Sachova figurka - cerna | `06_dama_cerna_[B]` |  |
| `91` | Pencil2 | `tuzka` |  |
| `92` | Destnik otevreny | `destnik_open` |  |
| `93` | Smetak | `smetak` |  |
| `94` | Kbelik | `kybl` |  |
| `95` | Vysavac | `lux01` |  |
| `96` | glass-cutter | `glass_cutter` |  |
| `97` | Destnik zavreny | `destnik_closed` |  |
| `98` | M02DerekCrate | `bedna_zavrena` |  |
| `99` | Praci_prasek | `washpowder10[J]_pha` |  |
| `101` | rybarsky prut | `rybarsky_prut` |  |
| `102` | fajfka | `dymka` |  |
| `103` | Animovane noviny | `Newspaper` |  |
| `104` | Vozik na pradlo | `cart10[J]_pha` |  |
| `105` | Vesak na obleceni | `suit_cart[J]_pha` |  |
| `106` | Pouta-Meatpacking | `hand_cuffs` |  |
| `107` | svazek novin | `Newspaper_Pack` |  |
| `108` | klic na kola | `klic_na_kola` |  |
| `109` | noviny_DEMO | `news_demo` |  |
| `110` | kartac na boty | `kartac_na_boty` |  |
| `111` | Swift White | `swift_white` |  |
| `112` | Beer Master | `beer_master` |  |
| `113` | Beer half | `FB_beer_full2` |  |
| `114` | Hadra na pohare | `Hadra` |  |
| `115` | Lahev city | `lahev_city` |  |
| `116` | kladivo | `Hammer` |  |
| `117` | bedna_closed | `bedna_zavrena` |  |
| `118` | Sluchatko1 | `sluchatko` |  |
| `119` | benzinka | `benzinka` |  |
| `120` | Flashlight | `Flashlight` |  |
| `121` | FlashlightBloom | `flashlightbloom` |  |
| `122` | Zapalka | `Safety_Match_SCRIPT` |  |
| `123` | Letter | `Letter_City` |  |
| `124` | GranadeDLC | `grenad` |  |
| `125` | TankExp | `grenad` |  |
| `126` | .357 Magnum DLC | `Magnum` |  |
