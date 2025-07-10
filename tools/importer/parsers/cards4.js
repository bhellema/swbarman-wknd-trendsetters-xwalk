/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Find the direct cards block
  let cardsBlock = element;
  if (cardsBlock.classList.contains('cards-wrapper')) {
    const found = cardsBlock.querySelector('.cards.block');
    if (found) cardsBlock = found;
  }
  // Defensive: must have <ul> with <li>
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children).filter(li => li.tagName === 'LI');
  const rows = [];
  // Header row matching block name
  rows.push(['Cards']);

  for (const card of cards) {
    // Image/Icon cell
    const imgDiv = card.querySelector('.cards-card-image');
    // Text content cell
    const bodyDiv = card.querySelector('.cards-card-body');
    // Defensive: skip if missing mandatory content
    if (!imgDiv || !bodyDiv) continue;
    rows.push([imgDiv, bodyDiv]);
  }

  // If no cards were found, do not replace
  if (rows.length <= 1) return;

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
