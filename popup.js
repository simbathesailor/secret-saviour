// document.addEventListener("DOMContentLoaded", function () {

/**
 * Common utils start
 */

/**
 * Ga specific section below
 *
 * @var {[type]}
 */
var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-180247743-1"]);
_gaq.push(["_trackPageview"]);

(function () {
  var ga = document.createElement("script");
  ga.type = "text/javascript";
  ga.async = true;
  ga.src = "https://ssl.google-analytics.com/ga.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(ga, s);
})();

/**
 * Ga specific section above
 *
 * @var {[type]}
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

      if (!urlFromEach || !url) {
        return false;
      }
      // if(exactFromEach) {
      const isExactMatch = urlFromEach === url && exactFromEach;

      const parseEachUrl = new URL(urlFromEach);
      const parseIncomingUrl = new URL(url);

      const isDomainMatch =
        parseEachUrl.origin === parseIncomingUrl.origin && domainFromEach;

      if (isExactMatch) {
        isExactMatchOuter = true;
        exactMatchIndex = index;
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

const popupBodyList = document.querySelectorAll(".popup-body-list")[0];
// const popupBodyElem = popup-bod

let countOfPrivateTabsHidden = 0;

let countOfPrivateTabsOpen = 0;

let isCurrentTabPrivate = false;

function renderUI() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const incomingUrl = tabs[0].url;

    // Check if the current tab is part of list of private tabs and
    // showing an indicator

    const ExcludeListRegex = [
      /^chrome-extension:\/\//,
      /^chrome:\/\/extensions/,
      /^chrome:\/\/newtab\//,
    ];

    let isValid = true;

    ExcludeListRegex.forEach((elem) => {
      if (elem.test(incomingUrl)) {
        isValid = false;
      }
    });

    chrome.storage.sync.get("listOfPrivateTabs", function (data) {
      // console.log("renderUI -> data.listOfPrivateTabs", data.listOfPrivateTabs);

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

      const popupContainerElem = document.querySelectorAll(
        ".popup-container"
      )[0];

      // const parentpopUpBody = popupbody.parentNode.insertBefore(<div></div>, popupbody.previousSibling)

      //   if(!isValid) {
      //     popupContainerElem.innerHTML = `

      //     <div class="popup-header">
      //     <p>Tab Securer</p>

      //   </div>
      //   <div class="info-section">
      //     <div class="left-section">
      //       <span>Private Tabs Open</span>
      //       <span>${countOfPrivateTabsOpen}</span>
      //     </div>
      //     <div class="right-section">
      //       <span> Secured Tabs </span><span> ${countOfPrivateTabsHidden}</span>
      //     </div>
      //   </div>
      //   <div class="popup-body">
      //   <ul class="popup-body-list">

      //     <li>
      //     <p id="hide-all-private">Hide All Private</p>

      //   </li>
      //   <li>
      //   <p id="bring-back-private">Revive Private Tabs</p>
      // </li>
      // <li>
      //         <p id="extension-settings">Settings</p>
      // </li>
      //   </ul>
      //   </div>

      //     `

      //   }

      popupContainerElem.innerHTML = `

      <div class="popup-header">
      <p>Tab Securer</p>
      ${isCurrentTabPrivate && isValid ? `<span id="private-tag">P</span>` : ``}
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
    ${
      isValid
        ? `
      <li ><p data-marktype="domain" id="mark-domain-private">${
        isDomainMatchOuter ? "Unmark Domain" : "Mark Domain"
      }</p></li>
     
      `
        : ``
    }
    
    ${
      isValid
        ? `
      <li>
          <p data-marktype="exact" id="mark-as-private">${
            isExactMatchOuter ? "Unmark URL" : "Mark URL"
          }</p>
          ${isExactMatchOuter ? `<span>DONE</span>` : ``}
      </li>
      `
        : ``
    }
      
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

      if (hideAllPrivateBtn) {
        hideAllPrivateBtn.onclick = onClickHideAllPrivate;
      }

      if (markAsPrivateButton) {
        markAsPrivateButton.onclick = onClickMarkAsPrivate;
      }

      if (markDomainPrivateBtn) {
        markDomainPrivateBtn.onclick = onClickMarkAsPrivate;
      }

      if (bringBackPrivate) {
        bringBackPrivate.onclick = onClickBringBackPrivate;
      }

      if (extensionSettingsPage) {
        extensionSettingsPage.onclick = onClickSetting;
      }
    });
  });
}

function onClickSetting() {
  _gaq.push(["_trackEvent", "Settings", "clicked"]);
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
      // console.log("onClickHideAllPrivate -> window", window);
      tabsOpenCurrently = [...tabsOpenCurrently, ...window.tabs];
    });
    // console.log("tabsOpenCurrently", tabsOpenCurrently);
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
        // console.log("onClickHideAllPrivate -> window", window);
        tabsOpenCurrently = [...tabsOpenCurrently, ...window.tabs];
        // window.tabs.forEach(function (tab) {
        //   //collect all of the urls here, I will just log them instead
        //   console.log(tab.url);
        // });
      });
      // console.log("tabsOpenCurrently", tabsOpenCurrently);
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
    // console.log("tabs =====xxxxx==>", tabs);
    countOfPrivateTabsHidden = tabs.length || 0;
    renderUI();
  });
}

function updatePrivateButNotSecuredCount() {
  getAllWIndowAndDetermineHowManyPagesAreOpen(({ tabs }) => {
    // console.log("updatePrivateButNotSecuredCount -> tabs", tabs);
    // console.log("tabs =====xxxxx==>", tabs);
    // Here we get all the tabs which are open, useful if I want to show any modal
    // using content script

    countOfPrivateTabsOpen = tabs.length || 0;
    renderUI();
  });
}

function updateThePrivateTag() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const incomingUrl = tabs[0].url;
    chrome.storage.sync.get("listOfPrivateTabs", function (data) {
      let parsedIncomingUrl = new URL(incomingUrl);

      let newObject = {
        url: incomingUrl,
      };
      const { hasMatched } = isAlreadyThere(
        newObject,
        data.listOfPrivateTabs || []
      );

      if (hasMatched) {
        isCurrentTabPrivate = true;
      } else {
        isCurrentTabPrivate = false;
      }
      renderUI();
    });
  });
}
updateThePrivateTag();

// chrome.tabs.query // make use of it
function onClickMarkAsPrivate(e) {
  // {
  //   url: "",
  //   exact: "true",
  //   entireDomain: "true"
  // }

  const type = e.target.dataset.marktype; // exact , domain

  _gaq.push(["_trackEvent", `mark / unmark private (${type})`, "clicked"]);
  // console.log("onClickMarkAsPrivate -> type", type);

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    // console.log("markAsPrivateButton.onclick -> tabs", tabs);
    // console.log(tabs[0].url);

    const incomingUrl = tabs[0].url;

    // Marking As Private logic start
    chrome.storage.sync.get("listOfPrivateTabs", function (data) {
      // console.log("data ==>", data);
      let newData = [];

      let parsedIncomingUrl = new URL(incomingUrl);

      let newObject = {
        url: type === "domain" ? parsedIncomingUrl.origin : incomingUrl,
        exact: type === "exact",
        entireDomain: type === "domain",
        favIconUrl: tabs[0].favIconUrl,
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

        // console.log(
        //   "onClickMarkAsPrivate -> finalIndexToNotInclude",
        //   finalIndexToNotInclude
        // );
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
      updateSecuredTabsCount();
      updatePrivateButNotSecuredCount();
      updateThePrivateTag();

      // renderUI();
    });
  });
}

// https://developers.chrome.com/extensions/overview
function onClickHideAllPrivate() {
  _gaq.push(["_trackEvent", "hide all private", "clicked"]);
  // get all the tabs open currently
  // console.log("chrome.runtime.getURL(string path)", chrome.runtime.getURL(""));
  chrome.windows.getAll({ populate: true }, function (windows) {
    // console.log("onClickHideAllPrivate -> windows", windows);
    let tabsOpenCurrently = [];

    // multiple windows can be there
    windows.forEach(function (window) {
      // console.log("onClickHideAllPrivate -> window", window);
      tabsOpenCurrently = [...tabsOpenCurrently, ...window.tabs];
      // window.tabs.forEach(function (tab) {
      //   //collect all of the urls here, I will just log them instead
      //   console.log(tab.url);
      // });
    });
    // I have got hold of all the open tabs
    // nopw i need to pick the tabs marked as private

    chrome.storage.sync.get("listOfPrivateTabs", function (data) {
      // console.log("onClickHideAllPrivate -> data", data);

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
            return true;
          }
          return false;
        });
        tabsToTakenActionOn.forEach((individualTab, index) => {
          chrome.tabs.update(
            individualTab.id,
            {
              url: chrome.runtime.getURL(
                `pages/suspendedpage.html?url=${individualTab.url}&title=${individualTab.title}`
              ),
            },
            (tabDone) => {
              if (index === tabsToTakenActionOn.length - 1) {
                updateSecuredTabsCount();
                updatePrivateButNotSecuredCount();
                updateSecuredTabsCount();
              }
            }
          );
          // }
        });
      }
    });
  });
}

function onClickBringBackPrivate() {
  _gaq.push(["_trackEvent", "bring-back-tabs", "clicked"]);
  getAllWIndowANdGiveMetabOnWhichPagesAreHidden(({ tabs }) => {
    // console.log("onClickBringBackPrivate -> tabs", tabs);
    countOfPrivateTabsHidden = tabs.length || 0;
    renderUI();
    tabs.forEach((tabInfo, index) => {
      const { url, id } = tabInfo;
      const urlObj = new URL(url);
      const search = urlObj.search;

      const searchParamObj = {};
      const searchParams = new URLSearchParams(search);
      for (let p of searchParams) {
        // console.log(p);
        searchParamObj[p[0]] = p[1];
      }

      const { url: urlToUpdate, title: titleToUpdate } = searchParamObj;

      chrome.tabs.update(
        id,
        {
          url: urlToUpdate,
          // title: titleToUpdate,
        },
        () => {
          if (index === tabs.length - 1) {
            updateSecuredTabsCount();
            updatePrivateButNotSecuredCount();
            updateSecuredTabsCount();
          }
        }
      );
    });
  });
}

// Triggers

// renderUI();

updateSecuredTabsCount();
updatePrivateButNotSecuredCount();
updateThePrivateTag();

// });
