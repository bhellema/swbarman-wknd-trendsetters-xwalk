/* global WebImporter */
export default function parse(element, { document }) {
  // Table header from the block name in the instructions
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Helper to build the card row
  function makeCardRow(imgEl, textEls) {
    // Always provide two columns: image/icon, text content
    return [imgEl || '', textEls];
  }

  // Get grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // 1. First card: Hero card (left large card)
  const heroAnchor = gridChildren[0];
  if (heroAnchor && heroAnchor.tagName === 'A') {
    // Image
    let img = null;
    const imgDiv = heroAnchor.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    if (imgDiv) img = imgDiv.querySelector('img');
    // Tags (optional)
    const tagGroup = heroAnchor.querySelector('.tag-group');
    // Heading
    const heading = heroAnchor.querySelector('h2, h3, h4');
    // Description
    const desc = heroAnchor.querySelector('p');
    // Compose text cell
    const textEls = [];
    if (tagGroup) textEls.push(tagGroup);
    if (heading) textEls.push(heading);
    if (desc) textEls.push(desc);
    if (img && textEls.length > 0) {
      rows.push(makeCardRow(img, textEls));
    }
  }

  // 2. Second block: two cards with images (vertical stack)
  const subGrid = gridChildren[1];
  if (subGrid) {
    const cardLinks = subGrid.querySelectorAll('a.utility-link-content-block');
    cardLinks.forEach(cardLink => {
      let img = null;
      const imgDiv = cardLink.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
      if (imgDiv) img = imgDiv.querySelector('img');
      const tagGroup = cardLink.querySelector('.tag-group');
      const heading = cardLink.querySelector('h2, h3, h4');
      const desc = cardLink.querySelector('p');
      const textEls = [];
      if (tagGroup) textEls.push(tagGroup);
      if (heading) textEls.push(heading);
      if (desc) textEls.push(desc);
      if (img && textEls.length > 0) {
        rows.push(makeCardRow(img, textEls));
      }
    });
  }

  // 3. Third block: cards without images (just heading and desc)
  const verticalCards = gridChildren[2];
  if (verticalCards) {
    const cardLinks = verticalCards.querySelectorAll('a.utility-link-content-block');
    cardLinks.forEach(cardLink => {
      const heading = cardLink.querySelector('h2, h3, h4');
      const desc = cardLink.querySelector('p');
      const textEls = [];
      if (heading) textEls.push(heading);
      if (desc) textEls.push(desc);
      if (textEls.length > 0) {
        rows.push(makeCardRow('', textEls));
      }
    });
  }

  // Build the block and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
