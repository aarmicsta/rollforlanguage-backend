/**
 * =========================================================
 * RFL DATABASE SCHEMA
 * =========================================================
 *
 * Domain: Localization and Translation
 * Layer: Canon Bridge
 *
 * Purpose:
 * Provides the infrastructure for multi-language support
 * across the RFL platform. These tables store UI labels,
 * content keys, and translated text values for supported
 * languages.
 *
 * Tables Defined Here:
 * - languages
 * - ui_label_catalog
 * - content_translations
 *
 * Relationships:
 * languages → content_translations
 * ui_label_catalog → content_translations
 *
 * Notes:
 * These tables define canonical language resources used
 * throughout the application. They should only store text
 * identifiers and translations, not gameplay or runtime
 * data.
 *
 * Localization keys should be stable identifiers used by
 * the frontend and backend to retrieve translated text.
 *
 * =========================================================
 */

import {
  mysqlTable,
  varchar,
  text,
  boolean,
  timestamp,
} from 'drizzle-orm/mysql-core';

// Translations table (dynamic translations)
export const translations = mysqlTable('translations', {
  id: varchar('id', { length: 36 }).primaryKey(),
  key: varchar('key', { length: 255 }).notNull(),  // e.g., button.start, quest.title
  language: varchar('language', { length: 10 }).notNull(),  // e.g., en, de, fr
  text: text('text').notNull(),
  context: varchar('context', { length: 50 }),  // ui, lesson, quest, achievement, other
  linkedId: varchar('linked_id', { length: 36 }),
  submittedBy: varchar('submitted_by', { length: 36 }),
  isApproved: boolean('is_approved').default(false),
  approvedBy: varchar('approved_by', { length: 36 }),
  approvedAt: timestamp('approved_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// UI Labels table (default fallback text)
export const uiLabels = mysqlTable('ui_labels', {
  id: varchar('id', { length: 36 }).primaryKey(),
  labelKey: varchar('label_key', { length: 255 }).notNull().unique(),  // e.g., button.start
  defaultText: text('default_text').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
