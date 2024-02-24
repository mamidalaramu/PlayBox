// 1.Hello Message
// 2.Show categories
// 3.user input - choose one option
// 4.Get quiz questions using API and Save them
// 5.Display the questions with any one category

const prompt = require("prompt-sync")();
const { getQuestions, decodeQuestions } = require("./quizQuestions");

let score = 0;

const welcome_message = () => {
  console.log("Welcome to Computer quiz game");
};

const getRandomQuestion = () => {
  const questions = decodeQuestions();
  if (!Array.isArray(questions) || questions.length === 0) {
    console.error("Invalid input array");
  }
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

const displayQuestion = (question) => {
  console.log(`Question: ${question.question}`);
  console.log("Options:");
  question.options.forEach((option, idx) => {
    console.log(`${idx + 1}. ${option}`);
  });
};

const getUserInput = () => {
  while (true) {
    const input = prompt("Enter your Answer (number): ").trim();
    if (!isNaN(input) && Number.isInteger(parseFloat(input))) {
      return parseInt(input);
    }
    console.log("Invalid input. Please enter a number.");
  }
};

const checkAnswer = (question, userAnswer) => {
  const selectedOption = question.options[userAnswer - 1];
  const correctOption = question.correct_answer;
  if (selectedOption === correctOption) {
    console.log(`\nCorrect!. \nAnswer: ${question.correct_answer}`);
    score += 10;
    console.log(`Your score is now: ${score}`);
  } else {
    console.log(
      `\nIncorrect Answer. \nCorrect Answer: ${question.correct_answer}`
    );
    console.log(`Your Score remains: ${score}`);
  }
};

const playGame = () => {
  while (true) {
    const randomQuestion = getRandomQuestion();
    console.log("--------------------------------------------------------");
    displayQuestion(randomQuestion);
    const userAnswer = getUserInput();
    checkAnswer(randomQuestion, userAnswer);
    break;
  }
};

const startQuizGame = () => {
  welcome_message();
  getQuestions();
  while (true) {
    const userInput = prompt("Do you want to play (y/n) ?: ")
      .trim()
      .toLowerCase();
    if (userInput === "n") {
      break;
    } else if (userInput === "y") {
      console.log("Getting related questions...");
      playGame();
    } else {
      console.log("Please enter a valid input (y/n).");
    }
  }
  console.log("Your total score is: ", score);
  console.log("Thank you for playing!");
};

module.exports = {
  startQuizGame,
};
