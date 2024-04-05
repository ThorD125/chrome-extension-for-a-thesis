export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myDatabase", 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("attackingDatabase")) {
        db.createObjectStore("attackingDatabase", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("tabManager")) {
        db.createObjectStore("tabManager", { keyPath: "id" });
      }
      // Create the new object store here.
      if (!db.objectStoreNames.contains("generaltabinfo")) {
        db.createObjectStore("generaltabinfo", { keyPath: "id" });
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

export async function readFromDatabase(table, key) {
  const db = await openDatabase();
  const transaction = db.transaction([table], "readonly");
  const store = transaction.objectStore(table);
  return new Promise((resolve, reject) => {
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error fetching data.");
  });
}

export async function readAllFromDatabase(table) {
  const db = await openDatabase();
  const transaction = db.transaction([table], "readonly");
  const store = transaction.objectStore(table);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error fetching data.");
  });
}

export async function appendToObjectList(identifier, newObj) {
  const db = await openDatabase("attackingDatabase");
  const transaction = db.transaction(["attackingDatabase"], "readwrite");
  const store = transaction.objectStore("attackingDatabase");
  return new Promise((resolve, reject) => {
    const request = store.get(identifier.id);
    request.onsuccess = () => {
      let data = request.result;
      if (data) {
        data.attacks.push(newObj);
      } else {
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

export async function addToTabManager(tabId, count) {
  const db = await openDatabase("tabManager");
  const transaction = db.transaction(["tabManager"], "readwrite");
  const store = transaction.objectStore("tabManager");
  return new Promise((resolve, reject) => {
    const request = store.get(tabId);
    request.onsuccess = () => {
      let data = request.result;
      if (data) {
        data.count += count;
      } else {
        data = {
          id: tabId,
          count: count,
        };
      }
      const updateRequest = store.put(data);
      updateRequest.onsuccess = () => resolve("Object appended successfully.");
      updateRequest.onerror = () => reject("Error appending object.");
    };
    request.onerror = () => reject("Error fetching existing data.");
  });
}

export async function updateGeneralTabInfo(tabId, info) {
  const db = await openDatabase();
  const transaction = db.transaction(["generaltabinfo"], "readwrite");
  const store = transaction.objectStore("generaltabinfo");
  return new Promise((resolve, reject) => {
    const request = store.get(tabId);
    request.onsuccess = () => {
      let data = request.result || { id: tabId };
      if (!!info) {
        for (const [key, value] of Object.entries(info)) {
          if (value) {
            data[key] = value;
          }
        }
        const updateRequest = store.put(data);
        updateRequest.onsuccess = () =>
          resolve("General tab info updated successfully.");
        updateRequest.onerror = () =>
          reject("Error updating general tab info.");
      }
    };
    request.onerror = () => reject("Error fetching existing general tab info.");
  });
}
