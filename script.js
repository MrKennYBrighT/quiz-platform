// === USER CREDENTIALS ===
const validUsername = "myquizz";
const validPassword = "success100";

// === DOM ELEMENTS: Login + Lobby ===
const loginScreen = document.getElementById("loginScreen");
const quizLobby = document.getElementById("quizLobby");
const userDisplay = document.getElementById("userDisplay");
const loginButton = document.getElementById("loginButton");
const loginError = document.getElementById("loginError");

// === DOM ELEMENTS: Quiz Area ===
const startQuizButton = document.getElementById("startQuizButton");
const quizScreen = document.getElementById("quizScreen");
const timerDisplay = document.getElementById("timer");
const questionArea = document.getElementById("questionArea");
const questionCounter = document.getElementById("questionCounter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

// === DOM ELEMENTS: Results Area ===
const resultScreen = document.getElementById("resultScreen");
const scoreText = document.getElementById("scoreText");
const resultBreakdown = document.getElementById("resultBreakdown");
const retakeBtn = document.getElementById("retakeBtn");
const logoutBtn = document.getElementById("logoutBtn");

// === TIMER & STATE ===
let timeLeft = 2700; // 45 minutes
let timerInterval = null;
let currentQuestionIndex = 0;
let userAnswers = [];

// === QUIZ DATA ===
const quizData = [
  {
    question: "Which of the following is a synonym for 'happy'?",
    options: ["Sad", "Joyful", "Angry", "Tired"],
    answer: [1],
    explanation: "'Joyful' is a synonym for 'happy'.",
    type: "singleSelect"
  },
  {
    question: "What is the plural form of 'child'?",
    options: ["Childs", "Children", "Childrens", "Child"],
    answer: [1],
    explanation: "'Children' is the correct plural of 'child'.",
    type: "singleSelect"
  },
  {
    question: "Which word is an antonym of 'beautiful'?",
    options: ["Ugly", "Pretty", "Lovely", "Attractive"],
    answer: [0],
    explanation: "'Ugly' is the opposite of 'beautiful'.",
    type: "singleSelect"
  },
  {
    question: "What is the past tense of 'run'?",
    options: ["Ran", "Running", "Runs", "Run"],
    answer: [0],
    explanation: "'Ran' is the past tense of 'run'.",
    type: "singleSelect"
  },
  {
    question: "Which of the following is a verb?",
    options: ["Quickly", "Jump", "Beautiful", "Happiness"],
    answer: [1],
    explanation: "'Jump' is an action word—a verb.",
    type: "singleSelect"
  },
  {
    question: "Which of the following is a synonym for 'fast'?",
    options: ["Slow", "Quick", "Lazy", "Heavy"],
    answer: [1],
    explanation: "'Quick' means the same as 'fast'.",
    type: "singleSelect"
  },
  {
    question: "What is the plural form of 'mouse'?",
    options: ["Mouses", "Mouse", "Mice", "Mouse's"],
    answer: [2],
    explanation: "'Mice' is the irregular plural of 'mouse'.",
    type: "singleSelect"
  },
  {
    question: "Which word is an antonym of 'strong'?",
    options: ["Weak", "Powerful", "Sturdy", "Tough"],
    answer: [0],
    explanation: "'Weak' is the opposite of 'strong'.",
    type: "singleSelect"
  },
  {
    question: "What is the past tense of 'write'?",
    options: ["Wrote", "Writing", "Writes", "Write"],
    answer: [0],
    explanation: "'Wrote' is the correct past tense of 'write'.",
    type: "singleSelect"
  },
  {
    question: "Which of the following is an adjective?",
    options: ["Quickly", "Beautiful", "Jump", "Happiness"],
    answer: [1],
    explanation: "'Beautiful' describes a noun—it’s an adjective.",
    type: "singleSelect"
  },
  {
    question: "What is 12 × 12?",
    options: ["144", "121", "132", "124"],
    answer: [0],
    explanation: "12 multiplied by 12 equals 144.",
    type: "singleSelect"
  },
  {
    question: "What is √25?",
    options: ["4", "5", "6", "7"],
    answer: [1],
    explanation: "The square root of 25 is 5.",
    type: "singleSelect"
  },
  {
    question: "What is 20 ÷ 4?",
    options: ["4", "5", "6", "3"],
    answer: [1],
    explanation: "20 divided by 4 is 5.",
    type: "singleSelect"
  },
  {
    question: "What is the value of 2³?",
    options: ["6", "8", "9", "4"],
    answer: [1],
    explanation: "2 × 2 × 2 = 8.",
    type: "singleSelect"
  },
  {
    question: "What is 50 ÷ 5?",
    options: ["5", "10", "15", "20"],
    answer: [1],
    explanation: "50 divided by 5 is 10.",
    type: "singleSelect"
  },
  {
    question: "What is 7 × 8?",
    options: ["56", "48", "64", "72"],
    answer: [0],
    explanation: "7 times 8 equals 56.",
    type: "singleSelect"
  },
  {
    question: "What is 100 ÷ 10?",
    options: ["10", "20", "5", "15"],
    answer: [0],
    explanation: "100 divided by 10 is 10.",
    type: "singleSelect"
  },
  {
    question: "What is 9 × 6?",
    options: ["54", "63", "48", "72"],
    answer: [0],
    explanation: "9 times 6 equals 54.",
    type: "singleSelect"
  },
  {
    question: "What is 15 + 27?",
    options: ["42", "43", "41", "45"],
    answer: [0],
    explanation: "15 plus 27 equals 42.",
    type: "singleSelect"
  },
  {
    question: "What is 81 ÷ 9?",
    options: ["9", "8", "7", "6"],
    answer: [0],
    explanation: "81 divided by 9 equals 9.",
    type: "singleSelect"
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "India", "South Korea"],
    answer: [1],
    explanation: "Japan is called the Land of the Rising Sun.",
    type: "singleSelect"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
    answer: [1],
    explanation: "Leonardo da Vinci painted the Mona Lisa.",
    type: "singleSelect"
  },
  {
    question: "Which is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: [3],
    explanation: "The Pacific Ocean is the largest ocean.",
    type: "singleSelect"
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: [2],
    explanation: "Plants use carbon dioxide during photosynthesis.",
    type: "singleSelect"
  },
  {
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    answer: [2],
    explanation: "There are 7 continents on Earth.",
    type: "singleSelect"
  },
  {
    question: "What is the capital of France?",
    options: ["Madrid", "Rome", "Paris", "Berlin"],
    answer: [2],
    explanation: "Paris is the capital of France.",
    type: "singleSelect"
  },
  {
    question: "What does the acronym ‘NASA’ stand for?",
    options: [
      "National Association of Space Astronauts",
      "National Aeronautics and Space Administration",
      "North American Space Agency",
      "New Age Space Alliance"
    ],
    answer: [1],
    explanation: "NASA stands for National Aeronautics and Space Administration.",
    type: "singleSelect"
  },
  {
    question: "In which direction does the sun rise?",
    options: ["North", "South", "East", "West"],
    answer: [2],
    explanation: "The sun rises in the East.",
    type: "singleSelect"
  },
  {
    question: "Which is the tallest mountain in the world?",
    options: ["K2", "Mount Kilimanjaro", "Mount Elbrus", "Mount Everest"],
    answer: [3],
    explanation: "Mount Everest is the tallest mountain above sea level.",
    type: "singleSelect"
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["Mark Twain", "William Shakespeare", "Jane Austen", "Charles Dickens"],
    answer: [1],
    explanation: "William Shakespeare wrote 'Romeo and Juliet'.",
    type: "singleSelect"
  },
];

// === SET INITIAL SCREEN VISIBILITY ===
// Ensures only login screen is visible on fresh load
loginScreen.classList.remove("hidden");
quizLobby.classList.add("hidden");
quizScreen.classList.add("hidden");
resultScreen.classList.add("hidden");

window.addEventListener("load", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const savedUser = localStorage.getItem("username");

  if (isLoggedIn && savedUser) {
    loginScreen.classList.add("hidden");
    quizLobby.classList.remove("hidden");
    quizLobby.classList.add("active");
    userDisplay.textContent = savedUser;
  } else {
    // Always clear stale sessions when not properly authenticated
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");

    loginScreen.classList.remove("hidden");
    quizLobby.classList.remove("active");
    quizLobby.classList.add("hidden");
  }
});


// === LOGIN FUNCTIONALITY ===
loginButton.addEventListener("click", () => {
  const usernameInput = document.getElementById("username").value.trim();
  const passwordInput = document.getElementById("password").value;

  if (usernameInput === validUsername && passwordInput === validPassword) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", usernameInput);

    loginScreen.classList.add("hidden");
    quizLobby.classList.remove("hidden");
    quizLobby.classList.add("active");
    userDisplay.textContent = usernameInput;

    loginError.textContent = "Incorrect username or password.";
  }
});

// === START QUIZ ===
startQuizButton.addEventListener("click", () => {
  quizLobby.classList.remove("active");
  quizLobby.classList.add("hidden");

  quizScreen.classList.remove("hidden");
  quizScreen.classList.add("active");

  userAnswers = Array(quizData.length).fill(null);
  currentQuestionIndex = 0;
  startTimer();
  loadQuestion(currentQuestionIndex);
});

// === TIMER FUNCTION ===
function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("Time's up!");
      showResults(); // Auto-submit when time runs out
    }
  }, 1000);
}

// === DISPLAY TIMER ===
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `Time Left: ${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// === LOAD QUESTION ===
function loadQuestion(index) {
  const q = quizData[index];
  questionCounter.textContent = `Question ${index + 1} of ${quizData.length}`;

  const optionsHTML = q.options
    .map((opt, i) => {
      const isChecked = userAnswers[index] === i ? "checked" : "";
      return `
        <label>
          <input type="radio" name="option" value="${i}" ${isChecked} />
          ${opt}
        </label>
      `;
    })
    .join("<br>");

  questionArea.innerHTML = `
    <div class="question-text">${q.question}</div>
    <div class="options">${optionsHTML}</div>
  `;

  prevBtn.disabled = index === 0;
  nextBtn.style.display = index < quizData.length - 1 ? "inline-block" : "none";
  submitBtn.classList.toggle("hidden", index !== quizData.length - 1);
}

// === STORE SELECTED ANSWERS ===
questionArea.addEventListener("change", (e) => {
  if (e.target.name === "option") {
    userAnswers[currentQuestionIndex] = parseInt(e.target.value);
  }
});

// === NEXT / PREVIOUS BUTTONS ===
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
  }
});

// === SUBMIT QUIZ ===
submitBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  showResults();
});

// === SHOW RESULTS SCREEN ===
function showResults() {
  quizScreen.classList.remove("active");
  quizScreen.classList.add("hidden");

  resultScreen.classList.remove("hidden");
  resultScreen.classList.add("active");

  let score = 0;
  quizData.forEach((q, i) => {
    if (userAnswers[i] === q.answer[0]) {
      score++;
    }
  });

  scoreText.textContent = `You scored ${score} out of ${quizData.length}!`;

  const resultHTML = quizData.map((q, i) => {
    const userIndex = userAnswers[i];
    const isCorrect = userIndex === q.answer[0];
    const userAnswer = userIndex != null ? q.options[userIndex] : "No answer";
    const correctAnswer = q.options[q.answer[0]];

    return `
      <div class="result-block ${isCorrect ? 'correct' : 'incorrect'}">
        <strong>Q${i + 1}:</strong> ${q.question}<br/>
        <em>Your answer:</em> ${userAnswer}<br/>
        <em>Correct answer:</em> ${correctAnswer}<br/>
        <small>${q.explanation}</small>
      </div>
    `;
  }).join("<hr>");

  resultBreakdown.innerHTML = resultHTML;
}

// === RETAKE + LOGOUT ===
retakeBtn.addEventListener("click", () => {
  location.reload();
});

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
