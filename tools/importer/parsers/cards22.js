/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards22)'];
  const rows = [headerRow];

  // Find all tab panes in the block
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((tabPane) => {
    // Each grid within a tab
    const grids = tabPane.querySelectorAll('.w-layout-grid');
    grids.forEach((grid) => {
      // Each card is an <a> direct child of the grid
      const cards = grid.querySelectorAll(':scope > a');
      cards.forEach((card) => {
        // IMAGE CELL
        let img = card.querySelector('img');
        let imageCell = img || '';

        // TEXT CELL
        let textParts = [];
        // Grab heading in order of appearance
        let heading = card.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) textParts.push(heading);

        // Grab the first paragraph-sm or similar (skip heading already added)
        let desc = null;
        // Find all nodes after the heading
        if (heading) {
          let sibling = heading.nextElementSibling;
          while (sibling) {
            if (
              sibling.matches('.paragraph-sm, .paragraph, p, span') &&
              sibling.textContent.trim() !== ''
            ) {
              desc = sibling;
              break;
            }
            sibling = sibling.nextElementSibling;
          }
        } else {
          // If no heading, just get first .paragraph-sm, .paragraph, p or span
          desc = card.querySelector('.paragraph-sm, .paragraph, p, span');
        }
        if (desc) textParts.push(desc);

        // CTA: look for links inside the card that are not the card itself
        const deepLinks = Array.from(card.querySelectorAll('a')).filter(a => a !== card);
        if (deepLinks.length > 0) textParts.push(deepLinks[0]);

        // Fallback: if no heading or desc, use text nodes
        if (textParts.length === 0) {
          for (let child of card.children) {
            if (
              child.nodeType === 1 &&
              (child.tagName.startsWith('H') || child.tagName === 'DIV' || child.tagName === 'P' || child.tagName === 'SPAN') &&
              child.textContent.trim() !== ''
            ) {
              textParts.push(child);
              break;
            }
          }
        }
        rows.push([imageCell, textParts]);
      });
    });
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
