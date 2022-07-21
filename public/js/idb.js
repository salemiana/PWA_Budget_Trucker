// create a variable to hold db connection
let db;

//establish a connection to indexedDB
console.log(indexedDB);
const request = indexedDB.open("transaction", 1);

//emit if db version changes
request.onupgradeneeded = function (event) {
  const db = event.target.result;
 
  db.createObjectStore("new_transaction", { autoIncrement: true });

  request.onsuccess = function (event) {
    if (navigator.onLine) {
      uploadTransaction();
    }
  };

  request.onerror = function (event) {

    console.log(event.target.errorCode);
  };
};
// This function will be executed if we attempt to submit a new transaction and there's no internet connection
function saveRecord(record) {
  const transaction = db.transaction(["new_transaction "], "readwrite");
  const transactionObjectStore = transaction.objectStore("new_transaction");

  transactionObjectStore.add(record);
}
