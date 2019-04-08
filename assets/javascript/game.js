//need a welcome page with a click to start button that will start the first question
//need a timer that will start at 30 seconds counting down as soon as the page loads
//will need one question, will show 4 answers (will go through 5 questions)
//player can only guess one answer (right or wrong)
//if right - show a congrats for choosing the right answer banner
//5 second wait and then screen flips to the next question (doesn't have to wait for timer to end)
//record wins (will show only total on end screen)increment by 1 and 5 seconds later screen flips to next question
//if wrong - show banner saying "wrong", show right answer, 
//losses increment by 1 and 5 seconds later screen flips to next question
//if time runs out - show banner saying "time's up", show right answer and 5 seconds later screen flips to next question
//timer is restarted at 30 seconds
//end screen shows number of wins
//end screen shows number of losses
//end screen gives button to restart



//facts:
//Starbucks founded in Seattle in 1971
//Space Needle was built in 1962; most iconic landmark
//Seahawks founded 1976
//most common way to get to work in Seattle is biking
//


//set variables
var wins = 0
var losses = 0
var timerCountdown = 5;
var countdownRunner;

 $( document ).ready(function(){
    // var contents = $("#startingText"); (commenting out because used just for testing purpsoses for the alert below)
    //alert( contents.html());
    //before the page renders need to hide my div and set the timer
    $("#timesUpTimer").hide();
    $("#questionHolder").hide();
    updateMessageTime(timerCountdown);
    initializeEventHandler();
});



function updateMessageTime(newMessage){
    $("#timeLeft").text(newMessage);
}

function initializeEventHandler(){
    $("#start").click(function(){
        loadQuestion(questionOne);
        $("#welcomeWindow").hide();
        $("#questionHolder").show(); //questionHolder is my template
        countdownRunner = setInterval(countdown, 1000);
    });
}

function countdown() {
    console.log(timerCountdown);
    updateMessageTime(timerCountdown);

    if(timerCountdown === 0){
        clearInterval(countdownRunner);
        // alert("times up");
        $("#timesUpTimer").show();
        $(".answerButton").attr("disabled", true);
        displayCorrectAnswer(questionOne);
    } else {
        timerCountdown--
    }
}

function displayCorrectAnswer(questionArray){
    var indexCorrectAnswer = questionArray[2];
    $(".answerButton").eq(indexCorrectAnswer).addClass("correctanswer");
}

var questionOne = [
    "what is the most common way to travel to work?",
    ["car", "bike", "bus", "walk"], 1
]

function loadQuestion(questionArray){
    var answers = questionArray[1];
    var answerButtons = $(".answerButton");
    $("#question").text(questionArray[0]);

    for (var i = 0; i < answerButtons.length; i++){
        answerButtons[i].innerText = answers[i];
    }
}
