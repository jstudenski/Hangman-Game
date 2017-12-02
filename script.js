window.onload = function() {


notify("Press and letter to begin!");

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

document.onkeyup = function(event) {
  var guess = event.key.toLowerCase();
  if (alphabet.indexOf(guess) < 0){
    notify("invalid! please pick a letter");
  } else {
    notify("your guess was " + guess);









  }
}


function notify(str) {
  document.querySelector("#notification").innerHTML = str;
}














}