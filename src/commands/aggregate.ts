import { fetchFeed } from "../lib/feed";

export async function handlerAggregate(cmdName: string, ...args: string[]) {
  const feed = await fetchFeed("https://www.wagslane.dev/index.xml");
  console.log(JSON.stringify(feed, null, 2));
  process.exit(0);
}
