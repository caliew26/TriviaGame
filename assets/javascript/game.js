//player can only guess one answer (right or wrong)
//if right - show a "your'e right, congrats for choosing the right answer" banner
//5 second wait and then screen flips to the next question (doesn't have to wait for timer to end)
//record wins (will show total on end screen only) increment by 1 and 5 seconds later screen flips to next question
//after 5 seconds later screen flips to next question
//losses increment by 1 and 5 seconds later screen flips to next question

//end screen shows number of wins
//end screen shows number of losses
//end screen gives button to restart


//set variables
var wins = 0
var losses = 0
var timerCountdown = 5;
var countdownRunner;


//need a welcome page with instructions and a start button that will be clickable 
//when start is clicked, instructions and start button will hide
//that will  start the first question
 $( document ).ready(function(){
    // var contents = $("#startingText"); (commenting out because used just for testing purpsoses for the alert below)
    //alert( contents.html());
    //before the page renders need to hide my div and set the timer
    $("#timesUpTimer").hide();
    $("#questionHolder").hide();
    $("#correctAnswerChoosen").hide();
    updateMessageTime(timerCountdown);
    initializeEventHandler();
});



function updateMessageTime(newMessage){
    $("#timeLeft").text(newMessage);
}


//when start button is clicked, questionOne will load with a timer that will start counting down at 30 seconds
function initializeEventHandler(){
    $("#start").click(function(){
        loadQuestion(questionOne);
        $("#welcomeWindow").hide();
        $("#questionHolder").show(); //questionHolder is my template
        countdownRunner = setInterval(countdown, 1000);
    });
}

//if time runs out - show banner saying "your time is up"
//show right answer
//need timer that will start at 30 seconds and countdown to zero
//when time is up, buttons will be disabled
//timer is restarted at 30 seconds on screen flip
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

//if wrong - show banner saying "wrong", show right answer, 
//correct answer, button will be made different so user knows the correct answer
function displayCorrectAnswer(questionArray){
    var indexCorrectAnswer = questionArray[2];
    $(".answerButton").eq(indexCorrectAnswer).addClass("correctanswer");
}


//will need one question at a time with, 4 options as possible answers
//most common way to get to work in Seattle is biking
var questionOne = [
    "what is the most common way to travel to work?",
    ["Car", "Bike", "Bus", "Walk"], 1
]

//Starbucks founded in Seattle in 1971
var questionTwo = [
    "What world wide company was founded in Seattle in 1971?", 
    ["Nabisco", "Boeing", "Google", "Starbucks"], 4
]

//Space Needle was built in 1962; most iconic landmark
var questionThree = [
    "In 1962, for the worlds fair, what monument was built?",
    ["Mt. St. Helens", "Safeco Field", "Space Needle", "Kingdome"], 3
]

//Famous bands from Seattle include Soundgarden, Pearl Jam, Heart, Foo Fighters
var questionFour = [
    "Which of the following bands is NOT from Seattle?", 
    ["Chicago", "Soundgarden", "Heart", "Pearl Jam"], 1
]

//does not have NBA team but has NFL, MLS, MLB
var questionFive = [
    'Seattle has all of the following professional sports but which?',
    ["NBA", "NFL", "MLS", "MLB"], 1
]

//facts:
//Seahawks founded 1976
//Mt. St. Helens errupted 5/18/80
//Mt Rainier 14,411 feet tall, highest mountain in Washington State
//One of the most popular music fests on Labor Day is Bumbershoot
//Famous musicians from Seattle include Kurt Cobain, Bing Crosby, Jimi Hendrix, Kenny Loggins, Kenny G
//State Bird is the American Gold Finch


function loadQuestion(questionArray){
    var answers = questionArray[1];
    var answerButtons = $(".answerButton");
    $("#question").text(questionArray[0]);

    for (var i = 0; i < answerButtons.length; i++){
        answerButtons[i].innerText = answers[i];
    }
}
