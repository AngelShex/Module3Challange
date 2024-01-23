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
        { text: "<title>", correct: false},
        { text: "<head>", correct: false},
        { text: "<html>", correct: false},
        { text: "<!DOCTYPE html>", correct: true},
               ]
      },
      {
        question: "What links an style.css file using your index.html file?",
        answers: [
          { text: "<style.css+doc.ment>", correct: false},
          { text: "<link href=style.css/>", correct: true},
          { text: "<doc-ture.style.css>", correct: false},
          { text: "none of the above", correct: false},
                 ]
        },
];

// adding variables for the questions 
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// store question answer
let currentQuestionIndex = 0;
let score = 0;

// will rest quiz questions to 0 when we start quiz
function startQuiz(){
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

  // Display buttons once text is answered
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none"; 
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
if(isCorrect){
  selectedBtn.classList.add("correct");
  score++;
}else{
  selectedBtn.classList.add("incorrect");
}
Array.from(answerButton.children).forEach(button=>{
  if(button.dataset.correct === "ture"){
    button.classList.add("correct");
  }
  button.disabled = ture;
});
nextButton.style.display = "block";
}


function showScore(){
  resetState();
  questionElement.innerHTML = 'You scored ${score} out of ${questions.length}!';
  nextButton.innerHTML = "play Again";
  nextButton.style.display = "block";
}


function handleNextButton(){
currentQuestionIndex++;
if(currentQuestionIndex < questions.length){
showQuestion();
}else{
  showScore();
}
}



nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

startQuiz();