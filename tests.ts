import { check, list, start } from "./mod.ts";
import { stop } from "./src/main.ts";
import { random } from "./src/utils.ts";

Deno.test("docker_compose_spawn", async () => {
  if (!await check()) throw "docker compose v2 not set up";

  if (await start({ path: "/dev/null" })) {
    throw "it should not start instance with non-exist config";
  }

  const name = random();
  if (!await start({ name, path: "./docker-compose.yml" })) {
    throw "it should start instance with existing config";
  }

  {
    const found = (await list()).find((i) => i.name === name);
    if (!found) throw "it should list created instance";
  }

  await stop({ name });

  {
    const found = (await list()).find((i) => i.name === name);
    if (found) throw "it should not list stopped instance";
  }
});
