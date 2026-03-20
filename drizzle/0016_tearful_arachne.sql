CREATE TABLE `faction_tags` (
	`faction_id` varchar(36) NOT NULL,
	`tag_id` varchar(36) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `faction_tags_pk` PRIMARY KEY(`faction_id`,`tag_id`)
);
--> statement-breakpoint
CREATE TABLE `factions` (
	`id` varchar(36) NOT NULL,
	`name` varchar(150) NOT NULL,
	`slug` varchar(150) NOT NULL,
	`display_name` varchar(150) NOT NULL,
	`description` text,
	`alignment_id` varchar(36),
	`icon_media_asset_id` varchar(36),
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `factions_id` PRIMARY KEY(`id`),
	CONSTRAINT `factions_name_unique` UNIQUE(`name`),
	CONSTRAINT `factions_slug_unique` UNIQUE(`slug`)
);
