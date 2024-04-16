/* global browser */

let observer = {};
// Monitor for adding new element in DOM
const targetNode = document.querySelector('body');
const config = { childList: true, subtree: true };

const addBidiSupport = () => {
  observer.disconnect();
  const allElements = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,input,textarea,label,pre,ul,ol');

  allElements.forEach((element) => {
    element.setAttribute('dir', 'auto');

    const textAlignStyle = window.getComputedStyle(element)['text-align'];
    if (textAlignStyle === 'left') {
      element.setAttribute('style', 'text-align: start');
    }
  });
  observer.observe(targetNode, config);
};

const main = async () => {
  const { enabled } = await browser.storage.local.get({ enabled: true });
  if (!enabled) return;

  observer = new MutationObserver(() => {
    // eslint-disable-next-line no-console
    console.log('Run add_bidi_support because of DOM update');
    addBidiSupport();
  });
  observer.observe(targetNode, config);

  // Run the main function once
  // eslint-disable-next-line no-console
  console.log('initial addBidiSupport run...');
  addBidiSupport();
};

main();
