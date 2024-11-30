// @ts-check
/**
 * Created on Wed Mar 10 11:58:44 2021
 * 
 * @author: prowe
 * 
 * Solving Sudoku using
 * a constraint satisfaction problem with AC-3 and Backtracking
 * 
 * This is the main program that loads in, displays the board and
 * calls the solver.
 * 
 * by Penny Rowe
 * 2021/03/11
 * For AI and Software Engineering with Prof. Chambers
 * at the University of Puget Sound
 * Spring 2021, Spring 2022
 * 
 */

/*****************************************************
    FUNCTIONS
******************************************************/

// TODO: do not need this anymore?
import { backtracker } from './backtrack.js'

/**
 * Check if a file exists
 * @param {String} urlToFile
 * @return  True if file exists, else false
 */
export function fileExists(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
    if (xhr.status === 404) {
        throw `File ${urlToFile} not found.`;
    }
    return xhr.status !== 404;
}

/**
 * Load in the incompleted Sudoku puzzle, or use default
 * @param {String} puzzle  Name of puzzle to use
 * @return  The grid of numbers; list of lists
 * @raises  NameError  If filename is not '' and does not exist
 */
export function loadStartingValues(puzzle = 'easy') {
    let grid;

    if (puzzle === 'random') {
        let puzzleTypes = ['easy', 'medium', 'hard', 'evil'];
        let randint = Math.floor(puzzleTypes.length * Math.random());
        puzzle = puzzleTypes[randint];
    }

    if (puzzle === 'easy') {
        grid = [[5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]];
        return grid;
    }

    if (puzzle === 'medium') {
        grid = [[0, 0, 2, 0, 0, 9, 0, 0, 0],
        [0, 3, 0, 8, 0, 1, 2, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 9],
        [0, 2, 5, 0, 0, 0, 4, 0, 0],
        [0, 7, 0, 0, 0, 0, 8, 0, 2],
        [0, 0, 0, 6, 0, 0, 9, 3, 0],
        [8, 0, 0, 5, 2, 0, 0, 0, 0],
        [0, 0, 0, 3, 4, 0, 6, 0, 0],
        [0, 0, 0, 0, 0, 7, 0, 0, 0]];
        return grid;
    }

    if (puzzle === 'hard') {
        grid = [[0, 0, 0, 7, 0, 8, 0, 3, 5],
        [5, 9, 3, 0, 4, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 4, 0, 0, 0, 0, 2, 8],
        [0, 0, 9, 0, 5, 0, 3, 0, 0],
        [2, 6, 0, 0, 0, 0, 9, 0, 0],
        [0, 0, 8, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 0, 5, 9, 7],
        [4, 7, 0, 9, 0, 3, 0, 0, 0]];
        return grid;
    }

    if (puzzle === 'evil') {
        grid = [[0, 0, 0, 6, 3, 5, 2, 0, 0],
        [0, 0, 5, 7, 0, 0, 0, 0, 9],
        [0, 7, 0, 0, 0, 0, 0, 0, 0],
        [5, 0, 0, 0, 0, 4, 6, 0, 0],
        [0, 9, 0, 0, 5, 0, 0, 7, 0],
        [0, 0, 4, 8, 0, 0, 0, 0, 5],
        [0, 0, 0, 0, 0, 0, 0, 4, 0],
        [7, 0, 0, 0, 0, 2, 3, 0, 0],
        [0, 0, 2, 5, 9, 6, 0, 0, 0]];
        return grid;
    }

    //If none of these selected, use the easy grid
    grid = [[5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]];
    return grid;
}


/**
 * Set up the empty grid
 * @param {number} nrows
 * @param {number} ncols 
 */
export function makeEmptyGrid(nrows, ncols) {
    let table = document.getElementById("sudokuGraphic");
    while (table.lastChild) {
        table.removeChild(table.lastChild);
    }
    for (let i = 0; i < nrows; i++) {
        let row = document.createElement("tr");
        row.classList.add(`row-${i}`);
        table.appendChild(row);
        for (let j = 0; j < ncols; j++) {
            // To let player play the game, make an input box as a child to the cell
            let col = document.createElement("td");
            col.classList.add(`col-${j}`);
            col.classList.add("sudokubox");
            row.appendChild(col);
        }
    }
}


/**
 * Reset the board and the state of play (i.e. filling in the board) to the beginning
 */
export function runBacktrackSolver(puzzleType) {

    // Highlight the button for the selected solver, and put the other back to normal
    let solverMethod = document.getElementById("solverDemoBacktrack");
    solverMethod.classList.add("selectedsolver");

    let nonsolverMethod = document.getElementById("playSudokuSolver");
    nonsolverMethod.classList.remove("selectedsolver");

    // TODO: hopefully this does not need to happen here
    // playReset();

    // Reset the state of play and the board
    boardReset(puzzleType);

    // Print a message while we wait for the solver
    let state = document.querySelector(".state");
    state.innerHTML = "<p>You have chosen backtracking.</p><p>Please wait while I solve the puzzle.</p>";
    let explanation = document.querySelector(".explanation");
    explanation.innerHTML = "<p></p>";

    // Solve the board using backtracking alone, using backtrack, in backtrack.js
    let grid = loadStartingValues(puzzleType);
    let result = backtracker(grid);
    let finalgrid = grid;

    let msg = result[0];

    // TODO: This probably needs to be returned to +page.svelte
    let moves = result[1]; // row, column, value, method

    // Write the message saying it's been solved
    state.innerHTML = "<p><b>Suggested use</b></p><p>Use the top set of controls<br> and the speed slider to<br>move through the solution.</p>or<p></p><p>Click 'Show the domain'<br>and 'step' to step through<br>the solution.</p><br><p>Choose a new puzzle and <br>solver on the left.</p>";

    return moves
}



/**
 * Reset the board, but do not clear timers or alter the state of play
 */
export function boardReset(puzzleType) {
    let originalgrid = loadStartingValues(puzzleType);
    makeEmptyGrid(9, 9);
    populateBoard(originalgrid);

    // TODO: needs to be an input? And returned?
    // global variable with the current state of the grid
    let currentgrid = loadStartingValues(puzzleType);
}


/**
* Populate a box of the board and move the pointer to the next box.
* If at the final move, quit playback
* Also update the grid to the current state
* @param {array} moves  Array of arrays of moves, where inner array is [row, col, value, string]
*/
let populator = function (moves) {
    if (imove < moves.length) {
        // Populate the box, update the grid, and increment the pointer to the moves
        populateSquare(moves[imove][0], moves[imove][1], moves[imove][2], moves[imove][3]);
        currentgrid[moves[imove][0]][moves[imove][1]] = moves[imove][2];
        imove++;
    }
    else {
        clearInterval(timeId);
        // Finished with solution
        let state = document.querySelector(".state");
        state.innerHTML = "<p>Puzzle Completed!</p><p>Continue using controls or choose a different puzzle or solver.</p>";
        let explanation = document.querySelector(".explanation");
        explanation.innerHTML = "<p></p>";
        running = false;
    };
};




/**
 * Get the step size for rewinding, depending on the delay
 * @param {number} imove  The index to the move
 * @param {number} delay  The delay between rewind steps
 * @returns 
 */
export function stepSizeForRewind(imove, delay) {

    let deltai = 1;              // slow: 1 step back

    if (delay <= 0) {            // fastest: 10 steps to location
        deltai = Math.round(imove / 10);
    }
    else if (delay <= 10) {      // fast: 100 steps to location
        deltai = Math.round(imove / 100);
    }
    else if (delay <= 100) {     // medium: 1000 steps to location
        deltai = Math.round(imove / 1000);
    }

    // Do not allow deltai < 1
    if (deltai < 1) {
        deltai = 1;
    }

    return deltai;
}



/** Determine the delay for the graphics display based on the animation speed
* @param {number} ANIMATION_SPEED The speed from the slider
* @returns {number} The delay for filling in boxes in the puzzle
*/
export function getDelayFromSpeed(ANIMATION_SPEED) {
    let delay = 10 ** (3 - ANIMATION_SPEED / 100);
    if (delay <= 1) {
        delay = 0;
    }
    return delay;
}


/**
 * Create an interval for playing/rewinding delay
 * @param f
 * @param dynamicParameter
 * @param {number} interval
 */
export function runForInterval(f, dynamicParameter, interval) {
    return setInterval(function () {
        f(dynamicParameter);
    }, interval);
}


/**
 * Get the domain
 * @param {number} row  Index to the row of currentgrid
 * @param {number} col  Index to the column of currentgrid
 * @param {array} currentgrid  The current grid with values for row and col
 */
export function getDomain(row, col, currentgrid) {
    let nside = currentgrid.length;
    let val;
    let excluded = new Set();
    let domain = new Set();

    // Get the constraints for this grid box
    let constraints = getConstraintsForBox(row, col, nside);

    // Get the domain from the constraints
    while (constraints.length > 0) {
        let constraint = constraints.pop();
        val = currentgrid[constraint[1][0]][constraint[1][1]];
        excluded.add(val);
    }

    // Starting values for domain
    for (let i = 0; i <= nside; i++) {
        if (!(excluded.has(i))) {
            domain.add(i);
        }
    }
    return domain;
}


/**
 * For buttons that toggle on and off
 * @param button  The button to toggle on or off (e.g. pause button)
 */
export function toggle(button) {
    if (button.value == "OFF") {
        button.value = "ON";
    } else {
        button.value = "OFF";
    }
}


/**
 * For all squares with value = 0, clear the domain
 */
export function clearDomainFromTable(currentgrid) {
    let domain;
    let nside = currentgrid.length;
    for (let row = 0; row < nside; row++) {
        for (let col = 0; col < nside; col++) {
            if (currentgrid[row][col] === 0) {
                // Return the Sudoku box to blank
                //TODO: Change "empty" to something more useful below
                populateSquare(row, col, 0, 'empty');
            }
        }
    }
}




/**
 * Show the domain on the display board
 */
export function showdomain(currentgrid) {
    // For all squares with value = 0, get the domain and display it
    let domain;
    let nside = currentgrid.length;
    for (let row = 0; row < nside; row++) {
        for (let col = 0; col < nside; col++) {
            if (currentgrid[row][col] === 0) {
                // Get the domain and show it in the Sudoku box
                domain = getDomain(row, col, currentgrid);
                //TODO: is domain ok below?
                populateSquareWithDomain(row, col, domain, 'domain');
            }
        }
    }
}

/** Populate the domain in a Sudoku square
* Populate a Sudoku board graphic square based on given row and col
* @param {number} irow 
* @param {number} icol 
* @param domain
* @param {String} boxStyle 
* @throws error if bad value given for style of sudoku box
*/
function populateSquareWithDomain(irow, icol, domain, boxStyle='empty') { 
    let domainstr = "<p>" //123</p><p>456</p><p>789</p>"
    let i;

    for (i=1; i<=3; i++) {
        domainstr += domainBuilder(i, domain);
    }
    domainstr += "</p><p>"
    for (i=4; i<=6; i++) {
        domainstr += domainBuilder(i, domain);
    }
    domainstr += "</p><p>"
    for (i=7; i<=9; i++) {
        domainstr += domainBuilder(i, domain);
    }
    domainstr += "</p>"
    
    domain = domainstr;

    // Allowed values for modifiable cell properties
    let allowedBoxStyles = ['empty', 'fixed', 'backtrack', 'AC3', 'backtrackPlusAC3', 'finalAC3'];
    let allowedValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // The Sudoku cell at irow, icol
    let box = document.querySelector(`.row-${irow} .col-${icol}`);

    // If this box has already been set to fixed, we should not be changing it
    if (box.className.indexOf("fixed") !== -1) {
        return;
    }

    // Clear out all box style classes
    for (let thisStyle of allowedBoxStyles) {
        box.classList.remove(thisStyle);
    }

    // Add the input box style class. If it is not an allowed value, use default
    box.classList.add("domain");

    // Put the number in the box, unless it is zero, then keep empty
    box.innerHTML = domain;

}


/**
 * Build the domain up from values
 * @param {number} i 
 * @param {*} domain (Probably a set)
 * @returns 
 */
export function domainBuilder(i, domain) {
    if (domain.has(i)) {
        return String(i);
    }
    else {
        return " ";
    }
}


// From constraints.js
//  * Created on Thu Mar 11 07:01:49 2021

/**
 * 
 * @param {array} board  Array of arrays of objects of type Variable
 * @returns {boolean}  True if the board is ok, otherwise false
 */
export function qcBoard(board) {

    let maxDomainVal = board[0][0].maxDomainVal;
    
    // Fail if the maxDomainVal is not a number above 0
    if (!(Number.isFinite(maxDomainVal)) || maxDomainVal <= 0) {
        return false;
    }

    let boxval;

    for (let irow=0; irow<maxDomainVal; irow++) {  
        for (let icol=0; icol<maxDomainVal; icol++) {

            // If the value in this box is not fixed, move on
            if (!(board[irow][icol].fixed)) {
                continue;
            }

            boxval = board[irow][icol].getOnlyValue();

            // Row: For the row (irow) containing the cell at (irow, icol),
            // add all the columns (e.g. 1-9), except the cell's column (icol)
            // Check if there is only one value in the domain, and, if so,
            // make sure it is different than the value in irow, icol
            for (let jcol=0; jcol<maxDomainVal; jcol++) {
                if (jcol !== icol && board[irow][jcol].domain.size === 1 && board[irow][jcol].getOnlyValue() === boxval) {
                    return false;
                }
            }

            // Column: For the column (icol) containing the cell at (irow, icol), 
            // check all the rows (e.g. 1-9), except the cell's row (irow)
            for (let jrow=0; jrow<maxDomainVal; jrow++) {
                if (jrow !== irow && board[jrow][icol].domain.size === 1 && boxval === board[jrow][icol].getOnlyValue()) {
                    return false;
                }
            }

            // Box: For the (e.g. 3x3) box containing the cell at (irow, icol),
            // check all row,column sets that share the box, except the cell's 
            // (irow, icol) and the cells that have already been checked
            let boxRow = Math.floor(irow/3) * 3;
            let boxCol = Math.floor(icol/3) * 3;
            for (let jrow=boxRow; jrow<boxRow+3; jrow++) {
                for (let jcol=boxCol; jcol<boxCol+3; jcol++) {
                    if (!(jrow===irow && jcol===icol) && board[jrow][jcol].domain.size===1 && boxval===board[jrow][jcol].getOnlyValue()) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}


/**
 * 
 * Row: For the row (irow) containing the box at (irow, icol),
 * add all the columns (e.g. 1-9) to the constraints, except the cell's column (icol)
 * Format: An array containing the current cell [irow, icol], followed by the
 * constraint row and column [irow, jol]
 * @param {number} irow  Index to row
 * @param {number} icol  Index to column
 * @param {number} maxDomainVal  Maximum value allowed in the domain (e.g. 9)
 * @returns  The constraints for the box at irow, icol
 */
export function getConstraintsForBox(irow, icol, maxDomainVal) {
    let boxConstraints = [];

    for (let jcol=0; jcol<maxDomainVal; jcol++) {
        if (jcol !== icol) {
            boxConstraints.push([[irow, icol], [irow, jcol]]);
        }
    }

    // Column: For the column (icol) containing the cell at (irow, icol), 
    // add all the rows (e.g. 1-9), except the cell's row (irow)
    for (let jrow=0; jrow<maxDomainVal; jrow++) {
        if (jrow !== irow) {
            boxConstraints.push([[irow, icol], [jrow, icol]]);
        }
    }

    // Box: For the (e.g. 3x3) box containing the cell at (irow, icol),
    // add all row,column sets that share the box, except the cell's 
    // (irow, icol) and the constraint cells that have already been added
    let boxRow = Math.floor(irow/3) * 3;
    let boxCol = Math.floor(icol/3) * 3;
    for (let jrow=boxRow; jrow<boxRow+3; jrow++) {
        for (let jcol=boxCol; jcol<boxCol+3; jcol++) {
            if (jrow != irow && jcol != icol) {
                boxConstraints.push([[irow, icol], [jrow, jcol]]);
            }
        }
    }

    return boxConstraints;
}


/**
 * 
 * Purpose: For all Sudoku boxes that do not have fixed values in them, 
 * get all binary constraints of the form xi,xj and put them their
 * row and column indices into a list.
 * @param {array} board  An array of arrays for the Sudoku board, with each value an object of type Variable
 * @returns {array} constraints  array of arrays containing 2 arrays with 2 elements each:
 *                        [[[xi_row, xi_col],[xj_row,xj_col]], ... ]
 *
 * A Sudoku board has 9 rows and 9 columns, and is divided into 3x3 boxes.
 * For each cell/box (row & column), there are therefore:
 *     Constraints per cell:
 *         8 for the row (9-1)
 *         8 for the column (9-1)
 *         4 for the box (9-1-4 duplicates)
 *         ---------------
 *         20 constraints / cell
 *
 *     There are 81 cells, so 81*20 = 1620 constraints total. Note that we
 *     only include 4 constraints for the box because we have already
 *     counted the other 4: 2 in the row and 2 in the column.
 *
 *     We do not need constraints for boxes with fixed values, so they will
 *     not be added to the list of constraints,
 *
 */
export function getConstraints(board) {
    let maxDomainVal = board[0][0].maxDomainVal;
    let constraints = [];
    let boxConstraints;

    for (let irow=0; irow<maxDomainVal; irow++) {
        for (let icol=0; icol<maxDomainVal; icol++) {
            // Do not get constraints for the boxes with fixed values, since
            // they will never change
            if (board[irow][icol].fixed) {
                continue;
            }
            boxConstraints = getConstraintsForBox(irow, icol, maxDomainVal);
            constraints = constraints.concat(boxConstraints);
        }
    }
    return constraints;
}

/**
 * 
 * Purpose: get all binary constraints of the form xi,xj and put them in
 * a list. To save space, we just put the row and column indices in the
 * list.
 * @param {number} maxDomainVal  int, The dimensions of each side of the square board
 * @returns {array} constraints  array of arrays containing 2 arrays with 2 elements each:
 *                               [[[xi_row, xi_col],[xj_row,xj_col]], ... ]
 *
 * A Sudoku board has 9 rows and 9 columns, and is divided into 3x3 boxes.
 * For each cell/box (row & column), there are therefore:
 *     Constraints per cell:
 *         8 for the row (9-1)
 *         8 for the column (9-1)
 *         4 for the box (9-1-4 duplicates)
 *         ---------------
 *         20 constraints / cell
 *
 *     There are 81 cells, so 81*20 = 1620 constraints total. Note that we
 *     only include 4 constraints for the box because we have already
 *     counted the other 4: 2 in the row and 2 in the column.
 *
 *     We can also exclude any fixed cells from the list of constraints,
 *     since (1) we pre-check for consistency, ans (2) they cannot change.
 *     But we do that in another function, just to keep things simple.
 *
 * Notes:
 *     1) There are a lot of nested loops here. However, this code is only
 *        run once and it has to cover all squares. 
 */

export function getAllConstraints(maxDomainVal) {
    let constraints = [];

    for (let irow=0; irow<maxDomainVal; irow++) {   //in list_rows:
        for (let icol=0; icol<maxDomainVal; icol++) {
            // Row: For the row (irow) containing the cell at (irow, icol),
            // add all the columns (e.g. 1-9) to the constraints, except the cell's column (icol)
            // Format: An array containing the current cell [irow, icol], followed by the
            // constraint row and column [irow, jol]
            for (let jcol=0; jcol<maxDomainVal; jcol++) {
                if (jcol !== icol) {
                    constraints.push([[irow, icol], [irow, jcol]]);
                }
            }

            // Column: For the column (icol) containing the cell at (irow, icol), 
            // add all the rows (e.g. 1-9), except the cell's row (irow)
            for (let jrow=0; jrow<maxDomainVal; jrow++) {
                if (jrow !== irow) {
                    constraints.push([[irow, icol], [jrow, icol]]);
                }
            }

            // Box: For the (e.g. 3x3) box containing the cell at (irow, icol),
            // add all row,column sets that share the box, except the cell's 
            // (irow, icol) and the constraint cells that have already been added
            let boxRow = Math.floor(irow/3) * 3;
            let boxCol = Math.floor(icol/3) * 3;
            for (let jrow=boxRow; jrow<boxRow+3; jrow++) {
                for (let jcol=boxCol; jcol<boxCol+3; jcol++) {
                    constraints.push([[irow, icol], [jrow, jcol]]);
                }
            }
        }
    }
    return constraints
}



/**
 * Get the reverse constraints, that is, the new constraints on other boxes due to
 * having assigned a value to the box at irow, icol
 * @param {number} irow  Index to row
 * @param {number} icol  Index to column
 * @param {number} maxDomainVal The maximum value allowed in the domain
 * @param {array} xjConstraints  The previous constraints, so new can be added
 * @param {array} board  The board, to check for fixed values and exclude them
 * @returns {array} The previous constraints + the new ones
*/
export function reverseConstraints(irow, icol, maxDomainVal, xjConstraints, board){
    let jcol;
    let jrow;

    // Row: Add all column indices to row, except the variable's
    // also do not add any that are fixed
    for (jcol=0; jcol<maxDomainVal; jcol++) {
        if (jcol !== icol && !(board[irow][jcol].fixed) ) {
            xjConstraints.push([[irow, jcol], [irow, icol]]);
        }
    }

    // Column
    for (jrow=0; jrow<maxDomainVal; jrow++) {
        // Add all rows of this column, except the variable's column
        if (!(jrow === irow) && !(board[jrow][icol].fixed) ) {
            xjConstraints.push([[jrow, icol], [irow, icol]]);
        }
    }

    // Box
    //  Add all row,column sets that share the box,
    //  except the variable's row, column
    //  and the ones that have already been one
    let ibox_row = Math.floor(irow/3) * 3;
    let ibox_col = Math.floor(icol/3) * 3;

    for (jrow=ibox_row; jrow<ibox_row+3; jrow++) {
        for (jcol=ibox_col; jcol<ibox_col+3; jcol++) {
            if (!(jrow === irow) && !(jcol === icol) && !(board[jrow][jcol].fixed) ) {
                xjConstraints.push([[jrow, jcol], [irow, icol]]);
            }
        }
    }

    return xjConstraints;
}


export function populateBoard(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let cell = document.querySelector(`.row-${i} .col-${j}`);
            if (cell) {
                cell.textContent = grid[i][j] !== 0 ? grid[i][j] : '';
                cell.classList.toggle('empty', grid[i][j] === 0);
                cell.classList.toggle('filled', grid[i][j] !== 0);
            }
        }
    }
}

   
/**
 * Add an outline around a box in the board display
 * @param {number} irow 
 * @param {number} icol
 * @param {String} boxStyle 
 */
export function boxborder(irow, icol, boxStyle='empty') { 
    // Get the sudoku box at the row and column and draw a border
    let box = document.querySelector(`.row-${irow} .col-${icol}`);
    box.classList.add("boxborder");
}


/**
 * Remove the outline around a box in the board display
 * @param {number} irow 
 * @param {number} icol
 * @param {String} boxStyle 
 */
export function removeboxborder(irow, icol, boxStyle='empty') { 
    // Get the sudoku box at the row and column and draw a border
    let box = document.querySelector(`.row-${irow} .col-${icol}`);
    box.classList.remove("boxborder");
}


/**
 * Populate a Sudoku board graphic square based on given row and col
 * @param {number} irow 
 * @param {number} icol
 */
    export function initializeSquare(irow, icol) {         
        // Ensure the row exists
        let row = document.querySelector(`.row-${irow}`);
        if (!row) {
            row = document.createElement('div');
            row.classList.add(`row-${irow}`);
            let gridContainer = document.getElementById('grid-container-puzzle');
            if (gridContainer) {
                gridContainer.appendChild(row);
            } else {
                console.warn('Grid container element not found.');
                return;
            }
        }
    
        // Create the column element
        let box = document.createElement('div');
        box.classList.add(`col-${icol}`);
        box.classList.add('empty');
        box.innerHTML = '';
    
        // Append the column element to the row
        row.appendChild(box);
    
        // Query the element again to verify it exists
        let box2 = document.querySelector(`.row-${irow} .col-${icol}`);

   
    // TODO: set the message
    // let messages = {
    //     'fixed': '<p>Puzzle ready!</p><p>Choose another puzzle or choose a solver.</p>',
    //     'backtrack': '<p>Solved with backtracking.</p>',
    //     'backtrackPlusAC3': '<p>Solved with AC-3 during backtracking.</p>',
    //     'finalAC3': '<p>Solving with AC-3: final solution for box.</p>',
    //     'AC3': '<p>Solving with AC-3.</p>',
    //     'none': '<p>none</p>',
    //     '': '<p>unknown</p>',
    //     'empty': '<p>empty</p>',
    //     'undobacktrack': '<p>Undoing square that was solved with backtracking.</p>',
    //     'undobacktrackPlusAC3': '<p>Undoing square that was solved with AC-3 during backtracking.</p>',
    //     'undofinalAC3': '<p>Undoing square that was solved with AC-3.</p>',
    //     'undoAC3': '<p>Undoing square that was solved with AC-3.</p>'
    // }

    // if (!(messages.hasOwnProperty(boxStyle))) {
    //     let msg = "boxStyle " + boxStyle + " not defined";
    //     throw msg;
    // }

    // // Also, indicate in the explanation text what is happening
    // let explanation = document.querySelector(`.explanation`);
    // explanation.innerHTML = messages[boxStyle];
    return;

}


/**
 * Populate a Sudoku board graphic square based on given row and col
 * @param {number} irow 
 * @param {number} icol
 * @param {number} value 
 * @param {String} boxStyle 
 * @throws error if bad value given for style of sudoku box
 */
export function populateSquare(irow, icol, value, boxStyle='none') { 

    // Allowed values for modifiable cell properties
    let explanationMsg;
    let allowedBoxStyles = ['empty', 'fixed', 'backtrack', 'AC3', 'backtrackPlusAC3', 'finalAC3', 'domain'];
    let allowedValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // If the value is outside the range, throw error
    if (!(value in allowedValues)) {
        let msg = "Bad value in square at " + irow + ", " + icol + ": " + value;
        throw msg;
    } 
    
    // The Sudoku cell at irow, icol
    console.log(irow, icol, value);
    let box = document.querySelector(`.row-${irow} .col-${icol}`);

    // Catch if box is null
    if (!(box)) {
        console.warn(`Element with selector .row-${irow} .col-${icol} not found.`);
        return
    }

    // If this box has already been set to fixed, we should not be changing it
    if (box.classList.contains("fixed")) {
        return;
    }

    // Clear out all box style classes
    for (let thisStyle of allowedBoxStyles) {
        box.classList.remove(thisStyle);
    }

    // Add the input box style class. If it is not an allowed value, use default
    if (allowedBoxStyles.indexOf(boxStyle) !== -1) {
        box.classList.add(boxStyle);
    }

    // Put the number in the box, unless it is zero, then keep empty
    if (value === 0) {
        box.innerHTML = '';
    }
    else  {
        box.innerHTML = String(value);
    }

    let messages = {
        'fixed': '<p>Puzzle ready!</p><p>Choose another puzzle or choose a solver.</p>',
        'backtrack': '<p>Solved with backtracking.</p>',
        'backtrackPlusAC3': '<p>Solved with AC-3 during backtracking.</p>',
        'finalAC3': '<p>Solving with AC-3: final solution for box.</p>',
        'AC3': '<p>Solving with AC-3.</p>',
        'none': '<p>none</p>',
        '': '<p>unknown</p>',
        'empty': '<p>empty</p>',
        'undobacktrack': '<p>Undoing square that was solved with backtracking.</p>',
        'undobacktrackPlusAC3': '<p>Undoing square that was solved with AC-3 during backtracking.</p>',
        'undofinalAC3': '<p>Undoing square that was solved with AC-3.</p>',
        'undoAC3': '<p>Undoing square that was solved with AC-3.</p>'
    }

    if (!(messages.hasOwnProperty(boxStyle))) {
        let msg = "boxStyle " + boxStyle + " not defined";
        throw msg;
    }

    // Also, indicate in the explanation text what is happening
    let explanation = document.querySelector(`.explanation`);
    explanation.innerHTML = messages[boxStyle];

    return;
}


/**
 * Get the grid for the board up to a certain point (location) in the list of moves,
 * from a starting grid.
 * @param {array} grid  Array of arrays of the values on the sudoku board
 * @param {array} moves  Array of arrays of moves: [row, col, value, string]
 * @param {number} location  The index to the location in the list of moves
 * @param {boolean} outlined  True if there is an outline around moves[location+1]
 * @return grid
*/
export function updateGridFromMoves(grid, moves, location, outlined) {
    let nrows = grid.length;
    let ncols = grid[0].length;
    let newgrid = new Array(nrows); 
    let solverMethod = new Array(nrows);
    let move;

    // If we are at end of puzzle, there is nothing to do, so return
    if (location >= moves.length-1) {
        location = moves.length-1;
        //return;
    }

    let lastmove = moves[location+1];

    //TODO: If any square is outlined, remove the outline
    if (outlined) {
        removeboxborder(lastmove[0], lastmove[1], lastmove[2]);
    }
    
    // Copy grid
    for (let i=0; i<nrows; i++) {
        newgrid[i] = new Array(ncols); 
        solverMethod[i] = new Array(ncols); 
        for (let j=0; j<ncols; j++) {
            let val = grid[i][j];
            if (val > 0) {
                solverMethod[i][j] = 'fixed';
            }
            else {
                solverMethod[i][j] = '';
            }
            newgrid[i][j] = val;
        }
    };

    // Create grid of final moves at location
    for (let iloc=0; iloc<location; iloc++) {
        // Go through all the moves and get each
        // then set the value in newgrid and
        // the method in solverMethod
        move = moves[iloc];  // row, column, value
        newgrid[move[0]][move[1]] = move[2];
        solverMethod[move[0]][move[1]] = move[3]; 
    };


    // If we are in step mode, the very next move is the one we are undoing
    // If in rewind, this is done by blocks and so does not apply
    move = moves[location];  // row, column, value
    solverMethod[move[0]][move[1]] = move[3]; 
    

    // Put all values into the display grid
    for (let i=0; i<nrows; i++){
        for (let j=0; j<ncols; j++){
            let cell = document.querySelector(`.row-${i} .col-${j}`);
            if (cell) {
                cell.textContent = grid[i][j] !== 0 ? grid[i][j] : '';
                cell.classList.toggle('empty', grid[i][j] === 0);
                cell.classList.toggle('filled', grid[i][j] !== 0);
            }

            // TODO: Why doesn't this work here?
            // populateSquare(i, j, newgrid[i][j], solverMethod[i][j]);
        }
    };

    
    // // Put the last square on again, so its message will show up
    // populateSquare(move[0], move[1], 0, "undo"+move[3]);

    return newgrid;
}