console.log("some value");

// let limit =
document.addEventListener("DOMContentLoaded", function () {
  console.log("some value in suspended page");

  const startTimeWHenStartedSHowingThePage = new Date();
  console.log(
    "startTimeWHenStartedSHowingThePage",
    startTimeWHenStartedSHowingThePage
  );

  var searchParams = new URLSearchParams(location.search);
  console.log("searchParams", searchParams);

  //Iterate the search parameters.

  let searchParamObj = {};
  for (let p of searchParams) {
    console.log(p);
    searchParamObj[p[0]] = p[1];
  }

  document.getElementById("click-me").onclick = function () {
    // this is rsponsibel for reloading to old page//
    // Basically how great suspender works
    window.location.href = searchParamObj.url;
  };
});

// if it is a CONTWENT SCRIPT, then it can message from background.js

// chrome.runtime.onMessage.addListener(gotMessage)

// function gotMessage(message, sender, sendResponse) {
//  //
// }
