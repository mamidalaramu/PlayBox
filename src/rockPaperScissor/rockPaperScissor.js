const prompt = require("prompt-sync")();
let wins = 0;
let losses = 0;
let ties = 0;

const startRPSGame = () => {
  while (true) {
    let playerChoice = prompt("Enter rock, paper of scissors (or q to quit): ");

    playerChoice = playerChoice.toLowerCase();

    if (playerChoice.toLowerCase() === "q") {
      break;
    }
    if (
      playerChoice !== "rock" &&
      playerChoice !== "paper" &&
      playerChoice !== "scissors"
    ) {
      console.log("Enter a valid Choice.");
      continue;
    }

    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.round(Math.random() * 2);

    const computerChoice = choices[randomIndex];

    console.log("The computer choose: ", computerChoice);

    if (computerChoice === playerChoice) {
      console.log("Draw!");
      ties++;
    } else if (
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper") ||
      (playerChoice === "rock" && computerChoice === "scissors")
    ) {
      console.log("Won!");
      wins++;
    } else {
      console.log("lost!");
      losses++;
    }
  }

  console.log(
    "Total Wins: ",
    wins,
    "\nTotal Losses: ",
    losses,
    "\nTotal Ties: ",
    ties
  );
};

module.exports = {
  startRPSGame,
};
