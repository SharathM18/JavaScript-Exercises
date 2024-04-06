// setTimeout

function x() {
  for (var i = 1; i <= 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
}
x();
// By the time the setTimeout callbacks execute, the loop has already finished, and i has been incremented to 6.(the for loop does not wait, until setTimeout function execute)
// So, when the callbacks execute, they all reference the same variable i (because var is a global scope), which has the final value of 6.

// output
// 6
// 6
// 6
// 6
// 6

function y() {
  for (let i = 1; i <= 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
}
y();
// Each iteration of the loop creates a new lexical environment for the callback function

//output
// 1
// 2
// 3
// 4
// 5

function z() {
  for (var i = 1; i <= 5; i++) {
    function c(i) {
      setTimeout(() => {
        console.log(i);
      }, i * 1000);
    }
    c(i);
  }
}
z();
// Each call to c(i) creates a new closure, capturing the value of i at that iteration.

//output
// 1
// 2
// 3
// 4
// 5
