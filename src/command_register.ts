import { setUser } from "./config";
import { createUser, getUser } from "./lib/db/queries/users";

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("register handler expects a single arguement: username");
  }
  const username = args[0];
  const userExists = await getUser(username);
  if (userExists) {
    throw Error("User already exists");
  }
  const result = await createUser(username);
  setUser(result.name);
  console.log(`User "${username} was created"`);
  console.log(`User: ${JSON.stringify(result, null, 2)}`);
}
