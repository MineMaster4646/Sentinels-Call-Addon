function player/score
playsound random.pop @a[r=40] ~~~ 1 1 0.01
gamerule recipesunlock false
gamerule sendcommandfeedback false
scoreboard players set @s plasma_rifle 200
scoreboard players set @s super_shotgun 24
scoreboard players set @s deaths 0
scoreboard players set @s kills 0
tag @s remove sneaking
tag @s remove e26e3e3cd89141f98767aa164b61d0ec
tag @s remove cc8d3071e18f412e81846071b93c9774
tag @s remove c156f063ad4049c68856d7d653e2ce45
tag @s remove e32e54b6b52c4108b2d561e3f12d5919
tag @s add d26055f5212646949c264302765ac197
gamerule sendcommandfeedback true