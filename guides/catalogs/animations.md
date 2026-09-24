---
title: Animation clips
sidebar:
  order: 24
---


# Animation clip names

`player.playAnim(name, loop, useAnimSet?)` plays a clip on a player's ped on every client. The server checks only that the name is 1 to 62 characters long and returns `false` otherwise; it cannot tell whether a client has the clip, so a misspelt name fails silently in game.

```js
player.playAnim("sc_eat_hot_out", false); // one-shot
player.playAnim("sc_sit_bench4_smoke_stat", true); // loops until player.stopAnim()
```

The owning client's controls lock while the clip holds the body. A one-shot releases them when it ends; if one ever leaves the player frozen, call `player.stopAnim()`, or `Controls.setEnabled(true)` from a client script.

## Clips shipped with M2O

M2O always loads its own animation archive, so the 345 clips below work everywhere. Pass the exact name with `useAnimSet` left `false`.

| Group | Clips |
|:------|:------|
| `sc_arrest` | `sc_arrest_cop`, `sc_arrest_del` |
| `sc_bench2` | `sc_bench2_death`, `sc_bench2_to_bench3`, `sc_bench2_to_bench4` |
| `sc_bench3` | `sc_bench3_to_bench2`, `sc_bench3_to_bench4` |
| `sc_bench4` | `sc_bench4_death`, `sc_bench4_to_bench2`, `sc_bench4_to_bench3` |
| `sc_browse` | `sc_browse_corpse1_M_a`, `sc_browse_corpse1_M_b`, `sc_browse_corpse1_M_in`, `sc_browse_corpse1_M_out`, `sc_browse_corpse2_M_in`, `sc_browse_corpse2_M_out`, `sc_browse_corpse2_M_stat_a`, `sc_browse_corpse3_M_look`, `sc_browse_corpse_W_breath`, `sc_browse_corpse_W_hands`, `sc_browse_corpse_W_look_down` |
| `sc_call` | `sc_call_box` |
| `sc_chair` | `sc_chair_desk_B_drink_cofee`, `sc_chair_desk_B_look_around`, `sc_chair_desk_B_look_back`, `sc_chair_desk_B_out`, `sc_chair_desk_B_stat`, `sc_chair_desk_B_think`, `sc_chair_desk_death_L`, `sc_chair_desk_death_R`, `sc_chair_desk_death_a`, `sc_chair_desk_drink_bottle`, `sc_chair_desk_fastout_L`, `sc_chair_desk_fastout_R`, `sc_chair_desk_smoking_ashtray`, `sc_chair_desk_smoking_aspirate`, `sc_chair_desk_smoking_in`, `sc_chair_desk_smoking_look_back`, `sc_chair_desk_smoking_out`, `sc_chair_desk_smoking_stat`, `sc_chair_desk_stat`, `sc_chair_desk_thing_a`, `sc_chair_desk_thing_b`, `sc_chair_desk_to_B` |
| `sc_city` | `sc_city_man_wall_smoke_loop1`, `sc_city_man_wall_smoke_loop2`, `sc_city_man_wall_smoke_stat` |
| `sc_clean` | `sc_clean_shoe_M`, `sc_clean_shoe_S` |
| `sc_crashcar` | `sc_crashcar_guy_upset` |
| `sc_death` | `sc_death_bench1` |
| `sc_drink` | `sc_drink_bottle_out`, `sc_drink_coffee_out`, `sc_drink_pot_out`, `sc_drink_snifter_out`, `sc_drink_wine_out` |
| `sc_eat` | `sc_eat_ham_out`, `sc_eat_hot_out` |
| `sc_fishing` | `sc_fishing_catch`, `sc_fishing_stat`, `sc_fishing_throw` |
| `sc_gangsta` | `sc_gangsta_a_fastout`, `sc_gangsta_a_gest_a`, `sc_gangsta_a_gest_b`, `sc_gangsta_a_gest_c`, `sc_gangsta_a_lookaround`, `sc_gangsta_a_stat` |
| `sc_gestA` | `sc_gestA_M_everything`, `sc_gestA_M_explanate`, `sc_gestA_M_explanate2`, `sc_gestA_M_greet_fingers`, `sc_gestA_M_greet_nod`, `sc_gestA_M_greet_open_hand`, `sc_gestA_M_hand_wave`, `sc_gestA_M_hips`, `sc_gestA_M_however`, `sc_gestA_M_maybe`, `sc_gestA_M_maybe2`, `sc_gestA_M_me`, `sc_gestA_M_no`, `sc_gestA_M_no_no`, `sc_gestA_M_not_know`, `sc_gestA_M_stat`, `sc_gestA_M_yes`, `sc_gestA_M_yes_yes`, `sc_gestA_M_you`, `sc_gestA_M_you_know`, `sc_gestA_W_boring_L`, `sc_gestA_W_boring_R`, `sc_gestA_W_explanate`, `sc_gestA_W_explanate_b`, `sc_gestA_W_explanate_c`, `sc_gestA_W_greet_nod`, `sc_gestA_W_however`, `sc_gestA_W_lhand`, `sc_gestA_W_long_explain`, `sc_gestA_W_look_down`, `sc_gestA_W_look_up`, `sc_gestA_W_no`, `sc_gestA_W_not_know`, `sc_gestA_W_not_know_b`, `sc_gestA_W_rhand`, `sc_gestA_W_think`, `sc_gestA_W_think_b`, `sc_gestA_W_yes`, `sc_gestA_W_yes_yes`, `sc_gestA_W_you`, `sc_gestA_W_you_know` |
| `sc_homeles` | `sc_homeles_2_a`, `sc_homeles_2_b`, `sc_homeles_2_d`, `sc_homeles_2_e`, `sc_homeles_2_in`, `sc_homeles_2_out`, `sc_homeles_4_a`, `sc_homeles_4_b`, `sc_homeles_4_c`, `sc_homeles_4_e`, `sc_homeles_4_fastout`, `sc_homeles_4_getmoney`, `sc_homeles_4_in`, `sc_homeles_4_out` |
| `sc_homeless` | `sc_homeless_4_death`, `sc_homeless_6_a`, `sc_homeless_6_b`, `sc_homeless_6_in`, `sc_homeless_6_out` |
| `sc_homesles` | `sc_homesles_1_a`, `sc_homesles_1_b`, `sc_homesles_1_c`, `sc_homesles_1_in`, `sc_homesles_1_out` |
| `sc_hot` | `sc_hot_a`, `sc_hot_b`, `sc_hot_c`, `sc_hot_eat-diff`, `sc_hot_eat_out-diff`, `sc_hot_eat_stat-diff`, `sc_hot_out`, `sc_hot_sell_M`, `sc_hot_sell_S`, `sc_hot_sell_b` |
| `sc_lean` | `sc_lean_railing_front_in`, `sc_lean_railing_front_out`, `sc_lean_railing_front_stat`, `sc_lean_railing_spit_long` |
| `sc_licence` | `sc_licence_cop_NO_M`, `sc_licence_cop_OK_M`, `sc_licence_cop_want_M`, `sc_licence_del_NO_S`, `sc_licence_del_OK_S`, `sc_licence_del_wait_S` |
| `sc_look` | `sc_look_L_a_diff`, `sc_look_R_a_diff`, `sc_look_a_in`, `sc_look_a_loop`, `sc_look_a_out`, `sc_look_around_a_diff`, `sc_look_c_in`, `sc_look_c_loop`, `sc_look_c_out` |
| `sc_man` | `sc_man_arrested_gun`, `sc_man_arrested_money_in`, `sc_man_arrested_money_out`, `sc_man_arrested_money_stat`, `sc_man_arrested_nogun`, `sc_man_arrested_out`, `sc_man_arrested_out_stat`, `sc_man_arrested_shotgun`, `sc_man_arrested_stat`, `sc_man_arrested_thompson`, `sc_man_mailbox`, `sc_man_smoke-diff`, `sc_man_smoke_in`, `sc_man_smoke_out`, `sc_man_smoke_stat_a`, `sc_man_smoke_stat_b`, `sc_man_smoke_stat_c`, `sc_man_smoke_stat_d`, `sc_man_trash_throw`, `sc_man_wall_newspaper` |
| `sc_news` | `sc_news_look_a`, `sc_news_sell_M`, `sc_news_sell_S`, `sc_news_stat` |
| `sc_newspaper` | `sc_newspaper_in`, `sc_newspaper_look_around`, `sc_newspaper_out`, `sc_newspaper_stat_a`, `sc_newspaper_stat_b` |
| `sc_newstand` | `sc_newstand_death`, `sc_newstand_sale_M`, `sc_newstand_sale_S` |
| `sc_penalty` | `sc_penalty_cop_bribe_M`, `sc_penalty_cop_bribe_refuse_a_M`, `sc_penalty_cop_bribe_take_M`, `sc_penalty_cop_car`, `sc_penalty_cop_dontpay_M`, `sc_penalty_cop_note_in_M`, `sc_penalty_cop_pay_M`, `sc_penalty_cop_whistle`, `sc_penalty_del_bribe_S`, `sc_penalty_del_bribe_refuse_a_S`, `sc_penalty_del_bribe_take_S`, `sc_penalty_del_dontpay_S`, `sc_penalty_del_note_in_S`, `sc_penalty_del_pay_S`, `sc_penalty_del_stat_M`, `sc_penalty_del_stat_S` |
| `sc_phone` | `sc_phone_NPC_in`, `sc_phone_NPC_out`, `sc_phone_PLAYER_in`, `sc_phone_PLAYER_out`, `sc_phone_death`, `sc_phone_diall`, `sc_phone_fast_out`, `sc_phone_gest_e`, `sc_phone_gest_f`, `sc_phone_gest_g`, `sc_phone_gest_j`, `sc_phone_gest_k`, `sc_phone_gest_m`, `sc_phone_stat_a`, `sc_phone_throw_M`, `sc_phone_throw_S` |
| `sc_player` | `sc_player_tip_a` |
| `sc_police` | `sc_police_bribe_M`, `sc_police_gun_bribe_S`, `sc_police_shotgun_bribe_S`, `sc_police_tommy_bribe_S` |
| `sc_service` | `sc_service_motor_look`, `sc_service_motor_mount_in`, `sc_service_motor_mount_loop`, `sc_service_motor_mount_out`, `sc_service_motor_stat` |
| `sc_shovel` | `sc_shovel_coal_loop`, `sc_shovel_coal_stat`, `sc_shovel_in_coal`, `sc_shovel_in_snow`, `sc_shovel_out_coal`, `sc_shovel_out_snow`, `sc_shovel_snow_loop`, `sc_shovel_snow_stat`, `sc_shovel_strafe_snow_L`, `sc_shovel_strafe_snow_R` |
| `sc_sit` | `sc_sit_bench1_B_to`, `sc_sit_bench1_a`, `sc_sit_bench1_e`, `sc_sit_bench1_fastout`, `sc_sit_bench1_g`, `sc_sit_bench1_in`, `sc_sit_bench1_out`, `sc_sit_bench1_stat_B`, `sc_sit_bench1_to_B`, `sc_sit_bench2_a`, `sc_sit_bench2_dust_off`, `sc_sit_bench2_in`, `sc_sit_bench2_look_L`, `sc_sit_bench2_nervous`, `sc_sit_bench2_news_a`, `sc_sit_bench2_news_b`, `sc_sit_bench2_news_in`, `sc_sit_bench2_news_out`, `sc_sit_bench2_out`, `sc_sit_bench2_out_fast`, `sc_sit_bench3_dust_off`, `sc_sit_bench3_look_up`, `sc_sit_bench3_nervous`, `sc_sit_bench3_out_fast`, `sc_sit_bench3_stat_a`, `sc_sit_bench3_watch`, `sc_sit_bench4_in`, `sc_sit_bench4_nervous`, `sc_sit_bench4_out`, `sc_sit_bench4_out_fast`, `sc_sit_bench4_smoke_a`, `sc_sit_bench4_smoke_b`, `sc_sit_bench4_smoke_c`, `sc_sit_bench4_smoke_in`, `sc_sit_bench4_smoke_out`, `sc_sit_bench4_smoke_stat`, `sc_sit_bench4_stat_a` |
| `sc_w` | `sc_w_chair_desk_B_look_around`, `sc_w_chair_desk_B_stat`, `sc_w_chair_desk_B_think`, `sc_w_chair_desk_B_to_stat`, `sc_w_chair_desk_clean`, `sc_w_chair_desk_death_a`, `sc_w_chair_desk_drink_coffee`, `sc_w_chair_desk_fastout_L`, `sc_w_chair_desk_fastout_R`, `sc_w_chair_desk_hair`, `sc_w_chair_desk_look_back`, `sc_w_chair_desk_nervous`, `sc_w_chair_desk_out_L`, `sc_w_chair_desk_out_R`, `sc_w_chair_desk_smoke_aspirate_a`, `sc_w_chair_desk_smoke_aspirate_b`, `sc_w_chair_desk_smoke_look_back`, `sc_w_chair_desk_smoke_mirror`, `sc_w_chair_desk_smoke_out`, `sc_w_chair_desk_smoke_stat`, `sc_w_chair_desk_stat`, `sc_w_chair_desk_stat_to_B`, `sc_w_chair_desk_think`, `sc_w_chair_desk_to_smoke` |
| `sc_wcleaner` | `sc_wcleaner_in`, `sc_wcleaner_loop`, `sc_wcleaner_out`, `sc_wcleaner_pause`, `sc_wcleaner_stat`, `sc_wcleaner_step_L`, `sc_wcleaner_step_R` |
| `sc_wheel` | `sc_wheel_in`, `sc_wheel_mount_in`, `sc_wheel_mount_loop`, `sc_wheel_mount_out`, `sc_wheel_out`, `sc_wheel_stat` |
| `sc_winter` | `sc_winter_nose_cough`, `sc_winter_nose_hanky`, `sc_winter_nose_sneeze`, `sc_winter_slide`, `sc_winter_slide_down`, `sc_winter_slide_fast_up`, `sc_winter_slide_stat`, `sc_winter_slide_up` |
| `sc_woman` | `sc_woman_look_A_in`, `sc_woman_look_A_loop`, `sc_woman_look_A_out`, `sc_woman_look_D_in`, `sc_woman_look_D_look`, `sc_woman_look_D_out`, `sc_woman_smoke_in`, `sc_woman_smoke_out`, `sc_woman_smoke_stat_a`, `sc_woman_smoke_stat_b`, `sc_woman_smoke_stat_c`, `sc_woman_smoke_stat_d`, `sc_woman_smoke_stat_e` |
| `sc_writer` | `sc_writer_notes_out` |
| `sc_writing` | `sc_writing_notes_head_up`, `sc_writing_notes_in`, `sc_writing_notes_loop`, `sc_writing_notes_thinking` |

## Animation-set clips

Clips such as `CC_TAUNT01-A` and `CC_COMBO1-A` belong to an animation set rather than having a name of their own. Pass `useAnimSet: true` and the game looks the name up in the ped's current set, so the same name can play differently, or not at all, depending on what the player is doing (the unarmed idle uses set 1, the melee set). These clips come from the base game's archives and are not listed here yet.
