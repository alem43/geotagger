import {Hono} from "hono";

const healthRoute = new Hono();

healthRoute.get("/", (c) => {
  return c.text("ok");
});

export default healthRoute;
