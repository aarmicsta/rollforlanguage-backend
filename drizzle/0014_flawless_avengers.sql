CREATE TABLE `location_connections` (
	`from_location_id` varchar(36) NOT NULL,
	`to_location_id` varchar(36) NOT NULL,
	`connection_type` varchar(100) NOT NULL,
	`description` text,
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `loc_conn_pk` PRIMARY KEY(`from_location_id`,`to_location_id`,`connection_type`)
);
--> statement-breakpoint
CREATE TABLE `location_tags` (
	`location_id` varchar(36) NOT NULL,
	`tag_id` varchar(36) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `location_tags_location_id_tag_id_pk` PRIMARY KEY(`location_id`,`tag_id`)
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` varchar(36) NOT NULL,
	`parent_location_id` varchar(36),
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`location_type_id` varchar(36) NOT NULL,
	`location_scale` varchar(50) NOT NULL,
	`map_media_asset_id` varchar(36),
	`icon_media_asset_id` varchar(36),
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `locations_id` PRIMARY KEY(`id`),
	CONSTRAINT `locations_name_unique` UNIQUE(`name`),
	CONSTRAINT `locations_slug_unique` UNIQUE(`slug`)
);
