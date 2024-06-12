const system = server.registerSystem(0, 0);

system.initialize = function () {
    this.listenForEvent("minecraft:player_use_item", (eventData) => this.onUseItem(eventData));
};

system.onUseItem = function (eventData) {
    const player = eventData.data.player;
    const item = eventData.data.item;

    // Check if the item being used is the one you want to trigger the projectile
    // For example, you can check the item's identifier
    if (item.__identifier__ === "dea:plasma_rifle") {
        const position = this.getComponent(player, "minecraft:position");
        const rotation = this.getComponent(player, "minecraft:rotation");

        const spawnEventData = this.createEventData("minecraft:spawn_entity");
        spawnEventData.data = {
            __identifier__: "dea:plasma",
            x: position.data.x,
            y: position.data.y + 1.5,
            z: position.data.z,
            velocityX: -Math.sin(rotation.data.y / 180 * Math.PI) * Math.cos(rotation.data.x / 180 * Math.PI),
            velocityY: -Math.sin(rotation.data.x / 180 * Math.PI),
            velocityZ: Math.cos(rotation.data.y / 180 * Math.PI) * Math.cos(rotation.data.x / 180 * Math.PI),
        };

        this.broadcastEvent("minecraft:spawn_entity", spawnEventData);
    }
};