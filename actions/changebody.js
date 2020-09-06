function changeBody(tab, otherInfo = {}) {
  if (!tab) return;
  const { color } = otherInfo;

  document.body.style.backgroundColor = `${color}`;
  var domparser = new DOMParser();
  var doc = domparser.parseFromString(
    `${`<div>There you go boy ${tab.title}</div>`}`,
    "text/html"
  );
  document.body = doc.body;
}
