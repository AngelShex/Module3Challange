// added questions to the java file with answers
const questions = [
  {
    question: "How do you create an index.html file?",
    answers: [
      { text: "you can make a clone of it from git hub", correct: false},
      { text: "type touch index.html in git bash", correct: true},
      { text: "creat another blank sheet file within the file", correct: false},
      { text: "type in mkdir index.html in git bash", correct: false},
    ]
  },
  {
    question: "What is the definition of repository?",
    answers: [
      { text: "a repo that inhearts a fork from the upstream of a parent code", correct: false},
      { text: "a folder in which all files and their version histories are stored", correct: true},
      { text: "after a pull request is approved the commit is pulled up ", correct: false},
      { text: "a platform that securley deploys a website from a github repo in minutes", correct: false},
             ]
    },
    {
      question: "The correct first line in most index.html files is?",
      answers: [
        { text: "title", correct: false},
        { text: "head", correct: false},
        { text: "html", correct: false},
        { text: "!DOCTYPE html", correct: true},
               ]
      },
      {
        question: "What links an style.css file using your index.html file?",
        answers: [
          { text: "style.css+doc.ment", correct: false},
          { text: "link href=style.css/", correct: true},
          { text: "doc-ture.style.css", correct: false},
          { text: "none of the above", correct: false},
                 ]
        },
];

// adding variables for the questions 
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start")
const questionPage = document.querySelector(".app")
const startPage = document.querySelector(".startpage")


// store question answer
let currentQuestionIndex = 0;
let score = 0;

// will rest quiz questions to 0 when we start quiz
function startQuiz(){
  questionPage.classList.remove("hide")
  startPage.classList.add("hide")
currentQuestionIndex = 0;
score = 0;
nextButton.innerHTML = "Next";
showQuestion();
}

// loads next question as we answer through the list
function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // Display question text
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
// next button while clicked
function resetState(){
  nextButton.style.display = "none"; 
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
// If answer is correct or incorrect it will show
function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
if(isCorrect){
  selectedBtn.classList.add("correct");
  score++;
}else{
  selectedBtn.classList.add("incorrect")
    secondsLeft = secondsLeft - 10;
}
Array.from(answerButtons.children).forEach(button => {
  if(button.dataset.correct === "true"){
    button.classList.add("correct");
  }
  button.disabled = true;
});
nextButton.style.display = "block";
}

// shows the end game score
function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

// increases questions by one
function handleNextButton(){
currentQuestionIndex++;
if(currentQuestionIndex < questions.length){
showQuestion();
}else{
  showScore();
}
}

// working on timer
var timeEl = document.querySelector(".time");

var secondsLeft = 50;
timeEl.textContent = 50;
function setTime(){
  var timerInterval = setInterval(function(){
  secondsLeft--;
  timeEl.textContent = secondsLeft + " seconds left for quiz";

  if(secondsLeft === 0){
    clearInterval(timerInterval);
    sendMessage();
  }
  }, 1000);
}

setTime();





// restart the quiz if out of questions
nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

startButton.addEventListener("click",startQuiz)
