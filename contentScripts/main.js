let limit = 25 * 99999; // in seconds

console.log("some value");

const startTimeWHenStartedSHowingThePage = new Date();

console.log(
  "startTimeWHenStartedSHowingThePage",
  startTimeWHenStartedSHowingThePage
);

Notification.requestPermission(function (status) {
  console.log("Notification permission status:", status);
});
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
  console.log(p);
}
// document.addEventListener("DOMContentLoaded", function () {

// });
