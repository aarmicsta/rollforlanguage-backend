/**
 * =========================================================
 * RFL SEED DATA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Reference Tables — Social Entities
 *
 * Purpose:
 * Defines canonical seed data for faction-related
 * reference tables.
 *
 * Notes:
 * - These objects use application-side property names
 *   (displayName, sortOrder, etc.) rather than raw SQL names.
 * - IDs and timestamps are intentionally omitted and handled
 *   by the schema defaults / seed runner.
 * - Reference tables define controlled vocabularies used
 *   throughout the Canon Bridge and Portal layers.
 *
 * =========================================================
 */

export const factionTagsSeed = [
  {
    name: 'political',
    slug: 'political',
    displayName: 'Political',
    description:
      'Factions primarily concerned with governance, rulership, diplomacy, law, or civic power.',
    isActive: true,
    sortOrder: 10,
  },
  {
    name: 'military',
    slug: 'military',
    displayName: 'Military',
    description:
      'Factions organized around warfare, defense, armed service, martial command, or strategic force projection.',
    isActive: true,
    sortOrder: 20,
  },
  {
    name: 'religious',
    slug: 'religious',
    displayName: 'Religious',
    description:
      'Factions centered on worship, doctrine, sacred duty, priesthood, or divine service.',
    isActive: true,
    sortOrder: 30,
  },
  {
    name: 'cultural',
    slug: 'cultural',
    displayName: 'Cultural',
    description:
      'Factions defined by shared heritage, tradition, identity, artistic continuity, or collective custom.',
    isActive: true,
    sortOrder: 40,
  },
  {
    name: 'mercantile',
    slug: 'mercantile',
    displayName: 'Mercantile',
    description:
      'Factions oriented around trade, commerce, markets, finance, or economic exchange.',
    isActive: true,
    sortOrder: 50,
  },
  {
    name: 'scholarly',
    slug: 'scholarly',
    displayName: 'Scholarly',
    description:
      'Factions dedicated to learning, preservation of knowledge, research, education, or intellectual inquiry.',
    isActive: true,
    sortOrder: 60,
  },
  {
    name: 'arcane',
    slug: 'arcane',
    displayName: 'Arcane',
    description:
      'Factions associated with magic, magical study, magical regulation, or arcane practice.',
    isActive: true,
    sortOrder: 70,
  },
  {
    name: 'criminal',
    slug: 'criminal',
    displayName: 'Criminal',
    description:
      'Factions engaged in illicit activity, organized crime, smuggling, extortion, or unlawful enterprise.',
    isActive: true,
    sortOrder: 80,
  },
  {
    name: 'maritime',
    slug: 'maritime',
    displayName: 'Maritime',
    description:
      'Factions whose identity or operations are strongly tied to the sea, shipping, ports, naval travel, or coastal power.',
    isActive: true,
    sortOrder: 90,
  },
  {
    name: 'nomadic',
    slug: 'nomadic',
    displayName: 'Nomadic',
    description:
      'Factions characterized by mobility, migration, itinerant patterns, or non-settled territorial identity.',
    isActive: true,
    sortOrder: 100,
  },
  {
    name: 'tribal',
    slug: 'tribal',
    displayName: 'Tribal',
    description:
      'Factions organized through kinship, clan structures, ancestral bonds, or longstanding communal lineage systems.',
    isActive: true,
    sortOrder: 110,
  },
  {
    name: 'civic',
    slug: 'civic',
    displayName: 'Civic',
    description:
      'Factions focused on public administration, municipal order, infrastructure, or organized civil stewardship.',
    isActive: true,
    sortOrder: 120,
  },
  {
    name: 'secretive',
    slug: 'secretive',
    displayName: 'Secretive',
    description:
      'Factions that deliberately obscure membership, motives, operations, or internal structure.',
    isActive: true,
    sortOrder: 130,
  },
  {
    name: 'revolutionary',
    slug: 'revolutionary',
    displayName: 'Revolutionary',
    description:
      'Factions seeking major systemic change, upheaval, reform through disruption, or overthrow of existing power.',
    isActive: true,
    sortOrder: 140,
  },
  {
    name: 'guardian',
    slug: 'guardian',
    displayName: 'Guardian',
    description:
      'Factions devoted to protection of a place, people, tradition, relic, border, or sacred charge.',
    isActive: true,
    sortOrder: 150,
  },
];