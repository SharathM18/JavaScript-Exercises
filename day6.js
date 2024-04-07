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
