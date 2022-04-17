/**
 * From python code with header:
 * #!/usr/bin/env python3
 * # -*- coding: utf-8 -*-
 * 
 * Created on Wed Mar 10 12:05:35 2021
 *
 * @author: prowe
 *
 * Purpose:
 *     Solve a Sudoku puzzle as a Constraint Satisfaction Problem (CSP), using
 *     Arc Consistency 3 (AC-3) and Backtracking
 *
 * By Penny Rowe
 * 2021/03/10
 * AI with Prof. America Chambers, Spring 2021
 * 
 * Converted to JavaScript
 * By Penny M. Rowe
 * March 14, 2021
 */

// from copy import deepcopy

// from variable import Variable
// from constraints import get_all_constraints, qc_board_and_constraints
// from constraints import reverse_constraints, final_constraints

// # Choose how to get the next unassigned variable
// #from get_unassigned_variable import get_next_unassigned as get_unassigned
// #from get_unassigned_variable import get_unassigned_using_mrv as get_unassigned
// from get_unassigned_variable import get_unassigned_using_mrv_and_degree as get_unassigned


/**
 * If the constraint given by xj has only one value, and if that value is present in the
 * domain of xj, remove it. Return xi and whether it was modified
 * @param xi  Sudoku box that is being constrained
 * @param xj  Sudoku box with value that serves as constraint
 * @return  Array containing xi and true if modified, else false
*/
function removeValues(xi, xj) { 
    let modified = false;
    let value;

    // We can only remove values if the domain of y has only one value
    // and the domain of x is not fixed.
    // (If x and y are both fixed and equal, that should have been caught
    // previously)
    if (xj.getDomainSize() == 1) {
        let q = xj.getOnlyValue();
        if (xi.domain.has(q)) {
            // Remove p from Dx.
            // Note: xi points to an element of assignment, so this will also
            // remove p from xi in assignment.
            xi.domain.delete(q);
            modified = true;
        }
    }
    return new Array(xi, modified);

}


/**
 * Create the board as an array of arrays of each Sudoku box, where each box is a
 * class containing its row and column index and the domain of values allowed
 * in it.
 * @param {} grid  The Numbers in the Sudoku board, as a list of list of int
 * @return The board, an array of arrays of elements of class variable.
 */
function getBoard(grid) {
    let nside = grid.length;
    var board = new Array();

    let boardRow;
    let value;
    let allVals;
    for (i=0; i<nside; i++) {
        boardRow = new Array();
        for (j=0; j<nside; j++) {
            value = grid[i][j];
            if (value == 0) {
                allVals = new Set();
                for (k=1; k<=nside; k++) {
                    allVals.add(k);
                }            
                boardRow.push(new Variable(i, j, nside, allVals));
            }
            else {
                allVals = new Set();
                allVals.add(value);
                boardRow.push(new Variable(i, j, nside, allVals, true));
            }
        }
        board.push(boardRow);
    }
    return board
}



/**
 * Given a board, which is an array of arrays of classes for each box,
 * get the grid of 9x9 values in the current state of the board
 * @param board
 * @return grid
*/
function getGrid(board) {
    let gridrow;

    if (board === -1) {
        return None;
    }
    let nrows = board.length;
    let ncols = board[0].length;

    let grid = new Array(nrows);
    for (let i=0; i<nrows; i++) {
        gridrow = new Array(ncols);
        for (let j=0; j<ncols; j++) {
            if (board[i][j].getDomainSize() === 1) {
                gridrow[j] = board[i][j].getOnlyValue();
            }
            else if (board[i][j].getDomainSize() === 0){
                gridrow[j] = -1;
            }
            else{
                gridrow[j] = 0;
            }
        }
        grid[i] = gridrow;
    }
    return grid;
}




/**
 * Check if the board is complete, where complete means each cell has
 * only one value. Note that checking for consistency is not done here.
 * @param board  List of lists of class instances for cell of Sudoku board
 * @return true if the board is complete, false otherwise
*/
//TODO why would board be -1?  Why would it be undefined? Throw error instead?
function isComplete(board) {
    let row;
    let box;

    if (board === -1 | board === undefined) {
        return false;
    }
    
    let nrows = board.length;
    let ncols = board[0].length;

    for (let i=0; i<nrows; i++) {
        for (let j=0; j<ncols; j++) {
            box = board[i][j];
            if (box.getDomainSize() > 1) {
                return false;
            }
        }
    }
    return true;
}



/**
 * Populate the Sudoku board graphic with the values from grid
 * This should only be done when a new puzzle is selected, not during
 * game play or when the solver is working.
 * @param {array} grid 
 */
//  function updateMoves(board, moves){
//     nrows = board.length;
//     ncols = board[0].length;

//     grid = getGrid(board);

//     // Put all non-zero values into the grid
//     for (i=0; i<nrows; i++){
//         for (j=0; j<ncols; j++){
//             if (!(board[i][j].fixed)) {
//                 moves.push([i, j, grid[i][j], 'backtrack']);
//             }
//         }
//     }
//     return moves;
// }

/**
 * Populate the Sudoku board graphic with the values from grid
 * This should only be done when a new puzzle is selected, not during
 * game play or when the solver is working.
 * @param board
 * @param moves
 */
 function updateChangedMoves(board, moves){
    nrows = board.length;
    ncols = board[0].length;

    grid = getGrid(board);

    // Put all non-zero values into the grid
    for (i=0; i<nrows; i++){
        for (j=0; j<ncols; j++){
            if (!(board[i][j].fixed)) {
                moves.push([i, j, grid[i][j], 'backtrack']);
            }
        }
    }
    return moves;
}



/**
 * Backtracking search algorithm
 * @param assignment   The board, an array of arrays of elements of class variable.
 * @param constraints
 * @param moves
*/
function backtrack(assignment, constraints, moves) {
    let domainVals;
    let ac3result;

    if (isComplete(assignment)) {                // Exit condition: board done!
        return [assignment, moves];              // This returns to the last call to backtrack
    }
    let unasgn = getNextUnassigned(assignment);

    for (let d of unasgn.domain) {

        // Deep copy the board. Any fixed values (eventually "final") will never be changed,
        // so they can be references. Everything else must be new so we can revert
        // back if needed.
        let nside = assignment.length;
        let tempBoard = new Array(nside);
        for (let irow=0; irow<nside; irow++) {
            tempBoard[irow] = new Array(nside);
            for (let icol=0; icol<nside; icol++) {
                //if (!(tempBoard[irow][icol].fixed)) {
                    // Deepcopy the domain
                    domainVals = new Set();
                    for (let domainVal of assignment[irow][icol].domain) {
                        domainVals.add(domainVal);                    
                    }
                    // Create a new variable for the Sudoku box
                    fixed = assignment[irow][icol].fixed;
                    tempBoard[irow][icol] = new Variable(irow, icol, nside, domainVals, fixed);
                //}
            }
        }

        // Replace the domain of x with d in the assignment
        tempBoard[unasgn.row][unasgn.col].replace(d);       // replace domain of x with d

        // Update the graphics: here is where we have to refresh a bunch of boxes that changed
        //TODO: only update the boxes that changed, and add a new style for this
        //updateBoard(assignment);
        //moves = updateChangedMoves(assignment, moves);
        moves.push([unasgn.row, unasgn.col, d, 'backtrack']);


        // No need to deepcopy the constraints because we never alter them.
        // We always loop through them, creating new constraints for each loop,
        // which are then looped over next time.

        // Keep repeating AC-3 and backtracking until we get to an impossible value
        // (empty domain). When that occurs, move onto the next trial domain value
        // The prefix to the method here is "backtrack"
        [ac3result, moves] = arcConsistency3(tempBoard, constraints, moves, "backtrackPlus");
        if (ac3result !== -1) {
            // This means d is ok (for now)
            [result, moves] = backtrack(tempBoard, constraints, moves);
                                                  //   assignment is returned
            if (result !== -1) {                  //   If it worked:
                return [result, moves];           //  unwind or return to solve
            }
        }

        // There is no need to remove d from domain, because the next time
        // around we will just reset it, and if we run out of values, we
        // will return FAIL (-1)
        // But we do need it for the graphics
        //moves.push([unasgn.row, unasgn.col, d, 'backtrack']); 
        moves = updateChangedMoves(assignment, moves);
        
        // change current move to false because it did not work

    }

    return [-1, moves];   // Fail, but keep the moves
}

/**
 * 
 * @param {*} assignment 
 * @param {*} constraints 
 * @param {*} moves 
 * @param {*} prefix  A prefix (if any) to prepend to the solver method, e.g. "final" etc
 * @returns The assignment and the moves
 * @throws  Error if constraint exists for fixed values
 */
function arcConsistency3(assignment, constraints, moves, prefix="") {
    let inverseMoves = [];

    function constraintChecker(assignment, constraints, moves, prefix="") {
        // Array for any new constraints we need to add on
        let newConstraints = [];
        let resultFromRemoval;
        let anyremoved;
        let constraint;

        // Loop over all the constraints
        for (let i=0; i<constraints.length; i++){
            constraint = constraints[i];
            xi = assignment[constraint[0][0]][constraint[0][1]];
            xj = assignment[constraint[1][0]][constraint[1][1]];
        
            if (constraint[0][0] === constraint[1][0] & constraint[0][1]===constraint[1][1]) {
                throw "invalid constraint";
            }

            if (xi.row === xj.row & xi.col === xj.col) {
                throw "invalid constraint: xi = xj";
            }

            // Check if xi is fixed. It shouldn't be because we already removed
            // it from the constraints
            if (xi.fixed) {
                throw "The value in this box is fixed; should not have a constraint.";
            }

            resultFromRemoval = removeValues(xi, xj);
            anyremoved = resultFromRemoval[1];

            // Whenever we are down to a domain of one, update the moves
            if (anyremoved & xi.getDomainSize() == 1) {
                value = xi.getOnlyValue();
                inverseMoves.push([xi.row, xi.col, 0, 'undoAC3']);
                moves.push([xi.row, xi.col, value, prefix+'AC3']);
            }
            modified = true;

            if (anyremoved) {
                // If there is only one option left in the domain of xi, or if 
                // we removed a value from domain of xi based on constraint with xj:
                //
                // Return FAIL if nothing is left in the domain of xi.
                // Then check every variable that xi has a constraint
                // with, to see if those constraints are still satisfied or if
                // we can simplifiy their domains based on the new domain of xi.
                // Example: If xi has a constraint with some xk:
                //    - If the domain of xi is now {3}, and the domain of xk is
                //       also {3}, then return FAIL so we can back up.
                //    - If the domain of xi is now {3}, and the domain of xk is
                //      {1,3}, we will be able to reduce the domain of xk to {1}
                // But note that those may already be on the queue, so now
                // they'll be looped over twice.
                // Those will be done in another loop around. For now, just
                // add them to the queue
                if (xi.getDomainSize() === 0) {
                    // CSP cannot be solved
                    return [-1, inverseMoves];
                }
                newConstraints = reverseConstraints(xi.row, xi.col, xi.maxDomainVal, newConstraints, assignment);
            }
        }
        return [newConstraints, inverseMoves];
    }

    let newConstraints = constraints;
    let count = 0;  // make sure the while loop cannot go on forever
    // Go through all of the constraints, adding any new constraints to a new array,
    // which is then returned and gone through next time around, until there are
    // no new constraints
    while (newConstraints.length > 0 & count < 100) {
       [newConstraints, inverseMoves] = constraintChecker(assignment, newConstraints, moves, prefix);
        if (newConstraints === -1) {
            return [-1, moves];
        }
        count ++;
    }
    if (count >= 99) {
        throw "Tried to go through constraint loop too many times, so quit."
    }
    return [assignment, moves, inverseMoves];
}      



/*
 Solve Sudoku given a set of cells with fixed values
 @param original Starting grid, with zeros for unknown values, as
                llist of lists of integers
 @param boardPlot Class for plotting the board
 @return  The solved Sudoku grid
 @throws  Error if the board is not valid
*/
function solve(original) { 

    let grid;
    let moves = [];
    let dum;

    // Get the board as an array of arrays of Variables
    let board = getBoard(original);

    // Quality control the starting board
    let boardValid = qcBoard(board);
    if (!(boardValid)) {
        return ["Puzzle is not valid!", moves];
    }

    // Get the starting constraints
    constraints = getConstraints(board);

    // Try AC-3 alone first. The prefix to the solver method is "final"
    // because any AC-3 solutions found here are the final answer for the box.
    [board, moves, dum] = arcConsistency3(board, constraints, moves, "final");

    // If it isn't solved, using backtracking with AC-3
    [board, moves] = backtrack(board, constraints, moves, 0);

    // Final check: check all constraints again    
    boardValid = qcBoard(board);
    if (!(boardValid)) {
        return ["Solved puzzle is not valid!", board];
    }

    if (isComplete(board)) {
        grid = getGrid(board);
        return ["success", moves];
    }

    return ["failure", moves];
}




/**
 * Helper function for debugging that prints the board
 * @param {*} board 
 */
function printBoard(board) {
    grid = getGrid(board);
    
    let nrows = grid.length;
    let ncols = grid[0].length;
    let printrow;

    for (let i=0; i<nrows; i++) {
        printrow = [];
        for (let j=0; j<ncols; j++) {
            printrow.push(grid[i][j]);
        }
        console.log(printrow);
    }
}



/**
 * A function to be used in debugging that prints the location and domains of xi and xj
 * @param xi  Sudoku box that is being constrained
 * @param xj  Sudoku box with value that serves as constraint
*/
function printStuff(xi, xj) {
    console.log(`xi is at ${xi.row}, ${xi.col} with domain:`);
    console.log(xi.domain);
    console.log(`xj is at ${xj.row}, ${xj.col} with domain:`);
    console.log(xj.domain);
}