import { $ } from "./deps.ts";
import { StartOptions, StopOptions } from "./types.ts";

export function startCommand({ name, path, env = {} }: StartOptions) {
  return $`docker compose -f ${path} -p ${name} up -d`.env(env).quiet("stdout");
}

export function stopCommand({ name }: StopOptions) {
  return $`docker compose -p ${name} down`.quiet("stdout");
}

export function listCommand() {
  return $`docker compose ls --format json`.stdout("piped");
}
