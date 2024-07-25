function printReport(pages) {
  console.log(`Creating report for ${Object.keys(pages).length} pages...`);
  const sorted_pages = sortPages(pages);
  for (const page of Object.keys(sorted_pages)) {
    console.log(`Found ${sorted_pages[page]} internal links to ${page}`);
  }
}

function sortPages(pages) {
  return pages;
}

export { printReport };
