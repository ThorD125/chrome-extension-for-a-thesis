export function createNewButton(data) {
  const button = document.createElement("button");
  button.textContent = "Copy";

  button.onclick = function () {
    console.log("Button clicked");

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

export function createNodeFromString(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

export function appendResultToContent(resultText) {
  // Assume resultText is what you previously referred to as result.result
  const content = document.getElementById("content");

  // Create the h2 element and set its text
  const h2 = document.createElement("h2");
  h2.textContent = "result:";

  // Create the pre element and set its text
  const pre = document.createElement("pre");
  pre.textContent = resultText;

  // Append the h2 and pre elements to the content
  content.appendChild(h2);
  content.appendChild(pre);

  // If you want a break after, you can create and append it too
  const br = document.createElement("br");
  content.appendChild(br);
}

export function populizePopup(data) {
  document.querySelector("h1").innerText = data.title;
  document.querySelector(".tab").innerText = data.id;

  console.log(data.attacks);
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

export function copyButton() {
  console.log("Button clicked");

  navigator.clipboard
    .writeText(this.getAttribute("toCopy"))
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}
