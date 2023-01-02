// Declare variables.
let count = 0;
const answerList = [];
let quizScore = 0;

// Get nav link elements and store in variables.
const homeLink= document.querySelector(".home");
const aboutLink = document.querySelector(".about");
const quizLink = document.querySelector(".quiz");
const circusLink = document.querySelector(".superfood-circus");
const recipesLink = document.querySelector(".recipes");
const vitafreshLink = document.querySelector(".vitafresh");


// Get answer element and store in a variable
const selectAnswerLeft = document.querySelector("#select-answer-left");
const selectAnswerRight = document.querySelector("#select-answer-right");

// Get url string.
const url = window.location.href

// Set the current page nav link to active.
if(url.substring(url.length - 1) == '/') {
    homeLink.className += " active";
} else if (url.includes('about')) {
    aboutLink.className += " active";
} else if (url.includes('quiz')) {
    quizLink.className += " active";
} else if (url.includes('superfoodcircus')) {
    circusLink.className += " active";
} else if (url.includes('recipes')) {
    recipesLink.className += " active";
} else if (url.includes('vitafresh')) {
    vitafreshLink.className += " active";
}

// Load the question data into the correct fields on window load
if (url.includes('quiz'))
    window.onload = function() {
    loadQuestions()
}
    
// Load question data to correct fields on click using AJAX.
function loadQuestions() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        let questionData = JSON.parse(this.responseText)
        if(count < questionData.length) {
            document.getElementById("answer-left").innerHTML = questionData[count]['answer1'];
            document.getElementById("question").innerHTML = questionData[count]['question'];
            document.getElementById("answer-right").innerHTML = questionData[count]['answer2'];
            count++
        } else {
            getAnswersList()
            document.querySelector('#show-circus-character').style.display = "block";
            document.querySelector('.question-wrapper').style.display = "none";
        }
    }
    
    // Work around for connection to API form either localhost or aws server.
    if(url.includes('localhost')) {
        xhttp.open('GET', 'http://localhost:5000/api/questions', true);
    } else {
        xhttp.open('GET', 'http://13.236.69.221:5000/api/questions', true);
    }
    xhttp.send();
}

// Get all elements and change innerHTML to the answers from the quiz.
function getAnswersList() {
    document.querySelector('#a1').innerHTML = "Answer 1: " + answerList[0] + ","
    document.querySelector('#a2').innerHTML = "Answer 2: " + answerList[1] + ","
    document.querySelector('#a3').innerHTML = "Answer 3: " + answerList[2] + ","
    document.querySelector('#a4').innerHTML = "Answer 4: " + answerList[3] + ","
    document.querySelector('#a5').innerHTML = "Answer 5: " + answerList[4]
}

// Get the value of the answer and add it to the array of answers.
function addAnswerToList(element) {
    let answer = document.querySelector("#" + element);
    answerList.push(answer.innerHTML)
}

// Calculate the total points of all 5 quiz questions.
function calculateQuizScore() {

    // Enum containing answers and scores.
    const points = {
        "video games": 4,
        "real sport": 8,
        "movie star": 6,
        "astronaut": 2,
        "disneyland": 6,
        "skiing, surfing or horse riding": 10,
        "climb a mountain": 10,
        "go to a museum": 4,
        "run away with the circus": 8,
        "sail around the world": 2,
    };

    // If the answer list length is 5, calulate total score of all 5 answers.
    if(answerList.length == 5) {
        for(let i = 0; i < answerList.length; i++) {
            quizScore += Number(points[answerList[i]]) 
        }   

        // Add score to page.
        document.querySelector('#score').innerHTML = "Score: " + quizScore;

        // Call add image function.
        addCircusImage()      
    }
}

// Add circus image to page determined by quiz score.
function addCircusImage() {
   var img =  document.querySelector('#circus-img')
   console.log(img);

    if(quizScore <= 18 ) {
        img.setAttribute('src', 'img/tightrope.jpg') ;
    } else if (quizScore <= 24 && quizScore > 18) {
        img.setAttribute('src', 'img/magician.jpg');
    } else if (quizScore <= 30 && quizScore > 24) {
        img.setAttribute('src', 'img/cannonball.jpg');
    } else if (quizScore <= 36 && quizScore > 30) {
        img.setAttribute('src', 'img/acrobat.jpg');
    } else if (quizScore > 36) {
        img.setAttribute('src', 'img/strongman.jpg');
    } 
}





