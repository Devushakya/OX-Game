const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".reset");
const p1ScoreElement = document.querySelector(".p1score");
const p2ScoreElement = document.querySelector(".p2score");
const matrix = document.querySelector(".matrix");

let currentPlayer;
let gameGrid;
let p1Score = 0;
let p2Score = 0;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box) => {
    const text = box.querySelector(".text");
    text.innerText = "";
    box.style.pointerEvents = "all";
    text.classList.remove("win");
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
  matrix.classList.remove("draw");
}

initGame();

function swapTurn() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function updateScore(winner) {
  if (winner === "X") {
    p1Score++;
    p1ScoreElement.innerText = p1Score;
  } else if (winner === "O") {
    p2Score++;
    p2ScoreElement.innerText = p2Score;
  }
}

function checkGameOver() {
  let winner = "";

  winningPositions.forEach((position) => {
    if (
      gameGrid[position[0]] !== "" &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      winner = gameGrid[position[0]];

      boxes.forEach((box) => (box.style.pointerEvents = "none"));

      position.forEach((index) => {
        const text = boxes[index].querySelector(".text");
        text.classList.add("win");
      });
    }
  });

  if (winner !== "") {
    gameInfo.innerText = `Winner Player - ${winner}`;
    updateScore(winner);
    newGameBtn.classList.add("active");
    return;
  }

  if (gameGrid.every((cell) => cell !== "")) {
    gameInfo.innerText = "Game Tied!";
    newGameBtn.classList.add("active");
    matrix.classList.add("draw");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    const text = boxes[index].querySelector(".text");
    text.innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapTurn();
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => handleClick(index));
});

newGameBtn.addEventListener("click", initGame);
