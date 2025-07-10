/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Find the main grid containing the image and text
  const grid = element.querySelector('.grid-layout');
  let imageEl = null;
  let textBlock = null;

  if (grid) {
    const children = Array.from(grid.children);
    // The structure is: [IMG, TEXTBLOCK] or [TEXTBLOCK, IMG], but in the given HTML it's IMG then TEXTBLOCK
    imageEl = children.find((el) => el.tagName === 'IMG');
    textBlock = children.find((el) => el !== imageEl);
  }

  // Prepare the content cell: headline, subheading, CTA(s), keeping existing references
  const textContent = [];
  if (textBlock) {
    // Headline (keep original heading level)
    const heading = textBlock.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textContent.push(heading);
    // Subheading (first paragraph, if any)
    const subheading = textBlock.querySelector('p');
    if (subheading) textContent.push(subheading);
    // CTAs (button group, if any)
    const buttonGroup = textBlock.querySelector('.button-group');
    if (buttonGroup) textContent.push(buttonGroup);
  }

  // Build the block table as per requirements: header, image, text (all single column)
  const rows = [
    ['Hero (hero2)'],
    [imageEl ? imageEl : ''],
    [textContent.length ? textContent : '']
  ];
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
