import { world } from "@minecraft/server";
const JUMP_PAD_BLOCK = "sc:jump_pad";
const LAUNCH_VELOCITY = 1.5;
function handleTick() {
    const players = world.getPlayers();
    players.forEach((player) => {
        const playerLocation = player.location;
        const blockUnderPlayer = player.dimension.getBlock(playerLocation);
        if (blockUnderPlayer.typeId === JUMP_PAD_BLOCK) {
            player.applyImpulse({ x: 0, y: LAUNCH_VELOCITY, z: 0 });
        }
    });
}
setInterval(handleTick, 50);
