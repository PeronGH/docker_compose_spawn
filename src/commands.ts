import { $ } from "./deps.ts";
import { StartOptions, StopOptions } from "./types.ts";
import { random } from "./utils.ts";

export function startCommand(
  { name = random(), path, env = {} }: StartOptions,
) {
  return $`docker compose -f ${path} -p ${name} up -d`.env(env).quiet("stdout");
}

export function stopCommand({ name }: StopOptions) {
  return $`docker compose -p ${name} down`.quiet("stdout");
}

export function listCommand() {
  return $`docker compose ls -a --format json`.stdout("piped");
}
