// src/utils/permissions.ts

/**
 * Role-based permission definitions and utilities.
 *
 * Responsibilities:
 * - define permission sets for each role
 * - provide helper to check role permissions
 *
 * Notes:
 * - roles without a defined permission set are treated as invalid
 * - `superadmin` includes a catch-all override pattern
 */

export const rolePermissions: Record<string, string[]> = {
  superadmin: [
    'manage_users',
    'manage_campaigns',
    'view_reports',
    'system_settings',
    'full_access', // catch-all for internal overrides
  ],
  admin: [
    'manage_users',
    'manage_campaigns',
    'view_reports',
  ],
  teacher: [
    'manage_campaigns',
    'view_reports',
    'create_student',
  ],
  student: [
    'submit_progress',
  ],
}

/**
 * Checks whether a role grants a specific permission.
 */
export function checkPermission(role: string, permission: string): boolean {
  const permissions = rolePermissions[role]

  if (!permissions) {
    console.warn(`Unknown role '${role}' passed to checkPermission`)
    return false
  }

  return permissions.includes(permission)
}