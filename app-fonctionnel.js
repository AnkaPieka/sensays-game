//Liste éléments HTML

let bubble = document.querySelector(".bubble");
let movement = document.querySelector(".movement.name");
let count = document.querySelector("#count span");
let endScreen = document.querySelector("#end-screen");
let headerBtn = document.querySelectorAll(".level");
let easyMode = document.querySelector(".btn.easy");
let mediumMode = document.querySelector(".btn.medium");
let hardMode = document.querySelector(".btn.hard");
let goBack = document.querySelector(".main-page");
let tryAgain = document.querySelector(".btn.try-again");
let cheatSheetBtn = document.querySelector(".btn.bottom.cheat-sheet");
let cheatSheetDiv = document.querySelector("#cheat-sheet");
let btnNoise = document.getElementById("bamboo-noise");

//Shuto = arrow right;
// MaeGeri = arrow down;
// OiZuki = arrow up;
// MawashiGeri = arrow left;

//STARTING THE GAME:

function gameStart() {
  document.body.onkeyup = function (press) {
    if (press.keyCode == 13) {
      console.log("Game has started");
      setTimeout(function () {
        gameLogic();
      }, 200);
    }
  };
}

gameStart();

//SENSEI ORDERS:
let orderLevel1 = [
  [" Shuto"],
  [" Shuto", " OiZuki"],
  [" Shuto", " OiZuki", " OiZuki"],
  [" Shuto", " OiZuki", " OiZuki", " Shuto"],
  [" Shuto", " OiZuki", " OiZuki", " Shuto", " OiZuki"],
  [" Shuto", " OiZuki", " OiZuki", " Shuto", " OiZuki", " Shuto"],
  [" Shuto", " OiZuki", " OiZuki", " Shuto", " OiZuki", " Shuto", " OiZuki"],
  [
    " Shuto",
    " OiZuki",
    " OiZuki",
    " Shuto",
    " OiZuki",
    " Shuto",
    " OiZuki",
    " Shuto",
  ],
];

let orderLevel2 = [
  [" Shuto"],
  [" Shuto", " OiZuki"],
  [" Shuto", " OiZuki", " MaeGeri"],
  [" Shuto", " OiZuki", " MaeGeri", " MaeGeri"],
  [" Shuto", " OiZuki", " MaeGeri", " MaeGeri", " Shuto"],
  [" Shuto", " OiZuki", " MaeGeri", " MaeGeri", " Shuto", " OiZuki"],
  [" Shuto", " OiZuki", " MaeGeri", " MaeGeri", " Shuto", " OiZuki", " OiZuki"],
  [
    " Shuto",
    " OiZuki",
    " MaeGeri",
    " MaeGeri",
    " Shuto",
    " OiZuki",
    " OiZuki",
    " MaeGeri",
  ],
];

let orderLevel3 = [
  [" MawashiGeri"],
  [" MawashiGeri", " OiZuki"],
  [" MawashiGeri", " OiZuki", " MaeGeri"],
  [" MawashiGeri", " OiZuki", " MaeGeri", " MaeGeri"],
  [" MawashiGeri", " OiZuki", " MaeGeri", " MaeGeri", " MawashiGeri"],
  [
    " MawashiGeri",
    " OiZuki",
    " MaeGeri",
    " MaeGeri",
    " MawashiGeri",
    " OiZuki",
  ],
  [
    " MawashiGeri",
    " OiZuki",
    " MaeGeri",
    " MaeGeri",
    " MawashiGeri",
    " OiZuki",
    " Shuto",
  ],
  [
    " MawashiGeri",
    " OiZuki",
    " MaeGeri",
    " MaeGeri",
    " MawashiGeri",
    " OiZuki",
    " Shuto",
    " MaeGeri",
  ],
];

//ARRAY AND INDEX

let playerArray = [];
let array = [];

let currentIndex = 0;
let orderLine = array[currentIndex];

//BUTTONS

easyMode.addEventListener("click", () => {
  // console.log("1!");
  document.addEventListener("keydown", keyHandler);
  btnNoise.play();
  easyMode.classList.toggle("chosen-easy");
  easyMode.classList.remove("heartbeat");
  mediumMode.classList.remove("chosen-medium", "heartbeat");
  hardMode.classList.remove("chosen-hard", "heartbeat");
  array = orderLevel1;
  orderLine = array[currentIndex];
  disableAllLevelBtn();
  resetBubble();
});

mediumMode.addEventListener("click", () => {
  // console.log("2!");
  document.addEventListener("keydown", keyHandler);
  btnNoise.play();
  mediumMode.classList.toggle("chosen-medium");
  mediumMode.classList.remove("heartbeat");
  easyMode.classList.remove("chosen-easy", "heartbeat");
  hardMode.classList.remove("chosen-hard", "heartbeat");
  array = orderLevel2;
  orderLine = array[currentIndex];
  disableAllLevelBtn();
  resetBubble();
});

hardMode.addEventListener("click", () => {
  // console.log("3!");
  document.addEventListener("keydown", keyHandler);
  btnNoise.play();
  hardMode.classList.toggle("chosen-hard");
  hardMode.classList.remove("heartbeat");
  easyMode.classList.remove("chosen-easy", "heartbeat");
  mediumMode.classList.remove("chosen-medium", "heartbeat");
  array = orderLevel3;
  orderLine = array[currentIndex];
  disableAllLevelBtn();
  resetBubble();
});

tryAgain.addEventListener("click", () => {
  for (let i = 0; i < headerBtn.length; i++) {
    headerBtn[i].classList.remove(
      "chosen-easy",
      "chosen-medium",
      "chosen-hard"
    );
  }
  easyMode.disabled = false;
  mediumMode.disabled = false;
  hardMode.disabled = false;
  easyMode.classList.add("heartbeat");
  mediumMode.classList.add("heartbeat");
  hardMode.classList.add("heartbeat");
  bubble.classList.remove("wrong");
  endScreen.classList.add("hidden");
  bubble.classList.remove(
    "oizuki-color",
    "mawashigeri-color",
    "maegeri-color",
    "shuto-color"
  );
  resetBubble();
  movement.innerHTML = "Choose a level";
  array = [];
});

cheatSheetBtn.addEventListener("mouseover", () => {
  cheatSheetDiv.classList.toggle("hidden");
});

function resetBubble() {
  clearTimeout(playersTurnTimeout);
  clearTimeout(openEndScreen);
  bubble.classList.remove("wrong");
  playerArray = [];
  currentIndex = 0;
  movement.innerHTML = "Press ENTER when you're ready to show your skills.";
  score = 0;
  count.innerHTML = `${Number(score)}`;
  // console.log(playerArray);
}

function disableAllLevelBtn() {
  mediumMode.disabled = true;
  easyMode.disabled = true;
  hardMode.disabled = true;
}

//GAME LOGIC

function gameLogic() {
  if (array.length === 0) {
    movement.innerHTML = `CHOOSE. A. LEVEL !`;
    return;
  }
  movement.innerHTML = `${orderLine} !`;
  scoreBoard();

  setTimeout(function () {
    movement.innerHTML = `${orderLine} ! <br>Quick...`;
  }, 2000);

  playersTurn();
}

//PUSHING PLAYERS CMD and ADDING TIMEOUT

let playersTurnTimeout;
function playersTurn() {
  playersTurnTimeout = setTimeout(function () {
    compareOrders();
    bubble.classList.remove(
      "oizuki-color",
      "mawashigeri-color",
      "maegeri-color",
      "shuto-color"
    );
  }, 3000);
}

function keyHandler(press) {
  const keyName = press.key;
  if (keyName === "ArrowRight") {
    playerArray.push(" Shuto");
    bubble.classList.add("shuto-color");
    bubble.classList.remove(
      "oizuki-color",
      "mawashigeri-color",
      "maegeri-color"
    );
  } else if (keyName === "ArrowUp") {
    playerArray.push(" OiZuki");
    bubble.classList.add("oizuki-color");
    bubble.classList.remove(
      "shuto-color",
      "mawashigeri-color",
      "maegeri-color"
    );
  } else if (keyName === "ArrowLeft") {
    playerArray.push(" MawashiGeri");
    bubble.classList.add("mawashigeri-color");
    bubble.classList.remove("oizuki-color", "shuto-color", "maegeri-color");
  } else if (keyName === "ArrowDown") {
    playerArray.push(" MaeGeri");
    bubble.classList.add("maegeri-color");
    bubble.classList.remove("oizuki-color", "mawashigeri-color", "shuto-color");
  } else if (keyName === "Enter") {
    return;
  } else {
    movement.innerHTML = "Not a move";
  }
  // console.log(playerArray);
}

//COMPARING FINAL CMDS
function compareOrders() {
  console.log(playerArray);
  if (JSON.stringify(playerArray) === JSON.stringify(orderLine)) {
    rightCmd();
  } else {
    wrongCmd();
  }
}

//Functions for right and wrong cmds
let openEndScreen;
function wrongCmd() {
  movement.innerHTML = "NO !";
  bubble.classList.add("wrong");
  playerArray = [];
  openEndScreen = setTimeout(function () {
    endScreen.classList.remove("hidden");
    endScreen.classList.add("active");
  }, 1000);
}

function rightCmd() {
  if (orderLine.length !== array.length) {
    bubble.classList.remove("wrong");
    movement.innerHTML = "Well done";
    increaseIndex();
    playerArray = [];
    setTimeout(function () {
      gameLogic();
    }, 1000);
  } else if (
    orderLine.length === array.length &&
    JSON.stringify(array) === JSON.stringify(orderLevel3)
  ) {
    movement.innerHTML = `I must admit, I'm impressed.</br>
    <img
    class="sensei-gif"
    src="./img/sensei.gif"
    alt="karate fail gif"/> </br>
    I allow you to become my student... I guess.`;
    array = [];
    return;
  } else {
    movement.innerHTML = `You won...
    <img
    class="two-first-level-gif"
    src="./img/uwon.gif"
    alt="karate fail gif"/></br>
    But maybe you were lucky. Try a higher difficulty if you dare.`;
    array = [];
    return;
  }
}

//Increase index at each turn

function increaseIndex() {
  currentIndex++;
  orderLine = array[currentIndex];
}

//Score board
let score = 0;
function scoreBoard() {
  score += +1;
  count.innerHTML = `${Number(score)}`;
}
