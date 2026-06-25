// const car = {
//   model: "i10",
//   brand: "hyundai",
//   year: 2020,
// };

// console.log(car["model"]);
// console.log(car.model);

// car["model"] = "i20 asta";

// console.log(car["model"]);

// car["color"] = "grey";

// console.log(car);

// ===============================
// CONSTRUCTOR FUNCTION VERSION
// ===============================

// A constructor function is a normal function
// that is used to create objects.
//
// By convention, constructor functions start
// with a CAPITAL letter.
//
// When we use "new Car()", JavaScript:
// 1. Creates an empty object {}
// 2. Sets "this" to that new object
// 3. Runs the function
// 4. Returns the object automatically

function Car(model, brand, year) {
  // "this" refers to the new object being created
  // At this moment it is an empty object: {}
  console.log(this);

  // We attach properties to the object using "this"
  // Now the object gets data

  this.car_model = model; // store model value inside object
  this.car_brand = brand; // store brand value inside object
  this.year = year; // store year value inside object

  // We attach a method (function) to the object
  // This function belongs to the object

  this.info = () => {
    console.log(
      // Template string (backticks ` `)
      // allows inserting variables using ${}
      `Model : ${this.car_model}\nBrand : ${this.car_brand}\nYear : ${this.year}`
    );
  };
}

// "new" keyword creates a new object using Car constructor
let myCar = new Car("figo", "ford", 2018);

// Print the created object
console.log(myCar);

// ===============================
// CLASS VERSION
// ===============================

// A class is a cleaner, modern way to create objects
// It does the same job as constructor function
// but syntax is easier to read

class Bike {
  // constructor() runs automatically
  // when we create object using "new Bike()"
  constructor(model, brand, year, color) {
    // "this" is the new object being created
    console.log(this);

    // store values inside the object
    this.model = model;
    this.brand = brand;
    this.year = year;
    this.color = color;
  }

  // This is a method of the class
  // All objects created from Bike share this method
  info() {
    console.log(
      `Model : ${this.model}\nBrand : ${this.brand}\nYear : ${this.year}`
    );
  }
}

// Create object from class
let myBike = new Bike("sp 125", "honda", 2010, "red");

// Print object
console.log(myBike);

//////////////////

// ✅ 5 Practice Tasks
// Task 1
// Create a constructor function Student
// properties: name, age, course
// method: info()

// Task 2
// Create a class Mobile
// properties: brand, price, color
// method: details()

// Task 3
// Create 3 objects from Student constructor
// Print them

// Task 4
// Create a class Laptop
// properties: brand, ram, storage
// method: specs()

// Task 5
// Add a method that calculates age after 5 years
// Example:
// current age: 20
// after 5 years: 25
