import setup_attack from "./setup/attack.js";
import setupGatheringResponse from "./setup/gatheringResponse.js";

import { exploitelse } from "./exploits/exploitelse.js";
import { getSettings } from "./utils/vars.js";
import { includesAnyOfList } from "./utils/helpers.js";
import { updateGeneralTabInfo } from "./utils/database.js";

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
      typeof networkrequest.initiator == "undefined" ||
      includesAnyOfList(networkrequest.initiator, getSettings().urlIgnoreList)
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

setupGatheringResponse();

chrome.storage.local.get(["mySetting"], function (result) {
  console.log("Value currently is " + result.mySetting);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "postmessage") {
    updateGeneralTabInfo(sender.tab.id, { postMessageUrl: request.url });
    sendResponse("succesfullyy sent" + request.url);
  }
});
