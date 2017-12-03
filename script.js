window.onload = function() {


notify("Press and letter to begin!");

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

displayRemainGuess(remainGuess);
displayCorrectGuess(correctGuess);
displayIncorrectGuess(incorrectGuess);




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
  compGuess(secretWord);
  userGuess(userArray.join(" "));
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
    notify("Invalid choice! please pick a letter");
  } else {
    runGame(guess); // run the game
  }  
} // end onkeyup function



function runGame(guess) {


  // has letter been guessed before?
  if (guessedLetters.indexOf(guess) !== -1) {
    // letter has already been chosen
    console.log("letter has already been chosen: " + guess);
  } else {
    // a new letter has been chosen
    console.log("new letter was chosen: " + guess);
    // add guess to array of chosen letters
    guessedLetters.push(guess);

    // find if guess appears in the word
    if (secretWord.indexOf(guess) >= 0) { 
      // correct guess:
      document.getElementById(guess).style.backgroundColor = "#80ec11"; //green
      correctGuess++;
      displayCorrectGuess(correctGuess);
    } else { 
      // incorrect guess:
      document.getElementById(guess).style.backgroundColor = "#ff3d2f"; // red
      incorrectGuess++;
      remainGuess--;
      displayRemainGuess(remainGuess);
      displayIncorrectGuess(incorrectGuess);
    };



  };



    for(var i=0; i<secretWord.length;i++) {
      if (secretWord[i] === guess) {
        // correct guess:

        notify("Your guess was correct: " + guess);
        // set array of user guesses 
        userArray[i] = guess;

        
      } else {
        // incorrect guess:
        notify("Your guess was incorect: " + guess);

        
      }

    }



// var remainGuess = 9;
// var correctGuess = 0;
// var incorrectGuess = 0;

// displayRemainGuess(remainGuess);










    // check for win!
    if(userArray.toString() === secretWord.toString()) {
      // console.log("win");
    } else {
      // console.log("nothing");
    }



    console.log(userArray);
    userGuess(userArray.join("&nbsp"));

    compGuess(secretWord);
    // var correctIndex = secretWord.indexOf(guess); // find index of 
    // if (correctIndex >= 0) { // if


    //   userArray[correctIndex] = guess;
    //   console.log("correctIndex " + correctIndex);
      
    //   userGuess(userArray);





  

}



function notify(str) {
  document.querySelector("#notification").innerHTML = str;
}

function compGuess(str) {
  document.querySelector("#compGuess").innerHTML = str;
}

function userGuess(str) {
  document.querySelector("#userGuess").innerHTML = str;
}

function displayRemainGuess(str) {
  document.querySelector("#remainGuess").innerHTML = str;
}

function displayCorrectGuess(str) {
  document.querySelector("#correctGuess").innerHTML = str;
}

function displayIncorrectGuess(str) {
  document.querySelector("#incorrectGuess").innerHTML = str;
}





} // window.onload 