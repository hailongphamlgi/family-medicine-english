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

    dashboard:
        document.getElementById("dashboardPage"),

    vocabulary:
        document.getElementById("vocabularyPage"),

    cases:
        document.getElementById("casesPage"),

    quiz:
        document.getElementById("quizPage"),

    progress:
        document.getElementById("progressPage")

};


const navItems =
    document.querySelectorAll(".nav-item");


function showPage(pageName) {

    // Hide every page
    Object.values(pages).forEach(function(page) {

        page.classList.remove("active-page");

    });


    // Show selected page
    if (pages[pageName]) {

        pages[pageName].classList.add("active-page");

    }


    // Update active menu
    navItems.forEach(function(item) {

        item.classList.remove("active");


        if (item.dataset.page === pageName) {

            item.classList.add("active");

        }

    });


    // Update progress
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


// Buttons that also navigate
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



function showWord() {

    const item =
        vocabulary[currentWord];


    wordElement.textContent =
        item.word;


    pronunciationElement.textContent =
        item.pronunciation;


    meaningElement.textContent =
        item.meaning;


    exampleElement.textContent =
        item.example;


    wordCounter.textContent =
        `${currentWord + 1} / ${vocabulary.length}`;


    // Check whether word was remembered
    if (rememberedWords.includes(item.word)) {

        rememberStatus.textContent =
            "✅ Bạn đã đánh dấu từ này là đã nhớ.";

    } else {

        rememberStatus.textContent = "";

    }

}



// =====================================================
// NEXT WORD
// =====================================================

document
    .getElementById("nextBtn")
    .addEventListener("click", function() {

        currentWord++;


        if (currentWord >= vocabulary.length) {

            currentWord = 0;

        }


        showWord();

    });



// =====================================================
// PREVIOUS WORD
// =====================================================

document
    .getElementById("previousBtn")
    .addEventListener("click", function() {

        currentWord--;


        if (currentWord < 0) {

            currentWord =
                vocabulary.length - 1;

        }


        showWord();

    });



// =====================================================
// REMEMBERED
// =====================================================

document
    .getElementById("rememberedBtn")
    .addEventListener("click", function() {

        const word =
            vocabulary[currentWord].word;


        if (!rememberedWords.includes(word)) {

            rememberedWords.push(word);

        }


        localStorage.setItem(
            "rememberedWords",
            JSON.stringify(rememberedWords)
        );


        rememberStatus.textContent =
            "✅ Đã lưu: bạn đã nhớ từ này.";


        updateProgress();

    });



// =====================================================
// NOT REMEMBERED
// =====================================================

document
    .getElementById("notRememberedBtn")
    .addEventListener("click", function() {

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


        rememberStatus.textContent =
            "❌ Đã đánh dấu là chưa nhớ.";


        updateProgress();

    });



// =====================================================
// CLINICAL CASE
// =====================================================

const showCaseAnswer =
    document.getElementById("showCaseAnswer");


const caseAnswer =
    document.getElementById("caseAnswer");


showCaseAnswer.addEventListener(
    "click",
    function() {

        caseAnswer.style.display =
            "block";


        showCaseAnswer.style.display =
            "none";

    }
);



// =====================================================
// QUIZ DATA
// =====================================================

const quizQuestions = [

    {
        question:
            'What does "adherence" mean?',

        options: [
            "Chẩn đoán",
            "Tuân thủ",
            "Điều trị",
            "Theo dõi"
        ],

        answer: 1
    },


    {
        question:
            'What is the best way to ask about symptom duration?',

        options: [
            "What do you eat?",
            "How long have you been experiencing these symptoms?",
            "Where do you live?",
            "What is your favorite food?"
        ],

        answer: 1
    },


    {
        question:
            'What does "dizziness" mean?',

        options: [
            "Đau bụng",
            "Khó thở",
            "Chóng mặt",
            "Đau lưng"
        ],

        answer: 2
    },


    {
        question:
            'What does "hypertension" mean?',

        options: [
            "Tăng huyết áp",
            "Đái tháo đường",
            "Hen phế quản",
            "Béo phì"
        ],

        answer: 0
    },


    {
        question:
            'What does "lifestyle modification" mean?',

        options: [
            "Phẫu thuật",
            "Thay đổi lối sống",
            "Kê đơn thuốc",
            "Xét nghiệm máu"
        ],

        answer: 1
    }

];



let currentQuestion = 0;

let currentQuizScore = 0;

let quizAnswered = false;



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

    const question =
        quizQuestions[currentQuestion];


    quizAnswered = false;


    quizQuestion.textContent =
        question.question;


    quizCounter.textContent =
        `${currentQuestion + 1} / ${quizQuestions.length}`;


    quizFeedback.textContent = "";


    quizOptions.innerHTML = "";


    question.options.forEach(function(option, index) {

        const button =
            document.createElement("button");


        button.className =
            "quiz-option";


        button.textContent =
            option;


        button.addEventListener(
            "click",
            function() {

                answerQuiz(
                    index,
                    button
                );

            }
        );


        quizOptions.appendChild(button);

    });

}



// =====================================================
// ANSWER QUIZ
// =====================================================

function answerQuiz(selectedIndex, selectedButton) {

    if (quizAnswered) {

        return;

    }


    quizAnswered = true;


    const question =
        quizQuestions[currentQuestion];


    const allButtons =
        document.querySelectorAll(".quiz-option");


    allButtons.forEach(function(button, index) {

        if (index === question.answer) {

            button.classList.add("correct");

        }

    });


    if (selectedIndex === question.answer) {

        currentQuizScore++;


        selectedButton.classList.add("correct");


        quizFeedback.textContent =
            "✅ Correct! Great job.";

    } else {

        selectedButton.classList.add("wrong");


        quizFeedback.textContent =
            "❌ Not quite. The correct answer is highlighted.";

    }

}



// =====================================================
// NEXT QUESTION
// =====================================================

nextQuestionBtn.addEventListener(
    "click",
    function() {

        if (!quizAnswered) {

            quizFeedback.textContent =
                "⚠️ Please choose an answer first.";

            return;

        }


        currentQuestion++;


        if (
            currentQuestion >=
            quizQuestions.length
        ) {

            finishQuiz();

            return;

        }


        showQuizQuestion();

    }
);



// =====================================================
// FINISH QUIZ
// =====================================================

function finishQuiz() {

    if (currentQuizScore > bestQuizScore) {

        bestQuizScore =
            currentQuizScore;


        localStorage.setItem(
            "bestQuizScore",
            bestQuizScore
        );

    }


    quizQuestion.textContent =
        `🎉 Quiz completed! Score: ${currentQuizScore}/${quizQuestions.length}`;


    quizOptions.innerHTML = "";


    quizFeedback.textContent =
        "Your best score is " +
        bestQuizScore +
        "/" +
        quizQuestions.length;


    nextQuestionBtn.textContent =
        "Try again";


    nextQuestionBtn.onclick =
        function() {

            currentQuestion = 0;

            currentQuizScore = 0;

            nextQuestionBtn.textContent =
                "Next question →";

            showQuizQuestion();

            nextQuestionBtn.onclick =
                nextQuestionOriginalHandler;

        };

}



// Keep original next-question behavior
function nextQuestionOriginalHandler() {

    if (!quizAnswered) {

        quizFeedback.textContent =
            "⚠️ Please choose an answer first.";

        return;

    }


    currentQuestion++;


    if (
        currentQuestion >=
        quizQuestions.length
    ) {

        finishQuiz();

        return;

    }


    showQuizQuestion();

}



// =====================================================
// PROGRESS
// =====================================================

function updateProgress() {

    const totalWords =
        vocabulary.length;


    const knownWords =
        rememberedWords.length;


    const vocabularyProgress =
        Math.round(
            (knownWords / totalWords) * 100
        );


    const dashboardProgress =
        document.getElementById(
            "dashboardProgress"
        );


    const dashboardProgressBar =
        document.getElementById(
            "dashboardProgressBar"
        );


    dashboardProgress.textContent =
        vocabularyProgress + "%";


    dashboardProgressBar.style.width =
        vocabularyProgress + "%";


    document.getElementById(
        "knownWords"
    ).textContent =
        knownWords;


    document.getElementById(
        "quizScore"
    ).textContent =
        bestQuizScore +
        "/" +
        quizQuestions.length;


    document.getElementById(
        "overallProgress"
    ).textContent =
        vocabularyProgress + "%";


    document.getElementById(
        "vocabularyProgressBar"
    ).style.width =
        vocabularyProgress + "%";


    document.getElementById(
        "vocabularyProgressText"
    ).textContent =
        `${knownWords} / ${totalWords} vocabulary words remembered.`;

}



// =====================================================
// INITIALIZE
// =====================================================

showWord();

showQuizQuestion();

updateProgress();