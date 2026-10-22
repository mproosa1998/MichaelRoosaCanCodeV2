// Light Dark Mode Toggle
function toggleTheme() {
    const body = document.body;
    const button = document.getElementById("themeToggle");
    const isDark = body.classList.toggle("dark-mode");

    body.classList.toggle("light-mode", !isDark);
    button.textContent = isDark ? "☀" : "☾";
    button.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
}

document.body.classList.add("dark-mode");

// Close Tab
function closeTab(){
    window.open("about:blank", "_self").close();
    window.close();
}

// Matrix Quote Text Hover Color Timer
const matrixQuote = document.getElementById("MatrixQuote");
if (matrixQuote) {
    matrixQuote.addEventListener("mouseover", function(){
        const text = this;
        text.style.color = "green";
        setTimeout(() => {
            text.style.color = "aliceblue";
        }, 300);
    });
}



// open and close the contact form
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

// This code will close the contact form when the user clicks off of it
document.addEventListener("click", function(event){
    const isContactTrigger = event.target.closest(".inlineBtn, .Pop_Up_Button, .contact");

    if (event.target.matches(".cancel") || (!event.target.closest(".form-popup") && !isContactTrigger)) {
        closeForm();
    }
}, false );