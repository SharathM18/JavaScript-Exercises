//higher order function - map, filter, reduce

let student = [
  {
    name: "alex",
    usn: 31,
    marks: 80,
  },
  {
    name: "gale",
    usn: 15,
    marks: 69,
  },
  {
    name: "raju",
    usn: 16,
    marks: 35,
  },
  {
    name: "brock",
    usn: 7,
    marks: 55,
  },
];

// question1: return only name of the student in capital

let result1 = student.map((val, idx, arr) => {
  return val.name.toUpperCase();
});

console.log(result1);
console.log("\n");

//question2: return only details of those who scored more than 60

let result2 = student.filter((val, idx, arr) => {
  return val.marks > 60;
});

console.log(result2);
console.log("\n");

//question3: more than 60 marks and usn greater than 15

let result3 = student.filter((val, idx, arr) => {
  return val.marks > 60 && val.usn > 15;
});

console.log(result3);
console.log("\n");

//question4:sum of marks of the students

let result4 = student.reduce((acc, curr, idx, arr) => {
  return acc + curr.marks;
}, 0);

console.log(result4);
console.log("\n");

//question5: return only names of the student who scored more tha 60

let result5 = student
  .filter((val) => {
    return val.marks > 60;
  })
  .map((val, idx, arr) => {
    return val.name;
  });

console.log(result5);
console.log("\n");

//question6: return total marks for all student with marks grater than 60 and after 20 marks added to those who scored less than 60

let result6 = student
  .map((val, idx, arr) => {
    if (val.marks < 60) {
      val.marks += 20;
    } else {
      val.marks;
    }
    return val.marks;
  })
  .filter((val, idx, arr) => {
    return val > 60;
  })
  .reduce((acc, curr, idx, arr) => {
    return acc + curr;
  }, 0);

console.log(result6);
console.log("\n");
