CREATE TABLE `ref_alignments` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`alignment_axis` varchar(100),
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ref_alignments_id` PRIMARY KEY(`id`),
	CONSTRAINT `ref_alignments_name_unique` UNIQUE(`name`),
	CONSTRAINT `ref_alignments_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `ref_damage_types` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ref_damage_types_id` PRIMARY KEY(`id`),
	CONSTRAINT `ref_damage_types_name_unique` UNIQUE(`name`),
	CONSTRAINT `ref_damage_types_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `ref_playable_stats` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ref_playable_stats_id` PRIMARY KEY(`id`),
	CONSTRAINT `ref_playable_stats_name_unique` UNIQUE(`name`),
	CONSTRAINT `ref_playable_stats_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `ref_status_effects` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`effect_type` varchar(100),
	`icon_media_asset_id` varchar(36),
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ref_status_effects_id` PRIMARY KEY(`id`),
	CONSTRAINT `ref_status_effects_name_unique` UNIQUE(`name`),
	CONSTRAINT `ref_status_effects_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `ref_creature_types` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ref_creature_types_id` PRIMARY KEY(`id`),
	CONSTRAINT `ref_creature_types_name_unique` UNIQUE(`name`),
	CONSTRAINT `ref_creature_types_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `ref_intelligence_categories` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`intelligence_rank` int,
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ref_intelligence_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `ref_intelligence_categories_name_unique` UNIQUE(`name`),
	CONSTRAINT `ref_intelligence_categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `ref_movement_types` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`movement_category` varchar(100),
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ref_movement_types_id` PRIMARY KEY(`id`),
	CONSTRAINT `ref_movement_types_name_unique` UNIQUE(`name`),
	CONSTRAINT `ref_movement_types_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `ref_size_categories` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`size_rank` int,
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ref_size_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `ref_size_categories_name_unique` UNIQUE(`name`),
	CONSTRAINT `ref_size_categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `ref_threat_levels` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`threat_rank` int,
	`recommended_level_min` int,
	`recommended_level_max` int,
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ref_threat_levels_id` PRIMARY KEY(`id`),
	CONSTRAINT `ref_threat_levels_name_unique` UNIQUE(`name`),
	CONSTRAINT `ref_threat_levels_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `ref_equipment_slots` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`slot_category` varchar(100),
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ref_equipment_slots_id` PRIMARY KEY(`id`),
	CONSTRAINT `ref_equipment_slots_name_unique` UNIQUE(`name`),
	CONSTRAINT `ref_equipment_slots_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `ref_item_types` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`item_category` varchar(100),
	`is_equippable` boolean DEFAULT false,
	`is_consumable` boolean DEFAULT false,
	`is_crafting_material` boolean DEFAULT false,
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ref_item_types_id` PRIMARY KEY(`id`),
	CONSTRAINT `ref_item_types_name_unique` UNIQUE(`name`),
	CONSTRAINT `ref_item_types_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `ref_rarity_levels` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`rarity_rank` int,
	`color_hex` varchar(7),
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ref_rarity_levels_id` PRIMARY KEY(`id`),
	CONSTRAINT `ref_rarity_levels_name_unique` UNIQUE(`name`),
	CONSTRAINT `ref_rarity_levels_slug_unique` UNIQUE(`slug`)
);
