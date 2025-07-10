/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all tab <a> elements (direct children)
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Prepare header row: single cell as required by the example
  const headerRow = ['Tabs'];

  // Prepare labels row: one column per tab label as required by the example
  const labelRow = tabLinks.map(a => {
    const labelDiv = a.querySelector('div');
    return labelDiv ? labelDiv : a;
  });

  // Compose table data, keeping headerRow as a single-cell row
  const cells = [headerRow, labelRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
