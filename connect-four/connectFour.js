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
nextMove.style.display = 'none';

//walkthrough_button Button
const walkthrough_button = document.querySelector('.walkthrough');
//const walkthrough_checkbox = document.getElementById('walkthrough-checkbox');
walkthrough_button.style.display = 'block';
//walkthrough div
const walkthrough = document.querySelector('.mm-walkthrough');
walkthrough.style.display = 'none';
//array of canvases (one for each column)
let aboveTable = document.querySelectorAll('.aboveTable');
//depth of the slider
var depth = document.querySelector('.slider');
var mmDepth = depth.value;
//mode of the computer player
let computerModes = document.getElementsByName('autoMan');
for(let i = 0; i< computerModes.length; i++){
    console.log(computerModes[i].value);
}

let computerMode = 'auto';

let table = document.querySelectorAll('.slot1');

//state player colors
player1Color = 'red';
player2Color = 'yellow';
background = "rgb(242, 238, 255)";

//animation variables
let animationCell;
let animationColumn = 0;
let animationStartPix = 0;
let animationEndPix = 0;
let animationColor = player1Color;
let dropID;


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

 console.log("making computer");
 let computer = new computerPlayer(1,-1,board,mmDepth);

 //let background = "rgb(200, 225, 250)";
 console.log("making graphics");
 let graphic = new graphics(background);

 graphic.resetTable(table);
 //console.log(computer.makeMove());

 computer.testCalc();

/**
 * Mouseover events that display a game tile above whatever column the
 * human player is hovering over
 */
for(let i = 0; i < tableCell.length; i++){
    //when the player hovers over a cell, place a red tile above that column
    tableCell[i].addEventListener('mouseenter',(e)=>{
        graphic.displayAboveTable(aboveTable[e.target.cellIndex],animationColor);
    })

    //when a player stops hovering over a cell, remove the tile above that column
    tableCell[i].addEventListener('mouseleave',(e)=>{
        graphic.clearAboveTable(aboveTable[e.target.cellIndex]);
        //clearDisplayMove(e.target.cellIndex);
    })
}

for(let i = 0; i< computerModes.length; i++){
    computerModes[i].addEventListener('click', ()=>{
        console.log("updating computer mode")
        computerMode = computerModes[i].value;
        if(computerMode == 'man'){
            nextMove.style.display = 'block';
        }
        if(computerMode == 'auto'){
            nextMove.style.display = 'none';
        }
        console.log(computerMode);
    })
}

reset.addEventListener('click',()=>{
    graphic.resetTable(table);
    //setCanvasBoard();
        for(let i = 0; i<6; i++){
            board[i] = [];
            board[i].length = 7;
            for(let j = 0; j<7; j++){
                board[i][j] = 0;
            }
        
        }
        //board = copyBoard(playBoard,board);
        //return(currentPlayer ===1 ? playerTurn.textContent = `Your turn` : playerTurn.textContent = `Computer's turn!`);
        playerTurn.style.color = 'black';
        return playerTurn.textContent = 'Your turn!';
    }
);


depth.addEventListener('click',()=>{
    console.log("new depth");
    mmDepth = depth.value;
    if(depth.value==1){
        walkthrough_button.style.display = 'block';
    }
    if(depth.value >1){
        console.log("should go away")
        walkthrough_button.style.display = 'none';
    }
    computer.updateDepth(mmDepth);
});

walkthrough_button.addEventListener('click', ()=>{
    // if(walkthrough_checkbox.checked){
    //     walkthrough_checkbox.checked = false;
    // }
    // else{
    //     walkthrough_checkbox.checked = true;
    // }
    if(walkthrough.style.display === 'none'){
        walkthrough.style.display = 'block';
        walkthrough_button.textContent = 'Hide Minimax Walkthrough'
    }
    else{
        walkthrough.style.display = 'none';
        walkthrough_button.textContent = 'Hide Minimax Walkthrough'
    }
    }
)

nextMove.addEventListener('click',()=>{
    if(currentPlayer ==1){
        makeMove(1,computer.makeMove());
    }
})








//setCanvasBoard();




async function fallingTile(col){
    let animate;
    for(let i = 0; i<playBoard.length && playBoard[i][col]==0;i++){
        console.log(tableRow[i].children[col]);
        animationCell = tableRow[i].children[col];
        animationStartPix = 0;
        animationEndPix = animationCell.children[0].height+animationCell.children[0].height/2;
        console.log(animationEndPix);
        console.log("calling animation");
        animate = await fallingTileAnimation(); 
    }
    console.log("returning from fallingTile");
    return;

}




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
    //context.restore();
    animationStartPix++;

    if(animationStartPix <= animationEndPix){
        window.requestAnimationFrame(fallingTileAnimation);
        //return;
    }
    else{
        clearCell(cell);
        console.log("setting animation back to 0");
        animationStartPix=0;
        console.log("returning from fallingTileAnimation");
        return;
    }
}









//want current player to start the game
var currentPlayer = -1;
playerTurn.textContent = `Your turn!`;

//go through the cells and show that we know they all have white background


for(let i = 0; i<tableRow.length; i++){
    console.log(tableRow[i]);
    for(let j = 0; j<tableRow[i].children.length; j++){
        cell = tableRow[i].children[j];
        cell.addEventListener('click',(cell)=>{
            if(currentPlayer ===-1){
              //  console.log(j);
                // playerMove(cell,j);
                makeMove(-1,j);
            }
        });
    }
}



function makeMove(player,column){
    let playerColor;
    let playerNumber;
    if(player ==-1){
        playerColor = player1Color;
        playerNumber = -1;
    }
    else{
        playerColor = player2Color; 
        playerNumber = 1;
    }
    

    for(let i = 5; i >=0; i --){
        //work up from the bottom of the column and fill the first
            //empty slot you come across with a tile from the player
        if(board[i][column]==0){
            board[i][column] = playerNumber;
            console.log("player: ",playerNumber);
            console.log(board);
            graphic.drawTile(tableRow[i].children[column].children[0], playerColor);
            if(winCheck()){
                console.log("winning");
                if(player==-1){
                    playerTurn.textContent = `You won!`;
                    playerTurn.style.color = player1Color;
                    currentPlayer = -1;
                }
                else{
                    playerTurn.textContent = `Computer won!`;
                    playerTurn.style.color = player2Color;
                    currentPlayer = -1;
                }
                reset.textContent = 'Play Again';
            }  
            else if(drawCheck()){
                playerTurn.textContent = 'Game is a Draw';
            }
            else{
                if(player==-1){
                    playerTurn.textContent = `Computer's turn!`;
                    currentPlayer = 1;
                    console.log(computerMode);
                    console.log(board);
                    if(computerMode==='auto'){
                        return makeMove(1,computer.makeMove());
                    }
                }
                else{
                    playerTurn.textContent = 'Your turn!';
                    currentPlayer = -1;

                    console.log(board);
                    console.log("updating currentPlayer = ",currentPlayer);
                }          
            }
            return;
        }
        
    }

}




//win checks
function colorMatchCheck(one,two, three, four){
    return (one ===two && one === three && one === four && one !== 0);
}

function horizontalCheck(){
    for(let row = 0; row < tableRow.length; row ++){
        for(let col = 0; col < 4; col++){
            if(colorMatchCheck(board[row][col],
                board[row][col+1],
                board[row][col+2],
                board[row][col+3])){
                    return true;
                }
        }
    }
}

function verticalCheck(){
    for(let col = 0; col < 7; col ++){
        for(let row = 0; row < 3; row ++){
            if(colorMatchCheck(board[row][col],
                board[row+1][col],
                board[row+2][col],
                board[row+3][col])){
                    return true;
                }
        }
    }
}

function diagCheckLR(){
    for(let col = 0; col < 4; col ++){
        for(let row = 0; row < 3; row ++){
            if(colorMatchCheck(board[row][col],
                board[row+1][col+1],
                board[row+2][col+2],
                board[row+3][col+3])){
                    return true;
                }
        }
    }
}

function diagCheckRL(){
    for(let col = 0; col < 4; col ++){
        for(let row = 5; row >2; row --){
            if(colorMatchCheck(board[row][col],
                board[row-1][col+1],
                board[row-2][col+2],
                board[row-3][col+3])){
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
    for(let i = 0; i< board[0].length; i++){
        if(board[0][i]==0){
            return false;
        }
    }

    return true;
}


/* 
 function computerMove(board){
    var depth = 0;
    var maxDepth = mmDepth;
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
} */



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
/* 
function copyBoard(playBoard,board){
    for(let i = 0; i<board.length; i++){
        for(let j = 0; j<board[i].length; j++){
            board[i][j] = playBoard[i][j];
        }
    }
    return board;
}







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


* The following are the evaluation functions that minimax uses to evaluate the score for a board.
* A board's score is based on how many opportunities there are for a player to have a run of four,
* and how close that player currently is to having a run of four.




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

 */

//fill in minimax win checks

