class quiz{
    constructor(username, questions = [], correct,incorrect){
        this.username = username;
        this.questions = questions;
        this.correct = correct;
        this.incorrect = incorrect
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

const question1 = new question("random", "random question 1", ["Answer1", "answer2","answer3"], 2);
const question2 = new question("random", "random question 2", ["Answer1", "answer2","answer3","answer4"], 1);
const question3 = new question("random", "random question 3", ["Answer1", "answer2","answer3"], 3);
const question4 = new question("random", "random question 4", ["Answer1", "answer2","answer3", "answer4"], 2);
const question5 = new question("random", "random question 5", ["Answer1", "answer2","answer3"], 1);

let thisQuiz = new quiz("",[question1, question2, question3, question4, question5], 0);

let elements = [];
//let questions = [];
//questions.push(question1);
//questions.push(question2);
//questions.push(question3);
//questions.push(question4);
//questions.push(question5);

const btnNext = document.querySelector(".next");
const btnBack = document.querySelector(".back");
btnNext.addEventListener("click", nextQuestion);
btnBack.addEventListener("click", previousQuestion);
let index = 0;
const totalQuestions = thisQuiz.questions.length;
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
        thisQuiz.username = input.value;
        ready();
    });
}
function makeQuestion(){
    console.log(thisQuiz);
    for(j = 0; j < thisQuiz.questions.length; j++){
        let q = thisQuiz.questions[j];
        console.log(q);
        
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
            answer.appendChild(text);
            elements[j][i+1] = answer;
        }
    }
    console.log(elements);
}

function ready(){
    clearContainer();
    let container = document.createElement("p"); 
    container.classList.add("question-text");
    let text = document.createTextNode("Hi " + thisQuiz.username + " ! Are you ready to start the quiz ?");
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
function clearContainer(){
    document.querySelector(".question").innerHTML = "";
    document.querySelector(".answers-list").innerHTML = "";
}

function showQuestion(index){
    infoText();
    document.querySelector(".question").appendChild(elements[index][0]);
    for(j = 1; j < elements[index].length; j++){
        let ele = elements[index][j];
        let check = j;{
        document.querySelector(".answers-list").appendChild(elements[index][j]);
        /*for(checking of elements[index]){
            if((checking.classList.contains("correct")) || checking.classList.contains("incorrect")){

            }
        } */
        console.log(elements[index]);
        /*ele.addEventListener("click", function clicked(){
            console.log(elements[index]);
            ele.removeEventListener("click", clicked);
            checkAnswer(check,ele);
            });
        }*/
    }
}
}

function infoText(){
    document.querySelector(".question-info").innerHTML = "Question : " + (index+1) + " of " + totalQuestions;
    document.querySelector(".score-info").innerHTML = "Score : " + score + " of " + totalScore;
    document.querySelector(".answered").innerHTML = "Answered : " + (thisQuiz.correct + thisQuiz.incorrect) + " of " + totalQuestions;
}

function checkAnswer(check, ele){
    if(thisQuiz.questions[index].correct == check){
        ele.classList.add("correct");
        thisQuiz.correct++;
    }
    else{
        ele.classList.add("incorrect");
        thisQuiz.incorrect++;
    }
    score += 10;

    /*setTimeout(function()
    {nextQuestion(index)}, 1500);*/
}

function nextQuestion(){
    index++;
    if(thisQuiz.questions[index] != null){
        //console.log(questions[index]);
        clearContainer();
        showQuestion(index);
    }
}

function previousQuestion(){
    index--;
    if(thisQuiz.questions[index] != null){
        clearContainer();
        showQuestion(index);
    }
}







