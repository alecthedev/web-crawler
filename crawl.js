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

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  if (new URL(currentURL).hostname !== new URL(baseURL).hostname) {
    return pages;
  }
  const normURL = normalizeURL(currentURL);
  if (pages[normURL]) {
    pages[normURL]++;
    return pages;
  }
  pages[normURL] = 1;

  let html = "";

  try {
    html = await fetchHTML(currentURL);
  } catch (err) {
    console.log(err.message);
    return pages;
  }

  const allURLs = getURLsFromHTML(html, baseURL);
  for (const url of allURLs) {
    pages = await crawlPage(baseURL, url, pages);
  }
  return pages;
}

async function fetchHTML(url) {
  console.log(`Fetching ${url} ...`);
  const response = await fetch(url);
  if (response.status >= 400) {
    throw new Error(`Network Error: status code ${response.status} >> ${url}`);
  }
  if (!response.headers.get("content-type").includes("text/html")) {
    throw new Error(`Fetch Error: ${url} >> content-type is not text/html`);
  }
  return response.text();
}

export { normalizeURL, getURLsFromHTML, crawlPage };
