window.onload = function() {


// remove word from array once it has bee chosen 
// alert when there are no more words to pick from

// variables
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var drinkNames = ['water water', 'milk man']; // array of possible words
var secretWord;     // word randomly chosen from drinkNames
var userArray = [];      // stores correct guesses
var guessedLetters = []; // stores all letters guessed
var remainGuess;    // number of remaining guesses
var correctGuess;   // number of correct guesses
var incorrectGuess; // number of incorrect guesses

// when game is loaded for the first time
display("#notification", "Press and letter to begin!");
// start a new game
newGame();


function newGame() {
  // pick random work from drinkNames array and split into individual characters
  secretWord = drinkNames[Math.floor(Math.random() * drinkNames.length)].split("");
  console.log("Computer word: " + secretWord.join(""));

  // create array of underscores and spaces
  for (var i = 0; i < secretWord.length; i++) {
    (secretWord[i]===" "? userArray.push(" ") : userArray.push("_"))
  }

  // set initial values and display them
  display("#guessesRemaining", remainGuess = 9);
  display("#correctGuesses", correctGuess = 0);
  display("#incorrectGuesses", incorrectGuess = 0);
  display('#userGuess', userArray.join("&nbsp"));

  // create interactive alphabet divs 
  for(var i=0; i<alphabet.length;i++) {
    var div = document.createElement("div");
    div.onclick = function() {runGame(this.id)}; // run the game when a letter is pressed
    div.innerHTML = alphabet[i].toUpperCase(); // display letters
    document.getElementById("alphabet").appendChild(div);
    div.id = alphabet[i];
  }

};

// each time a key is pressed
document.onkeyup = function(event) {
  var guess = event.key.toLowerCase(); // make letter lower case (just in case)
  if (alphabet.indexOf(guess) < 0) {   // see if choice is a valid letter
    display("#notification", "<div class=\"red\">Invalid choice!</div> Please pick a letter");
  } else {
    runGame(guess); // run the game
  }
};



function runGame(guess) {
  
  if (guessedLetters.indexOf(guess) !== -1) { // has letter been guessed before
    display("#notification", "That letter: <b>" + guess + "</b>  has already been chosen.");
  } else {

    // a new letter has been chosen
    
    guessedLetters.push(guess); // add guess to array of letters chosen

    // find if guess appears in the word
    if (secretWord.indexOf(guess) >= 0) { 
      display("#notification", "Your guess: <b>" + guess + "</b> was <div class=\"green\">correct</div>!");
      // correct guess:
      document.getElementById(guess).style.backgroundColor = "#80ec11"; //green
      correctGuess++;
      display("#correctGuesses", correctGuess);

            // replace items in user array with correct guesses
      for(var i=0; i<secretWord.length;i++) {
        if (secretWord[i] === guess) {
          userArray[i] = guess; 
        };

      };


    } else { 
      // incorrect guess:
      display("#notification", "Your guess: <b>" + guess + "</b> was <div class=\"red\">incorrect</div>.");
      document.getElementById(guess).style.backgroundColor = "#ff3d2f"; // red
      incorrectGuess++;
      remainGuess--;
      display("#guessesRemaining", remainGuess);
      display("#incorrectGuesses", incorrectGuess);
    };

  };

  
  display('#userGuess', userArray.join("&nbsp"));


  if (remainGuess > 0) {
    // check for win!
    if(userArray.toString() === secretWord.toString()) {
      console.log("win");
    }
  } else {
   console.log("fail2");
  }




}



function display(id, string) {
  document.querySelector(id).innerHTML = string;
}





} // window.onload 