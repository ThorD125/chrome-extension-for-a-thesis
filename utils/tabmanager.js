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
      console.log(
        `${text} set ID: ${tabId.toString()} shortid ${tabId
          .toString()
          .slice(-4)}`
      );
    }
  );
}

export function setBadgeColor(tabId, color) {
  chrome.action.setBadgeBackgroundColor(
    { tabId: tabId, color: color },
    function () {
      console.log(`Badge background color set to ${color}.`);
    }
  );
}

export function addBadgesToTabs() {
  chrome.tabs.onCreated.addListener(function (tab) {
    setBadgeTextForTab(tab.id, "oncreated");
  });
  chrome.tabs.onUpdated.addListener(function (tabId) {
    setBadgeTextForTab(tabId, "onupdated");
  });
  chrome.tabs.onActivated.addListener(function (activeInfo) {
    setBadgeTextForTab(activeInfo.tabId, "onactivated");
  });
}

export function onTabActivation(functionToRun) {
  chrome.tabs.onActivated.addListener(function (activeInfo) {
    console.log(`onActivated:${activeInfo.tabId}`);
    functionToRun(activeInfo.tabId);
  });
}
