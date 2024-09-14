import chalk from "chalk";

const errorChalk = chalk.bold.red;
const infoChalk = chalk.blue;
const successChalk = chalk.green;
const warningChalk = chalk.hex("#FFA500");

const logger = {
  error: (...messages: unknown[]): void =>
    console.error(errorChalk(messages.join(" "))),
  info: (...messages: unknown[]): void =>
    console.info(infoChalk(messages.join(" "))),
  success: (...messages: unknown[]): void =>
    console.log(successChalk(messages.join(" "))),
  warn: (...messages: unknown[]): void =>
    console.log(warningChalk(messages.join(" "))),
};

export default logger;
