import { world, system, Player } from "@minecraft/server";
import "./plasma_rifle.js";

// Initialize any additional setup or global event handlers
system.runInterval(() => {
    console.log("Script is running...");
}, 100); // Run every 5 seconds