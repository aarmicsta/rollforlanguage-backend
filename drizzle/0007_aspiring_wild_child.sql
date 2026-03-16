CREATE TABLE `user_settings` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`preferred_language` varchar(100),
	`theme` varchar(50),
	`timezone` varchar(100),
	`notifications_enabled` boolean DEFAULT true,
	`sound_enabled` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `auth_providers`;--> statement-breakpoint
ALTER TABLE `login_sessions` RENAME COLUMN `jwt_token` TO `session_token`;--> statement-breakpoint
ALTER TABLE `login_sessions` ADD `ip_address` varchar(45);--> statement-breakpoint
ALTER TABLE `login_sessions` ADD `user_agent` text;--> statement-breakpoint
ALTER TABLE `login_sessions` ADD `last_active_at` timestamp;--> statement-breakpoint
ALTER TABLE `login_sessions` ADD `is_revoked` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `login_sessions` ADD `updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;