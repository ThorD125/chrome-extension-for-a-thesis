import { appendToObjectList } from "../utils/database.js";

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
        if (
          x.result.includes("Invalid") ||
          x.result.includes("Syntax error") ||
          x.result.includes("No such file") ||
          x.result.includes("Bad Request")
        ) {
          return false;
        }
        // console.log("short results", x);
        return true;
      }
    });
    if (theresults.length !== 0) {
      const stuff = { ...result, results: theresults };

      // const myObject = { id: "tabid", result: stuff };

      appendToObjectList({ id: "user123", title: "anewtitle" }, stuff)
        .then((response) => console.log(response))
        .catch((error) => console.error(error));

      console.log("resultstuff", stuff);
    }
  };
  chrome.runtime.onMessage.addListener(onMessage);
}
