/* Game process
1. klick any key to start
2. game highlights a button
3. user selects button
4. if same button(s) (sequence), 
    increase level and highlight another button
  If not the same button, restart (go to 1)
5. user selects all buttons thus far
6. if sequence is good, go to 2
7. Continue in an infinite do loop
*/

var buttonColours = ["red","blue","green","yellow"];  
var gamePattern = [];  //random colours created are stored in gamePattern
var userClickedPattern = [];  //user Clicked Colours are stored in userClickedPattern array
var gameStarted = false;
var level = 0;
var clock = 0;
buttontimer = 0;
randomNumber = 5;

// 1.  wait for any keyboard press to start the game, start game timer:

$(document).keydown(function(keypressed) {
    if (!gameStarted) {
        gameStarted = true; 
        timer(gameStarted);
        console.log("Game Started? " + gameStarted)
 
        //event.key gives you the keypressed
        console.log("Key Pressed is: " + keypressed.key);
        // run nextSequence to return a random number (randomNumber), 0,1,2 or 3, :
        nextSequence(); 
    }
}); 
        
//2. Wait for button clicked, append userClickedPattern with it and check if it was correct:

    $(".btn").on("click", function() {
        var buttonClicked = $(this).attr("id");  //The this typically refers to the DOM element that is currently being acted upon, within a callback function.
        console.log("A button 'twer clicked ol' Gringo");
        //Highlight the said button and play the sound:
    //    $(this).fadeOut(100).fadeIn(100);
        playSound(buttonClicked);
        animatePress(buttonClicked); 
        userClickedPattern.push(buttonClicked);  //append array
        console.log("The button pressed was: " + buttonClicked);  //log to console for troubleshooting 
        //append this color to the userClickedPattern array:
        
    //compare the two arrays:
        console.log("Length of gamePattern:" + gamePattern.length); 
        console.log("Length of userClickedPattern:" + userClickedPattern.length);
        console.log("gamePattern: " + gamePattern); 
        console.log("userClickedPattern: " + userClickedPattern);
        //Check answer after each button is pressed:
        checkAnswer(userClickedPattern.length -1);
        
    }); 
    

       
 
 //select a random integer betwixt 0 & 3 and return it, increment the level and highlight the button corresponding to the random chosen colour, :
function nextSequence() {   
   userClickedPattern.length = 0;
   level ++  //increment level
    console.log("Level = " + level);
   console.log("reset the userClicked pattern array"); // to evaluate the new entries by the user:

  //get random number betwixt 0 & 3
   var n1 = Math.random() * 4;
   randomNumber = Math.floor(n1);
        $("h1").text("Level is: " + level);
    console.log("Your Level is: " + level + "."); 
    console.log("Your random number is: " + randomNumber);
    
    
    //select the colour in our array buttonColours corresponding to the random number created   
        var randomChosenColour = buttonColours[randomNumber]
        console.log("The random chosen Colour is: " + randomChosenColour);
    //Append the  array gamePattern with the random Chosen Colour
            gamePattern.push(randomChosenColour);
            console.log("GamePattern is: " + gamePattern);
            console.log("userClickedPattern entries: " + userClickedPattern)
        // play sound and highlight random chosen button after a wee bit:

        setTimeout(function () {
            playSound(randomChosenColour);
             $(this).fadeOut(100).fadeIn(100);
           // animatePress(randomChosenColour);   
         }, 500);    
}

function checkAnswer(currentLevel) {  
  console.log(currentLevel);
 //   if gamePattern current entry equals the user clicked pattern current entry:
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("heap good");
    //are gamePattern and userClickedPattern equal? then run next sequence to get another random color after a wee bit:
  
        if (gamePattern.length === userClickedPattern.length) {
            console.log("sequences have the same no. of entries muchacho."); 
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else { 
            console.log("Game sequence and User sequence aren't the same length.");
            // highlight screen and play irritating sound
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
                }, 100);
        
            const audio = new Audio("sounds/wrong.mp3");
            audio.play();
            
            endGame()
        }  
    
}


//play sound corresponding to the button that was clicked: 
 function playSound(buttonClicked) {
     // console.log("The button pressed was: " + buttonClicked);
      var sound = new Audio("sounds/" + buttonClicked + ".mp3");
      sound.play();
 }
 
 //animate button temporarily when a key gets pressed or a button gets clicked
 function animatePress (buttonClicked) {
   $("#" + buttonClicked).addClass("pressed"); 
   
   /*
    var activeButton = document.querySelector("." + buttonClicked);
    //add the pressed class to the active button:
    activeButton.classList.add("pressed");
    */
    //remove the pressed class from the active button after a wee bit: 
    setTimeout(function() {
        $("#" + buttonClicked).removeClass("pressed");
    }, 200);  //200 milliseconds
    
}
function endGame() {
    // reset variables
    gameStarted = false;
    level = 0;
    clock = 0;
    buttontimer = 0;
    randomNumber = 5;
    
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    
    console.log("Game over el Guapo");
    
    $("h1").text("Press any key to restart 1");
    //Stop timer so you can see how incredibly good you are at this extrordinary game
    stopTimer();
    
}

//set timer to start when game starts and reset when the game restarts
function timer(gameStarted) {
    var timerValue = 0;
/*increment the clock every .1 seconds with setInterval, which is a JavaScript method 
used to repeatedly execute a function or code snippet at a specified interval. 
It takes two main arguments: the function to be executed and the delay in 
milliseconds between each execution. 
*/
    timerInterval = setInterval(function() {
        timerValue++;
        $("#timer").html("Timer: "  + timerValue + " Seconds");
    }, 1000);

// Insert the variable into an h2 with id="timer"

}
function stopTimer() {
    clearInterval(timerInterval);
}
 //$(document).on("keydown", function(keypress) {  //another way to do it with the on() method, which attaches 1 or more
// event handlers for the selected elements