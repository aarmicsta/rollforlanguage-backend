CREATE TABLE `ref_faction_tags` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ref_faction_tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `ref_faction_tags_name_unique` UNIQUE(`name`),
	CONSTRAINT `ref_faction_tags_slug_unique` UNIQUE(`slug`)
);
