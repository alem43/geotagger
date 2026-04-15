import {guesses, geotags} from "../db/schema.js";
import {eq, asc} from "drizzle-orm";
import {db} from "../db/db.js";
import {requireAuth} from "../middleware/requireAuth.js";

import {Hono} from "hono";

export const guessesRoute = new Hono();

function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const R = 6371000;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

guessesRoute.post("/", requireAuth, async (c) => {
  const {geotagId, lat, lng} = await c.req.json();
  const user = c.get("user");

  const latitude = Number(lat);
  const longitude = Number(lng);

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    return c.json({error: "Invalid coordinates"}, 400);
  }

  if (!geotagId || lat == null || lng == null) {
    return c.json({error: "Missing data"}, 400);
  }

  const geotag = await db
    .select()
    .from(geotags)
    .where(eq(geotags.id, geotagId))
    .then((res) => res[0]);

  if (!geotag) {
    return c.json({error: "Geotag not found"}, 404);
  }

  const distanceMeters = calculateDistanceMeters(
    latitude,
    longitude,
    geotag.lat,
    geotag.lng,
  );

  const id = crypto.randomUUID();

  await db.insert(guesses).values({
    id,
    userId: user.id,
    geotagId,
    guessedLat: lat,
    guessedLng: lng,
    distanceMeters,
    createdAt: Date.now(),
  });

  return c.json({distanceMeters});
});

guessesRoute.get("/top3", requireAuth, async (c) => {
  const user = c.get("user");

  const topGuesses = await db
    .select()
    .from(guesses)
    .where(eq(guesses.userId, user.id))
    .orderBy(asc(guesses.distanceMeters))
    .limit(3);

  return c.json(topGuesses);
});

export default guessesRoute;
