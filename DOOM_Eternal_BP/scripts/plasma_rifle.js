import { world, system, Player } from "@minecraft/server";

// Define the fireProjectile function
function fireProjectile(player) {
    const playerLocation = player.location;

    // Create and spawn the projectile
    const projectile = world.spawnEntity("dea:plasma", playerLocation);
    projectile.applyImpulse({ x: 0, y: 1, z: 0 });
}

// Register the event handler for item use
system.runInterval(() => {
    world.getPlayers().forEach(player => {
        const inventory = player.getComponent("minecraft:inventory").container;
        const heldItem = inventory.getItem(player.selectedSlot);
        if (heldItem && heldItem.id === "dea:plasma_rifle") {
            // Fire the projectile if the player is holding the plasma rifle
            fireProjectile(player);
        }
    });
}, 20); // Run every second