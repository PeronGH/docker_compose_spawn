import { listCommand, startCommand, stopCommand } from "./commands.ts";
import {
  Instance,
  RunningProject,
  StartOptions,
  StopOptions,
} from "./types.ts";

export async function check(): Promise<boolean> {
  try {
    await listCommand();
    return true;
  } catch {
    return false;
  }
}

export async function start(options: StartOptions): Promise<boolean> {
  try {
    await startCommand(options);
    return true;
  } catch {
    return false;
  }
}

export async function stop(options: StopOptions): Promise<void> {
  await stopCommand(options);
}

export async function list(): Promise<Instance[]> {
  const { stdout } = await listCommand();

  const instances: RunningProject[] = JSON.parse(stdout);
  return instances
    .map((
      { Name, Status, ConfigFiles },
    ) => (
      { name: Name, status: Status, path: ConfigFiles }
    ));
}
