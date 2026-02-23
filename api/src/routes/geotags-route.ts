import {Hono} from "hono";
import {db} from "../db/db.js";
import {geotags} from "../db/schema.js";
import {eq} from "drizzle-orm";
import {requireAuth} from "../middleware/requireAuth.js";

const geotagsRoute = new Hono();

geotagsRoute.post("/", requireAuth, async (c) => {
  const {imageUrl, lat, lng} = await c.req.json();
  if (!imageUrl || lat == null || lng == null)
    return c.text("Invalid location", 400);

  const user = c.get("user");

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
});

export default geotagsRoute;
