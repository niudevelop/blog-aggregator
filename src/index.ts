import { handlerLogin, registerCommand, runCommand, type CommandsRegistry } from "./command_handler";

function main() {
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    console.error("No arguments found");
    process.exit(1);
  }
  runCommand(registry, args[0], ...[args[1]]);
}
main();
