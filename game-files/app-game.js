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

//Shiuto = right arrow;
// MaeGeri = arrow down;
// Oitsuki = arrow up;
// MawashiGeri = arrow left;

//Score board
let score = 0;
function scoreBoard() {
  score += +1;
  count.innerHTML = `${Number(score)}`;
}

//Function game start :

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

//Suite d'ordres donnés par Senseï :
let orderLevel1 = [
  [" Shiuto"],
  [" Shiuto", " OiTsuki"],
  [" Shiuto", " OiTsuki", " OiTsuki"],
  // [" Shiuto", " OiTsuki", " OiTsuki", " Shiuto"],
  // [" Shiuto", " OiTsuki", " OiTsuki", " Shiuto", " OiTsuki"],
  // [" Shiuto", " OiTsuki", " OiTsuki", " Shiuto", " OiTsuki", " Shiuto"],
  // [
  //   " Shiuto",
  //   " OiTsuki",
  //   " OiTsuki",
  //   " Shiuto",
  //   " OiTsuki",
  //   " Shiuto",
  //   " OiTsuki",
  // ],
  // [
  //   " Shiuto",
  //   " OiTsuki",
  //   " OiTsuki",
  //   " Shiuto",
  //   " OiTsuki",
  //   " Shiuto",
  //   " OiTsuki",
  //   " Shiuto",
  // ],
];

let orderLevel2 = [
  [" Shiuto"],
  [" Shiuto", " OiTsuki"],
  [" Shiuto", " OiTsuki", " MaeGeri"],
  // [" Shiuto", " OiTsuki", " MaeGeri", " MaeGeri"],
  // [" Shiuto", " OiTsuki", " MaeGeri", " MaeGeri", " Shiuto"],
  // [" Shiuto", " OiTsuki", " MaeGeri", " MaeGeri", " Shiuto", " OiTsuki"],
  // [" Shiuto", " OiTsuki", " MaeGeri", " MaeGeri", " Shiuto", " OiTsuki", "OiTsuki"],
  // [
  //   " Shiuto",
  //   " OiTsuki",
  //   " MaeGeri,
  //   " MaeGeri",
  //   " Shiuto",
  //   " OiTsuki",
  //   " OiTsuki",
  //   " MaeGeri",
  // ],
];

let orderLevel3 = [
  [" MawashiGeri"],
  [" MawashiGeri", " OiTsuki"],
  [" MawashiGeri", " OiTsuki", " MaeGeri"],
  // [" MawashiGeri", " OiTsuki", " MaeGeri", " MaeGeri"],
  // [" MawashiGeri", " OiTsuki", " MaeGeri", " MaeGeri", " MawashiGeri"],
  // [" MawashiGeri", " OiTsuki", " MaeGeri", " MaeGeri", " MawashiGeri", " OiTsuki"],
  // [" MawashiGeri", " OiTsuki", " MaeGeri", " MaeGeri", " MawashiGeri", " OiTsuki", " Shiuto"],
  // [
  //   " MawashiGeri",
  //   " OiTsuki",
  //   " MaeGeri,
  //   " MaeGeri",
  //   " MawashiGeri",
  //   " OiTsuki",
  //   " Shiuto",
  //   " MaeGeri",
  // ],
];

//Player array and index of array

let playerArray = [];
let array = [];

let zero = 0;
let currentIndexRow = 0;
let currentIndexCol = 0;

let orderLine = array[currentIndexRow];

//Level buttons

function resetBubble() {
  // clearTimeout(playersTurnTimeout);
  clearTimeout(openEndScreen);
  bubble.classList.remove("wrong");
  playerArray = [];
  currentIndexRow = 0;
  movement.innerHTML = "Press ENTER when you're ready to show your skills.";
  score = 0;
  count.innerHTML = `${Number(score)}`;
  console.log(playerArray);
}

easyMode.addEventListener("click", () => {
  console.log("1!");
  easyMode.classList.toggle("chosen-easy");
  easyMode.classList.remove("heartbeat");
  mediumMode.disabled = true;
  hardMode.disabled = true;
  mediumMode.classList.remove("chosen-medium", "heartbeat");
  hardMode.classList.remove("chosen-hard", "heartbeat");
  array = orderLevel1;
  orderLine = array[currentIndexRow];
  resetBubble();
});

mediumMode.addEventListener("click", () => {
  console.log("2!");
  mediumMode.classList.toggle("chosen-medium");
  mediumMode.classList.remove("heartbeat");
  easyMode.disabled = true;
  hardMode.disabled = true;
  easyMode.classList.remove("chosen-easy", "heartbeat");
  hardMode.classList.remove("chosen-hard", "heartbeat");
  array = orderLevel2;
  orderLine = array[currentIndexRow];
  resetBubble();
});

hardMode.addEventListener("click", () => {
  console.log("3!");
  hardMode.classList.toggle("chosen-hard");
  hardMode.classList.remove("heartbeat");
  easyMode.disabled = true;
  mediumMode.disabled = true;
  easyMode.classList.remove("chosen-easy", "heartbeat");
  mediumMode.classList.remove("chosen-medium", "heartbeat");
  array = orderLevel3;
  orderLine = array[currentIndexRow];
  resetBubble();
});

tryAgain.addEventListener("click", () => {
  easyMode.disabled = false;
  mediumMode.disabled = false;
  hardMode.disabled = false;
  easyMode.classList.add("heartbeat");
  easyMode.classList.remove("chosen-easy");
  mediumMode.classList.remove("chosen-medium");
  mediumMode.classList.add("heartbeat");
  hardMode.classList.remove("chosen-hard");
  hardMode.classList.add("heartbeat");
  bubble.classList.remove("wrong");
  endScreen.classList.add("hidden");
  resetBubble();
  movement.innerHTML = "Choose a level";
});

//Function to increase index at each turn

function increaseIndex() {
  currentIndexRow++;
  orderLine = array[currentIndexRow];
  if (playerArray.length === orderLine.length) {
    playerArray = [];
  }
}

//Function game logic

gameStart();

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
}

//Pushing the entered value in players array

// let playersTurnTimeout;
// function playersTurn() {
//   playersTurnTimeout = setTimeout(function () {
//     compareOrders();
//   }, 4000);
// }

//Comparing player's value with orders array

document.addEventListener("keydown", keyHandler);

function keyHandler(press) {
  const keyName = press.key;
  if (keyName === "ArrowRight") {
    playerArray.push(" Shiuto");
  } else if (keyName === "ArrowUp") {
    playerArray.push(" OiTsuki");
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

// utiliser loop OU HOF pour gérer ce point ... quand tu as du temps
function compareOrders() {
  console.log(playerArray);
  const sameArray = playerArray.every(
    () => playerArray[zero] === orderLine[currentIndexRow][currentIndexCol]
  );
  if (sameArray === true) {
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
  openEndScreen = setTimeout(function () {
    endScreen.classList.remove("hidden");
    endScreen.classList.add("active");
  }, 2000);
}

function rightCmd() {
  if (orderLine.length !== orderLevel1.length) {
    bubble.classList.remove("wrong");
    // movement.innerHTML = "Well done";
    increaseIndex();
    // console.log(playerArray[currentIndexRow]);
    // console.log(playerArray);
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