/**
 * =========================================================
 * RFL SEED DATA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Social Entities — Factions
 *
 * Purpose:
 * Defines canonical seed data for the factions table.
 *
 * Notes:
 * - These objects use application-side property names.
 * - IDs and timestamps are handled by the seed runner.
 * - `alignmentId` and `iconMediaAssetId` are nullable.
 *
 * =========================================================
 */

export const factionsSeed = [
  {
    id: 'fac_kingdom_velos',
    name: 'kingdom_velos',
    slug: 'kingdom-velos',
    displayName: 'Kingdom of Velos',
    description:
      'Sovereign ruling body over the Velos territory, responsible for governance, law, and territorial authority across the region.',
    alignmentId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 10,
  },
  {
    id: 'fac_velos_civic_council',
    name: 'velos_civic_council',
    slug: 'velos-civic-council',
    displayName: 'Velos Civic Council',
    description:
      'Administrative governing council responsible for municipal management, infrastructure, and civic policy within Velos Prime.',
    alignmentId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 20,
  },
  {
    id: 'fac_order_ninth_flame',
    name: 'order_ninth_flame',
    slug: 'order-ninth-flame',
    displayName: 'Order of the Ninth Flame',
    description:
      'Religious order maintaining the Shrine of the Ninth Flame, devoted to ritual practice, preservation of sacred tradition, and spiritual duty.',
    alignmentId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 30,
  },
  {
    id: 'fac_velos_guard',
    name: 'velos_guard',
    slug: 'velos-guard',
    displayName: 'Velos Guard',
    description:
      'Official military and peacekeeping force tasked with defense of the city, enforcement of law, and maintenance of order.',
    alignmentId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 40,
  },
  {
    id: 'fac_harbor_trade_consortium',
    name: 'harbor_trade_consortium',
    slug: 'harbor-trade-consortium',
    displayName: 'Harbor Trade Consortium',
    description:
      'Coalition of merchants and shipping interests controlling trade flow, port logistics, and economic exchange within the harbor district.',
    alignmentId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 50,
  },
  {
    id: 'fac_gilded_hand',
    name: 'gilded_hand',
    slug: 'gilded-hand',
    displayName: 'The Gilded Hand',
    description:
      'Covert criminal syndicate operating through smuggling, black-market trade, and influence networks embedded within Velos Prime.',
    alignmentId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 60,
  },
  {
    id: 'fac_wandering_hearth_tribes',
    name: 'wandering_hearth_tribes',
    slug: 'wandering-hearth-tribes',
    displayName: 'Wandering Hearth Tribes',
    description:
      'Loose confederation of nomadic clans maintaining ancestral traditions, migratory patterns, and communal identity beyond settled borders.',
    alignmentId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 70,
  },
];

export const factionTagsSeed = [
  {
    factionId: 'fac_kingdom_velos',
    tagId: 'ref_faction_tag_political',
  },
  {
    factionId: 'fac_kingdom_velos',
    tagId: 'ref_faction_tag_civic',
  },
  {
    factionId: 'fac_kingdom_velos',
    tagId: 'ref_faction_tag_guardian',
  },
  {
    factionId: 'fac_velos_civic_council',
    tagId: 'ref_faction_tag_civic',
  },
  {
    factionId: 'fac_velos_civic_council',
    tagId: 'ref_faction_tag_political',
  },
  {
    factionId: 'fac_velos_civic_council',
    tagId: 'ref_faction_tag_cultural',
  },
  {
    factionId: 'fac_order_ninth_flame',
    tagId: 'ref_faction_tag_religious',
  },
  {
    factionId: 'fac_order_ninth_flame',
    tagId: 'ref_faction_tag_guardian',
  },
  {
    factionId: 'fac_order_ninth_flame',
    tagId: 'ref_faction_tag_cultural',
  },
  {
    factionId: 'fac_velos_guard',
    tagId: 'ref_faction_tag_military',
  },
  {
    factionId: 'fac_velos_guard',
    tagId: 'ref_faction_tag_civic',
  },
  {
    factionId: 'fac_velos_guard',
    tagId: 'ref_faction_tag_guardian',
  },
  {
    factionId: 'fac_harbor_trade_consortium',
    tagId: 'ref_faction_tag_mercantile',
  },
  {
    factionId: 'fac_harbor_trade_consortium',
    tagId: 'ref_faction_tag_maritime',
  },
  {
    factionId: 'fac_harbor_trade_consortium',
    tagId: 'ref_faction_tag_civic',
  },
  {
    factionId: 'fac_gilded_hand',
    tagId: 'ref_faction_tag_criminal',
  },
  {
    factionId: 'fac_gilded_hand',
    tagId: 'ref_faction_tag_secretive',
  },
  {
    factionId: 'fac_gilded_hand',
    tagId: 'ref_faction_tag_mercantile',
  },
  {
    factionId: 'fac_wandering_hearth_tribes',
    tagId: 'ref_faction_tag_tribal',
  },
  {
    factionId: 'fac_wandering_hearth_tribes',
    tagId: 'ref_faction_tag_nomadic',
  },
  {
    factionId: 'fac_wandering_hearth_tribes',
    tagId: 'ref_faction_tag_cultural',
  },
];