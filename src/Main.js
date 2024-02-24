const prompt = require("prompt-sync")();

const { startQuizGame } = require("./quizGame/quizGame");
const { startRPSGame } = require("./rockPaperScissor/rockPaperScissor");
const {
  startRandomNumberGuessGame,
} = require("./randomNumberGame/randomNumberGame");

const welcomeMessage = () => {
  console.log(
    "Welcome to PlayBox. \nHere you can choose any game to play from the list of available games."
  );
  console.log(
    "1. Quiz Game \n2. Random Number Guesser \n3. Rock Paper Scissor \n4. Choose your adventure"
  );
  const playerChoice = prompt("Enter the number (1 -4) or q to  quit: ");
  if (playerChoice === "q") process.exit();
  if (
    isNaN(parseInt(playerChoice)) ||
    parseInt(playerChoice) < 1 ||
    parseInt(playerChoice) > 4
  ) {
    console.log("Invalid choice, please enter a valid option");
    return welcomeMessage();
  } else {
    switch (parseInt(playerChoice)) {
      case 1:
        startQuizGame();
        break;
      case 2:
        startRandomNumberGuessGame();
        break;
      case 3:
        startRPSGame();
        break;
      default:
        chooseYourAdventure();
    }
  }
};

welcomeMessage();
