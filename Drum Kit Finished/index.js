
/** 
document.querySelector(".w" ).addEventListener("click", function () {
    alert("W got clicked!");
});
document.querySelector(".a" ).addEventListener("click", function () {
    alert("A got clicked!");
});
document.querySelector(".s" ).addEventListener("click", function () {
    alert("S got clicked!");
});
document.querySelector(".d" ).addEventListener("click", function () {
    alert("D got clicked!");
});
document.querySelector(".j" ).addEventListener("click", function () {
    alert("J got clicked!");
});
document.querySelector(".k" ).addEventListener("click", function () {
    alert("K got clicked!");
});
document.querySelector(".l" ).addEventListener("click", function () {
    alert("L got clicked!");
}); 
// waiting for the click to happen on the first button before we run the function 
or a more fun way:  */

//Detect if a button was pressed:

var numberOfDrumButtons = document.querySelectorAll(".drum").length; // get the number of buttons
for (var i = 0; i < numberOfDrumButtons; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        
     //   this.style.color = "white";
    // "this" is the identity of the element that triggered the Event Listener.
    var buttonIClicked = this.innerHTML;
    console.log (buttonIClicked);
     whichDrum(buttonIClicked);  
     buttonAnimation(buttonIClicked);
    
    });
}

/* Detecting Button Press
document.querySelector(".w").addEventListener("click", playtom1);
document.querySelector(".a").addEventListener("click", playtom2);
document.querySelector(".s").addEventListener("click", playtom3);
document.querySelector(".d").addEventListener("click", playtom4);
document.querySelector(".j").addEventListener("click", playsnare);
document.querySelector(".k").addEventListener("click", playcrash);
document.querySelector(".l").addEventListener("click", playkick);
//what sound to play when the button is pressed
/* 
    function playtom1() {
    var tom1 = new Audio("sounds/tom-1.mp3");
    tom1.play();
}
function playtom2() {   
    var tom2 = new Audio("sounds/tom-2.mp3");
    tom2.play();
}
function playtom3() {
    var tom3 = new Audio("sounds/tom-3.mp3");
    tom3.play();
}
function playtom4() {
    var tom4 = new Audio("sounds/tom-4.mp3");
    tom4.play();
}
function playcrash() {
    var crash = new Audio("sounds/crash.mp3");
    crash.play();
}
function playkick() {
    var kick = new Audio("sounds/kick-bass.mp3");
    kick.play();
}
function playsnare() {
    var snare = new Audio("sounds/snare.mp3");
    snare.play();
}
    */
// Detecting if a key was pressed:
for (var i = 0; i < numberOfDrumButtons; i++) {
    document.addEventListener("keydown", function(event) {
        var key = event.key; // get the key that was pressed
        //this.style.color = "blue";
        whichDrum(key);
        buttonAnimation(key);
   
});
}
//switch statement to play the right sound based on which button was clicked or key was pressed:
function whichDrum(input) {
    switch (input) {
        
            case "w":
                var sound = new Audio("sounds/tom-1.mp3");
                sound.play();
                break;
            case "a":
                var sound = new Audio("sounds/tom-2.mp3");
                sound.play();
                break;
            case "s":
                var sound = new Audio("sounds/tom-3.mp3");
                sound.play();
                break;w
            case "d":
                var sound = new Audio("sounds/tom-4.mp3");
                sound.play();
                break;was
            case "j":
                var sound = new Audio("sounds/snare.mp3");
                sound.play();
                break;
            case "k":
                var sound = new Audio("sounds/crash.mp3");
                sound.play();
                break;
            case "l":
                var sound = new Audio("sounds/kick-bass.mp3");
                sound.play();;
                break;
            default:
                console.log(key);  
    }
}


//animate button when a key gets pressed or a button gets clicked
function buttonAnimation (currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    //add the pressed class to the active button:
    activeButton.classList.add("pressed");
    
    //remove the pressed class from the active button after a bit:
    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 200);  //200 milliseconds
}
