import { readFromDatabase, updateGeneralTabInfo } from "./database.js";

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
  activateTabStuff(tab.id);
});
chrome.tabs.onUpdated.addListener(function (tabId) {
  activateTabStuff(tabId);
});
chrome.tabs.onActivated.addListener(function (activeInfo) {
  activateTabStuff(activeInfo.tabId);
});

function activateTabStuff(tabId) {
  updateBadge(tabId);
  // console.log("tabId", tabId);
  getTabInfoById(tabId).then(async (tab) => {
    const newInfo = await resolveDNS(tab.url);
    updateGeneralTabInfo(tabId, newInfo);
  });
}

const resolveDNS = async (website) => {
  const siteRegex = /https?:\/\/(www\.)?([^\/]+)/g;
  let site = "";
  try {
    site = siteRegex.exec(website)[2];
  } catch (error) {
    return;
  }
  return await chrome.dns.resolve(site).then((result) => {
    return { site: site, url: website, ip: result.address };
  });
};

export function updateBadge(tabId) {
  readFromDatabase("tabManager", tabId)
    .then((data) => {
      if (!data) {
        return;
      }
      if (!data.count) {
        return;
      }
      setBadgeTextForTab(tabId, data.count);
      setBadgeColor(tabId, "red");
    })
    .catch((error) => console.error(error));
}

function getTabInfoById(tabId) {
  return new Promise((resolve, reject) => {
    chrome.tabs.get(tabId, (tab) => {
      resolve(tab);
    });
  });
}
