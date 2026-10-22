

const seasonToggle = document.getElementById("SeasonToggle");
const gameStatus = document.getElementById("GameStatus");
const gameScore = document.getElementById("GameScore");
const roundTimerText = document.getElementById("RoundTimer");
const gameBoard = document.querySelector(".Gameboard");
const startButton = document.getElementById("StartGame");
const tryAgainButton = document.getElementById("TryAgain");
const animals = {
    rabbit: document.getElementById("Rabbit"),
    duck: document.getElementById("Duck")
};

let season = "rabbit";
let catches = 0;
let misses = 0;
let roundActive = false;
let roundTimer;
let nextRoundTimer;
let escapeTimer;
let countdownTimer;

function chooseSeason() {
    season = Math.random() < 0.5 ? "rabbit" : "duck";
}

function placeAnimals() {
    const boardWidth = gameBoard.clientWidth;
    const boardHeight = gameBoard.clientHeight;
    const placements = [];

    Object.values(animals).forEach((animal) => {
        const width = animal.offsetWidth;
        const height = animal.offsetHeight;
        let x;
        let y;
        let attempts = 0;

        do {
            x = Math.random() * Math.max(0, boardWidth - width);
            y = Math.random() * Math.max(0, boardHeight - height);
            attempts += 1;
        } while (placements.some((point) => Math.hypot(point.x - x, point.y - y) < 120) && attempts < 20);

        placements.push({ x, y });
        animal.style.left = `${x}px`;
        animal.style.top = `${y}px`;
    });
}

function updateScore() {
    gameScore.textContent = `Catches: ${catches}/10 | Misses: ${misses}/3`;
}

function startRound() {
    if (misses >= 3 || catches >= 10) return;
    chooseSeason();
    roundActive = true;
    Object.values(animals).forEach((animal) => animal.classList.remove("is-hidden"));
    placeAnimals();
    seasonToggle.textContent = `${season === "rabbit" ? "Rabbit" : "Duck"} Season`;
    seasonToggle.setAttribute("aria-label", `${season} season`);
    gameStatus.textContent = `Catch the ${season}. You have 3 seconds.`;
    let secondsRemaining = 3;
    roundTimerText.textContent = `Time: ${secondsRemaining}s`;
    countdownTimer = window.setInterval(() => {
        secondsRemaining -= 1;
        roundTimerText.textContent = `Time: ${secondsRemaining}s`;
    }, 1000);
    roundTimer = window.setTimeout(() => finishRound(false, "Time's up. That round counts as a miss."), 3000);
}

function finishRound(caught, message) {
    if (!roundActive) return;
    roundActive = false;
    window.clearTimeout(roundTimer);
    window.clearTimeout(escapeTimer);
    window.clearInterval(countdownTimer);
    if (caught) catches += 1;
    else misses += 1;
    Object.values(animals).forEach((animal) => animal.classList.add("is-hidden"));
    gameStatus.textContent = message;
    roundTimerText.textContent = "Round complete";
    updateScore();

    if (catches >= 10) {
        gameStatus.textContent = "You win! Ten catches!";
        endGame();
    } else if (misses >= 3) {
        gameStatus.textContent = "Game over. You reached 3 misses.";
        endGame();
    } else {
        nextRoundTimer = window.setTimeout(startRound, 500);
    }
}

function endGame() {
    roundActive = false;
    window.clearTimeout(roundTimer);
    window.clearTimeout(nextRoundTimer);
    window.clearInterval(countdownTimer);
    tryAgainButton.hidden = false;
}

Object.entries(animals).forEach(([animalName, animal]) => {
    animal.addEventListener("mouseenter", () => {
        if (!roundActive || animalName !== season) return;
        gameStatus.textContent = `The ${animalName} is about to escape!`;
        escapeTimer = window.setTimeout(() => {
            finishRound(false, `The ${animalName} escaped. That round counts as a miss.`);
        }, 750);
    });
    animal.addEventListener("mouseleave", () => {
        window.clearTimeout(escapeTimer);
    });
    animal.addEventListener("click", () => {
        if (!roundActive) return;
        if (animalName === season) {
            finishRound(true, `Caught the ${animalName}!`);
        } else {
            finishRound(false, `Wrong one. That counts as a miss; catch the ${season} next round.`);
        }
    });
});

document.body.classList.add("Rabbit-Season");
updateScore();
Object.values(animals).forEach((animal) => animal.classList.add("is-hidden"));
startButton.addEventListener("click", () => {
    catches = 0;
    misses = 0;
    updateScore();
    startButton.hidden = true;
    tryAgainButton.hidden = true;
    startRound();
});
tryAgainButton.addEventListener("click", () => {
    catches = 0;
    misses = 0;
    updateScore();
    tryAgainButton.hidden = true;
    startRound();
});



