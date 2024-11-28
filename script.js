console.log("Welcome to the Game");
let music = new Audio("mixkit-achievement-bell-600.wav");
let audioTurn = new Audio("iphone_ding.mp3");
let gameover = new Audio("mixkit-wrong-answer-fail-notification-946.wav");
let turn = "X";
let isGameOver = false;

//  Function to check the turn
const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

//function to check for a win
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxtext[e[0]].innerText + " Won";
      isGameOver = true;
      music.play();
      document
        .querySelector(".imgbox")
        .getElementsByTagName("img")[0].style.width = "200px";
      const line = document.querySelector(".line");
      line.style.display = "block";
      line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      line.style.width = "20vw"; // Adjust dynamically as needed
    }
  });
};

// Function to reset the game
const resetGame = () => {
  turn = "X";
  isGameOver = false;
  document.querySelector(".info").innerText = "Turn for " + turn;
  Array.from(boxes).forEach((element) => {
    element.querySelector(".boxtext").innerText = "";
    document
      .querySelector(".imgbox")
      .getElementsByTagName("img")[0].style.width = "0px";
    const lines = document.querySelector(".line");
    lines.style.display = "none";
  });
};

// game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "" && !isGameOver) {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioTurn.preload = "auto";
      audioTurn.currentTime = 0;
      audioTurn.play();
      checkWin();
      if (!isGameOver) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn;
      }
    }
  });
});

// Add a reset button event listener
let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetGame);
