const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks Text Mark Language"
    ],
    answer: 0
  },
  {
    question: "Which one is JavaScript?",
    options: ["JS", "HTML", "CSS"],
    answer: 0
  },
  {
    question: "Which method creates a new HTML element?",
    options: ["getElementById()", "createElement()", "querySelector()"],
    answer: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 20;
let timer;

const startContainer = document.getElementById("start-container");
const startButton = document.getElementById("start-button");

const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");

const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

const timerText = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
nextButton.addEventListener("click", nextQuestion);

function startQuiz() {
  startContainer.classList.add("hidden");
  scoreContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  currentQuestionIndex = 0;
  score = 0;

  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  resetState();
  updateProgressBar();

  const currentQuestion = quizData[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => selectOption(index));
    optionsContainer.appendChild(button);
  });

  startTimer();
}

function resetState() {
  optionsContainer.innerHTML = "";
  nextButton.disabled = true;
  timeLeft = 20;
  timerText.textContent = `Time Left: ${timeLeft}s`;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerText.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      lockAnswers(null);
      nextButton.disabled = false;
    }
  }, 1000);
}

function selectOption(selectedIndex) {
  clearInterval(timer);

  const correctIndex = quizData[currentQuestionIndex].answer;

  if (selectedIndex === correctIndex) {
    score++;
  }

  lockAnswers(selectedIndex);
  nextButton.disabled = false;
}

function lockAnswers(selectedIndex) {
  const correctIndex = quizData[currentQuestionIndex].answer;
  const buttons = optionsContainer.children;

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;

    if (i === correctIndex) {
      buttons[i].classList.add("correct");
    } else if (i === selectedIndex) {
      buttons[i].classList.add("wrong");
    }
  }
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex) / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function showScore() {
  clearInterval(timer);
  quizContainer.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${quizData.length}`;

  progressBar.style.width = "100%";
}

function restartQuiz() {
  scoreContainer.classList.add("hidden");
  startContainer.classList.remove("hidden");
}