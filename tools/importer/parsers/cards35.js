/* global WebImporter */
export default function parse(element, { document }) {
  // The Cards (cards35) block expects two columns: image/icon and text content per card.
  // In this HTML, each card only has an image, and there is no text content.
  // We will generate a two-column table: first column is the image, second is an empty cell (intentionally blank due to lack of text in source)

  const headerRow = ['Cards (cards35)']; // Header row must be a single column per block requirement

  // Each card: <div class="utility-aspect-1x1"><img ...></div>
  const cardDivs = Array.from(element.querySelectorAll(':scope > div.utility-aspect-1x1'));

  // For each card, produce [image_element, empty string (text cell intentionally blank)]
  const cardRows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    return [img, '']; // Intentionally blank text cell as per block requirements when no text exists
  });

  // The table data: header row (single column), then card rows (2 columns)
  // WebImporter.DOMUtils.createTable handles differing row lengths by aligning the first row as single header cell
  const tableData = [headerRow, ...cardRows];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
