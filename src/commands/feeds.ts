import { readConfig } from "src/config";
import { getUser } from "src/lib/db/queries/users";
import { getAllFeeds, getFeedFollowsForUser } from "src/lib/db/queries/feed";

export async function handlerFeeds(cmdName: string) {
  const result = await getAllFeeds();

  for (const entry of result) {
    console.log(entry.feeds.name);
    console.log(entry.feeds.url);
    console.log(entry.users.name);
  }
}

