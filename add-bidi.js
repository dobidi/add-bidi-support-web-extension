const all_elements = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,a");

all_elements.forEach(element => {
  element.setAttribute("dir","auto");

  element_style = window.getComputedStyle(element)['text-align'];
  if (element_style === "left"){
    element.setAttribute("style", "text-align: start");
  }  
});