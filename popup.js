console.log("popup.js");

document.addEventListener("DOMContentLoaded", function () {
  readFromDatabase("user123")
    .then((data) => populizePopup(data))
    .catch((error) => console.error(error));
});

function createNewButton(data) {
  const button = document.createElement("button");
  button.textContent = "Copy";

  button.onclick = function () {
    console.log("Button clicked");
    // Copy the button's text to the clipboard
    navigator.clipboard
      .writeText(data)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  return button;
}
function createNodeFromString(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild; // This will return the <p> node with replaced content
}
function populizePopup(data) {
  document.querySelector("h1").innerText = data.title;
  document.querySelector(".tab").innerText = data.id;

  console.log(data.attacks);
  data.attacks.forEach((attack) => {
    document
      .getElementById("content")
      .appendChild(createNodeFromString(`<p>${attack.attackType}</p><br>`));

    attack.results.forEach((result) => {
      const buttonContainer = document.getElementById("content");

      // Create a new button
      const button = document.createElement("button");
      button.textContent = "Copy";

      // Add an event listener to the button
      button.addEventListener("click", function () {
        // Copy the button's text to the clipboard
        navigator.clipboard
          .writeText(result.fetch)
          .then(() => {
            console.log("Text copied to clipboard");
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
          });
      });

      // Add the button to the buttonContainer
      buttonContainer.appendChild(button);

      document.getElementById(
        "content"
      ).innerHTML += `<h2>result:</h2><pre>${result.result}</pre><br>`;
    });
  });
}

function copyButton() {
  console.log("Button clicked");
  // Copy the button's text to the clipboard
  navigator.clipboard
    .writeText(this.getAttribute("toCopy"))
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myDatabase", 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("myStore")) {
        db.createObjectStore("myStore", { keyPath: "id" });
      }
    };

    request.onerror = function (event) {
      reject("Database error: " + event.target.errorCode);
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };
  });
}

async function readFromDatabase(key) {
  const db = await openDatabase();
  const transaction = db.transaction(["myStore"], "readonly");
  const store = transaction.objectStore("myStore");
  return new Promise((resolve, reject) => {
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error fetching data.");
  });
}
