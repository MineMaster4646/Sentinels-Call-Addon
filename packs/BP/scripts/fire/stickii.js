// stickii.js
// Drop into BP/scripts/ and reference in manifest.json (modules section).
// Edit ITEM_ID and PROJECTILE_ID to match your JSON identifiers.

import { world } from "@minecraft/server";

const ITEM_ID = "sc:plasma_rifle";       // <--- change to your item identifier
const PROJECTILE_ID = "sc:bullet"; // <--- change to your projectile entity identifier
const SPEED = 3.0;                          // tweak projectile speed
const SPAWN_OFFSET = 0.6;                   // how far in front of head to spawn

/**
 * Helper: safe get of held itemstack in selected slot
 * (uses player's inventory component + selectedSlotIndex)
 */
function getHeldItemStack(player) {
  try {
    const invComp = player.getComponent("minecraft:inventory");
    if (!invComp || !invComp.container) return undefined;
    const container = invComp.container;
    const slot = player.selectedSlotIndex ?? 0;
    // container.getItem(slot) / container.getSlot may vary by helper libs; most containers expose getItem.
    // We'll try container.getItem(slot) first (common in current script API wrappers).
    if (typeof container.getItem === "function") return container.getItem(slot);
    // fallback: some environments expose getSlot
    if (typeof container.getSlot === "function") {
      const slotObj = container.getSlot(slot);
      return slotObj?.getItem ? slotObj.getItem() : undefined;
    }
    return undefined;
  } catch (e) {
    // defensive: API surface differs slightly by version. If you get errors, inspect container in console.
    return undefined;
  }
}

/**
 * Main: when an entity hits another (melee), check if attacker is a player holding ITEM_ID,
 * spawn projectile and shoot it along player's view direction.
 */
world.afterEvents.entityHitEntity.subscribe((ev) => {
  try {
    const attacker = ev.damagingEntity;            // the entity that performed the melee hit
    if (!attacker) return;

    // quick player check — players have selectedSlotIndex property (server Player class).
    if (typeof attacker.selectedSlotIndex === "undefined") return; // not a player

    // get the item in player's selected slot
    const held = getHeldItemStack(attacker);
    if (!held) return;

    // ItemStack.matches(name) is version-safe way to check; fall back to .typeId where necessary
    const matchesItem =
      (typeof held.matches === "function" && held.matches(ITEM_ID)) ||
      (held.typeId && held.typeId === ITEM_ID) ||
      (held.item && held.item === ITEM_ID); // fallbacks
    if (!matchesItem) return; // player isn't holding the trigger item

    // get spawn location: player's head + a bit forward
    const headLoc = attacker.getHeadLocation?.() ?? attacker.location;
    const view = attacker.getViewDirection?.() ?? { x: 0, y: 0, z: 1 };

    const spawnPos = {
      x: headLoc.x + view.x * SPAWN_OFFSET,
      y: headLoc.y + view.y * SPAWN_OFFSET,
      z: headLoc.z + view.z * SPAWN_OFFSET,
    };

    // spawn projectile entity
    const projectile = attacker.dimension.spawnEntity(PROJECTILE_ID, spawnPos);
    if (!projectile) return;

    // set owner (so damage attribution works) and shoot with velocity
    const projComp = projectile.getComponent("minecraft:projectile");
    if (projComp) {
      try {
        projComp.owner = attacker; // assign owner (so it won't hurt owner if desired and damage counts)
      } catch {}
      // velocity = view direction * SPEED
      const velocity = { x: view.x * SPEED, y: view.y * SPEED, z: view.z * SPEED };
      projComp.shoot(velocity, { uncertainty: 0 }); // uncertainty: 0 = perfect accuracy.
    } else {
      // fallback: if entity lacks projectile component, try giving it initial motion by setting velocity if available
      try {
        if (typeof projectile.setVelocity === "function") {
          projectile.setVelocity({ x: view.x * SPEED, y: view.y * SPEED, z: view.z * SPEED });
        } else if (projectile.addVelocity) {
          projectile.addVelocity(view.x * SPEED, view.y * SPEED, view.z * SPEED);
        }
      } catch (e) {
        // ignore — platform differences exist
      }
    }
  } catch (err) {
    // don't spam errors; log once during development if you need to debug
    console.warn("shoot_on_attack error:", err);
  }
});
