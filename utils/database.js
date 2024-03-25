export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myDatabase", 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("attackingDatabase")) {
        db.createObjectStore("attackingDatabase", { keyPath: "id" });
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

export async function readFromDatabase(key) {
  const db = await openDatabase();
  const transaction = db.transaction(["attackingDatabase"], "readonly");
  const store = transaction.objectStore("attackingDatabase");
  return new Promise((resolve, reject) => {
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error fetching data.");
  });
}
export async function appendToObjectList(identifier, newObj) {
  const db = await openDatabase();
  const transaction = db.transaction(["attackingDatabase"], "readwrite");
  const store = transaction.objectStore("attackingDatabase");
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
