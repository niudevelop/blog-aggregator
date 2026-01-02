import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string;
  currentUserName: string;
};

export function setUser(currentUserName: string) {
  const config = readConfig();
  writeConfig({
    dbUrl: config.dbUrl,
    currentUserName: currentUserName,
  });
}

export function readConfig(): Config {
  const file = fs.readFileSync(getConfigFilePath(), {
    encoding: "utf-8",
  });
  return validateConfig(file);
}

function getConfigFilePath(): string {
  return path.join(...[os.homedir(), ".gatorconfig.json"]);
}

function writeConfig(cfg: Config) {
  fs.writeFileSync(getConfigFilePath(), JSON.stringify(cfg));
}

function validateConfig(rawConfig: any): Config {
  try {
    return JSON.parse(rawConfig);
  } catch (error) {
    throw error;
  }
}
