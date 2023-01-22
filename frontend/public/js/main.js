// Declare variables
let count = 0;
const answerList = [];
let quizScore = 0;
let front = "";
let back = "";
let glow = "";
let number = 2;

const characters = [
  "clown-juggling-fruits",
  "acrobat",
  "human-cannonball",
  "magician",
  "strongboy",
  "tightrope-walker",
];

const superfoods = [
  "avocado",
  "brocolli",
  "cacao",
  "eggs",
  "tofu",
  "watermelon",
];

const colors = [
  "purple",
  "green",
  "watermelon",
  "yellow",
  "blue",
  "watermelon",
];

// Get nav link elements and store in variables
const homeLink = document.querySelectorAll(".home a");
const aboutLink = document.querySelectorAll(".about a");
const quizLink = document.querySelectorAll(".quiz a");
const circusLink = document.querySelectorAll(".superfood-circus a");
const recipesLink = document.querySelectorAll(".recipes a");
const vitafreshLink = document.querySelectorAll(".vitafresh a");
const menuLinks = document.querySelector("#dropdown-menu");
const menuButton = document.querySelector("#menu-icon");

// Get primary button elements and store in variables
const primaryBtn = document.querySelector(".primary-btn");
const arrow = document.querySelector(".arrow");

// Get answer elements and store in  variables
const selectAnswerLeft = document.querySelector("#select-answer-left");
const selectAnswerRight = document.querySelector("#select-answer-right");

// Get url string
const url = window.location.href;

// Get card elements and store in varibles
const cards = document.querySelectorAll(".card");
const fronts = document.querySelectorAll(".front");
const backs = document.querySelectorAll(".back");
const glows = document.querySelectorAll(".circle-gradient");

// Set the current page nav link to active.
if (url.substring(url.length - 1) == "/") {
  homeLink.forEach((element) => (element.className += " active"));
} else if (url.includes("about")) {
  aboutLink.forEach((element) => (element.className += " active"));
} else if (url.includes("quiz")) {
  quizLink.forEach((element) => (element.className += " active"));
} else if (url.includes("superfoodcircus")) {
  circusLink.forEach((element) => (element.className += " active"));
} else if (url.includes("recipes")) {
  recipesLink.forEach((element) => (element.className += " active"));
} else if (url.includes("vitafresh")) {
  vitafreshLink.forEach((element) => (element.className += " active"));
}

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
      document.getElementById("answer-left").innerHTML =
        questionData[count]["answer1"];
      document.getElementById("question").innerHTML =
        questionData[count]["question"];
      document.getElementById("answer-right").innerHTML =
        questionData[count]["answer2"];
      count++;
    } else {
      getAnswersList();
      document.querySelector("#show-circus-character").style.display = "block";
      document.querySelector(".question-wrapper").style.display = "none";
    }
  };

  // Work around for connection to API form either localhost or aws server.
  if (url.includes("localhost")) {
    xhttp.open("GET", "http://localhost:5000/api/questions", true);
  } else {
    xhttp.open("GET", "http://13.236.69.221:5000/api/questions", true);
  }
  xhttp.send();
}

// Get all elements and change innerHTML to the answers from the quiz.
function getAnswersList() {
  document.querySelector("#a1").innerHTML = "1: " + answerList[0];
  document.querySelector("#a2").innerHTML = "2: " + answerList[1];
  document.querySelector("#a3").innerHTML = "3: " + answerList[2];
  document.querySelector("#a4").innerHTML = "4: " + answerList[3];
  document.querySelector("#a5").innerHTML = "5: " + answerList[4];
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
    "real sport": 8,
    "movie star": 6,
    astronaut: 2,
    disneyland: 6,
    "skiing, surfing or horse riding": 10,
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

    // Add score to page.
    document.querySelector("#score").innerHTML = "Score: " + quizScore;

    // Call add image function.
    addCircusImage();
  }
}

// Add circus image to page determined by quiz score.
function addCircusImage() {
  let img = document.querySelector("#circus-img");
  console.log(img);

  if (quizScore <= 18) {
    img.setAttribute("src", "img/tightrope.jpg");
  } else if (quizScore <= 24 && quizScore > 18) {
    img.setAttribute("src", "img/magician.jpg");
  } else if (quizScore <= 30 && quizScore > 24) {
    img.setAttribute("src", "img/cannonball.jpg");
  } else if (quizScore <= 36 && quizScore > 30) {
    img.setAttribute("src", "img/acrobat.jpg");
  } else if (quizScore > 36) {
    img.setAttribute("src", "img/strongman.jpg");
  }
}

// Open/Close dropdown menu.
function toggleHamburgerMenu(menuButton) {
  menuButton.classList.toggle("expanded");
  menuLinks.classList.toggle("expanded");
}

// Close opened dropdown menu if screen is enlargened
let onresize = function (e) {
  width = e.target.innerWidth;
  if (width >= 780) {
    menuLinks.classList.remove("expanded");
    menuButton.classList.remove("expanded");
  }
};
window.addEventListener("resize", onresize);

// show arrow in primary button upon hover only
primaryBtn.addEventListener("mouseover", () => {
  arrow.classList.add("show-arrow");
});

primaryBtn.addEventListener("mouseout", () => {
  arrow.classList.remove("show-arrow");
});

// Add event listeners on the card elements
cards.forEach((element) =>
  element.addEventListener("click", function () {
    animateCard(element);
  })
);

// change card images and glow colours
function animateCard(element) {
  let imgPath = "";

  // Toggle card classList
  element.classList.toggle("flip");

  // Create imgPath variable and concatenate imgPath string
  if (element.classList.contains("character")) {
    imgPath = "../img/" + characters[number] + ".png";
    front = fronts[0];
    back = backs[0];
    glow = glows[0];
  } else if (element.classList.contains("food")) {
    imgPath = "../img/" + superfoods[number] + ".png";
    front = fronts[1];
    back = backs[1];
    glow = glows[1];
  }

  // If number is even, change back element image, if not, change front element image.
  if (number == 0 || number == 2 || number == 4 || number == 6) {
    back.style.backgroundImage = "url('" + imgPath + "')";
  } else {
    front.style.backgroundImage = "url('" + imgPath + "')";
  }

  // Increment or restart number
  if (number < 5) {
    number++;
  } else {
    number = 0;
  }

  // Change colour of glow
  glow.className = "circle-gradient " + colors[number];
}

AOS.init();
