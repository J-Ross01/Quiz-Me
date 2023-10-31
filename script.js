var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var timerEl = document.getElementById('countdown');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timeLeft = 50; 
let timePenalty = 10; 

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    NextQuestion();
});

function startGame() {
    console.log('Started');
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    NextQuestion();
    startCountdown();
}

function NextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    var selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    if (!correct) {
        timeLeft -= timePenalty; 
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (correct) {
        score += 10;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        endQuiz();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}


var questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: [
            { text: 'alerts', correct: true },
            { text: 'strings', correct: false },
            { text: 'booleans', correct: false },
            { text: 'numbers', correct: false },
        ]
    }, 
    {
        question: 'The condition in an if / else statement is enclosed with _____.',
        answers: [
            {text: 'quotes', correct: false },
            {text: 'curly brackets', correct: false },
            {text: 'parenthesis', correct: true },
            {text: 'square brackets', correct: false },
    
        ]
    },  
    {
        question: 'Arrays in JavaScript can be used to store _____.',
        answers: [
            {text: 'numbers and strings', correct: false },
            {text: 'other arrays', correct: false },
            {text: 'booleans', correct: false },
            {text: 'all of the above', correct: true },
    
        ]
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            {text: 'numbers and strings', correct: false },
            {text: 'other arraays', correct: false },
            {text: 'booleans', correct: false },
            {text: 'all of the above', correct: true },
    
        ]
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
                answers: [
                    { text: 'console.log', correct: true },
                    { text: 'terminal/bash', correct: false },
                    { text: 'for loops', correct: false },
                    { text: 'JavaScript', correct: false },
                ]
    },
];

function startCountdown() {
    let timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            timerEl.textContent = timeLeft + " seconds";
            timeLeft--;
        } else {
            timerEl.textContent = 'Time\'s up!';
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
}

function resetGame() {
    timeLeft = 50; 
    score = 0;
    startButton.classList.remove('hide');
    questionContainerElement.classList.add('hide');
}

function endQuiz() {
    let initials = prompt('Quiz Over! Enter your initials:'); 
    let highScores = JSON.parse(localStorage.getItem('highScores') || '[]'); 
    highScores.push({ initials: initials, score: score }); 
    localStorage.setItem('highScores', JSON.stringify(highScores)); 
    alert('Your score: ' + score);
    resetGame();
}