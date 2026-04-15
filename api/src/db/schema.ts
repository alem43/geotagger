import {sqliteTable, text, integer, real} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: integer("created_at").notNull(),
  profilePictureUrl: text("profile_picture_url"),
});

export const sessions = sqliteTable("sessions", {
  token: text("token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: integer("created_at").notNull(),
});

export const geotags = sqliteTable("geotags", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  imageUrl: text("image_url").notNull(),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
  createdAt: integer("created_at").notNull(),
});

export const guesses = sqliteTable("guesses", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  geotagId: text("geotag_id").notNull(),
  guessedLat: real("guessed_lat").notNull(),
  guessedLng: real("guessed_lng").notNull(),
  distanceMeters: integer("distance_meters").notNull(),
  createdAt: integer("created_at").notNull(),
});
