/**
 * =========================================================
 * RFL SEED DATA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Items & Equipment
 *
 * Purpose:
 * Defines canonical seed data for the items table.
 *
 * Notes:
 * - These objects use application-side property names.
 * - Canonical IDs are explicitly defined and must remain stable.
 * - Timestamps are handled by the schema defaults / seed runner.
 * - Reference IDs (itemTypeId, rarityLevelId) must align with
 *   their respective reference tables.
 *
 * =========================================================
 */

export const itemsSeed = [
  {
    id: 'item_iron_sword',
    name: 'iron_sword',
    slug: 'iron-sword',
    displayName: 'Iron Sword',
    description:
      'A standard forged iron blade used by guards and common soldiers.',
    itemTypeId: 'ref_item_type_weapon',
    rarityLevelId: 'ref_rarity_common',
    baseValue: 50,
    weight: '3.50',
    maxStackSize: 1,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 10,
  },
  {
    id: 'item_apprentice_staff',
    name: 'apprentice_staff',
    slug: 'apprentice-staff',
    displayName: 'Apprentice Staff',
    description:
      'A simple focus staff used by novice spellcasters to channel basic magical energy.',
    itemTypeId: 'ref_item_type_weapon',
    rarityLevelId: 'ref_rarity_common',
    baseValue: 40,
    weight: '2.50',
    maxStackSize: 1,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 20,
  },
  {
    id: 'item_guard_helm',
    name: 'guard_helm',
    slug: 'guard-helm',
    displayName: 'Guard Helm',
    description:
      'A basic metal helmet offering protection for the head in combat situations.',
    itemTypeId: 'ref_item_type_armor',
    rarityLevelId: 'ref_rarity_common',
    baseValue: 35,
    weight: '2.00',
    maxStackSize: 1,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 30,
  },
  {
    id: 'item_travelers_cloak',
    name: 'travelers_cloak',
    slug: 'travelers-cloak',
    displayName: "Traveler's Cloak",
    description:
      'A durable cloak providing light protection and resistance to environmental conditions.',
    itemTypeId: 'ref_item_type_armor',
    rarityLevelId: 'ref_rarity_uncommon',
    baseValue: 60,
    weight: '1.50',
    maxStackSize: 1,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 40,
  },
  {
    id: 'item_leather_boots',
    name: 'leather_boots',
    slug: 'leather-boots',
    displayName: 'Leather Boots',
    description:
      'Reinforced boots suited for long journeys and rough terrain.',
    itemTypeId: 'ref_item_type_armor',
    rarityLevelId: 'ref_rarity_common',
    baseValue: 30,
    weight: '1.20',
    maxStackSize: 1,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 50,
  },
  {
    id: 'item_ring_minor_focus',
    name: 'ring_minor_focus',
    slug: 'ring-minor-focus',
    displayName: 'Ring of Minor Focus',
    description:
      'A simple enchanted ring that enhances concentration and magical clarity.',
    itemTypeId: 'ref_item_type_accessory',
    rarityLevelId: 'ref_rarity_uncommon',
    baseValue: 75,
    weight: '0.10',
    maxStackSize: 1,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 60,
  },
  {
    id: 'item_amulet_embers',
    name: 'amulet_embers',
    slug: 'amulet-embers',
    displayName: 'Amulet of Embers',
    description:
      'A warm-to-the-touch charm associated with minor fire-aspected magical effects.',
    itemTypeId: 'ref_item_type_accessory',
    rarityLevelId: 'ref_rarity_rare',
    baseValue: 120,
    weight: '0.20',
    maxStackSize: 1,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 70,
  },
  {
    id: 'item_minor_healing_potion',
    name: 'minor_healing_potion',
    slug: 'minor-healing-potion',
    displayName: 'Minor Healing Potion',
    description:
      'A restorative liquid that recovers a small amount of vitality when consumed.',
    itemTypeId: 'ref_item_type_consumable',
    rarityLevelId: 'ref_rarity_common',
    baseValue: 15,
    weight: '0.30',
    maxStackSize: 10,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 80,
  },
  {
    id: 'item_copper_trade_token',
    name: 'copper_trade_token',
    slug: 'copper-trade-token',
    displayName: 'Copper Trade Token',
    description:
      'A stamped token used in local trade exchanges and minor economic transactions.',
    itemTypeId: 'ref_item_type_miscellaneous',
    rarityLevelId: 'ref_rarity_common',
    baseValue: 5,
    weight: '0.05',
    maxStackSize: 50,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 90,
  },
  {
    id: 'item_iron_ingot',
    name: 'iron_ingot',
    slug: 'iron-ingot',
    displayName: 'Iron Ingot',
    description:
      'A refined bar of iron used in crafting weapons, armor, and structural components.',
    itemTypeId: 'ref_item_type_crafting_material',
    rarityLevelId: 'ref_rarity_common',
    baseValue: 20,
    weight: '2.00',
    maxStackSize: 20,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 100,
  },
  {
    id: 'item_shrine_key_fragment',
    name: 'shrine_key_fragment',
    slug: 'shrine-key-fragment',
    displayName: 'Shrine Key Fragment',
    description:
      'A broken piece of an ancient key believed to unlock sealed sacred mechanisms.',
    itemTypeId: 'ref_item_type_quest_item',
    rarityLevelId: 'ref_rarity_rare',
    baseValue: 0,
    weight: '0.10',
    maxStackSize: 1,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 110,
  },
];

export const itemEquipmentSlotsSeed = [
  {
    itemId: 'item_iron_sword',
    equipmentSlotId: 'ref_equipment_slot_weapon',
  },
  {
    itemId: 'item_apprentice_staff',
    equipmentSlotId: 'ref_equipment_slot_weapon',
  },
  {
    itemId: 'item_guard_helm',
    equipmentSlotId: 'ref_equipment_slot_head',
  },
  {
    itemId: 'item_travelers_cloak',
    equipmentSlotId: 'ref_equipment_slot_chest',
  },
  {
    itemId: 'item_leather_boots',
    equipmentSlotId: 'ref_equipment_slot_feet',
  },
  {
    itemId: 'item_ring_minor_focus',
    equipmentSlotId: 'ref_equipment_slot_ring',
  },
  {
    itemId: 'item_amulet_embers',
    equipmentSlotId: 'ref_equipment_slot_amulet',
  },
];