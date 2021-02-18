console.log('JS is connected');
//
// let mainBtn = document.querySelector("img.main-btn");
let rulesBtn = document.querySelector(".secondary-btn")
let rules = document.querySelector("#rules");
let btnNoise = document.getElementById('bamboo-noise');

//Button for rules
function toggleHidden() {
    btnNoise.play();
    rules.classList.toggle('hidden');
    rules.classList.add('slide-in-top');
}

rulesBtn.addEventListener('click', toggleHidden);

setTimeout(() => {
    rulesBtn.classList.remove('slide-in-top')
    rulesBtn.classList.add('heartbeat');
}, 2000);

