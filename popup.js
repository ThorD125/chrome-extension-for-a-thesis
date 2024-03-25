import { readFromDatabase } from "./utils/database.js";
import { populizePopup } from "./utils/helpers.js";

console.log("popup.js");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");
  readFromDatabase("tabid")
    .then((data) => populizePopup(data))
    .catch((error) => console.error(error));
});
