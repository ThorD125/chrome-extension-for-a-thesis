import { getListeners } from "./utils/helpers.js";

console.log("content.js loaded");

// LINKS POSTMESSAGE https://medium.com/@chiragrai3666/exploiting-postmessage-e2b01349c205
// https://portswigger.net/web-security/dom-based/controlling-the-web-message-source/lab-dom-xss-using-web-messages

function checkPostMessage(url) {
  console.log("Checking postMessage for " + url);
}

function checkListeners(script, url) {
  const listeners = getListeners(script);

  if (listeners) {
    console.log(`${url} contains events: (${listeners})`);

    if (listeners.includes("message")) {
      checkPostMessage(url);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("script:not([src])").forEach(function (scriptTxt) {
    checkListeners(scriptTxt.text, document.location.href);
  });

  document.querySelectorAll("script[src]").forEach(function (script) {
    fetch(script.src)
      .then((x) => x.text())
      .then((x) => {
        checkListeners(x, script.src);
      });
  });

  let scriptElements = document.querySelectorAll("script[src]");
  scriptElements.forEach(function (scriptTag) {
    let srcAttribute = scriptTag.getAttribute("src");
    fetch(srcAttribute)
      .then((scriptSrc) => scriptSrc.text())
      .then(function (scriptTxt) {
        checkListeners(scriptTxt);
      });
  });
});
