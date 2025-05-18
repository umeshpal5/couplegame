const cards = [
  // Teasing & Anticipation
  { text: "Slow Kiss – Lock lips for 60 seconds without using hands", timer: 60 },
  { text: "Neck Nibbles – Lightly kiss and bite your partner's neck for 30 seconds", timer: 30 },
  { text: "Sensual Undressing – Slowly remove one piece of clothing" },
  { text: "Blindfolded Touch – Trace their body with fingertips while blindfolded", timer: 120 },
  { text: "Ice Play – Glide an ice cube along their skin, then warm with mouth" },
  { text: "Feather Strokes – Tease inner thighs with feather/fingers", timer: 60 },
  { text: "Whisper a Fantasy – Describe a sexy scenario in their ear" },
  { text: "Taste Test – Blindfold partner and feed them something sweet" },
  { text: "Lipstick Mark – Write a secret word on skin using lips" },
  { text: "Temperature Play – Alternate warm breath/cool licking on neck" },
  { text: "Mirror Seduction – Touch while making eye contact in mirror", timer: 60 },
  { text: "Sensual Shower – Wash partner's body focusing on erogenous zones" },
  { text: "Clothed Grinding – Dance closely while fully dressed" },
  { text: "Tied Wrists – Gently restrain wrists (with consent) and tease" },
  { text: "Hot & Cold – Alternate warm sips and cold kisses" },
  { text: "Slow Strip – Remove one item every 30 seconds with eye contact", timer: 30 },
  { text: "Body Worship – Kiss every inch of torso", timer: 120 },
  { text: "Tension Builder – Get close to kiss but don’t for 10 seconds", timer: 10 },
  { text: "Sensual Hair Pull – Gently grip hair while kissing neck" },
  { text: "The Tease – Kiss everywhere except lips", timer: 60 },

  // Kissing & Oral Pleasure
  { text: "Lip Bite Kiss – Gently bite lower lip while kissing" },
  { text: "Earlobe Suck – Whisper something dirty while nibbling ear" },
  { text: "Tongue Tracing – Slowly lick from collarbone to ear", timer: 30 },
  { text: "Lipstick Game – Leave kiss marks all over chest" },
  { text: "Deep French Kiss – No hands, just tongues", timer: 30 },
  { text: "Kiss & Tell – Kiss body part; partner guesses next" },
  { text: "Breath Play – Blow softly on neck, then kiss spot" },
  { text: "Sensual Sucking – Lightly suck fingers one by one", timer: 60 },
  { text: "Tasting You – Kiss after tasting something sweet/spicy" },
  { text: "Lip Lock Challenge – Kiss without breaking", timer: 120 },
  { text: "Neck Kiss Marathon – Only kiss neck", timer: 60 },
  { text: "Oral Preview – Give 10-second oral tease", timer: 10 },
  { text: "Sloppy Kiss – Make wettest, messiest kiss possible" },
  { text: "Kiss & Command – After deep kiss, whisper what you want" },
  { text: "The Countdown – Tease until they beg" },
  { text: "No Hands Allowed – Pleasure without using hands", timer: 120 },
  { text: "Mirror Sexy Talk – Say 3 dirty things in mirror" },
  { text: "Slow Hand – Touch as slowly as possible", timer: 120 },
  { text: "Sensory Deprivation – Blindfold + headphones while teasing" },
  { text: "The Slow Build – 5 minutes foreplay before stimulation", timer: 300 },

  // Hot & Heavy
  { text: "Lap Dance – Give slow seductive dance" },
  { text: "Against the Wall – Push against wall and kiss passionately" },
  { text: "The 10-Second Tease – Oral for only 10 seconds", timer: 10 },
  { text: "Power Play – One partner gives orders", timer: 300 },
  { text: "Role-Play – Pretend you're strangers meeting first time" },
  { text: "Sensual Spanking – Light spanks then kisses" },
  { text: "The Forbidden Zone – Pick one untouchable body part", timer: 300 },
  { text: "Sensory Game – Use different textures on skin" },
  { text: "Erotic Storytelling – Describe fantasy while touching" },
  { text: "60-Second Rule – Do anything for exactly 60 seconds", timer: 60 },
  { text: "Clothed vs Naked – One dressed, other undresses slowly" },
  { text: "Edging Rule – Bring close to orgasm then stop" },
  { text: "Sensual Restraints – Tie wrists with scarf (consensual)" },
  { text: "Body Writing – Mark where you want to kiss" },
  { text: "The Dare – Partner chooses any card for you" },
  { text: "Temperature Contrast – Alternate warm oil/ice cube" },
  { text: "Tease & Denial – Touch everywhere but where they want", timer: 180 },
  { text: "Focus Game – Stimulate only one erogenous zone", timer: 120 },
  { text: "Whispering Game – Describe actions in low voice" },
  { text: "Power Exchange – Submissive takes control", timer: 600 }
];

let currentPlayer = 0;
let players = [];
let deck = [...cards];
let timerInterval = null;

document.getElementById("startGame").addEventListener("click", () => {
  const p1 = document.getElementById("player1").value.trim();
  const p2 = document.getElementById("player2").value.trim();
  if (!p1 || !p2) return alert("Please enter both player names.");
  players = [p1, p2];
  document.getElementById("setupScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");
  updateTurnIndicator();
});

document.getElementById("card").addEventListener("click", () => {
  if (deck.length === 0) return alert("Game over! No more cards.");
  const cardIndex = Math.floor(Math.random() * deck.length);
  const card = deck.splice(cardIndex, 1)[0];
  document.getElementById("card").innerText = card.text;
  document.getElementById("nextTurn").classList.remove("hidden");

  if (card.timer) {
    let seconds = card.timer;
    document.getElementById("timer").classList.remove("hidden");
    document.getElementById("timerValue").innerText = `${seconds}s`;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      seconds--;
      document.getElementById("timerValue").innerText = `${seconds}s`;
      if (seconds <= 0) {
        clearInterval(timerInterval);
        document.getElementById("timerValue").innerText = "Time's up!";
      }
    }, 1000);
  } else {
    document.getElementById("timer").classList.add("hidden");
  }
});

document.getElementById("nextTurn").addEventListener("click", () => {
  currentPlayer = (currentPlayer + 1) % 2;
  updateTurnIndicator();
  document.getElementById("card").innerText = "Tap to reveal card";
  document.getElementById("nextTurn").classList.add("hidden");
  document.getElementById("timer").classList.add("hidden");
  clearInterval(timerInterval);
});

function updateTurnIndicator() {
  document.getElementById("turnIndicator").innerText = `${players[currentPlayer]}'s Turn`;
}