// let changeColor = document.getElementById("changeColor");

// chrome.storage.sync.get("color", function (data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute("value", data.color);
// });

// const maptabIdToobj = {};
// function handleOnClick() {
//   console.log("handleClickGot called", maptabIdToobj);
// }

// changeColor.onclick = function (element) {
//   let color = element.target.value;
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     console.log("changeColor.onclick -> chrome.tabs", tabs);

//     tabs.forEach((elem) => {
//       maptabIdToobj[elem.id] = elem;
//     });

//     console.log(chrome.runtime.id);

//     //     active: true
//     // audible: false
//     // autoDiscardable: true
//     // discarded: false
//     // favIconUrl: "https://www.google.com/images/icons/product/chrome-32.png"
//     // height: 666
//     // highlighted: true
//     // id: 284
//     // incognito: true
//     // index: 31
//     // mutedInfo: {muted: false}
//     // pinned: false
//     // selected: true
//     // status: "complete"
//     // title: "Getting Started Tutorial - Google Chrome"
//     // url: "https://developer.chrome.com/extensions/getstarted"
//     // width: 1680
//     // windowId: 61

//     chrome.tabs.update(tabs[0].id, {
//       // url: `chrome-extension://${chrome.runtime.id}/pages/suspendedpage.html`,
//       url: chrome.runtime.getURL(
//         `pages/suspendedpage.html?url=${tabs[0].url}&title=${tabs[0].title}`
//       ),
//     });
//     // onclick='handleOnClick()'
//     // function handleOnClick() {
//     //   chrome.runtime.sendMessage({greeting: ${JSON.stringify(
//     //     tabs[0]
//     //   )}}, function(response) {
//     //     console.log(response.farewell);
//     //   });
//     // }

//     // chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//     //   console.log(response.farewell);
//     // });

//     // document.body.style.backgroundColor = "${color}";
//     // var domparser = new DOMParser();
//     // var doc = domparser.parseFromString("<div>There you go boy ${tabs[0].title}</div>", "text/html")
//     // document.body = doc.body

//     // chrome.tabs.executeScript(tabs[0].id, {
//     //   code: `

//     //   `,
//     // });
//   });
// };

// document.addEventListener("DOMContentLoaded", function () {

/**
 * Common utils start
 */

function isAlreadyThere(url, existingData) {
  return existingData.filter((elem) => elem === url).length > 0;
}

/**
 * Common util end
 */

let popupOptionsListTemplate = `
<li>
  <p id="mark-as-private">Mark As Private</p>
  <span>⭐</span>
</li>
<li>
  <p>Hide All Private</p>
</li>
<li>
  <p>Bring Back Private</p>
</li>
`;

const popupBodyList = document.querySelectorAll(".popup-body-list")[0];

let countOfPrivateTabsHidden = 0;

// chrome.storage.sync.get("countOfPrivateTabsHidden", function (data) {
//   countOfPrivateTabsHidden = data.countOfPrivateTabsHidden || 0;
//   console.log("data", data);

//   renderUI();
// });

function renderUI() {
  let hideAllprivate = `
  <li>
  <p id="hide-all-private">Hide All Private</p>
</li>
  `;

  let bringbackPrivate = `
  <li>
  <p>Bring Back Private</p>
</li>
  `;

  let markAsPrivateDefault = `
  <li>
      <p id="mark-as-private">Mark As Private</p>
      <span>⭐</span>
  </li>
  `;
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const incomingUrl = tabs[0].url;
    console.log("renderUI -> incomingUrl", incomingUrl);

    // Check if the current tab is part of list of private tabs and
    // showing an indicator

    chrome.storage.sync.get("listOfPrivateTabs", function (data) {
      console.log("renderUI -> data.listOfPrivateTabs", data.listOfPrivateTabs);

      const isAlreadyThereInfo =
        data.listOfPrivateTabs &&
        isAlreadyThere(incomingUrl, data.listOfPrivateTabs || []);

      // if(
      //   data.listOfPrivateTabs &&
      //   isAlreadyThere(incomingUrl, data.listOfPrivateTabs || [])
      // ) {
      // console.log("is there already");
      popupBodyList.innerHTML = `
        <li>
            <p id="mark-as-private">${
              isAlreadyThereInfo ? "Remove from Private" : "Mark As Private"
            }</p>
            ${isAlreadyThereInfo ? `<span>DONE</span>` : ``}
        </li>
        <li>
        <p id="hide-all-private">Hide All Private</p>
       ${
         countOfPrivateTabsHidden
           ? `<span>Tabs Secured ${countOfPrivateTabsHidden}<span>`
           : ``
       } 
      </li>
      <li>
      <p id="bring-back-private">Bring Back Private</p>
    </li>
        `;
      // } else {
      //   popupBodyList.innerHTML = `
      //   <li>
      //       <p id="mark-as-private">Mark As Private</p>
      //   </li>
      //     ${hideAllprivate}
      //     ${bringbackPrivate}
      //   `;
      // }
      const markAsPrivateButton = document.getElementById("mark-as-private");
      const hideAllPrivateBtn = document.getElementById("hide-all-private");
      const bringBackPrivate = document.getElementById("bring-back-private");

      hideAllPrivateBtn.onclick = onClickHideAllPrivate;

      markAsPrivateButton.onclick = onClickMarkAsPrivate;

      bringBackPrivate.onclick = onClickBringBackPrivate;
    });
  });
}

// updating the active tab which were marked private and now in hidden

function getAllWIndowANdGiveMetabOnWhichPagesAreHidden(callback) {
  chrome.windows.getAll({ populate: true }, function (windows) {
    let tabsOpenCurrently = [];
    windows.forEach(function (window) {
      console.log("onClickHideAllPrivate -> window", window);
      tabsOpenCurrently = [...tabsOpenCurrently, ...window.tabs];
      // window.tabs.forEach(function (tab) {
      //   //collect all of the urls here, I will just log them instead
      //   console.log(tab.url);
      // });
    });
    console.log("tabsOpenCurrently", tabsOpenCurrently);
    const extensionUrl = chrome.runtime.getURL("");
    const tabInfoArrayWhichhaveExtensionPlaceHolderActive = tabsOpenCurrently.filter(
      (tabsInfo) => {
        return tabsInfo.url.startsWith(extensionUrl);
      }
    );

    if (callback) {
      callback({
        tabs: tabInfoArrayWhichhaveExtensionPlaceHolderActive,
      });
    }
  });
}

getAllWIndowANdGiveMetabOnWhichPagesAreHidden(({ tabs }) => {
  console.log("tabs =====xxxxx==>", tabs);
  countOfPrivateTabsHidden = tabs.length || 0;
  renderUI();
});

// chrome.tabs.query // make use of it
function onClickMarkAsPrivate(e) {
  // console.log("event got triggered", e);
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    // console.log("markAsPrivateButton.onclick -> tabs", tabs);
    // console.log(tabs[0].url);

    const incomingUrl = tabs[0].url;

    // Marking As Private logic start
    chrome.storage.sync.get("listOfPrivateTabs", function (data) {
      console.log("data ==>", data);
      let newData = [];

      if (
        data.listOfPrivateTabs &&
        !isAlreadyThere(incomingUrl, data.listOfPrivateTabs || [])
      ) {
        // yourTextArea.value = data.mytext;
        newData = [...data.listOfPrivateTabs, incomingUrl];
      } else if (!data.listOfPrivateTabs) {
        newData = [incomingUrl];
      } else if (
        data.listOfPrivateTabs &&
        isAlreadyThere(incomingUrl, data.listOfPrivateTabs || [])
      ) {
        newData = data.listOfPrivateTabs.filter((elem) => elem !== incomingUrl);
      }
      chrome.storage.sync.set({
        listOfPrivateTabs: newData,
      });
      renderUI();
    });
  });
}

// https://developers.chrome.com/extensions/overview
function onClickHideAllPrivate() {
  // get all the tabs open currently
  // console.log("chrome.runtime.getURL(string path)", chrome.runtime.getURL(""));
  chrome.windows.getAll({ populate: true }, function (windows) {
    console.log("onClickHideAllPrivate -> windows", windows);
    let tabsOpenCurrently = [];

    // multiple windows can be there
    windows.forEach(function (window) {
      console.log("onClickHideAllPrivate -> window", window);
      tabsOpenCurrently = [...tabsOpenCurrently, ...window.tabs];
      // window.tabs.forEach(function (tab) {
      //   //collect all of the urls here, I will just log them instead
      //   console.log(tab.url);
      // });
    });
    // I have got hold of all the open tabs
    // nopw i need to pick the tabs marked as private

    chrome.storage.sync.get("listOfPrivateTabs", function (data) {
      console.log("onClickHideAllPrivate -> data", data);

      let newData = [];
      // let count = 0;
      if (data.listOfPrivateTabs) {
        const tabsToTakenActionOn = tabsOpenCurrently.filter((tabInfo) => {
          const { url } = tabInfo;
          const parseURLObj = new URL(url);

          const isInPrivateTabList = data.listOfPrivateTabs.indexOf(url) !== -1;

          if (isInPrivateTabList) {
            // countOfPrivateTabsHidden++;
            return true;
          }
          return false;
        });

        // countOfPrivateTabsHidden
        console.log(
          "onClickHideAllPrivate -> countOfPrivateTabsHidden",
          countOfPrivateTabsHidden
        );

        // chrome.storage.sync.set({
        //   countOfPrivateTabsHidden,
        // });
        // console.log("count ==>", countOfPrivateTabsHidden, tabsToTakenActionOn);
        tabsToTakenActionOn.forEach((individualTab, index) => {
          console.log(`suspending for ${individualTab.url}`);
          chrome.tabs.update(
            individualTab.id,
            {
              url: chrome.runtime.getURL(
                `pages/suspendedpage.html?url=${individualTab.url}&title=${individualTab.title}`
              ),
            },
            () => {
              if (index === tabsToTakenActionOn.length - 1) {
                // rendering when we reach in the end of updating the tabs.
                // just an information to see the count of tabs currently saved
                // This renderUi is updateing Tabs
                // renderUI();
                getAllWIndowANdGiveMetabOnWhichPagesAreHidden(({ tabs }) => {
                  console.log("tabs =====xxxxx==>", tabs);
                  countOfPrivateTabsHidden = tabs.length || 0;
                  renderUI();
                });
              }
            }
          );
        });
      }
      //       id: 1055
      // incognito: true
      // index: 34
      // chrome.tabs.update(integer tabId, object updateProperties, function callback)

      // chrome.tabs.update(tab.id, {
      //   url: chrome.runtime.getURL(
      //     `pages/suspendedpage.html?url=${tab.url}&title=${tab.title}`
      //   ),
      // });
    });
  });
}

function onClickBringBackPrivate() {
  getAllWIndowANdGiveMetabOnWhichPagesAreHidden(({ tabs }) => {
    console.log("onClickBringBackPrivate -> tabs", tabs);
    countOfPrivateTabsHidden = tabs.length || 0;
    renderUI();
    tabs.forEach((tabInfo) => {
      const { url, id } = tabInfo;
      const urlObj = new URL(url);
      const search = urlObj.search;

      const searchParamObj = {};
      const searchParams = new URLSearchParams(search);
      for (let p of searchParams) {
        console.log(p);
        searchParamObj[p[0]] = p[1];
      }

      const { url: urlToUpdate, title: titleToUpdate } = searchParamObj;

      chrome.tabs.update(id, {
        url: urlToUpdate,
        // title: titleToUpdate,
      });
    });
  });
}

// Triggers

renderUI();

// });
