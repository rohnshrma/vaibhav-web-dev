let dishdata = [
  {
    name: "Butter Chicken",
    price: 320,
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    description:
      "Creamy tomato-based chicken curry cooked with butter and spices.",
    type: "non-veg",
    category: "Main Course",
  },
  {
    name: "Paneer Butter Masala",
    price: 280,
    imageUrl:
      "https://images.pexels.com/photos/30858402/pexels-photo-30858402.jpeg",
    description: "Soft paneer cubes in rich buttery tomato gravy.",
    type: "veg",
    category: "Main Course",
  },
  {
    name: "Chicken Biryani",
    price: 350,
    imageUrl: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a",
    description: "Aromatic basmati rice cooked with chicken and spices.",
    type: "non-veg",
    category: "Rice",
  },
  {
    name: "Veg Biryani",
    price: 280,
    imageUrl:
      "https://www.whiskaffair.com/wp-content/uploads/2020/08/Veg-Biryani-2-3.jpg",
    description: "Flavored rice cooked with mixed vegetables.",
    type: "veg",
    category: "Rice",
  },
  {
    name: "Masala Dosa",
    price: 120,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8f/Rameshwaram_Cafe_Dosa.jpg",
    description: "Crispy dosa stuffed with spiced potato filling.",
    type: "veg",
    category: "South Indian",
  },
  {
    name: "Idli Sambar",
    price: 90,
    imageUrl:
      "https://sapanarestaurant.com/wp-content/uploads/2019/11/idli-sambar.jpg",
    description: "Steamed rice cakes served with sambar and chutney.",
    type: "veg",
    category: "South Indian",
  },
  {
    name: "Chole Bhature",
    price: 180,
    imageUrl:
      "https://madhurasrecipe.com/wp-content/uploads/2025/09/MR-Chole-Bhature-featured.jpg",
    description: "Spicy chickpeas served with fluffy fried bhature.",
    type: "veg",
    category: "North Indian",
  },
  {
    name: "Rajma Chawal",
    price: 160,
    imageUrl:
      "https://www.secondrecipe.com/wp-content/uploads/2017/08/rajma-chawal-1.jpg",
    description: "Kidney bean curry served with rice.",
    type: "veg",
    category: "North Indian",
  },
  {
    name: "Dal Makhani",
    price: 220,
    imageUrl:
      "https://www.pureindianfoods.com/cdn/shop/articles/Dal-Makhani.webp?v=1753479167",
    description: "Slow-cooked black lentils with butter and cream.",
    type: "veg",
    category: "Main Course",
  },
  {
    name: "Palak Paneer",
    price: 240,
    imageUrl:
      "https://healthynibblesandbits.com/wp-content/uploads/2020/01/Saag-Paneer-FF.jpg",
    description: "Paneer cooked in smooth spinach gravy.",
    type: "veg",
    category: "Main Course",
  },
  {
    name: "Samosa",
    price: 40,
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    description: "Crispy fried snack filled with spiced potatoes.",
    type: "veg",
    category: "Snacks",
  },
  {
    name: "Pav Bhaji",
    price: 150,
    imageUrl: "https://images.unsplash.com/photo-1626132647523-66f5bf380027",
    description: "Spicy mashed vegetables served with buttered pav.",
    type: "veg",
    category: "Street Food",
  },
  {
    name: "Vada Pav",
    price: 35,
    imageUrl:
      "https://blog.swiggy.com/wp-content/uploads/2024/11/Image-1_mumbai-vada-pav-1024x538.png",
    description: "Mumbai-style potato fritter burger.",
    type: "veg",
    category: "Street Food",
  },
  {
    name: "Tandoori Chicken",
    price: 360,
    imageUrl: "https://images.unsplash.com/photo-1626074353765-517a681e40be",
    description: "Yogurt-marinated chicken roasted in tandoor.",
    type: "non-veg",
    category: "Starters",
  },
  {
    name: "Fish Curry",
    price: 320,
    imageUrl:
      "https://www.teaforturmeric.com/wp-content/uploads/2023/06/Fish-Curry-Recipe.jpg",
    description: "Indian-style fish curry with spices.",
    type: "non-veg",
    category: "Seafood",
  },
  {
    name: "Aloo Paratha",
    price: 90,
    imageUrl:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2020/08/aloo-paratha-recipe-500x500.jpg",
    description: "Stuffed paratha filled with spiced potatoes.",
    type: "veg",
    category: "Breakfast",
  },
  {
    name: "Poha",
    price: 70,
    imageUrl:
      "https://www.funfoodfrolic.com/wp-content/uploads/2024/04/Kanda-Poha-Blog.jpg",
    description: "Flattened rice cooked with onions and peanuts.",
    type: "veg",
    category: "Breakfast",
  },
  {
    name: "Gulab Jamun",
    price: 80,
    imageUrl:
      "https://www.cadburydessertscorner.com/hubfs/dc-website-2022/articles/soft-gulab-jamun-recipe-for-raksha-bandhan-from-dough-to-syrup-all-you-need-to-know/soft-gulab-jamun-recipe-for-raksha-bandhan-from-dough-to-syrup-all-you-need-to-know.webp",
    description: "Milk-solid balls soaked in sugar syrup.",
    type: "veg",
    category: "Dessert",
  },
  {
    name: "Rasgulla",
    price: 90,
    imageUrl: "https://static.toiimg.com/photo/52743612.cms",
    description: "Soft spongy cheese balls in sugar syrup.",
    type: "veg",
    category: "Dessert",
  },
];

// Array is used to store multiple values
// These values can be of same or different data types

// Square brackets [ ] are used to create an array
// Each item inside the array is separated by a comma (,)

// Array characteristics:
// 1. Ordered → maintains insertion order
// 2. Indexed → index starts from 0
// 3. Changeable → values can be modified
// 4. Allows duplicates → same value can repeat

let marks = [23, 23, 1234, 12, 3, 1, 3, 3, 431];

// Prints the entire array
console.log(marks);

// Accessing array elements using index
// Index starts from 0

console.log(marks[0]); // first element
console.log(marks[4]); // fifth element

// JavaScript does NOT support negative indexing using []
// So this will return undefined
console.log(marks[-1]);

// push() → adds a new element at the END of the array
marks.push(345);
console.log(marks);

// unshift() → adds a new element at the START of the array
marks.unshift(545);
console.log(marks);

// pop() → removes the LAST element from the array
marks.pop();
console.log(marks);

// shift() → removes the FIRST element from the array
marks.shift();
console.log(marks);

// reverse() → reverses the order of elements in the array
marks.reverse();
console.log(marks);

// flat() → converts a nested array into a single array
console.log(
  [
    [1, 2, 3],
    [4, 5, 6],
  ].flat()
);

// at() → returns element at a specific index
// Supports both positive and negative indexing

console.log(marks.at(1)); // second element
console.log(marks.at(-1)); // last element

// find() → returns the FIRST element that satisfies the condition
// Callback receives (element, index, array)

let res = marks.find(function (mark, i, arr) {
  return i == 2; // returns element at index 2
});

console.log(res);

// forEach() → used for iteration
// It does NOT return anything

marks.forEach((mark, i) => {
  console.log(mark, i);
});

// Creating an empty array
let sqs = [];

// Using for loop to store squares of numbers
for (let i = 0; i < marks.length; i++) {
  sqs.push(marks[i] ** 2);
}

// Using forEach() to store squares
marks.forEach(function (mark) {
  sqs.push(mark ** 2);
});

console.log(sqs);

// map() → returns a NEW array after applying logic
// Best alternative to forEach + push

let sqs2 = marks.map(function (mark) {
  return mark ** 2;
});

console.log(sqs2);

// 📝 20 Practice Tasks (Arrays – Same Concepts)
// 🔹 Basic Understanding

// Create an array of 5 city names and print it.

// Access and print the first and last element of the array.

// Try accessing an index that does not exist. What do you get?

// Check whether arrays allow duplicate values by example.

// 🔹 push / pop / shift / unshift

// Add a new number at the end of an array using push().

// Remove the last element using pop().

// Add a value at the beginning using unshift().

// Remove the first value using shift().

// 🔹 Indexing & at()

// Print the 3rd element using normal indexing.

// Print the last element using at() with negative index.

// 🔹 reverse & flat

// Reverse an array of numbers.

// Create a nested array and convert it into a single array using flat().

// 🔹 find()

// Use find() to get the first number greater than 50.

// Use find() to return the element at index 1.

// 🔹 forEach

// Print all elements with their index using forEach().

// Print only even numbers using forEach().

// 🔹 map

// Create a new array that contains squares of numbers using map().

// Convert an array of numbers into their cube using map().

// 🔹 Logic Based

// From an array of marks, create a new array where marks > 40 are increased by 5.

// Create an array of prices and use map() to add 18% GST to each price.

// ==== filter ====
// return item from an array which satisfies the condition

let evens = marks.map(function (mark) {
  return mark % 2 === 0;
});

console.log(evens);

let nums = [1, 2, 3];

// [{ 1: "odd" }, { 2: "even" }, { 3: "odd" }];

let solutions = [];

nums.forEach(function (n) {
  n % 2 === 0
    ? solutions.push({ [n]: "even" })
    : solutions.push({ [n]: "odd" });
});
console.log(solutions);

// let answers = nums.map(function (n) {
//   return n % 2 === 0 ? {[n]: "even" } : { [n]: "odd" };
// });
// console.log(answers);

// let answers = nums.map(function (n) {
//   if (n % 2 === 0) {
//     return { [n]: "even" };
//   } else {
//     return { [n]: "odd" };
//   }
// });
// console.log(answers);

// let answers = nums.map(function (n) {
//   return { [n]: n % 2 === 0 ? "even" : "odd" };
// });
// console.log(answers);

// let data = [{ name: "john" }, { name: "jake" }, { name: "sully" }];

// let x = data.map(function (obj, i) {
//   return { ...obj, id: i + 1 * 100 };
// });

// console.log(x);

console.log(dishdata);

dishdata = dishdata.map(function (dish) {
  return { ...dish, rating: Math.floor(Math.random() * 5) + 1 };
});
console.log(dishdata);

let bestDishes = dishdata.filter(function (dish) {
  return dish.rating >= 4;
});

console.log(bestDishes);

// let sorted = dishdata.sort(function (a, b) {
//   return a.price - b.price;
// });
// let sorted = dishdata.sort(function (a, b) {
//   return b.price - a.price;
// });
let sorted = dishdata.sort(function (a, b) {
  return b.name.localeCompare(a.name);
});

console.log(sorted);

// =============== TASKS

let products = [
  {
    id: 101,
    name: "Wireless Mouse",
    price: 899,
    category: "Electronics",
    brand: "Logitech",
    rating: 4.3,
    inStock: true,
    quantity: 24,
  },
  {
    id: 102,
    name: "Bluetooth Headphones",
    price: 2499,
    category: "Electronics",
    brand: "Boat",
    rating: 4.1,
    inStock: true,
    quantity: 21,
  },
  {
    id: 103,
    name: "Laptop Stand",
    price: 1299,
    category: "Accessories",
    brand: "Portronics",
    rating: 3.8,
    inStock: false,
    quantity: 0,
  },
  {
    id: 104,
    name: "Mechanical Keyboard",
    price: 4599,
    category: "Electronics",
    brand: "Redragon",
    rating: 4.6,
    inStock: true,
    quantity: 112,
  },
  {
    id: 105,
    name: "Office Chair",
    price: 7499,
    category: "Furniture",
    brand: "Green Soul",
    rating: 4.4,
    inStock: true,
    quantity: 55,
  },
  {
    id: 106,
    name: "Water Bottle",
    price: 499,
    category: "Home",
    brand: "Milton",
    rating: 4.0,
    inStock: false,
    quantity: 0,
  },
  {
    id: 107,
    name: "USB-C Cable",
    price: 299,
    category: "Accessories",
    brand: "AmazonBasics",
    rating: 4.2,
    inStock: true,
    quantity: 11,
  },
  {
    id: 108,
    name: "Smart Watch",
    price: 3999,
    category: "Electronics",
    brand: "Noise",
    rating: 3.9,
    inStock: true,
    quantity: 21,
  },
  {
    id: 109,
    name: "Desk Lamp",
    price: 1599,
    category: "Home",
    brand: "Wipro",
    rating: 4.5,
    inStock: true,
    quantity: 2,
  },
  {
    id: 110,
    name: "Backpack",
    price: 2199,
    category: "Accessories",
    brand: "Wildcraft",
    rating: 4.1,
    inStock: false,
    quantity: 0,
  },
];

// Task 1️⃣
// 👉 forEach ka use karke sab products ke name print karo.

// Task 2️⃣
// 👉 map use karke sirf product names ka array banao.

// Task 3️⃣
// 👉 map use karke price par 10% discount lagao
// (New key: discountPrice)

// Task 4️⃣
// 👉 filter use karke sirf Electronics category ke products nikalo.

// Task 5️⃣
// 👉 filter use karke sirf in-stock products ka array banao.

// Task 6️⃣
// 👉 filter use karke price > 2000 wale products nikalo.

// Task 7️⃣
// 👉 sort use karke price low → high order me sort karo.

// Task 8️⃣
// 👉 sort use karke price high → low order me sort karo.

// Task 9️⃣
// 👉 sort use karke product name A → Z order me sort karo.

// Task 🔟
// 👉 sort use karke brand name Z → A order me sort karo
// (hint: localeCompare)

// Task 1️⃣1️⃣
// 👉 map use karke isPremium key add karo
// true if price > 3000 else false

// Task 1️⃣2️⃣
// 👉 filter use karke sirf premium products nikalo.

// Task 1️⃣3️⃣
// 👉 map use karke GST (18%) ke saath final price add karo
// (New key: priceWithGST)

// Task 1️⃣4️⃣
// 👉 forEach use karke total stock value nikaalo
// (only inStock === true products)

// Task 1️⃣5️⃣
// 👉 filter + map
// ➡️ Sirf Accessories category
// ➡️ Output me {name, price} only

// Task 1️⃣6️⃣
// 👉 filter + sort
// ➡️ Rating ≥ 4 wale products
// ➡️ Sort by rating high → low

// Task 1️⃣7️⃣
// 👉 map use karke product label banao
// Example: "Wireless Mouse (Logitech)"

// Task 1️⃣8️⃣
// 👉 filter use karke out of stock products nikalo.

// Task 1️⃣9️⃣
// 👉 map use karke price range tag add karo

// "Budget" → price < 1000

// "Mid" → 1000–3000

// "Premium" → > 3000

// Task 2️⃣0️⃣ 🔥 (Advanced Combo)
// 👉 filter → map → sort
// ➡️ In-stock products
// ➡️ Rating ≥ 4
// ➡️ Output {name, price, rating}
// ➡️ Sort by price low → high

// == reduce

// when value of pv is not explicitly defined
// pv = marks[0]
// cv = marks[1]

console.log(marks);

// return sum of all values of an array

// let total = marks.reduce(function (sum, cv) {
//   console.log(sum, cv);
//   return sum + cv;
// });

// console.log(total);

// let max = marks.reduce(function (max, cv) {
//   return cv > max ? cv : max;
// });

// console.log(max);

// when value of pv is defined explicitly

// pv = user defined
// cv = arr[0]

let min = marks.reduce(function (min, cv) {
  if (cv < min) {
    return cv;
  } else {
    return min;
  }
}, marks[0]);

console.log(min);

// Task 1️⃣4️⃣
// 👉 forEach use karke total stock value nikaalo
// (only inStock === true products)

// let totalStockValue = products
//   .filter((product) => product.inStock)
//   .reduce((total, product) => (total += product.price * product.quantity), 0);

// console.log(totalStockValue);
//what if a product has more than one item in stock

// Task 1️⃣5️⃣
// 👉 filter + map
// ➡️ Sirf Accessories category
// ➡️ Output me {name, price} only

let acc_products = products
  .filter((product) => product.category === "Accessories")
  .map((product) => {
    return { name: product.name, price: product.price };
  });

console.log(acc_products);

let labels = products.map((product) => `${product.name} (${product.brand})`);

console.log(labels);

//  Task 2️⃣0️⃣ 🔥 (Advanced Combo)
// 👉 filter → map → sort
// ➡️ In-stock products
// ➡️ Rating ≥ 4
// ➡️ Output {name, price, rating}
// ➡️ Sort by price low → high

//filter + sort
// ➡️ Rating ≥ 4 wale products
// ➡️ Sort by rating high → low

let avStock = products
  .filter((product) => product.inStock && product.rating >= 4)
  .map((product) => {
    return { name: product.name, price: product.price, rating: product.rating };
  })
  .sort((a, b) => b.rating - a.rating);

console.log(avStock);

// ==========================
// 🔥 Part 1 — Reduce Only (6 Tasks)
// Task 1:
// Use reduce to calculate the total inventory value.
// (price × quantity for all products)

// Task 2:
// Use reduce to find the total quantity of all products in stock.

// Task 3:
// Use reduce to find the product with the highest rating.

// Task 4:
// Use reduce to count how many products are out of stock.

// Task 5:
// Use reduce to calculate total price of Electronics category only.

// Task 6:
// Use reduce to find the most expensive product.

// 🚀 Part 2 — Combined Tasks (20)

// Each task must use:
// 👉 map + sort + reduce / forEach

// Task 1:
// Add 10% GST to all prices using map,
// sort by highest price,
// reduce total final price.

// Task 2:
// Convert price into dollars (divide by 80) using map,
// sort cheapest to expensive,
// forEach print converted prices.

// Task 3:
// Increase rating by 0.5 using map,
// sort highest rating first,
// reduce average rating.

// Task 4:
// Create product labels (name + brand) using map,
// sort alphabetically,
// forEach print labels.

// Task 5:
// Apply 20% discount using map,
// sort cheapest first,
// reduce total discounted inventory value.

// Task 6:
// Convert quantity to stock value (price × quantity) using map,
// sort highest stock value first,
// reduce total warehouse value.

// Task 7:
// Add "★" after each rating using map,
// sort by rating,
// forEach print formatted ratings.

// Task 8:
// Increase price by ₹100 using map,
// sort highest first,
// reduce total increase amount.

// Task 9:
// Extract product names using map,
// sort alphabetically,
// forEach print names.

// Task 10:
// Add shipping cost ₹50 using map,
// sort by final price,
// reduce total revenue.

// Task 11:
// Convert prices to strings with ₹ symbol using map,
// sort by price,
// forEach display formatted price.

// Task 12:
// Increase quantity by 5 using map,
// sort highest quantity,
// reduce total quantity.

// Task 13:
// Create objects with name + rating using map,
// sort by rating,
// forEach print summary.

// Task 14:
// Add clearance discount ₹200 using map,
// sort cheapest first,
// reduce total clearance value.

// Task 15:
// Double stock value using map,
// sort highest stock value,
// reduce total value.

// Task 16:
// Create uppercase names using map,
// sort alphabetically,
// forEach print.

// Task 17:
// Convert rating to percentage using map,
// sort highest,
// reduce average percentage.

// Task 18:
// Add tax + shipping using map,
// sort final price,
// reduce total revenue.

// Task 19:
// Create summary strings using map,
// sort alphabetically,
// forEach display.

// Task 20:
// Add bonus stock using map,
// sort highest quantity,
// reduce total inventory count.

// return true one or more item passes the given condition
// console.log(products.some((product) => product.rating > 4));
// console.log(products.some((product) => product.rating == 1));

// return true if all items passes the given condition
// console.log(products.every((product) => product.rating > 1));
// console.log(products.every((product) => product.rating > 4));
