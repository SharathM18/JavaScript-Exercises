// curring in js - currying is the process of the taking a function with multiple args and turning it into a sequence of function in which each function have a only single args.

//function declaration or statements
function calculateVolume(length, breath, height) {
  return length * breath * height;
}
console.log(calculateVolume(1, 2, 3));

//curried function using function declaration and anonymous statements
function calculateVolume(length) {
  return function (breath) {
    return function (height) {
      return length * breath * height;
    };
  };
}

console.log(calculateVolume(1)(2)(3));

//curried function using Arrow declaration
const calculateVolume = (length) => {
  return (breath) => {
    return (height) => {
      return length * breath * height;
    };
  };
};

console.log(calculateVolume(1)(2)(3));

/*example question1: 
evaluate("addition")(4)(2)
evaluate("subtraction")(4)(2);
evaluate("multiply")(4)(2);
evaluate("divide")(4)(2);
*/

function evaluate(operation) {
  return function (num1) {
    return (num2) => {
      switch (operation) {
        case "addition":
          return num1 + num2;
          break;
        case "subtraction":
          return num1 - num2;
          break;
        case "multiply":
          return num1 * num2;
          break;
        case "divide":
          return num1 / num2;
          break;
        default:
          return "invalid operation";
      }
    };
  };
}

console.log(evaluate("addition")(4)(2));
console.log(evaluate("subtraction")(4)(2));
console.log(evaluate("multiply")(4)(2));
console.log(evaluate("divide")(4)(2));

// Infinite curring - sum(1)(2)(3)()

function sum(num) {
  return (nextNum) => {
    if (nextNum) {
      return sum(num + nextNum);
    } else {
      return num;
    }
  };
}

console.log(sum(1)(2)(4)());
