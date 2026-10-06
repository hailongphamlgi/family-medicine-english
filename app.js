```javascript
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

    Object.values(pages).forEach(function(page) {

        page.classList.remove("active-page");

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


    // Check browser support
    if (!("speechSynthesis" in window)) {

        alert(
            "Your browser does not support pronunciation."
        );

        return;

    }


    // Stop previous speech
    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(text);


    // English pronunciation
    speech.lang = "en-US";


    // Slightly slower for learners
    speech.rate = 0.85;


    speech.pitch = 1;


    window.speechSynthesis.speak(speech);

}


// Click the vocabulary word to pronounce
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


    // Also allow Enter / Space on keyboard
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
```
