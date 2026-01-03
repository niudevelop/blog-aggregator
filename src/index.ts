import { registerCommand, runCommand, type CommandsRegistry } from "./command_handler";
import { handlerLogin } from "./command_login";
import { handlerRegister } from "./command_register";
import { handlerReset } from "./command_reset";
import { handlerUsers } from "./command_users";

async function main() {
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerUsers);
  const argv = process.argv.slice(2);
  let argNeeded = 1;
  let cmdName = "";
  let args: string[] = [];
  if (argv.length > 0) {
    cmdName = argv[0];
    args = argv.slice(1);
    if (cmdName === "reset" || cmdName === "users") {
      argNeeded = 0;
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
