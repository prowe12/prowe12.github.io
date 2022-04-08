class computerPlayer{
    constructor(player, opponent, board, maxDepth){
        console.log("making player");
        this.player = player;
        this.opponent = opponent;
        this.realBoard = board;
        this.maxDepth = maxDepth;
        this.playBoard = [];

        this.playBoard.length = 6;
        for(let i = 0; i<6; i++){
            this.playBoard[i] = [];
            this.playBoard[i].length = 7;
            for(let j = 0; j<7; j++){
                this.playBoard[i][j] = 0;
            }
        }
    }

    updateDepth(newDepth){
        this.maxDepth = newDepth;
        console.log("updated depth: ",this.maxDepth);
    }

    updateBoard(newBoard){
        this.realBoard = copyBoard(realBoard,newBoard);
    }

    makeMove(){     
        // console.log("computer make move");  
        // console.log("real board",this.realBoard);
        console.log("depth ",this.maxDepth);
        var depth = 0;
        this.playBoard = this.copyBoard(this.playBoard, this.realBoard);
        // console.log("playboard ",this.playBoard);
        var nextPlay = this.getNextPlay(depth, this.maxDepth, this.playBoard);
        // console.log("returning ", nextPlay);
        return nextPlay;
    }

    copyBoard(copy, original){
        for(let i = 0; i<original.length; i++){
            for(let j = 0; j<original[i].length; j++){
                copy[i][j] = original[i][j];
            }
        }
        return copy;
    }

    getNextPlay(depth, max){
        var res =  this.minimax(depth, max);
        // console.log("getNextPlay ",res);
        return res;
    }

    minimax(depth, maxDepth){
        var actVal = this.maxValue(depth, maxDepth, -1);
        // console.log("minimax ",actVal[0]);
        return actVal[0];
    }

     maxValue(depth, maxDepth, prevPlay){
        //  console.log("maxVal");
        //  console.log("depth ",depth);
         var actVal = [];
         actVal.length = 2;
         if(this.cutoffTest(depth)){
            //  console.log("evaluating and returning");
             const evaluateBoard= this.evaluate(this.player);
             actVal[0] = prevPlay;
            //  console.log("prevPlay = ",prevPlay);
             actVal[1] = evaluateBoard;
             return actVal;
         }
     
         var value = -100000;
         var action = -1;
         depth++;
         var validActs = this.getAction();
         for(let i = 0; i< validActs.length; i++){
             let a = validActs[i];
            //  console.log(a);
             if(a == -1){
                 continue;
             }
             this.playBoard = this.result(a, this.player);
             let minA = this.minValue(depth, a)[1];
            //  console.log("minVal action = ",a," value = ",minA);
             //console.log(this.playBoard);
             if(minA >=value){
                 value = minA;
                 action = a;
                 actVal[0] = action;
                 actVal[1] = value;
             }
     
             this.undoResult(a);
         }
         return actVal;
    }

    minValue(depth, prevPlay){

        // console.log("minVal");
        // console.log("depth ",depth);
        //console.log("min value");
        //console.log("depth: ",depth);
        //console.log("prev play: ",prevPlay);
       // console.log("board: ");
        //console.log(board);
    
        var actVal = [];
        actVal.length = 2;
        if(this.cutoffTest( depth)){
            const evaluateBoard= this.evaluate(this.opponent);
            actVal[0] = prevPlay;
            actVal[1] = evaluateBoard;
            // console.log("min returning ",prevPlay);
            // console.log(evaluateBoard);
            return actVal;
        }
    
        var value = 10000;
        var action;
        depth++;
        var validActs = this.getAction();
        for(let i = 0; i<validActs.length; i++){
            let a = validActs[i];
            if(a==-1){
                continue;
            }
            this.playBoard = this.result(a, this.opponent);
            let maxA = this.maxValue(depth, a)[1];
            if(maxA <= value){
                action = a;
                value = maxA;
                actVal[0] = a;
                actVal[1] = value;
            }
            this.undoResult(a);
        }
        //console.log("taking action ",actVal);
        return actVal;
    }

    result(column,  player){
        if(this.playBoard[0][column]!==0){
            return this.playBoard;
        }
    
        for(let i = 0; i< this.playBoard.length-1; i++){
            if(this.playBoard[i+1][column]!==0){
                this.playBoard[i][column] = player;
                break;
            }
        }
        // console.log(this.playBoard);
    
        return this.playBoard;
    }

    undoResult(column){
        for(let row = 0; row<this.playBoard.length; row++){
            if(this.playBoard[row][column]!==0){
                this.playBoard[row][column] = 0;
                return this.playBoard;
            }
        }
        return this.playBoard;
    }

    cutoffTest(depth){
        return depth >= this.maxDepth || this.mmWinCheck(this.playBoard);
    }

    getAction(){
        var validActs = [];
        for(let i = 0; i<this.playBoard[0].length; i++){
            if(this.playBoard[0][i] ===0){
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



    evaluate(player){
        var evaluateBoard= 0;
        evaluateBoard= evaluateBoard- (this.vertical( -1*player) + this.horizontal(-1*player)+ this.ascend(-1*player)+this.descend(-1*player));
        evaluateBoard= evaluateBoard+ (this.vertical(player) + this.horizontal(player)+ this.ascend(player)+this.descend(player));
        return evaluateBoard;
    }

    vertical(player){
        //for each column on the board, calculate 
        //the vertical score of that column
        var vertScore = 0;
        for(let col = 0; col < 7; col++){
            //count the number of blank tiles at the top of the column
            var blank = 0;
            var row;
            for(row = 0; row < this.playBoard.length; row++){
                if(this.playBoard[row][col]===0){
                    blank++;
                }
                else{
                    break;
                }
            }

            //count the number of the player's tiles at the top
            var playerCount = 0;
            for(row = row; row < this.playBoard.length; row++){
                if(this.playBoard[row][col] !== player){
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
                vertScore += this.calcHeuristic(playerCount);
            }
        }
        return vertScore;
    }

    horizontal(player){
        let horizScore = 0;
        var row;
        var blankCount;
        var playerCount;
        
        //calculate the potential score for every row in the board
        for(row = 0; row < this.playBoard.length; row++){
            for(let col = 0; col < 7; col++){
                //if you come across a blank slot, count the blank tiles
                if(this.playBoard[row][col]==0){
                    blankCount += this.blankTileRow(row,col)[0];
                    col = this.blankTileRow(row,col)[1];
                }

                //if you come across a tile of your own, increment
                if(this.playBoard[row][col] == player){
                    playerCount++;
                }

                //if you come across opponent's tile, check for points
                //and continue the search
                if(this.playBoard[row][col]== -1*player){
                    //if there is no room for a run of four, continue
                    if(blankCount + playerCount <4){
                        blankCount = 0 ;
                        playerCount = 0;
                        continue;
                    }
                    else{
                        horizScore += this.calcHeuristic(playerCount);
                    }
                }
            }
            //check for a run at the end of the row
            //ensure you don't double count if the last tile was opponent
            if(this.playBoard[row][6] != (-1*player) && (blankCount+playerCount >=4)){
                horizScore +=this.calcHeuristic(playerCount);
            }
        }
        return horizScore;
    }

    blankTileRow(row, startCol){
        let ret = [];
        ret.length = 2;
        var count = 0;
        var col;
        for(col = startCol; col<7; col++){
            if(this.playBoard[row][col]!=0){
                break;
            }
            count++;
        }
        ret[0] = count;
        ret[1] = col;
        return ret;
    }

    ascend(player){
        let ascendScore = 0;
        //for each row with enough space for a run of four, evaluate score
        for(let row = 3; row < this.playBoard.length; row++){
            //cut off the columns when there is no longer room for a run
            for(let col = 0; col < this.playBoard[row].length-3; col++){
                //if the starting position is a valid start for a run of four,
                //check for room and add to the score
                if(this.playBoard[row][col]!=(-1*player)){
                    ascendScore += this.ascendRun(player,row,col);
                }

            }
        }
        return ascendScore;
    }

    ascendRun(player,startRow,startCol){
        let blankCount = 0;
        let playerCount = 0;
        let col = startCol;
        for(let row = startRow; row>(startRow-4); row--){
            //if you come across a blank spot in the run, count the blank tiles
            if(this.playBoard[row][col]==0){
                blankCount = this.blankTileAscend(row,col)[0];
                row = this.blankTileAscend(row,col)[1];
                col = this.blankTileAscend(row,col)[2];
            }
            if(col==this.playBoard[row].length){
                break;
            }

            //if you come across your own player, increment
            if(this.playBoard[row][col]==player){
                playerCount++;
            }

            //if you come across the opponent, then since we are only checking
            //for this specific slot of four, we know that there is no room to score
            //and so we return 0
            if(this.playBoard[row][col]==(-1*player)){
                return 0;
            }
            col++;
        }
        //if there is room for a run, return the heuristic score
        if(blankCount + playerCount >=4){
            return this.calcHeuristic(playerCount);
        }
        else{
            return 0;
        }
    }

    blankTileAscend( startRow, startCol){
        let ret = [];
        ret.length = 3;
        var count = 0;
        var row;
        var col = startCol;
        for(row = startRow; row > 0; row--){
            if(this.playBoard[row][col]!=0){
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

    descend(player){
        let descendScore = 0;
        //for each row with enough space for a run of four, evaluate score
        for(let row = 0; row < this.playBoard.length-3; row++){
            //cut off the columns when there is no longer room for a run
            for(let col = 0; col < this.playBoard[row].length-3; col++){
                //if the starting position is a valid start for a run of four,
                //check for room and add to the score
                if(this.playBoard[row][col]!=(-1*player)){
                    descendScore += this.descendRun(player,row,col);
                }

            }
        }
        return descendScore;
    }

    descendRun(player,startRow,startCol){
        let blankCount = 0;
        let playerCount = 0;
        let col = startCol;
        for(let row = startRow; row<this.playBoard.length; row++){
            //if you come across a blank spot in the run, count the blank tiles
            if(this.playBoard[row][col]==0){
                blankCount = this.blankTileDescend(row,col)[0];
                row = this.blankTileDescend(row,col)[1];
                col = this.blankTileDescend(row,col)[2];
            }
            if(row==this.playBoard.length){
                break;
            }

            //if you come across your own player, increment
            if(this.playBoard[row][col]==player){
                playerCount++;
            }

            //if you come across the opponent, then since we are only checking
            //for this specific slot of four, we know that there is no room to score
            //and so we return 0
            if(this.playBoard[row][col]==(-1*player)){
                return 0;
            }
            col++;
        }
        //if there is room for a run, return the heuristic score
        if(blankCount + playerCount >=4){
            return this.calcHeuristic(playerCount);
        }
        else{
            return 0;
        }
    }

    blankTileDescend( startRow, startCol){
        let ret = [];
        ret.length = 3;
        var count = 0;
        var row;
        var col = startCol;
        for(row = startRow; row < this.playBoard.length; row++){
            if(this.playBoard[row][col]!=0){
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

    calcHeuristic(counter){
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

    mmWinCheck(){
        return this.mmHorizontalCheck() || this.mmVerticalCheck() || this.mmDiagLRCheck() || this.mmDiagRLCheck();
    }

    mmMatchCheck(one, two, three, four){
        return one == two && one == three && one == four && one !=0;
    }

    mmHorizontalCheck(){
        for(let row = 0; row < this.playBoard.length; row++){
            for(let col = 0; col < 4; col++){
                if(this.mmMatchCheck(this.playBoard[row][col],
                    this.playBoard[row][col+1],
                    this.playBoard[row][col+2],
                    this.playBoard[row][col+3])){
                        return true;
                    }
            }
        }
    }

    mmVerticalCheck(){
        for(let col = 0; col < 7; col ++){
            for(let row = 0; row < 3; row ++){
                if(this.mmMatchCheck(this.playBoard[row][col],
                    this.playBoard[row+1][col],
                    this.playBoard[row+2][col],
                    this.playBoard[row+3][col])){
                        return true;
                    }
            }
        }  
    }


    mmDiagLRCheck(){
        for(let col = 0; col < 4; col ++){
            for(let row = 0; row < 3; row ++){
                if(this.mmMatchCheck(this.playBoard[row][col],
                    this.playBoard[row+1][col+1],
                    this.playBoard[row+2][col+2],
                    this.playBoard[row+3][col+3])){
                        return true;
                    }
            }
        }
    }

    mmDiagRLCheck(){
        for(let col = 0; col < 4; col ++){
            for(let row = 5; row >2; row --){
                if(this.mmMatchCheck(this.playBoard[row][col],
                    this.playBoard[row-1][col+1],
                    this.playBoard[row-2][col+2],
                    this.playBoard[row-3][col+3])){
                        return true;
                    }
            }
        }
    }
}
