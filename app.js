//store is an object with each question being an array contain the question itself, an array of answers and the correct answer
//then the last var in the object are the currentQuestion and score iterating var
'use strict';
const store = {
  questions: [
    {
      question: 'What number did Kobe’s second-oldest daughter wear in high school?',
      answers: [
        '8',
        '13',
        '2',
        '24'
      ],
      correctAnswer: '2'
    },
    {
      question: 'Kobe set a record by hitting how many three-pointers in one game in 2003?',
      answers: [
        '12',
        '21',
        '9',
        '14'
      ],
      correctAnswer: '12'
    },
    {
      question: 'Kobe Bryant’s father, Joe Bryant, played for the Philadelphia 76ers, Houston Rockets, and which other NBA team?',
      answers: [
        'Lakers',
        'Spurs',
        'Raptors',
        'Clippers'
      ],
      correctAnswer:'Clippers'
    },
    {
      question:'When did Kobe change his jersey number from 8 to 24?',
      answers:[
        '2006-07 season',
        '2003-04 season',
        '2004-05 season',
        '2011-12 season'
      ],
      correctAnswer: 'At the start of the 2006-07 season'
    },
    {
      question: 'What was Kobe Bryant’s average .ppg in the 2000-2001 season?',
      answers:[
        '33.2',
        '29.8',
        '26.3',
        '28.5'
      ],
      correctAnswer: '28.5'
    },
    {
      question:'On January 22, 2006, Kobe had one of the greatest performances in NBA history, scoring 81 points in a single game. How many field goals did he make in that game?',
      answers: [
        '28',
        '27',
        '26',
        '24'
      ],
      correctAnswer: '28'
    },
    {
      question: 'Kobe was drafted right out of high school in 1996 by what NBA team?',
      answers: [
        'Phoenix Suns',
        'Miami Heat',
        'Detroit Pistons',
        'Charlotte Hornets'
      ],
      correctAnswer:'Charlotte Hornets'
    },
    {
      question:'How many points did Kobe score in his last game?',
      answers:[
        '81',
        '63',
        '45',
        '60'
      ],
      correctAnswer: '60'
    }
  ],
  score: 0,
  currentQuestion:0,
  quizStarted:false,
  currentOpenPage:false
};
//Here we start on the functions that we are using to control the quiz
//functionGenerateQuestions is purely generating the html for each question page
//
function generateQuestions(){
  let questionPage =  `<div class="coolClass">
  <div>
  <p id="paragraphText">
   You have ${store.score} out of ${store.questions.length} possible points
 </p>
 <p id="paragraphText">
   You are on question ${store.currentQuestion + 1} out of ${store.questions.length} questions
 </p>
 </div>
 <div class="container">
 <form id="answersForm">
 <h3 class="questionText">
   ${store.questions[store.currentQuestion].question}
 </h3>
 <div>
 <div class="c-radio">
   <input type="radio" id="answerChoice1" name="answer" value='${store.questions[store.currentQuestion].answers[0]}'checked>
   <label for="answerChoice1" id="labelText">${store.questions[store.currentQuestion].answers[0]}</label>
 </div>
 <div class="c-radio">
   <input type="radio" id="answerChoice2" name="answer" value='${store.questions[store.currentQuestion].answers[1]}'>
   <label for="answerChoice2" id="labelText">${store.questions[store.currentQuestion].answers[1]}</label>
 </div>
 <div class="c-radio">
   <input type="radio" id="answerChoice3" name="answer" value='${store.questions[store.currentQuestion].answers[2]}'>
   <label for="answerChoice3" id="labelText">${store.questions[store.currentQuestion].answers[2]}</label>
 </div>
 <div class="c-radio">
   <input type="radio" id="answerChoice4" name="answer" value='${store.questions[store.currentQuestion].answers[3]}'>
   <label for="answerChoice4" id="labelText">${store.questions[store.currentQuestion].answers[3]}</label>
 </div>
 </div>
 <div>
   <button type="submit" id="showAnswers">Shoot!</button>
 </div>
 </form>
 </div>
 </div>`;
  return questionPage;
}
//generateHomePage is generating homePage html as the default option
function generateHomePage(){
  let homePage = `<div id="main" class="coolClass">
  <h2 class="welcomePageH2">
  Hello, let's take a quiz!
</h2>
<form>
  <div class="btn">
    <button type="submit" id = "startQuiz" >Start Quiz</button>
  </div>
</form>
</div>`;
  return homePage;
}
//generateEndPage will activate through handleNextButton if there are no more questions
function generateEndPage(){
  let specificQuestion = store.questions[store.currentQuestion];
  let answer = $('input[name=answer]:checked').val();
  if(answer === specificQuestion.correctAnswer){
    let endPage = `<div id="main" class="coolClass"> 
  <h2>
  Kobe! You got it right
</h2>
<p>
  Quiz finished!
</p>
<p>
  Your Score:
</p>
<p id="paragraphText">
  You answered ${store.score} out of ${store.questions.length} correct!
</p>
  <div class="btn">
    <button id = "endQuiz">Retake Quiz</button>
  </div>
</div>`;
    return endPage;}
  else  {
    let endPage = `<div id="main" class="coolClass"> 
  <h2>
  Brick! The correct answer was ${store.questions[store.currentQuestion].correctAnswer}
</h2>
<p>
  Quiz Finished!
</p>
<p id="paragraphText">
  Your Score:
</p>
<p id="paragraphText">
  You answered ${store.score} out of ${store.questions.length} correct!
</p>
  <div class="btn">
    <button id = "endQuiz" >Retake Quiz</button>
  </div>
</div>`;
    return endPage;
  }
}
function generateCorrectPage(){
  let correctPage = `<div class="coolClass">
  <h3 class="welcomePageH2">
      Kobe! You got it right
    </h3>
    <p id="paragraphText">
      You have ${store.score} out of ${store.questions.length}
    </p>
    <p id="paragraphText">
      You are on ${store.currentQuestion} out of ${store.questions.length}
    </p>
    <form>
      <div class="btn">
        <button type="submit" id = "nextQ">Next Question!</button>
      </div>
    </form>
    </div>
  `;
  return correctPage;
}
function generateIncorrectPage(){
  let incorrectPage = `<div class="coolClass">
  <h3 class="welcomePageH2">
      Brick! The correct answer was ${store.questions[store.currentQuestion -1].correctAnswer}
    </h3>
    <p id="paragraphText">
      You have ${store.score} out of ${store.questions.length}
    </p>
    <p id="paragraphText">
      You are on ${store.currentQuestion} out of ${store.questions.length}
    </p>
    <form>
      <div class="btn">
        <button type="submit" id = "nextQ">Next Question!</button>
      </div>
    </form>
    </div>
  `;
  return incorrectPage;
}
function handleStartButton(){
  $('main').on('click','#startQuiz', function(e) {
    e.preventDefault();
    store.quizStarted = true;
    render();
  });
}
function handleSubmitButton(){
  $('main').on('submit', '#answersForm', function(evt){
    evt.preventDefault();
    let specificQuestion = store.questions[store.currentQuestion];
    let answer = $('input[name=answer]:checked').val();
    if(answer === specificQuestion.correctAnswer){
      if(store.currentQuestion + 1 === store.questions.length){
        renderEndPage();
      }
      else{
        store.currentQuestion ++;
        store.score++;
        store.currentOpenPage=true;
        renderCorrectPage();}
    } else {
      if(store.currentQuestion + 1 === store.questions.length){
        renderEndPage();
      }
      else {
        store.currentOpenPage=false;
        store.currentQuestion ++;
        renderIncorrectPage();}
    }
  });
}
function handleNextButton(){
  $('main').on('click', '#nextQ', function(){
    store.quizStarted = true;
    render();
  });
}
function handleRetakeButton(){
  $('main').on('click', '#endQuiz', function(){
  store.currentQuestion = 0;
  store.score = 0;
  store.quizStarted = true;
  render();
  });
}
function renderCorrectPage(){
  let page ='';
  page += generateCorrectPage();
  $('main').html(page);
}
function renderIncorrectPage(){
  let page ='';
  page += generateIncorrectPage();
  $('main').html(page);
}
function renderEndPage(){
  let page = '';
  page += generateEndPage();
  $('main').html(page);
}
function render(){
  let page = '';
  if(store.quizStarted === false){
    page += generateHomePage();
  }
  if(store.quizStarted === true) {
    page += generateQuestions();
  }
  $('main').html(page);
}
function main(){
  render();
  handleNextButton();
  handleStartButton();
  handleRetakeButton();
  handleSubmitButton();
  
}
$(main);
/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING :point_down:
 *
 */
/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates
/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store
/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)







