import { crawlPage } from "./crawl.js";

async function main() {
  if (process.argv.length === 3) {
    const baseURL = process.argv[2];
    console.log(`>> Running web crawler on ${baseURL} <<\n`);

    const pages = await crawlPage(baseURL);
    console.log(pages);
  } else {
    throw new Error(
      `Invalid argument count.\nProgram usage: "npm run start <URL>"`,
    );
  }
}

main();
