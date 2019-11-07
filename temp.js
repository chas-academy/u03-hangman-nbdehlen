//Funktion som körs när du trycker på bokstäverna och gissar bokstav
function guess(userGuess) {
    //redan gissat - returnera med log
    /*if (alreadyGuessed.indexOf(userGuess) > -1) {

        console.log("already guessed!")
        return;
        
    } else*/
    
    if (selectedWord.includes(userGuess) == true ) {
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

/*
// Skriv en callback som hanterar när spelaren trycker på alla bokstavsknappar

letterButtonEls = document.querySelectorAll('#letterButtons > li > button');

for (let i = 0; i < letterButtonEls.length; i++) {
    letterButtonEls[i].addEventListener('click', guess)
}

    // get the keypress
    function guess() {
        console.log(this.value.toLowerCase());
        let userGuess = this.value.toLowerCase();
        checkGuess(userGuess);
        }
        
  //Disable the key!! ******************

//Check the keypress
  function checkGuess(userGuess) {
    if (selectedWord.includes(userGuess) == true) {
      //get correct amount of letters
          for (let i = 0; i < selectedWord.length -1; i++) {
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
      console.log("Something wrong in the code")
    }
 }






*/