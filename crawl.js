function normalizeURL(urlString) {
  const myURL = new URL(urlString);
  let output = `${myURL.hostname}${myURL.pathname}`;
  if (output.slice(-1) === "/") {
    output = output.slice(0, -1);
  }
  return output;
}
module.exports = normalizeURL;
