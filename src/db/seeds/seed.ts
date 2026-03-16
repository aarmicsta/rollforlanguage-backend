import { seedCharacterTraitsReference } from './reference/character-traits.seed';
import { seedCreatureEncounterReference } from './reference/creature-encounter.seed';
import { seedItemEquipmentReference } from './reference/item-equipment.seed';

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
 *
 * Notes:
 * - Seed runners are intentionally separated by domain.
 * - This file coordinates execution only.
 *
 * =========================================================
 */

async function seed() {
  console.log('Starting RFL seed process...');

  await seedCharacterTraitsReference();
  await seedCreatureEncounterReference();
  await seedItemEquipmentReference();

  console.log('RFL seed process complete.');
}

seed().catch((error) => {
  console.error('RFL seed process failed:', error);
  process.exit(1);
});