document.addEventListener("DOMContentLoaded", function() {
    const questionsContainer = document.getElementById("questions-container");
    const form = document.getElementById("quiz-form");
    const result = document.getElementById("result");
    const courseTitle = document.getElementById("course-title");
    
    // Вопросы для разных курсов
    const tests = {
        "1": {
            title: "Тест: Основы кибербезопасности",
            questions: [
                { question: "Что такое цифровая безопасность?", options: ["Безопасность данных в сети", "Защита от математики", "Веселье в соцсетях"], correct: 0 },
                { question: "Зачем используются антивирусы?", options: ["Чтобы защитить ваши данные", "Чтобы украсть ваши данные", "Чтобы обеспечить вам приватность"], correct: 0 },
                { question: "Что такое VPN?", options: ["Обеспечение себя антивирусом", "Попадаться на фишинг", "Получение приватности при использовании интернета"], correct: 2 }
            ]
        },
        "2": {
            title: "Тест: Как отличить фишинговые ссылки",
            questions: [
                { question: "Какой URL безопаснее?", options: ["bank.com", "bank.secure-login.com", "bank.com.secure"], correct: 0 },
                { question: "Что делать, если пришло странное письмо с просьбой ввести пароль?", options: ["Игнорировать", "Перейти по ссылке", "Ответить отправителю"], correct: 0 },
                { question: "Что такое фишинг?", options: ["Вирус", "Антивирус", "Мошенничество"], correct: 2 },
                { question: "Зачем используют фишинг?", options: ["Чтобы защитить ваши данные", "Чтобы украсть ваши данные", "Чтобы обеспечить вам приватность"], correct: 1 },
                { question: "Как защититься от фишинга?", options: ["Вводить свои данные в незнакомые сайты", "Не нажимать на различные подозрительные ссылки", "Получать и открывать подозрительные сообщения в почте"], correct: 1 }
            ]
        },
        "3": {
            title: "Тест: Лучшие антивирусы 2025",
            questions: [
                { question: "Что лучше: платный или бесплатный антивирус?", options: ["Платный", "Бесплатный", "Без разницы"], correct: 0 },
                { question: "Что важно в антивирусе?", options: ["Обновления", "Цена", "Красивый интерфейс"], correct: 0 }
            ]
        }
    };
    
    // Получаем номер курса из URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get("course") || "1";
    
    if (tests[courseId]) {
        courseTitle.innerText = tests[courseId].title;
        tests[courseId].questions.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question");
            
            const questionText = document.createElement("p");
            questionText.innerText = `${index + 1}. ${q.question}`;
            questionDiv.appendChild(questionText);
            
            q.options.forEach((option, i) => {
                const label = document.createElement("label");
                label.innerHTML = `<input type="radio" name="q${index}" value="${i}"> ${option}`;
                questionDiv.appendChild(label);
            });
            
            questionsContainer.appendChild(questionDiv);
        });
    }
    
    // Проверка теста
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let score = 0;
        
        tests[courseId].questions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            if (selected) {
                const labels = document.querySelectorAll(`input[name="q${index}"]`);
                labels.forEach(label => label.parentElement.style.color = "white"); // Сброс цвета
                
                if (parseInt(selected.value) === q.correct) {
                    score++;
                    selected.parentElement.style.color = "#00ff00"; // Зелёный (правильный)
                } else {
                    selected.parentElement.style.color = "#ff0000"; // Красный (неправильный)
                }
            }
        });
        
        result.innerText = `Вы набрали ${score} из ${tests[courseId].questions.length}`;
    });
});
