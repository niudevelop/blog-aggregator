import { setUser } from "../config";
import { deleteAllUsers } from "../lib/db/queries/users";

export async function handlerReset(cmdName: string, ...args: string[]) {
  await deleteAllUsers();
  process.exit(0);
}
