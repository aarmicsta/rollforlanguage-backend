CREATE TABLE `playable_class_stat_modifiers` (
	`class_id` varchar(36) NOT NULL,
	`stat_id` varchar(36) NOT NULL,
	`modifier_value` int NOT NULL DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `playable_class_stat_modifiers_class_id_stat_id_pk` PRIMARY KEY(`class_id`,`stat_id`)
);
--> statement-breakpoint
CREATE TABLE `playable_species_stat_modifiers` (
	`species_id` varchar(36) NOT NULL,
	`stat_id` varchar(36) NOT NULL,
	`modifier_value` int NOT NULL DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `playable_species_stat_modifiers_species_id_stat_id_pk` PRIMARY KEY(`species_id`,`stat_id`)
);
