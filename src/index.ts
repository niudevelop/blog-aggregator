import { handlerAggregate } from "./commands/aggregate";
import { registerCommand, runCommand, type CommandsRegistry } from "./commands/handler";
import { handlerLogin } from "./commands/login";
import { handlerRegister } from "./commands/register";
import { handlerReset } from "./commands/reset";
import { handlerUsers } from "./commands/users";
import { handlerAddFeed } from "./commands/addFeed";
import { handlerFeeds } from "./commands/feeds";
import { handlerFollow, handlerFollowing } from "./commands/follow";
import { middlewareLoggedIn } from "./middleware/middleware";
import { handlerUnfollow } from "./commands/unfollow";
import { handlerBrowse } from "./commands/browser";

async function main() {
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerUsers);
  registerCommand(registry, "agg", handlerAggregate);
  // registerCommand(registry, "addfeed", handlerAddFeed);
  registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
  registerCommand(registry, "unfollow", middlewareLoggedIn(handlerUnfollow));
  registerCommand(registry, "feeds", handlerFeeds);
  registerCommand(registry, "follow", handlerFollow);
  registerCommand(registry, "following", handlerFollowing);
  registerCommand(registry, "browse", middlewareLoggedIn(handlerBrowse));
  const argv = process.argv.slice(2);
  let argNeeded = 1;
  let cmdName = "";
  let args: string[] = [];
  if (argv.length > 0) {
    cmdName = argv[0];
    args = argv.slice(1);
    if (cmdName === "reset" || cmdName === "users" || cmdName === "feeds" || cmdName === "following") {
      argNeeded = 0;
    }
    if (cmdName === "addfeed") {
      argNeeded = 2;
    }
  }
  if (args.length !== argNeeded) {
    console.error("No arguments found");
    process.exit(1);
  }
  await runCommand(registry, cmdName, ...args);
  process.exit(0);
}
main();
