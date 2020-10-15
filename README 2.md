# Tab Manager

<h2  align="center">Tab manager in progress </h2>

### Links

Fast forward it.

1. Tab manager to suspend tabs, all tabs or filte tabs
2. Tagging the tab and easy search
3. Showing the usage stats for the user
4. shortcuts like
5. Hide other tabs which are open

Research about how to make devtools:

command + tab
jumping across tabs

https://developer.chrome.com/extensions/manifest

https://developer.chrome.com/extensions/getstarted

https://developer.chrome.com/extensions/single_purpose

## High level overview

1. There can be options page.
2. Options pages can be debugged using background.js file. This background.js file need to be configured in manifest.json
3. There can be something like on click of extension icon beside chrome url header. It can pe popup like when you click on reactjs extension on top. The UI for this is kept in popup.html.
4. default_icon field in top can

Learn

Content scripts run on matched url and has acccess to documents, its debug in in devtool console on the page

Example:

<!-- "content_scripts": [
    {
      "matches": ["https://developer.chrome.com/*"],
      "js": ["pages/suspendedpage.js"]
    }
  ] -->

It will run on all the pages which matches the matches

background script runs when the browser isopen and wait for events from the content scripts is something. It has the debug somewhere else. CLick on inspect view in extensions

A pop always a new when you open. Popup can be deeugged by right clicking on pop up

background => scope A
content-scripts => scope B // this only kow about content on the page
popup => scope C // cannot know any thing in the content automatically

In pop you can get tabs

chrome.tabs.getCurrent(callback) ❌,
funtion callback(tab) {

}

In pop you can get tabs
chrome.tabs.query({active: true, currentWindow: true}, callback) ✅,
funtion callback(tabs) {
tabs
}

From popup also you can send message to content scripts

using same

chrome.tabs.sendMessage(tabId, msg) // msg is anything serializable

Multiple background scripts can be registered for modularized code.

https://developer.chrome.com/extensions/override

## Catch 1

The only occasion to keep a background script persistently active is if the extension uses chrome.webRequest API to block or modify network requests. The webRequest API is incompatible with non-persistent background pages

You can respond to the events from various places, background files, popup or content scripts e.g

```js
chrome.runtime.onMessage.addListener(function(message, callback) {
    if (message.data == “setAlarm”) {
      chrome.alarms.create({delayInMinutes: 5})
    } else if (message.data == “runLogic”) {
      chrome.tabs.executeScript({file: 'logic.js'});
    } else if (message.data == “changeColor”) {
      chrome.tabs.executeScript(
          {code: 'document.body.style.backgroundColor="orange"'});
    };
  });
```

Data has to persisted at timesso that information is not lost, even if the extension crashes.

Make use of storage API for that. It's similar to other storage API on web, but asynchronous

chrome.storage.local.set({variable: variableInformation});

If an extension uses message passing, ensure all ports are closed.

e.g

```js
chrome.runtime.onMessage.addListener(function (message, callback) {
  if (message == "hello") {
    sendResponse({ greeting: "welcome!" });
  } else if (message == "goodbye") {
    chrome.runtime.Port.disconnect();
  }
});
```

Life time of extension can be seen , by looking at task managers

For last minute cleanup, similar to useEffect return statments , make use of below code

## Very great set of boilerplate

https://github.com/googlearchive/devtools-extension-boilerplate

```js
chrome.runtime.onSuspend.addListener(function () {
  console.log("Unloading.");
  chrome.browserAction.setBadgeText({ text: "" });
});
```

manifest is verry very important to get it right:
https://developer.chrome.com/extensions/manifest

## Devtools:

https://developer.chrome.com/extensions/devtools_panels

Each extension panel and sidebar is displayed as a separate HTML page. All extension pages displayed in the Developer Tools window have access to all modules in chrome.devtools API, as well as to chrome.extension API. Other extension APIs are not available to the pages within Developer Tools window, but you may invoke them by sending a request to the background page of your extension, similarly to how it's done in the content scripts.

Video Link:

https://www.youtube.com/watch?v=YQnRSa8MGwM

// Used code

"content_scripts": [
{
"matches": ["https://developer.chrome.com/*"],
"js": ["pages/suspendedpage.js"]
}
]

"devtools_page": "devtools/devtools.html",

<!--
  "permissions": [
    "tabs",
    "activeTab",
    "storage",
    "contextMenus",
    "notifications",
    "declarativeContent"
  ], -->
