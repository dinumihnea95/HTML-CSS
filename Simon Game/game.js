var buttonColours = ["red" , "blue" , "green" , "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false; 
var level = 0;

$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true; 
    }
})


$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4) ;
    
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    ++level;

    $("#" + randomChosenColour).animate({opacity: 0.1}, 100).animate({opacity: 1});
    playSound(randomChosenColour);

    $("#level-title").text("Level " + level);

    
}

function playSound(name) {

   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}

function animatePress(currentColour) {
    
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
      }, 100);

}

function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {

            console.log("success");

            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () { 
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key To Restart");

        startOver();
    }

}

function startOver() {

    level = 0;
    gamePattern = [];
    started = false; 
}


 