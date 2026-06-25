// ==============================
// SHOPPING CART DATASET
// ==============================

const data = {
  user: {
    id: 101,
    name: "Rohan Sharma",
  },
  cart: [
    { id: 1, name: "Laptop", price: 65000, qty: 1, category: "Electronics" },
    { id: 2, name: "Mouse", price: 800, qty: 2, category: "Electronics" },
    { id: 3, name: "Shoes", price: 2500, qty: 1, category: "Fashion" },
    { id: 4, name: "T-Shirt", price: 900, qty: 3, category: "Fashion" },
    { id: 5, name: "Book", price: 500, qty: 2, category: "Education" },
    { id: 5, name: "Book", price: 500, qty: 2, category: "Education" },
  ],
};

// ==============================
// TASKS
// Use: map, filter, sort, forEach, reduce
// ==============================

// 1. Use map → Create an array of item names only.

let names = data.cart.map((item) => {
  return item.name;
});

// console.log("task 1", names);

// 2. Use map → Add 10% GST to every item price and return new array.

data.cart = data.cart.map((product) => {
  let gstRate = 10;
  let gstAmount = (product.price * 10) / 100;
  let finalAmount = product.price + gstAmount;

  return {
    ...product,
    gstRate: gstRate,
    gstAmount: gstAmount,
    finalAmount: finalAmount,
  };
});
// console.log("Task 2", data.cart);

// 3. Use filter → Get items with price above 1000.

let above1k = data.cart.filter((product) => {
  return product.price > 1000;
});
// console.log("Task 3", above1k);

// 4. Use filter → Get only Fashion category items.

let fashionProducts = data.cart.filter((product) => {
  return product.category === "Fashion";
});
// console.log("Task 4", fashionProducts);

// 5. Use forEach → Print:
// "Laptop x1 = 65000"

// data.cart.forEach((product) => {
//   console.log(`${product.name} X ${product.qty} = ${product.price}`);
// });

// 6. Use reduce → Calculate total cart value
// (price × qty)

let totalCartValue = data.cart.reduce((total, product) => {
  return total + product.price * product.qty;
}, 0);
// console.log(totalCartValue);

// 7. Use reduce → Count total number of unique items in cart.

let uniqueCount = data.cart.reduce((unique) => {
  return unique + 1;
}, 0);

console.log(uniqueCount);

// // 8. Use reduce → Total qty of all products combined.
// let totalqty = data.cart.reduce((total, product) => {
//   return total + product.qty;
// }, 0);
// console.log(totalqty);

// // 9. Use map + reduce → Apply 5% discount to each item
// // and return new total cart value.

// let discountedCartValue = data.cart
//   .map((product) => {
//     let discountRate = 5;
//     let discountAmount = (product.price * 5) / 100;
//     let finalDiscountedAmount = product.price - discountAmount;
//     return {
//       ...product,
//       discountRate,
//       discountAmount,
//       finalDiscountedAmount,
//     };
//   })
//   .reduce((total, product) => {
//     return total + product.price * product.qty;
//   }, 0);
// console.log(discountedCartValue);

// // 10. Use filter + reduce → Total spending on Electronics only.

// let Electronics = data.cart
//   .filter((product) => {
//     return product.category === "Electronics";
//   })
//   .reduce((total, products) => {
//     return total + products.price;
//   }, 0);
// console.log(Electronics);

// // 11. Add item to cart:
// // If item exists → increase qty
// // Else → add new item
// // Use map + push logic
// let item = { id: 5, name: "Book", price: 500, qty: 2, category: "Education" };
// let updatedCart = data.cart.map((product) => {
//   return (
//     product.id == item.id && {
//       ...product,
//       qty: product.qty + 1,
//     }
//   );
// });
// updatedCart.push(item);

// // 12. Update qty:
// // Increase Shoes qty by 2 using map.

// let shoes = data.cart.map((product) => {
//   if (product.name === "Shoes") {
//     return {
//       ...product,
//       qty: product.qty + 2,
//     };
//   }
// });
// console.log(shoes);

// // 13. Remove item:
// // Remove Book using filter.
// let shoeLess = data.cart.filter((product) => {
//   return product.name !== "Book";
// });
// console.log(shoeLess);
// // 14. Replace price:
// // Increase Laptop price by 2000 using map.
// let laptopPrice = data.cart.map((product) => {
//   if (product.name === "Laptop") {
//     return {
//       ...product,
//       price: product.price + 2000,
//     };
//     return product;
//   }
// });
// console.log(laptopPrice);

// // 15. Clear out-of-stock items:
// // Remove items where qty = 0 using filter.
// let outStock = data.cart.filter((product) => {
//   return product.qty > 0;
// });
// console.log(outStock);

// // 16. Use sort → Sort items by highest price first.

// let highest = data.cart.sort((a, b) => b.price - a.price);
// console.log(highest);

// // 17. Use sort → Sort by total value (price × qty).
// let totalvalue = data.cart.sort((a, b) => {
//   let totalA = a.price * a.qty;
//   let totalB = b.price * b.qty;
//   return totalB - totalA;
// });
// console.log(totalvalue);

// // 18. Use map + sort → Sort items by qty
// // and return only item names.

// let sortbyqty = data.cart
//   .sort((a, b) => {
//     return a.qty - b.qty;
//   })
//   .map((product) => {
//     return product.name;
//   });
// console.log(sortbyqty);

// // 19. Use reduce → Find most expensive item object.

// let mostExpensive = data.cart.reduce((total, product) => {
//   if (product.price > total.price) return product;
//   else {
//     return total;
//   }
// }, 0);
// console.log(mostExpensive);

// // 20. Use filter + map + reduce →
// // Average price of Fashion items.
// let avg =
//   data.cart
//     .filter((product) => {
//       return product.category === "Fashion";
//     })
//     .map((product) => {
//       product.price;
//     })
//     .reduce((total, product) => {
//       return total + product;
//     }, 0) /
//   data.cart.filter((product) => {
//     return product.category === "Fashion";
//   }).length;

// // ==============================
// // END OF ASSIGNMENT
// // ==============================

// let bb = data.cart.find((product) => {
//   return product.id == 100;
// });
// console.log(bb);

// if (bb) {
//   data.cart = data.cart.map((product) => {
//     return (
//       product.id == item.id && {
//         ...product,
//         qty: product.qty + 1,
//       }
//     );
//   });
// } else {
//   data.cart.push({
//     ...item,
//     qty: 1,
//   });
// }
// console.log(data.cart);

let occ = {};

"hello"
  .split("")
  .forEach((char) => (occ[char] ? (occ[char] += 1) : (occ[char] = 1)));
console.log(occ);

let uniques = {};

data.cart.forEach((product) => {
  uniques[product.name]
    ? (uniques[product.name] += 1)
    : (uniques[product.name] = 1);
});
console.log(uniques);

let uniquesCount = 0;
for (let key in uniques) {
  if (uniques[key] == 1) {
    uniquesCount += 1;
  }
}

console.log(uniquesCount);
