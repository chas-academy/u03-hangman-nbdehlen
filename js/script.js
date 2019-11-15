
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
let maxGuesses = 6;
let letterButtonEls = document.querySelectorAll("#letterButtons > li > button");
let letterBoxEls = document.querySelector("#letterBoxes > ul");
let gameStarted = false;
let overlay = document.querySelector('.img-overlay > img');
let startGameBtnEl = document.querySelector('#startGameBtn');
startGameBtnEl.addEventListener('click', startGame);
let message = document.querySelector("#message");
let lives = document.querySelector('#lives');
let livesCounter = document.querySelector('#lives > p');
let opacityDefault = 1; //adjust 

// Audio global
let isPlaying = true;
let scottAudio = document.querySelector('#scott-audio');
let audioBtn = document.querySelector('.audio-btn');
audioBtn.addEventListener('click', audioToggle);
let audioIcon = document.querySelector('#audio-icon');

// Dropdown global
let ddToggle = false;
let ddImg = document.querySelector('#instructions-img');
let ddBtn = document.querySelector('.instructions');
ddBtn.addEventListener('click', dropdownToggle);
let ddHidden = document.querySelector('.hidden-dropdown');

// Reset-/startfunktion
function startGame() {
  removeLetterBoxes();
  removeDisableLetterButtons();
  randomWordFunc();
  CreateLetterBoxes();
  buttonClickListener();

  overlay.style.opacity = 1;
  message.innerHTML = `${selectedRiddle}`;
  alreadyGuessed = [];
  correctGuessed = [];
  incorrectGuessed = [];
  if (gameStarted === false && isPlaying === true) {
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

// Choose a random word from wordList array and corresponding riddle
function randomWordFunc() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  selectedRiddle = riddle[wordList.indexOf(selectedWord)];
}

// Add letterBoxEls for the chosen random word
function CreateLetterBoxes() {
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
    if (selectedWord[i].includes(userGuess) === true) {
      // Get right amount of the letter
      correctGuessed += userGuess;

      // Add to letterBoxes
      listInput = letterBoxEls.querySelectorAll("li > input");
      listInput[i].value = userGuess.toUpperCase();
    }
  }

  if (selectedWord.includes(userGuess) === false) {
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
    imgAnimation(0); //Call image animation back to full opacity
    document.removeEventListener("keyup", keyboardPress, true);
  } else if (incorrectGuessed.length === maxGuesses) {
    disableLetterButtons();
    message.innerHTML = "<p>There is nothing left of you... </p>";
    document.removeEventListener("keyup", keyboardPress, true);
  }
}

// Audio toggle and volume icon toggle
function audioToggle() {
  if (isPlaying === false) {
    scottAudio.play();
    audioIcon.src = "images/volume-highb.png";
    isPlaying = true;

  } else if (isPlaying === true) {
    scottAudio.pause();
    audioIcon.src = "images/volume-off.png";
    isPlaying = false;
  }
}

// Dropdown toggle
function dropdownToggle() {
  if (ddToggle === false) {
    ddImg.style.transform = "rotate(-180deg)"; // Rotate dropdown icon
    ddImg.style.transition = "transform 0.3s" // Animate dropdown icon change of state
    ddHidden.style.display = "block";         // Unhide dropdown
    ddToggle = true;
  } else if (ddToggle === true) {
    ddImg.style.transform = "rotate(0deg)";
    ddImg.style.transition = "transform 0.3s"
    ddHidden.style.display = "none";
    ddToggle = false;
  }
}

// Image revert animation on win
function imgAnimation(counter) {
  let overlayNumber = Number(overlay.style.opacity);
  if (counter < 50) {
    setTimeout(function () {
      counter++;
      overlay.style.opacity = overlayNumber + 0.02 * counter;
      imgAnimation(counter);
    }, 150);
  }
}
