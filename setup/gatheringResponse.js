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

      // const myObject = { id: "tabid", result: stuff };

      appendToObjectList({ id: "user123", title: "anewtitle" }, stuff)
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

async function appendToObjectList(identifier, newObj) {
  const db = await openDatabase();
  const transaction = db.transaction(["myStore"], "readwrite");
  const store = transaction.objectStore("myStore");
  return new Promise((resolve, reject) => {
    const request = store.get(identifier.id);
    request.onsuccess = () => {
      let data = request.result;
      if (data) {
        // If the entry exists, append the new object to the list
        data.attacks.push(newObj);
      } else {
        // If the entry does not exist, create it with newObj as the first item in the list
        data = {
          id: identifier.id,
          title: identifier.title,
          attacks: [newObj],
        };
      }
      const updateRequest = store.put(data);
      updateRequest.onsuccess = () => resolve("Object appended successfully.");
      updateRequest.onerror = () => reject("Error appending object.");
    };
    request.onerror = () => reject("Error fetching existing data.");
  });
}
