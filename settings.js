import { defaultVars } from "./utils/vars.js";

document.addEventListener("DOMContentLoaded", function () {
  loadSettings();
  addSave;
});

function loadSettings() {
  chrome.storage.local.get(["mySetting"], async function (result) {
    await setDefaultSettings(result.mySetting);

    document.getElementById("urlIgnoreList").value =
      result.mySetting.urlIgnoreList.join("\n");
    document.getElementById("resultIgnoreList").value =
      result.mySetting.resultIgnoreList.join("\n");
    document.getElementById("interestingFiles").value =
      result.mySetting.interestingFiles.join("\n");
    document.getElementById("defaultCommands").value =
      result.mySetting.defaultCommands.join("\n");
  });
}

async function setDefaultSettings(settings) {
  console.log(settings);
  if (settings === undefined) {
    await chrome.storage.local.set({ mySetting: defaultVars }, function () {
      console.log("Settings saved");
    });
  } else {
    for (const key in settings) {
      if (settings[key].length === 0) {
        settings[key] = defaultVars[key];
      }
    }
  }
}

function saveSettings() {
  const urlIgnoreList = document.getElementById("urlIgnoreList").value;
  const resultIgnoreList = document.getElementById("resultIgnoreList").value;
  const interestingFiles = document.getElementById("interestingFiles").value;
  const defaultCommands = document.getElementById("defaultCommands").value;

  const mySettingValue = {
    urlIgnoreList: urlIgnoreList.split("\n"),
    resultIgnoreList: resultIgnoreList.split("\n"),
    interestingFiles: interestingFiles.split("\n"),
    defaultCommands: defaultCommands.split("\n"),
  };

  chrome.storage.local.set({ mySetting: mySettingValue }, function () {
    console.log("Settings saved");
  });
}

function addSave() {
  document.getElementById("saveBtn").addEventListener("click", saveSettings());
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      saveSettings();
    }
  });
}
