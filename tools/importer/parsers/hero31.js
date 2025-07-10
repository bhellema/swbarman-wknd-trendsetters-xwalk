/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the block header.
  const headerRow = ['Hero (hero31)'];

  // This hero block has no background image, leave second row blank.
  const backgroundRow = [''];

  // Compose the main content cell
  // Find the headline (h2)
  const title = element.querySelector('h2');
  // Find the rich description (div.rich-text or .w-richtext)
  const description = element.querySelector('.w-richtext, .rich-text');

  const mainContent = [];
  if (title) mainContent.push(title);
  if (description) mainContent.push(description);

  // Assemble table rows
  const rows = [
    headerRow,
    backgroundRow,
    [mainContent]
  ];

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
