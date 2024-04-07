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
  .catch((error) => {
    console.error("Error during fetching or processing:", error);
  })
  .then(displayData) // Won't be called due to the previous catch
  .catch((error) => {
    console.error("Unhandled error:", error); // Catches any errors not handled above
  });

// Promise.all()

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

// Promise.allSettled()

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

// Promise.race()

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

// Promise.any() - AggregateError

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
  .then((value) => {
    console.log(value); // Logs the value of the first resolved promise
  })
  .catch((error) => {
    console.error(error); // Logs AggregateError if all promises are rejected
  });

// async and await

// Async function declaration
async function fetchData() {
  // Simulating an asynchronous operation (e.g., fetching data from an API)
  return new Promise((resolve, reject) => {
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

// compare with the Promise

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
