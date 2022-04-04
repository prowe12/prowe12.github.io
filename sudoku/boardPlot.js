

/**
 * Populate the Sudoku board graphic with the values from grid
 * This should only be done when a new puzzle is selected, not during
 * game play or when the solver is working.
 * @param {array} grid 
 */
 function populateBoard(grid){
    nrows = grid.length;
    ncols = grid[0].length;

    // Put all non-zero values into the grid
    for (i=0; i<nrows; i++){
        for (j=0; j<ncols; j++){
            if (grid[i][j] > 0) {
                populateSquare(i, j, grid[i][j], 'fixed');    //'black', 'bold');
            }
        }
    }
}


/**
 * Populate the Sudoku board graphic with the values from grid
 * This should only be done when a new puzzle is selected, not during
 * game play or when the solver is working.
 * @param {array} grid 
 */
 function updateBoard(board){
    nrows = board.length;
    ncols = board[0].length;

    grid = getGrid(board);

    // Put all non-zero values into the grid
    for (i=0; i<nrows; i++){
        for (j=0; j<ncols; j++){
            if (!(board[i][j].fixed)) {
                populateSquare(i, j, grid[i][j], 'backtrack');    //'black', 'bold');
            }
        }
    }

}


/**
 * Populate a Sudoku board graphic square based on given row and col
 * @param {number} row 
 * @param {number} col 
 * @param {number} value 
 * @throws error if bad value given for style of sudoku box
 */
 function populateSquare(irow, icol, value, boxStyle='empty') { 
     
    // Allowed values for modifiable cell properties
    let allowedBoxStyles = ['empty', 'fixed', 'final', 'backtrack', 'ac3'];
    let allowedValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // If the value is outside the range, throw error
    if (!(value in allowedValues)) {
        console.log("Bad value in square at " + irow + ", " + icol + ": " + value);
        throw "Bad value for Sudoku square";
    } 
    
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
    if (allowedBoxStyles.indexOf(boxStyle) !== -1) {
            box.classList.add(boxStyle);
    }

    // Put the number in the box, unless it is zero, then keep empty
    if (value === 0) {
        box.innerHTML = '';
    }
    else  {
        box.innerHTML = value;
    }

    // Set the color of the number in the cell, if color specified is allowed.
    // Otherwise, throw an error
    // if (allowedNumberColors.indexOf(numberColor) !== -1){
    //     box.style.setProperty("color", numberColor);
    // }
    // else {
    //     // TODO: throw an exception
    //     console.log("Bad color choice!");
    // }

    // Set the style of the number in the cell, if it is allowed.
    //if (allowedNumberFontWeights.includes(numberFontWeight)) {
    //    box.style.setProperty("fontWeight", numberFontWeight);
    //}

    // Add a border, if color specified is allowed
    //if (allowedBorderColors.indexOf(borderColor) !== -1) {
    //    box.style.borderColor = borderColor; //("borderColor", "green");
    //}
    return;

}


/**
 * Get the grid for the board from a starting grid and moves
 * @param board
 * @return grid
*/
function updateGridFromMoves(grid, moves, location) {

    let nrows = grid.length;
    let ncols = grid[0].length;
    let newgrid = new Array(nrows); 

    for (i=0; i<nrows; i++) {
        newgrid[i] = new Array(ncols); 
        for (j=0; j<ncols; j++) {
            newgrid[i][j] = [0, ''];
        }
    };

    // create grid of final moves at location
    for (iloc=0; iloc<location; iloc++) {
        move = moves[iloc];
        newgrid[move[0]][move[1]] = [move[2], move[3]];
    };

    // Put all non-zero values into the grid
    for (i=0; i<nrows; i++){
        for (j=0; j<ncols; j++){
            populateSquare(i, j, newgrid[i][j][0], newgrid[i][j][1]);
        }
    };

    return;
}
