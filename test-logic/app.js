//Liste éléments HTML

let bubble = document.querySelector(".bubble");
let movement = document.querySelector(".movement.name");
let count = document.querySelector("#count span");
let endScreen = document.querySelector("#end-screen");

//Shiuto = right arrow;
// MaeGeri = arrow down;
// Oitsuki = arrow up;
// MawashiGeri = arrow left;

//Essai de liaison keyboard/HTML

// if (movement.innerHTML = 'Shiuto !')
// document.addEventListener('keydown', (press) => {
//     const nomTouche = press.key;
//     if (nomTouche === 'ArrowDown'){
//         bubble.classList.remove('wrong');
//         movement.innerHTML = "Well done"
//     }
//     else {
//         movement.innerHTML = "Hiye !";
//         bubble.classList.add('wrong');
//     }
// });

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

let playerArray = [];

let currentIndex = 0;
let orderLine = orderLevel1[currentIndex];

//Function to increase index at each turn

function increaseIndex() {
  currentIndex++;
  orderLine = orderLevel1[currentIndex];
}

//Function game logic

function gameLogic() {
  movement.innerHTML = `${orderLine} !`;

  setTimeout(function () {
    movement.innerHTML = `Your turn`;
  }, 2000);

  playersTurn();
}

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
    count.innerHTML = `${+1}`;
    playerArray = [];
    increaseIndex();
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
};
