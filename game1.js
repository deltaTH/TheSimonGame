$("h1").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];


//Game started or not??
var started = false;

//level 0
var level = 0;

// press any key to start the game
$(document).keypress(function() {
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

// detecting button press 
$(".btn").click(function() {

  // storing id of the button clicked
  var userChosenColour = $(this).attr("id");

    // adding the id to the userClickedPattern array
  userClickedPattern.push(userChosenColour);

  //playing sound 
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);

});

//function checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

      //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      //wrong.mp3, play this sound if the user got one of the answers wrong.
      playSound("wrong");

            //"game-over", remove it after 200 milliseconds.
            $("body").addClass("game-over");
                        //"Game Over, Press Any Key to Restart" if the user got the answer wrong.
                        $("#level-title").text("Game Over, Press Any Key to Restart");
            setTimeout(function () {
              $("body").removeClass("game-over");
            }, 200);
      


            //Call startOver() if the user gets the sequence wrong.
      startOver();

    }

}



function nextSequence() {

    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

    //levelup
  level++;

  //updating h1
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  //Animation
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// play sound function
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  

// Animations

function animatePress(currentColour) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

//Restart startOver().
function startOver() {

    //3. reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
  }