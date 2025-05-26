// Variables
let quizData = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

// Quiz categories/questions
const categories = {
  html: [
    { question: "What does HTML stand for?", a: "Hyper Trainer Marking Language", b: "Hyper Text Markup Language", c: "Hyper Text Markdown Language", d: "None", correct: "b" },
    { question: "Which tag is used for headings?", a: "<h1>-<h6>", b: "<head>", c: "<header>", d: "<h>", correct: "a" },
    { question: "Which tag is used for Bolding?", a: "a tag", b: "b tag", c: "d tag", d: "g tag", correct: "b" },
    { question: "Which tag is used for abbriviation?", a: "bbr", b: "abb", c: "abbr", d: "bbr", correct: "c" },
    { question: "Which tag is used for styling?", a: "design", b: "style", c: "decoration", d: "light", correct: "b" },
  ],
  css: [
    { question: "What does CSS stand for?", a: "Colorful Style Sheets", b: "Cascading Style Sheets", c: "Creative Style Sheets", d: "Computer Style Sheets", correct: "b" },
    { question: "Which property changes text color?", a: "font-color", b: "text-color", c: "color", d: "background-color", correct: "c" },
    { question: "Which property changes text color?", a: "color", b: "text-color", c: "font-color", d: "background-color", correct: "a" },
    { question: "Which property changes text background color?", a: "background-style", b: "background-color", c: "color", d: "hover", correct: "a" },
    { question: "Which property changes text dircetion?", a: "font-align", b: "text-direction", c: "dir", d: "text-align", correct: "d" },
  ],
  js: [
    { question: "Which keyword declares a variable?", a: "let", b: "var", c: "const", d: "All of the above", correct: "d" },
    { question: "JavaScript runs in which environment?", a: "Server", b: "Browser", c: "Compiler", d: "IDE", correct: "b" },
    { question: "Which of the following is NOT a JavaScript data type?", a: "string", b: "Boolean", c: "folat", d: "Obj", correct: "c" },
    { question: "What does the Array.isArray() method do in JavaScript?", a: "Converts an object into an array", b: "Checks whether a value is an array", c: "Returns the first element of an array", d: "none", correct: "b" },
    { question: "What keyword declares a constant?", a: "Var", b: "let", c: "Const", d: "dec", correct: "c" },
  ],
  cpp: [
    { question: "Who developed C++?", a: "Bjarne Stroustrup", b: "Dennis Ritchie", c: "James Gosling", d: "Guido van Rossum", correct: "a" },
    { question: "Which symbol is used to add a comment in C++?", a: "/", b: "//", c: "*/", d: "/*", correct: "b" },
    { question: "Which symbol is used to end a statement in C++?", a: ":", b: ".", c: ";", d: "/", correct: "c" },
    { question: "What is the correct way to declare an integer variable in C++?", a: "int num;", b: "interger num;", c: "num int;", d: "int = num", correct: "a" },
    { question: "Which of the following is the correct syntax for a for loop", a: "for (int i = 0; i < 5; i++)", b: "for i = 0 to 5", c: "loop (i = 0; i < 5; i++)", d: "repeat i form 0 to 5", correct: "a" },
  ],
  python: [
    { question: "What is the correct file extension for Python?", a: ".pt", b: ".pyt", c: ".py", d: ".python", correct: "c" },
    { question: "Which keyword defines a function in Python?", a: "func", b: "define", c: "def", d: "function", correct: "c" },
    { question: "How do you write a comment in Python?", a: "// This is a comment", b: "<!-- This is a comment -->", c: "# This is a comment", d: "** This is a comment", correct: "c" },
    { question: "What is the output of print(type(str))?", a: "<class 'int'>", b: "<class 'float'>", c: "<class 'string'>", d: "<class 'str'>", correct: "c" },
    { question: "Which of the following is a correct way to create a list in Python?", a: "list = (1, 2, 3)", b: "list = {1, 2, 3}", c: "list = [1, 2, 3]", d: "list = <1, 2, 3>", correct: "c" },
  ],
};

// Elements
const categorySection = document.getElementById("category-section");
const quizSection = document.getElementById("quiz-section");
const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const progressFill = document.getElementById("progress-fill");
const timeEl = document.getElementById("time");
const nextBtn = document.getElementById("next");
const backBtn = document.getElementById("back");
const submitBtn = document.getElementById("submit");
const modeToggle = document.getElementById("mode-toggle");

// Start quiz with selected category
function startQuiz(category) {
  quizData = categories[category];
  currentQuestion = 0;
  score = 0;
  categorySection.style.display = "none";
  quizSection.style.display = "block";
  loadQuestion();
}

// Load current question
function loadQuestion() {
  deselectAnswers();
  const current = quizData[currentQuestion];
  questionEl.innerText = current.question;
  a_text.innerText = current.a;
  b_text.innerText = current.b;
  c_text.innerText = current.c;
  d_text.innerText = current.d;
  updateProgress();
  updateButtons();
  resetTimer();
  startTimer();
}

// Get selected answer
function getSelected() {
  let answer = undefined;
  answerEls.forEach((el) => {
    if (el.checked) {
      answer = el.id;
    }
  });
  return answer;
}

// Deselect answers
function deselectAnswers() {
  answerEls.forEach((el) => (el.checked = false));
}

// Update progress bar (use currentQuestion +1 to show progress correctly)
function updateProgress() {
  const progressPercent = ((currentQuestion + 1) / quizData.length) * 100;
  progressFill.style.width = progressPercent + "%";
}

// Timer functions

function startTimer() {
  timeLeft = 15;
  timeEl.innerText = `Time left: ${timeLeft}s;`
  timer = setInterval(() => {
    timeLeft--;
    timeEl.innerText = `Time left: ${timeLeft}s;`
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timeEl.innerText = `Time left: ${timeLeft}s;`
}


// Handle timeout: submit answer and move on
function handleTimeout() {
  submitAnswer();
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {

showResult();
  }
}

// Submit answer and update score
function submitAnswer() {
  if (submitBtn.disabled) return; // Prevent multiple submits
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuestion].correct) {
      score++;
    }
  }
  submitBtn.disabled = true;
  disableAnswers(true);
}

// Disable or enable answer inputs
function disableAnswers(disable) {
  answerEls.forEach((el) => {
    el.disabled = disable;
  });
}

// Show results and restart option
function showResult() {
  clearInterval(timer);
  quizSection.innerHTML = `
    <h2>Your Score: ${score} / ${quizData.length}</h2>
    <button id="restart">Restart Quiz</button>
  `;
  const restartBtn = document.getElementById("restart");
  restartBtn.addEventListener("click", () => {
    categorySection.style.display = "block";
    quizSection.style.display = "none";
  });
}

// Button handlers
nextBtn.addEventListener("click", () => {
  if (!submitBtn.disabled) {
    alert("Please submit your answer before moving on.");
    return;
  }
  clearInterval(timer);
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
});

backBtn.addEventListener("click", () => {
  clearInterval(timer);
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
});

submitBtn.addEventListener("click", () => {
  submitAnswer();
  if (currentQuestion === quizData.length - 1) {
    showResult();
  }
});

// Update buttons state: disable back if first question, disable next if last
function updateButtons() {
  backBtn.disabled = currentQuestion === 0;

  if (currentQuestion === quizData.length - 1) {
    nextBtn.style.display = "none";         // Hide Next
  } else {
    nextBtn.style.display = "inline-block"; // Show Next
  }

  submitBtn.disabled = false;
  disableAnswers(false);
}

// Dark/light mode toggle
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    modeToggle.textContent = "☀️";
  } else {
    modeToggle.textContent = "🌙";
  }
});