/**
 * =========================================================
 * RFL DATABASE SCHEMA
 * =========================================================
 *
 * Domain: Media and Audio Submissions
 * Layer: Canon Bridge / Portal
 *
 * Purpose:
 * Stores media assets used in the portal and student audio
 * submissions associated with lessons.
 *
 * Tables Defined Here:
 * Canon Bridge:
 * - media_assets
 *
 * Portal:
 * - lesson_audio_submissions
 * - audio_submission_feedback
 *
 * Notes:
 * Media assets define reusable resources while audio
 * submissions track student activity.
 *
 * =========================================================
 */

import {
  mysqlTable,
  varchar,
  text,
  int,
  boolean,
  timestamp,
} from 'drizzle-orm/mysql-core';

// Audio Uploads table (student submissions)
export const audioUploads = mysqlTable('audio_uploads', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  lessonId: varchar('lesson_id', { length: 36 }).notNull(),
  audioUrl: varchar('audio_url', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).default('pending'),  // pending, reviewed, scored
  submittedAt: timestamp('submitted_at').defaultNow(),
});

// Audio Feedback table (teacher or AI feedback)
export const audioFeedback = mysqlTable('audio_feedback', {
  id: varchar('id', { length: 36 }).primaryKey(),
  audioUploadId: varchar('audio_upload_id', { length: 36 }).notNull(),
  reviewerId: varchar('reviewer_id', { length: 36 }),
  comments: text('comments'),
  score: int('score'),
  reviewedAt: timestamp('reviewed_at').defaultNow(),
});

// Media Assets table (general images, audio, video)
export const mediaAssets = mysqlTable('media_assets', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),  // image, audio, video, other
  url: varchar('url', { length: 255 }).notNull(),
  linkedTo: varchar('linked_to', { length: 50 }),  // lesson, quest, achievement, general
  linkedId: varchar('linked_id', { length: 36 }),
  uploadedBy: varchar('uploaded_by', { length: 36 }),
  uploadedAt: timestamp('uploaded_at').defaultNow(),
});
