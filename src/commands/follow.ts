import { readConfig } from "src/config";
import { getUser } from "src/lib/db/queries/users";
import { createFeed, createFeedFollow, getFeed, getFeedFollowsForUser } from "src/lib/db/queries/feed";

export async function handlerFollow(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("follow handler expects a single arguements: url");
  }
  const url = args[0];
  const config = readConfig();
  const user = await getUser(config.currentUserName);
  const feed = await getFeed(url);
  if (!feed) {
    throw new Error("No Feed found");
  }
  const result = await createFeedFollow(feed, user);
  console.log(result.feeds.name);
  console.log(config.currentUserName);
}

export async function handlerFollowing(cmdName: string) {
  const config = readConfig();
  const user = await getUser(config.currentUserName);
  const result = await getFeedFollowsForUser(user.id);

  for (const entry of result) {
    console.log(entry.feeds.name);
  }
}
