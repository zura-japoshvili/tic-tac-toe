const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = "X";
let opponent = "O";
let gameState = ["", "", "", "", "", "", "", "", ""];


const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const loseMessage = () => `You Lost The Game`;



const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// The function returns everything to the initial stage so that the player can restart the game
function restartGame(){
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = '';
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    document.querySelectorAll('.cell').forEach(cell => cell.classList.remove("win-anim","lose-anim"));
    gameActive = true;
}

// In this function, we check whether the clicked cell can be filled. 
// Also if all the trays are filled we end the game.
function cellPlayed(index, cell){
    if(gameState.includes("")){
        gameState[index] = currentPlayer;
        cell.innerHTML = currentPlayer;
        opponentsTurn();
    }else{
        gameValidation()
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
    }
}

// The functions "opponentsTurn" and randomPos work together (they are recursive functions).
//A random position is created in the "randomPos" function if this position 
//is occupied it calls "opponentsTurn" which re-calls "randomPos"
function opponentsTurn(){
    if(gameState.includes("")){
        randomPos();
    }else{ 
        gameValidation()
        statusDisplay.innerHTML = drawMessage();
        gameActive = false; 
    }
}
function randomPos(){
    let usedPos = [];
    gameState.forEach((value, index) => {
        if(value !== '' ){
            usedPos.push(index);
        }
    });
    let randomNum = Math.floor(Math.random() * 9);
    if(usedPos.includes(randomNum)){;
        opponentsTurn();
    }
    else{
        gameState[randomNum] = opponent;
        cell[randomNum].innerHTML = opponent;
    }
}


// A feature that checks whether any player has been able to win
// Arrays (xPlayerArr and oPlayerArr) store the O and X indexes to prevent overwriting.
// And through the "checker" we check whether any of the players has won

function gameValidation(){
    let xPlayerArr = [];
    let oPlayerArr = [];
    gameState.forEach((value, index) => {        
        if(value === 'X' ){
            xPlayerArr.push(index);
        }
        if(value === 'O'){
            oPlayerArr.push(index);
        }
    });
    let checker = (arr, arr2) => {
        return arr.every(i => arr2.includes(i));
    };

    for(let i = 0; i < winningConditions.length; i++){
        if(checker(winningConditions[i], xPlayerArr)){
            for(let z in winningConditions[i]){
                cell[winningConditions[i][z]].classList.add("win-anim");
            }
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
        }
        else if(checker(winningConditions[i], oPlayerArr)){
            for(let z in winningConditions[i]){
                cell[winningConditions[i][z]].classList.add("lose-anim");
            }
            statusDisplay.innerHTML = loseMessage();
            gameActive = false;
        }
    }
}

// When we click on any cell, 
// we return the event through which we transform the attribute "data-cell-index" into an integer.
// Then we check if "GameStatus" is a false or if the given cell is already filled
// If any of the given will be a true player we will no longer allow the game to continue.
function clickedCell(clickCellEvenet) {
    const clickedCell = clickCellEvenet.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if(gameState[clickedCellIndex] !== ''|| gameState[clickedCellIndex] == 'O' || !gameActive){
        return;
    }
    else{
        cellPlayed(clickedCellIndex, clickedCell);
        gameValidation();
    }

}

document.querySelector('.game--restart').addEventListener('click', restartGame);

cell = document.querySelectorAll('.cell');
cell.forEach(cell => cell.addEventListener('click', clickedCell));