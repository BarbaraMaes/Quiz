class quiz{
    constructor(username, questions = [], correct,incorrect,index){
        this.username = username;
        this.questions = questions;
        this.correct = correct;
        this.incorrect = incorrect;
        this.totalQuestions = function(){return this.questions.length;};
        this.totalScore = function(){return (this.questions.length)*10;};
        this.returnElement = function(index){return (this.questions[index].elements);};
        
        this.index = index;

    }
    returnAnswered(){
        let counter = 0;
        for(question of this.questions){
            if(question.answered == true){
                counter++;
            }
        }
        return counter;
    }

    checkAnswer(clicked){
        
        let q = thisQuiz.returnElement(thisQuiz.index);
        console.log("q" + q);
        let correctAnswers = thisQuiz.questions[thisQuiz.index].correct;
        console.log("correct answers" + correctAnswers);
        if(Array.isArray(correctAnswers)){
            let logged;
            for(let correct of correctAnswers){
                for(let click of clicked){
                    if(correct == click){
                        q[click].setAttribute("id","correct");
                        logged++; 
                    }
                    else if(correct != click){q[click].classList.add("incorrect");}
                } 
            }
            if(logged == clicked.length){thisQuiz.correct++;}
            else{thisQuiz.incorrect++;}
        }
        //if correctanswers isn't an array
        else{
            if(Array.isArray(clicked)){
                let counter = 0;
                for(let click of clicked){
                    counter++;
                    if(correctAnswers == click) {q[click].setAttribute("id","correct");}
                    else{q[click].classList.add("incorrect");}
                }
                if(counter <= 1){thisQuiz.correct++;} 
                else if(counter > 1){thisQuiz.incorrect++;}
            }
            else{
                if(correctAnswers == clicked){q[click].setAttribute("id","correct"); thisQuiz.correct++;}
                else{q[click].classList.add("incorrect"); thisQuiz.incorrect++;}
            }
        }
    }
}

class question {
    constructor(category, question, answers = [], correct = [], elements = [], answered){
        this.questionCategory = category;
        this.question = question;
        this.answers = answers;
        this.correct = correct;
        this.elements = elements;
        this.answered = answered;
    }
}

const question1 = new question("random", "random question 1", ["Answer1", "answer2","answer3"], 2);
const question2 = new question("random", "random question 2", ["Answer1", "answer2","answer3","answer4"], [1, 4]);
const question3 = new question("random", "random question 3", ["Answer1", "answer2","answer3"], 3);
const question4 = new question("random", "random question 4", ["Answer1", "answer2","answer3", "answer4"], 2);
const question5 = new question("random", "random question 5", ["Answer1", "answer2","answer3"], 1);

let thisQuiz = new quiz("",[question1, question2, question3, question4, question5], 0,0,0);

const btnNext = document.querySelector(".next");
const btnBack = document.querySelector(".back");
const icon = document.querySelector(".icon-container");

btnNext.addEventListener("click", nextQuestion);
btnBack.addEventListener("click", previousQuestion);

intro();

function intro(){
    let container = document.createElement("p"); 
    container.classList.add("question-text");
    let text = document.createTextNode("Welcome to the best quiz ever! let's start with your name: ");
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
        //if no name was given we need a default username of USER
        
        if(input.value == undefined || input.value == "Type your name here"){
            thisQuiz.username = "Quizer";}
        else{
            thisQuiz.username = input.value;
        }
        ready();
    });
}
function makeQuestion(){
    let elements = [];
    for(j = 0; j < thisQuiz.questions.length; j++){
        let q = thisQuiz.questions[j];
        let question = document.createTextNode((j +1) + ". " + q.question);
        let container = document.createElement("p");
        
        let submitAnswer = document.createElement("input");

        submitAnswer.setAttribute("type","button");
        submitAnswer.id = "submit-answer";
        submitAnswer.classList.add("submit");
        submitAnswer.value ="Submit";

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
        elements[j].push(submitAnswer);
        q.elements = elements[j];
        console.log(elements[j]);
    }
    icon.addEventListener("click", toggleQuestionList);
    showQuestion();
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
        fillQuestionList();
        makeQuestion();
    });
}
function clearContainer(){
    document.querySelector(".question").innerHTML = "";
    document.querySelector(".answers-list").innerHTML = "";
    document.querySelector(".submit-answer").innerHTML ="";
}

function showQuestion(){
    let clicked = [];
    infoText();

    let q = thisQuiz.returnElement(thisQuiz.index);
    document.querySelector(".question").appendChild(q[0]);

    q[q.length-1].style.display ="block";
    document.querySelector(".submit-answer").appendChild(q[q.length -1]);
   
    for(j = 0; j < q.length -2; j++){
        document.querySelector(".answers-list").appendChild(q[j+1]);
        let i = j+1;
        let timesClicked = 0;
        q[i].onclick = function(){
        if(timesClicked % 2 == 0){
            q[i].classList.add("answers-list__item-clicked");
            clicked.push(i);
            }
        else if(
            timesClicked % 2 != 0){q[i].classList.remove("answers-list__item-clicked");
            let place = clicked.indexOf(i);
            clicked.splice(place, 1);
            }
        timesClicked++;
        }

        if(q[q.length-1].classList.contains("clicked")){q[i].onclick = null;}
    }     
    
    if(q[q.length-1].classList.contains("clicked") !=true){
        let btn = q[q.length-1];
        btn.onclick = function(){
        thisQuiz.checkAnswer(clicked);
        thisQuiz.questions[thisQuiz.index].answered = true;
        infoText();
        btn.onclick = null;
        btn.classList.add("clicked");
        }
    }
}

function infoText(){
    document.querySelector(".question-info").innerHTML = "Question : <br\>" + (thisQuiz.index+1) + " of " + thisQuiz.totalQuestions();
    document.querySelector(".score-info").innerHTML = "Score : <br\>" + (thisQuiz.correct)*10 + " of " + thisQuiz.totalScore();
    document.querySelector(".answered").innerHTML = "Answered : <br\>" + (thisQuiz.returnAnswered()) + " of " + thisQuiz.totalQuestions();
}

function nextQuestion(){
    thisQuiz.index++;
    if(thisQuiz.questions[thisQuiz.index] != null){
        clearContainer();
        showQuestion();
    }
}

function previousQuestion(){
    thisQuiz.index--;
    if(thisQuiz.questions[thisQuiz.index] != null){
        clearContainer();
        showQuestion();
    }
}

function fillQuestionList(){
    let container = document.querySelector(".question-list");
    for(j = 0; j < thisQuiz.questions.length; j++){
        let q = thisQuiz.questions[j];
        let question = document.createTextNode((j+1) + ". " + q.question);
        let listItem = document.createElement("li");
        call = j +1;
        listItem.addEventListener("click", function(){
            console.log("showing question :" + call);
            //thisQuiz.index = call -1;
            //nextQuestion();
        });
        console.log(listItem);
        listItem.appendChild(question);
        container.appendChild(listItem);
    }
}

function toggleQuestionList(){
    let container = document.querySelector(".question-list__container");
    console.log(container);
    let display = window.getComputedStyle(container).getPropertyValue("display");
    console.log(display);

    if(display === "none"){
        console.log("showing");
        container.style.display="block";
    }
    else if(display === "block"){
        console.log("hiding");
        container.style.display ="none";
    }
}






