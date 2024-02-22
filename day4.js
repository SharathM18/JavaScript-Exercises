//Recursion function

function factorial(num) {
  if (num === 0 || num === 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}

console.log(factorial(5));

// Step 1: 5 * factorial(5 - 1) = 5 * factorial(4)
// Step 2: 5 * (4 * factorial(4 - 1)) = 5 * (4 * factorial(3))
// Step 3: 5 * (4 * (3 * factorial(3 - 1))) = 5 * (4 * (3 * factorial(2)))
// Step 4: 5 * (4 * (3 * (2 * factorial(2 - 1)))) = 5 * (4 * (3 * (2 * factorial(1))))
// Step 5: 5 * (4 * (3 * (2 * 1))) = 5 * (4 * (3 * 2)) = 5 * (4 * 6) = 5 * 24 = 120
// the recursive calls until the base case factorial(1) is reached, and then the multiplication is performed backward
