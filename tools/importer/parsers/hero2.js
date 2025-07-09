/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block inside the given element, or use the element itself
  let heroBlock = element.querySelector('.hero.block') || element;

  // Try to find the main content wrapper (may be nested divs)
  let contentDiv = heroBlock;
  while (
    contentDiv &&
    contentDiv.children.length === 1 &&
    contentDiv.firstElementChild.tagName.toLowerCase() === 'div'
  ) {
    contentDiv = contentDiv.firstElementChild;
  }

  // Gather all direct children for flexible extraction
  const children = Array.from(contentDiv.children);

  // Find which child contains the image (picture or img)
  let imgEl = null;
  let imgContainerIdx = -1;
  for (let i = 0; i < children.length; i++) {
    const c = children[i];
    if (
      (c.querySelector && c.querySelector('picture')) ||
      (c.querySelector && c.querySelector('img'))
    ) {
      imgEl = c.querySelector('picture') || c.querySelector('img');
      imgContainerIdx = i;
      break;
    }
  }

  // Gather all non-empty text/structure elements except the image container
  const textContentEls = children
    .filter((el, idx) => idx !== imgContainerIdx && el.textContent.trim().length > 0);

  // If after filtering, we have no textContentEls, fallback: include all non-image children (for robustness)
  let textCell;
  if (textContentEls.length === 1) {
    textCell = textContentEls[0];
  } else if (textContentEls.length > 1) {
    textCell = textContentEls;
  } else {
    textCell = '';
  }

  // Compose rows according to the required structure
  const rows = [
    ['Hero'],
    [imgEl || ''],
    [textCell],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
