const options = document.querySelector(".options").children;
const answeredQuestion = document.getElementById('answered');
const score = document.getElementById('score');
const correctScore = document.querySelector(".correctanswers");
const totalquestions = document.querySelector(".totalquestions");
const percentscore = document.querySelector(".percentagescore");
const quizOveer = document.querySelector(".quizover");
const quizQuestion = document.getElementById('question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const nextQuestion = document.getElementById('next-question')

let questionIndex;
let index = 0;
let questionNumber = [];
let questionDuplicate =[];
let finalScore = 0;

let quizQuestions = [
    {
        question: "Which of the following is not a HTML5 tag?" ,
        options: ["keygen" , "meter" ,  "output" , "legend"] ,
        correctAnswer: 3
    } ,

    {
        question: "Which of the following is not a CSS property?" ,
        options: ["font-stretch" , "text-size" , "font-variant" ,  "text-overflow" ] ,
        correctAnswer: 1
    } ,

    {
        question: "What is the full name of Xylux?" ,
        options: ["Seyi Ogunde" , "Baba Isale Awon Boys" ,  "Seyi Onifade" , "Seyi Xylux" ] ,
        correctAnswer: 2
    } ,

    {
        question: "What is the URL of HNG Internship?" ,
        options: [  "hng.tech" ,'hotels.ng' , "hng.com" ,  "hng.io" ] ,
        correctAnswer: 0
    } ,

    {
        question: "What is the URL of StartNG Internship?" ,
        options: ["startng.tech" , "startng.com" , "start.ng" ,  "startng.io" ] ,
        correctAnswer: 2
    }
]

function load() {
    quizQuestion.innerHTML = quizQuestions[questionIndex].question;
    option1.innerHTML = quizQuestions[questionIndex].options[0];
    option2.innerHTML = quizQuestions[questionIndex].options[1];
    option3.innerHTML = quizQuestions[questionIndex].options[2];
    option4.innerHTML = quizQuestions[questionIndex].options[3];
    answeredQuestion.innerHTML = "Question " + (index + 1) + " of " + quizQuestions.length;
    index++;
}

function shuffleQuestion() {
    let randomQuestion = Math.floor(Math.random()*quizQuestions.length);
    let hitDuplicate = 0; 
    if(index===quizQuestions.length) {
        quizOver();
        
    } else {
        if(questionNumber.length > 0) {
            for(let i =0; i<questionNumber.length; i++) {
                if(questionNumber[i]==randomQuestion) {
                    hitDuplicate = 1;
                    break;
                }
            } 
            if(hitDuplicate == 1) {
                shuffleQuestion();
            } else {
                questionIndex = randomQuestion;
                load();
                questionDuplicate.push(questionIndex);
            }
        }

        if(questionNumber.length == 0) {
            questionIndex = randomQuestion;
                load();
                questionDuplicate.push(questionIndex);
        }
        



    }
    
    questionNumber.push(questionIndex);   
}

function check(element) {
    // console.log(element)
    if(element.id == quizQuestions[questionIndex].correctAnswer) {
        // console.log('true');
        element.classList.add("correct");
        finalScore++;
        score.innerHTML = "You've answered " + (finalScore) + " questions correctly!";
        correctScore.innerHTML = finalScore;
        totalquestions.innerHTML = quizQuestions.length;
        percentscore.innerHTML = (finalScore*20) + "%";
        // console.log(finalScore);
    } else {
        // console.log('false');
        element.classList.add("wrong");

        
    }

    disableOptions();

}

function disableOptions() {
    for(let i=0; i<options.length; i++) {
        options[i].classList.add("disabled");

        if(options[i].id == quizQuestions[questionIndex].correctAnswer) {
            options[i].classList.add("correct");
        }
        // quizQuestions[questionIndex].correctAnswer.classList.add("correct");
    }
}

function enableOptions() {
    for(let i=0; i<options.length; i++)  {
        options[i].classList.remove("correct", "wrong", "disabled")
    }
}

function validate() {
    if(!options[0].classList.contains("disabled")){
        alert("Kindly select an option to proceed!");
    } else {
        shuffleQuestion();
    }
}

function next() {
    validate();
    enableOptions()
}




function quizOver() {
    quizOveer.classList.add("show");
}

function tryAgain() {
    // window.location.reload();
    window.history.back();
}


window.onload = function() {
    shuffleQuestion()
}