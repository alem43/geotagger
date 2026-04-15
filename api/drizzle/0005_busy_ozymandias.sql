CREATE TABLE `guesses` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`geotag_id` text NOT NULL,
	`guessed_lat` real NOT NULL,
	`guessed_lng` real NOT NULL,
	`distance_meters` integer NOT NULL,
	`created_at` integer NOT NULL
);
