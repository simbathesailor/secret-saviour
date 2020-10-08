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

let dataPrivateUrls = [];

function getHtmlFromTemplate() {
  return `
  <div class="options-sub-container">
  <div class="section-title">Manage Preferences</div>
  <div id="private-tabs">
    <div class="option-header">
      <p>All Private Tabs</p>

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
    </div>
    <div class="option-detail-section">
      <ul class="options-list">
      <li class="option-row">
        <span>URL</span>
        <span>
          Exact
        </span>
        <span>Domain</span>
        </li>
        ${(() => {
          return dataPrivateUrls.reduce((acc, elem) => {
            const { url } = elem;
            acc = `
            ${acc}
            <li class="option-row">
              <span>${url}</span>
              <span>
                <input type="checkbox" />
              </span>
              <span> <input type="checkbox" /></span>
            </li>
            `;
            return acc;
          }, ``);
        })()}
      </ul>
    </div>
  </div>
</div>
  `;
}

function rerenderUI() {
  let newPaint = getHtmlFromTemplate();
  const mainContainer = document.querySelectorAll(".options-main-container")[0];
  mainContainer.innerHTML = newPaint;
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
    dataPrivateUrls = data.listOfPrivateTabs;
    rerenderUI();
  });
}

paintUI();
