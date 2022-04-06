/**
 * Grab the selectors from the html page
 */

//get an array of the table rows 
var tableRow = document.querySelectorAll('.row');

//array of all the cells in the table
var tableCell = document.getElementsByTagName('td');
//array of all the slots in the table(each cell has one slot)
var tableSlot = document.querySelectorAll('.slot');
//this variable will update whose turn it is
const playerTurn = document.querySelector('.player-turn');
//reset button
const reset = document.querySelector('.reset');
//nextMove button
const nextMove = document.querySelector('.next-move');
//array of canvases (one for each column)
let canvas = document.querySelectorAll('.aboveTable');
let context = null;

let testRow = document.querySelectorAll('.slot1');

/**
 * Create array boards that the minimax functions will use to play the game.
 * Gameboard stays updated with the current state of the real game.
 * Board copies the values in gameboard, then is used in minimax to
 * simulate longer connectfour games to then determine which move the computer
 * will make.
 */
 var board = [];
 var playBoard = [];
 board.length = 6;
 playBoard.length = 6;
 for(let i = 0; i<6; i++){
     board[i] = [];
     board[i].length = 7;
     playBoard[i] = [];
     playBoard.length = 7;
     for(let j = 0; j<7; j++){
         board[i][j] = 0;
         playBoard[i][j] = 0;
     }
 
 }


/**
 * Mouseover events that display a game tile above whatever column the
 * human player is hovering over
 */
for(let i = 0; i < tableCell.length; i++){
    //when the player hovers over a cell, place a red tile above that column
    tableCell[i].addEventListener('mouseenter',(e)=>{
        displayMove(e.target.cellIndex);
    })

    //when a player stops hovering over a cell, remove the tile above that column
    tableCell[i].addEventListener('mouseleave',(e)=>{
        clearDisplayMove(e.target.cellIndex);
    })
}



//state player colors
player1Color = 'red';
player2Color = 'yellow';
background = "rgb(200, 225, 250)";



//animation variables
let animationCell;
let animationColumn = 0;
let animationStartPix = 0;
let animationEndPix = 0;
let animationColor = player1Color;
let dropID;

setCanvasBoard();

/**
 * displayMove displays a game tile over the column that the user is hovering on.
 * @param {*} col the inputted column
 */
function displayMove(col){
    let canv = canvas[col];
    let context = canv.getContext('2d');
    context.beginPath();
    context.arc(canv.width/2,canv.height/2,canv.width/2-2,0,2*Math.PI);
    context.fillStyle = animationColor;
    context.strokeStyle = "black";
    context.fill();
    context.restore();
}
function changeCellColor(cell){
    let can = cell.children[0];
    let context = can.getContext("2d");
    console.log(context);
    let xcoord = can.width/2;
    let ycoord = can.height/2;
    console.log(xcoord);
    console.log(ycoord);
    let rad = can.width/2-2;
    console.log(rad);

    context.beginPath();
    context.fillStyle = animationColor;
    context.strokeStyle = "black";
    context.arc(xcoord,ycoord,rad,0,2*Math.PI);
    context.fill();
    context.restore();

    return;
}

async function fallingTile(col){
    let animate;
    for(let i = 0; i<playBoard.length && playBoard[i][col]==0;i++){
        console.log(tableRow[i].children[col]);

        if(i==0){
            animationCell = tableRow[i].children[col];
            animationStartPix = 0;
            animationEndPix = animationCell.children[0].height+animationCell.children[0].height/2;
            console.log(animationEndPix);
            console.log("calling animation");
            console.log(animationCell.children[0]);
            animate = await fallingTileAnimation();

        }
        
    }
    return;

}

// async function callAnimation(start){
//     while(animationStartPix >0 || start == 0){
//         console.log("start = ",start);
//         console.log(animationStartPix);
//         start = 1;
//         window.requestAnimationFrame(fallingTileAnimation);
//     }
//     console.log("start = ",start);
//     console.log(animationStartPix);
//     return;
// }


async function fallingTileAnimation(){
    let cell = animationCell.children[0];
    if(animationStartPix==2){
        console.log(cell);
    }
    //console.log(cell);
    //console.log(animationStartPix);
    //console.log(animationEndPix);
    let context = cell.getContext("2d");

    context.clearRect(0,0,cell.width,cell.height);
    context.save();

    context.beginPath();
    context.arc(cell.width/2,animationStartPix,cell.width/2-2,0,2*Math.PI);
    context.fillStyle = animationColor;
    context.fill();
    context.restore();
    animationStartPix++;

    if(animationStartPix <= animationEndPix){
        window.requestAnimationFrame(()=>{
            setTimeout(()=>{
                console.log("in setTimeout");
                fallingTileAnimation();
            },0);
        });
        //return;
    }
    else{
        console.log("setting animation back to 0");
        animationStartPix=0;
        return;
    }
}

function clearCell(cell){
    console.log("change color");
    console.log(cell.children[0]);
    let context = cell.children[0].getContext("2d");
    console.log(context);
    context.clearRect(0,0,cell.children[0].width, cell.children[0].height);
    context.restore();
}

function setCanvasBoard(){
    console.log("in testCanv");
    for(let i = 0; i < testRow.length; i++){
        let testr = testRow[i];
        let context = testr.getContext("2d");
        context.beginPath();
        context.arc(testr.width/2,testr.height/2,testr.width/2-2,0,2*Math.PI);
        context.fillStyle = background;
        context.strokeStyle = "black";
        context.fill();
        context.restore();
    }
}

/**
 * ClearDisplayMove clears the game tile from the column
 * @param {*} col 
 */
function clearDisplayMove(col){
    let canv = canvas[col];
    let context = canv.getContext('2d');
    context.clearRect(0,0,canv.width, canv.height);
}





//want current player to start the game
var currentPlayer = 1;
playerTurn.textContent = `Your turn!`;

//go through the cells and show that we know they all have white background
// Array.prototype.forEach.call(tableCell, (cell)=>{
//     cell.style.backgroundColor = 'rgb(200, 225, 250)';
//     cell.addEventListener('click',(cell)=>{
//         if(currentPlayer ===1){
//             playerMove(cell);
//         }
//     });
    
// })

for(let i = 0; i<tableRow.length; i++){
    console.log(tableRow[i]);
    for(let j = 0; j<tableRow[i].children.length; j++){
        cell = tableRow[i].children[j];
        cell.addEventListener('click',(cell)=>{
            if(currentPlayer ===1){
                console.log(j);
                playerMove(cell,j);
            }
        });
    }
}

/**
 * playerMove makes one move for the player, then sets it to the computer's turn to make a move.
 * @param {*} e the column the human player wants to place their tile in
 * @returns 
 */
async function playerMove(e,col){
    console.log("event");
    console.log(e);
    console.log("column");
    console.log(col);
    //console.log(tableRow[0].children);
    //let column = e.target.className.split(" ")[1];
    let column = col;
    console.log("column");
    console.log(column);
    let row = [];

    //dropTile(0,column);
    for(let i = 5; i >=0; i --){
        //work up from the bottom of the column and fill the first
            //empty slot you come across with a tile from the player
            console.log(i);

        if(playBoard[i][column]==0){
            //row.push(tableRow[i].children[column]);
            console.log(i);
            animationColor = player1Color;
            console.log(tableRow[i].children[column]);

            playBoard[i][column] = 1
            let letItFall = await fallingTile(column);
            //console.log(tableRow[i].children[column]);
            changeCellColor(tableRow[i].children[column]);
            //row[0].style.backgroundColor = player1Color;

            if(winCheck()){
                playerTurn.textContent = `You won!`;
                playerTurn.style.color = player1Color;
                reset.textContent = 'Play Again';
            }  
            else if(drawCheck()){
                playerTurn.textContent = 'game is a draw';
            }
            else{
                 playerTurn.textContent = `Computer's turn!`;
                currentPlayer = 2;
                animationColor = player2Color;
                //return computerMove(board);               
            }
            return;
        }
        
    }
}

function testAnimation(){
    context = canvas[0].getContext("2d");
    console.log("click!");
    animationColumn = 60*(1+1);
    animationStartPix = 0;
    animationEndPix = 60*(1);
    animationColor = player1Color;
    window.requestAnimationFrame(dropTile); 
}



 function computerMove(board){
    var depth = 0;
    var maxDepth = 4;
    board = copyBoard(playBoard,board);
    console.log("computerMove");
    console.log("playBoard: ");
    console.log(playBoard);
    console.log("board:");
    console.log(board);
    var column =  getNextPlay(depth, maxDepth, board);
    console.log(column);
    console.log(typeof column);
    let row = [];

    //dropTile(0,column);
    for(let i = 5; i >=0; i --){
        //work up from the bottom of the column and fill the first
            //empty slot you come across with a tile from the player
        if(playBoard[i][column]==0){
            row.push(tableRow[i].children[column]);
            playBoard[i][column] = -1
            animationColor = player2Color;
            fallingTile(column);
            changeCellColor(tableRow[i].children[column]);
            if(winCheck()){
                console.log(board);
                playerTurn.textContent = "Computer won!";
                reset.textContent = 'Play Again';
                }
                else if(drawCheck()){
                    playerTurn.textContent = 'game is a draw';
                }
                else{
                    playerTurn.textContent = `your turn!`;
                    animationColor = player1Color;
                    return  currentPlayer = 1;

                }
            return;
        }
    }
}



function dropTile(row, col){
    dropID = setTimeout(changeTileColor(row,col,animationColor),10000);
    row++;
    if(playBoard[row][col]==0){
        dropTile(row,col);
    }
    return;
}

function changeTileColor(row,col,color){
    tableRow[row].children[col].style.backgroundColor = color;
}

function copyBoard(playBoard,board){
    for(let i = 0; i<board.length; i++){
        for(let j = 0; j<board[i].length; j++){
            board[i][j] = playBoard[i][j];
        }
    }
    return board;
}



//win checks
function colorMatchCheck(one,two, three, four){
    return (one ===two && one === three && one === four && one !== 0);
}

function horizontalCheck(){
    for(let row = 0; row < tableRow.length; row ++){
        for(let col = 0; col < 4; col++){
            if(colorMatchCheck(playBoard[row][col],
                playBoard[row][col+1],
                playBoard[row][col+2],
                playBoard[row][col+3])){
                    return true;
                }
        }
    }
}

function verticalCheck(){
    for(let col = 0; col < 7; col ++){
        for(let row = 0; row < 3; row ++){
            if(colorMatchCheck(playBoard[row][col],
                playBoard[row+1][col],
                playBoard[row+2][col],
                playBoard[row+3][col])){
                    return true;
                }
        }
    }
}

function diagCheckLR(){
    for(let col = 0; col < 4; col ++){
        for(let row = 0; row < 3; row ++){
            if(colorMatchCheck(playBoard[row][col],
                playBoard[row+1][col+1],
                playBoard[row+2][col+2],
                playBoard[row+3][col+3])){
                    return true;
                }
        }
    }
}

function diagCheckRL(){
    for(let col = 0; col < 4; col ++){
        for(let row = 5; row >2; row --){
            if(colorMatchCheck(playBoard[row][col],
                playBoard[row-1][col+1],
                playBoard[row-2][col+2],
                playBoard[row-3][col+3])){
                    return true;
                }
        }
    }
}

function winCheck(){
    return (horizontalCheck() || verticalCheck() || diagCheckLR() || diagCheckRL());
}

function drawCheck(){
    // let fullSlot = [];
    // for(let i = 0; i < tableCell.length; i++){
    //     if(playBoard[i][0]!== 'rgb(200, 225, 250)'){
    //         fullSlot.push(tableCell[i]);
    //     }
    // }
    // if(fullSlot.length === tableCell.length){
    //     return true;
    // }
    // return false;
    for(let i = 0; i< playBoard[0].length; i++){
        if(playBoard[0][i]==0){
            return false;
        }
    }

    return true;
}

reset.addEventListener('click',()=>{
setCanvasBoard();
    for(let i = 0; i<6; i++){
        playBoard[i] = [];
        playBoard[i].length = 7;
        for(let j = 0; j<7; j++){
            playBoard[i][j] = 0;
        }
    
    }
    board = copyBoard(playBoard,board);
    //return(currentPlayer ===1 ? playerTurn.textContent = `Your turn` : playerTurn.textContent = `Computer's turn!`);
    return playerTurn.textContent = 'Your turn!';
});

// nextMove.addEventListener('click', ()=>{
//     if(currentPlayer !==1){
//         console.log("INSIDE NEXT MOVE. current player = ",currentPlayer);
//         computerMove(board);
//         currentPlayer = 1;
//     }
// });



 function getNextPlay(depth, maxDepth, board){
   // console.log("board before minimax:");
   // console.log(board);
    var res =  minimax(depth, maxDepth, board);
    return res;
}

 function minimax(depth, maxDepth, board){
    var actVal = maxValue(depth, board, maxDepth, -1);
    return actVal[0];
}

function maxValue(depth, board, maxDepth, prevPlay){
   // console.log("min value");
    //console.log("depth: ",depth);
    //console.log("prev play: ",prevPlay);
    //console.log("board: ");
    //console.log(board);
    var actVal = [];
    actVal.length = 2;
    if(cutoffTest(board, depth, maxDepth)){
        const eval = evaluate(1,board);
        actVal[0] = prevPlay;
        actVal[1] = eval;
        return actVal;
    }

    var value = -100000;
    var action = -1;
    depth++;
    var validActs = getAction(board);
    for(let i = 0; i< validActs.length; i++){
        let a = validActs[i];
        if(a == -1){
            continue;
        }

        let minA = minValue(depth, result(a, board, 1),maxDepth, a)[1];
        if(minA >=value){
            value = minA;
            action = a;
            actVal[0] = action;
            actVal[1] = value;
        }

        undoResult(a, board);
    }
    return actVal;
}

function minValue(depth, board, maxDepth, prevPlay){
    //console.log("min value");
    //console.log("depth: ",depth);
    //console.log("prev play: ",prevPlay);
   // console.log("board: ");
    //console.log(board);

    var actVal = [];
    actVal.length = 2;
    if(cutoffTest(board, depth, maxDepth)){
        const eval = evaluate(-1,board);
        actVal[0] = prevPlay;
        actVal[1] = eval;
        return actVal;
    }

    var value = 10000;
    var action;
    depth++;
    var validActs = getAction(board);
    for(let i = 0; i<validActs.length; i++){
        let a = validActs[i];
        if(a==-1){
            continue;
        }
        let maxA = maxValue(depth, result(a,board, -1),maxDepth, a)[1];
        if(maxA <= value){
            action = a;
            value = maxA;
            actVal[0] = a;
            actVal[1] = value;
        }
        undoResult(a, board);
    }
    //console.log("taking action ",actVal);
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

function cutoffTest(board, depth, maxDepth){
    return depth >= maxDepth || mmWinCheck(board);
}

function getAction(board){
    var validActs = [];
    for(let i = 0; i<board[0].length; i++){
        if(board[0][i] ===0){
            validActs.push(i);
        }
    }
    return validActs;
}

/*
* The following are the evaluation functions that minimax uses to evaluate the score for a board.
* A board's score is based on how many opportunities there are for a player to have a run of four,
* and how close that player currently is to having a run of four.
*/



function evaluate(player, board){
    var eval = 0;
    eval = eval - (vertical(board, -1*player) + horizontal(board,-1*player)+ ascend(board,-1*player)+descend(board,-1*player));
    eval = eval + (vertical(board,player) + horizontal(board,player)+ ascend(board,player)+descend(board,player));
    return eval;
}

function vertical(board,player){
    //for each column on the board, calculate 
    //the vertical score of that column
    var vertScore = 0;
    for(let col = 0; col < 7; col++){
        //count the number of blank tiles at the top of the column
        blank = 0;
        var row;
        for(row = 0; row < board.length; row++){
            if(board[row][col]===0){
                blank++;
            }
            else{
                break;
            }
        }

        //count the number of the player's tiles at the top
        playerCount = 0;
        for(row = row; row < board.length; row++){
            if(board[row][col] !== player){
                break;
            }
            else{
                playerCount++;
            }
        }

        //calculate the potential score for this column
        if(playerCount+blank < 4){
            vertScore +=0;
        }
        else{
            vertScore += calcHeuristic(playerCount);
        }
    }
    return vertScore;
}

function horizontal(board, player){
    let horizScore = 0;
    var row;
    var blankCount;
    var playerCount;
    
    //calculate the potential score for every row in the board
    for(row = 0; row < board.length; row++){
        for(let col = 0; col < 7; col++){
            //if you come across a blank slot, count the blank tiles
            if(board[row][col]==0){
                blankCount += blankTileRow(board,row,col)[0];
                col = blankTileRow(board,row,col)[1];
            }

            //if you come across a tile of your own, increment
            if(board[row][col] == player){
                playerCount++;
            }

            //if you come across opponent's tile, check for points
            //and continue the search
            if(board[row][col]== -1*player){
                //if there is no room for a run of four, continue
                if(blankCount + playerCount <4){
                    blankCount = 0 ;
                    playerCount = 0;
                    continue;
                }
                else{
                    horizScore += calcHeuristic(playerCount);
                }
            }
        }
        //check for a run at the end of the row
        //ensure you don't double count if the last tile was opponent
        if(board[row][6] != (-1*player) && (blankCount+playerCount >=4)){
            horizScore +=calcHeuristic(playerCount);
        }
    }
    return horizScore;
}

function blankTileRow(board, row, startCol){
    let ret = [];
    ret.length = 2;
    count = 0;
    var col;
    for(col = startCol; col<7; col++){
        if(board[row][col]!=0){
            break;
        }
        count++;
    }
    ret[0] = count;
    ret[1] = col;
    return ret;
}

function ascend(board,player){
    let ascendScore = 0;
    //for each row with enough space for a run of four, evaluate score
    for(let row = 3; row < board.length; row++){
        //cut off the columns when there is no longer room for a run
        for(let col = 0; col < board[row].length-3; col++){
            //if the starting position is a valid start for a run of four,
            //check for room and add to the score
            if(board[row][col]!=(-1*player)){
                ascendScore += ascendRun(board,player,row,col);
            }

        }
    }
    return ascendScore;
}

function ascendRun(board,player,startRow,startCol){
    let blankCount = 0;
    let playerCount = 0;
    let col = startCol;
    for(let row = startRow; row>(startRow-4); row--){
        //if you come across a blank spot in the run, count the blank tiles
        if(board[row][col]==0){
            blankCount = blankTileAscend(board,row,col)[0];
            row = blankTileAscend(board,row,col)[1];
            col = blankTileAscend(board,row,col)[2];
        }
        if(col==board[row].length){
            break;
        }

        //if you come across your own player, increment
        if(board[row][col]==player){
            playerCount++;
        }

        //if you come across the opponent, then since we are only checking
        //for this specific slot of four, we know that there is no room to score
        //and so we return 0
        if(board[row][col]==(-1*player)){
            return 0;
        }
        col++;
    }
    //if there is room for a run, return the heuristic score
    if(blankCount + playerCount >=4){
        return calcHeuristic(playerCount);
    }
    else{
        return 0;
    }
}

function blankTileAscend(board, startRow, startCol){
    let ret = [];
    ret.length = 3;
    count = 0;
    var row;
    var col = startCol;
    for(row = startRow; row > 0; row--){
         if(board[row][col]!=0){
            break;
        }
        count++;
        col++;
    }
    ret[0] = count;
    ret[1] = row;
    ret[2] = col;
    return ret;
}

function descend(board,player){
    let descendScore = 0;
    //for each row with enough space for a run of four, evaluate score
    for(let row = 0; row < board.length-3; row++){
        //cut off the columns when there is no longer room for a run
        for(let col = 0; col < board[row].length-3; col++){
            //if the starting position is a valid start for a run of four,
            //check for room and add to the score
            if(board[row][col]!=(-1*player)){
                descendScore += descendRun(board,player,row,col);
            }

        }
    }
    return descendScore;
}

function descendRun(board,player,startRow,startCol){
    let blankCount = 0;
    let playerCount = 0;
    let col = startCol;
    for(let row = startRow; row<board.length; row++){
        //if you come across a blank spot in the run, count the blank tiles
        if(board[row][col]==0){
            blankCount = blankTileDescend(board,row,col)[0];
            row = blankTileDescend(board,row,col)[1];
            col = blankTileDescend(board,row,col)[2];
        }
        if(row==board.length){
            break;
        }

        //if you come across your own player, increment
        if(board[row][col]==player){
            playerCount++;
        }

        //if you come across the opponent, then since we are only checking
        //for this specific slot of four, we know that there is no room to score
        //and so we return 0
        if(board[row][col]==(-1*player)){
            return 0;
        }
        col++;
    }
    //if there is room for a run, return the heuristic score
    if(blankCount + playerCount >=4){
        return calcHeuristic(playerCount);
    }
    else{
        return 0;
    }
}

function blankTileDescend(board, startRow, startCol){
    let ret = [];
    ret.length = 3;
    count = 0;
    var row;
    var col = startCol;
    for(row = startRow; row < board.length; row++){
        if(board[row][col]!=0){
            break;
        }
        count++;
        
        col++;
    }
    ret[0] = count;
    ret[1] = row;
    ret[2] = col;
    return ret;
}

function calcHeuristic(counter){
    if (counter === 0){
        return counter;
    }
    else if(counter ===1){
        return 1;
    }
    else if(counter ===2){
        return 10;
    }
    else if(counter ===3){
        return 100;
    }
    else{
        return 10000;
    }
}

function mmWinCheck(board){
    return mmHorizontalCheck(board) || mmVerticalCheck(board) || mmDiagLRCheck(board) || mmDiagRLCheck(board);
}

function mmMatchCheck(one, two, three, four){
    return one == two && one == three && one == four && one !=0;
}

function mmHorizontalCheck(board){
    for(let row = 0; row < board.length; row++){
        for(let col = 0; col < 4; col++){
            if(mmMatchCheck(board[row][col],
                board[row][col+1],
                board[row][col+2],
                board[row][col+3])){
                    return true;
                }
        }
    }
}

function mmVerticalCheck(board){
    for(let col = 0; col < 7; col ++){
        for(let row = 0; row < 3; row ++){
            if(mmMatchCheck(board[row][col],
                board[row+1][col],
                board[row+2][col],
                board[row+3][col])){
                    return true;
                }
        }
    }  
}


function mmDiagLRCheck(board){
    for(let col = 0; col < 4; col ++){
        for(let row = 0; row < 3; row ++){
            if(mmMatchCheck(board[row][col],
                board[row+1][col+1],
                board[row+2][col+2],
                board[row+3][col+3])){
                    return true;
                }
        }
    }
}

function mmDiagRLCheck(board){
    for(let col = 0; col < 4; col ++){
        for(let row = 5; row >2; row --){
            if(mmMatchCheck(board[row][col],
                board[row-1][col+1],
                board[row-2][col+2],
                board[row-3][col+3])){
                    return true;
                }
        }
    }
}



//fill in minimax win checks

