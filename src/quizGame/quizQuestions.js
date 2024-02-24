//1. Get questions from the API
//2. Save them in json file
//3. Decrypt the questions
//4. Show random questions

const axios = require("axios");
const fs = require("fs");
const base64 = require("base-64");

const API_URL =
  "https://opentdb.com/api.php?amount=30&category=18&difficulty=medium&type=multiple&encode=base64";

const filePath = "src/quizGame/questions.json";

async function getQuestions() {
  try {
    // Fetch questions from the API
    const response = await axios.get(API_URL);
    if (response.status >= 200 && response.status < 300) {
      // Write questions to a file
      await writeQuestionsToFile(response.data);
      console.log("Questions saved to", filePath);
    } else {
      console.log(
        "Failed to fetch questions from the API ",
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error fetching or saving questions:", error.message);
  }
}

function writeQuestionsToFile(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 4), (err) => {
      if (err) {
        reject(err); // Reject if there is an error
      } else {
        resolve(); // Resolve if writing is successful
      }
    });
  });
}

function decodeQuestions() {
  // Read the data from the questions.json
  try {
    const questionData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const decodedQuestions = [];

    questionData.results.forEach((encodedQuestion) => {
      const decodedQuestion = {};

      // Get decoded question and answer
      decodedQuestion.question = base64.decode(encodedQuestion.question);
      decodedQuestion.correct_answer = base64.decode(
        encodedQuestion.correct_answer
      );

      // Decode and shuffle incorrect answers
      decodedQuestion.incorrect_answers = encodedQuestion.incorrect_answers.map(
        (answer) => base64.decode(answer)
      );

      // Add correct answer to the list of options and shuffle them
      const options = decodedQuestion.incorrect_answers.concat(
        decodedQuestion.correct_answer
      );
      shuffleArray(options);
      decodedQuestion.options = options;

      decodedQuestions.push(decodedQuestion);
    });
    return decodedQuestions;
  } catch (error) {
    console.error("Error decoding questions:", error);
    return [];
  }
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

module.exports = {
  getQuestions,
  decodeQuestions,
};
