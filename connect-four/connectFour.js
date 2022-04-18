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

/* Walkthrough variables */
//walkthrough Button
const walkthrough_button = document.querySelector('.walkthrough');
walkthrough_button.style.display = 'block';
//walkthrough div
const walkthrough = document.querySelector('.mm-walkthrough');
walkthrough.style.display = 'none';
//walkthrough max element
var mm_max = document.querySelector('.mm-max');
//walkthrough min element
var mm_min = document.querySelector('.mm-min');





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
var gamePause = false;

//set players
playerHuman = [-1,'red',"Human"]
playerComputer = [1, 'yellow',"Computer"]

players = [playerHuman,playerComputer];
console.log(players)
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
    mmDepth = depth.value;
    console.log(mmDepth);
    if(depth.value <=2){
        walkthrough_button.style.display = 'block';
    }
    if(depth.value >2){
        walkthrough_button.style.display = 'none';
        walkthrough.style.display = 'none';
        resetWalkthrough();
    }
    computer.updateDepth(mmDepth);
});

walkthrough_button.addEventListener('click', ()=>{

    if(walkthrough.style.display === 'none'){
        mmWalkthrough();
        walkthrough.style.display = 'block';
        walkthrough_button.style.display = "none";
        //walkthrough_button.textContent = 'Hide Minimax Walkthrough'
    }
    else{
        resetWalkthrough();
        walkthrough.style.display = 'none';
        walkthrough_button.textContent = 'Show Minimax Walkthrough'
        gamePause = false;
    }
    }
)

nextMove.addEventListener('click',()=>{
    if(currentPlayer ==1){
        makeMove(computer.makeMove());
    }
})





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
var currentPlayer = 0;
playerTurn.textContent = `Your turn!`;

//go through the cells and show that we know they all have white background


for(let i = 0; i<tableRow.length; i++){
    console.log(tableRow[i]);
    for(let j = 0; j<tableRow[i].children.length; j++){
        cell = tableRow[i].children[j];
        cell.addEventListener('click',(cell)=>{
            if(currentPlayer ===0){
              //  console.log(j);
                // playerMove(cell,j);
                makeMove(j);
            }
        });
    }
}



function makeMove(column){
    console.log("current Player: ",currentPlayer)
    if(gamePause){
        console.log("game paused")
        return;
    }   

    for(let i = 5; i >=0; i --){
        //work up from the bottom of the column and fill the first
            //empty slot you come across with a tile from the player
        if(board[i][column]==0){
            board[i][column] = players[currentPlayer][0];
            console.log(board);
            graphic.drawTile(tableRow[i].children[column].children[0], players[currentPlayer][1]);
            if(winCheck()){
                console.log("winning");
                if(currentPlayer==0){
                    playerTurn.textContent = `You won!`;
                    playerTurn.style.color = players[currentPlayer][1];
                    currentPlayer = 0;
                }
                else{
                    playerTurn.textContent = `Computer won!`;
                    playerTurn.style.color = players[(currentPlayer*-1)][1];
                    currentPlayer = 0;
                }
                reset.textContent = 'Play Again';
            }  
            else if(drawCheck()){
                playerTurn.textContent = 'Game is a Draw';
            }
            else{
                if(currentPlayer==0){
                    playerTurn.textContent = `Computer's turn!`;
                    currentPlayer = 1;
                    console.log(computerMode);
                    console.log(board);
                    if(computerMode==='auto' && walkthrough.style.display=="none"){
                        return makeMove(computer.makeMove());
                    }
                }
                else{
                    playerTurn.textContent = 'Your turn!';
                    currentPlayer = 0;

                    console.log(board);
                    console.log("updating currentPlayer = ",currentPlayer);
                }          
            }
            if(walkthrough.style.display=="block"){
                mmWalkthrough();
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

// function mmWalkthrough(){
//     console.log(currentPlayer);

//     gamePause = true;
//     if(mmDepth==1){
//         mmWalkthrough1();
//     }
//     else{
//         mmWalkthrough2();
//     }
//     return;
// }

function mmWalkthrough(){
    gamePause = true;


    mm_max = createMaxElement();
    console.log(mm_max);
    let max_children = mm_max.children;
    let table = max_children[2];
    let next_step = document.createElement('button');
    next_step.textContent = "Next Step";
    mm_max.appendChild(next_step);
    let col = 0;
    let maxScore = 0;
    let maxCol = 0;

    let return_to_game = document.createElement('button');
    return_to_game.textContent = "Return to normal play";
    walkthrough.appendChild(return_to_game);
    return_to_game.addEventListener('click',()=>{
        console.log("rTT",col);
        if(col>0){
            undoMove(col-1);
        }
        resetWalkthrough();
        walkthrough_button.style.display = "block";
        walkthrough.style.display = "none";
        gamePause = false;
        return;
    });
    //changeColColor(table,col,"green")
    next_step.addEventListener('click',()=>{
        // If you pass the end of the board, undo the last move
        if(col >= board[0].length){
            undoMove(col-1);
            resetWalkthrough();

            //for the computer, call the function that plays the best move
            if(currentPlayer==1){
                gamePause = false;
                return makeMove(computer.makeMove());
            }
            //for the human, force them to play the best move >:)
            else{
                gamePause = false;
                return makeMove(maxCol);
            }
        }

        //before starting the next iteration, reset the board from the last move
        if(col>=1){
            resetElement(mm_min);
            undoMove(col-1);
        }

        //evaluate the score for that column and update the table
        let tempScore;
        if(mmDepth==1){
            tempScore = fakeMove(col,currentPlayer);
        }
        else{
            fakeMove(col,currentPlayer);
            tempScore = mmWalkthrough2();
        }
        addToTable(col,table, tempScore);
        if(tempScore >= maxScore){
            //if you've hit a new max value, update the table and the max
            changeColColor(table,maxCol,"black")
            maxScore = tempScore
            maxCol = col
            changeColColor(table,col,"green")
        }

        //go to the next column and update the description
        col++;
        max_children[1].textContent = `Evaluating board for col ${col-1}`;

        //if you've evaluated the last column, update the button
        if(col >= board[0].length){
            if(currentPlayer==1){
                next_step.textContent = "Make Computer Move"
            }
            else{
                next_step.textContent = "Make Human Move"
            }
            next_step.style.width = '200px'; // setting the width to 200px
            next_step.style.height = '50px'; // setting the height to 200px
            next_step.style.background = 'green'; // setting the background color to teal
            next_step.style.color = 'white'; // setting the color to white
            next_step.style.fontSize = '20px'; // setting the font size to 20px
            max_children[1].textContent = `Max score ${maxScore} in column ${maxCol}`
        }
    });

    return;
}

function undoMove(col){
    console.log("undo move");
    console.log(col);
    console.log(board);
    for(let i = 0; i <6; i ++){
        if(board[i][col]==1){
            board[i][col] = 0;
            graphic.resetCell(tableRow[i].children[col].children[0])
            break;
        }
    }
}



function changeColColor(table,column,color){
    let tbody = table.children[1];
    tbody.rows[0].cells[column+1].style.color = color
    tbody.rows[1].cells[column+1].style.color = color

    if(color==="green"){
        tbody.rows[0].cells[column+1].style.fontWeight = 'bold'
        tbody.rows[1].cells[column+1].style.fontWeight = 'bold'
    }
    else{
        tbody.rows[0].cells[column+1].style.fontWeight = 'normal'
        tbody.rows[1].cells[column+1].style.fontWeight = 'normal'
    }
}

function fakeMove(column,player){
    for(let i = 5; i >=0; i --){
        //work up from the bottom of the column and fill the first
            //empty slot you come across with a tile from the player
        if(board[i][column]==0){
            board[i][column] = 1;
            graphic.drawTile(tableRow[i].children[column].children[0], players[player][1]);
            break;
        }
    }
    let score = computer.evaluate(board);
    return score;
}

function addToTable(column, table, score){

    let tbody = table.children[1];

   // console.log(column);
    tbody.rows[1].cells[column+1].textContent = `${score}`
    return score
}

function mmWalkthrough2(){
    mm_min = createMinElement();
    let min_children = mm_min.children;
    let table = min_children[2];
    console.log("table: ",table);
    let send_value = document.createElement('button');
    send_value.style.display = "none";
    send_value.textContent = "Return Min Value";
    mm_min.appendChild(send_value);
    //let col = 0;
    let minScore = 100000;
    let minCol = 0;
    for(let col = 0; col < board[0].length; col++){
        if(col>0){
            undoMove(col-1);
        }
        fakeMove(col,Math.abs(1-currentPlayer));
        let score = computer.evaluate(board);
        addToTable(col,table,score);
        console.log("score:",score);
        console.log("min score: ",minScore);
        //let score = minWalkthroughLoop(col,table);
        if(score<minScore){
            console.log("updating score for col ",col);
            changeColColor(table,minCol,"black");
            minScore = score;
            minCol = col;
            changeColColor(table,col,"red");
        }
        setTimeout(pause,500);
    }
    undoMove(6);
    send_value.style.display = "block"
    send_value.addEventListener('click',()=>{
        return minScore;
    })
    return minScore;


}

function pause(){

}


function createMaxElement(){
    let header = document.createElement('h2');
    header.textContent = `Depth: 1 Player: ${players[currentPlayer][2]}`;
    mm_max.appendChild(header);

    let col = 0;
    let explanation = document.createElement('h3');
    explanation.textContent = `Evaluating board for col ${col}`;
    mm_max.appendChild(explanation);

    let mm_table = document.createElement('table');
    mm_table.backgroundColor = 'white';
    mm_table.createCaption("Max Values for ConnectFour Board");
    let tbody = document.createElement('tbody');
    mm_table.appendChild(tbody);

    tbody.insertRow(0);
    tbody.rows[0].insertCell(0);
    tbody.rows[0].cells[0].appendChild(document.createTextNode("Column"));
    for(let i = 1; i < 8; i++){
        tbody.rows[0].insertCell(i);
        tbody.rows[0].cells[i].appendChild(document.createTextNode(`${i-1}`));
    }

    tbody.insertRow(1);
    tbody.rows[1].insertCell(0);
    tbody.rows[1].cells[0].appendChild(document.createTextNode("Value"));
    for(let i = 1; i<8; i++){
        tbody.rows[1].insertCell(i);
        tbody.rows[1].cells[i].appendChild(document.createTextNode(""));
    }

    mm_max.appendChild(mm_table);
    return mm_max;
}

function createMinElement(){
    let header = document.createElement('h2');

    header.textContent = `Depth: 2 Player: ${players[Math.abs(currentPlayer-1)][2]}`;
    mm_min.appendChild(header);

    let col = 0;
    let explanation = document.createElement('h3');
    explanation.textContent = `Evaluating board for col ${col}`;
    mm_min.appendChild(explanation);

    let mm_table = document.createElement('table');
    mm_table.backgroundColor = 'white';
    mm_table.createCaption("Min Values for ConnectFour Board");
    let tbody = document.createElement('tbody');
    mm_table.appendChild(tbody);

    tbody.insertRow(0);
    tbody.rows[0].insertCell(0);
    tbody.rows[0].cells[0].appendChild(document.createTextNode("Column"));
    for(let i = 1; i < 8; i++){
        tbody.rows[0].insertCell(i);
        tbody.rows[0].cells[i].appendChild(document.createTextNode(`${i-1}`));
    }

    tbody.insertRow(1);
    tbody.rows[1].insertCell(0);
    tbody.rows[1].cells[0].appendChild(document.createTextNode("Value"));
    for(let i = 1; i<8; i++){
        tbody.rows[1].insertCell(i);
        tbody.rows[1].cells[i].appendChild(document.createTextNode(""));
    }

    mm_min.appendChild(mm_table);
    return mm_min;
}

function resetWalkthrough(){
    resetElement(mm_max);
    resetElement(mm_min);
    walkthrough.removeChild(walkthrough.lastElementChild);

    //walkthrough.style.display = 'none';
    //walkthrough_button.textContent = 'Show Minimax Walkthrough'
}

function resetElement(elem){
    let child = elem.lastElementChild;
    while(child){
        elem.removeChild(child);
        child = elem.lastElementChild;
    }
}

function flipNextMove(){
    //grey out nextMove button and print error message saying cannot make next move until minimax simulation is completed
}

function flipSlider(){
    //grey out slideer and print error mesaage saying cannot change depth until minimax simulation is completed
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

