const decks = {
    romantic: [
        { text: "Stare into each other's eyes for 1 minute", timer: "[1m]", intensity: 1 },
        { text: "Share your favorite memory together", intensity: 1 },
        { text: "Give each other a 2-minute massage", timer: "[2m]", intensity: 2 },
        { text: "Kiss for 30 seconds", timer: "[30s]", intensity: 2 },
        { text: "Whisper a compliment in their ear", intensity: 1 }
    ],
    spicy: [
        // Your full spicy deck (unchanged) goes here
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

let currentDeck = [];
let currentCardIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("startButton").addEventListener("click", startGame);
    document.getElementById("nextButton").addEventListener("click", showNextCard);
});

function startGame() {
    const selectedDeck = document.getElementById("deckSelect").value;
    currentDeck = [...decks[selectedDeck]];
    shuffleDeck(currentDeck);
    currentCardIndex = 0;
    showNextCard();
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function showNextCard() {
    const card = currentDeck[currentCardIndex];
    const cardText = `${card.text}${card.timer ? " " + card.timer : ""} (Intensity: ${card.intensity})`;
    document.getElementById("cardDisplay").textContent = cardText;

    currentCardIndex++;
    if (currentCardIndex >= currentDeck.length) {
        currentCardIndex = 0;
        shuffleDeck(currentDeck);
    }
}
