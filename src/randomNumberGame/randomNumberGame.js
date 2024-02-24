const prompt = require("prompt-sync")();
const target = Math.round(Math.random() * 90);
let guesses = 0;

const startRandomNumberGuessGame = () => {
  while (true) {
    guesses++;
    const guess = Number(prompt("Guess the number between (0-100): "));
    if (guess > target) {
      console.log("Your get is too high.");
      continue;
    } else if (guess < target) {
      console.log("You guess is too low.");
      continue;
    }

    console.log("You have guessed it!");
    break;
  }
  console.log("You guessed the number in ", guesses, "tries!");
};

module.exports = { startRandomNumberGuessGame };
