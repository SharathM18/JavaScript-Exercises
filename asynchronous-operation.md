### Asynchronous operation in JavaScript

- Functions running in parallel with other functions are called asynchronous
- Ex: JavaScript setTimeout()
- Asynchronous operation is typically implemented using callbacks, promises, and async/await.

### Callback Hell (Pyramid of Doom):

- Callback hell is a phenomenon that occurs when multiple callbacks are nested within another callback.

#### Drawbacks

- When you perform multiple asynchronous operations or API calls that depend on each other. As a result, you end up nesting callback functions within callback functions, and The structure resembles a pyramid, with each level representing a nested callback. This makes the code difficult to maintain, understand, and debug.

- Inversion of Control: it means when you hand over a callback function to another function. By doing this, you essentially let that function decide when and how the callback runs.

**To address these issues promises came into the picture**

### Promise

- A promise is an object that represents the eventual completion or failure of an asynchronous operation.

#### Promise has 3 states

- **pending**: initial state, neither fulfilled nor rejected.
- **fulfilled**: meaning that the operation was completed successfully.
- **rejected**: meaning that the operation failed.

```
let myPromise = new Promise(function(resolve, reject) {
    // Asynchronous operation goes here
    if (operation successful) {
      resolve(resolvedValue);
    } else {
      reject(errorObject);
    }
  });
```

**Note**

- As soon as the promise is fulfilled/rejected it update as undefined to the pending state
- Once a promise transitions from the pending state to either the fulfilled (resolved) or rejected state. it stays in that state permanently and it cannot change its state again.

**Consuming a Promise (Using `then` and `catch`): means that must wait for the result.**

**The .then() method takes up to two arguments**

1. callback function for the fulfilled case of the promise
2. callback function for the rejected case of the promise

```
myPromise.then(
  function(value) {
    console.log("Promise resolved with:", value);
  },
  function(error) {
    console.error("Promise rejected with:", error);
  }
);

// Or using catch:
myPromise.catch(function(error) {
  console.error("Promise rejected with:", error);
});
```

### Promise Chain

```
// Promise Example - 1

const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Fetched data"), 1000);
  });
};

const processData = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(data.toUpperCase()), 500);
  });
};

const displayData = (processedData, additionalParam) => {
  console.log(processedData + " " + additionalParam); // "FETCHED DATA" (after processing)
};

const additionalParam = "successfully.";

fetchData() // it invoked the fetchData function and return the resolved value
  .then(processData) // Pass resolved value ("Fetched data") to processData and it implicitly invoked the processData function and no need to explicitly invoked.
  .then((returnProcessData) => {
    displayData(returnProcessData, additionalParam);
  }) //  Pass resolved value ("FETCHED DATA") & additional parameter to displayData and it implicitly invoked the displayData function and no need to explicitly invoked.
  .catch((error) => {
    console.error("Error:", error); // if its rejected then it will display in the console log window.
  });
```

```
// Promise Example - 2

const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate an error during data fetching
      reject(new Error("Network error while fetching data"));
    }, 1000);
  });
};

const processData = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate an error during data processing
      if (data === "error") {
        reject(new Error("Invalid data format"));
      } else {
        resolve(data.toUpperCase());
      }
    }, 500);
  });
};

const displayData = (processedData) => {
  console.log(processedData); // Won't be executed due to errors
};

fetchData()
  .then(processData) // Catch errors from fetchData or processData
  .catch(error => {
    console.error("Error during fetching or processing:", error);
  })
  .then(displayData) // Won't be called due to the previous catch
  .catch(error => {
    console.error("Unhandled error:", error); // Catches any errors not handled above
  });

```
