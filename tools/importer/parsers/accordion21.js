/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must have two columns: block name and empty cell, to match the data rows
  const rows = [['Accordion (accordion21)', '']];

  // Find all accordion items (divider elements)
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));
  dividers.forEach(divider => {
    const grid = divider.querySelector(':scope > .w-layout-grid');
    if (!grid) return;
    const children = Array.from(grid.children);
    if (children.length < 2) return;
    rows.push([children[0], children[1]]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
