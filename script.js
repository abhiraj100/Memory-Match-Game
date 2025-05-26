const icons = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍍", "🥝", "🍒"];
let cards = [...icons, ...icons];
let firstCard = null;
let secondCard = null;
let matches = 0;
let attempts = 0;
let bestScore = localStorage.getItem("bestScore") || 0;

const statusText = document.getElementById("status-text");
const matchesDisplay = document.getElementById("matches");
const attemptsDisplay = document.getElementById("attempts");
const bestScoreDisplay = document.getElementById("best-score");
const cardGrid = document.querySelector(".card-grid");

bestScoreDisplay.textContent = bestScore;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(icon) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.icon = icon;
  card.innerHTML =
    '<span class="front"></span><span class="back">' + icon + "</span>";
  card.addEventListener("click", handleCardClick);
  return card;
}

function resetGame() {
  matches = 0;
  attempts = 0;
  matchesDisplay.textContent = 0;
  attemptsDisplay.textContent = 0;
  statusText.textContent = "Click any card to begin";
  cardGrid.innerHTML = "";
  cards = [...icons, ...icons];
  shuffle(cards);
  cards.forEach((icon) => {
    cardGrid.appendChild(createCard(icon));
  });
}

function handleCardClick() {
  if (this.classList.contains("matched") || this.classList.contains("flipped"))
    return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    attempts++;
    attemptsDisplay.textContent = attempts;

    if (firstCard.dataset.icon === secondCard.dataset.icon) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      matches++;
      matchesDisplay.textContent = matches;
      statusText.textContent = "Match Found!";

      if (matches === icons.length) {
        statusText.textContent = "Congratulations! You matched all!";
        if (!bestScore || attempts < bestScore) {
          localStorage.setItem("bestScore", attempts);
          bestScoreDisplay.textContent = attempts;
        }
      }

      firstCard = null;
      secondCard = null;
    } else {
      statusText.textContent = "Try Again!";
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard = null;
        secondCard = null;
      }, 900);
    }
  }
}

resetGame();
