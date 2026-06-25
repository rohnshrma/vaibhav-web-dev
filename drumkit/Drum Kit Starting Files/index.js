let drums = document.querySelectorAll(".drum");
console.log(drums);

drums.forEach((drum) =>
  drum.addEventListener("click", (e) => {
    console.log(e.target.innerText);
    playSound(e.target.innerText);
    animate(e.target.innerText);
  })
);

document.addEventListener("keydown", (e) => {
  playSound(e.key);
  animate(e.key);
});
function playSound(key) {
  switch (key) {
    case "w":
      var audio = new Audio("./sounds/crash.mp3");
      audio.play();
      break;
    case "a":
      var audio = new Audio("./sounds/kick-bass.mp3");
      audio.play();
      break;
    case "s":
      var audio = new Audio("./sounds/snare.mp3");
      audio.play();
      break;
    case "d":
      var audio = new Audio("./sounds/tom-1.mp3");
      audio.play();
      break;
    case "j":
      var audio = new Audio("./sounds/tom-2.mp3");
      audio.play();
      break;
    case "k":
      var audio = new Audio("./sounds/tom-3.mp3");
      audio.play();
      break;
    case "l":
      var audio = new Audio("./sounds/tom-4.mp3");
      audio.play();
      break;
  }
}

function animate(key) {
  const drum = document.querySelector(`.${key}`);
  drum.classList.add("pressed");

  setTimeout(() => {
    drum.classList.remove("pressed");
  }, 100);
}
