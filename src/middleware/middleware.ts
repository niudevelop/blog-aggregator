import type { CommandHandler, UserCommandHandler } from "src/commands/handler";
import { readConfig } from "src/config";
import { getUser } from "src/lib/db/queries/users";

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
  return async (cmdName: string, ...args: string[]) => {
    const config = readConfig();

    const userName = config.currentUserName;
    const user = await getUser(userName);

    if (!user) {
      throw new Error(`User ${userName} not found`);
    }

    return handler(cmdName, user, ...args);
  };
}
