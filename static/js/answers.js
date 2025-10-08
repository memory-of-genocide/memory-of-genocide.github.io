const correctAnswers = [3, 2, 1, 2, 0];
let userAnswers = new Array(5).fill(null);

let checkButton, resetButton, warningElement, resultElement;

function init() {
    checkButton = document.getElementById('checkButton');
    resetButton = document.getElementById('resetButton');
    warningElement = document.getElementById('warning');
    resultElement = document.getElementById('result');
    checkAllAnswers();
}

function selectOption(element, questionIndex) {
    const options = element.parentElement.children;
    
    for (let option of options) {
        option.classList.remove('selected');
    }
    
    element.classList.add('selected');
    
    const selectedIndex = Array.from(options).indexOf(element);
    userAnswers[questionIndex] = selectedIndex;
    
    checkAllAnswers();
}

function checkAllAnswers() {
    const allAnswered = userAnswers.every(answer => answer !== null);
    
    if (checkButton) {
        if (allAnswered) {
            checkButton.disabled = false;
            if (warningElement) warningElement.style.display = 'none';
        } else {
            checkButton.disabled = true;
        }
    }
}

// in dev
function resetQuiz() {
    const quiz = quizzes[currentQuiz];
    userAnswers = new Array(quiz.questions.length).fill(null);
    
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    if (resultElement) resultElement.style.display = 'none';
    if (checkButton) checkButton.disabled = true;
    if (warningElement) warningElement.style.display = 'none';
    
    const header = document.querySelector('.header');
    if (header) header.scrollIntoView({ behavior: 'smooth' });
}

function checkAnswers() {
    let score = 0;
    
    for (let i = 0; i < correctAnswers.length; i++) {
        if (userAnswers[i] === correctAnswers[i]) {
            score++;
        }
    }
    
    const questions = document.querySelectorAll('.question');
    for (let i = 0; i < questions.length; i++) {
        const options = questions[i].querySelectorAll('.option');
        
        if (options.length > 0 && correctAnswers[i] < options.length) {
            for (let option of options) {
                option.classList.remove('correct', 'incorrect');
            }
            
            options[correctAnswers[i]].classList.add('correct');
            
            if (userAnswers[i] !== null && userAnswers[i] !== correctAnswers[i] && userAnswers[i] < options.length) {
                options[userAnswers[i]].classList.add('incorrect');
            }
        }
    }
    
    const scoreElement = document.getElementById('score');
    const messageElement = document.getElementById('message');
    
    if (scoreElement) scoreElement.textContent = `${score}/5`;
    
    if (messageElement) {
        if (score === 5) {
            messageElement.textContent = "Потрясающе! Вы ответили правильно на все вопросы!";
        } else if (score >= 3) {
            messageElement.textContent = "Хороший результат! Есть куда стремиться.";
        } else {
            messageElement.textContent = "Попробуйте еще раз. Уверен, в следующий раз получится лучше!";
        }
    }
    
    if (resultElement) {
        resultElement.style.display = 'block';
        resultElement.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', init);
