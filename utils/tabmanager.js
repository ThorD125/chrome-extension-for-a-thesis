export const getTabTextsFromLocalStorage = () => {
  let tabtextsinmethod = {};
  chrome.storage.local.get(["tabtexts"], function (result) {
    console.log("Value currently is " + result.tabtextsinmethod);
    tabtextsinmethod = result.tabtextsinmethod;
  });
  return tabtextsinmethod;
};

let tabtexts = getTabTextsFromLocalStorage();

const saveToLocalStorage = (tabtexts) => {
  chrome.storage.local.set({ tabtexts: tabtexts }, function () {
    console.log("Value is set to " + tabtexts);
  });
};

function increaseTabText(tabId) {
  if (tabtexts[tabId] == undefined) {
    tabtexts[tabId] = 0;
    console.log("tabtexts[tabId] == undefined");
  } else {
    tabtexts[tabId] += 1;
  }
  saveToLocalStorage(tabtexts);
}

function getTabText(tabId) {
  if (tabtexts[tabId] == undefined) {
    tabtexts[tabId] = `${tabId.toString().slice(-2)}0`;
    saveToLocalStorage(tabtexts);
  }
  return `${tabtexts[tabId]}`;
}

export function setBadgeTextForTab(tabId, text) {
  text = getTabText(tabId);

  chrome.action.setBadgeText({ tabId: tabId, text: text }, function () {
    console.log(
      `${text} set ID: ${tabId.toString()} shortid ${tabId
        .toString()
        .slice(-4)}`
    );
  });
}

export function setBadgeColor(tabId, color) {
  chrome.action.setBadgeBackgroundColor(
    { tabId: tabId, color: "#color" },
    function () {
      console.log("Badge background color set to red.");
    }
  );
}

export async function getBadgeTextForTab(tabId) {
  return chrome.action.getBadgeText({ tabId: tabId }).then((result) => {
    return result;
  });
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

// function getCurrentTabId() {
//   return chrome.tabs.query(
//     { active: true, currentWindow: true },
//     function (tabs) {
//       return tabs[0].id;
//     }
//   );
// }
