// Declare variables
let count = 0;
const answerList = [];
let quizScore = 0;

// Load the question data into the correct fields on window load
if (url.includes("quiz"))
  window.onload = function () {
    loadQuestions();
  };

// Load question data to correct fields on click using AJAX.
function loadQuestions() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    let questionData = JSON.parse(this.responseText);
    if (count < questionData.length) {
      // Hide the question elements
      let questionGrid = document.getElementById("questions-grid");
      questionGrid.style.display = "none";
      let restartBtn = document.querySelector(".restart-quiz");
      restartBtn.style.display = "none";
      loading[1].classList.add("quiz-loading");
      loading[1].classList.remove("loading");
      loading[1].style.display = "block";

      document.getElementById("answer-left").innerHTML =
        questionData[count]["answer1"];
      document.getElementById("question").innerHTML =
        questionData[count]["question"];
      document.getElementById("answer-right").innerHTML =
        questionData[count]["answer2"];
      let questionImage = document.getElementById("question-img");
      questionImage.setAttribute("alt", questionData[count]["imageAlt"]);
      questionImage.setAttribute("src", questionData[count]["imageSrc"]);

      // Wait for the image to load and then show the question elements again
      questionImage.onload = function () {
        questionGrid.style.display = "grid";
        restartBtn.style.display = "block";
        loading[1].style.display = "none";
      };

      count++;
    }
  };

  // Work around for connection to API form either localhost or aws server.
  if (url.includes("localhost")) {
    xhttp.open("GET", "http://localhost:5000/api/questions", true);
  } else if (url.includes("vita-fun-a2")) {
    xhttp.open("GET", "https://vita-fun-a2.onrender.com/api/questions", true);
  } else {
    xhttp.open("GET", "https://vita-fun.onrender.com/api/questions", true);
  }
  xhttp.send();
}

// Get the value of the answer and add it to the array of answers.
function addAnswerToList(element) {
  let answer = document.querySelector("#" + element);
  answerList.push(answer.innerHTML);
}

// Calculate the total points of all 5 quiz questions.
function calculateQuizScore() {
  // Enum containing answers and scores.
  const points = {
    "video games": 4,
    "real sports": 8,
    "movie star": 6,
    "astronaut": 2,
    "disneyland": 6,
    "snorkelling tropical islands": 10,
    "climb a mountain": 10,
    "go to a museum": 4,
    "run away with the circus": 8,
    "sail around the world": 2,
  };

  // If the answer list length is 5, calulate total score of all 5 answers.
  if (answerList.length == 5) {
    for (let i = 0; i < answerList.length; i++) {
      quizScore += Number(points[answerList[i]]);
    }

    // Call function.
    loadCharacterPage();
  }
}

// Load character page determined by quiz score.
function loadCharacterPage() {
  if (quizScore <= 18) {
    window.location.href = "/character/63e84ec7d52e695f7e76f826";
  } else if (quizScore <= 24 && quizScore > 18) {
    window.location.href = "/character/63e84ee6d52e695f7e76f82a";
  } else if (quizScore <= 30 && quizScore > 24) {
    window.location.href = "/character/63e84edbd52e695f7e76f828";
  } else if (quizScore <= 36 && quizScore > 30) {
    window.location.href = "/character/63e84ef7d52e695f7e76f82e";
  } else if (quizScore > 36) {
    window.location.href = "/character/63e84eefd52e695f7e76f82c";
  }
}

// Progress bar functionality
const fruit = document.querySelector("#js-fruit");
const fruitArray = ["🍏", "🍊", "🍌", "🍓", "🍈"];
let fruitIndex = 0;
const progressBar = document.querySelector("#js-progressbar");
const progressBarColors = [
  "var(--vita-purple)",
  "var(--vita-green)",
  "#ff5964",
  "var(--vita-yellow)",
  "var(--vita-blue)",
];

function updateProgressBar() {
  // update value of progress bar
  const newValue = progressBar.value + progressBar.max * 0.2;
  progressBar.value = newValue > 100 ? 0 : newValue;

  // update colour of progress bar
  const currentColor = progressBarColors.shift();
  progressBarColors.push(currentColor);
  progressBar.style.setProperty("--vita-watermelon", currentColor);

  // update fruit of progress bar
  fruit.innerHTML = fruitArray[fruitIndex];
  fruitIndex = (fruitIndex + 1) % fruitArray.length;

  // update position of progress bar's fruit
  const percentComplete = progressBar.value / progressBar.max;
  const progressWidth = progressBar.offsetWidth;
  const fruitOffset = percentComplete * progressWidth - fruit.offsetWidth / 2;
  fruit.style.left = `${fruitOffset}px`;
}
