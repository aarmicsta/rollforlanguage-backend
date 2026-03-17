CREATE TABLE `playable_stat_baselines` (
	`stat_id` varchar(36) NOT NULL,
	`base_value` int NOT NULL DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `playable_stat_baselines_stat_id` PRIMARY KEY(`stat_id`)
);
