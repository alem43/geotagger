import {Hono} from "hono";
import bcrypt from "bcryptjs";
import {db} from "../db/db.js";
import {users, sessions} from "../db/schema.js";
import {eq} from "drizzle-orm";
import crypto from "node:crypto";

const authRoute = new Hono();

authRoute.post("/register", async (c) => {
  const {email, password, firstName, lastName} = await c.req.json();

  if (!email || !password || !firstName || !lastName)
    return c.text("Credentials not valid", 400);

  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length > 0) return c.text("User already existing!", 400);

  const passwordHash = await bcrypt.hash(password, 10);

  const userId = crypto.randomUUID();

  await db.insert(users).values({
    id: userId,
    email: email,
    firstName,
    lastName,
    passwordHash: passwordHash,
    createdAt: Date.now(),
  });

  const sessionToken = crypto.randomUUID();
  await db.insert(sessions).values({
    token: sessionToken,
    userId: userId,
    createdAt: Date.now(),
  });

  c.header(
    "Set-Cookie",
    `session=${sessionToken}; Path=/; HttpOnly; SameSite=Lax`,
  );

  return c.json({
    id: userId,
    email: email,
    firstName,
    lastName,
  });
});

authRoute.post("/login", async (c) => {
  const {email, password} = await c.req.json();

  if (!email || !password) return c.text("Email or username not valid", 400);

  const result = await db.select().from(users).where(eq(users.email, email));
  if (result.length === 0) return c.text("Invalid credeintals", 401);

  const user = result[0];

  const passwordIsValid = await bcrypt.compare(password, user.passwordHash);
  if (!passwordIsValid) return c.text("Invalid credentials", 401);

  const sessionToken = crypto.randomUUID();

  await db.insert(sessions).values({
    token: sessionToken,
    userId: user.id,
    createdAt: Date.now(),
  });

  c.header(
    "Set-Cookie",
    `session=${sessionToken}; Path=/; HttpOnly; SameSite=Lax`,
  );

  return c.text("Logged in!");
});

authRoute.post("/logout", async (c) => {
  const cookieReturn = await c.req.header("cookie");
  if (!cookieReturn) return c.text("Unauthorized", 401);

  if (cookieReturn) {
    const cookieParts = cookieReturn.split("; ");
    const sessionPart = cookieParts.find((p) => p.startsWith("session="));
    const sessionToken = sessionPart?.split("=")[1];
    if (!sessionToken) return c.text("Unauthorized", 401);

    if (sessionToken) {
      await db.delete(sessions).where(eq(sessions.token, sessionToken));
    }

    c.header(
      "Set-Cookie",
      "session=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax",
    );

    return c.text("Logged out");
  }
});

export default authRoute;
