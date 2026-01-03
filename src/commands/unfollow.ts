import type { User } from "src/lib/db/queries/users";
import { deleteFeedFollow, getFeed } from "src/lib/feed";

export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("unfollow handler expects a single arguement:url");
  }
  const url = args[0];
  const feed = await getFeed(url);
  const result = await deleteFeedFollow(feed.id, user.id);
}
