import {Hono} from "hono";
import {db} from "../db/db.js";
import {geotags} from "../db/schema.js";
import {eq, desc} from "drizzle-orm";
import {requireAuth} from "../middleware/requireAuth.js";
import crypto from "node:crypto";

const geotagsRoute = new Hono();

geotagsRoute.get("/preview", async (c) => {
  const lat = c.req.query("lat");
  const lng = c.req.query("lng");

  if (!lat || !lng) {
    return c.json({error: "Missing coordinates"}, 400);
  }

  try {
    const response = await fetch(
      `https://graph.mapillary.com/images?access_token=${process.env.MAPILLARY_TOKEN}&fields=id,thumb_1024_url,captured_at&lat=${lat}&lng=${lng}&radius=50`,
    );

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return c.json({imageUrl: null, message: "No nearby image found"}, 200);
    }

    const image = data.data.sort(
      (a: {captured_at: number}, b: {captured_at: number}) =>
        b.captured_at - a.captured_at,
    )[0];

    return c.json({imageUrl: image.thumb_1024_url});
  } catch (err) {
    console.error(err);
    return c.json({error: "Mapillary error"}, 500);
  }
});

geotagsRoute.get("/recent", requireAuth, async (c) => {
  try {
    const recentGeotags = await db
      .select()
      .from(geotags)
      .orderBy(desc(geotags.createdAt))
      .limit(27);

    return c.json(recentGeotags);
  } catch (err) {
    console.error("Error fetching recent geotags:", err);
    return c.json({error: "Failed to fetch recent geotags"}, 500);
  }
});

geotagsRoute.post("/", requireAuth, async (c) => {
  const {lat, lng} = await c.req.json();

  if (lat == null || lng == null) {
    return c.text("Invalid location", 400);
  }

  const user = c.get("user");

  try {
    const response = await fetch(
      `https://graph.mapillary.com/images?access_token=${process.env.MAPILLARY_TOKEN}&fields=id,thumb_1024_url,captured_at&lat=${lat}&lng=${lng}&radius=50`,
    );

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      console.log("No images found near these coordinates");
      return c.json(
        {
          error:
            "No street view images found within 50 meters of this location.",
        },
        404,
      );
    }

    const image = data.data.sort(
      (a: {captured_at: number}, b: {captured_at: number}) =>
        b.captured_at - a.captured_at,
    )[0];

    const imageUrl = image.thumb_1024_url;

    const id = crypto.randomUUID();
    const createdAt = Date.now();

    await db.insert(geotags).values({
      id,
      userId: user.id,
      imageUrl,
      lat,
      lng,
      createdAt,
    });
    return c.json({id, imageUrl, lat, lng, createdAt});
  } catch (err) {
    console.error(err);
    return c.text("Mapillary error", 500);
  }
});

export default geotagsRoute;
