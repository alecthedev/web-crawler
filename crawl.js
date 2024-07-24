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

export { normalizeURL, getURLsFromHTML };
