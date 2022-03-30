#!/usr/bin/env python3
//# -*- coding: utf-8 -*-
/**
 * Created on Sat Mar 13 11:27:10 2021
 *
 * @author: prowe
 *
 * Solve Sudoku with backtracking
 *
 * Inspired by code here:
 * https://www.geeksforgeeks.org/building-and-visualizing-sudoku-game-using-pygame/
 */


/**
 * Get all the numbers from the 3x3 square that the row and the column are in.
 * @param {2-D array or list of lists} grid
 * @param {int} row
 * @param {int} col
 * @return  The values in the 3x3 square
 */
function getsquarevals(grid, row, col) {
    //console.log("In getsquarevals");
    let result = [];

    let irow = Math.floor(row / 3); // row//3; 
    let icol = Math.floor(col / 3); // col//3;

    // let rowmin = irow * 3;
    // let rowmax = irow * 3 + 3;
    // let colmin = icol * 3;
    // let colmax = icol * 3 + 3;
    // for (i=rowmin; i<rowmax; i++) {
    //     for (j=colmin; j<colmax; j++) {
    //         result.append(grid[i][j]);
    //     }
    // }

    let rowmin = irow * 3;
    let rowmax = irow * 3 + 3;
    let colmin = icol * 3;
    let colmax = icol * 3 + 3;
    for (i=rowmin; i<rowmax; i++) {
        for (j=colmin; j<colmax; j++) {
            result.push(grid[i][j]);
        }
    }
    // [grid[i][j] for i in range(irow * 3, irow * 3 + 3) \
    //        for j in range(icol * 3, icol * 3 + 3)];

    return result
}


/**
 * Check if the value entered in board is already in the row or column
 * @param grid  The current numbers of the Sudoku board, list of lists
 * @param row
 * @param col
 * @param val
 * @return  true or false
 */
function alreadythere(grid, row, col, val){

    // Is the value already in the row?
    // if (val in grid[row]) {
    if (grid[row].includes(val)) {
        return true;
    }

    // Is the value already in the column? We have to build up the 
    // column arrays one by one to check.
    //
    // colvals = [grid[i][col] for i in range(9)]
    let colvals = [];
    let item;
    for (let i=0; i<9; i++) {
        //colvals.append(grid[i][col]);
        item = grid[i][col];
        colvals.push(item);
    }
    //if (val in colvals){
    if (colvals.includes(val)) {
        return true;
    }

    // Is the value in the 3x3 square?
    if (getsquarevals(grid, row, col).includes(val)) {
        return true;
    }

    return false;
}

var delay = 1000;


/**
 * Solve the sudoku board using ONLY Backtracking, recursively
 * @param grid  The current numbers of the Sudoku board, list of lists
 * @param putSquare  The class for printing or plotting the board
 * @param row  Index to row
 * @param col  Index to col
 * @param moves Array of all the moves taken, where each move is an array
 * @return grid
 * @return true or false
 */
function backtrackOnly(grid, putSquare, row, col, moves){
    let res;
    let success;
    
    // Find the row, col of the first empty box (i.e. contains 0), 
    // going through columns, then rows
    while (grid[row][col] > 0){
        if (col < 8){
            col += 1;
        }
        else if (col == 8 && row < 8){
            col = 0;
            row += 1;
        }
        else if (col == 8 && row == 8){
            // Exit condition: return true and grid if at end of puzzle 
            // & puzzle is complete (has no zeros)
            return [true, grid, moves];
        }
    }

    // For test numbers of 1 through nine, loop over them and check if 
    // the number is already in the row, column, or 3x3 square. Once
    // we get to a unique number, add it to the grid and continue with
    // the next empty box, as determined in the while-loop above
    for (let testnum=1; testnum<10; testnum++) {   // in range(1, 10){
        if (!(alreadythere(grid, row, col, testnum))) {
            grid[row][col] = testnum;
            moves.push([row, col, testnum, "backtrack"]);

            console.log(delay);
            setTimeout(function() {
                putSquare(row, col, testnum, 'backtrack');
            }, delay);

            res = backtrackOnly(grid, putSquare, row, col, moves);
            success = res[0];
            grid = res[1];

            if (success) {
                // This is the exit condition
                return [true, grid, moves];
            }

            // If backtrack got to a number that is not allowed, undo it
            grid[row][col] = 0;
            setTimeout(function() {
                putSquare(row, col, 0);
            }, delay);
        }
    }
        
    return [false, grid, moves];
}


/**
 * Make sure that the board is valid
 * @param grid  The current numbers of the Sudoku board, list of lists
 * @return True if QC passes, else false. 
 * @return Message
 */
function qualityCheck(grid){
    for (row=0; row<9; row++){        //row in range(9):
        for (col=0; col<9; col++) {   //col in range(9):
            val = grid[row][col];
            if (val === 0){
                continue;
            }
            grid[row][col] = 0;
            if (alreadythere(grid, row, col, val)) {
                let msg = `Duplicate value in row: ${row}, col: ${col}: ${val}`;
                //msg = "Duplicate value in row: " + row + ", " + col +"": ${col}: ${val}`;
                return [false, msg];
            }
            grid[row][col] = val
        }
    }
    return [true, "success"];
}


/**
 * Solve the sudoku board using ONLY Backtracking
 * @param grid  The current numbers of the Sudoku board, list of lists
 * @param putSquare  The class for printing or plotting the board
 * @return grid
 * @return success
 * Notes:
 * populateSquare(irow, icol, value, numberColor='', borderColor='')
 */
function backtracker(grid, putSquare){
    let result;
    let msg;
    let qcResult;
    let success;

    // Starting moves is empty array
    let moves = [];

    // Check the starting grid
    qcResult = qualityCheck(grid);

    // Solve the puzzle with backtracking and return a message ("success" if succesful, else other)
    // as well as the moves to win the puzzle.
    result = backtrackOnly(grid, putSquare, 0, 0, moves);
    success = result[0];
    grid = result[1];
    moves = result[2];


    // Get the message stating whether it was successful
    if (success) {
        qcResult = qualityCheck(grid);
        let qcSuccess = qcResult[0];
        let qcMsg = qcResult[1];
        if (qcSuccess) {
            msg = "success";
        }
        else {
            msg = qcMsg;
        }
    }
    else {
        msg = "failure";
    }

    return [msg, moves];
}