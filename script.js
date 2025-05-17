// Game Data
const allCards = {
    romantic: [
        "Stare into each other's eyes for 30 seconds",
        "Share your favorite memory together",
        "Slow dance for 1 minute",
        "Whisper something you love about them"
    ],
    flirty: [
        "Give a teasing compliment",
        "Playfully steal a kiss",
        "Whisper what you find attractive about them",
        "Trace your finger along their arm slowly"
    ],
    spicy: [
        "Kiss passionately for 10 seconds",
        "Undress each other slowly (no rushing!)",
        "Give a sensual massage (3+ minutes)",
        "Take a shower together",
        "Play with ice cubes on sensitive areas",
        "Blindfold your partner and explore their body",
        "Whisper your wildest fantasy in their ear",
        "Try a new position you’ve never done before"
    ]
};

// Game State
let player1Name = "";
let player2Name = "";
let currentPlayer = 1;
let usedCards = [];
let currentDeck = [];

// DOM Elements
const welcomeScreen = document.getElementById("welcome-screen");
const gameScreen = document.getElementById("game-screen");
const startButton = document.getElementById("start-game");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const turnIndicator = document.getElementById("turn-indicator");
const activityText = document.getElementById("activity-text");
const flipSound = document.getElementById("flip-sound");
const spicyModeToggle = document.getElementById("spicy-mode");

// Start Game
startButton.addEventListener("click", () => {
    player1Name = player1Input.value || "Player 1";
    player2Name = player2Input.value || "Player 2";
    
    // Build deck based on preference
    currentDeck = [...allCards.romantic, ...allCards.flirty];
    if (spicyModeToggle.checked) {
        currentDeck = [...currentDeck, ...allCards.spicy];
    }
    
    welcomeScreen.style.display = "none";
    gameScreen.style.display = "block";
    updateTurnIndicator();
});

// Flip Card
function flipCard() {
    if (usedCards.length === currentDeck.length) {
        alert("All cards used! Resetting deck.");
        usedCards = [];
    }
    
    let randomCard;
    do {
        randomCard = Math.floor(Math.random() * currentDeck.length);
    } while (usedCards.includes(randomCard));
    
    usedCards.push(randomCard);
    activityText.textContent = currentDeck[randomCard];
    document.querySelector(".card").classList.add("flipped");
    
    // Play sound if available
    if (flipSound) flipSound.play();
    
    // Switch turn
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateTurnIndicator();
    
    // Auto-reset card after 7 seconds
    setTimeout(() => {
        document.querySelector(".card").classList.remove("flipped");
    }, 7000);
}

// Update turn display
function updateTurnIndicator() {
    const currentName = currentPlayer === 1 ? player1Name : player2Name;
    turnIndicator.textContent = `${currentName}'s Turn`;
}
