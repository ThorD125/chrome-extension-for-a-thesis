export function createNewButton(data) {
  const button = document.createElement("button");
  button.textContent = "Copy";

  button.onclick = function () {
    console.log("Button clicked");

    navigator.clipboard
      .writeText(data)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  return button;
}

export function createNodeFromString(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

export function copyButton() {
  console.log("Button clicked");

  navigator.clipboard
    .writeText(this.getAttribute("toCopy"))
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

export function includesAnyOfList(item, list) {
  return list.some((listItem) => item.includes(listItem));
}

export function goToConfig() {
  chrome.runtime.openOptionsPage();
}
