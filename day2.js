// closures

//question1: write a function that would allow you to do this
//var addSix = outer(6);
// console.log(addSix(10)); returns 16
// console.log(addSix(21)); returns 27

function outer(num) {
  function inner(num2) {
    return num + num2;
  }
  return inner;
}

var addSix = outer(6);
console.log(addSix(10));
console.log(addSix(21));

//question2:

function outer() {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log(i), i * 1000;
    });
  }
}

outer(); // 3 3 3

function outer() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log(i), i * 1000;
    });
  }
}

outer(); //0 1 2

// let create a separate block scope for each value 0, 1, 2 but var does not create a separate block scope it only refers to global scope

// other example1:

for (var i = 0; i < 3; i++) {
  function outer(i) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
  outer(i);
}

// other example2:

function videoLike() {
  let likeCount = 0;
  function inner() {
    if (likeCount > 0) {
      console.log("Already liked!");
    } else {
      console.log("you're liked the video!!");
      likeCount++;
    }
  }
  return inner;
}

let isLiked = videoLike();
isLiked();
isLiked();
isLiked();
isLiked();
