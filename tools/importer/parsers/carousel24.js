/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified in the block description
  const headerRow = ['Carousel (carousel24)'];

  // Find the card-body that contains the content for the slide
  const cardBody = element.querySelector('.card-body');

  // Defensive: if cardBody isn't found, exit early (nothing to extract)
  if (!cardBody) {
    // Remove element to avoid import issues, but don't add a block
    element.remove();
    return;
  }

  // Find the image: must reference the existing <img> element
  const img = cardBody.querySelector('img');

  // Find the heading (optional)
  const heading = cardBody.querySelector('.h4-heading');

  // Prepare the text cell: only include if there's content
  let textCell = '';
  if (heading && heading.textContent.trim()) {
    // Use the actual existing heading element, not a new one
    textCell = heading;
  }

  // Prepare the slide row (always two columns: image, textCell)
  const row = [img, textCell];

  // Compose the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  // Replace the original element with the new table block
  element.replaceWith(table);
}
