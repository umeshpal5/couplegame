document.addEventListener('DOMContentLoaded', function() {
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
            "Kiss passionately for [30s]",
            "Give a sensual massage [3m]",
            "Take turns blindfolded guessing touch locations [1m]",
            "Explore scent connection with shared perfume/oil",
            "Whisper your wildest fantasy in their ear"
        ]
    };

    // Game State
    const game = {
        players: ["Player 1", "Player 2"],
        currentPlayer: 0,
        usedCards: [],
        activeDeck: [],
        isSpicyMode: false,
        isCardFlipped: false,
        timer: null
    };

    // DOM Elements
    const el = {
        welcome: document.getElementById("welcome-screen"),
        game: document.getElementById("game-screen"),
        startBtn: document.getElementById("start-game"),
        backBtn: document.getElementById("back-to-menu"),
        player1: document.getElementById("player1"),
        player2: document.getElementById("player2"),
        turnDisplay: document.getElementById("turn-indicator"),
        cardText: document.getElementById("activity-text"),
        card: document.querySelector(".card"),
        nextBtn: document.getElementById("next-btn"),
        spicyMenu: document.getElementById("spicy-mode"),
        spicyGame: document.getElementById("spicy-toggle"),
        timerBar: document.getElementById("timer-bar"),
        timerText: document.getElementById("timer-text"),
        timerContainer: document.getElementById("timer-container"),
        flipSound: document.getElementById("flip-sound"),
        timerSound: document.getElementById("timer-sound")
    };

    // Initialize
    function init() {
        el.startBtn.addEventListener("click", startGame);
        el.backBtn.addEventListener("click", backToMenu);
        el.nextBtn.addEventListener("click", nextCard);
        el.spicyGame.addEventListener("change", toggleSpicyMode);
        el.card.addEventListener("click", flipCard);
        el.card.addEventListener('touchstart', function(){}, {passive: true});
    }

    function startGame() {
        // Set player names
        game.players[0] = el.player1.value.trim() || "Player 1";
        game.players[1] = el.player2.value.trim() || "Player 2";
        
        // Set spicy mode
        game.isSpicyMode = el.spicyMenu.checked;
        el.spicyGame.checked = game.isSpicyMode;
        
        // Prepare deck
        updateDeck();
        
        // Switch screens
        el.welcome.style.display = "none";
        el.game.style.display = "block";
        
        // Reset game
        resetGame();
    }

    function flipCard() {
        if (game.isCardFlipped) return;
        
        // Check if all cards used
        if (game.usedCards.length >= game.activeDeck.length) {
            alert("All cards used! Resetting deck.");
            game.usedCards = [];
        }
        
        // Get random card
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * game.activeDeck.length);
        } while (game.usedCards.includes(randomIndex));
        
        game.usedCards.push(randomIndex);
        const card = game.activeDeck[randomIndex];
        
        // Display card
        el.cardText.textContent = card.replace(/\[\d+[sm]\]/g, '').trim();
        el.card.classList.add("flipped");
        
        // Handle timer
        const timeMatch = card.match(/\[(\d+)([sm])\]/);
        if (timeMatch) {
            startTimer(parseInt(timeMatch[1]), timeMatch[2]);
        } else {
            el.timerContainer.style.display = "none";
        }
        
        // Play sound
        if (el.flipSound) {
            el.flipSound.currentTime = 0;
            el.flipSound.play();
        }
        
        game.isCardFlipped = true;
        el.nextBtn.style.display = "block";
        switchPlayer();
    }

    function startTimer(duration, unit) {
        clearInterval(game.timer);
        const totalSeconds = unit === 'm' ? duration * 60 : duration;
        let timeLeft = totalSeconds;
        
        el.timerBar.style.width = "100%";
        el.timerText.textContent = formatTime(timeLeft);
        el.timerContainer.style.display = "block";
        
        game.timer = setInterval(() => {
            timeLeft--;
            el.timerBar.style.width = `${(timeLeft / totalSeconds) * 100}%`;
            el.timerText.textContent = formatTime(timeLeft);
            
            if (timeLeft <= 0) {
                clearInterval(game.timer);
                if (el.timerSound) {
                    el.timerSound.currentTime = 0;
                    el.timerSound.play();
                }
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function nextCard() {
        clearInterval(game.timer);
        el.card.classList.remove("flipped");
        el.nextBtn.style.display = "none";
        game.isCardFlipped = false;
        el.timerContainer.style.display = "none";
    }

    function toggleSpicyMode() {
        game.isSpicyMode = el.spicyGame.checked;
        updateDeck();
        resetGame();
    }

    function updateDeck() {
        game.activeDeck = [...cardDecks.romantic];
        if (game.isSpicyMode) {
            game.activeDeck.push(...cardDecks.spicy);
        }
        game.usedCards = [];
    }

    function switchPlayer() {
        game.currentPlayer = (game.currentPlayer + 1) % 2;
        el.turnDisplay.textContent = `${game.players[game.currentPlayer]}'s Turn`;
    }

    function resetGame() {
        nextCard();
        game.currentPlayer = 0;
        el.turnDisplay.textContent = `${game.players[0]}'s Turn`;
    }

    function backToMenu() {
        resetGame();
        el.game.style.display = "none";
        el.welcome.style.display = "block";
    }

    // Start the game
    init();
});