execute as @s run playsound gun.super_shotgun.fire @a[r=400] ~~~ 100 1 0.01
playanimation @s animation.super_shotgun.fire fire 0 "!q.is_item_name_any('slot.weapon.mainhand', 0, 'sc:super_shotgun')"
scoreboard players remove @s[scores={super_shotgun=2..}, m=!c] super_shotgun 2
event entity @s sc:fire