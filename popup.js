import { readFromDatabase } from "./utils/database.js";
import { goToConfig, createNodeFromString } from "./utils/helpers.js";

import { getCurrentTabId } from "./utils/tabmanager.js";

console.log("popup.js");

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#configure").addEventListener("click", goToConfig);

  getCurrentTabId().then((tabId) => {
    readFromDatabase("attackingDatabase", tabId)
      .then((data) => populizePopup(data))
      .catch((error) => console.error(error));
  });
});

function populizePopup(data) {
  if (!data) {
    return;
  }
  document.querySelector("h1").innerText = data.title;
  document.querySelector(".tab").innerText = data.id;

  data.attacks.forEach((attack) => {
    document
      .getElementById("content")
      .appendChild(createNodeFromString(`<p>${attack.attackType}</p><br>`));

    attack.results.forEach((result) => {
      const buttonContainer = document.getElementById("content");

      const button = document.createElement("button");
      button.textContent = "Copy";

      button.addEventListener("click", function () {
        navigator.clipboard
          .writeText(result.fetch)
          .then(() => {
            console.log("Text copied to clipboard");
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
          });
      });

      buttonContainer.appendChild(button);
      appendResultToContent(result.result);
    });
  });
}
