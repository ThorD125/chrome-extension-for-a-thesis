console.log("content.js loaded");

// LINKS POSTMESSAGE https://medium.com/@chiragrai3666/exploiting-postmessage-e2b01349c205
// https://portswigger.net/web-security/dom-based/controlling-the-web-message-source/lab-dom-xss-using-web-messages

function checkPostMessage(url) {
  console.log("Checking postMessage for " + url);
}

function checkListeners(script, url) {
  const listeners = getListeners(script);

  if (listeners) {
    console.log(`${url} contains events: (${listeners})`);

    if (listeners.includes("message")) {
      checkPostMessage(url);
    }
  }
}

function includesAnyOfList(item, list) {
  if (list === undefined) return false;
  return list.some((listItem) => item.includes(listItem));
}

async function getSettings() {
  return await chrome.storage.local.get(["mySetting"]).then(function (result) {
    return result.mySetting;
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  document.querySelectorAll("script:not([src])").forEach(function (scriptTxt) {
    checkListeners(scriptTxt.text, document.location.href);
  });
  const settings = await getSettings();

  document.querySelectorAll("script[src]").forEach(async function (script) {
    const denyList = settings.urlIgnoreList;
    if (includesAnyOfList(script.src, denyList)) {
      return;
    }

    await fetch(script.src)
      .then((x) => x.text())
      .then((x) => {
        checkListeners(x, script.src);
      })
      .catch((err) => {
        return;
      });
  });

  let scriptElements = document.querySelectorAll("script[src]");
  scriptElements.forEach(async function (scriptTag) {
    let srcAttribute = scriptTag.getAttribute("src");
    if (srcAttribute.startsWith("//")) {
      srcAttribute = "https:" + srcAttribute;
    } else if (srcAttribute.startsWith("/")) {
      srcAttribute = window.location.origin + srcAttribute;
    } else {
      return;
    }

    if (includesAnyOfList(srcAttribute, settings.urlIgnoreList)) {
      return;
    }

    await fetch(srcAttribute)
      .then((scriptSrc) => scriptSrc.text())
      .then(function (scriptTxt) {
        checkListeners(scriptTxt);
      });
  });
});

function getListeners(script) {
  const matches = script
    .replace(/\s+|\n+|\t+/g, " ")
    .trim()
    .match(/addEventListener\((['"]).*?\1/g);

  if (matches) {
    return matches.map((x) =>
      x.replace(/addEventListener\((['"])/g, "").slice(0, -1)
    );
  }
  return;
}
