/**
 * =========================================================
 * RFL DATABASE SCHEMA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: Social Entities — Organizations
 * Layer: Canon Bridge (Core)
 *
 * Purpose:
 * Defines canonical organization entities and their
 * tag relationships.
 *
 * Organizations represent structured groups operating
 * within or across factions (guilds, orders, syndicates,
 * institutions, etc.).
 *
 * =========================================================
 */

import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  boolean,
  int,
  primaryKey,
} from 'drizzle-orm/mysql-core';

/**
 * ---------------------------------------------------------
 * organizations
 * ---------------------------------------------------------
 *
 * Canonical list of organizations.
 *
 * Example entries might include:
 * - Brotherhood of Justicars
 * - Merchants' Guild of Caasrahdah
 * - Holy Order of the Divine Multi-Faced God
 * - The Syndicate
 *
 * These are structured groups that exist within the world
 * and may operate within, across, or independently of
 * factions.
 */
export const organizations = mysqlTable('organizations', {
  id: varchar('id', { length: 36 }).primaryKey(),

  // Internal canonical name (stable identifier)
  name: varchar('name', { length: 100 }).notNull().unique(),

  // URL-safe identifier
  slug: varchar('slug', { length: 100 }).notNull().unique(),

  // Human-readable display name
  displayName: varchar('display_name', { length: 150 }).notNull(),

  // Optional descriptive text
  description: text('description'),

  // Alignment classification (optional)
  alignmentId: varchar('alignment_id', { length: 36 }),

  // Optional icon reference (future media system)
  iconMediaAssetId: varchar('icon_media_asset_id', { length: 36 }),

  isActive: boolean('is_active').default(true),
  sortOrder: int('sort_order').default(0),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

/**
 * ---------------------------------------------------------
 * organization_tags
 * ---------------------------------------------------------
 *
 * Junction table linking organizations to reference tags.
 *
 * Allows flexible multi-dimensional classification of
 * organizations.
 */
export const organizationTags = mysqlTable(
  'organization_tags',
  {
    organizationId: varchar('organization_id', { length: 36 }).notNull(),
    tagId: varchar('tag_id', { length: 36 }).notNull(),

    isActive: boolean('is_active').default(true),
    sortOrder: int('sort_order').default(0),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
  },
  (table) => ({
    pk: primaryKey({
      name: 'org_tag_pk',
      columns: [table.organizationId, table.tagId],
    }),
  })
);