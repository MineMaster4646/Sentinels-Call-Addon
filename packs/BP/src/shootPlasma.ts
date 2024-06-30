import { ItemComponentUseEvent, world} from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent('sc:pr_shoot_on_use', {
        onUse(arg: ItemComponentUseEvent) {
            arg.source.addEffect('minecraft:night_vision', 600);
        }
    });
});