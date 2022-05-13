const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const dictDefeats = {
    'rock': new Set(['lizard','scissors']),
    'paper': new Set(['rock', 'spock']),
    'scissors': new Set(['paper','lizard']),
    'lizard': new Set(['paper', 'spock']),
    'spock': new Set(['scissors', 'rock'])
}

const dictMessages = {
    "rock-lizard": "Rock crushes lizard!",
    "rock-scissors": "Rock crushes scissors!",
    "paper-rock": "Paper covers rock!",
    "paper-spock": "Paper disproves Spock!",
    "scissors-paper": "Scissors cuts paper!",
    "scissors-lizard": "Scissors decapitates lizard!",
    "lizard-paper": "Lizard eats paper!",
    "lizard-spock": "Lizard poisons Spock!",
    "spock-scissors": "Spock smashes scissors!",
    "spock-rock": "Spock vaporizes rock!"
}


let playerScore = 0;
let computerScore = 0;

const message_div = document.querySelector('.message')
const computerIcon_div = document.getElementById("computericon")
const playerIcon_div = document.getElementById("playericon")


const playerScore_span = document.getElementById("playerscore")
const computerScore_span = document.getElementById("computerscore")

const rockButton_div = document.getElementById("rock")
const paperButton_div = document.getElementById("paper")
const scissorsButton_div = document.getElementById("scissors")
const lizardButton_div = document.getElementById("lizard")
const spockButton_div = document.getElementById("spock")

rockButton_div.addEventListener('click', () => play("rock"))
paperButton_div.addEventListener('click', () => play("paper"))
scissorsButton_div.addEventListener('click',  () => play("scissors"))
lizardButton_div.addEventListener('click', () => play("lizard"))
spockButton_div.addEventListener('click', () =>  play("spock"))

const overlay_div = document.querySelector(".overlay")
const modal_div = document.querySelector(".modal")
const endMessage_div = document.querySelector('.endgame-message')
const resetButton_div = document.querySelector('.resetbutton')
resetButton_div.addEventListener('click', () => restart())


function computerPlay() {
    let computerChoice = choices[Math.floor(Math.random() * 5)];
    return computerChoice
}

function restart() {
    playerScore = 0;
    computerScore = 0;
    computerIcon_div.innerHTML = '';
    playerIcon_div.innerHTML = '';
    playerScore_span.innerHTML = 0;
    computerScore_span.innerHTML = 0;
    message_div.textContent = "First to five wins! Make your selection.";
    overlay_div.style.display = "none";
    computerIcon_div.classList.remove("highlight")
    playerIcon_div.classList.remove("highlight")
}

function play(playerSelection) {
    let computerSelection = computerPlay();
    computerIcon_div.innerHTML = document.getElementById(computerSelection).innerHTML;
    playerIcon_div.innerHTML = document.getElementById(playerSelection).innerHTML;
    computerIcon_div.classList.remove("highlight")
    playerIcon_div.classList.remove("highlight")
    if (playerSelection === computerSelection) {
        message_div.textContent = "It's a draw! Everyone gets a point.";
        playerScore++
        computerScore++
        playerIcon_div.classList.add("highlight")
        computerIcon_div.classList.add("highlight")
    } 
    else if (dictDefeats[playerSelection].has(computerSelection)){
        let messageKey = playerSelection + '-' + computerSelection 
        message_div.textContent = dictMessages[messageKey];
        playerScore++
        playerIcon_div.classList.add("highlight")
    }
    else {
        let messageKey = computerSelection + '-' + playerSelection
        message_div.textContent = dictMessages[messageKey];
        computerScore++
        computerIcon_div.classList.add("highlight")
    }
    playerScore_span.innerHTML = playerScore
    computerScore_span.innerHTML = computerScore

    if (playerScore === 5 && computerScore === 5) {
        endMessage_div.textContent = "Game over. It's a tie!";
    }
    else if (playerScore === 5) {
        endMessage_div.textContent = "Game over. You won!";
    }
    else if (computerScore === 5) {
        endMessage_div.textContent = "Game over. Computer won!"
    }

    if (playerScore === 5 || computerScore === 5) {
        display_overlay();
        setTimeout(display_modal, 2000)
    }
}

function display_overlay(){
    overlay_div.style.display = "block"
}

function display_modal(){
    modal_div.style.display = ""
}



