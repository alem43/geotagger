import {serve} from "@hono/node-server";
import {Hono} from "hono";
import {cors} from "hono/cors";
import bcrypt from "bcryptjs";
import {db} from "./db/db.js";
import {users, sessions} from "./db/schema.js";
import {eq} from "drizzle-orm";
import {requireAuth} from "./middleware/requireAuth.js";
import healthRoute from "./routes/health-route.js";
import authRoute from "./routes/auth-route.js";
import meRoute from "./routes/me-route.js";
import geotagsRoute from "./routes/geotags-route.js";
import {logger} from "hono/logger";
import fs from "fs";
import path from "path";

const app = new Hono();

app.use("*", logger());

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/health", healthRoute);

app.route("/auth", authRoute);

app.route("/me", meRoute);

app.get("/protected", requireAuth, (c) => {
  const user = c.get("user");
  return c.text(`ok protected: ${user.email}`);
});

app.get("/uploads/profiles/:filename", async (c) => {
  const filename = c.req.param("filename");

  const filePath = path.join(process.cwd(), "uploads", "profiles", filename);

  if (!fs.existsSync(filePath)) {
    return c.text("File not found", 404);
  }

  const file = fs.readFileSync(filePath);

  const ext = filename.split(".").pop();

  const mimeTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
  };

  const contentType = mimeTypes[ext || ""] || "application/octet-stream";

  return c.body(file, 200, {
    "Content-Type": contentType,
  });
});

app.route("/geotags", geotagsRoute);

serve(
  {
    fetch: app.fetch,
    port: 8787,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
