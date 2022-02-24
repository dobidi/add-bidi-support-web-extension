let observer = {};
// Monitor for adding new element in DOM
const targetNode = document.querySelector('body');
const config = { childList: true, subtree: true };

const add_bidi_support = () => {
  observer.disconnect();
  const all_elements = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,input,textarea,label,pre,ul,ol");

  all_elements.forEach(element => {
    element.setAttribute("dir","auto");

    textAlignStyle = window.getComputedStyle(element)['text-align'];
    if (textAlignStyle === "left"){
      element.setAttribute("style", "text-align: start");
    }  
  });
  observer.observe(targetNode, config);
}

const main = async () => {
  const { enabled } = await browser.storage.local.get({ enabled: true });
  if (!enabled) return;
  observer = new MutationObserver(() => {
    console.log("Run add_bidi_support because of DOM update");
    add_bidi_support();
  });
  observer.observe(targetNode, config);

  // Run the main function once
  console.log("initial add_bidi_support run...");
  add_bidi_support();
};

main();
