import { XMLParser } from "fast-xml-parser";
import { feed_follows, feeds, users } from "./db/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import type { User } from "./db/queries/users";

export type Feed = typeof feeds.$inferSelect;

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}
export async function fetchFeed(feedURL: string) {
  const response = await fetch(feedURL, {
    headers: {
      "User-agent": "gator",
    },
  });
  const raw = await response.text();
  const parser = new XMLParser({
    ignoreAttributes: true,
    parseTagValue: true,
    trimValues: true,
    isArray: (name) => name === "item",
  });
  const parsed = parser.parse(raw) as { rss: RSSFeed };
  const feed = parsed.rss;
  if (!feed.channel || typeof feed.channel !== "object") {
    throw new Error("invalid RSS: missing channel");
  }

  const title = feed.channel.title;
  const link = feed.channel.link;
  const description = feed.channel.description;

  if (!isNonEmptyString(title) || !isNonEmptyString(link) || !isNonEmptyString(description)) {
    throw new Error("invalid RSS: missing channel metadata");
  }

  const itemsRaw = Array.isArray(feed.channel.item) ? feed.channel.item : [];

  const items: RSSItem[] = [];
  for (const it of itemsRaw) {
    const t = it.title;
    const l = it.link;
    const d = it.description;
    const p = it.pubDate;

    if (!isNonEmptyString(t) || !isNonEmptyString(l) || !isNonEmptyString(d) || !isNonEmptyString(p)) {
      continue;
    }

    items.push({
      title: t.trim(),
      link: l.trim(),
      description: d.trim(),
      pubDate: p.trim(),
    });
  }

  return {
    channel: {
      title: title.trim(),
      link: link.trim(),
      description: description.trim(),
      item: items,
    },
  };
}

export async function createFeed(name: string, url: string, userId: string) {
  const [result] = await db.insert(feeds).values({ name: name, url: url, userId: userId }).returning();
  return result;
}

export async function printFeed(feed: Feed, user: User) {
  console.log(JSON.stringify(feed, null, 2));
  console.log(JSON.stringify(user, null, 2));
}

export async function getFeed(feedURL: string) {
  const [result] = await db.select().from(feeds).where(eq(feeds.url, feedURL));
  return result;
}
export async function getAllFeeds() {
  const result = await db.select().from(feeds).innerJoin(users, eq(feeds.userId, users.id));
  return result;
}

export async function createFeedFollow(feed: Feed, user: User) {
  const [newFeedFollow] = await db.insert(feed_follows).values({ feedId: feed.id, userId: user.id }).returning();

  const [result] = await db
    .select()
    .from(feed_follows)
    .innerJoin(users, eq(feed_follows.userId, users.id))
    .innerJoin(feeds, eq(feed_follows.feedId, feeds.id))
    .where(and(eq(feed_follows.userId, newFeedFollow.userId), eq(feed_follows.feedId, newFeedFollow.feedId)));
  return result;
}

export async function getFeedFollowsForUser(userId: string) {
  const result = await db
    .select()
    .from(feed_follows)
    .innerJoin(users, eq(feed_follows.userId, users.id))
    .innerJoin(feeds, eq(feed_follows.feedId, feeds.id))
    .where(eq(feed_follows.userId, userId));
  return result;
}

export async function deleteFeedFollow(feedId: string, userId: string) {
  const [result] = await db.delete(feed_follows).where(and(eq(feed_follows.feedId, feedId), eq(feed_follows.userId, userId)));
  return result;
}
