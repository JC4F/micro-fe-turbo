import concurrently from "concurrently";
import logger from "./logger";

type Command = "build" | "preview";
type Name = "react" | "angular" | "vuejs" | "@repo/angular-ui";

function prepare() {
  logger.info(`******* Prepare script with pnpm ********`);

  const commands = [
    {
      command: "pnpm i && turbo build --filter @repo/angular-ui && pnpm i",
      name: "prepare",
    },
  ];

  const { result } = concurrently(commands, {
    successCondition: "all",
    // hide: [], => index | name command to hide
  });

  return result.then(
    () => logger.success("******* Prepare succeeded *******"),
    (err) => console.error(err)
  );
}

function createStartCommand(name: Name, commanType: Command) {
  const command = `turbo ${commanType} --filter ${name}`;
  return { command, name: `${name}:${commanType}` };
}

async function runTask() {
  logger.info(`******* Run script with pnpm ********`);

  const commands = [
    createStartCommand("react", "build"),
    createStartCommand("react", "preview"),
    createStartCommand("vuejs", "build"),
    createStartCommand("vuejs", "preview"),
    createStartCommand("angular", "preview"),
  ];

  const { result } = concurrently(commands, {
    successCondition: "all",
    // hide: [], => index | name command to hide
  });

  result.then(
    () => logger.success("******* Start all projects succeeded *******"),
    (err) => console.error(err)
  );
}

prepare()
  .then(runTask)
  .catch((err) => console.error(err));
