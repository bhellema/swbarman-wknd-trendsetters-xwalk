/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards41) block: expects each card to have an image and rich text
  // Each card is a direct child div. Some cards may have image and text, some only image, some only text.
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [
    ['Cards (cards41)']
  ];
  cardDivs.forEach(cardDiv => {
    // Find the first image (if any)
    const img = cardDiv.querySelector('img');
    // For text, include all non-image nodes
    // If the cardDiv only has image, text cell will be empty
    const textNodes = [];
    Array.from(cardDiv.childNodes).forEach(node => {
      if (!(node.nodeType === 1 && node.tagName.toLowerCase() === 'img')) {
        if (node.nodeType === 3) { // Text node
          const str = node.textContent.trim();
          if (str) {
            textNodes.push(document.createTextNode(str));
          }
        } else if (node.nodeType === 1) { // Element
          textNodes.push(node);
        }
      }
    });
    let textCell = null;
    if (textNodes.length === 1) {
      textCell = textNodes[0];
    } else if (textNodes.length > 1) {
      const wrapper = document.createElement('div');
      textNodes.forEach(n => wrapper.appendChild(n));
      textCell = wrapper;
    } else {
      textCell = document.createElement('div'); // empty div to preserve structure
    }
    rows.push([
      img,
      textCell
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
