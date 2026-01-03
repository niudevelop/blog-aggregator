import { setUser } from "../config";
import { getUser } from "../lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("login handler expects a single arguement: username");
  }
  const username = args[0];
  const userExists = await getUser(username);
  if (!userExists) {
    throw Error("User does not exist");
  }
  setUser(username);
  console.log(`User "${username} has been set"`);
}
