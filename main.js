class quiz{
    constructor(username, number){
        this.username = username;
        this. numberOfQuestions = number;
        this.correctAnswers = 0;
    }
}

class question {
    constructor(category, question, answers = [], correct){
        this.questionCategory = category;
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }
}

let index = 0;
let question1 = new question("random", "random question 1", ["Answer1", "answer2","answer3"], 2);
let question2 = new question("random", "random question 2", ["Answer1", "answer2","answer3"], 2);
let question3 = new question("random", "random question 3", ["Answer1", "answer2","answer3"], 2);
let question4 = new question("random", "random question 4", ["Answer1", "answer2","answer3"], 2);
let question5 = new question("random", "random question 5", ["Answer1", "answer2","answer3"], 2);

let questions = new Array();
questions.push(question1);
questions.push(question2);
questions.push(question3);
questions.push(question4);
questions.push(question5);

const btnNext = document.querySelector(".next");
const btnBack = document.querySelector(".back");
const questionContainer=document.querySelector(".question-text");
const answerList = document.querySelector(".answers-list");
const totalQuestions = questions.length;
const totalScore = 50;
let score = 0;

intro();
function intro(){
    questionContainer.innerHTML="Welcome to the best quiz ever, let's start with your name: ";
    let div = document.querySelector(".answers");
    let input = document.createElement('input');
    input.type = "text";
    input.value = "Type your name here";
    input.setAttribute("class", "input-name");
    div.appendChild(input);
    input.addEventListener("click", function(){
        input.value="";
    })
    let submit = document.createElement("input");
    submit.type="submit";
    submit.value ="Submit";
    submit.setAttribute("class", "submit name");
    div.appendChild(submit);
    submit.addEventListener("click",function(){
        quiz.username = input.value;
        ready();
    })
}

function ready(){
    questionContainer.innerHTML ="Hi " + quiz.username + " ! <br> Are you ready to start the quiz ?"
    document.querySelector(".input-name").style.display ="none";
    document.querySelector(".name").style.display="none";
    let ready = document.createElement("input");
    ready.type= "submit";
    ready.value= " Yes ! ";
    ready.setAttribute("class", "submit");
    let div = document.querySelector(".answers");
    div.appendChild(ready);
    ready.addEventListener("click", function(){
        ready.style.display ="none";
        
        showQuestion(index);

    })
}


function infoText(){
    const questionInfo = document.querySelector(".question-info");
    const scoreInfo = document.querySelector(".score-info");
    questionInfo.innerHTML = "Question : " + (index+1) + " of " + totalQuestions; 
    scoreInfo.innerHTML = "Score : " + score + " of " + totalScore;
}



btnNext.addEventListener("click", nextQuestion);
btnBack.addEventListener("click", previousQuestion);

function nextQuestion(){
    index++;
    if(questions[index] != null){
        console.log(questions[index]);
        clearContainer();
        showQuestion(index);
    }
}

function previousQuestion(){
    index--;
    if(questions[index] =! null){
        clearContainer();
        showQuestion(index);
    }
}

function clearContainer(){
    questionContainer.innerHTML = "";
    answerList.innerHTML = "";
}

function showQuestion(index){
    infoText();
    let q = questions[index];
   questionContainer.innerHTML = q.question;
    for(i = 0; i < q.answers.length; i++){
        let answer = document.createElement("li");
        let text = document.createTextNode(q.answers[i]);
        answer.classList.add("answers-list__item");
        answer.appendChild(text);
        answer.addEventListener("click", checkAnswer);
        answerList.appendChild(answer);
    }
}
function checkAnswer(){
    console.log("you'll always be wrong matey");
    nextQuestion(index);
}
