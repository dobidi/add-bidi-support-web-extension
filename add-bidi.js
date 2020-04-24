const add_bidi_support = function() {
  const all_elements = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,a");

  all_elements.forEach(element => {
    element.setAttribute("dir","auto");

    element_style = window.getComputedStyle(element)['text-align'];
    if (element_style === "left"){
      element.setAttribute("style", "text-align: start");
    }  
  });
}

// Run the main function once
console.log("initial add_bidi_support run...");
add_bidi_support();

// Monitor for adding new element in DOM
let targetNode = document.querySelector('body');
const config = { childList: true, subtree: true };

const callback = function(mutationsList, observer) {
  console.log("Running add_bidi_support because of DOM update");
  add_bidi_support();
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
