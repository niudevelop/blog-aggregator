# Gator – RSS Feed Aggregator CLI

Gator is a command-line RSS feed aggregator. It lets you register users, follow RSS feeds, fetch posts from those feeds in the background, and browse collected posts from the terminal.

---

## Requirements

- **Node.js** v18 or newer
- **npm**
- **PostgreSQL**
- **Git**

---

## Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd blog-aggregator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Database setup

Create a PostgreSQL database and export the connection string:

```bash
export DATABASE_URL="postgres://user:password@localhost:5432/gator"
```

Run migrations:

```bash
npm run db:migrate
```

---

## Configuration File

Gator uses a local config file to track the currently logged-in user.

Create the file at:

```text
~/.gatorconfig.json
```

Example:

```json
{
  "currentUserName": "alice"
}
```

The `login` command updates this file automatically.

---

## Running the CLI

All commands are run like this:

```bash
npm run start <command> [args]
```

---

## Commands

### Register a user

```bash
npm run start register <username>
```

Creates a new user.

---

### Login

```bash
npm run start login <username>
```

Sets the active user.

---

### Add a feed (requires login)

```bash
npm run start addfeed <name> <url>
```

Adds a new RSS feed and follows it.

---

### Follow a feed

```bash
npm run start follow <url>
```

Follows an existing feed.

---

### Unfollow a feed

```bash
npm run start unfollow <url>
```

Stops following a feed.

---

### List feeds

```bash
npm run start feeds
```

Lists all feeds.

---

### List followed feeds

```bash
npm run start following
```

Shows feeds followed by the current user.

---

### Browse posts

```bash
npm run start browse
```

Displays collected posts.

---

### Aggregate feeds (long-running)

```bash
npm run start agg <duration>
```

Examples:

```bash
npm run start agg 30s
npm run start agg 5m
```

Runs continuously until **Ctrl+C**.

---

### Reset database

```bash
npm run start reset
```

Deletes all data.

---

## Notes

- Run `agg` in a separate terminal.
- Stop the aggregator with **Ctrl+C**.
- Do not use extremely small intervals.

---

## Example RSS Feeds

- [https://techcrunch.com/feed/](https://techcrunch.com/feed/)
- [https://news.ycombinator.com/rss](https://news.ycombinator.com/rss)
- [https://blog.boot.dev/index.xml](https://blog.boot.dev/index.xml)
