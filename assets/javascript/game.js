var $newGameButton = document.getElementById("new-game-button");
var $placeholders = document.getElementById("placeholders");
var $guessedLetters = document.getElementById("guessedLetters");
var $guessesLeft = document.getElementById("guesses-left");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");
var $audio = document.getElementById("audio");

var cities = ["Atlanta","Boston","Brooklyn","Charlotte","Chicago","Cleveland","Dallas","Denver","Detroit","Golden State","Houston","Indiana","Los Angeles","Memphis","Miami","Milwaukee","Minnesota","New Orleans","New York","Oklahoma City","Orlando","Philadelphia","Phoenix","Portland","Sacramento","San Antonio","Toronto","Utah","Washington"];
var images = ["hawks.png","celtics.jpg","nets.png","hornets.png","bulls.jpg","cavs.png","mavs.png","denver.jpg","pistons.gif","gs.jpeg","rockets.jpg","pacers.jpg","lakers.png","grizz.png","heat.jpeg","bucks.png","timber.jpg","pelicans.png","ny.png","okc.jpg","magic.gif","76.png","phx.jpeg","port.jpg","sac.png","sa.jpg","rap.jpg","jazz.jpg","dc.png"]
var wins = 0;
var losses = 0;
var guessesLeft = 10;
var gameRunning = false;
var pickedTeam = '';
var pickedTeamPlaceHolderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];


//New Game Function 
function gameStart() {
    //Reset game paramaters
    gameRunning = true;
    guessesLeft = 10;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedTeamPlaceHolderArr = [];
//Pick new word
    pickedTeam = cities[Math.floor(Math.random() * cities.length)];
    //create placeholders
    for( var i = 0; i < pickedTeam.length; i++) {
        if(pickedTeam[i] === " ") {
            pickedTeamPlaceHolderArr.push(" ");
        }else{
            pickedTeamPlaceHolderArr.push('_');
        }
     }
     var pickedTeamIndex = cities.indexOf(pickedTeam)
     var pickedImageIndex = pickedTeamIndex;
     //write elements to page
    $guessesLeft.textContent = guessesLeft;
    $wins.textContent = wins;
    $losses.textContent = losses;
    $placeholders.textContent = pickedTeamPlaceHolderArr.join(' ');
    $guessedLetters.textContent = incorrectLetterBank;
    var pickedTeamIndex = cities.indexOf(pickedTeam)
    var pickedImageIndex = pickedTeamIndex;
    //Image Swap Function
    function imgSwap() {
        var oldImg = document.getElementById("teamPic");
        var newIMG = images[pickedImageIndex]
    
        oldImg.src = "assets/images/" + newIMG;
    }
    imgSwap();
}

//letterguesses function, takes in the letter you presed and sees if its in the selected word.
function letterGuess(letter) {
    if(gameRunning === true && guessedLetterBank.indexOf(letter) === -1){
        //run game logic
        guessedLetterBank.push(letter);
        //check if guessed letter is in my picked word
        for(var i = 0; i < pickedTeam.length; i++) {
            // convert both values to lower case so it can compare them correctly
            if (pickedTeam[i].toLocaleLowerCase() === letter.toLocaleLowerCase()){
                // if a match, swap character in the placeholder with the actual letter
                pickedTeamPlaceHolderArr[i] = pickedTeam[i];
            }
        }
        $placeholders.textContent = pickedTeamPlaceHolderArr.join(' ');
        checkIncorrect(letter);
    }
    else {
            if(!gameRunning){
                alert("The game isn't running, click on new button to start over.");
            } else{
                alert("you have already chosen this letter, try a new one!");
            }
        }
 }

 //Check if letter is incorrect
function checkIncorrect(letter) {
    if (pickedTeamPlaceHolderArr.indexOf(letter.toLowerCase()) === -1 && pickedTeamPlaceHolderArr.indexOf(letter.toUpperCase()) === -1) {
    guessesLeft--;
    incorrectLetterBank.push(letter);
    $guessedLetters.textContent = incorrectLetterBank.join(' ');
    $guessesLeft.textContent = guessesLeft;
    }
    checkLoss();
}

//Check if loss
function checkLoss() {
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
        $placeholders.textContent = pickedTeam;
    }
    checkWin();
}

//Check if win
function checkWin() {
    if (pickedTeam.toLocaleLowerCase() === pickedTeamPlaceHolderArr.join("").toLocaleLowerCase())
    {   wins++;
        gameRunning= false;
        $wins.textContent = wins;
    }
}

//Event listner for key press
document.onkeyup = function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key)
    }
}

function playAudio(){
    $audio.play();
}

//Event listener for new game
$newGameButton.addEventListener("click", gameStart, playAudio);
