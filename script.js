// Game Configuration
const cardDecks = {
    romantic: [
        "Stare into each other's eyes for [30s]",
        "Share your favorite memory together",
        "Slow dance for [1m]",
        "Whisper something you love about them",
        "Plan your dream vacation together",
        // Add more romantic cards
    ],
    
    spicy: [
        "Kiss passionately for [30s] without breaking contact",
        "Give a sensual back massage [2m] using only your fingertips",
        "Take turns blindfolded guessing touch locations [1m]",
        "Explore scent connection with shared perfume/oil [3m]",
        "Whisper your wildest fantasy in their ear",
        "Undress each other slowly with eyes closed",
        "Exchange foot massages with warm lotion [5m]",
        "Practice synchronized breathing while embracing",
        "Taste-test fruits from each other's mouths [1m]",
        "Draw imaginary patterns on each other's backs",
        // Add 40+ more spicy cards
    ]
};

// Game State
let gameState = {
    players: ["Player 1", "Player 2"],
    currentPlayer: 0,
    usedCards: [],
    activeDeck: [],
    isSpicyMode: false,
    isCardFlipped: false,
    timer: null,
    timeLeft: 0,
    totalTime: 0
};

// DOM Elements
const elements = {
    welcomeScreen: document.getElementById("welcome-screen"),
    gameScreen: document.getElementById("game-screen"),
    startButton: document.getElementById("start-game"),
    backButton: document.getElementById("back-to-menu"),
    playerInputs: [
        document.getElementById("player1"),
        document.getElementById("player2")
    ],
    turnDisplay: document.getElementById("turn-indicator"),
    cardText: document.getElementById("activity-text"),
    card: document.querySelector(".card"),
    nextButton: document.getElementById("next-btn"),
    spicyToggles: {
        menu: document.getElementById("spicy-mode"),
        game: document.getElementById("spicy-toggle")
    },
    timerBar: document.getElementById("timer-bar"),
    timerText: document.getElementById("timer-text"),
    flipSound: document.getElementById("flip-sound")
};

// Event Listeners
elements.startButton.addEventListener("click", startGame);
elements.backButton.addEventListener("click", returnToMenu);
elements.nextButton.addEventListener("click", prepareNextCard);
elements.spicyToggles.game.addEventListener("change", toggleSpicyMode);

function startGame() {
    // Initialize game state
    gameState.players[0] = elements.playerInputs[0].value || "Player 1";
    gameState.players[1] = elements.playerInputs[1].value || "Player 2";
    gameState.isSpicyMode = elements.spicyToggles.menu.checked;
    elements.spicyToggles.game.checked = gameState.isSpicyMode;
    
    updateCardDeck();
    resetGameState();
    
    // Show game screen
    elements.welcomeScreen.style.display = "none";
    elements.gameScreen.style.display = "block";
    updateTurnDisplay();
}

function toggleSpicyMode() {
    gameState.isSpicyMode = elements.spicyToggles.game.checked;
    updateCardDeck();
    resetGameState();
}

function updateCardDeck() {
    gameState.activeDeck = [...cardDecks.romantic];
    if (gameState.isSpicyMode) {
        gameState.activeDeck = [...gameState.activeDeck, ...cardDecks.spicy];
    }
    gameState.usedCards = [];
}

function handleCardClick() {
    if (gameState.isCardFlipped) return;
    
    // Check if all cards used
    if (gameState.usedCards.length >= gameState.activeDeck.length) {
        alert("All cards used! Resetting deck.");
        gameState.usedCards = [];
    }
    
    // Select unique card
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * gameState.activeDeck.length);
    } while (gameState.usedCards.includes(randomIndex));
    
    gameState.usedCards.push(randomIndex);
    const selectedCard = gameState.activeDeck[randomIndex];
    
    // Display card
    elements.cardText.textContent = selectedCard.replace(/\[\d+[sm]\]/g, '');
    elements.card.classList.add("flipped");
    
    // Handle timer
    const timeMatch = selectedCard.match(/\[(\d+)([sm])\]/);
    if (timeMatch) {
        const duration = parseInt(timeMatch[1]);
        const unit = timeMatch[2];
        gameState.totalTime = unit === 'm' ? duration * 60 : duration;
        gameState.timeLeft = gameState.totalTime;
        startTimer();
    }
    
    // Play sound and update UI
    if (elements.flipSound) elements.flipSound.play();
    switchPlayerTurn();
    elements.nextButton.style.display = "block";
    gameState.isCardFlipped = true;
}

function startTimer() {
    clearInterval(gameState.timer);
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        updateTimerDisplay();
        
        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timer);
            new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3').play();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(gameState.timeLeft / 60);
    const seconds = gameState.timeLeft % 60;
    elements.timerText.textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
    const progress = (gameState.timeLeft / gameState.totalTime) * 100;
    elements.timerBar.style.width = `${progress}%`;
}

function prepareNextCard() {
    clearInterval(gameState.timer);
    elements.card.classList.remove("flipped");
    elements.nextButton.style.display = "none";
    gameState.isCardFlipped = false;
    elements.timerBar.style.width = "100%";
    elements.timerText.textContent = "00:00";
}

function switchPlayerTurn() {
    gameState.currentPlayer = (gameState.currentPlayer + 1) % 2;
    updateTurnDisplay();
}

function updateTurnDisplay() {
    elements.turnDisplay.textContent = 
        `${gameState.players[gameState.currentPlayer]}'s Turn`;
}

function resetGameState() {
    prepareNextCard();
    gameState.currentPlayer = 0;
    updateTurnDisplay();
}

function returnToMenu() {
    resetGameState();
    elements.gameScreen.style.display = "none";
    elements.welcomeScreen.style.display = "block";
}
