import { Player, EntityQueryOptions, GameMode, Vector3, world } from '@minecraft/server';

// Example function that uses the provided types
function findPlayersInSurvivalMode(location: Vector3): Player[] {
  const options: EntityQueryOptions = {
    gameMode: GameMode.survival,
    location: location,
  };

  const players: Player[] = world.getPlayers(options);
  return players;
}

// Example usage
const playerLocation: Vector3 = { x: 10, y: -60, z: 10 };
const playersInSurvivalMode: Player[] = findPlayersInSurvivalMode(playerLocation);
console.log(playersInSurvivalMode);