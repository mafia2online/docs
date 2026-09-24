---
title: Character models
sidebar:
  order: 23
---


# Character model indexes

Player skins and NPC bodies are chosen by an index into M2O's shared character-model registry. The same index works for `player.setModel(modelIndex)`, the `model` argument of `Npc.create(x, y, z, model, ...)`, and the value `player.model` reports.

```js
Events.on("playerCommand", (player, command) => {
  if (command !== "army") return;
  player.setModel(226); // U.S. Army soldier
});

const extra = Npc.create(x, y, z, 81, "Barman"); // traffic NPC cbarma
```

An index outside the table does nothing on `player.setModel`, while `Npc.create` throws `Npc.create: unknown model`. The model file and frame are the game resources each index loads; the game gives them no display names, so the groups below come from the registry itself.

| Index | Model file | Frame | Group | Note |
|------:|:-----------|:------|:------|:-----|
| `0` | `vitarmy` |  | Vito |  |
| `1` | `vitksl` |  | Vito |  |
| `2` | `vitksl2` |  | Vito |  |
| `3` | `vitnah_t` |  | Vito |  |
| `4` | `vitod1` |  | Vito |  |
| `5` | `vitod1neup` |  | Vito |  |
| `6` | `vitod2` |  | Vito |  |
| `7` | `vitol1` |  | Vito |  |
| `8` | `vitol2` |  | Vito |  |
| `9` | `vitoveral` |  | Vito |  |
| `10` | `vitpra` |  | Vito |  |
| `11` | `vitspo` |  | Vito |  |
| `12` | `vittel` |  | Vito |  |
| `13` | `vitukl` |  | Vito |  |
| `14` | `vitukl_kn` |  | Vito |  |
| `15` | `vitvez` |  | Vito |  |
| `16` | `vitvop` |  | Vito |  |
| `17` | `vitvov` |  | Vito |  |
| `18` | `vitvov2i` |  | Vito |  |
| `19` | `vitvov3` |  | Vito |  |
| `20` | `joed1` |  | Vito |  |
| `21` | `joed2` |  | Vito |  |
| `22` | `joeksl` |  | Vito |  |
| `23` | `joel1` |  | Vito |  |
| `24` | `joel2` |  | Vito |  |
| `25` | `joepra` |  | Vito |  |
| `26` | `rtrd1` |  | Vito |  |
| `27` | `rtrd2` |  | Vito |  |
| `28` | `rtrksl` |  | Vito |  |
| `29` | `rtrl1` |  | Vito |  |
| `30` | `rtrl2` |  | Vito |  |
| `31` | `rtrpra` |  | Vito |  |
| `32` | `rtrvez` |  | Vito |  |
| `33` | `vitnaho` |  | Vito |  |
| `34` | `vittel_kab` |  | Vito |  |
| `35` | `vitvezo` |  | Vito |  |
| `36` | `vitvezoc` |  | Vito |  |
| `37` | `albert` |  | Mission characters |  |
| `38` | `brianc` |  | Mission characters |  |
| `39` | `consig` |  | Mission characters |  |
| `40` | `derek` |  | Mission characters |  |
| `41` | `desmond` |  | Mission characters |  |
| `42` | `joeoblf` |  | Mission characters |  |
| `43` | `eddies` |  | Mission characters |  |
| `44` | `franca` |  | Mission characters |  |
| `45` | `frank` |  | Mission characters |  |
| `46` | `joebryl` |  | Mission characters |  |
| `47` | `joeciv` |  | Mission characters |  |
| `48` | `joeneup` |  | Mission characters |  |
| `49` | `joeobl` |  | Mission characters |  |
| `50` | `leospo` |  | Mission characters |  |
| `51` | `steve` |  | Mission characters |  |
| `52` | `joeruka` |  | Mission characters |  |
| `53` | `marty` |  | Mission characters |  |
| `54` | `brianv` |  | Mission characters |  |
| `55` | `brianv2` | `BRIANV` | Mission characters |  |
| `56` | `carlo` |  | Mission characters |  |
| `57` | `carloz` |  | Mission characters |  |
| `58` | `eddieo` |  | Mission characters |  |
| `59` | `eric` | `CITERI` | Mission characters |  |
| `60` | `hen405` | `HEN40S` | Mission characters |  |
| `61` | `joeobd` |  | Mission characters |  |
| `62` | `joeobld` |  | Mission characters |  |
| `63` | `joeobld2` |  | Mission characters |  |
| `64` | `joespo` |  | Mission characters |  |
| `65` | `joetel` |  | Mission characters |  |
| `66` | `joeukl` | `JOEUKL_knirek` | Mission characters |  |
| `67` | `joeukl2` | `JOEUKL` | Mission characters |  |
| `68` | `joeup` |  | Mission characters |  |
| `69` | `joevez` |  | Mission characters |  |
| `70` | `joezml` |  | Mission characters |  |
| `71` | `leoobd` |  | Mission characters |  |
| `72` | `leovez` |  | Mission characters |  |
| `73` | `lucca` |  | Mission characters |  |
| `74` | `marty_d` | `MARTYDEATH` | Mission characters |  |
| `75` | `mike` |  | Mission characters |  |
| `76` | `panchu` |  | Mission characters |  |
| `77` | `pepeobd` | `PEPEOB` | Mission characters |  |
| `78` | `vitmat` |  | Mission characters |  |
| `79` | `wong` |  | Mission characters |  |
| `80` | `m14csguard` | `PETE` | Mission characters |  |
| `81` | `cbarma` |  | Traffic NPCs |  |
| `82` | `cbarma2` |  | Traffic NPCs |  |
| `83` | `ccerb1` |  | Traffic NPCs |  |
| `84` | `ccerb2` |  | Traffic NPCs |  |
| `85` | `ccerb3` |  | Traffic NPCs |  |
| `86` | `ccerml` |  | Traffic NPCs |  |
| `87` | `ccerml2` |  | Traffic NPCs |  |
| `88` | `ccerml3` |  | Traffic NPCs |  |
| `89` | `ccermz` |  | Traffic NPCs |  |
| `90` | `ccerzl` |  | Traffic NPCs |  |
| `91` | `ccerzl1` |  | Traffic NPCs |  |
| `92` | `ccinbg1` |  | Traffic NPCs |  |
| `93` | `ccinbg2` |  | Traffic NPCs |  |
| `94` | `ccinbl` |  | Traffic NPCs |  |
| `95` | `ccinga` |  | Traffic NPCs |  |
| `96` | `ccinga2` |  | Traffic NPCs |  |
| `97` | `ccinku` |  | Traffic NPCs |  |
| `98` | `ccinml` |  | Traffic NPCs |  |
| `99` | `ccinri` |  | Traffic NPCs |  |
| `100` | `ccinzl` |  | Traffic NPCs |  |
| `101` | `ccinzl2` |  | Traffic NPCs |  |
| `102` | `ccinzz` |  | Traffic NPCs |  |
| `103` | `ccinzz2` |  | Traffic NPCs |  |
| `104` | `ccisni` |  | Traffic NPCs |  |
| `105` | `ccisni2` |  | Traffic NPCs |  |
| `106` | `cdel1` |  | Traffic NPCs |  |
| `107` | `cdel2` |  | Traffic NPCs |  |
| `108` | `cdel3` |  | Traffic NPCs |  |
| `109` | `cdel4` |  | Traffic NPCs |  |
| `110` | `cdel5` |  | Traffic NPCs |  |
| `111` | `driver` |  | Traffic NPCs |  |
| `112` | `cdelje` |  | Traffic NPCs |  |
| `113` | `cdete2` |  | Traffic NPCs |  |
| `114` | `cdetek` |  | Traffic NPCs |  |
| `115` | `cerzz` |  | Traffic NPCs |  |
| `116` | `cfetak1` |  | Traffic NPCs |  |
| `117` | `cfetak2` |  | Traffic NPCs |  |
| `118` | `cguard1` |  | Traffic NPCs |  |
| `119` | `cguard2` |  | Traffic NPCs |  |
| `120` | `chlid1` |  | Traffic NPCs |  |
| `121` | `chlid2` |  | Traffic NPCs |  |
| `122` | `chudrz` |  | Traffic NPCs |  |
| `123` | `chudrz2` |  | Traffic NPCs |  |
| `124` | `chudrz3` |  | Traffic NPCs |  |
| `125` | `cinfge` |  | Traffic NPCs |  |
| `126` | `cirand` |  | Traffic NPCs |  |
| `127` | `cirga1` |  | Traffic NPCs |  |
| `128` | `cirga2` |  | Traffic NPCs |  |
| `129` | `cirinf` |  | Traffic NPCs |  |
| `130` | `cirjoh` |  | Traffic NPCs |  |
| `131` | `cirpat` |  | Traffic NPCs |  |
| `132` | `cirsea` |  | Traffic NPCs |  |
| `133` | `citant` |  | Traffic NPCs |  |
| `134` | `citga1c` |  | Traffic NPCs |  |
| `135` | `citga1f` |  | Traffic NPCs |  |
| `136` | `citga1v` |  | Traffic NPCs |  |
| `137` | `citga2c` |  | Traffic NPCs |  |
| `138` | `citga2f` |  | Traffic NPCs |  |
| `139` | `citga2v` |  | Traffic NPCs |  |
| `140` | `citga3c` |  | Traffic NPCs |  |
| `141` | `citga3f` |  | Traffic NPCs |  |
| `142` | `citga3v` |  | Traffic NPCs |  |
| `143` | `citga4c` |  | Traffic NPCs |  |
| `144` | `citga4f` |  | Traffic NPCs |  |
| `145` | `citga4v` |  | Traffic NPCs |  |
| `146` | `citga5v` |  | Traffic NPCs |  |
| `147` | `citga8` |  | Traffic NPCs |  |
| `148` | `citga9` |  | Traffic NPCs |  |
| `149` | `citga10c` |  | Traffic NPCs |  |
| `150` | `citga11f` |  | Traffic NPCs |  |
| `151` | `citga12f` |  | Traffic NPCs |  |
| `152` | `citga13c` |  | Traffic NPCs |  |
| `153` | `citkas` |  | Traffic NPCs |  |
| `154` | `citklav` |  | Traffic NPCs |  |
| `155` | `citseb` |  | Traffic NPCs |  |
| `156` | `citukl` |  | Traffic NPCs |  |
| `157` | `citvov1` |  | Traffic NPCs |  |
| `158` | `citvov2` |  | Traffic NPCs |  |
| `159` | `citzst` |  | Traffic NPCs |  |
| `160` | `cjoan` |  | Traffic NPCs |  |
| `161` | `cmesmz` |  | Traffic NPCs |  |
| `162` | `cmeszl` |  | Traffic NPCs |  |
| `163` | `cmeszl2` |  | Traffic NPCs |  |
| `164` | `cmeszz` |  | Traffic NPCs |  |
| `165` | `cmeszz2` |  | Traffic NPCs |  |
| `166` | `cmeszz3` |  | Traffic NPCs |  |
| `167` | `cmot1` |  | Traffic NPCs |  |
| `168` | `cmot2` |  | Traffic NPCs |  |
| `169` | `cmot3` |  | Traffic NPCs |  |
| `170` | `cmot4` |  | Traffic NPCs |  |
| `171` | `cmotbo` |  | Traffic NPCs |  |
| `172` | `cmrtvl` |  | Traffic NPCs |  |
| `173` | `cpr1ce` |  | Traffic NPCs |  |
| `174` | `cpr2st` |  | Traffic NPCs |  |
| `175` | `cpr3zm` |  | Traffic NPCs |  |
| `176` | `cpr4` |  | Traffic NPCs |  |
| `177` | `cpr5` |  | Traffic NPCs |  |
| `178` | `cpr7` |  | Traffic NPCs |  |
| `179` | `cpros1l` |  | Traffic NPCs |  |
| `180` | `cpros1n_low` |  | Traffic NPCs |  |
| `181` | `cpros1z` |  | Traffic NPCs |  |
| `182` | `cpros2l` |  | Traffic NPCs |  |
| `183` | `cpros2z` |  | Traffic NPCs |  |
| `184` | `cpros3l` |  | Traffic NPCs |  |
| `185` | `cpros3z` |  | Traffic NPCs |  |
| `186` | `cpros6l` |  | Traffic NPCs |  |
| `187` | `cpros6z` |  | Traffic NPCs |  |
| `188` | `cpump1` |  | Traffic NPCs |  |
| `189` | `csicde` |  | Traffic NPCs |  |
| `190` | `csicde2` |  | Traffic NPCs |  |
| `191` | `csicde3` |  | Traffic NPCs |  |
| `192` | `csicmu` |  | Traffic NPCs |  |
| `193` | `csicmu3` |  | Traffic NPCs |  |
| `194` | `csicze` |  | Traffic NPCs |  |
| `195` | `csicze2` |  | Traffic NPCs |  |
| `196` | `csicze3` |  | Traffic NPCs |  |
| `197` | `csomra` |  | Traffic NPCs |  |
| `198` | `csomra2` |  | Traffic NPCs |  |
| `199` | `cvez1` |  | Traffic NPCs |  |
| `200` | `cvez2` |  | Traffic NPCs |  |
| `201` | `cvez3` |  | Traffic NPCs |  |
| `202` | `cvez4` |  | Traffic NPCs |  |
| `203` | `cvez5` |  | Traffic NPCs |  |
| `204` | `cvez6` |  | Traffic NPCs |  |
| `205` | `cvez7` |  | Traffic NPCs |  |
| `206` | `cvezci1` |  | Traffic NPCs |  |
| `207` | `cvezci2` |  | Traffic NPCs |  |
| `208` | `cvezci3` |  | Traffic NPCs |  |
| `209` | `cvezedv` |  | Traffic NPCs |  |
| `210` | `cvezga1` |  | Traffic NPCs |  |
| `211` | `cvezga2` |  | Traffic NPCs |  |
| `212` | `cvezjim` |  | Traffic NPCs |  |
| `213` | `cvezjon` |  | Traffic NPCs |  |
| `214` | `cvezvin` |  | Traffic NPCs |  |
| `215` | `m03_maria` | `CITZST2` | Traffic NPCs |  |
| `216` | `m14_sqmnf_tommy` | `TOMANG` | Traffic NPCs |  |
| `217` | `m11police` | `CPOLI1` | Police |  |
| `218` | `m14china_pol` | `CCINGA2` | Police |  |
| `219` | `vitbik` |  | DLC skins | greaser |
| `220` | `vitcow` |  | DLC skins | vegas |
| `221` | `vitstar` |  | DLC skins | vegas |
| `222` | `vitreb` |  | DLC skins | renegade |
| `223` | `vitschool` |  | DLC skins | renegade |
| `224` | `vitsuit` |  | DLC skins | made_man |
| `225` | `vittux` |  | DLC skins | made_man |
| `226` | `m01_vojaci3` | `CORPORAL` | Prologue soldiers | U.S. Army |
| `227` | `m01_vojaci3` | `WILLIAMS` | Prologue soldiers | U.S. Army |
| `228` | `m01_vojaci2` | `ITVOJ2` | Prologue soldiers | Italian Army |
| `229` | `dlc_10_enemies` | `BPVEST1` | Joe's Adventures | SWAT |
| `230` | `dlc_10_enemies` | `BPVEST2` | Joe's Adventures | SWAT |
| `231` | `dlc_harry` | `CIRHAR` | Joe's Adventures | Harry |
| `232` | `dlc_sm_owner` | `OWNERZ` | Joe's Adventures | shop owner |
| `233` | `dlc_prostitutenaked` | `CPROS6N` | Joe's Adventures |  |
| `234` | `joeksl2` |  | Joe's Adventures | Joe |
| `235` | `joebryl2` |  | Joe's Adventures | Joe |
| `236` | `joeciv2` |  | Joe's Adventures | Joe |
