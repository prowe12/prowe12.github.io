

/**
 * Populate the Sudoku board graphic with the values from grid
 * This should only be done when a new puzzle is selected, not during
 * game play or when the solver is working.
 * @param {array} grid 
 */
 function populateBoard(grid){
    //TODO: dimensions right?
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
 * Populate a Sudoku board graphic square based on given row and col
 * @param {number} row 
 * @param {number} col 
 * @param {number} value 
 */
 function populateSquare(irow, icol, value, boxStyle='empty') { //numberColor='black', numberFontWeight='', borderColor=''){

    // Allowed values for modifiable cell properties
    // let allowedNumberColors = ['black', 'red', 'orange', 'green', 'blue'];
    // let allowedBorderColors = ['black', 'red', 'orange', 'green', 'blue'];
    // let allowedNumberFontWeights = ['bold', 'normal'];
    let allowedBoxStyles = ['empty', 'fixed', 'final', 'backtrack'];
    let allowedValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // If the value is outside the range, throw error
    if (!(value in allowedValues)) {
        throw "Bad value for Sudoku square";
    } 
    
    // The Sudoku cell at irow, icol
    let box = document.querySelector(`.row-${irow} .col-${icol}`);

    // If this box has already been set to fixed, we should not be changing it
    if (box.className.indexOf("fixed") !== -1) {
        console.log(`Skipping fixed square at ${irow}, ${icol}.`);
        return;
    }

    // Clear out all box style classes
    for (let thisStyle of allowedBoxStyles) {
        box.classList.remove(thisStyle);
    }

    // Add the input box style class
    //if (allowedBoxStyles.includes(boxStyle)) {
    if (allowedBoxStyles.indexOf(boxStyle) !== -1) {
            box.classList.add(boxStyle);
    }
    else {
        alert("Bad value for style of Sudoku box");
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

