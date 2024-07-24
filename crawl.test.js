import { normalizeURL, getURLsFromHTML } from "./crawl.js";
import { test, expect } from "@jest/globals";

//---------V--------- normalizeURL Tests ---------V-----------

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

//--------V--------- getURLsFromHTML Tests ---------V----------

test("getURLsFromHTML: multiple URLs", () => {
  const baseURL = "https://blog.boot.dev";
  const htmlBody =
    '<html><body><a href="https://boot.dev">Learn Backend Development</a><a href="https://blog.boot.dev"><span>Go to Boot.dev blog</span></a></body></html>';
  const output = ["https://boot.dev/", "https://blog.boot.dev/"];
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(output);
});

test("getURLsFromHTML: relative URLs", () => {
  const baseURL = "https://boot.dev";
  const htmlBody =
    '<html><body><a href="/path/abc"></a><a href="/path/xyz"></a></body></html>';
  const output = ["https://boot.dev/path/abc", "https://boot.dev/path/xyz"];
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(output);
});
