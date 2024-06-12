import { world, Vector, system } from "@minecraft/server";
import { ItemTypes } from "@minecraft/server-gametest";

// Define the fireProjectile function
function fireProjectile(player) {
    const playerLocation = player.location;
    
    // Create and spawn the projectile (assuming "dea:plasma" is a valid entity type)
    const projectile = world.spawnEntity("dea:plasma", playerLocation);
    projectile.setVelocity(new Vector(0, 1, 0));
}

// Register the event handler for item use
system.runInterval(() => {
    world.getPlayers().forEach(player => {
        const heldItem = player.getComponent("minecraft:inventory").container.getItem(player.selectedSlot);
        if (heldItem && heldItem.id === "dea:plasma_rifle") {
            fireProjectile(player);
        }
    });
}, 20); // Run every second