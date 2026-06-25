let bulb = document.querySelector("img");

function on() {
  bulb.setAttribute("src", "./bulb_on.png");
}
function off() {
  bulb.setAttribute("src", "./bulb_off.png");
}

let onBtn = document.querySelector(".on");
let offBtn = document.querySelector(".off");

onBtn.addEventListener("click", on);
offBtn.addEventListener("click", off);
