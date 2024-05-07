/* global browser */

const tagsToProcess = new Set([
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'P',
  'A',
  'INPUT',
  'TEXTAREA',
  'LABEL',
  'PRE',
  'UL',
  'OL',
]);

const cssSelectorToProcess = Array.from(tagsToProcess)
  .map((tag) => `${tag.toLowerCase()}:not([dir])`)
  .join(', ');

const addBidiSupport = (element) => {
  element.setAttribute('dir', 'auto');

  const textAlignStyle = window.getComputedStyle(element)['text-align'];
  if (textAlignStyle === 'left') {
    element.setAttribute('style', 'text-align: start');
  }
};

const addBidiSupportToExisitingElements = () => {
  const allElements = document.querySelectorAll(cssSelectorToProcess);
  allElements.forEach((element) => addBidiSupport(element));
};

const main = async () => {
  const { active } = await browser.storage.local.get('active');
  if (!active) return;

  addBidiSupportToExisitingElements();

  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((addedNode) => {
        if (addedNode.nodeType === Node.ELEMENT_NODE) {
          addedNode.querySelectorAll(cssSelectorToProcess).forEach((element) => {
            addBidiSupport(element);
          });
        }
      });
    });
  });

  observer.observe(
    document.querySelector('body'),
    { childList: true, subtree: true },
  );
};

main();
