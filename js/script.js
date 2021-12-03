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


function restartGame(){
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = '';
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    gameActive = true;
}
function cellPlayed(index, cell){
    if(gameState.every(i => i.includes(""))){
        gameState[index] = currentPlayer;
        cell.innerHTML = currentPlayer;
        if(gameState.every(i => i.includes(""))){
            gameValidation();
            opponentsTurn()
        }else{
            gameValidation()
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;    
        }
    }else{
        gameValidation()
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
    }
}

function opponentsTurn(){
    randomPos();
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
        
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
        }
        if(checker(winningConditions[i], oPlayerArr)){
            
            statusDisplay.innerHTML = loseMessage();
            gameActive = false;
        }
    }
}

function clickedCell(clickCellEvenet) {
    if(gameState.every(i => i === true)){
        gameValidation()
        statusDisplay.innerHTML = drawMessage();
        gameActive = false
    }else{
        const clickedCell = clickCellEvenet.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    
        if(gameState[clickedCellIndex] !== ''|| gameState[clickedCellIndex] == 'O' || !gameActive){
            console.log(12412512512);
            return;
        }
        else{
            cellPlayed(clickedCellIndex, clickedCell);
            gameValidation();
        }
    }
}

document.querySelector('.game--restart').addEventListener('click', restartGame);

cell = document.querySelectorAll('.cell');
cell.forEach(cell => cell.addEventListener('click', clickedCell));