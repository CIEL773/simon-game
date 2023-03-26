var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// generate the next block and make it flash and ring
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playsound(randomChosenColour);
  level += 1;
  $("#level-title").text("Level " + level);
}

// check which button is pressed
$(".btn").click(function () {
  userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// add sounds to buttons
function playsound(name) {
  var soundSource = "sounds/" + name + ".mp3";
  var audio = new Audio(soundSource);
  audio.play();
}

// add animation when pressing a buttpm
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 200);
}

// start game
$(document).keypress(function () {
  $("#level-title").text("Level " + level);
  if (level === 0) {
    nextSequence();
  }
});

// check user's answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 400);
    $("#level-title").text(
      "Your Final Score Is " + (level - 1) + ". Press Any Key To Restart."
    );
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
}
