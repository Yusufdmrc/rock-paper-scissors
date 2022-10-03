const selectionBtn = document.querySelectorAll("div.selection-btn button");
const playerScore = document.querySelector("#player-score");
const computerScore = document.querySelector("#computer-score");
const againBtn = document.querySelector("#again");
const lapResults = document.querySelector("#lap-results");

let playerRating = 0;
let computerRating = 0;
let playerChoice;

againBtn.addEventListener("click", () => location.reload());

selectionBtn.forEach((button) => {
  button.addEventListener("click", getPlayerChoice);
});

let computerChoices = [
  { choice: "Rock", value: 0 },
  { choice: "Paper", value: 1 },
  { choice: "Scissors", value: 2 },
];

function computerPlay() {
  let result =
    computerChoices[Math.floor(Math.random() * computerChoices.length)];
  return result;
}

function playLap(playerSelection, computerSelection) {
  let lapWinCombo = `${playerSelection}-${computerSelection.value}`;
  let playerWinCombo = ["1-0", "0-2", "2-1"];

  if (Number(playerSelection) === computerSelection.value) {
    playerScore.textContent = ++playerRating;
    computerScore.textContent = ++computerRating;
    lapResults.textContent = "Tie!";
  } else if (playerWinCombo.includes(lapWinCombo)) {
    playerScore.textContent = ++playerRating;
    lapResults.textContent = `You win! ${playerChoice} beats ${computerSelection.choice}`;
  } else {
    computerScore.textContent = ++computerRating;
    lapResults.textContent = `You lose! ${computerSelection.choice} beats ${playerChoice}`;
  }
  checkWinner();
}

const winnerResults = {
  computer: ["You lost! The computer won the game.", "red"],
  player: ["You win the game!", "rgb(40, 130, 148)"],
  tie: ["The game is a Tie!", "yellow"],
};

function checkWinner() {
  if (computerRating === 5 || playerRating === 5) {
    if (computerRating === playerRating) {
      updateWinner("tie");
    } else {
      let win = `${computerRating > playerRating ? "computer" : "player"}`;
      updateWinner(win);
    }
  }
}

function updateWinner(winner) {
  lapResults.textContent = winnerResults[winner][0];
  lapResults.style.color = winnerResults[winner][1];

  selectionBtn.forEach((button) => {
    button.removeEventListener("click", getPlayerChoice);
  });
}

function getPlayerChoice(e) {
  let playerSelection = e.target.id;
  playerChoice = e.target.textContent;
  playLap(playerSelection, computerPlay());
}
