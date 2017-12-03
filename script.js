window.onload = function() {


notify("Press and letter to begin!");

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var drinkNames = ['water wat', 'milk man'];

// word to guess
var secretWord;
// blank array
var userArray = [];

// pick word and set userArray to underscores
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

// !! letters that appear more than once!!!!!!! 



  var targetDiv = document.getElementById("alphabet");
  for(var i=0; i<alphabet.length;i++) {
      var newDiv = document.createElement("div"); //.setAttribute("id", i);
      newDiv.innerHTML = alphabet[i].toUpperCase();
      targetDiv.appendChild(newDiv);
      newDiv.id = alphabet[i];
  }

      
// abcElements[i].id = 'abc-' + i;






// every time a key is pressed
document.onkeyup = function(event) {

  var guess = event.key.toLowerCase(); // make letter lower case, just in case
  
  if (alphabet.indexOf(guess) < 0){ // see if choice is a valid letter
    notify("invalid! please pick a letter");
  } else { // if the letter is valid
    notify("your guess was " + guess);


    // find if guess appears in the word
    if (secretWord.indexOf(guess) >= 0) { // correct guess
      document.getElementById(guess).style.backgroundColor = "#80ec11"; //green

    } else { // incorrect guess
      document.getElementById(guess).style.backgroundColor = "#ff3d2f"; // red
    }



    for(var i=0; i<secretWord.length;i++) {
      if (secretWord[i] === guess) {
        // correct guess
        userArray[i] = guess;
        console.log(guess);
        
      } else {
                console.log("incorect: " + guess);
        // incorrect guess
        
      }

    }

    // check for win!
    if(userArray.toString() === secretWord.toString()) {
      console.log("win");
    } else {
      console.log("nothing");
    }




    userGuess(userArray.join(" "));
    compGuess(secretWord);
    // var correctIndex = secretWord.indexOf(guess); // find index of 
    // if (correctIndex >= 0) { // if


    //   userArray[correctIndex] = guess;
    //   console.log("correctIndex " + correctIndex);
      
    //   userGuess(userArray);





  }
} // end onkeyup function




function notify(str) {
  document.querySelector("#notification").innerHTML = str;
}

function compGuess(str) {
  document.querySelector("#compGuess").innerHTML = str;
}

function userGuess(str) {
  document.querySelector("#userGuess").innerHTML = str;
}












} // window.onload 