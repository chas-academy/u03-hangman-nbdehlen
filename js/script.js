// Globala variabler
const wordList = ["elektravägen", "hackday", "hänggubbe", "aaa", "bb", "c"];
let selectedWord ="";
let maxGuesses = 6;
let letterButtonEls = document.querySelectorAll("#letterButtons > li > button");
let letterBoxEls;
let gameStarted = false;
let opacityDefault = 1;
let overlay = document.querySelector('.img-overlay > img');
let startGameBtnEl = document.querySelector('#startGameBtn');
startGameBtnEl.addEventListener('click', startGame);
let message = document.querySelector("#message");

// Reset-/startfunktion
function startGame() {
  removeLetterBoxes();
  removeDisableLetterButtons();
  randomWordFunc();
  CreateLetterBoxes();
  buttonClickListener();
  overlay.style.opacity = 1;
  message.innerHTML = "Game is starting! Don't screw it up dum-dum. This isn't the olympics.";
  alreadyGuessed = [];
  correctGuessed = [];
  incorrectGuessed = [];
  gameStarted = true;
}

// Remove disabled attribute on letterButtonEls
function removeDisableLetterButtons() {
  for (let i = 0; i < letterButtonEls.length; i++) {
    letterButtonEls[i].disabled = false;
  }
}

// Remove letter boxes from previous selectedWord if there are any
function removeLetterBoxes() {
  let letterBoxes = document.querySelectorAll("#letterBoxes > ul > li");
    if (gameStarted === true) {
    for (let i = 0; i < selectedWord.length; i++) {
      letterBoxes[i].remove(letterBoxes);
    }
  }
}

// Add disabled attribute to letterButtonEls
function disableLetterButtons() {
  for (let i = 0; i < letterButtonEls.length; i++) {
    letterButtonEls[i].disabled = true;
  }
}

// Choose a random word from wordList array
function randomWordFunc() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
}

// Add letterBoxEls for the chosen random word
function CreateLetterBoxes() {
  letterBoxEls = document.querySelector("#letterBoxes > ul");

  for (let i = 0; i < selectedWord.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = "<input type='text' disabled value='&nbsp'>";
    letterBoxEls.appendChild(li);
    // ******* Add margin or something to make letterBoxes look normal ****
  }
}

// Event listener for the visual keyboard
function buttonClickListener() {
  for (let i = 0; i < letterButtonEls.length; i++) {
    letterButtonEls[i].addEventListener("click", guess)
  }
}

// Get the keypress
function guess() {
  let userGuess = this.value.toLowerCase();
  // Disable the key
  this.disabled = true;
  //Move into function for comparing keypress against selected word and more
  checkGuess(userGuess);
}

// Check the keypress
function checkGuess(userGuess) {
  // loop over letters in selectedWord to find matches with keypress
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i].includes(userGuess) === true) {
      // Get right amount of the letter
      correctGuessed += userGuess;

      // Add to letterBoxes
      let letterBoxEls = document.querySelectorAll("#letterBoxes > ul > li > input");
      letterBoxEls[i].value = userGuess.toUpperCase();
    }
  }

  if (selectedWord.includes(userGuess) === false) {
    incorrectGuessed += userGuess;
    // Opacity for cover image on each incorrect guess. 
    overlay.style.opacity = opacityDefault - (incorrectGuessed.length/maxGuesses);
  }

  alreadyGuessed += userGuess;
  checkEndGame();
}

// Win and lose conditions

function checkEndGame() {
  if (correctGuessed.length === selectedWord.length) {
    disableLetterButtons();
    message.innerHTML = "<p> Congratulations you little sausage, you won! </p>";
    hangman.src=("https://media.giphy.com/media/uLiEXaouJVkuA/giphy.gif");

  } else if (incorrectGuessed.length === maxGuesses) {
    disableLetterButtons();
    message.innerHTML = "<p> You reached the maximum amount of guesses and hung for it! </p>";

  } else {
    message.innerHTML = "<p> Your guesses are totally on point, you fiend! </p>";
  }
}

// Audio toggle and volume icon toggle
let isPlaying = false;
let scottAudio = document.querySelector('#scott-audio');
let audioBtn = document.querySelector('.audio-btn');
audioBtn.addEventListener('click', audioToggle);
let audioIcon = document.querySelector('#audio-icon');

function audioToggle() {
  if (isPlaying === false) {
    scottAudio.play();
    audioIcon.src="images/volume-highb.png";
    isPlaying = true;

  } else if (isPlaying === true) {
    scottAudio.pause();
    audioIcon.src="images/volume-off.png";
    isPlaying = false;
  }
}