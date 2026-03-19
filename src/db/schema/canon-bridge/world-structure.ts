/**
 * =========================================================
 * RFL DATABASE SCHEMA
 * =========================================================
 *
 * Domain: Canon Bridge
 * Subdomain: World Structure Systems
 * Layer: Canon Bridge
 *
 * Purpose:
 * Defines canonical world-structure entities used across
 * the RFL platform. These tables represent meaningful world
 * locations, their classification tags, and their spatial or
 * relational connections to one another.
 *
 * Why these belong in the Canon Bridge layer:
 * - They define stable canonical world entities.
 * - They are reusable by portal/runtime systems later.
 * - They preserve structured world data separate from lore
 *   text and separate from mutable player/session state.
 *
 * Tables Defined Here:
 * - locations
 * - location_tags
 * - location_connections
 *
 * Notes:
 * - Foreign key constraints are intentionally deferred for
 *   now, consistent with the current schema strategy.
 * - `parent_location_id` is self-referential in concept, but
 *   is currently stored as a plain ID field only.
 * - `location_type_id` is intended to reference
 *   `ref_location_types.id`, but no hard foreign key is added
 *   yet.
 * - `map_media_asset_id` and `icon_media_asset_id` are
 *   currently stored as plain ID fields only. No foreign key
 *   constraints are added yet.
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
 * locations
 * ---------------------------------------------------------
 *
 * Canonical list of meaningful world locations.
 *
 * This unified table represents all scales of location,
 * including regions, large locations, small locations, and
 * points of interest.
 *
 * Example entries might include:
 * - The Ashen Continent
 * - Kingdom of Velos
 * - Harbor District
 * - Shrine of the Ninth Flame
 *
 * `parent_location_id` allows hierarchical nesting of
 * locations.
 *
 * Example:
 * - region
 *   - kingdom
 *     - district
 *       - shrine
 *
 * `location_scale` defines the structural scale of the
 * location.
 *
 * Example values might include:
 * - region
 * - large
 * - small
 * - poi
 */
export const locations = mysqlTable('locations', {
  id: varchar('id', { length: 36 }).primaryKey(),

  // Optional parent location for hierarchical nesting.
  parentLocationId: varchar('parent_location_id', { length: 36 }),

  // Internal canonical name, intended to remain stable.
  name: varchar('name', { length: 100 }).notNull().unique(),

  // URL-safe / code-safe identifier.
  slug: varchar('slug', { length: 100 }).notNull().unique(),

  // Human-facing display label.
  displayName: varchar('display_name', { length: 100 }).notNull(),

  // Optional longer explanation of the location.
  description: text('description'),

  // Intended to reference ref_location_types.id.
  locationTypeId: varchar('location_type_id', { length: 36 }).notNull(),

  // Structural scale of the location within the world model.
  locationScale: varchar('location_scale', { length: 50 }).notNull(),

  // Reserved for future linkage to world/region map assets.
  mapMediaAssetId: varchar('map_media_asset_id', { length: 36 }),

  // Reserved for future linkage to icon/marker assets.
  iconMediaAssetId: varchar('icon_media_asset_id', { length: 36 }),

  // Allows locations to be soft-disabled without deleting them.
  isActive: boolean('is_active').default(true),

  // Useful for manual ordering in admin panels / UI display.
  sortOrder: int('sort_order').default(0),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

/**
 * ---------------------------------------------------------
 * location_tags
 * ---------------------------------------------------------
 *
 * Junction table linking locations to reusable world
 * structure tags.
 *
 * This allows locations to be classified using controlled
 * descriptors without embedding free-text labels directly in
 * the locations table.
 */
export const locationTags = mysqlTable(
  'location_tags',
  {
    locationId: varchar('location_id', { length: 36 }).notNull(),
    tagId: varchar('tag_id', { length: 36 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.locationId, table.tagId],
    }),
  })
);

/**
 * ---------------------------------------------------------
 * location_connections
 * ---------------------------------------------------------
 *
 * Junction-like table linking locations to other locations
 * through meaningful spatial, travel, or relational
 * connections.
 *
 * Example connections might include:
 * - road
 * - sea_route
 * - border
 * - portal
 * - tunnel
 * - mountain_pass
 *
 * This table allows the world structure to preserve
 * navigational and relational coherence without embedding
 * adjacency logic directly in the locations table.
 */
export const locationConnections = mysqlTable(
  'location_connections',
  {
    fromLocationId: varchar('from_location_id', { length: 36 }).notNull(),
    toLocationId: varchar('to_location_id', { length: 36 }).notNull(),

    // Broad descriptor for the type of connection.
    connectionType: varchar('connection_type', { length: 100 }).notNull(),

    // Optional longer explanation of the connection.
    description: text('description'),

    isActive: boolean('is_active').default(true),
    sortOrder: int('sort_order').default(0),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [
        table.fromLocationId,
        table.toLocationId,
        table.connectionType,
      ],
    }),
  })
);