const quizData = [
  {
    question: "What is the capital of France?",
    a: "Berlin",
    b: "London",
    c: "Paris",
    d: "Madrid",
    correct: "c",
  },
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hyperloop Machine Language",
    c: "Hyperlink Markup Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];

const quiz = document.getElementById("quiz");
const answerElements = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

// Load the first quiz question
loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
  answerElements.forEach((answer) => (answer.checked = false));
}

function getSelected() {
  let answer = undefined;

  answerElements.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      showResults();
    }
  } else {
    alert("Please select an answer before submitting.");
  }
});

function showResults() {
  quiz.innerHTML = `
        <div id="score-container">
            <h2>You answered ${score} out of ${quizData.length} questions correctly.</h2>
            <button onclick="restartQuiz()">Restart Quiz</button>
        </div>
    `;
}

function restartQuiz() {
  currentQuiz = 0;
  score = 0;
  loadQuiz();
}

//for adding of timers
let time = 15; // 15 seconds for each question
let timerInterval;

function loadQuiz() {
  deselectAnswers();
  clearInterval(timerInterval);
  time = 15;
  startTimer();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function startTimer() {
  const timer = document.createElement("div");
  timer.id = "timer";
  document.querySelector(".quiz-header").prepend(timer);
  timer.innerText = `Time Left: ${time}s`;

  timerInterval = setInterval(() => {
    time--;
    timer.innerText = `Time Left: ${time}s`;
    if (time <= 0) {
      clearInterval(timerInterval);
      submitBtn.click(); // Automatically submit the answer
    }
  }, 1000);
}

//to randomise the questions

// Shuffle function using Fisher-Yates algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Shuffle questions and their answers
let shuffledQuizData = shuffle([...quizData]);

shuffledQuizData.forEach((question) => {
  let answers = ["a", "b", "c", "d"];
  question.answers = shuffle(answers);
});
