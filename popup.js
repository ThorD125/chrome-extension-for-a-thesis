import { readFromDatabase } from "./utils/database.js";
import {
  goToConfig,
  createNodeFromString,
  appendResultToContent,
} from "./utils/helpers.js";

import { getCurrentTabId } from "./utils/tabmanager.js";

console.log("popup.js");

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#configure").addEventListener("click", goToConfig);

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

  document.querySelector("h1").innerText = data.site;

  for (const [key, value] of Object.entries(data)) {
    if (key === "id") {
      continue;
    }

    document.querySelector("#infoContent #left").innerHTML += `<p>${key}</p>`;

    document.querySelector(
      "#infoContent #right"
    ).innerHTML += `<p>${value}</p>`;
  }
}

function showAttacks(data) {
  if (!data) {
    return;
  }
  // document.querySelector("h1").innerText = data.title;
  document.querySelector(".attackTab").innerText = data.id;

  data.attacks.forEach((attack) => {
    document
      .getElementById("attackContent")
      .appendChild(createNodeFromString(`<p>${attack.attackType}</p><br>`));

    attack.results.forEach((result) => {
      const buttonContainer = document.getElementById("content");

      const button = document.createElement("button");
      button.textContent = "Copy";

      button.addEventListener("click", function () {
        navigator.clipboard.writeText(result.fetch).catch((err) => {
          console.error("Failed to copy text: ", err);
        });
      });

      buttonContainer.appendChild(button);
      appendResultToContent(result.result);
    });
  });
}
