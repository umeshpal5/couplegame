document.addEventListener('DOMContentLoaded', function() {
    // Game Data
    const cardDecks = {
        romantic: [
            "Stare into each other's eyes for [30s]",
            "Share your favorite memory together",
            "Slow dance for [1m]",
            "Whisper something you love about them",
            "Plan your dream vacation together",
            "Play thumb war (best of 3)",
            "Exchange massages for [2m]",
            "Say 'I love you' in a funny voice",
            "Recreate your first date memory",
            "Write love notes to each other"
        ],
        spicy: [
            {
                text: "Slow Kiss – Lock lips for 60 seconds without using hands",
                timer: "[60s]",
                intensity: 2
            },
            {
                text: "Neck Nibbles – Lightly kiss and bite your partner's neck for 30 seconds",
                timer: "[30s]",
                intensity: 2
            },
            {
                text: "Blindfolded Touch – Partner wears a blindfold; you trace their body with your fingertips",
                timer: "[2m]",
                intensity: 3
            },
            {
                text: "Tongue Tracing – Slowly lick from their collarbone to their ear",
                timer: "[30s]",
                intensity: 3
            },
            {
                text: "Sensual Sucking – Lightly suck their fingers one by one",
                timer: "[1m]",
                intensity: 3
            },
            {
                text: "The Forbidden Zone – Pick one body part they can't touch for 5 minutes",
                timer: "[5m]",
                intensity: 3
            },
            {
                text: "Slow Strip – Remove one clothing item every 30 seconds while maintaining eye contact",
                timer: "[30s per item]",
                intensity: 3
            },
            {
                text: "Body Worship – Spend 2 minutes kissing every inch of their torso",
                timer: "[2m]",
                intensity: 3
            },
            {
                text: "Tension Builder – Get close enough to kiss… but don't. Hold for 10 seconds",
                timer: "[10s]",
                intensity: 2
            },
            {
                text: "Lip Bite Kiss – Gently bite their lower lip while kissing",
                intensity: 2
            },
            {
                text: "Earlobe Suck – Whisper something dirty while nibbling their ear",
                intensity: 3
            },
            {
                text: "Lipstick Game – Leave kiss marks all over their chest",
                intensity: 2
            },
            {
                text: "Deep French Kiss – No hands, just tongues exploring for 30 seconds",
                timer: "[30s]",
                intensity: 3
            },
            {
                text: "Kiss & Tell – Kiss a body part; partner guesses where next",
                intensity: 2
            },
            {
                text: "Breath Play – Blow softly on their neck, then kiss the spot",
                intensity: 2
            },
            {
                text: "Tasting You – Kiss your partner after tasting something sweet/spicy",
                intensity: 2
            },
            {
                text: "The Tease – Kiss everywhere except their lips for 1 minute",
                timer: "[1m]",
                intensity: 3
            }
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
        timer: null,
        currentIntensity: 2, // 1=Mild, 2=Medium, 3=Hot
        sounds: {
            flip: document.getElementById("flip-sound"),
            timer: document.getElementById("timer-sound")
        }
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
        intensityBtns: document.querySelectorAll(".intensity-btns button")
    };

    // Initialize Game
    function init() {
        // Event Listeners
        el.startBtn.addEventListener("click", startGame);
        el.backBtn.addEventListener("click", backToMenu);
        el.nextBtn.addEventListener("click", nextCard);
        el.spicyMenu.addEventListener("change", toggleSpicyMode);
        el.spicyGame.addEventListener("change", toggleSpicyMode);
        el.card.addEventListener("click", flipCard);
        
        // Intensity Level Buttons
        el.intensityBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                setIntensityLevel(parseInt(this.dataset.level));
            });
        });
        
        // iOS touch fix
        document.addEventListener('touchstart', function(){}, {passive: true});
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
            if (confirm("You've used all cards! Start over?")) {
                game.usedCards = [];
            } else {
                return;
            }
        }
        
        // Get random card
        let card;
        let attempts = 0;
        
        do {
            if (game.isSpicyMode && Math.random() > 0.3) { // 30% chance for spicy card
                const spicyCards = cardDecks.spicy.filter(c => c.intensity <= game.currentIntensity);
                const availableSpicy = spicyCards.filter(c => !game.usedCards.includes(c.text));
                if (availableSpicy.length > 0) {
                    card = availableSpicy[Math.floor(Math.random() * availableSpicy.length)];
                }
            } else {
                const availableCards = cardDecks.romantic.filter(c => !game.usedCards.includes(c));
                if (availableCards.length > 0) {
                    card = availableCards[Math.floor(Math.random() * availableCards.length)];
                }
            }
            attempts++;
        } while (!card && attempts < 100);
        
        if (!card) {
            alert("No available cards found. Resetting deck.");
            game.usedCards = [];
            return;
        }
        
        // Mark as used
        game.usedCards.push(typeof card === 'string' ? card : card.text);
        
        // Display card
        displayCard(card);
        
        // Play sound
        if (game.sounds.flip) {
            game.sounds.flip.currentTime = 0;
            game.sounds.flip.play();
        }
        
        game.isCardFlipped = true;
        el.nextBtn.classList.remove("hidden");
        switchPlayer();
    }

    function displayCard(card) {
        // Clear previous card
        el.cardText.innerHTML = '';
        
        if (typeof card === 'string') {
            // Romantic card (string)
            const text = card.replace(/\[\d+[sm]\]/g, '').trim();
            el.cardText.innerHTML = `<p class="card-desc">${text}</p>`;
            
            // Handle timer
            const timeMatch = card.match(/\[(\d+)([sm])\]/);
            if (timeMatch) {
                startTimer(parseInt(timeMatch[1]), timeMatch[2]);
            } else {
                el.timerContainer.classList.add("hidden");
            }
        } else {
            // Spicy card (object)
            const title = document.createElement('h3');
            title.className = 'card-title';
            title.textContent = card.text.split('–')[0].trim();
            
            const desc = document.createElement('p');
            desc.className = 'card-desc';
            desc.textContent = card.text.split('–')[1].trim();
            
            el.cardText.appendChild(title);
            el.cardText.appendChild(desc);
            
            // Intensity indicator
            if (card.intensity) {
                const intensity = document.createElement('div');
                intensity.className = `intensity-indicator intensity-${card.intensity}`;
                intensity.textContent = ['Mild', 'Medium', 'Hot'][card.intensity - 1];
                el.cardText.appendChild(intensity);
            }
            
            // Handle timer
            if (card.timer) {
                const timeMatch = card.timer.match(/\[(\d+)([sm])\]/);
                if (timeMatch) {
                    startTimer(parseInt(timeMatch[1]), timeMatch[2]);
                }
            } else {
                el.timerContainer.classList.add("hidden");
            }
        }
        
        // Flip card
        el.card.classList.add("flipped");
    }

    function startTimer(duration, unit) {
        clearInterval(game.timer);
        const totalSeconds = unit === 'm' ? duration * 60 : duration;
        let timeLeft = totalSeconds;
        
        el.timerBar.style.width = "100%";
        el.timerText.textContent = formatTime(timeLeft);
        el.timerContainer.classList.remove("hidden");
        
        game.timer = setInterval(() => {
            timeLeft--;
            el.timerBar.style.width = `${(timeLeft / totalSeconds) * 100}%`;
            el.timerText.textContent = formatTime(timeLeft);
            
            if (timeLeft <= 0) {
                clearInterval(game.timer);
                if (game.sounds.timer) {
                    game.sounds.timer.currentTime = 0;
                    game.sounds.timer.play();
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
        el.nextBtn.classList.add("hidden");
        game.isCardFlipped = false;
        el.timerContainer.classList.add("hidden");
    }

    function toggleSpicyMode() {
        game.isSpicyMode = el.spicyGame.checked;
        updateDeck();
        resetGame();
    }

    function setIntensityLevel(level) {
        game.currentIntensity = level;
        el.intensityBtns.forEach(btn => {
            btn.classList.toggle("active", parseInt(btn.dataset.level) === level);
        });
        updateDeck();
    }

    function updateDeck() {
        game.activeDeck = [...cardDecks.romantic];
        if (game.isSpicyMode) {
            game.activeDeck.push(...cardDecks.spicy.map(c => c.text));
        }
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