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