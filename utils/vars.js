const urlIgnoreList = [
  "https://www.youtube.com",
  "https://www.google.com",
  "https://chat.openai.com",
  "https://www.netflix.com",
  "https://portswigger.net/academy/labs/launch",
  "chrome-extension://",
  "https://portswigger.net",
];

const resultIgnoreList = [
  "Invalid",
  "Syntax error",
  "No such file",
  "Bad Request",
  "Bad Authentication",
];

const interestingFiles = ["/etc/passwd", "/etc/shadow", "/etc/hosts"];

const defaultCommands = ["whoami", "ls", "pwd", "cat /etc/passwd"];

const defaultMinResponseLength = 50;

export const defaultVars = {
  urlIgnoreList: urlIgnoreList,
  resultIgnoreList: resultIgnoreList,
  interestingFiles: interestingFiles,
  defaultCommands: defaultCommands,
  defaultMinResponseLength: defaultMinResponseLength,
};

export function getSettings() {
  try {
    const settings = chrome.storage.local.get(["mySetting"], function (result) {
      return result.mySetting;
    });

    if (settings === undefined) {
      return defaultVars;
    }

    return settings;
  } catch (error) {
    return defaultVars;
  }
}
