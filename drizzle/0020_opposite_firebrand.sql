CREATE TABLE `item_equipment_slots` (
	`item_id` varchar(36) NOT NULL,
	`equipment_slot_id` varchar(36) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `item_equipment_slots_pk` PRIMARY KEY(`item_id`,`equipment_slot_id`)
);
--> statement-breakpoint
CREATE TABLE `items` (
	`id` varchar(36) NOT NULL,
	`name` varchar(150) NOT NULL,
	`slug` varchar(150) NOT NULL,
	`display_name` varchar(150) NOT NULL,
	`description` text,
	`item_type_id` varchar(36) NOT NULL,
	`rarity_level_id` varchar(36) NOT NULL,
	`base_value` int DEFAULT 0,
	`weight` decimal(10,2) DEFAULT '0.00',
	`max_stack_size` int DEFAULT 1,
	`icon_media_asset_id` varchar(36),
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `items_id` PRIMARY KEY(`id`),
	CONSTRAINT `items_name_unique` UNIQUE(`name`),
	CONSTRAINT `items_slug_unique` UNIQUE(`slug`)
);
