const cards = [
  // Teasing & Anticipation
  { text: "Slow Kiss – Lock lips for 60 seconds without using hands", timer: 60, intensity: 2 },
  { text: "Neck Nibbles – Lightly kiss and bite your partner's neck for 30 seconds", timer: 30, intensity: 2 },
  { text: "Sensual Undressing – Slowly remove one piece of clothing", intensity: 3 },
  { text: "Blindfolded Touch – Trace their body with fingertips while blindfolded", timer: 120, intensity: 3 },
  { text: "Ice Play – Glide an ice cube along their skin, then warm with mouth", intensity: 4 },
  { text: "Feather Strokes – Tease inner thighs with feather/fingers", timer: 60, intensity: 3 },
  { text: "Whisper a Fantasy – Describe a sexy scenario in their ear", intensity: 3 },
  { text: "Taste Test – Blindfold partner and feed them something sweet", intensity: 2 },
  { text: "Lipstick Mark – Write a secret word on skin using lips", intensity: 2 },
  { text: "Temperature Play – Alternate warm breath/cool licking on neck", intensity: 3 },
  { text: "Mirror Seduction – Touch while making eye contact in mirror", timer: 60, intensity: 4 },
  { text: "Sensual Shower – Wash partner's body focusing on erogenous zones", intensity: 4 },
  { text: "Clothed Grinding – Dance closely while fully dressed", intensity: 3 },
  { text: "Tied Wrists – Gently restrain wrists (with consent) and tease", intensity: 4 },
  { text: "Hot & Cold – Alternate warm sips and cold kisses", intensity: 3 },
  { text: "Slow Strip – Remove one item every 30 seconds with eye contact", timer: 30, intensity: 4 },
  { text: "Body Worship – Kiss every inch of torso for 2 minutes", timer: 120, intensity: 4 },
  { text: "Tension Builder – Get close to kiss but don't for 10 seconds", timer: 10, intensity: 3 },
  { text: "Sensual Hair Pull – Gently grip hair while kissing neck", intensity: 3 },
  { text: "The Tease – Kiss everywhere except lips for 1 minute", timer: 60, intensity: 3 },

  // Kissing & Oral Pleasure
  { text: "Lip Bite Kiss – Gently bite lower lip while kissing", intensity: 2 },
  { text: "Earlobe Suck – Whisper something dirty while nibbling ear", intensity: 3 },
  { text: "Tongue Tracing – Slowly lick from collarbone to ear", timer: 30, intensity: 3 },
  { text: "Lipstick Game – Leave kiss marks all over chest", intensity: 2 },
  { text: "Deep French Kiss – No hands, just tongues for 30 seconds", timer: 30, intensity: 3 },
  { text: "Kiss & Tell – Kiss body part; partner guesses next", intensity: 2 },
  { text: "Breath Play – Blow softly on neck, then kiss spot", intensity: 2 },
  { text: "Sensual Sucking – Lightly suck fingers one by one", timer: 60, intensity: 3 },
  { text: "Tasting You – Kiss after tasting something sweet/spicy", intensity: 2 },
  { text: "Lip Lock Challenge – Kiss without breaking for 2 minutes", timer: 120, intensity: 3 },
  { text: "Neck Kiss Marathon – Spend 60 seconds only kissing neck", timer: 60, intensity: 3 },
  { text: "Oral Preview – Give 10-second oral tease", timer: 10, intensity: 4 },
  { text: "Sloppy Kiss – Make wettest, messiest kiss possible", intensity: 3 },
  { text: "Kiss & Command – After deep kiss, whisper what you want", intensity: 3 },
  { text: "The Countdown – Tease until they beg", intensity: 4 },
  { text: "No Hands Allowed – Pleasure without using hands", timer: 120, intensity: 4 },
  { text: "Mirror Sexy Talk – Say 3 dirty things in mirror", intensity: 4 },
  { text: "Slow Hand – Touch as slowly as possible for 2 minutes", timer: 120, intensity: 3 },
  { text: "Sensory Deprivation – Blindfold + headphones while teasing", intensity: 5 },
  { text: "The Slow Build – 5 minutes foreplay before stimulation", timer: 300, intensity: 4 },

  // Hot & Heavy
  { text: "Lap Dance – Give slow seductive dance", intensity: 4 },
  { text: "Against the Wall – Push against wall and kiss passionately", intensity: 4 },
  { text: "The 10-Second Tease – Oral for only 10 seconds", timer: 10, intensity: 5 },
  { text: "Power Play – One partner gives orders for 5 minutes", timer: 300, intensity: 5 },
  { text: "Role-Play – Pretend you're strangers meeting first time", intensity: 4 },
  { text: "Sensual Spanking – Light spanks then kisses", intensity: 5 },
  { text: "Mutual Masturbation – Watch each other self-pleasure", intensity: 5 },
  { text: "Clothed vs Naked – One dressed, one undressed slowly", intensity: 4 },
  { text: "The 60-Second Rule – Do whatever you want for 60s", timer: 60, intensity: 5 },
  { text: "The Forbidden Zone – Pick one no-touch area for 5 minutes", timer: 300, intensity: 4 },
];

let player1 = "", player2 = "";
let currentPlayer = 0;
let currentCard = null;
let flipped = false;
let cardIndex = 0;
let timerInterval;

const startBtn = document.getElementById("start-button");
const nextBtn = document.getElementById("next-button");
const card = document.getElementById("card");
const cardBack = document.getElementById("card-back");
const timerDisplay = document.getElementById("timer");
const turnDisplay = document.getElementById("player-turn");

startBtn.onclick = () => {
  player1 = document.getElementById("player1-name").value.trim();
  player2 = document.getElementById("player2-name").value.trim();

  if (!player1 || !player2) {
    alert("Please enter both names.");
    return;
  }

  shuffle(cards);
  document.getElementById("start-screen").classList.remove("active");
  document.getElementById("game-screen").classList.add("active");
  updateTurn();
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

card.onclick = () => {
  if (flipped || cardIndex >= cards.length) return;
  flipped = true;

  currentCard = cards[cardIndex];
  card.classList.add("flipped");
  cardBack.innerText = currentCard.text;

  if (currentCard.timer) {
    startTimer(currentCard.timer);
  } else {
    nextBtn.disabled = false;
  }
};

nextBtn.onclick = () => {
  card.classList.remove("flipped");
  flipped = false;
  cardIndex++;
  nextBtn.disabled = true;
  timerDisplay.innerText = "";

  if (cardIndex >= cards.length) {
    cardBack.innerText = "You've completed all the spicy cards!";
    turnDisplay.innerText = "Game Over!";
    card.onclick = null;
    return;
  }

  currentPlayer = (currentPlayer + 1) % 2;
  updateTurn();
};

function updateTurn() {
  const name = currentPlayer === 0 ? player1 : player2;
  turnDisplay.innerText = `${name}'s Turn`;
}

function startTimer(seconds) {
  let remaining = seconds;
  timerDisplay.innerText = `Time: ${remaining}s`;

  timerInterval = setInterval(() => {
    remaining--;
    timerDisplay.innerText = `Time: ${remaining}s`;
    if (remaining <= 0) {
      clearInterval(timerInterval);
      nextBtn.disabled = false;
      timerDisplay.innerText = "Time's up!";
    }
  }, 1000);
}