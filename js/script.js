// Global variables, event listeners and DOM elements
const riddle = [
"I am believed to be only one dimensional, and tinier than anything can be, and \n\
there are many who say that I am the basis of all that we see. What am I?",

"I am sometimes powerful, I am sometimes complex or deep, I can be blind, lost, or profound. \n\
What am I?",

"I'm a god, a planet, and measurer of heat. Who am I?",

"Only one color, but not one size, Stuck at the bottom, yet easily flies. Present in sun, but \n\
not in rain, Doing no harm, and feeling no pain. What is it?", 

"I make you weak at the worst of all times. I keep you safe, I keep you fine. I make your hands \n\
 sweat, and your heart grow cold, I visit the weak, but seldom the bold. What am I?"
]
const wordList = ["string", "love", "mercury", "shadow", "fear"];
let selectedWord = new String;
let alreadyGuessed = [];
let correctGuessed = [];
let incorrectGuessed = [];
const maxGuesses = 6;
const opacityDefault = 1;
const letterButtonEls = document.querySelectorAll("#letterButtons > li > button");
const letterBoxEls = document.querySelector("#letterBoxes > ul");
const imgOverlayEl = document.querySelector('.img-overlay > img');
const gameMessageEl = document.querySelector("#message");
const livesEl = document.querySelector('#lives');
const livesCounterEl = document.querySelector('#lives > p');

// Start game global
let gameStarted = false;
const startGameBtnEl = document.querySelector('#startGameBtn');
startGameBtnEl.addEventListener('click', startGame);

// Audio global
let isPlaying = true;
const scottAudioEl = document.querySelector('#scott-audio');
const audioBtnEl = document.querySelector('.audio-btn');
audioBtnEl.addEventListener('click', audioToggle);
const audioIconEl = document.querySelector('#audio-icon');

// Dropdown global
let ddToggle = false;
const ddImgEl = document.querySelector('#instructions-img');
const ddBtnEl = document.querySelector('.instructions');
ddBtnEl.addEventListener('click', dropdownToggle);
const ddHiddenEl = document.querySelector('.hidden-dropdown');

// Reset-/startfunction
function startGame() {
  removeLetterBoxes();
  removeDisableLetterButtons();
  randomWord();
  createLetterBoxes();
  buttonClickListener();

  imgOverlayEl.style.opacity = 1;
  gameMessageEl.innerHTML = selectedRiddle;
  alreadyGuessed = [];
  correctGuessed = [];
  incorrectGuessed = [];

  if (!gameStarted && isPlaying) {
    scottAudioEl.play();
  }
  
  startGameBtnEl.innerHTML = "Restart";
  livesCounterEl.innerHTML = '6';
  livesEl.style.display = "block";
  gameStarted = true;

  // Event listener for the physical keyboard
  document.addEventListener("keyup", keyboardPress, true);
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
  if (gameStarted) {
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

// Choose a random word from wordList array and corresponding riddle
function randomWord() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  selectedRiddle = riddle[wordList.indexOf(selectedWord)];
}

// Add letterBoxEls for the chosen random word
function createLetterBoxes() {
  for (let i = 0; i < selectedWord.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = "<input type='text' disabled value='&nbsp'>";
    letterBoxEls.appendChild(li);
  }
}

// Function for keypress guess
    function keyboardPress (e) {
      keypressIsLetter(e.key);
  }

// Check if keypress matches A-Z case insensitive and letter not already guessed.
// Call checkGuess function only if keyboardGuess passed the if statement
function keypressIsLetter(keyboardGuess) {
  if (keyboardGuess.length === 1 && keyboardGuess.match(/[a-z]/i) && 
  alreadyGuessed.indexOf(keyboardGuess.toLowerCase()) < 0) {
    userGuess = keyboardGuess.toLowerCase();
    disableLetterButtonKeyboard();
    checkGuess(userGuess);
  }
}

// Loop through letterButtonEls to find the matching letterButton and disable it
function disableLetterButtonKeyboard() {
  for (let i = 0; i < letterButtonEls.length; i++) {
    if (letterButtonEls[i].value === userGuess.toUpperCase()) {
      letterButtonEls[i].disabled = true;
    }
  }
}

// Event listener for the visual keyboard
function buttonClickListener() {
  for (let i = 0; i < letterButtonEls.length; i++) {
    letterButtonEls[i].addEventListener("click", clickGuess)
  }
}

// Get the mouse click guess
function clickGuess() {
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
    if (selectedWord[i].includes(userGuess)) {
      // Get right amount of the letter
      correctGuessed += userGuess;

      // Add to letterBoxes
      listInput = letterBoxEls.querySelectorAll("li");
      listInput[i].innerHTML = `<input type='text' value=${userGuess.toUpperCase()}>`;
    }
  }

  if (!selectedWord.includes(userGuess)) {
    incorrectGuessed += userGuess;
    // Opacity for cover image on each incorrect guess. 
    imgOverlayEl.style.opacity -= (1 / maxGuesses);
    livesCounterEl.innerHTML = maxGuesses-incorrectGuessed.length;
  }
  alreadyGuessed += userGuess;
  checkEndGame();
}

// Win and lose conditions
// remove Event listener for the physical keyboard
function checkEndGame() {
  if (correctGuessed.length === selectedWord.length) {
    disableLetterButtons();
    gameMessageEl.innerHTML = "<p>You solved the riddle. All is well...</p>";
    imgOverlayEl.style.transition = 'opacity 2s';
    imgOverlayEl.style.opacity = 1;
    document.removeEventListener("keyup", keyboardPress, true);
  } else if (incorrectGuessed.length === maxGuesses) {
    disableLetterButtons();
    gameMessageEl.innerHTML = "<p>There is nothing left of you... </p>";
    document.removeEventListener("keyup", keyboardPress, true);
  }
}

// Audio toggle and volume icon toggle (no need for if/else)
function audioToggle() {
  if (!isPlaying) {
    scottAudioEl.play();
    audioIconEl.src = "images/volume-highb.png";
    isPlaying = true;
    return;
  }
  scottAudioEl.pause();
  audioIconEl.src = "images/volume-off.png";
    isPlaying = false;
}

// Dropdown toggle (no need for if/else)
function dropdownToggle() {
  if (!ddToggle) {
    ddImgEl.style.transform = "rotate(-180deg)"; // Rotate dropdown icon
    ddImgEl.style.transition = "transform 0.3s" // Animate dropdown icon change of state
    ddHiddenEl.style.display = "block";         // Unhide dropdown
    ddToggle = true;
    return;
  } 
  ddImgEl.style.transform = "rotate(0deg)";
  ddImgEl.style.transition = "transform 0.3s"
  ddHiddenEl.style.display = "none";
    ddToggle = false;
}
