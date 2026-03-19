/**
 * =========================================================
 * RFL SEED DATA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: World Structure Systems
 *
 * Purpose:
 * Defines canonical seed data for world structure entities,
 * specifically the unified locations table.
 *
 * Notes:
 * - These objects use application-side property names
 *   (displayName, sortOrder, etc.) rather than raw SQL names.
 * - IDs are explicitly defined to support relationships
 *   across hierarchical and junction tables.
 * - Reference IDs (locationTypeId) correspond to entries in
 *   ref_location_types.
 * - Media asset fields are currently null and reserved for
 *   future linkage.
 *
 * =========================================================
 */

export const locationsSeed = [
  {
    id: 'loc_world_ashen',
    parentLocationId: null,
    name: 'ashen_world',
    slug: 'ashen-world',
    displayName: 'The Ashen World',
    description:
      'The known world shaped by fire, memory, and ancient forces.',
    locationTypeId: 'loc_type_world',
    locationScale: 'world',
    mapMediaAssetId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'loc_continent_ashen',
    parentLocationId: 'loc_world_ashen',
    name: 'ashen_continent',
    slug: 'ashen-continent',
    displayName: 'The Ashen Continent',
    description:
      'A vast and varied landmass marked by ancient upheaval and lingering elemental influence.',
    locationTypeId: 'loc_type_continent',
    locationScale: 'region',
    mapMediaAssetId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'loc_kingdom_velos',
    parentLocationId: 'loc_continent_ashen',
    name: 'kingdom_of_velos',
    slug: 'kingdom-of-velos',
    displayName: 'Kingdom of Velos',
    description:
      'A structured and enduring kingdom known for order, resilience, and maritime trade.',
    locationTypeId: 'loc_type_kingdom',
    locationScale: 'region',
    mapMediaAssetId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 'loc_city_velos_prime',
    parentLocationId: 'loc_kingdom_velos',
    name: 'velos_prime',
    slug: 'velos-prime',
    displayName: 'Velos Prime',
    description:
      'The capital city of Velos, a bustling center of governance, trade, and culture.',
    locationTypeId: 'loc_type_city',
    locationScale: 'large',
    mapMediaAssetId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 4,
  },
  {
    id: 'loc_district_harbor',
    parentLocationId: 'loc_city_velos_prime',
    name: 'harbor_district',
    slug: 'harbor-district',
    displayName: 'Harbor District',
    description:
      'A busy waterfront district filled with merchants, sailors, and incoming trade vessels.',
    locationTypeId: 'loc_type_district',
    locationScale: 'small',
    mapMediaAssetId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 5,
  },
  {
    id: 'loc_shrine_ninth_flame',
    parentLocationId: 'loc_district_harbor',
    name: 'shrine_of_the_ninth_flame',
    slug: 'shrine-of-the-ninth-flame',
    displayName: 'Shrine of the Ninth Flame',
    description:
      'A sacred site where an eternal flame is said to reflect the will of unseen forces.',
    locationTypeId: 'loc_type_shrine',
    locationScale: 'poi',
    mapMediaAssetId: null,
    iconMediaAssetId: null,
    isActive: true,
    sortOrder: 6,
  },
];

export const locationTagsSeed = [
  {
    locationId: 'loc_world_ashen',
    tagId: 'loc_tag_ancient',
  },
  {
    locationId: 'loc_world_ashen',
    tagId: 'loc_tag_mystical',
  },

  {
    locationId: 'loc_continent_ashen',
    tagId: 'loc_tag_ancient',
  },
  {
    locationId: 'loc_continent_ashen',
    tagId: 'loc_tag_hazardous',
  },
  {
    locationId: 'loc_continent_ashen',
    tagId: 'loc_tag_resource_rich',
  },

  {
    locationId: 'loc_kingdom_velos',
    tagId: 'loc_tag_stable',
  },
  {
    locationId: 'loc_kingdom_velos',
    tagId: 'loc_tag_trade_hub',
  },
  {
    locationId: 'loc_kingdom_velos',
    tagId: 'loc_tag_populated',
  },

  {
    locationId: 'loc_city_velos_prime',
    tagId: 'loc_tag_capital',
  },
  {
    locationId: 'loc_city_velos_prime',
    tagId: 'loc_tag_populated',
  },
  {
    locationId: 'loc_city_velos_prime',
    tagId: 'loc_tag_trade_hub',
  },
  {
    locationId: 'loc_city_velos_prime',
    tagId: 'loc_tag_fortified',
  },

  {
    locationId: 'loc_district_harbor',
    tagId: 'loc_tag_coastal',
  },
  {
    locationId: 'loc_district_harbor',
    tagId: 'loc_tag_populated',
  },
  {
    locationId: 'loc_district_harbor',
    tagId: 'loc_tag_trade_hub',
  },

  {
    locationId: 'loc_shrine_ninth_flame',
    tagId: 'loc_tag_sacred',
  },
  {
    locationId: 'loc_shrine_ninth_flame',
    tagId: 'loc_tag_mystical',
  },
  {
    locationId: 'loc_shrine_ninth_flame',
    tagId: 'loc_tag_ancient',
  },
];

export const locationConnectionsSeed = [
  {
    fromLocationId: 'loc_kingdom_velos',
    toLocationId: 'loc_city_velos_prime',
    connectionType: 'road',
    description:
      'Established overland routes connect the broader kingdom to its capital city.',
    isActive: true,
    sortOrder: 1,
  },
  {
    fromLocationId: 'loc_city_velos_prime',
    toLocationId: 'loc_kingdom_velos',
    connectionType: 'road',
    description:
      'Established overland routes connect the capital city to the surrounding kingdom.',
    isActive: true,
    sortOrder: 2,
  },
  {
    fromLocationId: 'loc_city_velos_prime',
    toLocationId: 'loc_district_harbor',
    connectionType: 'road',
    description:
      'Main urban thoroughfares connect the city center to the Harbor District.',
    isActive: true,
    sortOrder: 3,
  },
  {
    fromLocationId: 'loc_district_harbor',
    toLocationId: 'loc_city_velos_prime',
    connectionType: 'road',
    description:
      'Main urban thoroughfares connect the Harbor District to the wider city.',
    isActive: true,
    sortOrder: 4,
  },
  {
    fromLocationId: 'loc_district_harbor',
    toLocationId: 'loc_shrine_ninth_flame',
    connectionType: 'processional_path',
    description:
      'A marked ceremonial path leads from the Harbor District to the Shrine of the Ninth Flame.',
    isActive: true,
    sortOrder: 5,
  },
  {
    fromLocationId: 'loc_shrine_ninth_flame',
    toLocationId: 'loc_district_harbor',
    connectionType: 'processional_path',
    description:
      'A marked ceremonial path leads from the shrine back toward the Harbor District.',
    isActive: true,
    sortOrder: 6,
  },
  {
    fromLocationId: 'loc_kingdom_velos',
    toLocationId: 'loc_district_harbor',
    connectionType: 'sea_route',
    description:
      'Maritime traffic into the kingdom commonly enters through the Harbor District.',
    isActive: true,
    sortOrder: 7,
  },
  {
    fromLocationId: 'loc_district_harbor',
    toLocationId: 'loc_kingdom_velos',
    connectionType: 'sea_route',
    description:
      'Maritime traffic from the Harbor District extends outward across the kingdom’s coastal networks.',
    isActive: true,
    sortOrder: 8,
  },
];