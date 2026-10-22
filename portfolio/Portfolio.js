const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

function updateThemeButton() {
    const isDark = document.body.classList.contains("dark-mode");
    themeToggle.textContent = isDark ? "Light" : "Dark";
    themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
}

if (themeToggle) {
    updateThemeButton();
    themeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-mode");
        localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
        updateThemeButton();
    });
}

const year = document.getElementById("year");
if (year) {
    year.textContent = new Date().getFullYear();
}