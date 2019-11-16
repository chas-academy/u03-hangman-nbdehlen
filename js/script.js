
/*********************************************************************************************
 * I'm terribly sorry there are no meatballs to go with the spaghetti :P                     *
 *                                                                                           *
 * I had a think on how to apply any of the OOP concepts but ultimately found it confusing   *
 * and would love input on how I could refactor some of my code.                             *
 *                                                                                           *
 * Apart from const riddle and const wordList what parts would make sense to put in modules? *
 *                                                                                           *
 * Apologies for the DOM selectors and event listeners being all over the place              *
 ********************************************************************************************/

 
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
let selectedWord = "";
let alreadyGuessed = [];
let correctGuessed = [];
let incorrectGuessed = [];
const maxGuesses = 6;
const letterButtonEls = document.querySelectorAll("#letterButtons > li > button");
const letterBoxEls = document.querySelector("#letterBoxes > ul");
const overlay = document.querySelector('.img-overlay > img');
const message = document.querySelector("#message");
const lives = document.querySelector('#lives');
const livesCounter = document.querySelector('#lives > p');
const opacityDefault = 1; //adjust 

// Start game global
let gameStarted = false;
const startGameBtnEl = document.querySelector('#startGameBtn');
startGameBtnEl.addEventListener('click', startGame);

// Audio global
let isPlaying = true;
const scottAudio = document.querySelector('#scott-audio');
const audioBtn = document.querySelector('.audio-btn');
audioBtn.addEventListener('click', audioToggle);
const audioIcon = document.querySelector('#audio-icon');

// Dropdown global
let ddToggle = false;
const ddImg = document.querySelector('#instructions-img');
const ddBtn = document.querySelector('.instructions');
ddBtn.addEventListener('click', dropdownToggle);
const ddHidden = document.querySelector('.hidden-dropdown');

// Reset-/startfunktion
function startGame() {
  removeLetterBoxes();
  removeDisableLetterButtons();
  randomWordFunc();
  createLetterBoxes();
  buttonClickListener();

  overlay.style.opacity = 1;
  message.innerHTML = `${selectedRiddle}`;
  alreadyGuessed = [];
  correctGuessed = [];
  incorrectGuessed = [];
  if (!gameStarted && isPlaying) {
    scottAudio.play();
  }
  startGameBtnEl.innerHTML = "Start over";
  livesCounter.innerHTML = '6';
  lives.style.display = "block";
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
function randomWordFunc() {
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

// Event listener for the visual keyboard
function buttonClickListener() {
  for (let i = 0; i < letterButtonEls.length; i++) {
    letterButtonEls[i].addEventListener("click", guess)
  }
}

// Function for key press
    function keyboardPress (e) {
    isLetter(e.key);
  }

// Check if keypress matches A-Z case insensitive and letter not already guessed.
// Loop through letterButtonEls to find the matching letterButton and disable it
// Call checkGuess function only if userGuess passed the if statement
function isLetter(str) {
  if (str.length === 1 && str.match(/[a-z]/i) && alreadyGuessed.indexOf(str.toLowerCase()) < 0) {
    userGuess = str.toLowerCase();
    for (let i = 0; i < letterButtonEls.length; i++) {
      if (letterButtonEls[i].value == userGuess.toUpperCase()) {
        letterButtonEls[i].disabled = true;
      }
    }
    checkGuess(userGuess);
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
    if (selectedWord[i].includes(userGuess)) {
      // Get right amount of the letter
      correctGuessed += userGuess;

      // Add to letterBoxes
      listInput = letterBoxEls.querySelectorAll("li > input");
      listInput[i].value = userGuess.toUpperCase();
    }
  }

  if (!selectedWord.includes(userGuess)) {
    incorrectGuessed += userGuess;
    // Opacity for cover image on each incorrect guess. 
    overlay.style.opacity -= (1 / maxGuesses);
    livesCounter.innerHTML = `${maxGuesses-incorrectGuessed.length}`;
  }
  alreadyGuessed += userGuess;
  checkEndGame();
}

// Win and lose conditions
// remove Event listener for the physical keyboard
function checkEndGame() {
  if (correctGuessed.length === selectedWord.length) {
    disableLetterButtons();
    message.innerHTML = "<p>You solved the riddle. All is well...</p>";
    overlay.style.transition = 'opacity 2s';
    overlay.style.opacity = 1;

    document.removeEventListener("keyup", keyboardPress, true);
  } else if (incorrectGuessed.length === maxGuesses) {
    disableLetterButtons();
    message.innerHTML = "<p>There is nothing left of you... </p>";
    document.removeEventListener("keyup", keyboardPress, true);
  }
}

// Audio toggle and volume icon toggle (no need for if/else of return the if)
function audioToggle() {
  if (!isPlaying) {
    scottAudio.play();
    audioIcon.src = "images/volume-highb.png";
    isPlaying = true;
    return;
  }
    scottAudio.pause();
    audioIcon.src = "images/volume-off.png";
    isPlaying = false;
}

// Dropdown toggle (no need for if/else of return the if)
function dropdownToggle() {
  if (!ddToggle) {
    ddImg.style.transform = "rotate(-180deg)"; // Rotate dropdown icon
    ddImg.style.transition = "transform 0.3s" // Animate dropdown icon change of state
    ddHidden.style.display = "block";         // Unhide dropdown
    ddToggle = true;
    return;
  } 
    ddImg.style.transform = "rotate(0deg)";
    ddImg.style.transition = "transform 0.3s"
    ddHidden.style.display = "none";
    ddToggle = false;
}
