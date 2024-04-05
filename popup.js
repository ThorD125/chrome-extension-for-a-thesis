import { readFromDatabase, readAllFromDatabase } from "./utils/database.js";
import { goToConfig } from "./utils/helpers.js";

import { getCurrentTabId } from "./utils/tabmanager.js";

console.log("popup.js");

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#configure").addEventListener("click", goToConfig);
  document.querySelector("#showAll").addEventListener("click", showAll);

  getCurrentTabId().then((tabId) => {
    readFromDatabase("generaltabinfo", tabId)
      .then((data) => showInfo(data))
      .catch((error) => console.error(error));
  });

  const content = document.createElement("div");
  content.id = "content";
  getCurrentTabId().then((tabId) => {
    readFromDatabase("attackingDatabase", tabId)
      .then((data) => document.body.appendChild(showAttacks(content, data)))
      .catch((error) => console.error(error));
  });
});

function showAll() {
  document.querySelector("#content").remove();
  readAllFromDatabase("attackingDatabase")
    .then((data) => {
      const content = document.createElement("div");
      content.id = "content";
      data.forEach((item) => {
        const newDiv = document.createElement("div");
        showAttacks(newDiv, item);
        content.appendChild(newDiv);
      });
      document.body.appendChild(content);
    })
    .catch((error) => console.error(error));
}

function showInfo(data) {
  if (!data) {
    return;
  }

  const h1 = document.createElement("h1");

  h1.innerText = `Information about ${data.site}`;

  const infoDiv = document.createElement("div");
  infoDiv.appendChild(h1);

  for (const [key, value] of Object.entries(data)) {
    if (key === "id") {
      continue;
    }

    infoDiv.innerHTML += `<p>${key}</p>`;

    infoDiv.innerHTML += `<p>${value}</p>`;
  }
  document.body.appendChild(infoDiv);
}

function showAttacks(theContent, data) {
  if (!data) {
    return;
  }
  const h1 = document.createElement("h1");
  h1.innerText = `Attacks for Tab: ${data.id}`;

  theContent.appendChild(h1);

  data.attacks.forEach((attack) => {
    const h2 = document.createElement("h2");
    h2.innerText = attack.attackType;
    theContent.appendChild(h2);

    attack.results.forEach((result) => {
      const button = document.createElement("button");
      button.textContent = "Copy";

      button.addEventListener("click", function () {
        navigator.clipboard.writeText(result.fetch).catch((err) => {
          console.error("Failed to copy text: ", err);
        });
      });

      theContent.appendChild(button);

      const content = document.createElement("div");
      const h2 = document.createElement("h2");
      h2.textContent = "result:";

      const pre = document.createElement("pre");
      pre.textContent = result.result;

      content.appendChild(h2);
      content.appendChild(pre);

      theContent.appendChild(content);
    });
  });
  return theContent;
}
