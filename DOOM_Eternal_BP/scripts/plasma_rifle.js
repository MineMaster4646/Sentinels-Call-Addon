import { world, system, Player, Vector } from "@minecraft/server";

// Define the fireProjectile function
function fireProjectile(player) {
    const playerLocation = player.location;

    // Create and spawn the projectile
    const projectile = world.spawnEntity("dea:plasma", playerLocation);
    projectile.applyImpulse(new Vector(0, 1, 0));
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
