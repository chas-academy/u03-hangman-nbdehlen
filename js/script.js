// Globala variabler

const wordList = ["ga", "fafafd", "fankalabaa"];      // Array: med spelets alla ord
let selectedWord;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan   // selectedWord array to pop?
let maxGuesses = 6;
let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl;     // DOM-nod: Ger meddelande när spelet är över
//let startGameBtnEl;  // DOM-nod: knappen som du startar spelet med
let letterButtonEls; // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls;    // Array av DOM-noder: Rutorna där bokstäverna ska stå

alreadyGuessed = [""];
correctGuessed = [""];
incorrectGuessed = [""];


let startGameBtnEl = document.querySelector('#startGameBtn');
startGameBtnEl.addEventListener('click', startGame);

// Startfunktion
function startGame() {
  removeLetterBoxes();
  RemoveLetterButtons();
  resetGlobal();
  randomWordFunc();
  CreateLetterBoxes();
  // ************* disable "starta spelet" or rename to "starta om spelet"
  //Change image to first one
  hangman.src = ("images/h0.png");
  //Change pTag
  message.innerHTML = "Game is starting! Don't screw it up you dum-dum. This isn't the olympics of being original.";
  //Move all remove functions into this function

}

function resetGlobal() {
  alreadyGuessed = [""];
  correctGuessed = [""];
  incorrectGuessed = [""];
  selectedWord;
  hangmanImg;
  letterButtonEls; 
  //************* build all on a true/false of game ongoing instead?
}

// pTag welcome message
function pTagFunc() {
  if (message.value != undefined) {
    message.childNode.value = 'Game starts!'
  }
}

//reset disabled key inputs
function RemoveLetterButtons() { 
    for (let i= 0; i< letterButtonEls.length; i++) {
      letterButtonEls[i].disabled = false;
    }
}

function removeLetterBoxes() { 
  let letterBoxes = document.querySelectorAll('#letterBoxes > ul > li');
    if (letterBoxes !=null && selectedWord !=undefined) {
      // null and undefined here is a shitty fix, != hasChildNodes?
    for (let i= 0; i< selectedWord.length; i++) {
      letterBoxes[i].remove(letterBoxes);
    }
  }
}

// Funktion som slumpar fram ett ord
function randomWordFunc() {
    selectedWord = wordList[Math.floor(Math.random()*wordList.length)];
    console.log(selectedWord)
}

// Funktion som lägger till antal letterBoxes
function CreateLetterBoxes() {
    letterBoxEls = document.querySelector('#letterBoxes > ul');
    // *****************Remove prior letterboxes ***************
  
    for (let i = 0; i < selectedWord.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = '<input type="text" disabled value="&nbsp">';
        letterBoxEls.appendChild(li);
        // ******* Add margin or something to make letterBoxes look normal ****
    } 
}


// Event listener for the visual keyboard
letterButtonEls = document.querySelectorAll('#letterButtons > li > button');

// ***************** Refactor into function w clear attrib at start? ***************
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

    // Add to letterBoxes
    let letterBoxEls = document.querySelectorAll('#letterBoxes > ul > li > input'); // ********** THIS SHIT NOT WORKING PROPERLY
    
    letterBoxEls[i].value=userGuess.toUpperCase();
    }
  }

  
  let hangman = document.querySelector('#hangman');
    if (selectedWord.includes(userGuess) == false) {
        incorrectGuessed += userGuess;
        hangman.src = (`images/h${incorrectGuessed.length}.png`);
    }

        alreadyGuessed += userGuess;
        checkEndGame();
  }
 
    //win and lose conditions
    let message = document.querySelector('#message');
    //let pTag = document.createElement('p');

 function checkEndGame() {
   if (correctGuessed.length === selectedWord.length) {
     console.log("You won!");

     message.innerHTML = '<p> Congratulations you little sausage, you won! </p>';
     //message.appendChild(pTag);
   } else if (incorrectGuessed.length === maxGuesses) {
      console.log("You lost!")

      message.innerHTML = '<p> Congratulations you stampcrab, you reached the maximum amount of guesses! </p>';
     //message.pTag.value = ('Congratulations, you reached the maximum amount of guesses!');
     //message.appendChild(pTag);

    } else {
      // Temporary for detecting bugs etc
      console.log("Game not done or something is wrong")
      message.innerHTML = '<p> Your guesses are totally on point, you fiend! </p>';
      //message.pTag.value = ('Nothing to see here, chug along little train!');
      //message.appendChild(pTag);
    }

    // **** FUNCTION FOR RESET AND PROMPT PLAY AGAIN ****
    // **** BUTTON FOR RESET **** //
    // *** BETTER WAY TO MANIPULATE ELEMENTS AND AND COOL EFFECTS *** //
    // If i can't find a better way, make function out of the dom stuff?
    // Do something with ::after ??
    // more interesting images ?
    // implement support for hints and multiple words
    // Keyboard input
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
