// Personalize the nickname, letter, and playful messages here.
const LOVE = {
  nickname: "Janu",
  letter: `Dear Janu, ❤️

I don't always know how to explain my feelings perfectly, but one thing I know for sure is that you mean so much to me. You make me smile in ways you probably don't even realize. I wish I could be beside you right now, hold your hand, and tell you how special you are to me.

No matter how many kilometres separate us or how busy life gets, I hope you always remember that someone is smiling just because you exist.

You're my Janu, my favourite notification, my cutest distraction, and one of the sweetest parts of my life.

I love you so much. ❤️🥹

Forever your person. 💗`,
  noMessages: [
    "Hehe, too slow! 🙈",
    "You can't escape love! 💘",
    "Are you sure, Janu? 🥺",
    "Try again, cutie! 😝",
    "Nope! That button is shy 😂"
  ]
};

const questionScreen = document.querySelector("#question-screen");
const celebrationScreen = document.querySelector("#celebration-screen");
const loveScreen = document.querySelector("#love-screen");
const arena = document.querySelector("#button-arena");
const noButton = document.querySelector("#no-button");
const hint = document.querySelector("#no-hint");
const effectLayer = document.querySelector("#effect-layer");
const announcement = document.querySelector("#announcement");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let noMoveCount = 0;
let heartCount = 0;
let messageTimer = null;

document.querySelectorAll("[data-nickname]").forEach((element) => {
  element.textContent = element.textContent === element.textContent.toUpperCase()
    ? LOVE.nickname.toUpperCase()
    : LOVE.nickname;
});
document.querySelector("#letter-copy").textContent = LOVE.letter;

const song = document.querySelector("#love-song");
const musicNote = document.querySelector("#music-note");
const canPlaySong = window.location.protocol !== "file:";
if (!canPlaySong) {
  musicNote.textContent = "Open this project with VS Code Live Server to play the song.";
}
song.addEventListener("playing", () => {
  musicNote.textContent = "Now playing.";
});
song.addEventListener("error", () => {
  musicNote.textContent = "The song file could not be loaded. Make sure the MP3 is included in the site deployment.";
});

function moveNoButton() {
  const bounds = arena.getBoundingClientRect();
  const noBounds = noButton.getBoundingClientRect();
  const yesBounds = document.querySelector("#yes-button").getBoundingClientRect();
  const width = noBounds.width;
  const height = noBounds.height;
  const padding = 3;
  const maxLeft = Math.max(padding, bounds.width - width - padding);
  const maxTop = Math.max(padding, bounds.height - height - padding);
  const yes = {
    left: yesBounds.left - bounds.left - width * .15,
    right: yesBounds.right - bounds.left + width * .15,
    top: yesBounds.top - bounds.top - height * .15,
    bottom: yesBounds.bottom - bounds.top + height * .15
  };
  let left = padding;
  let top = padding;
  for (let attempt = 0; attempt < 24; attempt += 1) {
    left = padding + Math.random() * (maxLeft - padding);
    top = padding + Math.random() * (maxTop - padding);
    const overlapsYes = left < yes.right && left + width > yes.left &&
      top < yes.bottom && top + height > yes.top;
    if (!overlapsYes) break;
  }
  noButton.classList.add("is-roaming");
  noButton.style.left = `${Math.max(padding, Math.min(maxLeft, left))}px`;
  noButton.style.top = `${Math.max(padding, Math.min(maxTop, top))}px`;
  hint.textContent = LOVE.noMessages[noMoveCount % LOVE.noMessages.length];
  noMoveCount += 1;
  announcement.textContent = hint.textContent;
}

noButton.addEventListener("pointerenter", (event) => {
  if (event.pointerType === "mouse") moveNoButton();
});
noButton.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "touch" || event.pointerType === "pen") {
    event.preventDefault();
    moveNoButton();
  }
});
noButton.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});
window.addEventListener("resize", () => {
  if (!noButton.classList.contains("is-roaming")) return;
  noButton.style.left = "";
  noButton.style.top = "";
  noButton.classList.remove("is-roaming");
});

document.querySelector("#yes-button").addEventListener("click", () => {
  if (canPlaySong) {
    song.play().catch((error) => {
      if (error.name === "NotAllowedError" || error.name === "AbortError") {
        musicNote.textContent = "Tap play to start the song.";
        return;
      }
      console.error("Unable to start the love song.", error);
      musicNote.textContent = "The song could not be played. Use the audio controls to retry.";
    });
  }
  questionScreen.hidden = true;
  celebrationScreen.hidden = false;
  burst(window.innerWidth / 2, window.innerHeight / 2, 72);
  if (!reduceMotion) {
    window.setTimeout(() => {
      celebrationScreen.hidden = true;
      loveScreen.hidden = false;
      revealMessages();
      createFloatingHearts();
      announcement.textContent = `Yay! Your love letter is here, ${LOVE.nickname}.`;
    }, 2200);
  } else {
    window.setTimeout(() => {
      celebrationScreen.hidden = true;
      loveScreen.hidden = false;
      revealMessages();
      createFloatingHearts();
      announcement.textContent = `Yay! Your love letter is here, ${LOVE.nickname}.`;
    }, 250);
  }
});

function revealMessages() {
  const messages = [...document.querySelectorAll(".love-message")];
  messages.forEach((message, index) => {
    messageTimer = window.setTimeout(() => {
      message.classList.add("is-visible");
      if (index === messages.length - 1) {
        window.setTimeout(() => {
          const finalMessage = document.querySelector("#final-message");
          finalMessage.hidden = false;
          finalMessage.classList.add("is-visible");
        }, reduceMotion ? 40 : 700);
      }
    }, reduceMotion ? index * 120 : index * 1500 + 350);
  });
}

function burst(x, y, amount, symbols = ["♥", "♡", "✦", "✧", "💕"]) {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < amount; index += 1) {
    const particle = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const distance = 55 + Math.random() * 180;
    particle.className = "effect-particle";
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.setProperty("--x", `${x}px`);
    particle.style.setProperty("--y", `${y}px`);
    particle.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    particle.style.setProperty("--size", `${13 + Math.random() * 20}px`);
    particle.style.setProperty("--duration", `${1.1 + Math.random() * 1.1}s`);
    particle.style.setProperty("--spin", `${Math.random() * 300 - 150}deg`);
    particle.style.setProperty("--particle-color", ["#ed6b8b", "#c77ad0", "#f6a8b9", "#ffd1a6"][index % 4]);
    fragment.append(particle);
    window.setTimeout(() => particle.remove(), 2400);
  }
  effectLayer.append(fragment);
}

function createFloatingHearts() {
  const layer = document.querySelector("#floating-heart-layer");
  const positions = [
    [7, 33], [83, 25], [14, 69], [88, 66], [27, 18], [72, 43],
    [4, 83], [94, 40], [37, 77], [66, 14], [21, 49], [78, 84]
  ];
  positions.forEach(([left, top], index) => {
    const heart = document.createElement("button");
    heart.type = "button";
    heart.className = "tap-heart";
    heart.textContent = index % 3 === 0 ? "♡" : "♥";
    heart.setAttribute("aria-label", "Collect a little heart");
    heart.style.left = `${left}%`;
    heart.style.top = `${top}%`;
    heart.style.animationDelay = `${-(index * .47)}s`;
    heart.style.animationDuration = `${5 + (index % 4)}s`;
    heart.addEventListener("click", () => {
      heartCount += 1;
      document.querySelector("#heart-count").textContent = String(heartCount);
      const rect = heart.getBoundingClientRect();
      burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 8, ["♥", "♡", "✦"]);
      announcement.textContent = `${heartCount} ${heartCount === 1 ? "heart" : "hearts"} collected!`;
      heart.remove();
      window.setTimeout(() => {
        if (layer.children.length < 8) addReplacementHeart(layer);
      }, 1400);
    });
    layer.append(heart);
  });
}

function addReplacementHeart(layer) {
  const heart = document.createElement("button");
  heart.type = "button";
  heart.className = "tap-heart";
  heart.textContent = "♥";
  heart.setAttribute("aria-label", "Collect a little heart");
  heart.style.left = `${5 + Math.random() * 88}%`;
  heart.style.top = `${18 + Math.random() * 68}%`;
  heart.style.animationDelay = `${-Math.random() * 4}s`;
  heart.addEventListener("click", () => {
    heartCount += 1;
    document.querySelector("#heart-count").textContent = String(heartCount);
    const rect = heart.getBoundingClientRect();
    burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 8, ["♥", "♡", "✦"]);
    announcement.textContent = `${heartCount} ${heartCount === 1 ? "heart" : "hearts"} collected!`;
    heart.remove();
    window.setTimeout(() => {
      if (layer.children.length < 8) addReplacementHeart(layer);
    }, 1400);
  });
  layer.append(heart);
}

document.querySelector("#hug-button").addEventListener("click", (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 27, ["🤗", "♥", "💕", "♡"]);
  announcement.textContent = `Sending a big, warm hug to ${LOVE.nickname}!`;
});

document.querySelector("#kiss-button").addEventListener("click", (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 30, ["😘", "💋", "♥", "💕"]);
  announcement.textContent = "A shower of kisses, just for you!";
});

const letterBackdrop = document.querySelector("#letter-backdrop");
const letterButton = document.querySelector("#letter-button");
const letterClose = document.querySelector("#letter-close");
letterButton.addEventListener("click", () => {
  letterBackdrop.hidden = false;
  letterClose.focus();
});
function closeLetter() {
  letterBackdrop.hidden = true;
  letterButton.focus();
}
letterClose.addEventListener("click", closeLetter);
letterBackdrop.addEventListener("click", (event) => {
  if (event.target === letterBackdrop) closeLetter();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !letterBackdrop.hidden) closeLetter();
});

if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let lastMove = 0;
  document.addEventListener("pointermove", (event) => {
    if (loveScreen.hidden || performance.now() - lastMove < 50) return;
    lastMove = performance.now();
    const x = (event.clientX / window.innerWidth - .5) * 8;
    const y = (event.clientY / window.innerHeight - .5) * 8;
    loveScreen.style.setProperty("--parallax-x", `${x}px`);
    loveScreen.style.setProperty("--parallax-y", `${y}px`);
  }, { passive: true });
}
