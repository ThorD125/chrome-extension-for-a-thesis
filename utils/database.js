export default function openDatabase() {
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

export async function writeToDatabase(obj) {
  const db = await openDatabase();
  const transaction = db.transaction(["attackingDatabase"], "readwrite");
  const store = transaction.objectStore("attackingDatabase");
  return new Promise((resolve, reject) => {
    const request = store.put(obj); // Using `put` to add or update an object
    request.onsuccess = () => resolve("Data saved successfully.");
    request.onerror = () => reject("Error saving data.");
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