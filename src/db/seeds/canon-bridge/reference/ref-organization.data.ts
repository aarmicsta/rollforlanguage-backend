/**
 * =========================================================
 * RFL SEED DATA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Reference Tables — Social Entities
 *
 * Purpose:
 * Defines canonical seed data for organization-related
 * reference tables.
 *
 * Notes:
 * - These objects use application-side property names
 *   (displayName, sortOrder, etc.) rather than raw SQL names.
 * - Canonical IDs are included where needed for stable
 *   cross-table reference integrity.
 * - Timestamps are handled by the schema defaults / seed runner.
 * - Reference tables define controlled vocabularies used
 *   throughout the Canon Bridge and Portal layers.
 *
 * =========================================================
 */

export const organizationTagsSeed = [
  {
    id: 'ref_org_tag_civic',
    name: 'civic',
    slug: 'civic',
    displayName: 'Civic',
    description:
      'Organizations focused on public service, administration, infrastructure, or municipal function.',
    isActive: true,
    sortOrder: 10,
  },
  {
    id: 'ref_org_tag_mercantile',
    name: 'mercantile',
    slug: 'mercantile',
    displayName: 'Mercantile',
    description:
      'Organizations engaged in trade, commerce, logistics, finance, or market operations.',
    isActive: true,
    sortOrder: 20,
  },
  {
    id: 'ref_org_tag_religious',
    name: 'religious',
    slug: 'religious',
    displayName: 'Religious',
    description:
      'Organizations devoted to worship, ritual, doctrine, or maintenance of sacred spaces and practices.',
    isActive: true,
    sortOrder: 30,
  },
  {
    id: 'ref_org_tag_scholarly',
    name: 'scholarly',
    slug: 'scholarly',
    displayName: 'Scholarly',
    description:
      'Organizations dedicated to study, research, preservation of knowledge, or education.',
    isActive: true,
    sortOrder: 40,
  },
  {
    id: 'ref_org_tag_arcane',
    name: 'arcane',
    slug: 'arcane',
    displayName: 'Arcane',
    description:
      'Organizations centered on magical study, magical services, regulation of magic, or arcane practice.',
    isActive: true,
    sortOrder: 50,
  },
  {
    id: 'ref_org_tag_militant',
    name: 'militant',
    slug: 'militant',
    displayName: 'Militant',
    description:
      'Organizations structured around combat, enforcement, security, or martial discipline at an operational level.',
    isActive: true,
    sortOrder: 60,
  },
  {
    id: 'ref_org_tag_criminal',
    name: 'criminal',
    slug: 'criminal',
    displayName: 'Criminal',
    description:
      'Organizations engaged in illicit operations such as smuggling, theft, extortion, or underground trade.',
    isActive: true,
    sortOrder: 70,
  },
  {
    id: 'ref_org_tag_secretive',
    name: 'secretive',
    slug: 'secretive',
    displayName: 'Secretive',
    description:
      'Organizations that obscure membership, purpose, or internal structure, often operating covertly.',
    isActive: true,
    sortOrder: 80,
  },
  {
    id: 'ref_org_tag_charitable',
    name: 'charitable',
    slug: 'charitable',
    displayName: 'Charitable',
    description:
      'Organizations dedicated to aid, relief, welfare, or support of populations or individuals.',
    isActive: true,
    sortOrder: 90,
  },
  {
    id: 'ref_org_tag_judicial',
    name: 'judicial',
    slug: 'judicial',
    displayName: 'Judicial',
    description:
      'Organizations responsible for legal adjudication, arbitration, or interpretation and enforcement of law.',
    isActive: true,
    sortOrder: 100,
  },
  {
    id: 'ref_org_tag_craft',
    name: 'craft',
    slug: 'craft',
    displayName: 'Craft',
    description:
      'Organizations centered on skilled trades, artisanship, production, or material fabrication.',
    isActive: true,
    sortOrder: 110,
  },
  {
    id: 'ref_org_tag_logistical',
    name: 'logistical',
    slug: 'logistical',
    displayName: 'Logistical',
    description:
      'Organizations focused on transport, coordination, supply chains, or operational movement of goods or people.',
    isActive: true,
    sortOrder: 120,
  },
  {
    id: 'ref_org_tag_maritime',
    name: 'maritime',
    slug: 'maritime',
    displayName: 'Maritime',
    description:
      'Organizations whose operations are tied to seafaring, shipping, ports, or naval activity.',
    isActive: true,
    sortOrder: 130,
  },
];