window.onload = function() {


notification("#notification", "Press and letter to begin!");

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var drinkNames = ['water water', 'milk man'];

// word to guess
var secretWord;
// blank array
var userArray = [];
var guessedLetters = [];

var remainGuess = 9;
var correctGuess = 0;
var incorrectGuess = 0;


notification("#guessesRemaining", remainGuess);
notification("#correctGuesses", correctGuess);
notification("#incorrectGuesses", incorrectGuess);





// on start pick word and set userArray to underscores
pickWord();


function pickWord() {
  // pick random work from drinkNames array and split into individual characters
  secretWord = drinkNames[Math.floor(Math.random() * drinkNames.length)].split("");
  // create array of underscores 
  for (var i = 0; i < secretWord.length; i++) {
    if (secretWord[i]===" ") {
      userArray.push(" ");
    } else {
      userArray.push("_");
    }  
  }
  console.log(secretWord);

  notification('#userGuess', userArray.join("&nbsp"));
} 


// create alphabet divs 
for(var i=0; i<alphabet.length;i++) {
    var newDiv = document.createElement("div"); //.setAttribute("id", i);
    // run the game when a letter is pressed
    newDiv.onclick = function() {
     runGame(this.id);
    }
    newDiv.innerHTML = alphabet[i].toUpperCase();
    document.getElementById("alphabet").appendChild(newDiv);
    newDiv.id = alphabet[i];
}
    
// every time a key is pressed
document.onkeyup = function(event) {
  // make letter lower case (just in case)
  var guess = event.key.toLowerCase(); 
  // see if choice is a valid letter
  if (alphabet.indexOf(guess) < 0) { 
    notification("#notification", "<div class=\"red\">Invalid choice!</div> Please pick a letter");
  } else {
    runGame(guess); // run the game
  }  
} // end onkeyup function



function runGame(guess) {


  // has letter been guessed before?
  if (guessedLetters.indexOf(guess) !== -1) {
    // letter has already been chosen

    notification("#notification", "That letter has already been chosen: " + guess);
  } else {
    // a new letter has been chosen
    // add guess to array of chosen letters
    guessedLetters.push(guess);

    // find if guess appears in the word
    if (secretWord.indexOf(guess) >= 0) { 
      notification("#notification", "Your guess: <b>" + guess + "</b> was <div class=\"green\">correct!</div>");
      // correct guess:
      document.getElementById(guess).style.backgroundColor = "#80ec11"; //green
      correctGuess++;
      notification("#correctGuesses", correctGuess);

            // replace items in user array with correct guesses
      for(var i=0; i<secretWord.length;i++) {
        if (secretWord[i] === guess) {
          userArray[i] = guess; 
        };

      };


    } else { 
      // incorrect guess:
      notification("#notification", "Your guess: <b>" + guess + "</b> was <div class=\"red\">incorrect.</div>");
      document.getElementById(guess).style.backgroundColor = "#ff3d2f"; // red
      incorrectGuess++;
      remainGuess--;
      notification("#guessesRemaining", remainGuess);
      notification("#incorrectGuesses", incorrectGuess);
    };

  };

  
  notification('#userGuess', userArray.join("&nbsp"));



  // check for win!
  if(userArray.toString() === secretWord.toString()) {
    console.log("win");
  } else {
    
  }

}



function notification(id, string) {
  document.querySelector(id).innerHTML = string;
}





} // window.onload 