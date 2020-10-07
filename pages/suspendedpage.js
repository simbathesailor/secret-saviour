console.log("some value");

// let limit =
document.addEventListener("DOMContentLoaded", function () {
  let darkMode = false;
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // dark mode
    console.log("dark mode is on");
    darkMode = true;
  }
  // window
  //   .matchMedia("(prefers-color-scheme: dark)")
  //   .addEventListener("change", (e) => {
  //     const newColorScheme = e.matches ? "dark" : "light";
  //     console.log("newColorScheme", newColorScheme);
  //   });

  // if (darkMode) {
  //   document.body.style.backgroundColor = "#000";
  // }
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

  function onClickURL() {
    window.location.href = searchParamObj.url;
  }
  document.getElementById("click-me").onclick = onClickURL;

  const titleElem = document.querySelectorAll(".title")[0];
  const pageURLElem = document.querySelectorAll(".page-url")[0];

  pageURLElem.onclick = onClickURL;
  titleElem.innerHTML = searchParamObj.title || "Tab Securer";
  pageURLElem.innerHTML =
    searchParamObj.url || "Looks like we dont have anywhere to go";
});

// if it is a CONTWENT SCRIPT, then it can message from background.js

// chrome.runtime.onMessage.addListener(gotMessage)

// function gotMessage(message, sender, sendResponse) {
//  //
// }
