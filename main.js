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
let question2 = new question("random", "random question 2", ["Answer1", "answer2","answer3"], 2);
console.log(question1);
function showQuestion(index){
    let questionContainer = document.querySelector(".question-text");
    let question = document.createTextNode(question1.question);
    questionContainer.appendChild(question);
    for(i = 0; i < question1.answers.length; i++){
        let answerList = document.querySelector(".answers-list")
        let answer = document.createElement("li");
        let text = document.createTextNode(question1.answers[i]);
        answer.classList.add("answers-list__item");
        answer.appendChild(text);
        answerList.appendChild(answer);
    }
}

showQuestion(1);