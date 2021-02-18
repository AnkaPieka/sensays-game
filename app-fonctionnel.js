//Liste éléments HTML

let bubble = document.querySelector(".bubble");
let movement = document.querySelector(".movement.name");
let count = document.querySelector("#count span");
let endScreen = document.querySelector("#end-screen");
let easyMode = document.querySelector(".btn.easy");
let mediumMode = document.querySelector(".btn.medium");
let hardMode = document.querySelector(".btn.hard");
let goBack = document.querySelector(".main-page");
let tryAgain = document.querySelector(".btn.try-again");

//Shuto = right arrow;
// MaeGeri = arrow down;
// OiZuki = arrow up;
// MawashiGeri = arrow left;

//Function game start :

function gameStart() {
  document.body.onkeyup = function (press) {
    if (press.keyCode === 13) {
      console.log("Game has started");
      setTimeout(function () {
        gameLogic();
      }, 200);
    }
  };
}

gameStart();

//Suite d'ordres donnés par Senseï :
let orderLevel1 = [
  [" Shuto"],
  [" Shuto", " OiZuki"],
  [" Shuto", " OiZuki", " OiZuki"],
  // [" Shuto", " OiZuki", " OiZuki", " Shuto"],
  // [" Shuto", " OiZuki", " OiZuki", " Shuto", " OiZuki"],
  // [" Shuto", " OiZuki", " OiZuki", " Shuto", " OiZuki", " Shuto"],
  // [
  //   " Shuto",
  //   " OiZuki",
  //   " OiZuki",
  //   " Shuto",
  //   " OiZuki",
  //   " Shuto",
  //   " OiZuki",
  // ],
  // [
  //   " Shuto",
  //   " OiZuki",
  //   " OiZuki",
  //   " Shuto",
  //   " OiZuki",
  //   " Shuto",
  //   " OiZuki",
  //   " Shuto",
  // ],
];

let orderLevel2 = [
  [" Shuto"],
  [" Shuto", " OiZuki"],
  [" Shuto", " OiZuki", " MaeGeri"],
  // [" Shuto", " OiZuki", " MaeGeri", " MaeGeri"],
  // [" Shuto", " OiZuki", " MaeGeri", " MaeGeri", " Shuto"],
  // [" Shuto", " OiZuki", " MaeGeri", " MaeGeri", " Shuto", " OiZuki"],
  // [" Shuto", " OiZuki", " MaeGeri", " MaeGeri", " Shuto", " OiZuki", "OiZuki"],
  // [
  //   " Shuto",
  //   " OiZuki",
  //   " MaeGeri,
  //   " MaeGeri",
  //   " Shuto",
  //   " OiZuki",
  //   " OiZuki",
  //   " MaeGeri",
  // ],
];

let orderLevel3 = [
  [" MawashiGeri"],
  [" MawashiGeri", " OiZuki"],
  [" MawashiGeri", " OiZuki", " MaeGeri"],
  // [" MawashiGeri", " OiZuki", " MaeGeri", " MaeGeri"],
  // [" MawashiGeri", " OiZuki", " MaeGeri", " MaeGeri", " MawashiGeri"],
  // [" MawashiGeri", " OiZuki", " MaeGeri", " MaeGeri", " MawashiGeri", " OiZuki"],
  // [" MawashiGeri", " OiZuki", " MaeGeri", " MaeGeri", " MawashiGeri", " OiZuki", " Shuto"],
  // [
  //   " MawashiGeri",
  //   " OiZuki",
  //   " MaeGeri,
  //   " MaeGeri",
  //   " MawashiGeri",
  //   " OiZuki",
  //   " Shuto",
  //   " MaeGeri",
  // ],
];

//Player array and index of array

let playerArray = [];
let array = [];

let currentIndex = 0;
let orderLine = array[currentIndex];

//Level buttons

easyMode.addEventListener("click", () => {
  console.log("1!");
  easyMode.classList.add("chosen-easy");
  easyMode.classList.remove("heartbeat");
  mediumMode.disabled = true;
  hardMode.disabled = true;
  mediumMode.classList.remove("chosen-medium", "heartbeat");
  hardMode.classList.remove("chosen-hard", "heartbeat");
  array = orderLevel1;
  orderLine = array[currentIndex];
  resetBubble();
});

mediumMode.addEventListener("click", () => {
  console.log("2!");
  mediumMode.classList.add("chosen-medium");
  mediumMode.classList.remove("heartbeat");
  easyMode.disabled = true;
  hardMode.disabled = true;
  easyMode.classList.remove("chosen-easy", "heartbeat");
  hardMode.classList.remove("chosen-hard", "heartbeat");
  array = orderLevel2;
  orderLine = array[currentIndex];
  resetBubble();
});

hardMode.addEventListener("click", () => {
  console.log("3!");
  hardMode.classList.add("chosen-hard");
  hardMode.classList.remove("heartbeat");
  easyMode.disabled = true;
  mediumMode.disabled = true;
  easyMode.classList.remove("chosen-easy", "heartbeat");
  mediumMode.classList.remove("chosen-medium", "heartbeat");
  array = orderLevel3;
  orderLine = array[currentIndex];
  resetBubble();
});

tryAgain.addEventListener("click", () => {
  easyMode.disabled = false;
  mediumMode.disabled = false;
  hardMode.disabled = false;
  easyMode.classList.add("heartbeat");
  mediumMode.classList.add("heartbeat");
  hardMode.classList.add("heartbeat");
  bubble.classList.remove("wrong");
  endScreen.classList.add("hidden");
  resetBubble();
});

function resetBubble() {
  clearTimeout(playersTurnTimeout);
  clearTimeout(openEndScreen);
  bubble.classList.remove("wrong");
  playerArray = [];
  currentIndex = 0;
  movement.innerHTML = "Press ENTER when you're ready to show your skills to Ishikawa.";
  score = 0;
  count.innerHTML = `${Number(score)}`;
  // console.log(playerArray);
}

//Function game logic : starts the game and implement the messages to display at each turn
let alertTimeRemaining 
function gameLogic() {
  if (array.length === 0) {
    movement.innerHTML = `CHOOSE. A. LEVEL !`;
    return;
  }
  movement.innerHTML = `${orderLine} !`;
  // scoreBoard();

  alertTimeRemaining= setTimeout(function () {
    movement.innerHTML = `${orderLine} ! <br>Quick...`;
  }, 2000);

  playersTurn();
}

//Opening a timed period for the player to enter its cmd

let playersTurnTimeout;
function playersTurn() {
  document.addEventListener("keydown", keyHandler);
  playersTurnTimeout = setTimeout(function () {
    console.log('Time is up')
    wrongCmd();
  }, 4000);
}

//Pushing player's value to its array and with orders array

function keyHandler(press) {
  const keyName = press.key;
  if (keyName === "ArrowRight") {
    playerArray.push(" Shuto");
  } else if (keyName === "ArrowUp") {
    playerArray.push(" OiZuki");
  } else if (keyName === "ArrowLeft") {
    playerArray.push(" MawashiGeri");
  } else if (keyName === "ArrowDown") {
    playerArray.push(" MaeGeri");
  } else if (keyName === "Enter") {
    return;
  } else {
    movement.innerHTML = "Not a move";
  }
  compareOrders();
}

//Comparing the entered key with the orders one
//utiliser loop OU HOF pour gérer ce point ... quand tu as du temps//
function compareOrders() {
  console.log(playerArray);
  if (JSON.stringify(playerArray) === JSON.stringify(orderLine)) {
    console.log(playerArray);
    clearTimeout(playersTurnTimeout);
    clearTimeout(alertTimeRemaining);
    rightCmd();
    scoreBoard();
  } else {
    console.log("---" + playerArray);
    wrongCmd();
  }
}

//Functions for right and wrong cmds (if wrong, open the GAME OVER)
let openEndScreen;
function wrongCmd() {
  clearTimeout(playersTurnTimeout);
  clearTimeout(alertTimeRemaining);
  movement.innerHTML = "NO !";
  bubble.classList.add("wrong");
  playerArray = [];
  openEndScreen = setTimeout(function () {
    endScreen.classList.remove("hidden");
    endScreen.classList.add("active");
  }, 2000);
}

function rightCmd() {
  if (orderLine.length !== orderLevel1.length) {
    bubble.classList.remove("wrong");
    movement.innerHTML = "Well done";
    increaseIndex();
    playerArray = [];
    setTimeout(function () {
      gameLogic();
    }, 1200);
  } else if (
    orderLine.length === orderLevel1.length &&
    JSON.stringify(array) === JSON.stringify(orderLevel3)
  ) {
    movement.innerHTML = `I must admit, I'm impressed. I allow you to become my student... I guess.`;
  } else {
    movement.innerHTML = `You won. Try a higher difficulty if you dare.`;
    return;
  }
}

//IF RIGHT : increase index  and increase scoreBoard by 1

function increaseIndex() {
  currentIndex++;
  orderLine = array[currentIndex];
}

let score = 0;
function scoreBoard() {
  score += +1;
  count.innerHTML = `${Number(score)}`;
}
