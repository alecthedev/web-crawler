import { JSDOM } from "jsdom";

function normalizeURL(urlString) {
  const myURL = new URL(urlString);
  let output = `${myURL.hostname}${myURL.pathname}`;
  if (output.slice(-1) === "/") {
    output = output.slice(0, -1);
  }
  return output;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const allAnchors = dom.window.document.querySelectorAll("a");
  const urls = [];

  for (const anchor of allAnchors) {
    if (anchor.hasAttribute("href")) {
      let href = new URL(anchor.href, baseURL).href;
      try {
        urls.push(href);
      } catch (err) {
        console.log(`${err.message} : ${href}`);
      }
    }
  }
  return urls;
}

async function crawlPage(currentURL) {
  try {
    console.log(`Fetching ${currentURL} ...`);
    const response = await fetch(currentURL);
    if (response.status >= 400) {
      throw new Error(`${currentURL} >> status code ${response.status}`);
    }
    if (response.headers.get("content-type") != "text/html") {
      throw new Error(`${currentURL} >> content-type is not text/html`);
    }
    console.log(await response.text());
  } catch (err) {
    console.error(err);
    return;
  }
}

export { normalizeURL, getURLsFromHTML, crawlPage };
