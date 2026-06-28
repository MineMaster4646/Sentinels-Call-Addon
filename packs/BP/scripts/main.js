import { world } from "@minecraft/server"

world.afterEvents.worldLoad.subscribe(() => {
    world.sendMessage("World has loaded");
});