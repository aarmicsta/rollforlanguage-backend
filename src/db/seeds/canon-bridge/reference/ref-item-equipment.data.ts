/**
 * =========================================================
 * RFL SEED DATA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Reference Tables — Item / Equipment Systems
 *
 * Purpose:
 * Defines canonical seed data for item- and equipment-
 * related reference tables.
 *
 * Notes:
 * - Reference-table records now use canonical IDs.
 *
 * =========================================================
 */

export const rarityLevelsSeed = [
  { id: 'ref_rarity_common', name: 'common', slug: 'common', displayName: 'Common', description: 'Widely available, ordinary items with no unusual rarity or prestige.', rarityRank: 1, colorHex: '#9CA3AF', isActive: true, sortOrder: 1 },
  { id: 'ref_rarity_uncommon', name: 'uncommon', slug: 'uncommon', displayName: 'Uncommon', description: 'Less common items that are somewhat specialized, improved, or lightly enchanted.', rarityRank: 2, colorHex: '#22C55E', isActive: true, sortOrder: 2 },
  { id: 'ref_rarity_rare', name: 'rare', slug: 'rare', displayName: 'Rare', description: 'Noteworthy items that are difficult to find and clearly more special than standard gear.', rarityRank: 3, colorHex: '#3B82F6', isActive: true, sortOrder: 3 },
  { id: 'ref_rarity_epic', name: 'epic', slug: 'epic', displayName: 'Epic', description: 'High-value items with significant power, prestige, or magical distinction.', rarityRank: 4, colorHex: '#A855F7', isActive: true, sortOrder: 4 },
  { id: 'ref_rarity_legendary', name: 'legendary', slug: 'legendary', displayName: 'Legendary', description: 'Exceptionally powerful or storied items of great renown and rarity.', rarityRank: 5, colorHex: '#F59E0B', isActive: true, sortOrder: 5 },
  { id: 'ref_rarity_mythic', name: 'mythic', slug: 'mythic', displayName: 'Mythic', description: 'Extremely rare, extraordinary items often tied to great legends, ancient power, or singular importance.', rarityRank: 6, colorHex: '#EF4444', isActive: true, sortOrder: 6 },
];

export const equipmentSlotsSeed = [
  { id: 'ref_equipment_slot_head', name: 'head', slug: 'head', displayName: 'Head', description: 'Equipment worn on the head such as helmets, hoods, or crowns.', slotCategory: 'armor', isActive: true, sortOrder: 1 },
  { id: 'ref_equipment_slot_chest', name: 'chest', slug: 'chest', displayName: 'Chest', description: 'Main body armor or clothing worn on the torso.', slotCategory: 'armor', isActive: true, sortOrder: 2 },
  { id: 'ref_equipment_slot_legs', name: 'legs', slug: 'legs', displayName: 'Legs', description: 'Lower body armor or garments such as greaves or trousers.', slotCategory: 'armor', isActive: true, sortOrder: 3 },
  { id: 'ref_equipment_slot_feet', name: 'feet', slug: 'feet', displayName: 'Feet', description: 'Footwear such as boots or sandals.', slotCategory: 'armor', isActive: true, sortOrder: 4 },
  { id: 'ref_equipment_slot_hands', name: 'hands', slug: 'hands', displayName: 'Hands', description: 'Gloves or gauntlets worn on the hands.', slotCategory: 'armor', isActive: true, sortOrder: 5 },
  { id: 'ref_equipment_slot_weapon', name: 'weapon', slug: 'weapon', displayName: 'Weapon', description: 'Primary weapon used to attack or cast offensive abilities.', slotCategory: 'weapon', isActive: true, sortOrder: 6 },
  { id: 'ref_equipment_slot_offhand', name: 'offhand', slug: 'offhand', displayName: 'Offhand', description: 'Secondary hand equipment such as shields, focuses, or secondary weapons.', slotCategory: 'weapon', isActive: true, sortOrder: 7 },
  { id: 'ref_equipment_slot_ring', name: 'ring', slug: 'ring', displayName: 'Ring', description: 'A magical or decorative ring that grants passive bonuses.', slotCategory: 'accessory', isActive: true, sortOrder: 8 },
  { id: 'ref_equipment_slot_amulet', name: 'amulet', slug: 'amulet', displayName: 'Amulet', description: 'A necklace or charm worn around the neck providing magical or passive effects.', slotCategory: 'accessory', isActive: true, sortOrder: 9 },
];

export const itemTypesSeed = [
  { id: 'ref_item_type_weapon', name: 'weapon', slug: 'weapon', displayName: 'Weapon', description: 'An equippable item primarily used to attack, strike, or channel offensive power.', itemCategory: 'equipment', isEquippable: true, isConsumable: false, isCraftingMaterial: false, isActive: true, sortOrder: 1 },
  { id: 'ref_item_type_armor', name: 'armor', slug: 'armor', displayName: 'Armor', description: 'An equippable defensive item worn to improve protection or survivability.', itemCategory: 'equipment', isEquippable: true, isConsumable: false, isCraftingMaterial: false, isActive: true, sortOrder: 2 },
  { id: 'ref_item_type_accessory', name: 'accessory', slug: 'accessory', displayName: 'Accessory', description: 'An equippable item such as a ring, amulet, or charm that grants passive benefits.', itemCategory: 'equipment', isEquippable: true, isConsumable: false, isCraftingMaterial: false, isActive: true, sortOrder: 3 },
  { id: 'ref_item_type_consumable', name: 'consumable', slug: 'consumable', displayName: 'Consumable', description: 'A usable item that is spent, depleted, or removed through use.', itemCategory: 'usable', isEquippable: false, isConsumable: true, isCraftingMaterial: false, isActive: true, sortOrder: 4 },
  { id: 'ref_item_type_crafting_material', name: 'crafting_material', slug: 'crafting_material', displayName: 'Crafting Material', description: 'A material or component used in crafting, upgrading, or item creation.', itemCategory: 'material', isEquippable: false, isConsumable: false, isCraftingMaterial: true, isActive: true, sortOrder: 5 },
  { id: 'ref_item_type_quest_item', name: 'quest_item', slug: 'quest_item', displayName: 'Quest Item', description: 'A special item primarily used for story progression, objectives, or scripted interactions.', itemCategory: 'special', isEquippable: false, isConsumable: false, isCraftingMaterial: false, isActive: true, sortOrder: 6 },
  { id: 'ref_item_type_miscellaneous', name: 'miscellaneous', slug: 'miscellaneous', displayName: 'Miscellaneous', description: 'A general-purpose item that does not cleanly fit other core item categories.', itemCategory: 'general', isEquippable: false, isConsumable: false, isCraftingMaterial: false, isActive: true, sortOrder: 7 },
];