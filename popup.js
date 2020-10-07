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

function isAlreadyThere(obj, existingData) {
  const { url, exact, domain, justcheck } = obj;

  let indexOfOccurence = 0;

  let isExactMatchOuter = false;
  let exactMatchIndex = -1;
  let isDomainMatchOuter = false;
  let domainMatchindex = -1;
  const isUrlThere =
    existingData.filter((elem, index) => {
      const {
        url: urlFromEach,
        exact: exactFromEach,
        entireDomain: domainFromEach,
      } = elem;

      // if(exactFromEach) {
      const isExactMatch = urlFromEach === url && exactFromEach;

      const parseEachUrl = new URL(urlFromEach);
      const parseIncomingUrl = new URL(url);

      const isDomainMatch =
        parseEachUrl.origin === parseIncomingUrl.origin && domainFromEach;

      if (isExactMatch) {
        (isExactMatchOuter = true), (exactMatchIndex = index);
      }

      if (isDomainMatch) {
        isDomainMatchOuter = true;
        domainMatchindex = index;
      }
      // if(urlFromEach === url) {
      //   indexOfOccurence = index
      // }
      // return urlFromEach === url
      // // }
      // if(domainFromEach) {
      //   const parseEachUrl = new URL(urlFromEach)
      //   const parseIncomingUrl = new URL(url)
      //   if(parseEachUrl.origin ===  parseIncomingUrl.origin) {
      //     indexOfOccurence = index
      //   }
      //   return parseEachUrl.origin ===  parseIncomingUrl.origin
      // }
      // return false
      return isExactMatch || isDomainMatch;
    }).length > 0;
  return {
    isExactMatchOuter,
    exactMatchIndex,
    isDomainMatchOuter,
    domainMatchindex,
    hasMatched: isExactMatchOuter || isDomainMatchOuter,
  };
}

/**
 * Common util end
 */

//  {
//    url: "",
//    exact: true,
//    substring: "",

//  }

// {
//   url: "",
//   exact: "true",
//   entireDomain: "true"
// }
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
// const popupBodyElem = popup-bod

let countOfPrivateTabsHidden = 0;

let countOfPrivateTabsOpen = 0;

// chrome.storage.sync.get("countOfPrivateTabsHidden", function (data) {
//   countOfPrivateTabsHidden = data.countOfPrivateTabsHidden || 0;
//   console.log("data", data);

//   renderUI();
// });

function renderUI() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const incomingUrl = tabs[0].url;
    console.log("renderUI -> incomingUrl", incomingUrl);

    // Check if the current tab is part of list of private tabs and
    // showing an indicator

    chrome.storage.sync.get("listOfPrivateTabs", function (data) {
      console.log("renderUI -> data.listOfPrivateTabs", data.listOfPrivateTabs);

      //   isExactMatchOuter,
      // exactMatchIndex,
      // isDomainMatchOuter,
      // domainMatchindex,
      // hasMatched: isExactMatchOuter || isDomainMatchOuter
      const {
        isExactMatchOuter,
        exactMatchIndex,
        isDomainMatchOuter,
        domainMatchindex,
        hasMatched,
      } = isAlreadyThere(
        {
          url: incomingUrl,
        },
        data.listOfPrivateTabs || []
      );

      console.log(
        "renderUI ->",
        isExactMatchOuter,
        exactMatchIndex,
        isDomainMatchOuter,
        domainMatchindex,
        hasMatched
      );

      const popupContainerElem = document.querySelectorAll(
        ".popup-container"
      )[0];
      console.log("renderUI -> popupContainerElem", popupContainerElem);
      // const parentpopUpBody = popupbody.parentNode.insertBefore(<div></div>, popupbody.previousSibling)

      popupContainerElem.innerHTML = `

      <div class="popup-header">
      <p>Tab Securer</p>
    </div>
    <div class="info-section">
      <div class="left-section">
        <span>Private Tabs Open</span>
        <span>${countOfPrivateTabsOpen}</span>
      </div>
      <div class="right-section">
        <span> Secured Tabs </span><span> ${countOfPrivateTabsHidden}</span>
      </div>
    </div>
    <div class="popup-body">
    <ul class="popup-body-list">
    <li ><p data-marktype="domain" id="mark-domain-private">${
      isDomainMatchOuter ? "Unmark Domain" : "Mark Domain"
    }</p></li>
   
      
      <li>
          <p data-marktype="exact" id="mark-as-private">${
            isExactMatchOuter ? "Unmark URL" : "Mark URL"
          }</p>
          ${isExactMatchOuter ? `<span>DONE</span>` : ``}
      </li>
      <li>
      <p id="hide-all-private">Hide All Private</p>
    
    </li>
    <li>
    <p id="bring-back-private">Revive Private Tabs</p>
  </li>
  <li>
          <p id="extension-settings">Settings</p>
  </li>
    </ul>
    </div>
      
        `;

      const markDomainPrivateBtn = document.getElementById(
        "mark-domain-private"
      );

      const markAsPrivateButton = document.getElementById("mark-as-private");
      const hideAllPrivateBtn = document.getElementById("hide-all-private");
      const bringBackPrivate = document.getElementById("bring-back-private");
      const extensionSettingsPage = document.getElementById(
        "extension-settings"
      );

      // chrome.runtime.getURL(
      //   `pages/suspendedpage.html?url=${tab.url}&title=${tab.title}`
      // )

      hideAllPrivateBtn.onclick = onClickHideAllPrivate;

      markAsPrivateButton.onclick = onClickMarkAsPrivate;

      markDomainPrivateBtn.onclick = onClickMarkAsPrivate;
      bringBackPrivate.onclick = onClickBringBackPrivate;
      extensionSettingsPage.onclick = onClickSetting;
    });
  });
}

function onClickSetting() {
  const url = chrome.runtime.getURL(`options.html`);
  chrome.tabs.create(
    {
      url,
    },
    () => {
      // the transition
    }
  );
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

// // Working here now
function getAllWIndowAndDetermineHowManyPagesAreOpen(callback) {
  chrome.storage.sync.get("listOfPrivateTabs", function (data) {
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
      // const extensionUrl = chrome.runtime.getURL("");
      const tabInfoArrayWhichComesUnderprivateButOpen = tabsOpenCurrently.filter(
        (tabsInfo) => {
          const {
            isExactMatchOuter,
            isDomainMatchOuter,
            hasMatched,
            exactMatchIndex,
            domainMatchindex,
          } = isAlreadyThere(
            {
              url: tabsInfo.url,
            },
            data.listOfPrivateTabs || []
          );

          return hasMatched;
        }
      );

      if (callback) {
        callback({
          tabs: tabInfoArrayWhichComesUnderprivateButOpen,
        });
      }
    });
  });
}

function updateSecuredTabsCount() {
  getAllWIndowANdGiveMetabOnWhichPagesAreHidden(({ tabs }) => {
    console.log("tabs =====xxxxx==>", tabs);
    countOfPrivateTabsHidden = tabs.length || 0;
    renderUI();
  });
}

function updatePrivateButNotSecuredCount() {
  getAllWIndowAndDetermineHowManyPagesAreOpen(({ tabs }) => {
    console.log("updatePrivateButNotSecuredCount -> tabs", tabs);
    // console.log("tabs =====xxxxx==>", tabs);
    // Here we get all the tabs which are open, useful if I want to show any modal
    // using content script

    countOfPrivateTabsOpen = tabs.length || 0;
    renderUI();
  });
}

updateSecuredTabsCount();
updatePrivateButNotSecuredCount();

// chrome.tabs.query // make use of it
function onClickMarkAsPrivate(e) {
  // {
  //   url: "",
  //   exact: "true",
  //   entireDomain: "true"
  // }

  const type = e.target.dataset.marktype; // exact , domain
  console.log("onClickMarkAsPrivate -> type", type);

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    // console.log("markAsPrivateButton.onclick -> tabs", tabs);
    // console.log(tabs[0].url);

    const incomingUrl = tabs[0].url;

    // Marking As Private logic start
    chrome.storage.sync.get("listOfPrivateTabs", function (data) {
      console.log("data ==>", data);
      let newData = [];

      let parsedIncomingUrl = new URL(incomingUrl);

      let newObject = {
        url: type === "domain" ? parsedIncomingUrl.origin : incomingUrl,
        exact: type === "exact",
        entireDomain: type === "domain",
      };

      // isUrlThere,
      // indexOfOccurence

      //   isExactMatchOuter,
      // exactMatchIndex,
      // isDomainMatchOuter,
      // domainMatchindex,
      // hasMatched: isExactMatchOuter || isDomainMatchOuter
      const {
        isExactMatchOuter,
        isDomainMatchOuter,
        hasMatched,
        exactMatchIndex,
        domainMatchindex,
      } = isAlreadyThere(newObject, data.listOfPrivateTabs || []);
      if (data.listOfPrivateTabs && !hasMatched) {
        // yourTextArea.value = data.mytext;
        newData = [...data.listOfPrivateTabs, newObject];
      } else if (!data.listOfPrivateTabs) {
        newData = [newObject];
      } else if (data.listOfPrivateTabs && hasMatched) {
        let finalIndexToNotInclude = -1;
        if (isExactMatchOuter && type === "exact") {
          finalIndexToNotInclude = exactMatchIndex;
        }
        if (isDomainMatchOuter && type === "domain") {
          finalIndexToNotInclude = domainMatchindex;
        }

        console.log(
          "onClickMarkAsPrivate -> finalIndexToNotInclude",
          finalIndexToNotInclude
        );
        if (finalIndexToNotInclude !== -1) {
          newData = data.listOfPrivateTabs.filter(
            (elem, index) => index !== finalIndexToNotInclude
          );
        } else if (!isExactMatchOuter && type === "exact") {
          newData = [...data.listOfPrivateTabs, newObject];
        } else {
          newData = [...data.listOfPrivateTabs];
        }
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

          const { hasMatched: isInPrivateTabList } = isAlreadyThere(
            {
              url,
            },
            data.listOfPrivateTabs || []
          );

          data.listOfPrivateTabs.indexOf(url) !== -1;

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
          // individualTab.favIconUrl  =
          let idTab = individualTab.id;
          chrome.tabs.update(
            individualTab.id,
            {
              url: chrome.runtime.getURL(
                `pages/suspendedpage.html?url=${individualTab.url}&title=${individualTab.title}`
              ),
            },
            (tabDone) => {
              // sending the tan to change the favicon
              console.log(tabDone);
              // const idTab = individualTab.id
              // chrome.tabs.connect

              // chrome.tabs.sendMessage(tabDone.id, {
              //   type: "change_favicon",
              //   url: tabDone.favIconUrl,
              // });
              // tabDone.favIconUrl = individualTab.favIconUrl;
              if (index === tabsToTakenActionOn.length - 1) {
                // rendering when we reach in the end of updating the tabs.
                // just an information to see the count of tabs currently saved
                // This renderUi is updateing Tabs
                // renderUI();
                // getAllWIndowANdGiveMetabOnWhichPagesAreHidden(({ tabs }) => {
                //   console.log("tabs =====xxxxx==>", tabs);
                //   countOfPrivateTabsHidden = tabs.length || 0;
                //   renderUI();
                // });
                updateSecuredTabsCount();
                updatePrivateButNotSecuredCount();
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
