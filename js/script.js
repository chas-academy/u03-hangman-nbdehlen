// Globala variabler

const wordList = ["ga", "fafafd", "fankalabaa"];      // Array: med spelets alla ord
let selectedWord;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan   // selectedWord array to pop?

//let guesses = 0;     // Number: håller antalet gissningar som gjorts
let maxGuesses = 6;
let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl;     // DOM-nod: Ger meddelande när spelet är över
//let startGameBtnEl;  // DOM-nod: knappen som du startar spelet med
let letterButtonEls; // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls;    // Array av DOM-noder: Rutorna där bokstäverna ska stå

let alreadyGuessed = [""];
let correctGuessed = [""];
let incorrectGuessed = [""];

let startGameBtnEl = document.querySelector('#startGameBtn');
startGameBtnEl.addEventListener('click', startGame);

// Startfunktion
function startGame () {
    randomWordFunc();
    CreateLetterBoxes();
    // Lägg till reset function
}

// Funktion som slumpar fram ett ord
function randomWordFunc() {
    selectedWord = wordList[Math.floor(Math.random()*wordList.length)];
    console.log(selectedWord)
}

// Funktion som lägger till antal letterBoxes
function CreateLetterBoxes () {
    letterBoxEls = document.querySelector('#letterBoxes > ul');

    for (let i = 0; i < selectedWord.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = '<input type="text" disabled value="&nbsp">';
        letterBoxEls.appendChild(li);
    } 
}


// Event listener for the visual keyboard
letterButtonEls = document.querySelectorAll('#letterButtons > li > button');

for (let i = 0; i < letterButtonEls.length; i++) {
    letterButtonEls[i].addEventListener('click', guess)
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
          }
        }

    if (selectedWord.includes(userGuess) == false) {
        incorrectGuessed += userGuess;
    }

        alreadyGuessed += userGuess;

        // ********* REPLACE alreadyGuessed with incorrect guess **** //
        // put for loop inside if and then else can be whatever I want for
        // alreadyGuessed or incorrect Guess?
        // or just use if .includes false incorrectGuess += ?
        checkEndGame();
  }
 
    //win and lose conditions
 function checkEndGame() {
   if (correctGuessed.length === selectedWord.length) {
     console.log("You won!")
   } else if (incorrectGuessed.length === maxGuesses) {
      console.log("You lost!")
    } else {
      console.log("Game not done or something wrong in the code")
    }

    // **** FUNCTION FOR RESET AND PROMPT PLAY AGAIN ****

 }

/*
function guess(userGuess) {
  if (guesses < maxGuesses) {

  }
    if (selectedWord.includes(userGuess) == true ) {
        alreadyGuessed += userGuess;
        console.log(alreadyGuessed); 
        console.log("correct!"); 
        return;
    } else {
        alreadyGuessed += userGuess;
        wrongGuesses += userGuess;
        console.log(alreadyGuessed); 
        console.log("wrong!"); 
    return;
    }
}
*/

// Axels steg

// 1. Om bokstaven finns och användaren inte har gissat alla bokstäverna rätt:






//Spara knapptryckningen i en variabel
// jämföra och uppdatera alreadyGuessed för att disablea knapptryck
// Loopa över selectedword och hitta matches, när matches === selectedWord.Length = win;
    // Om det inte är en match, uppdatera:
        // antal liv, bild, (disable ovan)



/*    
    letterBoxEls[positionOfGuessedLetter].value = ...

    
*/
