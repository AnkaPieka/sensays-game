//Liste éléments HTML

let bubble = document.querySelector(".bubble");
let movement = document.querySelector(".movement.name");
let count = document.querySelector("#count span");
let endScreen = document.querySelector("#end-screen");

//Shiuto = right arrow;
// MaeGeri = arrow down;
// Oitsuki = arrow up
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
let orderLevel1 = [["Shiuto"], ["Shiuto", "OiTsuki"]];

let playerArray = [];

let serieLign = orderLevel1[i];

//Function game logic

function gameLogic() {
  if (count.innerHTML = '0') {
    movement.innerHTML = `${serieLign} !`;

  setTimeout(function () {
    movement.innerHTML = `Your turn !`;
  }, 2000);

  playersTurn();
}

//Functions for right and wrong cmds

function wrongCmd() {
  movement.innerHTML = "NO !";
  bubble.classList.add("wrong");
  // setTimeout(function () {
  //   endScreen.classList.remove("hidden");
  //   endScreen.classList.add("active");
  // }, 2000);
}

function rightCmd() {
  bubble.classList.remove("wrong");
  movement.innerHTML = "Well done";
  count.innerHTML = `${count.innerHTML + 1}`;
  setTimeout(function () {
    gameLogic();
  }, 2000);
}

//Pushing the entered value in players array

function playersTurn() {
  document.addEventListener("keydown", (press) => {
    const keyName = press.key;
    if (keyName === "ArrowRight") {
      playerArray.push("Shiuto");
    } else if (keyName === "ArrowUp") {
      playerArray.push("OiTsuki");
    } else if (keyName === "ArrowLeft") {
      playerArray.push("MawashiGeri");
    } else if (keyName === "ArrowDown") {
      playerArray.push("MaeGeri");
    }
  });

  setTimeout(function () {
    compareOrders();
  }, 5000);
}

//Comparing player's value with orders array

// utiliser loop OU HOF pour gérer ce point ... quand tu as du temps
function compareOrders() {
  if (JSON.stringify(playerArray) === JSON.stringify(serieLign)) {
    rightCmd();
    console.log(serieLign);
    playerArray = [];
  } else {
    wrongCmd();
    playerArray = [];
  }
}
