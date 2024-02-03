/*global chrome */

//content script runs on the DOM level, and is the only script that can access these elements.

console.log("content script is injected");
console.log("Clipper Experience Courtesy of Your Favourite Code Monkeys");

let iframeVisibilityOff = true;

let pos1 = 0,
  pos2 = 0,
  pos3 = 0,
  pos4 = 0;

//handles messages from background script, to toggle iframe on/off
const togglePopup = (msg, sender) => {
  console.log("[content.js]. Action Button message received", msg);

  if (msg.msg === "togglePopup") {
    iframeVisibilityOff = !iframeVisibilityOff;
    console.log("turn on/off popup initiated");
    if (iframeVisibilityOff) iframeWrapper.style.display = "none";
    if (!iframeVisibilityOff) iframeWrapper.style.display = "block";
  }

  console.log("iframeVisibilityOff: ", iframeVisibilityOff);
};
chrome.runtime.onMessage.addListener(togglePopup);

//functionality for 'x' icon to close extension
const closePopup = () => {
  iframeVisibilityOff = true;
  iframeWrapper.style.display = "none";
};

//Listens for messages from ProductForm, and sets requested data in storage
const messagesFromReactAppListener = (msg, sender) => {
  console.log("[content.js] Message received ", msg);

  document.addEventListener("click", (e) => {
    let DOMValue;

    if (msg.msg === "getInnerText") DOMValue = e.target.innerText;
    // toggle()

    if (msg.msg === "getImageUrl") DOMValue = e.target.getAttribute("src");
    // toggle()

    console.log("[content.js] I set some data! ", msg, DOMValue);

    chrome.storage.local.set({ [msg.msg]: DOMValue });
  });
};
 //Fired when a message is sent from an extension process or a content script.  In our case, we are listening for a message from the productForm
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);


//creates <div> for iframe to sit in
const iframeWrapper = document.createElement("div");
// iframeWrapper.style.all='unset';
iframeWrapper.setAttribute("id", "#Iframe123");
iframeWrapper.style.background = "#ffffff";
iframeWrapper.style.height = "550px";
iframeWrapper.style.width = "425px";
iframeWrapper.style.position = "fixed";
iframeWrapper.style.top = 0;
iframeWrapper.style.right = 0;
iframeWrapper.style.display = "none";
iframeWrapper.style.cursor = "pointer";
iframeWrapper.style.zIndex = "2147483647";
iframeWrapper.style.border = "1px solid black";
iframeWrapper.style.borderRadius ='8px';
document.body.appendChild(iframeWrapper);


//creates draggable header at top of iframeWrapper
const iframeHeader = document.createElement("div");
iframeHeader.style.height = "3rem";
iframeHeader.style.position = "absolute";
iframeHeader.style.top = 0;
iframeHeader.style.width = "100%";
iframeHeader.style.display = "flex";
iframeHeader.style.justifyContent = "space-between";
iframeHeader.style.alignItems = "center";
iframeHeader.style.padding = "0 0.75rem";
iframeHeader.style.fontWeight = "bold";
iframeHeader.style.borderBottom = "1px solid black";
iframeWrapper.appendChild(iframeHeader);

//creates Logo
const logo = document.createElement('img')
logo.src = chrome.runtime.getURL("assets/images/fhLogo.png")
logo.style.height = '1.75rem';
logo.onerror = function handleError() {
  console.log('image could not be loaded')
  logo.style.display = 'none'
}
iframeHeader.appendChild(logo)


const title = document.createElement('p');
title.innerText = "Fülhaus: Design Clipper";
iframeHeader.appendChild(title)


//creates iframe
const iframe = document.createElement("iframe");
// iframe.style.all='unset';
iframe.style.background = "#80AAD7";
iframe.style.height = "calc(100% - 3rem)";
iframe.style.width = "100%";
iframe.style.position = "absolute";
iframe.style.bottom = 0;
iframe.style.left = 0;
iframe.style.right = 0;
iframe.style.zIndex = "5";
iframe.border = "none";
iframe.setAttribute(
  "sandbox",
  "allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
);
iframe.src = chrome.runtime.getURL("index.html");
iframe.style.borderRadius ='0px 0px 8px 8px';
iframeWrapper.appendChild(iframe);


//creates close icon in iframeHeader
const closeIframeIcon = document.createElement("span");
closeIframeIcon.innerText = "X";
closeIframeIcon.style.fontSize = "1rem";
closeIframeIcon.addEventListener("click", closePopup);
iframeHeader.appendChild(closeIframeIcon);




//handles drag event for iframe window
const handleMouseDown = (e) => {
  e = e || window.event;
  e.preventDefault();
  e.stopPropagation();
  pos3 = e.clientX;
  pos4 = e.clientY;
  iframeWrapper.onmouseup = handleDragEnd;
  // call a function whenever the cursor moves:
  iframeWrapper.onmousemove = handleDrag;
};

const handleDrag = (e) => {
  e = e || window.event;
  e.preventDefault();
  // calculate the new cursor position:
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;
  // set the element's new position:
  iframeWrapper.style.top = iframeWrapper.offsetTop - pos2 + "px";
  iframeWrapper.style.left = iframeWrapper.offsetLeft - pos1 + "px";
};

const handleDragEnd = () => {
  console.log("inside handleDragEnd");
  /* stop moving when mouse button is released:*/
  iframeWrapper.onmouseup = null;
  iframeWrapper.onmousemove = null;
};

//listens for mouse event to trigger function(s) to drag extension window
iframeWrapper.addEventListener("mousedown", handleMouseDown);