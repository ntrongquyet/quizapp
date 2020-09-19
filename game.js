const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const processing = document.getElementById("processing");

let currentQuestion = {}; // Câu hỏi hiện tại
let acceptingAnswer = false;
let score = 0; // Điểm
let questionCounter = 0; // Đếm số câu hỏi đã trả lời
let availableQuestions = []; // Câu hỏi chưa trả lời
let questions = [
  {
    question: "Bỏ ngoài nướng trong, ăn ngoài bỏ trong là gì?",
    choice1: "Bí đỏ",
    choice2: "Bí đao",
    choice3: "Bắp",
    choice4: "Táo",
    answer: 3,
  },
  {
    question:
      "Có 1 đàn chim đậu trên cành, người thợ săn bắn cái rằm. Hỏi chết mấy con?",
    choice1: "15 con",
    choice2: "13 con",
    choice3: "14 con",
    choice4: "16 con",
    answer: 1,
  },
  {
    question: "Bệnh gì bác sĩ bó tay?",
    choice1: "Gãy chân",
    choice2: "Gãy cổ",
    choice3: "Gãy cẳng",
    choice4: "Gáy tay",
    answer: 4,
  },
  {
    question:
      "Con chó đen người ta gọi là con chó mực. Con chó vàng, người ta gọi là con chó phèn. Con chó sanh người ta gọi là con chó đẻ. Vậy con chó đỏ, người ta gọi là con chó gì?",
    choice1: "Chó máu",
    choice2: "Chó hoe",
    choice3: "Chó đỏ",
    choice4: "Chó vàng",
    answer: 3,
  },
];
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = questions.length; // Số lượng câu hỏi
startGame = () => {
  questionCounter = 0;
  questionCounterText.innerText = `${questionCounter}/${questions.length}`;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};
getNewQuestion = () => {
  if (questionCounter >= MAX_QUESTIONS) {
    sessionStorage.setItem('currentScore',score);
    return window.location.assign("/end.html");
  }
  questionCounter++;
  /* Hiện thị số câu hỏi đã trả lời */
  questionCounterText.innerText = `${questionCounter}/${questions.length}`;
  /* Update progressBar */
  
  processing.style.width = `${questionCounter / questions.length * 100}%`;
  /* Lấy vị trí câu hỏi ngẫu nhiên trong các câu hỏi hợp lệ */
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  /* Hiện thị câu hỏi và đáp án */
  question.innerText = currentQuestion.question;
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswer = true;
};
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswer) return;
    acceptingAnswer = true;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    /* Tạo class nếu kết quả đúng hoặc sai */
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
  if(classToApply==="correct"){
    incrementScore(10);
  }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});
incrementScore = num=>{
  score+=num;
  scoreText.innerText = score;
}
startGame();
