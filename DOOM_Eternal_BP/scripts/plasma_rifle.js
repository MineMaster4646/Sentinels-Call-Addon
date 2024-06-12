import { world, ItemStack, Entity, Vector, system } from "@minecraft/server";
import { ItemTypes, MinecraftEffectTypes, MinecraftItemTypes } from "@minecraft/server-gametest";

// Define the fireProjectile function
function fireProjectile(player) {
    const playerLocation = player.location;
    
    // Create and spawn the projectile (assuming "dea:plasma" is a valid entity type)
    const projectile = world.spawnEntity("dea:plasma", playerLocation);
    projectile.setVelocity(new Vector(0, 1, 0));
}

// Register the event handler for item use
world.events.beforeItemUse.subscribe(eventData => {
    const item = eventData.item;
    const player = eventData.source;
    
    // Check if the item used is the plasma rifle
    if (item.typeId === "dea:plasma_rifle") {
        fireProjectile(player);
    }
});