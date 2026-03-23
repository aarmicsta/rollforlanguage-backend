CREATE TABLE `creature_stat_values` (
	`creature_id` varchar(36) NOT NULL,
	`stat_id` varchar(36) NOT NULL,
	`stat_value` int NOT NULL,
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `creature_stat_value_pk` PRIMARY KEY(`creature_id`,`stat_id`)
);
--> statement-breakpoint
CREATE TABLE `creature_tags` (
	`creature_id` varchar(36) NOT NULL,
	`tag_id` varchar(36) NOT NULL,
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `creature_tag_pk` PRIMARY KEY(`creature_id`,`tag_id`)
);
--> statement-breakpoint
CREATE TABLE `creatures` (
	`id` varchar(36) NOT NULL,
	`name` varchar(150) NOT NULL,
	`slug` varchar(150) NOT NULL,
	`display_name` varchar(150) NOT NULL,
	`description` text,
	`creature_type_id` varchar(36) NOT NULL,
	`size_category_id` varchar(36) NOT NULL,
	`intelligence_category_id` varchar(36),
	`threat_level_id` varchar(36),
	`icon_media_asset_id` varchar(36),
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `creatures_id` PRIMARY KEY(`id`),
	CONSTRAINT `creatures_name_unique` UNIQUE(`name`),
	CONSTRAINT `creatures_slug_unique` UNIQUE(`slug`)
);
