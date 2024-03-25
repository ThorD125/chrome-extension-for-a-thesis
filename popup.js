import { readFromDatabase } from "./utils/database.js";
import { populizePopup } from "./utils/helpers.js";

import { getCurrentTabId } from "./utils/tabmanager.js";

console.log("popup.js");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");
  getCurrentTabId().then((tabId) => {
    readFromDatabase("attackingDatabase", tabId)
      .then((data) => populizePopup(data))
      .catch((error) => console.error(error));
  });
});
