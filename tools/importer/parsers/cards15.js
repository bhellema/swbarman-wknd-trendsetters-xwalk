/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row exactly as specified
  const headerRow = ['Cards (cards15)'];
  // Select all card anchors directly under the element
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  // Prepare rows for each card
  const rows = cards.map((card) => {
    // First cell: image (first direct img descendant of the first child div)
    let image = null;
    const aspectDiv = card.querySelector('.utility-aspect-2x3');
    if (aspectDiv) {
      image = aspectDiv.querySelector('img');
    }
    // Second cell: text content (tag/date and heading)
    const textParts = [];
    // Tag and date (may be in a flex div)
    const metaDiv = card.querySelector('.flex-horizontal');
    if (metaDiv) textParts.push(metaDiv);
    // Heading (title)
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) textParts.push(heading);
    return [image, textParts];
  });
  // Compose the table rows
  const tableCells = [headerRow, ...rows];
  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  // Replace the original element
  element.replaceWith(table);
}