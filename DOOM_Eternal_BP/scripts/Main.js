import { system } from "@minecraft/server-gametest";
import "./plasma_rifle";

// Initialize any additional setup or global event handlers
system.runInterval(() => {
    // Example: Check for custom conditions or log information
    console.log("Script is running...");
}, 100); // Run every 5 seconds