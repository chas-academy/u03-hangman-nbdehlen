// Globala variabler
const riddle = ["I am believed to be only one dimensional, and tinier than anything can be, and \n\
there are many who say that I am the basis of all that we see. What am I?", 

"I am sometimes powerful, I am sometimes complex or deep, I can be blind, lost, or profound. \n\
What am I?", 

"3", "4", "5"]
const wordList = ["string", "love", "3", "4", "5"];
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
let endGame = false;
let livesCounter = document.querySelector('#lives > p')
//let selectedRiddle = [];

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
  startGameBtnEl.innerHTML="Start over";
  livesCounter.innerHTML='Chances left: 6';
  gameStarted = true;
  //endGame = false;
  //document.querySelector('footer').style.bottom = "0px";
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
  selectedRiddle = riddle[wordList.indexOf(selectedWord)];
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
     livesCounter.innerHTML= `Chances left: ${maxGuesses-incorrectGuessed.length}`;
  }

  alreadyGuessed += userGuess;
  checkEndGame();
}

// Win and lose conditions

function checkEndGame() {
  if (correctGuessed.length === selectedWord.length) {
    disableLetterButtons();
    message.innerHTML = "<p>You solved the riddle. All is well...</p>";
    //startGameBtnEl.innerHTML="Start over";
    //endGame = true;
  } else if (incorrectGuessed.length === maxGuesses) {
    disableLetterButtons();
    message.innerHTML = "<p>There is nothing left of you... </p>";
    //startGameBtnEl.innerHTML="Start over";
    //endGame = true;
  } else {
    //message.innerHTML = "<p>You are one step closer to death...</p>";
  }
}

// Audio toggle and volume icon toggle
let isPlaying = true;
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

// Dropdown toggle
let ddToggle = false;
let ddImg = document.querySelector('#instructions-img');
let ddBtn = document.querySelector('.instructions');
ddBtn.addEventListener('click', dropdownToggle);
let ddHidden = document.querySelector('.hidden-dropdown');

function dropdownToggle() {
  if (ddToggle === false) {
ddImg.style.transform= "rotate(-180deg)";
ddImg.style.transition="transform 0.3s"
ddHidden.style.display = "block";
//document.addEventListener('click', dropdownToggle);
ddToggle = true;

  } else if (ddToggle === true) {
  ddImg.style.transform ="rotate(0deg)";
  ddImg.style.transition="transform 0.3s"
  ddHidden.style.display = "none";
    ddToggle = false;
  }
}