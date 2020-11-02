// let limit =
document.addEventListener("DOMContentLoaded", function () {
  let darkMode = false;
  let COLOR = [
    {
      background: "#cde9a5",
      color: "#fff",
    },
    {
      background: "#7579e7",
      color: "#fff",
    },
    {
      background: "#a3d8f4",
      color: "#fff",
    },
    {
      background: "#b9fffc",
      color: "#000",
    },
    {
      background: "#ffefa0",
      color: "#000",
    },
    {
      background: "#fca652",
      color: "#fff",
    },
    {
      background: "#99f3bd",
      color: "#fff",
    },
    {
      background: "#ffc1fa",
      color: "#fff",
    },
    {
      background: "#ffe0ac",
      color: "#000",
    },
  ];

  let len = COLOR.length;

  function getRandom() {
    return Math.floor(Math.random() * len) + 1;
  }

  const V = document.querySelectorAll(".box-message")[0];
  const index = getRandom();
  V.style.background = COLOR[index - 1].background;
  V.style.color = COLOR[index - 1].color;

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    darkMode = true;
  }

  const startTimeWHenStartedSHowingThePage = new Date();

  var searchParams = new URLSearchParams(location.search);

  //Iterate the search parameters.
  let searchParamObj = {};
  for (let p of searchParams) {
    // console.log(p);
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
