// Globala variabler

const wordList = ["ga", "fafafd", "fankalabaa"];      // Array: med spelets alla ord
let selectedWord;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
let selectedWordPop =[];   // selectedWord array to pop?

let guesses = 0;     // Number: håller antalet gissningar som gjorts
let maxGuesses = 6;
let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl;     // DOM-nod: Ger meddelande när spelet är över
//let startGameBtnEl;  // DOM-nod: knappen som du startar spelet med
let letterButtonEls; // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls;    // Array av DOM-noder: Rutorna där bokstäverna ska stå

let alreadyGuessed = [""];

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


// Skriv en callback som hanterar när spelaren trycker på alla bokstavsknappar

letterButtonEls = document.querySelectorAll('#letterButtons > li > button');

for (let i = 0; i < letterButtonEls.length; i++) {
    letterButtonEls[i].addEventListener('click', guess)
}

    // get the keypress
    function guess() {
        let userGuess = this.value.toLowerCase();
        checkGuess(userGuess);
        }
        
  //Disable the key!! ******************

//Check the keypress
  function checkGuess(userGuess) {
    for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i].includes(userGuess) == true) {
      //get correct amount of letters
              alreadyGuessed += userGuess;
          }
          console.log(alreadyGuessed)
        }
        checkEndGame();
  }
 
 function checkEndGame() {
   if (alreadyGuessed.length == selectedWord.length) {
     console.log("You won!")
   } else if (guesses === maxGuesses) {
      console.log("You lost!")
    } else {
      console.log("Game not done or something wrong in the code")
    }
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
