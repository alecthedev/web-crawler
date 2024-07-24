import { crawlPage } from "./crawl.js";

function main() {
  if (process.argv.length === 3) {
    const baseURL = process.argv[2];
    console.log(`>> Running web crawler on ${baseURL} <<\n`);

    crawlPage(baseURL);
  } else {
    throw new Error(
      `Invalid argument count.\nProgram usage: "npm run start <URL>"`,
    );
  }
}

main();
