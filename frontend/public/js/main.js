// Declare variables
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
const menuLinks = document.querySelector("#dropdown-menu");
const menuButton = document.querySelector("#menu-icon");

// Get primary button + other button elements and store in variables
const primaryBtns = document.querySelectorAll(".primary-btn");
const arrows = document.querySelectorAll(".arrow");
const roundTexts = document.querySelectorAll(".text p");
const socialMediaBtns = document.querySelectorAll(".circle");

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

// get sparkles elements for cursor
const sparkles = document.querySelector("#sparkles");

// Get footer element and store in variable
const footer = document.querySelector("footer");

// Set the current page nav link to active and hide footer for pages other than the homepage.
if (url.substring(url.length - 1) == "/") {
  homeLink.forEach((element) => (element.className += " active"));
} else if (url.includes("about")) {
  aboutLink.forEach((element) => (element.className += " active"));
} else if (url.includes("quiz")) {
  quizLink.forEach((element) => (element.className += " active"));
  footer.style.display = "none";
} else if (url.includes("superfoodcircus")) {
  circusLink.forEach((element) => (element.className += " active"));
  footer.style.display = "none";
} else if (url.includes("recipes")) {
  recipesLink.forEach((element) => (element.className += " active"));
  footer.style.display = "none";
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

// Add event listeners on the primary buttons

primaryBtns.forEach((element) => {
  element.addEventListener("mouseover", function () {
    showArrow(element);
  });
  element.addEventListener("mouseout", function () {
    hideArrow(element);
  });
});

// show arrow in primary button upon hover
function showArrow(element) {
  let arrow = element.querySelector(".arrow");
  arrow.classList.add("show-arrow");
}

// hide arrow in primary button upon mouse-out
function hideArrow(element) {
  let arrow = element.querySelector(".arrow");
  arrow.classList.remove("show-arrow");
}

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

// Add event listeners on the social media buttons
socialMediaBtns.forEach((element) => {
  let icon = element.querySelector(".neon-icon");
  icon.addEventListener("mouseover", function () {
    showText(element);
  });
  icon.addEventListener("mouseout", function () {
    hideText(element);
  });
});

// split the inner HTML text and store each letter in a separate span element
roundTexts.forEach(
  (element) =>
    (element.innerHTML = element.innerText
      .split("")
      .map(
        (char, i) =>
          `<span style="transform:rotate(${i * 15.5}deg")>${char}</span>`
      )
      .join(""))
);

//show rotating text upon hover
function showText(element) {
  let text = element.querySelector(".text");
  text.classList.add("show-text");
  let icon = element.querySelector(".bx");
  icon.classList.add("bx-tada");
}

//hide rotating text upon mouseout
function hideText(element) {
  let text = element.querySelector(".text");
  text.classList.remove("show-text");
  let icon = element.querySelector(".bx");
  icon.classList.remove("bx-tada");
}

// initialise AOS
AOS.init();

// get cursor position
let cursorX = 0;
let cursorY = 0;

let isMouseMoving = false;

document.addEventListener("mousemove", (e) => {
  isMouseMoving = true;
  cursorX = e.clientX;
  cursorY = e.clientY;
});

setInterval(() => {
  if (isMouseMoving) {
    // create sparkles and append to sparkles element
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.style.left = cursorX + "px";
    sparkle.style.top = cursorY + "px";
    sparkles.appendChild(sparkle);
    // remove sparkles after 1s
    setTimeout(() => {
      sparkle.remove();
    }, 1000);
    isMouseMoving = false;
  }
}, 70);
