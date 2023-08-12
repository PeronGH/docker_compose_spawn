import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { check, list, start, stop } from "./mod.ts";

if (!await check()) {
  console.error(
    "Failed to start server: please make sure docker compose v2 is correctly configured",
  );
  Deno.exit(1);
}

const app = new Hono();

app.get("/instances", async (c) => c.json(await list()));

app.post(
  "/instances",
  async (c) => c.json({ success: await start(await c.req.json()) }),
);

app.delete(
  "/instances/:name",
  async (c) => c.json({ success: await stop(c.req.param()) }),
);

Deno.serve(app.fetch);
