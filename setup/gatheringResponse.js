import {
  appendToObjectList,
  addToTabManager,
  readFromDatabase,
} from "../utils/database.js";
import { includesAnyOfList } from "../utils/helpers.js";
import { fileContentIgnoreList } from "../utils/vars.js";

import { getCurrentTabId, getTabTitleById } from "../utils/tabmanager.js";
import { setBadgeColor, setBadgeTextForTab } from "../utils/tabmanager.js";

export default async function setupGatheringResponse() {
  const onMessage = (result) => {
    const theresults = result.results.filter((x) => {
      // console.log(x);
      // console.log(x.result);
      // console.log(x.result.length);
      // console.log(50 < x.result.length);
      if (50 < x.result.length) {
        return true;
      } else {
        if (includesAnyOfList(x.result, fileContentIgnoreList)) {
          return false;
        }
        // console.log("short results", x );
        return true;
      }
    });
    if (theresults.length !== 0) {
      const stuff = { ...result, results: theresults };

      getCurrentTabId().then((tabId) => {
        getTabTitleById(tabId).then((tabTitle) => {
          setBadgeColor(tabId, "red");

          appendToObjectList({ id: tabId, title: tabTitle }, stuff)
            .then((response) => console.log(response))
            .catch((error) => console.error(error));

          addToTabManager(tabId, theresults.length)
            .then((response) => console.log(response))
            .catch((error) => console.error(error));

          readFromDatabase("tabManager", tabId)
            .then((data) => setBadgeTextForTab(tabId, data.count))
            .catch((error) => console.error(error));

          console.log("resultstuff", stuff);
        });
      });
    }
  };
  chrome.runtime.onMessage.addListener(onMessage);
}
