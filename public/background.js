// contains background scripts that either run upon load, or listen for event triggers.  Effective background scripts stay dormant until an event they are listening for fires, react with specified instructions, then unload.

//this exists on the window level of the web page, not the DOM

console.log("background script is running");
console.log("Always feed your favourite Code Monkeys");


chrome.action.onClicked.addListener(async (msg, sender) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  chrome.tabs.sendMessage(tab.id || 0, { msg: "togglePopup" });
  console.log("message sent: ", msg);
});

// chrome.action.onClicked.addListener ( (tab) => {
//     const [tab] = await chrome.tabs.query({
//         active: true,
//         currentWindow: true,
//       });

//       chrome.scripting.executeScript({
//         target: {tabId: tab.id || 0},
//         files: ['popup.js']
//       });
//     console.log('popup loaded');
// });