```javascript
// =====================================================
// FAMILY MEDICINE ENGLISH
// Main Application
// =====================================================


// =====================================================
// STORAGE
// =====================================================

let rememberedWords = JSON.parse(
    localStorage.getItem("rememberedWords") || "[]"
);

let bestQuizScore = Number(
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

const navItems = document.querySelectorAll(".nav-item");


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
// NAVIGATION BUTTONS
// =====================================================

document.querySelectorAll("[data-page]").forEach(function(button) {

    button.addEventListener("click", function() {

        const pageName = button.dataset.page;

        showPage(pageName);

    });

});


// =====================================================
// VOCABULARY ELEMENTS
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

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");

const rememberedBtn =
    document.getElementById("rememberedBtn");

const notRememberedBtn =
    document.getElementById("notRememberedBtn");


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


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(text);


    speech.lang = "en-US";
    speech.rate = 0.85;
    speech.pitch = 1;


    window.speechSynthesis.speak(speech);
}


// Make vocabulary word clickable

if (wordElement) {

    wordElement.classList.add("clickable-word");

    wordElement.addEventListener(
        "click",
        speakCurrentWord
    );

}


// =====================================================
// SHOW VOCABULARY
// =====================================================

function showWord() {

    if (
        typeof vocabulary === "undefined" ||
        !Array.isArray(vocabulary) ||
        vocabulary.length === 0
    ) {

        console.error(
            "Vocabulary data was not loaded."
        );

        return;
    }


    if (currentWord < 0) {
        currentWord = vocabulary.length - 1;
    }


    if (currentWord >= vocabulary.length) {
        currentWord = 0;
    }


    const item =
        vocabulary[currentWord];


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

if (nextBtn) {

    nextBtn.addEventListener(
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

if (previousBtn) {

    previousBtn.addEventListener(
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
// REMEMBERED
// =====================================================

if (rememberedBtn) {

    rememberedBtn.addEventListener(
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

if (notRememberedBtn) {

    notRememberedBtn.addEventListener(
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
                rememberedWords.filter(
                    function(item) {
                        return item !== word;
                    }
                );


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
// REMEMBER STATUS
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
            "✓ Đã nhớ";

        rememberStatus.classList.add(
            "remembered"
        );

    } else {

        rememberStatus.textContent =
            "";

        rememberStatus.classList.remove(
            "remembered"
        );

    }

}


// =====================================================
// CLINICAL CASE
// =====================================================

const showCaseAnswer =
    document.getElementById("showCaseAnswer");

const caseAnswer =
    document.getElementById("caseAnswer");


if (showCaseAnswer && caseAnswer) {

    showCaseAnswer.addEventListener(
        "click",
        function() {

            if (
                caseAnswer.style.display === "block"
            ) {

                caseAnswer.style.display = "none";

                showCaseAnswer.textContent =
                    "Show answer";

            } else {

                caseAnswer.style.display = "block";

                showCaseAnswer.textContent =
                    "Hide answer";

            }

        }
    );

}


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

const quizQuestion =
    document.getElementById("quizQuestion");

const quizOptions =
    document.getElementById("quizOptions");

const quizFeedback =
    document.getElementById("quizFeedback");

const quizCounter =
    document.getElementById("quizCounter");

const nextQuestionBtn =
    document.getElementById("nextQuestionBtn");


// =====================================================
// SHOW QUIZ QUESTION
// =====================================================

function showQuizQuestion() {

    if (!quizQuestion || !quizOptions) {
        return;
    }


    const question =
        quizQuestions[currentQuestion];


    if (!question) {
        return;
    }


    quizQuestion.textContent =
        question.question;


    quizOptions.innerHTML = "";


    if (quizFeedback) {
        quizFeedback.textContent = "";
    }


    if (quizCounter) {

        quizCounter.textContent =
            `${currentQuestion + 1} / ${quizQuestions.length}`;

    }


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


            quizOptions.appendChild(button);

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
        quizOptions.querySelectorAll(
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


        if (quizFeedback) {

            quizFeedback.textContent =
                "✓ Correct!";

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


        if (quizFeedback) {

            quizFeedback.textContent =
                "✗ Incorrect";

        }

    }

}


// =====================================================
// NEXT QUESTION
// =====================================================

if (nextQuestionBtn) {

    nextQuestionBtn.addEventListener(
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


    if (quizQuestion) {

        quizQuestion.textContent =
            "🎉 Quiz completed!";

    }


    if (quizOptions) {

        quizOptions.innerHTML =
            `<div class="quiz-result">
                Your score: ${quizScore} / ${quizQuestions.length}
            </div>`;

    }


    if (quizCounter) {

        quizCounter.textContent =
            "Finished";

    }


    if (nextQuestionBtn) {

        nextQuestionBtn.textContent =
            "Restart quiz";

        nextQuestionBtn.onclick =
            function() {

                currentQuestion = 0;
                quizScore = 0;

                nextQuestionBtn.textContent =
                    "Next question →";

                showQuizQuestion();

            };

    }


    updateProgress();

}


// =====================================================
// PROGRESS
// =====================================================

function updateProgress() {

    const totalWords =
        typeof vocabulary !== "undefined" &&
        Array.isArray(vocabulary)
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


    // Dashboard percentage

    const dashboardProgress =
        document.getElementById(
            "dashboardProgress"
        );


    if (dashboardProgress) {

        dashboardProgress.textContent =
            `${percentage}%`;

    }


    const dashboardProgressBar =
        document.getElementById(
            "dashboardProgressBar"
        );


    if (dashboardProgressBar) {

        dashboardProgressBar.style.width =
            `${percentage}%`;

    }


    // Progress page

    const knownWords =
        document.getElementById(
            "knownWords"
        );


    if (knownWords) {

        knownWords.textContent =
            rememberedCount;

    }


    const quizScoreElement =
        document.getElementById(
            "quizScore"
        );


    if (quizScoreElement) {

        quizScoreElement.textContent =
            bestQuizScore;

    }


    const overallProgress =
        document.getElementById(
            "overallProgress"
        );


    if (overallProgress) {

        overallProgress.textContent =
            `${percentage}%`;

    }


    const vocabularyProgressBar =
        document.getElementById(
            "vocabularyProgressBar"
        );


    if (vocabularyProgressBar) {

        vocabularyProgressBar.style.width =
            `${percentage}%`;

    }


    const vocabularyProgressText =
        document.getElementById(
            "vocabularyProgressText"
        );


    if (vocabularyProgressText) {

        vocabularyProgressText.textContent =
            `${rememberedCount} / ${totalWords} words remembered`;

    }

}


// =====================================================
// INITIALIZE
// =====================================================

function initializeApp() {

    showWord();

    showQuizQuestion();

    updateProgress();

    showPage("dashboard");

}


initializeApp();
```
