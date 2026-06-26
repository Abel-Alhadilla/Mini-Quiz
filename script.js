// BUTTON
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
// QUESTION
const questionSpan = document.getElementById("question");
const answerContainer = document.getElementById("answer-container");
// QUESTION INFO
const currentQuestionSpan = document.getElementById("current-question");
const scoreSpan = document.getElementById("score");
const progresBar = document.getElementById("progres");
const timerSpan = document.getElementById("timer");
const timeInfo = document.getElementById("time-score-info");
// SCREEN
const startScreen = document.getElementById("start");
const quizScreen = document.getElementById("quiz");
const resultScreen = document.getElementById("result");
// RESULT
const resultText = document.getElementById("result-text");
const scoreText = document.getElementById("score-text");

const questions = [
  {
    question: "What is the capital city of Indonesia?",
    answer: [
      { text: "Jakarta", value: true },
      { text: "New York", value: false },
      { text: "Bandung", value: false },
      { text: "Yogyakarta", value: false },
    ],
  },
  {
    question: "What is the meaning of EAT in Indonesia?",
    answer: [
      { text: "Minum", value: false },
      { text: "Lari", value: false },
      { text: "Makan", value: true },
      { text: "Tidur", value: false },
    ],
  },
  {
    question: "Which one is an Indonesian food?",
    answer: [
      { text: "Spaghetti", value: false },
      { text: "Hot Dog", value: false },
      { text: "Rendang", value: true },
      { text: "Pizza", value: false },
    ],
  },
  {
    question: "What is the meaning of SLEEPY in Indonesia?",
    answer: [
      { text: "Lapar", value: false },
      { text: "Mengantuk", value: true },
      { text: "Haus", value: false },
      { text: "Kenyang", value: false },
    ],
  },
  {
    question: "Who is the President of Indonesia in 2026?",
    answer: [
      { text: "Soekarno", value: false },
      { text: "Anies Baswedan", value: false },
      { text: "Ganjar Pranowo", value: false },
      { text: "Prabowo Subianto", value: true },
    ],
  },
];

function randomQuestion() {
  questions.sort(() => Math.random() - 0.5);
}

let currentQuestion = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

if (score > highScore) {
  localStorage.setItem("highScore", score);
}

startButton.onclick = startQuiz;

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  updateBar();
  randomQuestion();

  resultScreen.classList.remove("active");
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  timeInfo.classList.add("active");
  document.getElementById("highScore").textContent = `${highScore}`;

  showQuestion();
}

function showQuestion() {
  questionSpan.textContent = questions[currentQuestion].question;

  currentQuestionSpan.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  scoreSpan.textContent = `Score : ${score}`;

  showAnswer();
  startTimer();
}

function showAnswer() {
  answerContainer.innerHTML = "";

  questions[currentQuestion].answer.forEach((answer) => {
    const button = document.createElement("button");

    button.classList.add("answer-button");
    button.textContent = answer.text;
    button.dataset.value = answer.value;
    button.addEventListener("click", () => checkAnswer(button));

    answerContainer.appendChild(button);
  });
}

function updateBar() {
  let barPercent = (currentQuestion / questions.length) * 100;
  barPercent = Number(barPercent);

  progresBar.style.width = `${barPercent}%`;
}

function checkAnswer(button) {
  const buttons = document.querySelectorAll(".answer-button");
  buttons.forEach((button) => {
    button.disabled = true;
  });

  if (button.dataset.value === "true") {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  setTimeout(() => {
    currentQuestion++;

    updateBar();

    setTimeout(() => {
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    }, 500);
  }, 300);
}

let timeLeft = 10;
let timer;

function startTimer() {
  clearInterval(timer);

  timeLeft = 11;
  updateBar();

  timer = setInterval(() => {
    timeLeft--;

    timerSpan.textContent = `${timeLeft}`;
    updateBar();

    if (timeLeft <= 0) {
      clearInterval(timer);

      currentQuestion++;

      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    }
  }, 1000);
}

function showResult() {
  quizScreen.classList.remove("active");
  timeInfo.classList.remove("active");
  resultScreen.classList.add("active");

  resultText.textContent = `Quiz Finished!!!`;
  scoreText.textContent = `You Scored ${score} out of ${questions.length}`;

  restartButton.addEventListener("click", startQuiz);

  setTimeout(() => {
    window.alert(`Quiz Over!\nScore: ${score}\nHigh Score: ${highScore}`);
  }, 500);
}
