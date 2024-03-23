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
        if (x.result.includes("Invalid") || x.result.includes("Syntax error")) {
          return false;
        }
        // console.log("short results", x);
        return true;
      }
    });
    if (theresults.length !== 0) {
      const stuff = { ...result, theresults };
      console.log("results", stuff);
    }
  };
  chrome.runtime.onMessage.addListener(onMessage);
}
