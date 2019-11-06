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
    letterButtonEls[i].onclick = function guess() {
        console.log(this.value.toLowerCase());
    }
}
/*** Byta ut onclick till click+function ***/


//Spara knapptryckningen i en variabel
// jämföra och uppdatera alreadyGuessed för att disablea knapptryck
// Loopa över selectedword och hitta matches, när matches === selectedWord.Length = win;
    // Om det inte är en match, uppdatera:
        // antal liv, bild, (disable ovan)



/*    
    letterBoxEls[positionOfGuessedLetter].value = ...

    
*/
