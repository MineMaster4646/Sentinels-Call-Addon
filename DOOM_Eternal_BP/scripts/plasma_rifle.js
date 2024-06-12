// Import the necessary Minecraft classes
const Minecraft = require('minecraft-addon-tools/minecraft');
const adk = require('adk-lib');

// Create a new projectile
let plasmaProjectile = Minecraft.Projectile.create("dea:plasma");

// Define the fireProjectile function
function fireProjectile(player) {
    // Get the player's location
    let playerLocation = player.location;

    // Set the projectile's location to the player's location
    plasmaProjectile.location = playerLocation;

    // Set the velocity of the projectile
    plasmaProjectile.velocity = { x: 0, y: 1, z: 0 };

    // Spawn the projectile
    plasmaProjectile.spawn();
}

// Register a custom component
Minecraft.registerComponent("dea:pr_shoot", {
    onItemUsed: function(eventData) {
        // If the item used is a diamond, fire the projectile
        if (eventData.item.name === "dea:plasma_rifle") {
            firePlasma(eventData.player);
        }
    }
});