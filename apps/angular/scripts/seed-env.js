const fs = require("fs");
const path = require("path");
const successColor = "\x1b[32m%s\x1b[0m";
const checkSign = "\u{2705}";
const dotenv = require("dotenv").config();

console.log(process.env);

const envFile = `export const environment = {
    NODE_ENV: '${process.env["NODE_ENV"] || "production"}',
    VITE_REACT_APP: '${process.env["VITE_REACT_APP"]}',
};
`;

const targetPath = path.join(__dirname, "../src/environments/environment.ts");
fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(
      successColor,
      `${checkSign} Successfully generated environment.ts`,
    );
  }
});
