/**
 * Code to generate a devtool panel
 */

chrome.devtools.panels.create(
  "Test Panel ",
  "images/get_started16.png",
  "devtools/devtools.html",
  function (panel) {
    // code invoked on panel creation

    console.log(panel, "panel got created");
  }
);

/**
 * [createSidebarPane description]
 *
 * @return  {[type]}  [return description]
 * Code to generate the side panel in elements tabs
 */
chrome.devtools.panels.elements.createSidebarPane(
  "Test Panel SideBar",
  function (sidebar) {
    sidebar.setPage("devtools/sidebar.html");
    sidebar.setHeight("8ex");
  }
);
