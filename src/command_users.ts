import { readConfig, setUser } from "./config";
import { deleteAllUsers, getUsers } from "./lib/db/queries/users";

export async function handlerUsers(cmdName: string, ...args: string[]) {
  const users = await getUsers();
  const config = readConfig();

  for (const user of users) {
    if (user.name === config.currentUserName) {
      console.log(`* ${user.name} (current)`);
    } else {
      console.log(`* ${user.name}`);
    }
  }
  process.exit(0);
}
