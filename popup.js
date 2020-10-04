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
