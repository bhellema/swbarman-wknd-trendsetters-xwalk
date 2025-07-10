/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion (accordion18) block: header row + one row per item, two columns (title, content)
  const rows = [['Accordion (accordion18)']];

  // Get each accordion item (direct child with class 'accordion')
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));
  accordionItems.forEach((item) => {
    // Title cell: .w-dropdown-toggle > .paragraph-lg (otherwise the toggle itself)
    let titleEl = null;
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg');
      if (!titleEl) titleEl = toggle;
    }

    // Content cell: .accordion-content > * (grab the nav and its content)
    let contentEl = null;
    const nav = item.querySelector('.accordion-content');
    if (nav) {
      // Prefer the innermost .rich-text if present, otherwise all of nav
      const rt = nav.querySelector('.rich-text');
      contentEl = rt ? rt : nav;
    }

    rows.push([titleEl, contentEl]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
