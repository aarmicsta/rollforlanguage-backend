CREATE TABLE `ref_location_tags` (
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
	CONSTRAINT `ref_location_tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `ref_location_tags_name_unique` UNIQUE(`name`),
	CONSTRAINT `ref_location_tags_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `ref_location_types` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`parent_location_type_id` varchar(36),
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ref_location_types_id` PRIMARY KEY(`id`),
	CONSTRAINT `ref_location_types_name_unique` UNIQUE(`name`),
	CONSTRAINT `ref_location_types_slug_unique` UNIQUE(`slug`)
);
