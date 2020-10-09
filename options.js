let page = document.getElementById("buttonDiv");
const kButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

// function constructOptions(kButtonColors) {
//   for (let item of kButtonColors) {
//     let button = document.createElement("button");
//     button.style.backgroundColor = item;
//     button.addEventListener("click", function () {
//       chrome.storage.sync.set({ color: item }, function () {
//         console.log("color is " + item);
//       });
//     });
//     page.appendChild(button);
//   }
// }
// constructOptions(kButtonColors);

// let emailRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

document.addEventListener("DOMContentLoaded", function () {
  let dataPrivateUrls = [];
  let dataAfterSearchApplied = [];

  let searchValueOutside = "";
  function getTickUI() {
    return `
  
  <svg class="tick-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00bb02" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
  `;
  }

  function getGlobeIcon() {
    return `
    <svg class="globe-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/></svg>
    `;
  }

  function arrowIcon() {
    return `
    
    <svg
        class="arrow-icon right"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Capa_1"
        x="0px"
        y="0px"
        width="31.418px"
        height="31.418px"
        viewBox="0 0 31.418 31.418"
        style="enable-background: new 0 0 31.418 31.418"
        xml:space="preserve"
        fill="rgb(154 160 166)"
      >
        <g>
          <path
            d="M26.585,3v25.418c0,1.155-0.664,2.208-1.707,2.707c-0.412,0.194-0.854,0.293-1.293,0.293c-0.672,0-1.34-0.228-1.883-0.665   L5.949,18.044c-0.706-0.569-1.116-1.428-1.116-2.335c0-0.907,0.41-1.766,1.116-2.335L21.703,0.665   c0.899-0.726,2.135-0.868,3.178-0.372C25.921,0.792,26.585,1.844,26.585,3z"
          />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    `;
  }

  function getCrossIcon() {
    return `
    <svg 
    class="cross-icon"
    xmlns="http://www.w3.org/2000/svg" fill="var(--salmon)" width="20" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
    `;
  }

  function getKeys(elem) {
    return `${elem.url}-${elem.entireDomain}-${elem.exact}`;
  }

  function getHtmlFromTemplate() {
    return `
    <div class="options-sub-container">
    <p class="page-heading">Tab Securer</p>
    <div class="section-title">Manage Preferences</div>
  <div id="private-tabs">
    <div class="option-header">
      <p>All Private Tabs</p>

      
    </div>
    <div class="add-url-layer-container">
        <div class="add-url-layer">
          <input type="text" id="add-url-input" placeholder="Add New URL"/> <button id="add-new-btn">Add New URL</button>
        </div>
        <div class="add-url-radio-layer">
        <input type="radio" id="domain" name="type-url" value="domain"  checked="true">
        <label for="domain">Domain</label>
        <input type="radio" id="exact" name="type-url" value="exact">
        <label for="exact">Exact</label>

       
        </div>
       
    </div>
    <div class="option-detail-section">
      <ul class="options-list">
      <li class="option-row header">
      <span></span>
        <span
         class="search-url-header"
        >URL <span> <input id='search-url' value="${searchValueOutside}" type="text" placeholder="Search" /></span></span>
        <span>Domain</span>
        <span>
          Exact
        </span>
       
        </li>
        <ul class="table-body">
        ${(() => {
          return dataAfterSearchApplied.reduce((acc, elem, index) => {
            const { url, exact, entireDomain, favIconUrl } = elem;
            acc = `
            ${acc}
            <li class="option-row">
              ${
                favIconUrl
                  ? `<img class="favicon-url" src="${favIconUrl}" />`
                  : `<span>${getGlobeIcon()}</span>`
              }
              <span><a href="${url}" target="__blank">${url}</a></span>
              <span>  ${entireDomain ? getTickUI() : ""}</span>
              <span>
               ${exact ? getTickUI() : ``} 
              </span>
             
              <span data-key="${getKeys(
                elem
              )}" class="cross-icon-svg-container">REMOVE</span>
            </li>
            `;
            return acc;
          }, ``);
        })()}
        </ul>
      </ul>
    </div>
  </div>
</div>
  `;
  }

  function rerenderBelowHeader() {
    return `
    ${(() => {
      return dataAfterSearchApplied.reduce((acc, elem) => {
        const { url, exact, entireDomain, favIconUrl } = elem;
        acc = `
        ${acc}
        <li class="option-row">
          ${
            favIconUrl
              ? `<img class="favicon-url" src="${favIconUrl}" />`
              : `<span>${getGlobeIcon()}</span>`
          }
          <span><a href="${url}" target="__blank">${url}</a></span>
          <span>  ${entireDomain ? getTickUI() : ""}</span>
          <span>
           ${exact ? getTickUI() : ``} 
          </span>
         
          <span data-key="${getKeys(
            elem
          )}" class="cross-icon-svg-container">REMOVE</span>
        </li>
        `;
        return acc;
      }, ``);
    })()}
    `;
  }

  function rerenderUI() {
    let newPaint = getHtmlFromTemplate();
    const mainContainer = document.querySelectorAll(
      ".options-main-container"
    )[0];
    mainContainer.innerHTML = newPaint;
    const searchInput = document.getElementById("search-url");
    const newUrlInput = document.getElementById("add-url-input");
    const newUrlBtn = document.getElementById("add-new-btn");
    const nodesCross = document.getElementsByClassName(
      "cross-icon-svg-container"
    );

    // cleanup phase in
    searchInput.removeEventListener("input", onSearch);
    newUrlInput.removeEventListener("input", onChangeNewUrlInput);
    newUrlBtn.removeEventListener("click", onClickAddnewUrlBtn);
    const nodesCrossArrayCleanup = [...nodesCross];
    nodesCrossArrayCleanup.forEach((elem) => {
      elem.removeEventListener("click", CrossHandler);
    });
    // cleanup phase out
    searchInput.oninput = onSearch;
    newUrlInput.oninput = onChangeNewUrlInput;
    newUrlBtn.onclick = onClickAddnewUrlBtn;

    const nodesCrossArray = [...nodesCross];
    nodesCrossArray.forEach((elem) => {
      elem.onclick = CrossHandler;
    });
    // searchInput.focus();
  }

  function checkIfUrlIsValid(urlString) {
    try {
      const v = new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  }

  function CrossHandler(e) {
    const dataKey = e.currentTarget.dataset.key;
    dataPrivateUrls.forEach((elem, index) => {
      console.log("sdadasd", getKeys(elem));
      if (getKeys(elem) === dataKey) {
        console.log(
          "listOfPrivateTabs",
          dataPrivateUrls.slice(index, index + 1)
        );
        dataPrivateUrls.splice(index, 1);
        chrome.storage.sync.set(
          {
            listOfPrivateTabs: dataPrivateUrls,
          },
          () => {
            paintUI();
          }
        );
      }
    });
  }
  function onChangeNewUrlInput(e) {
    console.log("onChangeNewUrlInput -> e", e);
    const value = e.target.value;
  }

  function onClickAddnewUrlBtn(e) {
    console.log("onClickAddnewUrlBtn -> e", e);
    const newUrlInput = document.getElementById("add-url-input");

    const isValid = checkIfUrlIsValid(newUrlInput.value);

    const newUrlValue = newUrlInput.value;
    if (isValid) {
      const isDomainSelected = document.getElementById("domain").checked;
      const isExactSelected = document.getElementById("exact").checked;

      // if(isDomainSelected) {

      // }

      // if()
      const isAlreadyThere =
        dataPrivateUrls.filter((elem) => {
          if (isExactSelected) {
            return elem.url === newUrlValue;
          } else {
            return new URL(newUrlValue).origin === elem.url;
          }
        }).length > 0;

      if (!isAlreadyThere) {
        // add it to the sync storage
        chrome.storage.sync.set(
          {
            listOfPrivateTabs: [
              ...dataPrivateUrls,
              {
                url: isDomainSelected
                  ? new URL(newUrlValue).origin
                  : newUrlValue,
                entireDomain: isDomainSelected,
                exact: isExactSelected,
              },
            ],
          },
          () => {
            newUrlInput.value = "";
            paintUI();
          }
        );
      } else {
        // show some error
      }
    }
    console.log("onClickAddnewUrlBtn -> isValid", isValid);
  }
  function paintUI() {
    // chrome.windows.getAll({ populate: true }, function (windows) {
    //   let tabsOpenCurrently = [];
    //   windows.forEach(function (window) {
    //     console.log("onClickHideAllPrivate -> window", window);
    //     tabsOpenCurrently = [...tabsOpenCurrently, ...window.tabs];
    //   });

    // })

    chrome.storage.sync.get("listOfPrivateTabs", function (data) {
      console.log("data", data);
      dataPrivateUrls = data ? data.listOfPrivateTabs || [] : [];
      dataAfterSearchApplied = dataPrivateUrls.filter((elem) => {
        return (
          elem.url
            .toLowerCase()
            .indexOf(searchValueOutside.toLowerCase() || "") !== -1
        );
      });

      rerenderUI();
    });
  }

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
      var storageChange = changes[key];
      console.log(
        'Storage key "%s" in namespace "%s" changed. ' +
          'Old value was "%s", new value is "%s".',
        key,
        namespace,
        storageChange.oldValue,
        storageChange.newValue
      );
    }
  });

  function replacehtmlInOptionContainer() {
    const elem = document.querySelectorAll(".table-body")[0];

    const newHtml = rerenderBelowHeader();

    elem.innerHTML = newHtml;
  }
  const debouncedRerender = debounce(replacehtmlInOptionContainer, 300);

  function onSearch(e) {
    const searchValue = e.target.value;

    searchValueOutside = searchValue;
    dataAfterSearchApplied = dataPrivateUrls.filter((elem) => {
      if (!searchValue.trim()) {
        return true;
      }

      return elem.url.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    });

    // console.log("onSearch -> dataAfterSearchApplied", dataAfterSearchApplied);

    debouncedRerender();
  }

  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }

  paintUI();
});
