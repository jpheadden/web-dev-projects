/* Generate a random number between 1 and 6
function getRandomDiceNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

// Example usage
const randomNumber = getRandomDiceNumber();
console.log(randomNumber);
*/

var n1 = Math.random() * 6;
n1 = Math.floor(n1) + 1;
/*
random number generated a number betwixed 0 and 0.99999999999999 yada yada yada yada.  Multiply by 6 and add 1 to get a number between 1 and 6.  Then you truncate
the number to get an integer.  This is the number that will be used to pick the dice image to show on the screen oh great one.
*/
var n2 = Math.random() * 6;
n2 = Math.floor(n2) + 1;
// to test your incredible code oh great on. Send the numbers to the console to see if they are correct ol' gringo.  
console.log("Your random numbers are, n1 is " + n1 + " and n2 is " + n2 + " Senora.");

//console.log("Hello World!");
//pick dice images to show based on random numbers generated n1 and n2.
document.querySelector(".img1").setAttribute("src", "images/dice" + n1 + ".png");
document.querySelector(".img2").setAttribute("src", "images/dice" + n2 + ".png");

if (n1 > n2) {
    document.querySelector("h1").innerHTML = "🐧 Oooh ahhh, Player 1 Wins! 🏆";
} else if (n1 < n2) {
    document.querySelector("h1").innerHTML = "🎊 Hooray, Player 2 Wins! 🏅";
} else {
    document.querySelector("h1").innerHTML = "🥴 It's a Draw! Play it again Sam? 🎲";
}