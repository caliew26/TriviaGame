//end screen shows:
    //title(heading)
    //number of wins
    //number of losses
    //button to restart


//set variables
const ONE_SECOND = 1000,
    FIVE_SECOND = 5000

var wins = 0,
    losses = 0,
    timesUp =0 ,
    timerCountdown = 5,
    countdownRunner,
    resetTime


//most common way to get to work in Seattle is biking
const questionOne = [
    "What is the most common way to travel to work?",
    ["Car", "Bike", "Bus", "Walk"], 1
]

//Starbucks founded in Seattle in 1971
const questionTwo = [
    "What world wide company was founded in Seattle in 1971?", 
    ["Nabisco", "Boeing", "Google", "Starbucks"], 3
]

//Space Needle was built in 1962; most iconic landmark
const questionThree = [
    "In 1962, for the worlds fair, what landmark was built?",
    ["Mt. St. Helens", "Safeco Field", "Space Needle", "Kingdome"], 2
]

//Famous bands from Seattle include Soundgarden, Pearl Jam, Heart, Foo Fighters
const questionFour = [
    "Which of the following bands is NOT from Seattle?", 
    ["Chicago", "Soundgarden", "Heart", "Pearl Jam"], 0
]

//does not have NBA team but has NFL, MLS, MLB
const questionFive = [
    'Seattle has all of the following professional sports but which?',
    ["NBA", "NFL", "MLS", "MLB"], 0
]

const questions = [questionOne, questionTwo, questionThree, questionFour, questionFive];

var currentQuestion = questions[0];


//need a welcome page with instructions and a start button that will be clickable 
//when start is clicked, instructions and start button will hide
//that will start the timer and show the first question
 $( document ).ready(function(){
    //before the page renders need to hide my div and set the timer
    $("#timesUpTimer").hide();
    $("#questionHolder").hide();
    $("#correctAnswerChosen").hide();
    $("#wrongAnswerChosen").hide();
    $("#startingTimerText").hide();
    $("#ending").hide();
    updateTimeRemaining(timerCountdown);
    // initializeEventHandlers();

    $("#start").click(function(){
        loadQuestion(currentQuestion);
        $("#startingTimerText").show();
        $("#welcomeWindow").hide();
        $("#questionHolder").show();
        countdownRunner = setInterval(countdown, ONE_SECOND);
    });
    
    $(".answerButton").click(function(){
        clearInterval(countdownRunner);
        console.log(this.innerText);
        $(".answerButton").attr("disabled", true);
        var index = $(".answerButton").index(this);
        console.log("index of button " + index);
        displayCorrectAnswer(currentQuestion);
        console.log("current question correct answer " + currentQuestion);
        
        if (index === currentQuestion[2]){
            $("#correctAnswerChosen").fadeIn();
            $(this).addClass("correctAnswerChosen");
            updateTimeRemaining(timerCountdown)
            wins++;
            console.log("wins " + wins);
            setTimeout(delayNewQuestion, FIVE_SECOND);
        }
        else {
            $("#wrongAnswerChosen").fadeIn();
            $(this).addClass("wronganswer");
            updateTimeRemaining(timerCountdown)
            $("#startingTimerText").hide();
            losses++
            console.log("losses" + losses);
            setTimeout(delayNewQuestion, FIVE_SECOND);
            
        }
        
    });

    $("#replay").click(function(){
        $("#startingTimerText").show();
        updateTimeRemaining(timerCountdown);
        $("#welcomeWindow").hide();
        $("#questionHolder").show();
        loadQuestion(questions);
        $(".answerButton").attr("disabled", false);
        $("#ending").hide();
        countdownRunner = setInterval(countdown, ONE_SECOND);
        $(".answerButton").removeClass("correctanswer");
        $(".wronganswer").removeClass("wronganswer");

    });
});

//this funcxtion will pass whatever is argument is used when the updateTimeRemaing is called (could be anything)
function updateTimeRemaining(newTime){
    $("#timeLeft").text(newTime);
}

function resetTimer(resetTime){
    resetTime = timerCountdown
}

//when the user clicks the start button things to happen:
    //instructions get hidden
    //first question is populated on the screen
    //4 possible answers which are buttons are visible and able to be clicked
    //countdown timer starts counting down from 30 seconds
        //user runs out of time
            //banner saying "you're out of time"
            //buttons get disabled
            //correct answer is displayed (button matching the answer is highlighted (but still disabled))
            //screen changes to next question after 5 seconds

        //user selects the button that contains the correct answer
            //banner saying "you're right, thats the correct answer"
            //countdown timer stops
            //buttons get disabled (user can only click one button)
            //screen changes to next question after 5 seconds

//when start button is clicked, questionOne will load with a timer that will start counting down at 30 seconds
// function initializeEventHandlers(){
   
// }

function delayNewQuestion(){
    advanceToNextQuestion(),FIVE_SECOND;
}
//could you use on correctAnswerChosen (onclick) then do setTimeout?
//setTimeout
//use on wronganswer (onclick) then do setTimeout
//but then what about timeout? how would that onclick?

function advanceToNextQuestion(){
    var nextIndex = questions.indexOf(currentQuestion)+1;
    if(nextIndex < questions.length){
        currentQuestion = questions[nextIndex];
        loadQuestion(currentQuestion);
        updateTimeRemaining(timerCountdown);
        countdownRunner = setInterval(countdown, ONE_SECOND); //this gives me the actual countdown
        $(".answerButton").attr("disabled", false);
        $("#correctAnswerChosen").hide();
        $("#wrongAnswerChosen").hide();
        $(".answerButton").removeClass("correctanswer");
        $(".wronganswer").removeClass("wronganswer");
        $("#startingTimerText").show();
        $("#timesUpTimer").hide();
        timerCountdown = 5;
    }
    else{;
        $("#questionHolder").hide();
        $("#startingTimerText").hide();
        $("#correctAnswerChosen").hide();
        $("#wrongAnswerChosen").hide();
        $("#timesUpTimer").hide();
        $("#ending").show();
        $("#replay").replay;
        timerCountdown = 5;
        $("#wins").text(" " + wins);
        $("#losses").text(" " + losses);
        $("#timesup").text(" " + timesUp);
    }
}

function replay(){
    location.reload();
}
//if time runs out - show banner saying "your time is up"
//show right answer
//need timer that will start at 30 seconds and countdown to zero
//when time is up, buttons will be disabled
//timer is reset at 30 seconds on screen flip
function countdown() {
    console.log(timerCountdown);
    updateTimeRemaining(timerCountdown);

    if(timerCountdown === 0){
        clearInterval(countdownRunner);
        timerCountdown = 5;
        $("#startingText").hide();
        $("#timesUpTimer").show();
        $(".answerButton").attr("disabled", true);
        displayCorrectAnswer(currentQuestion);
        timesUp++
        console.log("timesup: " + timesUp);
        setTimeout(delayNewQuestion, FIVE_SECOND);
    } else {
        timerCountdown--
    }
}

//if wrong - show banner saying "wrong", show right answer, 
//correct answer, banner saying "right", button will be made different so user knows the correct answer
function displayCorrectAnswer(questionArray){
    var indexCorrectAnswer = questionArray[2];
    $(".answerButton").eq(indexCorrectAnswer).addClass("correctanswer");
}

//this function is used that will cycle through the questionOne array and the answerButton array, and the answer array
function loadQuestion(questionArray){
    var answers = questionArray[1];
    var answerButtons = $(".answerButton");
    $("#question").text(questionArray[0]);

    for (let i = 0; i < answerButtons.length; i++){
        answerButtons[i].innerText = answers[i];
    }
}

  


    //pseudo code that hasn't been used - or has been repeated above, saving til end
    //html - title screen
    //instructions
    //start button
    //image loads

    //will need one question at a time with, 4 options as possible answers

    //player can only guess one answer (right or wrong)
    //if right - show a "your'e right, congrats for choosing the right answer" banner
    //5 second wait and then screen flips to the next question (doesn't have to wait for timer to end)
    //record wins (will show total on end screen only) increment by 1 and 5 seconds later screen flips to next question
    //after 5 seconds later screen flips to next question
    //losses increment by 1 and 5 seconds later screen flips to next question


    //facts:
    //Seahawks founded 1976
    //Mt. St. Helens errupted 5/18/80
    //Mt Rainier 14,411 feet tall, highest mountain in Washington State
    //One of the most popular music fests on Labor Day is Bumbershoot
    //Famous musicians from Seattle include Kurt Cobain, Bing Crosby, Jimi Hendrix, Kenny Loggins, Kenny G
    //State Bird is the American Gold Finch