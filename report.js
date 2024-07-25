function printReport(pages) {
  console.log(`\nCreating report for ${Object.keys(pages).length} pages...\n`);
  const sorted_pages = sortPages(pages);
  for (const page of Object.keys(sorted_pages)) {
    console.log(`Found ${sorted_pages[page]} internal links to ${page}`);
  }
}

function sortPages(pages) {
  return Object.fromEntries(
    Object.entries(pages)
      .sort(([, a], [, b]) => a - b)
      .reverse(),
  );
}

export { printReport };
