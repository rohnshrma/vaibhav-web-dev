// arithmatic operators
console.log(5 + 5); // sum
console.log(5 - 5); // difference
console.log(5 * 5); // product
console.log(5 / 5); // quotient
console.log(5 % 5); // remainder
console.log(5 ** 5); // power

// assignment operators
let a = 5; // regular assignment
console.log(a);
a += 5; // add and assign
console.log(a);
a -= 5; // subtract and assign
console.log(a);
a *= 5; // multiply and assign
console.log(a);
a /= 5; // divide and assign
console.log(a);
a %= 5; // remainder and assign
console.log(a);
a **= 5; // power and assign
console.log(a);

console.log("======COMPARISON OPERATORS======");

// comparison operators
// value comparison
console.log(5 == 5); // equal to
console.log("5" == 5); // equal to

// strict equals to
// value and type comparison
console.log(5 === 5); // equal value and equal type
console.log("5" === 5); // equal value and equal type

// not equals to (compares value)
console.log(5 != 5); // not equal to : false
console.log("5" != 5); // not equal to : false

// not equals to (compares value and type)
console.log(5 !== 5); // not equal value or not equal type : false
console.log("5" !== 5); // not equal value or not equal type : true

console.log(5 > 5); // greater than
console.log(5 < 5); // less than
console.log(5 >= 5); // greater than or equal to
console.log(5 <= 5); // less than or equal to

// logical operators
// && , || , !

// and : expects all the conditions to be true
console.log(12 > 10 && 10 < 12); // true && true = true;
console.log(12 < 10 && 10 < 12); // false && true = false;
console.log(12 < 10 && 10 > 12); // false && false = false;

// or : expects atleast one of the conditions to be true
console.log(12 > 10 || 10 < 12); // true || true = true;
console.log(12 < 10 || 10 < 12); // false || true = true;
console.log(12 < 10 || 10 > 12); // false || false = false;

// not : reverse boolean outcome
console.log(!true); // false
console.log(!false); // true
console.log(!5 > 10); // true
console.log(!5 < 10); // false
