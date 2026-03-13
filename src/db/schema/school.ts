/**
 * =========================================================
 * RFL DATABASE SCHEMA
 * =========================================================
 *
 * Domain: School / Classroom Management
 * Layer: Portal
 *
 * Purpose:
 * Tables representing real-world school classes using the
 * Roll For Language portal. These structures manage teacher
 * ownership of classes and student enrollment.
 *
 * IMPORTANT:
 * These tables represent real-world classroom groupings and
 * are completely separate from RPG playable classes.
 *
 * Tables Defined Here:
 * - school_classes
 * - school_class_enrollments
 *
 * Relationships:
 * users → school_classes (teacher_user_id)
 * users → school_class_enrollments (student_user_id)
 *
 * Notes:
 * This domain integrates the educational platform layer
 * with the RPG portal. It should not contain gameplay data.
 *
 * =========================================================
 */


import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  int,
  boolean,
} from 'drizzle-orm/mysql-core';

// 1. Teacher Profiles table (extra info for teacher users)
export const teacherProfiles = mysqlTable('teacher_profiles', {
  userId: varchar('user_id', { length: 36 }).primaryKey(),
  schoolName: varchar('school_name', { length: 255 }),
  department: varchar('department', { length: 100 }),
  bio: text('bio'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// 2. Classes table
export const classes = mysqlTable('classes', {
  id: varchar('id', { length: 36 }).primaryKey(),
  teacherId: varchar('teacher_id', { length: 36 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  joinCode: varchar('join_code', { length: 20 }).notNull().unique(),
  maxStudents: int('max_students'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// 3. Class Enrollments table
export const classEnrollments = mysqlTable('class_enrollments', {
  id: varchar('id', { length: 36 }).primaryKey(),
  classId: varchar('class_id', { length: 36 }).notNull(),
  studentId: varchar('student_id', { length: 36 }).notNull(),
  status: varchar('status', { length: 20 }).default('active'), // active, removed, banned
  joinedAt: timestamp('joined_at').defaultNow(),
});
