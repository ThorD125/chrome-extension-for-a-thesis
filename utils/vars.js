export const urlIgnoreList = [
  "https://www.youtube.com",
  "https://www.google.com",
  "https://chat.openai.com",
  "https://www.netflix.com",
  "https://portswigger.net/academy/labs/launch",
  "chrome-extension://",
  "https://portswigger.net",
];

export const resultIgnoreList = [
  "Invalid",
  "Syntax error",
  "No such file",
  "Bad Request",
];

export const interestingFiles = ["/etc/passwd", "/etc/shadow", "/etc/hosts"];

export const defaultCommands = ["whoami", "ls", "pwd", "cat /etc/passwd"];

export const defaultVars = {
  urlIgnoreList: urlIgnoreList,
  resultIgnoreList: resultIgnoreList,
  interestingFiles: interestingFiles,
  defaultCommands: defaultCommands,
};
