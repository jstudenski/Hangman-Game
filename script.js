window.onload = function() {


// remove word from array once it has bee chosen 
// alert when there are no more words to pick from

// variables
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var drinkNames = ['water water']; // array of possible words
var secretWord;     // word randomly chosen from drinkNames
var userArray = [];      // stores correct guesses
var guessedLetters = []; // stores all letters guessed
var remainGuess;    // number of remaining guesses
var correctGuess;   // number of correct guesses
var incorrectGuess; // number of incorrect guesses
var wins = 0;   // initial wins
var losses = 0; // initial losses
var endofgame = false;

// start a new game
newGame();


function newGame() {
  // when game is loaded for the first time
  display("#notification", "Guess a letter!");

  // pick word and split it
  secretWord = drinkNames[Math.floor(Math.random() * drinkNames.length)].split("");
  console.log("Computer word: " + secretWord.join(""));
  userArray = [];     // clear array
  guessedLetters = [] // clear array
  // create array of underscores and spaces
  for (var i = 0; i < secretWord.length; i++) {
    (secretWord[i]===" "? userArray.push(" ") : userArray.push("_"))
  }

  // set initial values and display them
  display("#guessesRemaining", remainGuess = 5);
  display("#correctGuesses", correctGuess = 0);
  display("#incorrectGuesses", incorrectGuess = 0);

  display('#userGuess', userArray.join("&nbsp"));
  display("#wins", wins);
  display("#losses", losses);

  // create interactive alphabet divs 
  document.querySelector("#alphabet").innerHTML = ""; // clear
  for(var i=0; i<alphabet.length;i++) {
    var div = document.createElement("div");
    div.onclick = function() {
    if (endofgame === true) {
      endofgame = false;
      newGame();
    } else {
      runGame(this.id);  
      };     
    };
    div.innerHTML = alphabet[i].toUpperCase(); // display letters
    document.getElementById("alphabet").appendChild(div);
    div.id = alphabet[i];
  }

};

// each time a key is pressed
document.onkeyup = function(event) {

  if (endofgame === true) {
    endofgame = false;
    newGame();
  } else {
    var guess = event.key.toLowerCase(); // make letter lower case (just in case)
    if (alphabet.indexOf(guess) < 0) {   // see if choice is a valid letter
      display("#notification", "<div class=\"red\">Invalid choice!</div> Please pick a letter");
    } else {
      runGame(guess); // run the game
    }
  }



};



function runGame(guess) {
  
  if (guessedLetters.indexOf(guess) !== -1) { // has letter been guessed before
    display("#notification", "That letter: <b>" + guess + "</b>  has already been chosen.");
  } else if (secretWord.indexOf(guess) >= 0){ // correct guess
    display("#notification", "Your guess: <b>" + guess + "</b> was <div class=\"green\">correct</div>!");
    guessedLetters.push(guess); // add guess to array of letters chosen
    document.getElementById(guess).style.backgroundColor = "#80ec11"; // update alphabet
    
    // replace all underscores in user array with correct guesses
    for(var i=0; i<secretWord.length;i++) {
      if (secretWord[i] === guess) {userArray[i] = guess};
    };

    display("#correctGuesses", ++correctGuess);
    display('#userGuess', userArray.join("&nbsp"));

  } else { // incorrect guess
    display("#notification", "Your guess: <b>" + guess + "</b> was <div class=\"red\">incorrect</div>.");
    guessedLetters.push(guess); // add guess to array of letters chosen  
    document.getElementById(guess).style.backgroundColor = "#ff3d2f"; // update alphabet

    display("#guessesRemaining", --remainGuess);
    display("#incorrectGuesses", ++incorrectGuess);
  };



  // check for win
  if(userArray.toString() === secretWord.toString()) {
    display("#wins", ++wins);
    display("#notification", "You've won! Press any key to start a new game.");
    endofgame = true;
  }

  // check for loss
  if (remainGuess === 0) {
    display("#losses", ++losses);
    display("#notification", "You've lost. Press any key to start a new game.");
    endofgame = true;
    // show user missed letters
    for(var i=0; i<userArray.length;i++) {
      if (userArray[i] === "_") {userArray[i] = "<span>" + secretWord[i] + "</span>"};
      display('#userGuess', userArray.join("&nbsp"));
    }  
  }



};



function display(id, string) {
  document.querySelector(id).innerHTML = string;
}





} // window.onload 