function loadJSON(file, callback) {

    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', "questions.json", false);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {

            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);

        }
    }
    xobj.send(null);
}

function getJSON (file) {
    let result = null;
    // Call to function with anonymous callback
    loadJSON(file, function(response) {
        result = JSON.parse(response);
    });
    return result;
}

class quiz{
    constructor(username = "Quizer", questions = [], correct = "0",index = "0"){
        this.username = username;
        this.questions = questions;
        this.correct = correct;
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
        let correctAnswers = thisQuiz.questions[thisQuiz.index].correct;
        let check = 0;
        if(Array.isArray(correctAnswers)){
            for(let correct of correctAnswers){
                for(let click of clicked){
                    if(correct == click){
                        q[click].setAttribute("id","correct");
                        check++;
                    }
                    else if(correct != click){q[click].classList.add("incorrect");}
                } 
            }
            if(check == clicked.length){thisQuiz.correct++;}
        }
        //if correctanswers isn't an array
        else{
            for(let click of clicked){
                if(correctAnswers == click) {q[click].setAttribute("id","correct"); check++;}
                else{q[click].classList.add("incorrect"); check--;}
            }
            if(check == 1){thisQuiz.correct++;} 
        }
    }
}

class question {
    constructor(category, question, answers = [], correct = [], elements = [], answered ="false"){
        this.category = category;
        this.question = question;
        this.answers = answers;
        this.correct = correct;
        this.elements = elements;
        this.answered = answered;
    }
}

const json = getJSON("questions.json");
let thisQuiz = new quiz;

for(let item of json){
    let x = new question(item.category, item.question, item.answers, item.correct);
    thisQuiz.questions.push(x);
}

const btnNext = document.querySelector(".next");
const btnBack = document.querySelector(".back");
const icon = document.querySelector(".icon-container");
const backdrop = document.querySelector(".backdrop");

btnNext.addEventListener("click", nextQuestion);
btnBack.addEventListener("click", previousQuestion);
backdrop.addEventListener("click", toggleQuestionList);

intro();

function intro(){
    let container = document.createElement("p"); 
    container.classList.add("question-text");
    container.appendChild(document.createTextNode("Welcome to the best quiz ever! let's start with your name: "));
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
        thisQuiz.username = "Quizer";
        ready();
    });
}

function ready(){
    clearContainer();
    let container = document.createElement("p"); 
    container.classList.add("question-text");

    container.appendChild(document.createTextNode("Hi "  + thisQuiz.username + " ! "));
    container.appendChild(document.createElement("br"));
    container.appendChild(document.createTextNode("Are you ready to start the quiz ?"));
    
   
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

function makeQuestion(){
    let elements = [];
    for(j = 0; j < thisQuiz.questions.length; j++){
        let q = thisQuiz.questions[j];
        let question = document.createTextNode((j +1) + ". " + q.question);
        let container = document.createElement("p");
        container.classList.add("question-text");
        container.appendChild(question);

        let submitAnswer = document.createElement("input");

        submitAnswer.setAttribute("type","button");
        submitAnswer.id = "submit-answer";
        submitAnswer.classList.add("submit");
        submitAnswer.value ="Submit";

        
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
    }
    icon.addEventListener("click", toggleQuestionList);
    showQuestion();
}

function clearContainer(){
    document.querySelector(".question").innerHTML = "";
    document.querySelector(".answers-list").innerHTML = "";
    document.querySelector(".submit-answer").innerHTML ="";
    document.querySelector(".results").style.display = "none";
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

        if(thisQuiz.returnAnswered() == thisQuiz.totalQuestions()){
            setTimeout(results, 2000);
            }
        }
    }
}

function infoText(){
    document.querySelector(".question-info").innerHTML = "Question : <br\>" + parseInt(thisQuiz.index +1) + " of " + thisQuiz.totalQuestions();
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
    document.querySelector(".icon-text").style.color ="black";
    let bars = document.querySelectorAll(".bar");
    for(bar of bars){
        bar.style.backgroundColor="black";
    }
    

    let container = document.querySelector(".question-list");
    for(j = 0; j < thisQuiz.questions.length; j++){
        let q = thisQuiz.questions[j];
        let question = document.createTextNode((j+1) + ". " + q.question);
        let listItem = document.createElement("li");
        listItem.addEventListener("click", function(){
            thisQuiz.index = this.innerHTML[0] -1;
            toggleQuestionList();
            clearContainer();
            showQuestion();
        });
        listItem.appendChild(question);
        container.appendChild(listItem);
    }
}

function toggleQuestionList(){
    let container = document.querySelector(".question-list__container");
    let display = window.getComputedStyle(container).getPropertyValue("display");
    let backdrop = document.querySelector(".backdrop");
    if(display === "none"){
        container.style.display="block";
        backdrop.style.display="block";
    }
    else if(display === "block"){
        container.style.display ="none";
        backdrop.style.display="none";
    }
}

function results(){
    clearContainer();

    let text = document.createTextNode("Results");
    let element = document.createElement("p");
    element.classList.add("question-text");
    element.appendChild(text);
    document.querySelector(".question").appendChild(element);
    let results = document.querySelector(".results");
    results.style.display = "block";
    document.querySelector(".total_questions").appendChild(document.createTextNode(" " + thisQuiz.totalQuestions()));
    document.querySelector(".result_corr").appendChild(document.createTextNode(" " + thisQuiz.correct));
    document.querySelector(".result_incorr").appendChild(document.createTextNode(" " + thisQuiz.totalQuestions() - thisQuiz.correct));
    document.querySelector(".percentage").appendChild(document.createTextNode(" " + (thisQuiz.correct/thisQuiz.totalQuestions())*100 + " %"));

}






