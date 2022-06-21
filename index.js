// select elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");


// add questions
let questions = [
    {
      question: "Where does Michael Scott move to start his new life with Holly?",
      choiceA: "New York, New York",
      choiceB: "Los Angeles, California",
      choiceC: "Boulder, Colorado",
      choiceD: "Salt Lake City, Utah",
      correct: "C"
      },
    {
      question: "Which of these is NOT a name of one Angela's cats?",
      choiceA: "Bandit",
      choiceB: "Sprinkles",
      choiceC: "Petals",
      choiceD: "Oreo",
      correct: "D"
    },
    {
      question: "At Phyllis' wedding, Michael revealed that her nickname in high school was what?",
      choiceA: "Perfectly Adequate",
      choiceB: "Easy Rider",
      choiceC: "OCD Girl",
      choiceD: "Belle",
      correct: "B"
    },
    {
      question: "Michael and Dwight tried to steal clients from which local competing business?",
      choiceA: "Staples",
      choiceB: "Pendelton",
      choiceC: "Catalyst Paper",
      choiceD: "Prince Family Paper",
      correct: "D"
    },
    {
      question: "Finish Dwight's security code: “The tea in Nepal is very hot, but the coffee in ______ is much hotter.",
      choiceA: "Cuba",
      choiceB: "Cebu",
      choiceC: "Peru",
      choiceD: "Brazil",
      correct: "C"
    },
    {
      question: "Which Harry Potter book did Dwight say he'd take to a desert island?",
      choiceA: "Harry Potter and the Prisoner of Azkaban",
      choiceB: "Harry Potter and the Order of the Phoenix",
      choiceC: "Harry Potter and the Half-Blood Prince",
      choiceD: "Harry Potter and the Sorcerer's Stone",
      correct: "A"
    },
    {
      question: "While playing who would you do in the office, Michael says he’d have sex with which coworker?",
      choiceA: "Pam",
      choiceB: "Angela",
      choiceC: "Ryan",
      choiceD: "Danny",
      correct: "C"
    },
    {
      question: "Who won the last 'Hottest in the Office Dundie Award'?",
      choiceA: "Ryan Howard",
      choiceB: "Pam Beesly",
      choiceC: "Danny Cordray",
      choiceD: "Michael Scott",
      correct: "C"
    },
    {
      question: "What does Dwight say is the scariest animal?",
      choiceA: "Black Bear",
      choiceB: "Lions",
      choiceC: "Sharks",
      choiceD: "Box Jellyfish",
      correct: "D"
    },
    {
      question: "Why is Michael afraid to move to Colorado?",
      choiceA: "He's going to miss his Dunder Mifflin family.",
      choiceB: "The TV channels will be in the wrong order.",
      choiceC: "He'll never see Ryan again.",
      choiceD: "He doesn't know anyone is Colorado",
      correct: "B"
    },
    {
      question: "What is the title of the movie Michael Scott makes?",
      choiceA: "Level One: Midnight",
      choiceB: "Michael Scorn",
      choiceC: "Nightmare in  Scranton",
      choiceD: "Threat Level Midnight",
      correct: "D"
    },
    {
      question: "When Dwight is explaining his perfect crime, what is the name of the girl?",
      choiceA: "Tawny",
      choiceB: "Taylor",
      choiceC: "Tiffany",
      choiceD: "Tammy",
      correct: "C"
    },
    {
      question: "In the “Diversity Day” episode, what famous comedian’s stand up routine does Michael imitate?",
      choiceA: "Chris Rock",
      choiceB: "Dave Chappelle",
      choiceC: "Louis C.K.",
      choiceD: "Ricky Gervis",
      correct: "A"
    }
    
]

// variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render questions
function renderQuestion() {
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src='https://wallpaperaccess.com/full/1146177.jpg' width='640px' height='360px'>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz functions
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000);
}

// render progress
renderProgress = () => {
    for(let index = 0; index <= lastQuestion; index++){
        progress.innerHTML += "<div class='prog' id="+ index +"></div>";
    }
}

// counter render
function renderCounter() {
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// check answers
function checkAnswer(answer) {
    if( answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}

// if the answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "lightgreen";
}

// if the answer is wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "red";
}

// score
function scoreRender(){
    scoreDiv.style.display = "block";

    // percentage of correct answers
    const scorePercentage = Math.round(100 * score/questions.length);

    // images for the final score tally
    let image = (scorePercentage >= 80) ? "./images/_5.png" :
            (scorePercentage >= 60) ? "./images/_4.png" :
            (scorePercentage >= 40) ? "./images/_3.png" :
            (scorePercentage >= 20) ? "./images/_2.png" :
            "./images/_1.png";
            
    // invoke the code
    scoreDiv.innerHTML = "<img src="+ image +">";
    scoreDiv.innerHTML += "<p>"+ scorePercentage+" %</p>";
}

// add The Office theme song
function play() {
var audio = new Audio ('https://www.televisiontunes.com/uploads/audio/The%20Office.mp3');
audio.play();
}