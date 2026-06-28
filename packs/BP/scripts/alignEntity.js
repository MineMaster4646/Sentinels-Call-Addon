import { system } from "@minecraft/server";

/** @type {import("@minecraft/server").BlockCustomComponent} */
const BlockAlignEntityComponent = {
    beforeOnPlayerPlace(event) {
        event.cancel = true

        const location = event.block.center();
        event.dimension.spawnEntity("sc:dummy_align", location)
    },
};

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent("sc:align_entity", BlockAlignEntityComponent)
});