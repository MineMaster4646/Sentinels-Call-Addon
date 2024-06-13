import { GameMode, world } from '@minecraft/server';
// Example function that uses the provided types
function findPlayersInSurvivalMode(location) {
    const options = {
        gameMode: GameMode.survival,
        location: location,
    };
    const players = world.getPlayers(options);
    return players;
}
// Example usage
const playerLocation = { x: 10, y: 20, z: 30 };
const playersInSurvivalMode = findPlayersInSurvivalMode(playerLocation);
console.log(playersInSurvivalMode);