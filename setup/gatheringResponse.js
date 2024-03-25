import { appendToObjectList, addToTabManager } from "../utils/database.js";
import { includesAnyOfList } from "../utils/helpers.js";
import { fileContentIgnoreList } from "../utils/vars.js";

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

      appendToObjectList({ id: "tabid", title: "anewtitle" }, stuff)
        .then((response) => console.log(response))
        .catch((error) => console.error(error));

      addToTabManager("atabid", theresults.length)
        .then((response) => console.log(response))
        .catch((error) => console.error(error));

      console.log("resultstuff", stuff);
    }
  };
  chrome.runtime.onMessage.addListener(onMessage);
}
