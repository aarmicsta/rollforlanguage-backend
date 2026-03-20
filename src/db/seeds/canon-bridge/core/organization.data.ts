/**
 * =========================================================
 * RFL SEED DATA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Social Entities — Organizations
 *
 * Purpose:
 * Defines canonical seed data for organization entities
 * and their associated relationships.
 *
 * Notes:
 * - These objects use application-side property names
 *   (displayName, sortOrder, etc.) rather than raw SQL names.
 * - Canonical IDs are explicitly included for stability
 *   across environments and cross-table references.
 * - Timestamps are handled by the schema defaults / seed runner.
 * - This file defines core entity data, not reference vocabularies.
 *
 * =========================================================
 */

export const organizationsSeed = [
  {
    id: 'org_velos_harbormasters',
    name: 'velos_harbormasters',
    slug: 'velos-harbormasters',
    displayName: 'Velos Harbormasters',
    description:
      'Civic port authority responsible for docking control, shipping oversight, cargo regulation, and daily harbor coordination in Velos Prime.',
    alignmentId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 10,
  },
  {
    id: 'org_guild_coin_sail',
    name: 'guild_coin_sail',
    slug: 'guild-coin-sail',
    displayName: 'Guild of Coin and Sail',
    description:
      'Major mercantile guild coordinating trade contracts, merchant standards, and commercial shipping interests tied to the Velos harbor.',
    alignmentId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 20,
  },
  {
    id: 'org_keepers_ninth_flame',
    name: 'keepers_ninth_flame',
    slug: 'keepers-ninth-flame',
    displayName: 'Keepers of the Ninth Flame',
    description:
      'Religious custodial order charged with maintaining the Shrine of the Ninth Flame, preserving rites, and safeguarding sacred observances.',
    alignmentId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 30,
  },
  {
    id: 'org_velos_watch',
    name: 'velos_watch',
    slug: 'velos-watch',
    displayName: 'Velos Watch',
    description:
      'Structured city security organization handling patrols, incident response, and enforcement of civic order within Velos Prime.',
    alignmentId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 40,
  },
  {
    id: 'org_house_of_measures',
    name: 'house_of_measures',
    slug: 'house-of-measures',
    displayName: 'House of Measures',
    description:
      'Administrative and judicial body responsible for weights, standards, trade disputes, and formal arbitration in regulated city commerce.',
    alignmentId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 50,
  },
  {
    id: 'org_tidewrights_union',
    name: 'tidewrights_union',
    slug: 'tidewrights-union',
    displayName: 'Tidewrights Union',
    description:
      'Craft and logistical association of shipwrights, dock labor coordinators, and repair specialists supporting maritime activity in the harbor.',
    alignmentId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 60,
  },
  {
    id: 'org_gilded_hand_circle',
    name: 'gilded_hand_circle',
    slug: 'gilded-hand-circle',
    displayName: 'Gilded Hand Circle',
    description:
      'Secretive criminal organization operating smuggling, contraband exchange, and illicit brokerage through covert networks in Velos Prime.',
    alignmentId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 70,
  },
  {
    id: 'org_lantern_rest',
    name: 'lantern_rest',
    slug: 'lantern-rest',
    displayName: 'Lantern Rest',
    description:
      'Charitable refuge and aid house offering food, shelter, and practical assistance to travelers, laborers, and the vulnerable near the docks.',
    alignmentId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 80,
  },
  {
    id: 'org_archive_embers',
    name: 'archive_embers',
    slug: 'archive-embers',
    displayName: 'Archive of Embers',
    description:
      'Small scholarly institution preserving records, liturgical texts, civic documents, and historical knowledge relevant to Velos and its rites.',
    alignmentId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 90,
  },
];

export const organizationTagsSeed = [
  {
    organizationId: 'org_velos_harbormasters',
    tagId: 'ref_org_tag_civic',
    isActive: true,
    sortOrder: 10,
  },
  {
    organizationId: 'org_velos_harbormasters',
    tagId: 'ref_org_tag_logistical',
    isActive: true,
    sortOrder: 20,
  },
  {
    organizationId: 'org_velos_harbormasters',
    tagId: 'ref_org_tag_maritime',
    isActive: true,
    sortOrder: 30,
  },
  {
    organizationId: 'org_guild_coin_sail',
    tagId: 'ref_org_tag_mercantile',
    isActive: true,
    sortOrder: 10,
  },
  {
    organizationId: 'org_guild_coin_sail',
    tagId: 'ref_org_tag_maritime',
    isActive: true,
    sortOrder: 20,
  },
  {
    organizationId: 'org_guild_coin_sail',
    tagId: 'ref_org_tag_logistical',
    isActive: true,
    sortOrder: 30,
  },
  {
    organizationId: 'org_keepers_ninth_flame',
    tagId: 'ref_org_tag_religious',
    isActive: true,
    sortOrder: 10,
  },
  {
    organizationId: 'org_keepers_ninth_flame',
    tagId: 'ref_org_tag_charitable',
    isActive: true,
    sortOrder: 20,
  },
  {
    organizationId: 'org_velos_watch',
    tagId: 'ref_org_tag_civic',
    isActive: true,
    sortOrder: 10,
  },
  {
    organizationId: 'org_velos_watch',
    tagId: 'ref_org_tag_militant',
    isActive: true,
    sortOrder: 20,
  },
  {
    organizationId: 'org_house_of_measures',
    tagId: 'ref_org_tag_judicial',
    isActive: true,
    sortOrder: 10,
  },
  {
    organizationId: 'org_house_of_measures',
    tagId: 'ref_org_tag_civic',
    isActive: true,
    sortOrder: 20,
  },
  {
    organizationId: 'org_house_of_measures',
    tagId: 'ref_org_tag_mercantile',
    isActive: true,
    sortOrder: 30,
  },
  {
    organizationId: 'org_tidewrights_union',
    tagId: 'ref_org_tag_craft',
    isActive: true,
    sortOrder: 10,
  },
  {
    organizationId: 'org_tidewrights_union',
    tagId: 'ref_org_tag_logistical',
    isActive: true,
    sortOrder: 20,
  },
  {
    organizationId: 'org_tidewrights_union',
    tagId: 'ref_org_tag_maritime',
    isActive: true,
    sortOrder: 30,
  },
  {
    organizationId: 'org_gilded_hand_circle',
    tagId: 'ref_org_tag_criminal',
    isActive: true,
    sortOrder: 10,
  },
  {
    organizationId: 'org_gilded_hand_circle',
    tagId: 'ref_org_tag_secretive',
    isActive: true,
    sortOrder: 20,
  },
  {
    organizationId: 'org_gilded_hand_circle',
    tagId: 'ref_org_tag_logistical',
    isActive: true,
    sortOrder: 30,
  },
  {
    organizationId: 'org_lantern_rest',
    tagId: 'ref_org_tag_charitable',
    isActive: true,
    sortOrder: 10,
  },
  {
    organizationId: 'org_lantern_rest',
    tagId: 'ref_org_tag_civic',
    isActive: true,
    sortOrder: 20,
  },
  {
    organizationId: 'org_archive_embers',
    tagId: 'ref_org_tag_scholarly',
    isActive: true,
    sortOrder: 10,
  },
  {
    organizationId: 'org_archive_embers',
    tagId: 'ref_org_tag_religious',
    isActive: true,
    sortOrder: 20,
  },
];