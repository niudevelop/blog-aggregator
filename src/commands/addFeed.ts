import { readConfig } from "src/config";
import { getUser, type User } from "src/lib/db/queries/users";
import { createFeed, createFeedFollow } from "src/lib/db/queries/feed";

export async function handlerAddFeed(cmdName: string, user: User, ...args: string[]) {
  if (args.length !== 2) {
    throw new Error("addfeed handler expects two arguements: name, url");
  }
  const name = args[0];
  const url = args[1];
  //   const config = readConfig();
  //   const user = await getUser(config.currentUserName);
  const result = await createFeed(name, url, user.id);
  const resultFollow = await createFeedFollow(result, user);
  console.log(result.name);
  console.log(user.name);
}
