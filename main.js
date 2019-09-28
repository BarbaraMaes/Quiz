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

let question1 = new question("random", "random question 1", ["Answer1", "answer2","answer3"], 2);
let question2 = new question("random", "random question 2", ["Answer1", "answer2","answer3"], 1);
let question3 = new question("random", "random question 3", ["Answer1", "answer2","answer3"], 3);
let question4 = new question("random", "random question 4", ["Answer1", "answer2","answer3"], 2);
let question5 = new question("random", "random question 5", ["Answer1", "answer2","answer3"], 1);

let elements = [];
let questions = [];
questions.push(question1);
questions.push(question2);
questions.push(question3);
questions.push(question4);
questions.push(question5);

const btnNext = document.querySelector(".next");
const btnBack = document.querySelector(".back");
btnNext.addEventListener("click", nextQuestion);
btnBack.addEventListener("click", previousQuestion);
let index = 0;
const totalQuestions = questions.length;
const totalScore = 50;
let score = 0;
intro();


function intro(){
    makeQuestion();
    let container = document.createElement("p"); 
    container.classList.add("question-text");
    let text = document.createTextNode("Welcome to the best quiz ever, let's start with your name: ");
    container.appendChild(text);
    document.querySelector(".question").appendChild(container);

    let input = document.createElement('input');
    input.type = "text";
    input.value = "Type your name here";
    input.setAttribute("class", "input-name");
    document.querySelector(".answers").appendChild(input);
    input.addEventListener("click", function(){
        input.value="";
    })

    let submit = document.createElement("input");
    submit.type="submit";
    submit.value ="Submit";
    submit.setAttribute("class", "submit name");
    document.querySelector(".answers").appendChild(submit);
    submit.addEventListener("click",function(){
        quiz.username = input.value;
        quiz.numberOfQuestions = 5;
        ready();
    });
}

function ready(){
    clearContainer();
    let container = document.createElement("p"); 
    container.classList.add("question-text");
    let text = document.createTextNode("Hi " + quiz.username + " ! Are you ready to start the quiz ?");
    container.appendChild(text);
    document.querySelector(".question").appendChild(container);
    
    document.querySelector(".input-name").style.display ="none";
    document.querySelector(".name").style.display="none";
    let ready = document.createElement("input");
    ready.type= "submit";
    ready.value= " Yes ! ";
    ready.setAttribute("class", "submit");
    document.querySelector(".answers").appendChild(ready);
    ready.addEventListener("click", function(){
        ready.style.display ="none";
        clearContainer();
        showQuestion(index);
    });
}

function infoText(){
    document.querySelector(".question-info").innerHTML = "Question : " + (index+1) + " of " + totalQuestions;
    document.querySelector(".score-info").innerHTML = "Score : " + score + " of " + totalScore;
}

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
    if(questions[index] != null){
        clearContainer();
        showQuestion(index);
    }
}

function clearContainer(){
    document.querySelector(".question").innerHTML = "";
    document.querySelector(".answers-list").innerHTML = "";
}

function showQuestion(index){
    infoText();
    console.log(elements);
    document.querySelector(".question").appendChild(elements[index][0]);
    for(j = 1; j < elements[index].length; j++){
        console.log(elements[index][j]);
        document.querySelector(".answers-list").appendChild(elements[index][j]);
    }
}

function makeQuestion(){
    for(j = 0; j < questions.length; j++){
        let q = questions[j];
        let question = document.createTextNode((j +1) + ". " + q.question);
        let container = document.createElement("p");
        container.classList.add("question-text");
        container.appendChild(question);
        elements[j] = [];
        elements[j][0] = container;
        for(i = 0; i < q.answers.length; i++){
            let text = document.createTextNode((i+1) + ". " + q.answers[i]);
            let answer = document.createElement("li");
            answer.classList.add("answers-list__item");
            answer.setAttribute("id", "id" + i);
            answer.appendChild(text);
          //  answer.addEventListener("click", function(){checkAnswer(i)});
            elements[j][i+1] = answer;
        }
    }
    console.log(elements);
}

function checkAnswer(i){
    if((questions[index].correct)-1 == parseInt(i[i.length-1])){
        document.getElementById(i).classList.add("correct");
        score += 10;
        quiz.correctAnswers ++;
    }
    else{
        document.getElementById(i).classList.add("incorrect");
    }
    setTimeout(function()
    {nextQuestion(index)}, 1500);
}
