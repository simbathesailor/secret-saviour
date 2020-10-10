// First event

// If you define default_popup in manifest, you cannot use chrome.browserAction.onClicked.addListener method,
// it will throw error
// chrome.browserAction.onClicked.addListener(buttonClicked);

// function buttonClicked() {
//   console.log("button is clicked in buttonclicked handler");
// }

// You can send the message from all the tab or unique tab using

// let msg: {
//   txt: "hello"
// }

// chrome.tabs.sendMessage(tab.id, msg)

chrome.runtime.onInstalled.addListener(function () {
  // chrome.storage.sync.set({ color: "#3aa757" }, function () {
  //   console.log("The color is green.");
  // });

  // if (chrome.declarativeContent.onPageChanged) {
  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
  //   chrome.declarativeContent.onPageChanged.addRules([
  //     {
  //       conditions: [
  //         // new chrome.declarativeContent.PageStateMatcher({
  //         //   pageUrl: { pathContains: "", },
  //         // }),
  //         new chrome.declarativeContent.PageStateMatcher({
  //           pageUrl: { urlPrefix: "https://" },
  //         }),
  //         new chrome.declarativeContent.PageStateMatcher({
  //           pageUrl: { urlPrefix: "http://" },
  //         }),
  //       ],
  //       actions: [new chrome.declarativeContent.ShowPageAction()],
  //     },
  //   ]);
  // });
  // }

  chrome.runtime.onMessage.addListener(function (message, sender, callback) {
    console.log("sender", sender);
    console.log("message", message);

    if (message.type === "trigger_redirection_tosuspended_page") {
      // I need to create the redirection link for the
      const { tab } = sender;

      // FOr not i have to give some amount of timeout to show notification
      setTimeout(() => {
        chrome.tabs.update(tab.id, {
          url: chrome.runtime.getURL(
            `pages/suspendedpage.html?url=${tab.url}&title=${tab.title}`
          ),
        });
      }, 4000);

      var opt = {
        iconUrl: "images/get_started32.png",
        type: "list",
        title: "Primary Title",
        message: "Primary message to display",
        priority: 1,
        items: [
          { title: "Item1", message: "This is item 1." },
          { title: "Item2", message: "This is item 2." },
          { title: "Item3", message: "This is item 3." },
        ],
      };
      // chrome.notifications.create(`${Math.random()}`, opt, function callback() {
      //   console.log("created!");
      //   console.log("Last error:", chrome.runtime.lastError);
      // });
    }
    if (message == "reload") {
      chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="orange"',
      });
    }
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // console.log("tabId, changeInfo,tab", tabId, changeInfo, tab);
  });

  // chrome.runtime.onInstalled.addListener(function () {
  //   chrome.contextMenus.create({
  //     id: "sampleContextMenu",
  //     title: "Sample Context Menu",
  //     contexts: ["selection"],
  //   });
  // });

  // chrome.contextMenus.create({
  //   id: "sampleContextMenu",
  //   title: "Sample Context Menu",
  //   contexts: ["selection"], // only show context menu on selection
  // });

  // // You can have more options to add the context menus. check the documentation  for
  // // chrome.contextMenus

  // chrome.contextMenus.onClicked.addListener(() => {
  //   console.log("context menu clicked");
  // });

  // This will run when a bookmark is created. need permission
  // chrome.bookmarks.onCreated.addListener(function () {
  //   // do something
  // });
});

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log(
//     sender.tab
//       ? "from a content script:" + sender.tab.url
//       : "from the extension"
//   );
//   if (request.greeting == "hello") sendResponse({ farewell: "goodbye" });
// });

// Do not register listeners asynchronously
