const normalizeURL = require("./crawl.js");

test("normalizeURL: https vs http", () => {
  const output = "blog.boot.dev/path";
  expect(normalizeURL("https://blog.boot.dev/path")).toBe(output);
  expect(normalizeURL("http://blog.boot.dev/path")).toBe(output);
});

test("normalizeURL: trailing slash/", () => {
  const output = "blog.boot.dev/path";
  expect(normalizeURL("https://blog.boot.dev/path/")).toBe(output);
  expect(normalizeURL("http://blog.boot.dev/path/")).toBe(output);
});

test("normalizeURL: hostname CaPitAls", () => {
  const output = "blog.boot.dev/path";
  expect(normalizeURL("hTtPs://bLoG.BooT.dEv/path/")).toBe(output);
  expect(normalizeURL("hTtP://bLoG.BooT.dEv/path/")).toBe(output);
});
