/**
 * =========================================================
 * RFL SEED DATA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Creature Systems
 *
 * Purpose:
 * Defines canonical seed data for creature-related core
 * tables.
 *
 * Notes:
 * - These objects use application-side property names
 *   (displayName, sortOrder, etc.) rather than raw SQL names.
 * - IDs are explicitly defined to preserve canonical,
 *   stable references across environments.
 * - Reference IDs (e.g., creatureTypeId) must match
 *   corresponding reference table entries.
 *
 * =========================================================
 */

export const creaturesSeed = [
  {
    id: 'creature_ash_fen_wolf',
    name: 'ash_fen_wolf',
    slug: 'ash-fen-wolf',
    displayName: 'Ash Fen Wolf',
    description:
      'Lean marshland wolf adapted to wet ground, reeds, and low-visibility hunting. Often encountered in coordinated hunting groups.',
    creatureTypeId: 'ref_creature_type_beast',
    sizeCategoryId: 'ref_size_medium',
    intelligenceCategoryId: 'ref_intelligence_animal',
    threatLevelId: 'ref_threat_low',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 10,
  },
  {
    id: 'creature_shrine_guard_beetle',
    name: 'shrine_guard_beetle',
    slug: 'shrine-guard-beetle',
    displayName: 'Shrine Guard Beetle',
    description:
      'Large plated beetle frequently found near sacred stonework and old shrine paths, known for territorial defensive behavior.',
    creatureTypeId: 'ref_creature_type_beast',
    sizeCategoryId: 'ref_size_small',
    intelligenceCategoryId: 'ref_intelligence_instinctive',
    threatLevelId: 'ref_threat_low',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 20,
  },
  {
    id: 'creature_harbor_mire_drake',
    name: 'harbor_mire_drake',
    slug: 'harbor-mire-drake',
    displayName: 'Harbor Mire Drake',
    description:
      'Semi-aquatic drake lurking in brackish edges and harbor runoff channels, dangerous to laborers and small vessels.',
    creatureTypeId: 'ref_creature_type_drake',
    sizeCategoryId: 'ref_size_medium',
    intelligenceCategoryId: 'ref_intelligence_cunning',
    threatLevelId: 'ref_threat_moderate',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 30,
  },
  {
    id: 'creature_ember_wraith',
    name: 'ember_wraith',
    slug: 'ember-wraith',
    displayName: 'Ember Wraith',
    description:
      'Unsettling undead apparition wreathed in dim ember-glow, often associated with ruined sacred places and lingering unrest.',
    creatureTypeId: 'ref_creature_type_undead',
    sizeCategoryId: 'ref_size_medium',
    intelligenceCategoryId: 'ref_intelligence_cunning',
    threatLevelId: 'ref_threat_moderate',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 40,
  },
  {
    id: 'creature_tidecoil_serpent',
    name: 'tidecoil_serpent',
    slug: 'tidecoil-serpent',
    displayName: 'Tidecoil Serpent',
    description:
      'A venomous coastal serpent that moves through tidal rock channels and strikes from waterlogged cover.',
    creatureTypeId: 'ref_creature_type_beast',
    sizeCategoryId: 'ref_size_medium',
    intelligenceCategoryId: 'ref_intelligence_animal',
    threatLevelId: 'ref_threat_moderate',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 50,
  },
  {
    id: 'creature_ashen_rook',
    name: 'ashen_rook',
    slug: 'ashen-rook',
    displayName: 'Ashen Rook',
    description:
      'Dark-plumed carrion bird common around exposed stone, battle remnants, and high urban ledges.',
    creatureTypeId: 'ref_creature_type_beast',
    sizeCategoryId: 'ref_size_small',
    intelligenceCategoryId: 'ref_intelligence_animal',
    threatLevelId: 'ref_threat_trivial',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 60,
  },
  {
    id: 'creature_flamebound_sentinel',
    name: 'flamebound_sentinel',
    slug: 'flamebound-sentinel',
    displayName: 'Flamebound Sentinel',
    description:
      'Construct guardian bound to sacred fire rites, created to defend restricted shrine precincts and ceremonial thresholds.',
    creatureTypeId: 'ref_creature_type_construct',
    sizeCategoryId: 'ref_size_large',
    intelligenceCategoryId: 'ref_intelligence_directed',
    threatLevelId: 'ref_threat_high',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 70,
  },
  {
    id: 'creature_reedshade_stalker',
    name: 'reedshade_stalker',
    slug: 'reedshade-stalker',
    displayName: 'Reedshade Stalker',
    description:
      'Elusive marsh predator using camouflage and patience to ambush prey from dense reed beds and shallow water margins.',
    creatureTypeId: 'ref_creature_type_beast',
    sizeCategoryId: 'ref_size_medium',
    intelligenceCategoryId: 'ref_intelligence_cunning',
    threatLevelId: 'ref_threat_moderate',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 80,
  },
  {
    id: 'creature_cinder_mote_swarm',
    name: 'cinder_mote_swarm',
    slug: 'cinder-mote-swarm',
    displayName: 'Cinder Mote Swarm',
    description:
      'Swarm of ember-like biting entities that gather around heat, ruin, and magical residue, dangerous in numbers despite tiny size.',
    creatureTypeId: 'ref_creature_type_elemental',
    sizeCategoryId: 'ref_size_small',
    intelligenceCategoryId: 'ref_intelligence_instinctive',
    threatLevelId: 'ref_threat_low',
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 90,
  },
];

export const creatureTagsSeed = [
  {
    creatureId: 'creature_ash_fen_wolf',
    tagId: 'ref_creature_tag_beast',
    isActive: true,
    sortOrder: 10,
  },
  {
    creatureId: 'creature_ash_fen_wolf',
    tagId: 'ref_creature_tag_pack_hunter',
    isActive: true,
    sortOrder: 20,
  },
  {
    creatureId: 'creature_ash_fen_wolf',
    tagId: 'ref_creature_tag_territorial',
    isActive: true,
    sortOrder: 30,
  },

  {
    creatureId: 'creature_shrine_guard_beetle',
    tagId: 'ref_creature_tag_beast',
    isActive: true,
    sortOrder: 10,
  },
  {
    creatureId: 'creature_shrine_guard_beetle',
    tagId: 'ref_creature_tag_armored',
    isActive: true,
    sortOrder: 20,
  },
  {
    creatureId: 'creature_shrine_guard_beetle',
    tagId: 'ref_creature_tag_territorial',
    isActive: true,
    sortOrder: 30,
  },

  {
    creatureId: 'creature_harbor_mire_drake',
    tagId: 'ref_creature_tag_magical',
    isActive: true,
    sortOrder: 10,
  },
  {
    creatureId: 'creature_harbor_mire_drake',
    tagId: 'ref_creature_tag_aquatic',
    isActive: true,
    sortOrder: 20,
  },
  {
    creatureId: 'creature_harbor_mire_drake',
    tagId: 'ref_creature_tag_monstrous',
    isActive: true,
    sortOrder: 30,
  },
  {
    creatureId: 'creature_harbor_mire_drake',
    tagId: 'ref_creature_tag_solitary',
    isActive: true,
    sortOrder: 40,
  },

  {
    creatureId: 'creature_ember_wraith',
    tagId: 'ref_creature_tag_undead',
    isActive: true,
    sortOrder: 10,
  },
  {
    creatureId: 'creature_ember_wraith',
    tagId: 'ref_creature_tag_magical',
    isActive: true,
    sortOrder: 20,
  },
  {
    creatureId: 'creature_ember_wraith',
    tagId: 'ref_creature_tag_nocturnal',
    isActive: true,
    sortOrder: 30,
  },
  {
    creatureId: 'creature_ember_wraith',
    tagId: 'ref_creature_tag_monstrous',
    isActive: true,
    sortOrder: 40,
  },

  {
    creatureId: 'creature_tidecoil_serpent',
    tagId: 'ref_creature_tag_beast',
    isActive: true,
    sortOrder: 10,
  },
  {
    creatureId: 'creature_tidecoil_serpent',
    tagId: 'ref_creature_tag_aquatic',
    isActive: true,
    sortOrder: 20,
  },
  {
    creatureId: 'creature_tidecoil_serpent',
    tagId: 'ref_creature_tag_venomous',
    isActive: true,
    sortOrder: 30,
  },
  {
    creatureId: 'creature_tidecoil_serpent',
    tagId: 'ref_creature_tag_solitary',
    isActive: true,
    sortOrder: 40,
  },

  {
    creatureId: 'creature_ashen_rook',
    tagId: 'ref_creature_tag_beast',
    isActive: true,
    sortOrder: 10,
  },
  {
    creatureId: 'creature_ashen_rook',
    tagId: 'ref_creature_tag_flying',
    isActive: true,
    sortOrder: 20,
  },
  {
    creatureId: 'creature_ashen_rook',
    tagId: 'ref_creature_tag_nocturnal',
    isActive: true,
    sortOrder: 30,
  },

  {
    creatureId: 'creature_flamebound_sentinel',
    tagId: 'ref_creature_tag_construct',
    isActive: true,
    sortOrder: 10,
  },
  {
    creatureId: 'creature_flamebound_sentinel',
    tagId: 'ref_creature_tag_magical',
    isActive: true,
    sortOrder: 20,
  },
  {
    creatureId: 'creature_flamebound_sentinel',
    tagId: 'ref_creature_tag_territorial',
    isActive: true,
    sortOrder: 30,
  },

  {
    creatureId: 'creature_reedshade_stalker',
    tagId: 'ref_creature_tag_beast',
    isActive: true,
    sortOrder: 10,
  },
  {
    creatureId: 'creature_reedshade_stalker',
    tagId: 'ref_creature_tag_nocturnal',
    isActive: true,
    sortOrder: 20,
  },
  {
    creatureId: 'creature_reedshade_stalker',
    tagId: 'ref_creature_tag_solitary',
    isActive: true,
    sortOrder: 30,
  },
  {
    creatureId: 'creature_reedshade_stalker',
    tagId: 'ref_creature_tag_apex',
    isActive: true,
    sortOrder: 40,
  },

  {
    creatureId: 'creature_cinder_mote_swarm',
    tagId: 'ref_creature_tag_elemental',
    isActive: true,
    sortOrder: 10,
  },
  {
    creatureId: 'creature_cinder_mote_swarm',
    tagId: 'ref_creature_tag_magical',
    isActive: true,
    sortOrder: 20,
  },
  {
    creatureId: 'creature_cinder_mote_swarm',
    tagId: 'ref_creature_tag_swarming',
    isActive: true,
    sortOrder: 30,
  },
];

export const creatureStatValuesSeed = [
  {
    creatureId: 'creature_ash_fen_wolf',
    statId: 'ref_stat_hp',
    statValue: 110,
    isActive: true,
    sortOrder: 10,
  },
  {
    creatureId: 'creature_ash_fen_wolf',
    statId: 'ref_stat_attack',
    statValue: 18,
    isActive: true,
    sortOrder: 20,
  },
  {
    creatureId: 'creature_ash_fen_wolf',
    statId: 'ref_stat_defense',
    statValue: 10,
    isActive: true,
    sortOrder: 30,
  },
  {
    creatureId: 'creature_ash_fen_wolf',
    statId: 'ref_stat_speed',
    statValue: 16,
    isActive: true,
    sortOrder: 40,
  },
  {
    creatureId: 'creature_ash_fen_wolf',
    statId: 'ref_stat_intelligence',
    statValue: 6,
    isActive: true,
    sortOrder: 50,
  },
  {
    creatureId: 'creature_ash_fen_wolf',
    statId: 'ref_stat_charisma',
    statValue: 4,
    isActive: true,
    sortOrder: 60,
  },

  {
    creatureId: 'creature_shrine_guard_beetle',
    statId: 'ref_stat_hp',
    statValue: 140,
    isActive: true,
    sortOrder: 10,
  },
  {
    creatureId: 'creature_shrine_guard_beetle',
    statId: 'ref_stat_attack',
    statValue: 12,
    isActive: true,
    sortOrder: 20,
  },
  {
    creatureId: 'creature_shrine_guard_beetle',
    statId: 'ref_stat_defense',
    statValue: 18,
    isActive: true,
    sortOrder: 30,
  },
  {
    creatureId: 'creature_shrine_guard_beetle',
    statId: 'ref_stat_speed',
    statValue: 6,
    isActive: true,
    sortOrder: 40,
  },
  {
    creatureId: 'creature_shrine_guard_beetle',
    statId: 'ref_stat_intelligence',
    statValue: 3,
    isActive: true,
    sortOrder: 50,
  },
  {
    creatureId: 'creature_shrine_guard_beetle',
    statId: 'ref_stat_charisma',
    statValue: 2,
    isActive: true,
    sortOrder: 60,
  },

  {
    creatureId: 'creature_harbor_mire_drake',
    statId: 'ref_stat_hp',
    statValue: 160,
    isActive: true,
    sortOrder: 10,
  },
  {
    creatureId: 'creature_harbor_mire_drake',
    statId: 'ref_stat_attack',
    statValue: 22,
    isActive: true,
    sortOrder: 20,
  },
  {
    creatureId: 'creature_harbor_mire_drake',
    statId: 'ref_stat_defense',
    statValue: 14,
    isActive: true,
    sortOrder: 30,
  },
  {
    creatureId: 'creature_harbor_mire_drake',
    statId: 'ref_stat_speed',
    statValue: 12,
    isActive: true,
    sortOrder: 40,
  },
  {
    creatureId: 'creature_harbor_mire_drake',
    statId: 'ref_stat_intelligence',
    statValue: 8,
    isActive: true,
    sortOrder: 50,
  },
  {
    creatureId: 'creature_harbor_mire_drake',
    statId: 'ref_stat_charisma',
    statValue: 5,
    isActive: true,
    sortOrder: 60,
  },

  {
    creatureId: 'creature_ember_wraith',
    statId: 'ref_stat_hp',
    statValue: 120,
    isActive: true,
    sortOrder: 10,
  },
  {
    creatureId: 'creature_ember_wraith',
    statId: 'ref_stat_attack',
    statValue: 20,
    isActive: true,
    sortOrder: 20,
  },
  {
    creatureId: 'creature_ember_wraith',
    statId: 'ref_stat_defense',
    statValue: 8,
    isActive: true,
    sortOrder: 30,
  },
  {
    creatureId: 'creature_ember_wraith',
    statId: 'ref_stat_speed',
    statValue: 14,
    isActive: true,
    sortOrder: 40,
  },
  {
    creatureId: 'creature_ember_wraith',
    statId: 'ref_stat_intelligence',
    statValue: 10,
    isActive: true,
    sortOrder: 50,
  },
  {
    creatureId: 'creature_ember_wraith',
    statId: 'ref_stat_charisma',
    statValue: 6,
    isActive: true,
    sortOrder: 60,
  },

  {
    creatureId: 'creature_tidecoil_serpent',
    statId: 'ref_stat_hp',
    statValue: 130,
    isActive: true,
    sortOrder: 10,
  },
  {
    creatureId: 'creature_tidecoil_serpent',
    statId: 'ref_stat_attack',
    statValue: 19,
    isActive: true,
    sortOrder: 20,
  },
  {
    creatureId: 'creature_tidecoil_serpent',
    statId: 'ref_stat_defense',
    statValue: 11,
    isActive: true,
    sortOrder: 30,
  },
  {
    creatureId: 'creature_tidecoil_serpent',
    statId: 'ref_stat_speed',
    statValue: 15,
    isActive: true,
    sortOrder: 40,
  },
  {
    creatureId: 'creature_tidecoil_serpent',
    statId: 'ref_stat_intelligence',
    statValue: 5,
    isActive: true,
    sortOrder: 50,
  },
  {
    creatureId: 'creature_tidecoil_serpent',
    statId: 'ref_stat_charisma',
    statValue: 3,
    isActive: true,
    sortOrder: 60,
  },

  {
    creatureId: 'creature_ashen_rook',
    statId: 'ref_stat_hp',
    statValue: 60,
    isActive: true,
    sortOrder: 10,
  },
  {
    creatureId: 'creature_ashen_rook',
    statId: 'ref_stat_attack',
    statValue: 9,
    isActive: true,
    sortOrder: 20,
  },
  {
    creatureId: 'creature_ashen_rook',
    statId: 'ref_stat_defense',
    statValue: 6,
    isActive: true,
    sortOrder: 30,
  },
  {
    creatureId: 'creature_ashen_rook',
    statId: 'ref_stat_speed',
    statValue: 18,
    isActive: true,
    sortOrder: 40,
  },
  {
    creatureId: 'creature_ashen_rook',
    statId: 'ref_stat_intelligence',
    statValue: 4,
    isActive: true,
    sortOrder: 50,
  },
  {
    creatureId: 'creature_ashen_rook',
    statId: 'ref_stat_charisma',
    statValue: 3,
    isActive: true,
    sortOrder: 60,
  },

  {
    creatureId: 'creature_flamebound_sentinel',
    statId: 'ref_stat_hp',
    statValue: 220,
    isActive: true,
    sortOrder: 10,
  },
  {
    creatureId: 'creature_flamebound_sentinel',
    statId: 'ref_stat_attack',
    statValue: 26,
    isActive: true,
    sortOrder: 20,
  },
  {
    creatureId: 'creature_flamebound_sentinel',
    statId: 'ref_stat_defense',
    statValue: 20,
    isActive: true,
    sortOrder: 30,
  },
  {
    creatureId: 'creature_flamebound_sentinel',
    statId: 'ref_stat_speed',
    statValue: 8,
    isActive: true,
    sortOrder: 40,
  },
  {
    creatureId: 'creature_flamebound_sentinel',
    statId: 'ref_stat_intelligence',
    statValue: 7,
    isActive: true,
    sortOrder: 50,
  },
  {
    creatureId: 'creature_flamebound_sentinel',
    statId: 'ref_stat_charisma',
    statValue: 4,
    isActive: true,
    sortOrder: 60,
  },

  {
    creatureId: 'creature_reedshade_stalker',
    statId: 'ref_stat_hp',
    statValue: 125,
    isActive: true,
    sortOrder: 10,
  },
  {
    creatureId: 'creature_reedshade_stalker',
    statId: 'ref_stat_attack',
    statValue: 21,
    isActive: true,
    sortOrder: 20,
  },
  {
    creatureId: 'creature_reedshade_stalker',
    statId: 'ref_stat_defense',
    statValue: 12,
    isActive: true,
    sortOrder: 30,
  },
  {
    creatureId: 'creature_reedshade_stalker',
    statId: 'ref_stat_speed',
    statValue: 17,
    isActive: true,
    sortOrder: 40,
  },
  {
    creatureId: 'creature_reedshade_stalker',
    statId: 'ref_stat_intelligence',
    statValue: 7,
    isActive: true,
    sortOrder: 50,
  },
  {
    creatureId: 'creature_reedshade_stalker',
    statId: 'ref_stat_charisma',
    statValue: 4,
    isActive: true,
    sortOrder: 60,
  },

  {
    creatureId: 'creature_cinder_mote_swarm',
    statId: 'ref_stat_hp',
    statValue: 90,
    isActive: true,
    sortOrder: 10,
  },
  {
    creatureId: 'creature_cinder_mote_swarm',
    statId: 'ref_stat_attack',
    statValue: 16,
    isActive: true,
    sortOrder: 20,
  },
  {
    creatureId: 'creature_cinder_mote_swarm',
    statId: 'ref_stat_defense',
    statValue: 8,
    isActive: true,
    sortOrder: 30,
  },
  {
    creatureId: 'creature_cinder_mote_swarm',
    statId: 'ref_stat_speed',
    statValue: 13,
    isActive: true,
    sortOrder: 40,
  },
  {
    creatureId: 'creature_cinder_mote_swarm',
    statId: 'ref_stat_intelligence',
    statValue: 3,
    isActive: true,
    sortOrder: 50,
  },
  {
    creatureId: 'creature_cinder_mote_swarm',
    statId: 'ref_stat_charisma',
    statValue: 2,
    isActive: true,
    sortOrder: 60,
  },
];