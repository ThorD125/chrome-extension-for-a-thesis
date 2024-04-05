import { readFromDatabase } from "./utils/database.js";
import { goToConfig, createNodeFromString } from "./utils/helpers.js";

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

  getCurrentTabId().then((tabId) => {
    readFromDatabase("attackingDatabase", tabId)
      .then((data) => showAttacks(data))
      .catch((error) => console.error(error));
  });
});

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

function showAttacks(data) {
  if (!data) {
    return;
  }
  const h1 = document.createElement("h1");
  h1.innerText = `Attacks for Tab: ${data.id}`;

  const attackDiv = document.createElement("div");

  attackDiv.appendChild(h1);

  data.attacks.forEach((attack) => {
    const h2 = document.createElement("h2");
    h2.innerText = attack.attackType;
    attackDiv.appendChild(h2);

    attack.results.forEach((result) => {
      const button = document.createElement("button");
      button.textContent = "Copy";

      button.addEventListener("click", function () {
        navigator.clipboard.writeText(result.fetch).catch((err) => {
          console.error("Failed to copy text: ", err);
        });
      });

      attackDiv.appendChild(button);

      const content = document.createElement("div");
      const h2 = document.createElement("h2");
      h2.textContent = "result:";

      const pre = document.createElement("pre");
      pre.textContent = result.result;

      content.appendChild(h2);
      content.appendChild(pre);

      attackDiv.appendChild(content);
    });
    document.body.appendChild(attackDiv);
  });
}
