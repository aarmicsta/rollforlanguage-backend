CREATE TABLE `playable_class_passives` (
	`class_id` varchar(36) NOT NULL,
	`passive_id` varchar(36) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `playable_class_passives_class_id_passive_id_pk` PRIMARY KEY(`class_id`,`passive_id`)
);
--> statement-breakpoint
CREATE TABLE `playable_class_tags` (
	`class_id` varchar(36) NOT NULL,
	`tag_id` varchar(36) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `playable_class_tags_class_id_tag_id_pk` PRIMARY KEY(`class_id`,`tag_id`)
);
--> statement-breakpoint
CREATE TABLE `playable_classes` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`base_health` int NOT NULL DEFAULT 0,
	`base_attack` int NOT NULL DEFAULT 0,
	`base_defense` int NOT NULL DEFAULT 0,
	`base_speed` int NOT NULL DEFAULT 0,
	`base_intelligence` int NOT NULL DEFAULT 0,
	`base_charisma` int NOT NULL DEFAULT 0,
	`starting_weapon_item_id` varchar(36),
	`icon_media_asset_id` varchar(36),
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `playable_classes_id` PRIMARY KEY(`id`),
	CONSTRAINT `playable_classes_name_unique` UNIQUE(`name`),
	CONSTRAINT `playable_classes_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `playable_passives` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`effect_text` text,
	`effect_type` varchar(100),
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `playable_passives_id` PRIMARY KEY(`id`),
	CONSTRAINT `playable_passives_name_unique` UNIQUE(`name`),
	CONSTRAINT `playable_passives_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `playable_species` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`base_health` int NOT NULL DEFAULT 0,
	`base_attack` int NOT NULL DEFAULT 0,
	`base_defense` int NOT NULL DEFAULT 0,
	`base_speed` int NOT NULL DEFAULT 0,
	`base_intelligence` int NOT NULL DEFAULT 0,
	`base_charisma` int NOT NULL DEFAULT 0,
	`icon_media_asset_id` varchar(36),
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `playable_species_id` PRIMARY KEY(`id`),
	CONSTRAINT `playable_species_name_unique` UNIQUE(`name`),
	CONSTRAINT `playable_species_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `playable_species_passives` (
	`species_id` varchar(36) NOT NULL,
	`passive_id` varchar(36) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `playable_species_passives_species_id_passive_id_pk` PRIMARY KEY(`species_id`,`passive_id`)
);
--> statement-breakpoint
CREATE TABLE `playable_species_tags` (
	`species_id` varchar(36) NOT NULL,
	`tag_id` varchar(36) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `playable_species_tags_species_id_tag_id_pk` PRIMARY KEY(`species_id`,`tag_id`)
);
--> statement-breakpoint
CREATE TABLE `playable_tags` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`tag_category` varchar(100),
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `playable_tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `playable_tags_name_unique` UNIQUE(`name`),
	CONSTRAINT `playable_tags_slug_unique` UNIQUE(`slug`)
);
