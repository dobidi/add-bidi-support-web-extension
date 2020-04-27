let observer = {};
// Monitor for adding new element in DOM
const targetNode = document.querySelector('body');
const config = { childList: true, subtree: true };

const add_bidi_support = () => {
  observer.disconnect();
  const all_elements = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,a");

  all_elements.forEach(element => {
    element.setAttribute("dir","auto");

    element_style = window.getComputedStyle(element)['text-align'];
    if (element_style === "left"){
      element.setAttribute("style", "text-align: start");
    }  
  });
  observer.observe(targetNode, config);
}

const callback = () => {
  console.log("Run add_bidi_support because of DOM update");
  add_bidi_support();
};

observer = new MutationObserver(callback);
observer.observe(targetNode, config);

// Run the main function once
console.log("initial add_bidi_support run...");
let last_process_time = Date.now();
add_bidi_support();