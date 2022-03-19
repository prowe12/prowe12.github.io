//selectors
var tableRow = document.getElementsByTagName('tr');
var tableCell = document.getElementsByTagName('td');
var tableSlot = document.querySelectorAll('.slot');
const playerTurn = document.querySelector('.player-turn');
const reset = document.querySelector('.reset');

for(let i = 0; i < tableCell.length; i++){
    tableCell[i].addEventListener('click',(e)=>{
        console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`);

    })
}

//have players state their name
while(!player1){
    var player1 = prompt('Player One: Enter your name. You will be red.');
}
player1Color = 'red';

while(!player2){
    var player2 = prompt('Player Two: Enter your name. You will be yellow.');
}
player2Color = 'yellow';

var board = [];
board.length = 6;
for(let i = 0; i<6; i++){
    board[i] = [];
    board[i].length = 7;
    for(let j = 0; j<7; j++){
        board[i][j] = 0;
    }

}

//want current player to start as 1
var currentPlayer = 1;
playerTurn.textContent = `${player1}'s turn`;

//go through the cells and show that we know they all have white background
Array.prototype.forEach.call(tableCell, (cell)=>{
    cell.addEventListener('click',changeColor);
    cell.style.backgroundColor = 'rgb(200, 225, 250)';
})

function changeColor(e){
    let column = e.target.cellIndex;
    let row = [];

    for(let i = 5; i >=0; i --){
        //work up from the bottom of the column and fill the first
            //empty slot you come across with a tile from the player
        if(tableRow[i].children[column].style.backgroundColor == 'rgb(200, 225, 250)'){
            row.push(tableRow[i].children[column]);
            if(currentPlayer === 1){
                board[i][column] = 1
                row[0].style.backgroundColor = player1Color;
                if(winCheck()){
                    console.log(board);
                    playerTurn.textContent = `${player1} wins!`;
                    playerTurn.style.color = player1Color;
                    return(alert('winner!'));
                }
                else if(drawCheck()){
                    playerTurn.textContent = 'game is a draw';
                    return alert('draw!');
                }
                else{
                    playerTurn.textContent = `${player2}'s turn!`;
                    return currentPlayer = 2;
                }
            }
            else{
                board[i][column] = -1
                row[0].style.backgroundColor = player2Color;
                if(winCheck()){
                    console.log(board);
                    return(alert('winner!'));
                }
                else if(drawCheck()){
                    playerTurn.textContent = 'game is a draw';
                    return alert('draw!');
                }
                else{
                    playerTurn.textContent = `${player1}'s turn!`;
                    return  currentPlayer = 1;

                }
            }
        }
    }
}

//win checks
function colorMatchCheck(one,two, three, four){
    return (one ===two && one === three && one === four && one !== 'rgb(200, 225, 250)');
}

function horizontalCheck(){
    for(let row = 0; row < tableRow.length; row ++){
        for(let col = 0; col < 4; col++){
            if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor,
                tableRow[row].children[col+1].style.backgroundColor,
                tableRow[row].children[col+2].style.backgroundColor,
                tableRow[row].children[col+3].style.backgroundColor)){
                    return true;
                }
        }
    }
}

function verticalCheck(){
    for(let col = 0; col < 7; col ++){
        for(let row = 0; row < 3; row ++){
            if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor,
                tableRow[row+1].children[col].style.backgroundColor,
                tableRow[row+2].children[col].style.backgroundColor,
                tableRow[row+3].children[col].style.backgroundColor)){
                    return true;
                }
        }
    }
}

function diagCheckLR(){
    for(let col = 0; col < 4; col ++){
        for(let row = 0; row < 3; row ++){
            if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor,
                tableRow[row+1].children[col+1].style.backgroundColor,
                tableRow[row+2].children[col+2].style.backgroundColor,
                tableRow[row+3].children[col+3].style.backgroundColor)){
                    return true;
                }
        }
    }
}

function diagCheckRL(){
    for(let col = 0; col < 4; col ++){
        for(let row = 5; row >2; row --){
            if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor,
                tableRow[row-1].children[col+1].style.backgroundColor,
                tableRow[row-2].children[col+2].style.backgroundColor,
                tableRow[row-3].children[col+3].style.backgroundColor)){
                    return true;
                }
        }
    }
}

function winCheck(){
    return (horizontalCheck() || verticalCheck() || diagCheckLR() || diagCheckRL());
}

function drawCheck(){
    let fullSlot = [];
    for(let i = 0; i < tableCell.length; i++){
        if(tableCell[i].style.backgroundColor !== 'rgb(200, 225, 250)'){
            fullSlot.push(tableCell[i]);
        }
    }
    if(fullSlot.length === tableCell.length){
        return true;
    }
    return false;
}

reset.addEventListener('click',()=>{
    tableSlot.forEach(slot=>{
        slot.style.backgroundColor = 'rgb(200, 225, 250)';
    });
    playerTurn.style.backgroundColor = 'black';
    return(currentPlayer ===1 ? playerTurn.textContent = `${player1}'s turn` : playerTurn.textContent = `${player2}'s turn!`);
})

//keep 2d array going of the rack the whole time,
    //and use this to calculate the next moves for the computer
function getNextPlay(depth, maxDepth, board){
    return minimax(depth, maxDepth, board);
}

function minimax(depth, maxDepth, board){
    var actVal = maxValue(depth, board, maxDepth, -1);
    return actVal[0];
}

function maxValue(depth, board, maxDepth, prevPlay){
    var actVal = [];
    actVal.length = 2;
    if(cutoffTest(depth, maxDepth)){
        const eval = eval();
        actVal[0] = prevPlay;
        actVal[1] = eval;
        return actVal;
    }

    const value = -100000;
    const action = -1;
    depth++;
    var validActs = action(board);
    for(let i = 0; i< validActs.length; i++){
        let a = validActs[a];
        if(a === -1){
            continue;
        }

        let minA = minValue(depth, result(a, board, -1),maxDepth, a)[1];
        if(minA >=value){
            value = minA;
            action = a;
            actVal[0] = action;
            actVal[1] = value;
        }

        undoResult(a, rack);
    }
    return actVal;
}

function minValue(depth, board, maxDepth, prevPlay){
    var actVal = [];
    actVal.length = 2;
    if(cutoffTest(depth, maxDepth)){
        const eval = eval();
        actVal[0] = prevPlay;
        actVal[1] = eval;
        return actVal;
    }

    const value = 10000;
    const action = -1;
    depth++;
    var validActs = action(board);
    for(let i = 0; i<validActs.length; i++){
        let a = validActs[i];
        if(a===-1){
            continue;
        }
        let maxA = maxValue(depth, result(a,board, 1),a)[1];
        if(maxA <= value){
            action = a;
            value = maxA;
            actVal[0] = a;
            actVal[1] = value;
        }
    }
    return actVal;
}

function result(column, board, player){
    if(board[0][column]!==0){
        return board;
    }

    for(let i = 0; i< board.length-1; i++){
        if(board[i+1][column]!==0){
            board[i][column] = player;
            break;
        }
    }
    return board;
}

function undoResult(column, board){
    for(let row = 0; row<board.length; row++){
        if(board[row][column]!==0){
            board[row][column] = 0;
            return board;
        }
    }
    return board;
}

function cutoffTest(depth, maxDepth){
    return depth===maxDepth || mmWinCheck();
}

function action(board){
    var validActs = [];
    for(let i = 0; i<board[0].length; i++){
        if(board[0][i] ===0){
            validActs.push(i);
        }
    }
    return validActs;
}

function mmWinCheck(){
    return true;
}

//fill in minimax win checks

