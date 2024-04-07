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

- Where each step in the chain depends on the successful promise of the previous one.

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

### Promise Methods

- Promise.all()
- Promise.allSettled()
- Promise.race()
- Promise.any()

### Promise.all()

- Waits for all promises in an array to settle (resolve or reject) before returning a single promise.
- if all promise is resolved. it return a resolved value from the promise.
- if any one of the promise is rejected. the whole promise will throw an error and it will not wait for others promise to complete.

```
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Promise 1 resolved"), 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Promise 2 resolved"), 2000);
});

Promise.all([promise1, promise2]) // it invoked the both the promise and it will execute both promises concurrently and wait for both to resolve.
  .then((values) => {
    console.log(values); // ["Promise 1 resolved", "Promise 2 resolved"]
  })
  .catch((error) => {
    console.error(error); // If any promise rejects, this catches it
  });
```

### Promise.allSettled()

- It perform the all operation of the promise
- It returns the array of objects to describing the outcome of each promise.
- Regardless of whether they promises resolve or reject.

```
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Promise 1 resolved"), 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Promise 2 rejected")), 1500);
});

Promise.allSettled([promise1, promise2]).then((results) => {
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log(result.status, result.value);
    } else {
      console.error(result.status, result.reason);
      console.log(result.status, result.reason);
    }
  });
  console.log(results); // it returns array of object
});
```

### Promise.race()

- If 1st promise resolved, it return promise resolved value.
- If 1st promise is rejected, it will throw an error.
- Whichever promises settled first that will get only considered and subsequent settlements of other promises are ignored.

```
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Promise 1 resolved"), 2000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Promise 2 resolved"), 1000);
});

Promise.race([promise1, promise2])
  .then((value) => {
    console.log(value); // "Promise 2 resolved" (whichever resolves first)
  })
  .catch((error) => {
    console.error(error); // If the first promise rejects, this catches it
  });
```

### Promise.any()

- It will waits for any one of the promises to resolved in order to get the resolved value.
- if all the promise is rejected. it returns a `AggregateError`
- `Promise.race()` gets the result based on the 1st settlements either if its resolved or rejected
- `Promise.any()` gets the result based on the 1st resolved or fulfilled.
- Ex: if 1st promise is rejected and 2nd promise is resolved then it considered as 2nd promise as result.

```
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => reject("Promise 1 rejected"), 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Promise 2 resolved"), 2000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Promise 3 resolved"), 1500);
});

Promise.any([promise1, promise2, promise3])
  .then(value => {
    console.log(value); // Logs the value of the first resolved promise
  })
  .catch(error => {
    console.error(error); // Logs AggregateError if all promises are rejected
  });
```

Example for `AggregateError`

```
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => reject("Promise 1 rejected"), 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => reject("Promise 2 resolved"), 2000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => reject("Promise 3 resolved"), 1500);
});

Promise.any([promise1, promise2, promise3])
  .then((value) => {
    console.log(value); // Logs the value of the first resolved promise
  })
  .catch((error) => {
    console.error(error); // Logs AggregateError if all promises are rejected
  });
```

#### Note

- Settled means 2 state [success, failure] or [fulfilled, rejected] or [resolve, reject]

### async and await

- async and await make promises easier to write
- `async` makes a function return a Promise
- `await` makes a function wait for a Promise

`Example of async and await:`

```
// Async function declaration
async function fetchData() {
  // Simulating an asynchronous operation (e.g., fetching data from an API)
  return new Promise(resolve => {
    setTimeout(() => resolve("Data fetched"), 1000);
  });
}

// Async function call with await
async function getData() {
  try {
    // Await pauses the execution until the promise returned by fetchData resolves
    const data = await fetchData();
    console.log(data); // Logs: Data fetched
  } catch (error) {
    console.error(error);
  }
}

// Calling the async function
getData();

```

`compare with the promise:`

```
// Function returning a promise
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Data fetched"), 1000);
  });
}

// Promise chain
function getData() {
  fetchData()
    .then((data) => {
      console.log(data); // Logs: Data fetched
    })
    .catch((error) => {
      console.error(error);
    });
}

// Calling the function
getData();
```
