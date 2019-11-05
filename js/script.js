// Globala variabler

const wordList = ["ga", "fafafd", "faaaaaaaaaaaaaaaa"];      // Array: med spelets alla ord
let selectedWord;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan

let guesses = 0;     // Number: håller antalet gissningar som gjorts
let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl;     // DOM-nod: Ger meddelande när spelet är över
//let startGameBtnEl;  // DOM-nod: knappen som du startar spelet med
let letterButtonEls; // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls;    // Array av DOM-noder: Rutorna där bokstäverna ska stå

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
// Funktion som slumpar fram ett ord
// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på

let correctGuesses = "";
let wrongGuesses = "";
let alreadyGuessed = correctGuesses + wrongGuesses;
let numberOfTries = 6;


let startGameBtnEl = document.querySelector('#startGameBtn');
let hrm = document.querySelector('#gameBoard');

startGameBtnEl.addEventListener('click', startGame);

function startGame () {
    hrm.style.background = 'lightblue';
    randomWordFunc();
    CreateLetterBoxes();
    
}

// Startfunktion

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

//Funktion som körs när du trycker på bokstäverna och gissar bokstav
function guess(userGuess) {
    //redan gissat - returnera med log
    if (alreadyGuessed.indexOf(userGuess) > -1) {

        console.log("already guessed!")
        return;
        
    } else if (selectedWord.includes(userGuess) == true ) {
      //nytt o rätt - grey out, lägg till bokstav på letterbox
        alreadyGuessed += userGuess;
        correctGuesses += userGuess;
        console.log(alreadyGuessed); 
        console.log("correct!"); 
        return;
        
        //uppdatera letterboxes
        //ab func för correct/incorrect?
    } else {
        //Nytt o fel - grey out, lägg till bokstav på fel
        alreadyGuessed += userGuess;
        wrongGuesses += userGuess;
        //uppdatera bild
        //Om sista bild run end function
        console.log(alreadyGuessed); 
        console.log("wrong!"); 
    return;
    }
}
/*
randomWordFunc()
guess("d")
*/