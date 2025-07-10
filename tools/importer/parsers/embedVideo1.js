/* global WebImporter */
export default function parse(element, { document }) {
  // Get all img elements inside the grid layout
  const images = Array.from(element.querySelectorAll('img'));
  // If no images, output an empty Embed block
  const cellContent = images.length > 0 ? images : '';
  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    ['Embed'],
    [cellContent]
  ], document);
  // Replace the element in the DOM
  element.replaceWith(table);
}
