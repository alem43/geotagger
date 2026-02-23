import {Hono} from "hono";
import {db} from "../db/db.js";
import {users, sessions} from "../db/schema.js";
import {eq} from "drizzle-orm";

const meRoute = new Hono();

meRoute.get("/", async (c) => {
  const cookieReturn = c.req.header("cookie");
  if (!cookieReturn) return c.text("Unauthorized", 401);

  const cookieParts = cookieReturn.split("; ");
  const sessionPart = cookieParts.find((p) => p.startsWith("session="));
  const sessionToken = sessionPart?.split("=")[1];
  if (!sessionToken) return c.text("Unauthorized", 401);

  const sessionRows = await db
    .select()
    .from(sessions)
    .where(eq(sessions.token, sessionToken))
    .limit(1);
  if (sessionRows.length === 0) return c.text("Unauthorized", 401);

  const session = sessionRows[0];

  const userRows = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);
  if (userRows.length === 0) return c.text("Unauthorized", 401);

  const user = userRows[0];

  return c.text(user.email);
});

export default meRoute;
