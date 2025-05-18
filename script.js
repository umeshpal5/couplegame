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
            "Write love notes to each other",
            "Cook a meal together while blindfolded",
            "Read poetry to each other",
            "Give 5 genuine compliments",
            "Create a bucket list together"
        ],
        spicy: [
            // Teasing & Anticipation (20 cards)
            { text: "Slow Kiss – Lock lips for 60 seconds without using hands", timer: "[60s]", intensity: 2 },
            { text: "Neck Nibbles – Lightly kiss and bite your partner's neck for 30 seconds", timer: "[30s]", intensity: 2 },
            { text: "Sensual Undressing – Slowly remove one piece of clothing", intensity: 3 },
            { text: "Blindfolded Touch – Trace their body with fingertips while blindfolded", timer: "[2m]", intensity: 3 },
            { text: "Ice Play – Glide an ice cube along their skin, then warm with mouth", intensity: 4 },
            { text: "Feather Strokes – Tease inner thighs with feather/fingers", timer: "[1m]", intensity: 3 },
            { text: "Whisper a Fantasy – Describe a sexy scenario in their ear", intensity: 3 },
            { text: "Taste Test – Blindfold partner and feed them something sweet", intensity: 2 },
            { text: "Lipstick Mark – Write a secret word on skin using lips", intensity: 2 },
            { text: "Temperature Play – Alternate warm breath/cool licking on neck", intensity: 3 },
            { text: "Mirror Seduction – Touch while making eye contact in mirror", timer: "[1m]", intensity: 4 },
            { text: "Sensual Shower – Wash partner's body focusing on erogenous zones", intensity: 4 },
            { text: "Clothed Grinding – Dance closely while fully dressed", intensity: 3 },
            { text: "Tied Wrists – Gently restrain wrists (with consent) and tease", intensity: 4 },
            { text: "Hot & Cold – Alternate warm sips and cold kisses", intensity: 3 },
            { text: "Slow Strip – Remove one item every 30 seconds with eye contact", timer: "[30s per item]", intensity: 4 },
            { text: "Body Worship – Kiss every inch of torso for [2m]", timer: "[2m]", intensity: 4 },
            { text: "Tension Builder – Get close to kiss but don't for [10s]", timer: "[10s]", intensity: 3 },
            { text: "Sensual Hair Pull – Gently grip hair while kissing neck", intensity: 3 },
            { text: "The Tease – Kiss everywhere except lips for [1m]", timer: "[1m]", intensity: 3 },

            // Kissing & Oral Pleasure (30 cards)
            { text: "Lip Bite Kiss – Gently bite lower lip while kissing", intensity: 2 },
            { text: "Earlobe Suck – Whisper something dirty while nibbling ear", intensity: 3 },
            { text: "Tongue Tracing – Slowly lick from collarbone to ear", timer: "[30s]", intensity: 3 },
            { text: "Lipstick Game – Leave kiss marks all over chest", intensity: 2 },
            { text: "Deep French Kiss – No hands, just tongues for [30s]", timer: "[30s]", intensity: 3 },
            { text: "Kiss & Tell – Kiss body part; partner guesses next", intensity: 2 },
            { text: "Breath Play – Blow softly on neck, then kiss spot", intensity: 2 },
            { text: "Sensual Sucking – Lightly suck fingers one by one", timer: "[1m]", intensity: 3 },
            { text: "Tasting You – Kiss after tasting something sweet/spicy", intensity: 2 },
            { text: "Lip Lock Challenge – Kiss without breaking for [2m]", timer: "[2m]", intensity: 3 },
            { text: "Neck Kiss Marathon – Spend 60 seconds only kissing neck", timer: "[60s]", intensity: 3 },
            { text: "Oral Preview – Give 10-second oral tease", timer: "[10s]", intensity: 4 },
            { text: "Sloppy Kiss – Make wettest, messiest kiss possible", intensity: 3 },
            { text: "Kiss & Command – After deep kiss, whisper what you want", intensity: 3 },
            { text: "The Countdown – Tease until they beg", intensity: 4 },
            { text: "No Hands Allowed – Pleasure without using hands", timer: "[2m]", intensity: 4 },
            { text: "Mirror Sexy Talk – Say 3 dirty things in mirror", intensity: 4 },
            { text: "Slow Hand – Touch as slowly as possible for [2m]", timer: "[2m]", intensity: 3 },
            { text: "Sensory Deprivation – Blindfold + headphones while teasing", intensity: 5 },
            { text: "The Slow Build – 5 minutes foreplay before stimulation", timer: "[5m]", intensity: 4 },

            // Hot & Heavy (30 cards)
            { text: "Lap Dance – Give slow seductive dance", intensity: 4 },
            { text: "Against the Wall – Push against wall and kiss passionately", intensity: 4 },
            { text: "The 10-Second Tease – Oral for only 10 seconds", timer: "[10s]", intensity: 5 },
            { text: "Power Play – One partner gives orders for [5m]", timer: "[5m]", intensity: 5 },
            { text: "Role-Play – Pretend you're strangers meeting first time", intensity: 4 },
            { text: "Sensual Spanking – Light spanks then kisses", intensity: 5 },
            { text: "The Forbidden Zone – Pick one untouchable body part for [5m]", timer: "[5m]", intensity: 5 },
            { text: "Sensory Game – Use different textures on skin", intensity: 4 },
            { text: "Erotic Storytelling – Describe fantasy while touching", intensity: 5 },
            { text: "60-Second Rule – Do anything for exactly 60 seconds", timer: "[60s]", intensity: 5 },
            { text: "Clothed vs Naked – One dressed, other undresses slowly", intensity: 5 },
            { text: "Edging Rule – Bring close to orgasm then stop", intensity: 5 },
            { text: "Sensual Restraints – Tie wrists with scarf (consensual)", intensity: 5 },
            { text: "Body Writing – Mark where you want to kiss", intensity: 3 },
            { text: "The Dare – Partner chooses any card for you", intensity: 4 },
            { text: "Temperature Contrast – Alternate warm oil/ice cube", intensity: 4 },
            { text: "Tease & Denial – Touch everywhere but where they want", timer: "[3m]", intensity: 5 },
            { text: "Focus Game – Stimulate only one erogenous zone", timer: "[2m]", intensity: 4 },
            { text: "Whispering Game – Describe actions in low voice", intensity: 4 },
            { text: "Power Exchange – Submissive takes control for [10m]", timer: "[10m]", intensity: 5 }
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
        currentIntensity: 3
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
        timerContainer: document.getElementById("timer-container")
    };

    // Initialize Game
    function init() {
        el.startBtn.addEventListener("click", startGame);
        el.backBtn.addEventListener("click", backToMenu);
        el.nextBtn.addEventListener("click", nextCard);
        el.spicyMenu.addEventListener("change", toggleSpicyMode);
        el.spicyGame.addEventListener("change", toggleSpicyMode);
        el.card.addEventListener("click", flipCard);
        document.addEventListener('touchstart', function(){}, {passive: true});
    }

    function startGame() {
        game.players[0] = el.player1.value.trim() || "Player 1";
        game.players[1] = el.player2.value.trim() || "Player 2";
        game.isSpicyMode = el.spicyMenu.checked;
        el.spicyGame.checked = game.isSpicyMode;
        
        updateDeck();
        el.welcome.style.display = "none";
        el.game.style.display = "block";
        resetGame();
    }

    function updateDeck() {
        game.activeDeck = [...cardDecks.romantic];
        if (game.isSpicyMode) {
            const filteredSpicy = cardDecks.spicy.filter(card => card.intensity <= game.currentIntensity);
            game.activeDeck.push(...filteredSpicy.map(card => JSON.stringify(card)));
        }
        game.usedCards = [];
    }

    function flipCard() {
        if (game.isCardFlipped) return;
        
        if (game.usedCards.length >= game.activeDeck.length) {
            if (confirm("You've used all cards! Start over?")) {
                game.usedCards = [];
            } else {
                return;
            }
        }
        
        let randomIndex;
        let selectedCard;
        
        do {
            randomIndex = Math.floor(Math.random() * game.activeDeck.length);
            selectedCard = game.activeDeck[randomIndex];
        } while (game.usedCards.includes(selectedCard));
        
        game.usedCards.push(selectedCard);
        displayCard(selectedCard);
        
        const flipSound = document.getElementById("flip-sound");
        if (flipSound) {
            flipSound.currentTime = 0;
            flipSound.play();
        }
        
        game.isCardFlipped = true;
        el.nextBtn.style.display = "block";
        switchPlayer();
    }

    function displayCard(cardStr) {
        try {
            let card;
            if (cardStr.startsWith("{")) {
                card = JSON.parse(cardStr);
                el.cardText.innerHTML = `
                    <h3 style="color: var(--primary); margin-bottom: 10px;">${card.text.split('–')[0]}</h3>
                    <p>${card.text.split('–')[1]}</p>
                    ${card.timer ? `<div class="timer-badge">${card.timer}</div>` : ''}
                `;
                
                if (card.timer) {
                    const timeMatch = card.timer.match(/\[(\d+)([sm])\]/);
                    if (timeMatch) startTimer(parseInt(timeMatch[1]), timeMatch[2]);
                } else {
                    el.timerContainer.style.display = "none";
                }
            } else {
                el.cardText.textContent = cardStr.replace(/\[\d+[sm]\]/g, '').trim();
                const timeMatch = cardStr.match(/\[(\d+)([sm])\]/);
                if (timeMatch) {
                    startTimer(parseInt(timeMatch[1]), timeMatch[2]);
                } else {
                    el.timerContainer.style.display = "none";
                }
            }
            el.card.classList.add("flipped");
        } catch (e) {
            console.error("Error displaying card:", e);
        }
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
                const timerSound = document.getElementById("timer-sound");
                if (timerSound) {
                    timerSound.currentTime = 0;
                    timerSound.play();
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

    init();
});
