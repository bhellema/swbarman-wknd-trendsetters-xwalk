/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we operate on the .cards block itself
  let block = element;
  if (!block.classList.contains('cards')) {
    const found = element.querySelector(':scope > .cards');
    if (found) {
      block = found;
    } else {
      return;
    }
  }

  const ul = block.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(child => child.tagName === 'LI');
  const rows = [['Cards']]; // Header row

  lis.forEach(li => {
    // Find image or icon: the .cards-card-image block
    let imageCell = null;
    const imageDiv = li.querySelector('.cards-card-image');
    if (imageDiv) {
      // Use the picture directly if it exists, otherwise whatever is there
      const pic = imageDiv.querySelector('picture');
      if (pic) {
        imageCell = pic;
      } else {
        const img = imageDiv.querySelector('img');
        imageCell = img || imageDiv;
      }
    }

    // Find text content: .cards-card-body (may contain title/desc)
    let textCell = null;
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      textCell = bodyDiv;
    }

    // Always add both columns, even if one is missing
    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
