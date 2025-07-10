/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards5) header row
  const headerRow = ['Cards (cards5)'];
  // Get all immediate <a> card elements
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));
  const rows = cards.map(card => {
    // 1. First cell: Image (mandatory)
    let imgEl = '';
    const imgAspect = card.querySelector('.utility-aspect-3x2');
    if (imgAspect) {
      const img = imgAspect.querySelector('img');
      if (img) {
        imgEl = img;
      } else {
        imgEl = imgAspect;
      }
    }
    // 2. Second cell: Text block (tag, heading, description)
    const textBlock = card.querySelector('.utility-padding-all-1rem');
    const textContent = [];
    if (textBlock) {
      // Tag (optional)
      const tagGroup = textBlock.querySelector('.tag-group');
      if (tagGroup) textContent.push(tagGroup);
      // Heading (optional)
      const heading = textBlock.querySelector('h3, .h4-heading');
      if (heading) textContent.push(heading);
      // Paragraph (optional)
      const para = textBlock.querySelector('p, .paragraph-sm');
      if (para) textContent.push(para);
    }
    return [imgEl, textContent];
  });
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  element.replaceWith(table);
}
