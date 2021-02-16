//Liste éléments HTML

let bubble = document.querySelector(".bubble");
let movement = document.querySelector(".movement.name");
let count = document.querySelector("#count span");
let endScreen = document.querySelector("#end-screen");
let easyMode = document.querySelector(".btn.easy");
let mediumMode = document.querySelector(".btn.medium");
let hardMode = document.querySelector(".btn.hard");
let goBack = document.querySelector(".main-page");

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
    if (press.keyCode == 32) {
      console.log("Game has started");
      gameLogic();
    }
  };
}

gameStart();

//Suite d'ordres donnés par Senseï :
let orderLevel1 = [
  [" Shiuto"],
  [" Shiuto", " OiTsuki"],
  [" Shiuto", " OiTsuki", " OiTsuki"],
  // [" Shiuto", " OiTsuki", " OiTsuki", " Shiuto"],
  // [" Shiuto", " OiTsuki", " OiTsuki", " Shiuto", " OiTsuki"],
  // [" Shiuto", " OiTsuki", " OiTsuki", " Shiuto", " OiTsuki", " Shiuto"],
  // [" Shiuto", " OiTsuki", " OiTsuki", " Shiuto", " OiTsuki", " Shiuto", "OiTsuki"],
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

let currentIndex = 0;
let orderLine = array[currentIndex];

//Level buttons

easyMode.addEventListener("click", () => {
  console.log("1!");
  array = orderLevel1;
  orderLine = array[currentIndex];
  movement.innerHTML = "Press spacebar when you're ready to show your skills.";
});

mediumMode.addEventListener("click", () => {
  console.log("2!");
  array = orderLevel2;
  orderLine = array[currentIndex];
});

hardMode.addEventListener("click", () => {
  console.log("3!");
  array = orderLevel3;
  orderLine = array[currentIndex];
});

//Function to increase index at each turn

function increaseIndex() {
  currentIndex++;
  orderLine = array[currentIndex];
}

//Function game logic

function gameLogic() {
  if (array.length === 0) {
    movement.innerHTML = `CHOOSE. A. LEVEL !`;
    return;
  } 
  movement.innerHTML = `${orderLine} !`;
  scoreBoard();

  setTimeout(function () {
    movement.innerHTML = `Quick...`;
  }, 2000);

  playersTurn();
};

//Functions for right and wrong cmds

function wrongCmd() {
  movement.innerHTML = "NO !";
  bubble.classList.add("wrong");
  playerArray = [];
  // setTimeout(function () {
  //   endScreen.classList.remove("hidden");
  //   endScreen.classList.add("active");
  // }, 2000);
}

function rightCmd() {
  if (orderLine.length !== orderLevel1.length) {
    bubble.classList.remove("wrong");
    movement.innerHTML = "Well done";
    increaseIndex();
    playerArray = [];
    setTimeout(function () {
      gameLogic();
    }, 2000);
  } else {
    movement.innerHTML = `You won.`;
    return;
  }
}

//Pushing the entered value in players array

function playersTurn() {
  setTimeout(function () {
    compareOrders();
  }, 4000);
}

//Comparing player's value with orders array

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
  } else {
    console.log("Not even close...");
  }
  // console.log(playerArray);
}

document.addEventListener("keydown", keyHandler);

// utiliser loop OU HOF pour gérer ce point ... quand tu as du temps
function compareOrders() {
  console.log(playerArray);
  if (JSON.stringify(playerArray) === JSON.stringify(orderLine)) {
    rightCmd();
  } else {
    wrongCmd();
  }
}
