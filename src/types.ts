export type StartOptions = {
  /** project name */
  name: string;
  /** path to compose file */
  path: string;
  /** environment variables */
  env?: Record<string, string>;
};

export type StopOptions = {
  /** project name */
  name: string;
};

export type RunningProject = {
  Name: string;
  Status: string;
  ConfigFiles: string;
};

export type Instance = {
  name: string;
  status: string;
  path: string;
};
