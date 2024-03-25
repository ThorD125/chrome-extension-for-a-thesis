import setup_attack from "./setup/attack.js";
import setupGatheringResponse from "./setup/gatheringResponse.js";

import { exploitelse } from "./exploits/exploitelse.js";

// import {
//   addBadgesToTabs,
//   getBadgeTextForTab,
//   onTabActivation,
// } from "./utils/tabmanager.js";

console.log(
  "this is a script that runs in the background not in the main console."
);

// chrome.webRequest.onCompleted.addListener(
//   function (request) {
//     console.log("onCompleted");
//     console.log(request);
//   },
//   { urls: ["<all_urls>"] },
//   ["responseHeaders"]
// );

chrome.webRequest.onBeforeRequest.addListener(
  function (networkrequest) {
    // console.log("onBeforeRequest");

    if (
      typeof networkrequest.initiator != "undefined" &&
      networkrequest.initiator.includes("chrome-extension://")
    ) {
      return;
    }
    // console.log("shite", networkrequest);
    // console.log(networkrequest);

    let thepayload = "";
    try {
      thepayload = String.fromCharCode.apply(
        null,
        new Uint8Array(networkrequest.requestBody.raw[0].bytes)
      );
    } catch (error) {
      thepayload = "no payload";
    }

    let request = {
      fullrequest: networkrequest,
      payload: thepayload,
      url: networkrequest.url,
      method: networkrequest.method,
    };
    if (request.method == "POST") {
      if (thepayload.includes("<?xml")) {
        // WORKING
        setup_attack(request, "post_xmlbody_attack");
      }
      if (request.fullrequest.requestBody.formData != undefined) {
        // WORKING
        setup_attack(request, "post_formbody_attack");

        // WORKING TODO add working to readme
        setup_attack(request, "post_command_injection");
      }
    } else if (request.method == "GET") {
      if (request.url.includes("?")) {
        // WORKING
        setup_attack(request, "get_filepath");
      }
      //   if (
      //  request.url.includes("?") &&
      //  notXss(request.url)
      //  ) {
      // else {
      //   exploitelse(request);
      // }
    } else {
      exploitelse(request);
    }
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);

chrome.offscreen.createDocument({
  url: chrome.runtime.getURL("offscreen.html"),
  reasons: [chrome.offscreen.Reason.DOM_PARSER],
  justification: "reason for needing the document",
});

// addBadgesToTabs();

// setTimeout(async () => {
//   await getBadgeTextForTab(1421358641).then((e) => console.log(e));
// }, 1000);

// let currenttab = 0;

// onTabActivation((tabId) => {
//   currenttab = tabId;
//   console.log("current tab", currenttab);
// });

// let tabCounters = 0;
// const updateBadge = (tabCounters) => {
// tabCounters += 1;
// chrome.browserAction.setBadgeText({
//   text: tabCounters.toString(),
// });
// chrome.browserAction.setBadgeBackgroundColor({ color: "#ff0000" });
// };

setupGatheringResponse();
