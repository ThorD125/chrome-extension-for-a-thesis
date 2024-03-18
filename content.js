console.log("content.js loaded");

// LINKS POSTMESSAGE https://medium.com/@chiragrai3666/exploiting-postmessage-e2b01349c205
// let native_alert = alert;

// alert = function (msg) {
//   console.log("call to alert() - message: " + msg);
//   // native_alert(msg);
// };

// alert("intercepted!");
// function containsPostMessage(string) {
//   if (
//     string
//       .replace(/\s+|\n+|\t+/g, "")
//       .trim()
//       .includes('.addEventListener("message",')
//   ) {
//     console.log("contains post message");
//   }
// }

// window.onload = function () {
//   console.log("this script runs on every page load.");

//   let url = document.location.href;
//   console.log(url);

//   document.querySelectorAll("script:not([src])").forEach(function (scriptTxt) {
//     containsPostMessage(scriptTxt.text);
//   });

//   let scriptElements = document.querySelectorAll("script[src]");
//   scriptElements.forEach(function (scriptTag) {
//     let srcAttribute = scriptTag.getAttribute("src");
//     fetch(srcAttribute)
//       .then((scriptSrc) => scriptSrc.text())
//       .then(function (scriptTxt) {
//         containsPostMessage(scriptTxt);
//       });
//   });
// };

// const getTabTextsFromLocalStorage = () => {
//   let tabtextsinmethod = {};
//   chrome.storage.local.get(["tabtexts"], function (result) {
//     console.log("Value currently is " + result.tabtextsinmethod);
//     tabtextsinmethod = result.tabtextsinmethod;
//   });
//   return tabtextsinmethod;
// };

// const buttonnn = document.createElement("button");
// buttonnn.innerHTML = "Click me";
// buttonnn.onclick = function () {
//   console.log("Button clicked");
//   let tabtexts = getTabTextsFromLocalStorage();
//   console.log(tabtexts);
//   increaseTabText(1421358641);
// };

// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelector("body").innerHTML = "";

//   document.body.appendChild(buttonnn);
// });
