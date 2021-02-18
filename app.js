console.log('hey');
//
let mainBtn = document.querySelector("img.main-btn");
let rulesBtn = document.querySelector(".secondary-btn")
let rules = document.querySelector("#rules");

//
function toggleHidden() {
    rules.classList.toggle('hidden');
    rules.classList.add('slide-in-top');
}

rulesBtn.addEventListener('click', toggleHidden);

//

rulesBtn.setTimeout(() => {
    rulesBtn.classList.add('heartbeat');
}, 2000);