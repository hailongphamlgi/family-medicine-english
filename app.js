// =====================================================
// FAMILY MEDICINE ENGLISH
// Main Application
// =====================================================


// =====================================================
// STORAGE
// =====================================================

let rememberedWords =
    JSON.parse(
        localStorage.getItem("rememberedWords") || "[]"
    );

let bestQuizScore =
    Number(
        localStorage.getItem("bestQuizScore") || 0
    );


// =====================================================
// PAGE NAVIGATION
// =====================================================

const pages = {
    dashboard: document.getElementById("dashboardPage"),
    vocabulary: document.getElementById("vocabularyPage"),
    cases: document.getElementById("casesPage"),
    quiz: document.getElementById("quizPage"),
    progress: document.getElementById("progressPage")
};

const navItems =
    document.querySelectorAll(".nav-item");


function showPage(pageName) {

    Object.values(pages).forEach(function(page) {

        if (page) {
            page.classList.remove("active-page");
        }

    });


    if (pages[pageName]) {

        pages[pageName].classList.add("active-page");

    }


    navItems.forEach(function(item) {

        item.classList.remove("active");

        if (item.dataset.page === pageName) {

            item.classList.add("active");

        }

    });


    updateProgress();

}


// =====================================================
// NAVIGATION CLICK
// =====================================================

navItems.forEach(function(item) {

    item.addEventListener("click", function() {

        const pageName =
            item.dataset.page;

        showPage(pageName);

    });

});


document.querySelectorAll("[data-page]").forEach(function(button) {

    if (!button.classList.contains("nav-item")) {

        button.addEventListener("click", function() {

            showPage(button.dataset.page);

        });

    }

});


// =====================================================
// VOCABULARY
// =====================================================

let currentWord = 0;


const wordElement =
    document.getElementById("word");

const pronunciationElement =
    document.getElementById("pronunciation");

const meaningElement =
    document.getElementById("meaning");

const exampleElement =
    document.getElementById("example");

const wordCounter =
    document.getElementById("wordCounter");

const rememberStatus =
    document.getElementById("rememberStatus");


// =====================================================
// TEXT TO SPEECH
// =====================================================

function speakCurrentWord() {

    if (!wordElement) {
        return;
    }


    const text =
        wordElement.textContent.trim();


    if (!text) {
        return;
    }


    if (!("speechSynthesis" in window)) {

        alert(
            "Your browser does not support pronunciation."
        );

        return;

    }


    // Stop previous pronunciation
    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(text);


    speech.lang = "en-US";
    speech.rate = 0.85;
    speech.pitch = 1;


    window.speechSynthesis.speak(speech);

}


// =====================================================
// MAKE WORD CLICKABLE
// =====================================================

if (wordElement) {

    wordElement.classList.add("clickable-word");

    wordElement.setAttribute(
        "title",
        "Click to hear pronunciation"
    );

    wordElement.setAttribute(
        "role",
        "button"
    );

    wordElement.setAttribute(
        "tabindex",
        "0"
    );


    wordElement.addEventListener(
        "click",
        speakCurrentWord
    );


    wordElement.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                speakCurrentWord();

            }

        }
    );

}


// =====================================================
// SHOW CURRENT WORD
// =====================================================

function showWord() {

    if (
        typeof vocabulary === "undefined" ||
        !vocabulary ||
        vocabulary.length === 0
    ) {

        console.error(
            "Vocabulary data was not found."
        );

        return;

    }


    const item =
        vocabulary[currentWord];


    if (!item) {
        return;
    }


    if (wordElement) {
        wordElement.textContent =
            item.word || "";
    }


    if (pronunciationElement) {
        pronunciationElement.textContent =
            item.pronunciation || "";
    }


    if (meaningElement) {
        meaningElement.textContent =
            item.meaning || "";
    }


    if (exampleElement) {
        exampleElement.textContent =
            item.example || "";
    }


    if (wordCounter) {

        wordCounter.textContent =
            `${currentWord + 1} / ${vocabulary.length}`;

    }


    updateRememberStatus();

}


// =====================================================
// NEXT WORD
// =====================================================

const nextWordButton =
    document.getElementById("nextWord");


if (nextWordButton) {

    nextWordButton.addEventListener(
        "click",
        function() {

            if (
                typeof vocabulary === "undefined" ||
                vocabulary.length === 0
            ) {
                return;
            }


            if ("speechSynthesis" in window) {
                window.speechSynthesis.cancel();
            }


            currentWord++;

            if (currentWord >= vocabulary.length) {
                currentWord = 0;
            }


            showWord();

        }
    );

}


// =====================================================
// PREVIOUS WORD
// =====================================================

const previousWordButton =
    document.getElementById("previousWord");


if (previousWordButton) {

    previousWordButton.addEventListener(
        "click",
        function() {

            if (
                typeof vocabulary === "undefined" ||
                vocabulary.length === 0
            ) {
                return;
            }


            if ("speechSynthesis" in window) {
                window.speechSynthesis.cancel();
            }


            currentWord--;

            if (currentWord < 0) {
                currentWord =
                    vocabulary.length - 1;
            }


            showWord();

        }
    );

}


// =====================================================
// REMEMBER WORD
// =====================================================

const rememberButton =
    document.getElementById("rememberWord");


if (rememberButton) {

    rememberButton.addEventListener(
        "click",
        function() {

            if (
                typeof vocabulary === "undefined" ||
                !vocabulary[currentWord]
            ) {
                return;
            }


            const word =
                vocabulary[currentWord].word;


            if (!rememberedWords.includes(word)) {

                rememberedWords.push(word);

            }


            localStorage.setItem(
                "rememberedWords",
                JSON.stringify(rememberedWords)
            );


            updateRememberStatus();
            updateProgress();

        }
    );

}


// =====================================================
// NOT REMEMBERED
// =====================================================

const notRememberButton =
    document.getElementById("notRememberWord");


if (notRememberButton) {

    notRememberButton.addEventListener(
        "click",
        function() {

            if (
                typeof vocabulary === "undefined" ||
                !vocabulary[currentWord]
            ) {
                return;
            }


            const word =
                vocabulary[currentWord].word;


            rememberedWords =
                rememberedWords.filter(function(item) {

                    return item !== word;

                });


            localStorage.setItem(
                "rememberedWords",
                JSON.stringify(rememberedWords)
            );


            updateRememberStatus();
            updateProgress();

        }
    );

}


// =====================================================
// UPDATE REMEMBER STATUS
// =====================================================

function updateRememberStatus() {

    if (
        !rememberStatus ||
        typeof vocabulary === "undefined" ||
        !vocabulary[currentWord]
    ) {
        return;
    }


    const word =
        vocabulary[currentWord].word;


    if (rememberedWords.includes(word)) {

        rememberStatus.textContent =
            "✓ Remembered";

        rememberStatus.classList.add("remembered");

    } else {

        rememberStatus.textContent =
            "Not remembered";

        rememberStatus.classList.remove("remembered");

    }

}


// =====================================================
// CLINICAL CASES
// =====================================================

const revealButtons =
    document.querySelectorAll(".reveal-answer");


revealButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const answer =
                button.parentElement.querySelector(
                    ".case-answer"
                );


            if (answer) {

                answer.classList.toggle(
                    "show"
                );


                if (
                    answer.classList.contains("show")
                ) {

                    button.textContent =
                        "Hide Answer";

                } else {

                    button.textContent =
                        "Show Answer";

                }

            }

        }
    );

});


// =====================================================
// QUIZ
// =====================================================

const quizQuestions = [

    {
        question:
            "Which symptom is most commonly associated with fever?",

        options: [
            "Increased body temperature",
            "Low blood pressure",
            "Hair loss",
            "Improved vision"
        ],

        answer: 0
    },

    {
        question:
            "What does hypertension mean?",

        options: [
            "Low blood sugar",
            "High blood pressure",
            "Low body temperature",
            "High heart rate only"
        ],

        answer: 1
    },

    {
        question:
            "Which organ is primarily responsible for pumping blood?",

        options: [
            "Liver",
            "Kidney",
            "Heart",
            "Lung"
        ],

        answer: 2
    },

    {
        question:
            "What does dyspnea mean?",

        options: [
            "Chest pain",
            "Difficulty breathing",
            "Headache",
            "Abdominal pain"
        ],

        answer: 1
    },

    {
        question:
            "What is the normal adult body temperature approximately?",

        options: [
            "25°C",
            "30°C",
            "37°C",
            "45°C"
        ],

        answer: 2
    }

];


let currentQuestion = 0;
let quizScore = 0;


const quizQuestionElement =
    document.getElementById("quizQuestion");

const quizOptionsElement =
    document.getElementById("quizOptions");

const quizScoreElement =
    document.getElementById("quizScore");


// =====================================================
// SHOW QUIZ QUESTION
// =====================================================

function showQuizQuestion() {

    if (
        !quizQuestionElement ||
        !quizOptionsElement
    ) {
        return;
    }


    const question =
        quizQuestions[currentQuestion];


    if (!question) {
        return;
    }


    quizQuestionElement.textContent =
        question.question;


    quizOptionsElement.innerHTML = "";


    question.options.forEach(
        function(option, index) {

            const button =
                document.createElement("button");


            button.textContent =
                option;


            button.className =
                "quiz-option";


            button.addEventListener(
                "click",
                function() {

                    checkQuizAnswer(
                        index
                    );

                }
            );


            quizOptionsElement.appendChild(
                button
            );

        }
    );

}


// =====================================================
// CHECK QUIZ ANSWER
// =====================================================

function checkQuizAnswer(selectedAnswer) {

    const question =
        quizQuestions[currentQuestion];


    const buttons =
        quizOptionsElement.querySelectorAll(
            ".quiz-option"
        );


    buttons.forEach(function(button) {

        button.disabled = true;

    });


    if (
        selectedAnswer ===
        question.answer
    ) {

        quizScore++;


        if (buttons[selectedAnswer]) {

            buttons[selectedAnswer].classList.add(
                "correct"
            );

        }

    } else {

        if (buttons[selectedAnswer]) {

            buttons[selectedAnswer].classList.add(
                "wrong"
            );

        }


        if (buttons[question.answer]) {

            buttons[question.answer].classList.add(
                "correct"
            );

        }

    }

}


// =====================================================
// FINISH / NEXT QUIZ QUESTION
// =====================================================

const nextQuizButton =
    document.getElementById("nextQuiz");


if (nextQuizButton) {

    nextQuizButton.addEventListener(
        "click",
        function() {

            currentQuestion++;


            if (
                currentQuestion >=
                quizQuestions.length
            ) {

                finishQuiz();

            } else {

                showQuizQuestion();

            }

        }
    );

}


// =====================================================
// FINISH QUIZ
// =====================================================

function finishQuiz() {

    if (quizScore > bestQuizScore) {

        bestQuizScore =
            quizScore;


        localStorage.setItem(
            "bestQuizScore",
            bestQuizScore
        );

    }


    if (quizQuestionElement) {

        quizQuestionElement.textContent =
            "Quiz completed!";

    }


    if (quizOptionsElement) {

        quizOptionsElement.innerHTML =
            `<div class="quiz-result">
                Your score: ${quizScore} / ${quizQuestions.length}
            </div>`;

    }


    if (quizScoreElement) {

        quizScoreElement.textContent =
            `${quizScore} / ${quizQuestions.length}`;

    }


    updateProgress();

}


// =====================================================
// START / RESET QUIZ
// =====================================================

const startQuizButton =
    document.getElementById("startQuiz");


if (startQuizButton) {

    startQuizButton.addEventListener(
        "click",
        function() {

            currentQuestion = 0;
            quizScore = 0;

            showQuizQuestion();

        }
    );

}


// =====================================================
// PROGRESS
// =====================================================

function updateProgress() {

    const totalWords =
        typeof vocabulary !== "undefined"
            ? vocabulary.length
            : 0;


    const rememberedCount =
        rememberedWords.length;


    const percentage =
        totalWords > 0
            ? Math.round(
                (rememberedCount /
                    totalWords) *
                100
            )
            : 0;


    const progressElements =
        document.querySelectorAll(
            ".vocab-progress"
        );


    progressElements.forEach(
        function(element) {

            element.textContent =
                `${percentage}%`;

        }
    );


    const progressBars =
        document.querySelectorAll(
            ".progress-fill"
        );


    progressBars.forEach(
        function(bar) {

            bar.style.width =
                `${percentage}%`;

        }
    );


    const rememberedElement =
        document.getElementById(
            "rememberedCount"
        );


    if (rememberedElement) {

        rememberedElement.textContent =
            rememberedCount;

    }


    const bestScoreElement =
        document.getElementById(
            "bestQuizScore"
        );


    if (bestScoreElement) {

        bestScoreElement.textContent =
            bestQuizScore;

    }

}


// =====================================================
// INITIALIZE APPLICATION
// =====================================================

function initializeApp() {

    showWord();

    showQuizQuestion();

    updateProgress();

    showPage("dashboard");

}


// =====================================================
// START
// =====================================================

initializeApp();