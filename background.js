// contains background scripts that either run upon load, or listen for event triggers.  Effective background scripts stay dormant until an event they are listening for fires, react with specified instructions, then unload.



// consider using Storage.api for chrome instead of localStorage. Storage will automatically sync across devices the user is logged into. Data will be stored as objects (localStorage api saves as strings)

chrome.runtime.onInstalled.addListener(function() {
    alert('Clipper Experience Courtesy of Your Favourite Code Monkies')

chrome.tabs.create ({
    url:'https://mail.google.com',
    active: true
})
return false
})