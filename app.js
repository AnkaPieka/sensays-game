console.log("JS is linked");
//

let rulesBtn = document.querySelector(".secondary-btn");
let rules = document.querySelector("#rules");
let btnNoise = document.getElementById("bamboo-noise");

//RULES PANEL and BUTTON//
function toggleHidden() {
  btnNoise.play();
  rules.classList.toggle("hidden");
  rules.classList.add("slide-in-top");
}

rulesBtn.addEventListener("click", toggleHidden);

setTimeout(() => {
  rulesBtn.classList.remove("slide-in-top");
  rulesBtn.classList.add("heartbeat");
}, 2000);
