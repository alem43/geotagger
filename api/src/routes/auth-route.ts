import {Hono} from "hono";
import bcrypt from "bcryptjs";
import {db} from "../db/db.js";
import {users, sessions} from "../db/schema.js";
import {eq} from "drizzle-orm";
import crypto from "node:crypto";
import fs from "fs";
import path from "path";

const authRoute = new Hono();

authRoute.post("/register", async (c) => {
  const body = await c.req.parseBody();

  const email = body.email;
  const password = body.password;
  const firstName = body.firstName;
  const lastName = body.lastName;
  const profilePicture = body.profilePicture;

  if (!email || !password || !firstName || !lastName) {
    return c.text("Credentials not valid", 400);
  }

  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length > 0) {
    return c.text("User already existing!", 400);
  }

  let profilePictureFilename: string | null = null;

  if (profilePicture && profilePicture instanceof File) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(profilePicture.type)) {
      return c.text("Invalid file type. Only images allowed.", 400);
    }

    const maxSize = 5 * 1024 * 1024;
    if (profilePicture.size > maxSize) {
      return c.text("File too large. Max 5MB.", 400);
    }

    // safer extension (DO NOT trust original filename)
    const mimeToExt: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    };

    const extension = mimeToExt[profilePicture.type];
    const uniqueFilename = `${crypto.randomUUID()}.${extension}`;
    profilePictureFilename = uniqueFilename;

    const arrayBuffer = await profilePicture.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ FIXED PATH
    const uploadDir = path.join(process.cwd(), "uploads", "profiles");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {recursive: true});
    }

    const filePath = path.join(uploadDir, uniqueFilename);

    // ✅ non-blocking
    await fs.promises.writeFile(filePath, buffer);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const userId = crypto.randomUUID();

  await db.insert(users).values({
    id: userId,
    email,
    firstName,
    lastName,
    passwordHash,
    profilePictureUrl: profilePictureFilename,
    createdAt: Date.now(),
  });

  const sessionToken = crypto.randomUUID();

  await db.insert(sessions).values({
    token: sessionToken,
    userId,
    createdAt: Date.now(),
  });

  c.header(
    "Set-Cookie",
    `session=${sessionToken}; Path=/; HttpOnly; SameSite=Lax`,
  );

  return c.json({
    id: userId,
    email,
    firstName,
    lastName,
    profilePictureUrl: profilePictureFilename,
  });
});

authRoute.post("/login", async (c) => {
  const {email, password} = await c.req.json();

  if (!email || !password) {
    return c.text("Email or username not valid", 400);
  }

  const result = await db.select().from(users).where(eq(users.email, email));
  if (result.length === 0) {
    return c.text("Invalid credentials", 401);
  }

  const user = result[0];

  const passwordIsValid = await bcrypt.compare(password, user.passwordHash);
  if (!passwordIsValid) {
    return c.text("Invalid credentials", 401);
  }

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
  const cookieReturn = c.req.header("cookie");
  if (!cookieReturn) return c.text("Unauthorized", 401);

  const cookieParts = cookieReturn.split("; ");
  const sessionPart = cookieParts.find((p) => p.startsWith("session="));
  const sessionToken = sessionPart?.split("=")[1];

  if (!sessionToken) return c.text("Unauthorized", 401);

  await db.delete(sessions).where(eq(sessions.token, sessionToken));

  c.header("Set-Cookie", "session=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax");

  return c.text("Logged out");
});

export default authRoute;
