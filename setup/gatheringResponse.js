import {
  appendToObjectList,
  addToTabManager,
  readFromDatabase,
} from "../utils/database.js";
import { includesAnyOfList } from "../utils/helpers.js";
import { getSettings } from "../utils/vars.js";

import { getCurrentTabId, getTabTitleById } from "../utils/tabmanager.js";
import { updateBadge } from "../utils/tabmanager.js";

export default async function setupGatheringResponse() {
  const onMessage = (result) => {
    if (result.action != "attacksResponse") {
      return;
    }
    const theresults = result.results.filter((x) => {
      const minResponseLength = parseInt(
        getSettings().defaultMinResponseLength
      );
      if (minResponseLength == 0) {
        return true;
      }

      const responseLength = x.result.length;
      if (minResponseLength < responseLength) {
        return true;
      } else {
        if (includesAnyOfList(x.result, getSettings().resultIgnoreList)) {
          return false;
        }
        return true;
      }
    });
    if (theresults.length !== 0) {
      const stuff = { ...result, results: theresults };

      getCurrentTabId().then((tabId) => {
        getTabTitleById(tabId).then((tabTitle) => {
          appendToObjectList({ id: tabId, title: tabTitle }, stuff).catch(
            (error) => console.error(error)
          );

          addToTabManager(tabId, theresults.length).catch((error) =>
            console.error(error)
          );

          updateBadge(tabId);

          console.log("resultstuff", stuff);
        });
      });
    }
  };
  chrome.runtime.onMessage.addListener(onMessage);
}
