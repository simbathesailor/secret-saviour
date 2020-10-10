let limit = 25 * 99999; // in seconds

// console.log("some value");

const startTimeWHenStartedSHowingThePage = new Date();

// console.log(
//   "startTimeWHenStartedSHowingThePage",
//   startTimeWHenStartedSHowingThePage
// );

// Notification.requestPermission(function (status) {
//   console.log("Notification permission status:", status);
// });
// checking when time will happen

// const timeoutId = window.setTimeout(() => {
//   // chrome.tabs.getCurrent(function ()) doesnot work

//   chrome.runtime.sendMessage(
//     chrome.runtime.id,
//     { type: "trigger_redirection_tosuspended_page" },
//     function (response) {
//       console.log("trigger sent to extension");
//     }
//   );
// }, limit);

var searchParams = new URLSearchParams(location.search);

//Iterate the search parameters.
for (let p of searchParams) {
  // console.log(p);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log("request is ", request);
  // if (request.url) {
  //   var link =
  //     document.querySelector("link[rel*='icon']") ||
  //     document.createElement("link");
  //   link.type = "image/x-icon";
  //   link.rel = "shortcut icon";
  //   link.href = url;
  //   document.getElementsByTagName("head")[0].appendChild(link);
  // }
  // return true;
  // const l = document.createElement("link");
  // const urlNewCss = chrome.runtime.getURL(`pages/suspendedpage.css`);
  // l.href = urlNew;
  // document.head.appendChild(l);
  // const template = `
  //   <div class="suspended-html-container">
  //   <h2 class="title">URLSearchParams - Web APIs | MDN</h2>
  //   <a class="page-url">https://developers.chrome.com/extensions/windows</a>
  //   <img
  //     class="giphy"
  //     src="https://media.giphy.com/media/wpoLqr5FT1sY0/giphy.gif"
  //     alt=""
  //   />
  //   <button id="click-me">Show Tab</button>
  // </div>
  // `;
  // document.body.innerHTML = template;
});
