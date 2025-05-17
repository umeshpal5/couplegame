document.addEventListener('DOMContentLoaded', () => {
    // Game Data
    const cardDecks = {
        romantic: [
            "Stare into each other's eyes for [30s]",
            "Share your favorite memory together",
            "Slow dance for [1m]",
            "Whisper something you love about them",
            "Plan your dream vacation together"
        ],
        spicy: [
            "Kiss passionately for [30s] without breaking contact",
            "Give a sensual back massage [2m] using only your fingertips",
            "Take turns blindfolded guessing touch locations [1m]",
            "Explore scent connection with shared perfume/oil [3m]",
            "Whisper your wildest fantasy in their ear"
        ]
    };

    // Game State
    const state = {
        players: ["Player 1", "Player 2"],
        currentPlayer: 0,
        usedCards: [],
        activeDeck: [],
        isSpicyMode: false,
        isCardFlipped: false,
        timer: null
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
        flipSound: document.getElementById("flip-sound"),
        timerSound: document.getElementById("timer-sound")
    };

    // Event Listeners
    elements.startButton.addEventListener("click", startGame);
    elements.backButton.addEventListener("click", returnToMenu);
    elements.nextButton.addEventListener("click", prepareNextCard);
    elements.spicyToggles.game.addEventListener("change", toggleSpicyMode);
    elements.card.addEventListener("click", handleCardClick);

    function startGame() {
        state.players[0] = elements.playerInputs[0].value || "Player 1";
        state.players[1] = elements.playerInputs[1].value || "Player 2";
        state.isSpicyMode = elements.spicyToggles.menu.checked;
        elements.spicyToggles.game.checked = state.isSpicyMode;
        
        updateCardDeck();
        resetGameState();
        
        elements.welcomeScreen.style.display = "none";
        elements.gameScreen.style.display = "block";
        updateTurnDisplay();
    }

    function handleCardClick() {
        if (state.isCardFlipped) return;
        
        if (state.usedCards.length >= state.activeDeck.length) {
            alert("All cards used! Resetting deck.");
            state.usedCards = [];
        }
        
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * state.activeDeck.length);
        } while (state.usedCards.includes(randomIndex));
        
        state.usedCards.push(randomIndex);
        const selectedCard = state.activeDeck[randomIndex];
        
        // Display card without time marker
        elements.cardText.textContent = selectedCard.replace(/\[\d+[sm]\]/g, '').trim();
        elements.card.classList.add("flipped");
        
        // Handle timer if present
        const timeMatch = selectedCard.match(/\[(\d+)([sm])\]/);
        if (timeMatch) {
            startTimer(parseInt(timeMatch[1]), timeMatch[2]);
        } else {
            hideTimer();
        }
        
        // Play sound and update UI
        if (elements.flipSound) {
            elements.flipSound.currentTime = 0;
            elements.flipSound.play();
        }
        
        state.isCardFlipped = true;
        elements.nextButton.style.display = "block";
        switchPlayerTurn();
    }

    function startTimer(duration, unit) {
        clearInterval(state.timer);
        const totalSeconds = unit === 'm' ? duration * 60 : duration;
        let timeLeft = totalSeconds;
        
        elements.timerBar.style.width = "100%";
        elements.timerText.textContent = formatTime(timeLeft);
        elements.timerContainer.style.display = "block";
        
        state.timer = setInterval(() => {
            timeLeft--;
            elements.timerBar.style.width = `${(timeLeft / totalSeconds) * 100}%`;
            elements.timerText.textContent = formatTime(timeLeft);
            
            if (timeLeft <= 0) {
                clearInterval(state.timer);
                if (elements.timerSound) {
                    elements.timerSound.currentTime = 0;
                    elements.timerSound.play();
                }
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function hideTimer() {
        elements.timerContainer.style.display = "none";
    }

    function prepareNextCard() {
        clearInterval(state.timer);
        elements.card.classList.remove("flipped");
        elements.nextButton.style.display = "none";
        state.isCardFlipped = false;
        hideTimer();
    }

    function toggleSpicyMode() {
        state.isSpicyMode = elements.spicyToggles.game.checked;
        updateCardDeck();
        resetGameState();
    }

    function updateCardDeck() {
        state.activeDeck = [...cardDecks.romantic];
        if (state.isSpicyMode) {
            state.activeDeck.push(...cardDecks.spicy);
        }
        state.usedCards = [];
    }

    function switchPlayerTurn() {
        state.currentPlayer = (state.currentPlayer + 1) % 2;
        updateTurnDisplay();
    }

    function updateTurnDisplay() {
        elements.turnDisplay.textContent = `${state.players[state.currentPlayer]}'s Turn`;
    }

    function resetGameState() {
        prepareNextCard();
        state.currentPlayer = 0;
        updateTurnDisplay();
    }

    function returnToMenu() {
        resetGameState();
        elements.gameScreen.style.display = "none";
        elements.welcomeScreen.style.display = "block";
    }
});
