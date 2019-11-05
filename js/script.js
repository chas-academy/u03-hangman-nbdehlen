// Globala variabler

const wordList;      // Array: med spelets alla ord
let selectedWord;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan

let guesses = 0;     // Number: håller antalet gissningar som gjorts
let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl;     // DOM-nod: Ger meddelande när spelet är över
let startGameBtnEl;  // DOM-nod: knappen som du startar spelet med
let letterButtonEls; // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls;    // Array av DOM-noder: Rutorna där bokstäverna ska stå

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
// Funktion som slumpar fram ett ord
// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på

/*
*** IDEAS AND FEATURES***
Sound?
Html canvas?
Animations?
Reset button?
clues with multiple words?
instructions?
make buttons accessible for a keyboard

*** Things that needs to happen for the game to work ***

*Button click to start the game
    - Function for choosing a random word
        - Making an array for the letter spaces for that random word
            - Displaying the letter spaces amount based on random word
    - Display the keyboard

*General
    - Store correct guesses            
    - Store incorrect guesses

*Button click to guess letters matching the word            
   - Link button to letter
        - If letter match random word
            - update it in stored correct guesses
            - display on letter spaces
            - display greyed out on keyboard-buttons

        - If letter does not match
            - update it in stored incorrect guesses
            - display greyed out on keyboard-buttons
            - update hangman image

    - Did guesses match all letters in the random word?
        - end game with message that you won

    - Did guesses > amount of guesses allowed?
        - end game with message that you lost


*Button for resetting the game



*/