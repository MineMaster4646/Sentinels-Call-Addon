import { Event, Minecraft } from "@minecraft/server";

// Register custom component on world initialize
Minecraft.world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent(
        "sc:pr_shoot_on_use", // Custom component identifier
        {
            onUseItem(eventData) {
                const player = eventData.player;
                const item = eventData.item;

                // Check if the item used is our custom item
                if (item.__identifier__ === 'sc:plasma_rifle') {
                    // Get player's position and direction
                    const position = player.position;
                    const direction = player.direction;

                    // Spawn snowball projectile in front of the player
                    const snowball = Minecraft.spawnEntity(position.add(direction.scale(2)), "snowball");

                    // Set velocity of the snowball (adjust as needed)
                    snowball.setVel(direction.scale(1.5));
                }
            }
        }
    );
});