class quiz{
    constructor(username, questions = [], correct,incorrect){
        this.username = username;
        this.questions = questions;
        this.correct = correct;
        this.incorrect = incorrect;
        this.totalQuestions = function(){return this.questions.length;};
        this.totalScore = function(){return (this.questions.length)*10;};
        this.returnElement = function(index){return (this.questions[index].elements);};
        //this.score = 0;
    }
}

class question {
    constructor(category, question, answers = [], correct = [], elements = []){
        this.questionCategory = category;
        this.question = question;
        this.answers = answers;
        this.correct = correct;
        this.elements = elements;
    }
}

const question1 = new question("random", "random question 1", ["Answer1", "answer2","answer3"], 2);
const question2 = new question("random", "random question 2", ["Answer1", "answer2","answer3","answer4"], [1, 4]);
const question3 = new question("random", "random question 3", ["Answer1", "answer2","answer3"], 3);
const question4 = new question("random", "random question 4", ["Answer1", "answer2","answer3", "answer4"], 2);
const question5 = new question("random", "random question 5", ["Answer1", "answer2","answer3"], 1);

let thisQuiz = new quiz("",[question1, question2, question3, question4, question5], 0,0);

const btnNext = document.querySelector(".next");
const btnBack = document.querySelector(".back");
btnNext.addEventListener("click", nextQuestion);
btnBack.addEventListener("click", previousQuestion);

//move to quiz class
let index = 0;

intro();


function intro(){
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
    let elements = [];
    for(j = 0; j < thisQuiz.questions.length; j++){
        let q = thisQuiz.questions[j];
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
        q.elements = elements[j];
    }
    showQuestion(index);
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
        btnNext.style.display = "initial";
        btnBack.style.display = "initial";
        clearContainer();
        makeQuestion();
    });
}
function clearContainer(){
    document.querySelector(".question").innerHTML = "";
    document.querySelector(".answers-list").innerHTML = "";
}

function showQuestion(index){
    let clicked = [];
    infoText();
    let btnSubmit = document.getElementById("submit-answer");
    btnSubmit.value =" submit ";
    btnSubmit.style.display = "block";
    let disable = false;

    let q = thisQuiz.returnElement(index);
    document.querySelector(".question").appendChild(q[0]);

    for(j = 1; j < q.length; j++){
        document.querySelector(".answers-list").appendChild(q[j]);
        let i = j;
        /*if(q[i].classList.contains("incorrect")|| q[i].id == "correct"){
            btnSubmit.onclick = null;
            disable = true;
        }*/
        if(!disable){
            q[j].addEventListener("click", function listener(){
            q[i].classList.add("answers-list__item-clicked");
            clicked.push(i);
            //q[i].removeEventListener("click", listener);
            });
        } 
    } 

    /*if(!disable){
        btnSubmit.onclick = function(){
            console.log("clicked button");
            checkAnswer(clicked);
            infoText();
            }; 
    }*/
}

function infoText(){
    document.querySelector(".question-info").innerHTML = "Question : " + (index+1) + " of " + thisQuiz.totalQuestions();
    document.querySelector(".score-info").innerHTML = "Score : " + (thisQuiz.correct)*10 + " of " + thisQuiz.totalScore();
    document.querySelector(".answered").innerHTML = "Answered : " + (thisQuiz.correct + thisQuiz.incorrect) + " of " + thisQuiz.totalQuestions();
}

function checkAnswer(clicked){
    let q = thisQuiz.returnElement(index);
    let correctAnswers = thisQuiz.questions[index].correct;
    if(Array.isArray(correctAnswers)){
        let logged;
        for(let correct of correctAnswers){
            for(let click of clicked){
                if(correct == click){
                    q[click].setAttribute("id","correct");
                    logged++; 
                }
                else if(correct != click){
                    q[click].classList.add("incorrect");
                }
            } 
        }
        if(logged == clicked.length){
            console.log("Arrcorrect");
            thisQuiz.correct++;
        }
        else{
            console.log("Arrincorrect");
            thisQuiz.incorrect++;
        }
    }
    //if correctanswers isn't an array
    else{
        if(correctAnswers == clicked){ 
            console.log("correct");
            q[clicked].setAttribute("id","correct"); 
            thisQuiz.correct++;
        }
        else{
            console.log("correct");
            q[clicked].classList.add("incorrect");
            thisQuiz.incorrect++;
        }
    }

    /*setTimeout(function()
    {nextQuestion(index)}, 1500);*/
}

function nextQuestion(){
    index++;
    if(thisQuiz.questions[index] != null){
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







