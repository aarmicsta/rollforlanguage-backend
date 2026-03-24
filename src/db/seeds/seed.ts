import { seedCharacterTraitsReference } from './canon-bridge/reference/ref-character-traits.seed';
import { seedCreatureEncounterReference } from './canon-bridge/reference/ref-creature-encounter.seed';
import { seedItemEquipmentReference } from './canon-bridge/reference/ref-item-equipment.seed';
import { seedWorldStructureReference } from './canon-bridge/reference/ref-world-structure.seed';
import { seedFactionReference } from './canon-bridge/reference/ref-faction.seed';
import { seedOrganizationReference } from './canon-bridge/reference/ref-organization.seed';

import { seedPlayableIdentity } from './canon-bridge/core/playable-identity.seed';
import { seedWorldStructure } from './canon-bridge/core/world-structure.seed';
import { seedFactions } from './canon-bridge/core/faction.seed';
import { seedOrganizations } from './canon-bridge/core/organization.seed';
import { seedCreatures } from './canon-bridge/core/creature.seed';
import { seedItemEquipment } from './canon-bridge/core/item-equipment.seed';

/**
 * =========================================================
 * RFL MASTER SEED RUNNER
 * =========================================================
 *
 * Purpose:
 * Runs all registered seed groups in a controlled order.
 *
 * Notes:
 * - Seed runners are intentionally separated by domain.
 * - This file coordinates execution only.
 * - Execution order should remain dependency-aware:
 *   reference tables first, then canonical entity systems,
 *   then dependent relationship/runtime systems later.
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
  await seedFactionReference();
  await seedOrganizationReference();

  // -------------------------------------------------------
  // CANON BRIDGE — PLAYABLE IDENTITY
  // -------------------------------------------------------
  await seedPlayableIdentity();

  // -------------------------------------------------------
  // CANON BRIDGE — WORLD STRUCTURE
  // -------------------------------------------------------
  await seedWorldStructure();

  // -------------------------------------------------------
  // CANON BRIDGE — FACTIONS
  // -------------------------------------------------------
  await seedFactions();

  // -------------------------------------------------------
  // CANON BRIDGE — ORGANIZATIONS
  // -------------------------------------------------------
  await seedOrganizations();

  // -------------------------------------------------------
  // CANON BRIDGE — CREATURES
  // -------------------------------------------------------
  await seedCreatures();

  // -------------------------------------------------------
  // CANON BRIDGE — ITEMS & EQUIPMENT
  // -------------------------------------------------------
  await seedItemEquipment();

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