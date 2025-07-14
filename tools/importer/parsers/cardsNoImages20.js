/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Cards block
  const headerRow = ['Cards'];
  // Get all immediate child divs (each card container)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Build the card rows
  const rows = cardDivs.map(cardDiv => {
    // We want to reference the text content (usually in a <p>) in each card
    // Some cards may have more than just <p> (but in this structure, it's just <p> below the icon)
    // We also want to ignore the icon/svg from the card visual
    const ps = Array.from(cardDiv.querySelectorAll('p'));
    // If there is a <p>, use it; else fall back to cardDiv's text (should not happen in this HTML)
    let content;
    if (ps.length > 0) {
      // If there are multiple, combine them into a fragment
      if (ps.length === 1) {
        content = ps[0];
      } else {
        const fragment = document.createDocumentFragment();
        ps.forEach(p => fragment.appendChild(p));
        content = fragment;
      }
    } else {
      // fallback: create a <div> for all text
      const fallbackDiv = document.createElement('div');
      fallbackDiv.textContent = cardDiv.textContent.trim();
      content = fallbackDiv;
    }

    const cells =
      [' ', content]
      ;

    return cells;
  });
  // Compile the table data
  const tableData = [headerRow, ...rows];
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
