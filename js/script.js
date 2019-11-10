// Globala variabler
const wordList = ["elektravägen", "hackday", "hänggubbe", "aaa", "bb", "c"];
let selectedWord ="";
let maxGuesses = 6;
let letterButtonEls;
let letterBoxEls;
let gameStarted = false;
let startGameBtnEl = document.querySelector('#startGameBtn');
startGameBtnEl.addEventListener('click', startGame);

// Reset-/startfunktion
function startGame() {
  removeLetterBoxes();
  removeDisableLetterButtons();
  randomWordFunc();
  CreateLetterBoxes();
  buttonClickListener();
  hangman.src = ("images/h0.png");
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
letterButtonEls = document.querySelectorAll("#letterButtons > li > button");

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
    if (selectedWord[i].includes(userGuess) == true) {
      // Get right amount of the letter
      correctGuessed += userGuess;

      // Add to letterBoxes
      let letterBoxEls = document.querySelectorAll("#letterBoxes > ul > li > input");
      letterBoxEls[i].value = userGuess.toUpperCase();
    }
  }

  let hangman = document.querySelector("#hangman");
  if (selectedWord.includes(userGuess) == false) {
    incorrectGuessed += userGuess;
    hangman.src = (`images/h${incorrectGuessed.length}.png`);
  }

  alreadyGuessed += userGuess;
  checkEndGame();
}

//win and lose conditions
let message = document.querySelector("#message");

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