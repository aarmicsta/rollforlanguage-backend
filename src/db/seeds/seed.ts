import { seedCharacterTraitsReference } from './reference/character-traits.seed';
import { seedCreatureEncounterReference } from './reference/creature-encounter.seed';
import { seedItemEquipmentReference } from './reference/item-equipment.seed';
import { seedWorldStructureReference } from './reference/world-structure.seed';
import { seedWorldStructure } from './canon-bridge/world-structure.seed';
import { seedPlayableIdentity } from './canon-bridge/playable-identity.seed';

/**
 * =========================================================
 * RFL MASTER SEED RUNNER
 * =========================================================
 *
 * Purpose:
 * Runs all registered seed groups in a controlled order.
 *
 * Current scope:
 * - Canon Bridge reference tables
 * - Canon Bridge playable identity tables
 *
 * Notes:
 * - Seed runners are intentionally separated by domain.
 * - This file coordinates execution only.
 * - Execution order should remain dependency-aware:
 *   reference tables first, then canonical entity systems,
 *   then dependent relationship/runtime systems later.
 *
 * Planned future seed domains:
 * - Canon Bridge creature systems
 * - Canon Bridge item/equipment systems
 * - Canon Bridge world/location systems
 * - Lore layer tables
 * - Portal layer runtime/bootstrap tables
 *
 * =========================================================
 */

async function seed() {
  console.log('Starting RFL seed process...');

  // -------------------------------------------------------
  // CANON BRIDGE — REFERENCE TABLES
  // -------------------------------------------------------
  await seedCharacterTraitsReference();
  await seedCreatureEncounterReference();
  await seedItemEquipmentReference();
  await seedWorldStructureReference();

  // -------------------------------------------------------
  // CANON BRIDGE — PLAYABLE IDENTITY
  // -------------------------------------------------------
  await seedPlayableIdentity();

  // -------------------------------------------------------
  // CANON BRIDGE — WORLD STRUCTURE
  // -------------------------------------------------------
  await seedWorldStructure();

  // -------------------------------------------------------
  // CANON BRIDGE — FUTURE DOMAINS
  // -------------------------------------------------------
  // await seedCreatures();
  // await seedItemsAndEquipment();
  // await seedWorldStructure();

  // -------------------------------------------------------
  // LORE LAYER — FUTURE DOMAINS
  // -------------------------------------------------------
  // await seedSpeciesLore();
  // await seedRegionLore();
  // await seedLocationLore();

  // -------------------------------------------------------
  // PORTAL LAYER — FUTURE DOMAINS
  // -------------------------------------------------------
  // await seedPortalBootstrap();
  // await seedClassroomDefaults();

  console.log('RFL seed process complete.');
}

seed().catch((error) => {
  console.error('RFL seed process failed:', error);
  process.exit(1);
});