let observer = {};
// Monitor for adding new element in DOM
const targetNode = document.querySelector('body');
const config = { childList: true, subtree: true };

const add_bidi_support = () => {
  observer.disconnect();
  const all_elements = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,input,textarea,label,pre,ul,ol,li");

  all_elements.forEach(element => {
    element.setAttribute("dir","auto");

    element_style = window.getComputedStyle(element)['text-align'];
    if (element_style === "left"){
      element.setAttribute("style", "text-align: start");
    }  
  });
  observer.observe(targetNode, config);
}

<<<<<<< HEAD
<<<<<<< HEAD
const callback = () => {
  console.log("Run add_bidi_support because of DOM update");
=======
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
>>>>>>> hkalbasi/bidi-support-firefox-extension-master
  add_bidi_support();
=======
// Run the main function once
console.log("initial add_bidi_support run...");
let last_process_time = Date.now();
add_bidi_support();

// Monitor for adding new element in DOM
let targetNode = document.querySelector('body');
const config = { childList: true, subtree: true };

const callback = function(mutationsList, observer) {
  // preventing processing for too quick updates
  const since_last_process = Date.now() - last_process_time;
  const update_gap = 1000;
  if (since_last_process > update_gap){
    console.log("Run add_bidi_support because of DOM update");
    add_bidi_support();
    last_process_time = Date.now();
  } else {
    // make sure the last update wouldn't be missed due to quick update
    setTimeout(callback, update_gap);
    console.log(`Reject add bidi: fast updates in ${since_last_process} ms!`)    
  }
  
>>>>>>> reduce update gap time
};

main();