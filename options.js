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

function paintUI() {
  let newPaint = `
  <div class="options-sub-container">
        <div class="section-title">Manage Preferences</div>
        <div id="private-tabs">
          <p></p>
        </div>
    </div>`;
  const mainContainer = document.querySelectorAll(".options-main-container")[0];

  mainContainer.innerHTML = newPaint;
}

paintUI();
