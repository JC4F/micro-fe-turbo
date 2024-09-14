import concurrently from "concurrently";
import logger from "./logger";

type Command = "build:watch" | "preview";
type Name = "react" | "angular" | "vuejs" | "@repo/angular-ui";

function createStartCommand(name: Name, commanType: Command) {
  const command = `turbo ${commanType} --filter ${name}`;
  return { command, name: `${name}:${commanType}` };
}

async function runTask() {
  logger.info(`******* Run script with pnpm ********`);

  const commands = [
    createStartCommand("react", "build:watch"),
    createStartCommand("react", "preview"),
    createStartCommand("vuejs", "build:watch"),
    createStartCommand("vuejs", "preview"),
    createStartCommand("@repo/angular-ui", "build:watch"),
    createStartCommand("angular", "preview"),
  ];

  const { result } = concurrently(commands, {
    successCondition: "first",
    // hide: [], => index | name command to hide
  });

  result.then(
    () => logger.success("******* Start all projects succeeded *******"),
    (err) => console.error(err)
  );
}

runTask().catch((err) => console.error(err));
