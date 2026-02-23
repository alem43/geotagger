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

const app = new Hono();

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
