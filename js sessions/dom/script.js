// selectors
// id : single element
console.log(document.getElementById("main"));

// class : HTMLCollection
console.log(document.getElementsByClassName("para"));
console.log(document.getElementsByClassName("para"));

// tagname : HTMLCollection
console.log(document.getElementsByTagName("p"));

// querySelector: return element first occurance (by given selector)

console.log(document.querySelector("#main"));
console.log(document.querySelector(".para"));
console.log(document.querySelector("p"));

console.log(document.querySelectorAll("#main"));
console.log(document.querySelectorAll(".para"));
console.log(document.querySelectorAll("p"));

let mainDiv = document.querySelector("#main");
let headOne = document.querySelector("h1");

// get and set
// style , text , html , attributes

console.log(mainDiv.innerHTML);
console.log(headOne.innerText);
console.log(headOne.innerHTML);

// headOne.innerText = "Bye bye <i>world</i>";
// headOne.innerHTML = "Bye bye <i>world</i>";

// get styles
console.log(headOne.style);

// appends properties
// headOne.style.border = "10px solid grey";

// console.log(headOne.style);

// overwrite properties
// headOne.style = "border: 1px solid black; padding:2rem;";

// attributes

// console.log(headOne.attributes);
// console.log(headOne.getAttribute("id"), headOne.getAttribute("style"));

// headOne.setAttribute("id", "ghnte_ka_id");

// let newH2 = document.createElement("h2");
// newH2.innerText = "im heading 2";
// newH2.setAttribute("id" , "")

// mainDiv.appendChild(newH2);

function genAlert() {
  alert("kaisa hai ?");
}
