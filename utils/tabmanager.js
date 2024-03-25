import { readFromDatabase } from "./database.js";

export function getCurrentTabId() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0].id);
    });
  });
}

export function getTabTitleById(tabId) {
  return new Promise((resolve, reject) => {
    chrome.tabs.get(tabId, (tab) => {
      resolve(tab.title);
    });
  });
}

export function setBadgeTextForTab(tabId, text) {
  chrome.action.setBadgeText(
    { tabId: tabId, text: text.toString() },
    function () {
      // console.log(
      //   `${text} set ID: ${tabId.toString()} shortid ${tabId
      //     .toString()
      //     .slice(-4)}`
      // );
    }
  );
}

export function setBadgeColor(tabId, color) {
  chrome.action.setBadgeBackgroundColor(
    { tabId: tabId, color: color },
    function () {
      // console.log(`Badge background color set to ${color}.`);
    }
  );
}

chrome.tabs.onCreated.addListener(function (tab) {
  updateBadge(tab.id);
});
chrome.tabs.onUpdated.addListener(function (tabId) {
  updateBadge(tabId);
});
chrome.tabs.onActivated.addListener(function (activeInfo) {
  updateBadge(activeInfo.tabId);
});

export function updateBadge(tabId) {
  readFromDatabase("tabManager", tabId)
    .then((data) => {
      if (!data.count) {
        return;
      }
      setBadgeTextForTab(tabId, data.count);
      setBadgeColor(tabId, "red");
    })
    .catch((error) => console.error(error));
}
