execute as @s run playsound gun.plasma_rifle.fire @a[r=200] ~~~ 100 1 0.01
execute as @s run playsound gun.plasma_rifle.fire.reverb @a[r=200] ~~~ 100 1 0.01
playanimation @s animation.plasma_rifle.fire fire 0 "!q.is_item_name_any('slot.weapon.mainhand', 0, 'sc:plasma_rifle')"
scoreboard players remove @s[scores={plasma_rifle=1..}, m=!c] plasma_rifle 1
event entity @s sc:fire