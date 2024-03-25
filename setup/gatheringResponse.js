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
          x.result.includes("No such file")
        ) {
          return false;
        }
        // console.log("short results", x);
        return true;
      }
    });
    if (theresults.length !== 0) {
      const stuff = { ...result, results: theresults };

      const myObject = { id: "tabid", result: stuff };

      writeToDatabase(myObject)
        .then((response) => console.log(response))
        .catch((error) => console.error(error));

      console.log("resultstuff", stuff);
    }
  };
  chrome.runtime.onMessage.addListener(onMessage);
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

async function writeToDatabase(obj) {
  const db = await openDatabase();
  const transaction = db.transaction(["myStore"], "readwrite");
  const store = transaction.objectStore("myStore");
  return new Promise((resolve, reject) => {
    const request = store.put(obj); // Using `put` to add or update an object
    request.onsuccess = () => resolve("Data saved successfully.");
    request.onerror = () => reject("Error saving data.");
  });
}

export async function readFromDatabase(key) {
  const db = await openDatabase();
  const transaction = db.transaction(["myStore"], "readonly");
  const store = transaction.objectStore("myStore");
  return new Promise((resolve, reject) => {
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error fetching data.");
  });
}
