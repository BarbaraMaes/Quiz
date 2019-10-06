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
    constructor(username = "Spelare", questions = [], correct = "0",index = "0"){
        this.username = username;
        this.questions = questions;
        this.correct = correct;
        this.totalQuestions = function(){return this.questions.length;};
        this.totalScore = function(){return (this.questions.length);};
        this.returnElement = function(index){return (this.questions[index].elements);};
        this.index = index;

    }
    //returns the amount of questions answered
    returnAnswered(){
        let counter = 0;
        for(question of this.questions){
            if(question.answered == true){
                counter++;
            }
        }
        return counter;
    }
    //checks chosen answer against right answer
    checkAnswer(clicked){
        let q = thisQuiz.returnElement(thisQuiz.index);
        let correctAnswers = thisQuiz.questions[thisQuiz.index].correct;
        let check = 0;
        //if multiple answers
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
            if(correctAnswers == clicked) {q[clicked].setAttribute("id","correct"); thisQuiz.correct++;}
            else{q[clicked].classList.add("incorrect");}
        }
    }
}
//questions read from JSON file, elements added dynamically in makeQuestion
class question {
    constructor(category, question, answers = [], correct = [], elements = [], answered = false){
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

//next, back button and question list eventlisteners
const btnNext = document.querySelector(".next");
const btnBack = document.querySelector(".back");
const icon = document.querySelector(".icon-container");
const backdrop = document.querySelector(".backdrop");

btnNext.addEventListener("click", nextQuestion);
btnBack.addEventListener("click", previousQuestion);
backdrop.addEventListener("click", toggleQuestionList);

intro();

//welcomes and asks for name.
function intro(){
    //welcome text
    let container = document.createElement("p"); 
    container.classList.add("question-text");
    container.appendChild(document.createTextNode("Välkommen till det årliga geek-quizet 2019"));
    container.appendChild(document.createElement("br"));
    container.appendChild(document.createTextNode("Fyll i ditt namn."));
    document.querySelector(".question").appendChild(container);

    //textbox for name input
    let input = document.createElement('input');
    input.type = "text";
    input.value = "Skriv ditt namn här";
    input.setAttribute("class", "input-name");
    document.querySelector(".answers").appendChild(input);
    input.addEventListener("click", function(){
        input.value="";
    })

    //submit name button
    let submit = document.createElement("input");
    submit.type="submit";
    submit.value ="Nästa";
    submit.setAttribute("class", "submit name");
    document.querySelector(".answers").appendChild(submit);
    submit.addEventListener("click",function(){
        if(input.value != "Skriv ditt namn här"){
            thisQuiz.username = input.value;
        }
        ready();
    });
}

//Welcomes the user by name, ready start the quiz.
function ready(){
    clearContainer();
    let container = document.createElement("p"); 
    container.classList.add("question-text");

    container.appendChild(document.createTextNode("Hej "  + thisQuiz.username + " ! "));
    container.appendChild(document.createElement("br"));
    container.appendChild(document.createTextNode("Är du redo att testa dina Geek-kunskaper?"));
    
   
    document.querySelector(".question").appendChild(container);
    
    //hides intro elements
    document.querySelector(".input-name").style.display ="none";
    document.querySelector(".name").style.display="none";

    //submit button
    let ready = document.createElement("input");
    ready.type= "submit";
    ready.value= " Ja ! ";
    ready.setAttribute("class", "submit");
    document.querySelector(".answers").appendChild(ready);

    ready.onclick = function(){
        ready.style.display ="none";
        btnNext.style.display = "initial";
        btnBack.style.display = "initial";
        clearContainer();
        fillQuestionList();
        makeQuestion();
    }
}

//make HTML elements for the questions, store them in elements array. 
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
        submitAnswer.value ="Välj";

        
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

//clear the container so next question can be shown
function clearContainer(){
    document.querySelector(".question").innerHTML = "";
    document.querySelector(".answers-list").innerHTML = "";
    document.querySelector(".submit-answer").innerHTML ="";
    document.querySelector(".results").style.display = "none";
    btnNext.style.visibility ="visible";
    btnBack.style.visibility ="visible";
}

//removes clicked answers if they're not submitted (when scrolling through questions)
function clearClicked(){
    let q = thisQuiz.returnElement(thisQuiz.index);
    if(q[q.length-1].classList.contains("clicked") != true){
        for(j = 1; j < q.length -1; j++){
            q[j].classList.remove("answers-list__item-clicked");
        }
    }
}

//shows HTML elements for chosen question. 
function showQuestion(){
    clearClicked();

    //hide next and back button when on last or first question
    if(thisQuiz.index == 12){
        btnNext.style.visibility ="hidden";
    }
    else if(thisQuiz.index == 0){
        btnBack.style.visibility ="hidden";
    }


    let clicked = [];
    infoText();

    let q = thisQuiz.returnElement(thisQuiz.index);
    document.querySelector(".question").appendChild(q[0]);

    //disable button on show because ( nothing is clicked )
    q[q.length-1].style.display ="block";
    q[q.length-1].onclick = null;
    q[q.length-1].classList.add("clicked");
    document.querySelector(".submit-answer").appendChild(q[q.length -1]);

    //adds click event to list items (answers)
    for(j = 0; j < q.length -2; j++){
        document.querySelector(".answers-list").appendChild(q[j+1]);
        let i = j+1;
        let timesClicked = 0;
        q[i].onclick = function(){
            if(thisQuiz.questions[thisQuiz.index].answered == false){
                let btn = q[q.length-1];
                btn.classList.remove("clicked");
                btn.onclick = function(){
                submit(clicked);
            }

            //set item as clicked on first click, remove from clicked on second click
            if(timesClicked % 2 == 0){
                q[i].classList.add("answers-list__item-clicked");
                clicked.push(i);
            }
            else if(timesClicked % 2 != 0){
                q[i].classList.remove("answers-list__item-clicked");
                let place = clicked.indexOf(i);
                clicked.splice(place, 1);
            }
            timesClicked++;
        }
        //disable list item onclick if question has been answered
        if(thisQuiz.questions[thisQuiz.index].answered == true){q[i].onclick = null;}
    } 
    //enable submit button when right amount of answers are chosen
    document.querySelector(".answers-list").onclick = function(){toggleButton(clicked);}    
}

//enable submit button when right amount of answers are chosen
function toggleButton(clicked){
     //disable button if amount of correct answers does not equal amount of chosen answers
    let q = thisQuiz.returnElement(thisQuiz.index);
    if((Array.isArray(thisQuiz.questions[thisQuiz.index].correct) == false) && (clicked.length > 1)||(clicked.length == 0)){
        q[q.length-1].onclick = null;
        q[q.length-1].classList.add("clicked");
    }
    else if((thisQuiz.questions[thisQuiz.index].correct.length != undefined)){
        if((thisQuiz.questions[thisQuiz.index].correct.length != clicked.length)){
            q[q.length-1].onclick = null;
            q[q.length-1].classList.add("clicked");
        }
        else{
            q[q.length-1].onclick = function(){submit(clicked)};
            q[q.length-1].classList.remove("clicked");
        }
    }
    else{
        q[q.length-1].onclick = function(){submit(clicked)};
        q[q.length-1].classList.remove("clicked");
    }
}

//calls when answer is submitted, checks answers, disables button. 
function submit(clicked){
    thisQuiz.checkAnswer(clicked);
    thisQuiz.questions[thisQuiz.index].answered = true;
    infoText();
    thisQuiz.returnElement(thisQuiz.index)[q.length-1].onclick = null;
    thisQuiz.returnElement(thisQuiz.index)[q.length-1].classList.add("clicked");
    //shows results if all questions are answered
    if(thisQuiz.returnAnswered() == thisQuiz.totalQuestions()){
        setTimeout(results, 2000);
        }
    }
}

//shows questions, score and answered
function infoText(){
    document.querySelector(".question-info").innerHTML = "Fråga : <br\>" + parseInt(thisQuiz.index +1) + " av " + thisQuiz.totalQuestions();
    document.querySelector(".score-info").innerHTML = "Poäng : <br\>" + (thisQuiz.correct) + " av " + thisQuiz.totalScore();
    document.querySelector(".answered").innerHTML = "Besvarade : <br\>" + (thisQuiz.returnAnswered()) + " av " + thisQuiz.totalQuestions();
    let dash = document.querySelectorAll(".dash");
    for(item of dash){
        item.innerHTML = " | ";
    }
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

//toggles question list menu, fills question list with questions
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
        //shows chosen question on click
        listItem.addEventListener("click", function(){
            var pos = this.innerHTML.indexOf(".");
            thisQuiz.index = this.innerHTML.slice(0, pos) -1;
            toggleQuestionList();
            clearContainer();
            showQuestion();
        });
        listItem.appendChild(question);
        container.appendChild(listItem);
    }
}

//hides and shows question list and backdrop. 
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

//shows results when all questions are answered
function results(){
    clearContainer();
    document.querySelector(".buttons").style.display = "none";

    let text = document.createTextNode("Resultat");
    let element = document.createElement("p");
    element.classList.add("question-text");
    element.appendChild(text);
    document.querySelector(".question").appendChild(element);
    let results = document.querySelector(".results");
    results.style.display = "block";

    document.querySelector(".total_questions").appendChild(document.createTextNode(" " + thisQuiz.totalQuestions()));
    document.querySelector(".result_corr").appendChild(document.createTextNode(" " + thisQuiz.correct));
    document.querySelector(".result_incorr").appendChild(document.createTextNode(" " + thisQuiz.totalQuestions() - thisQuiz.correct));
    document.querySelector(".percentage").appendChild(document.createTextNode(" " + Math.round(((thisQuiz.correct/thisQuiz.totalQuestions())*100)) + " %"));

}






