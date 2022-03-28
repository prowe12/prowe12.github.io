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

// Built-in modules
//import sys
//from os.path import exists
//from numpy import loadtxt

// Sudoku modules
//from backtrack import backtracker                      # Backtrack
//from solver import solve                               # Backtrack + AC-3
//from board_plotter import BoardPlot                    # Include graphics

// For debugging, use this instead of the above to turn off graphics
//from board_plotter import BoardPrint as BoardPlot      # No graphics

/**
 * Check if a file exists
 * @param {String} fname
 * @return  True if file exists, else false
 */
function fileExists(urlToFile) { 
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
 * @param filename  Name of puzzle file to load in
 * @return  The grid of numbers; list of lists
 * @raises  NameError  If filename is not '' and does not exist
 */
function load_starting_vals(puzzle='easy'){
    let grid;

    if (puzzle === 'random') {
        let puzzleTypes = ['easy', 'medium', 'hard', 'evil'];
        randint = Math.floor(puzzleTypes.length * Math.random());
        puzzle = puzzleTypes[randint];
     }

    //TODO: Add all the puzzles here
    if (puzzle === 'easy') {
        // grid = [[5, 3, 0, 0, 7, 0, 0, 0, 0], 
        //         [6, 0, 0, 1, 9, 5, 0, 0, 0], 
        //         [0, 9, 8, 0, 0, 0, 0, 6, 0], 
        //         [8, 0, 0, 0, 6, 0, 0, 0, 3], 
        //         [4, 0, 0, 8, 0, 3, 0, 0, 1], 
        //         [7, 0, 0, 0, 2, 0, 0, 0, 6], 
        //         [0, 6, 0, 0, 0, 0, 2, 8, 0], 
        //         [0, 0, 0, 4, 1, 9, 0, 0, 5], 
        //         [0, 0, 0, 0, 8, 0, 0, 7, 9]];
        grid = [[5, 3, 0, 0, 7, 0, 0, 0, 0], 
                [6, 7, 0, 1, 9, 5, 3, 4, 8], 
                [1, 9, 8, 3, 4, 2, 5, 6, 7], 
                [8, 5, 9, 7, 6, 1, 4, 2, 3], 
                [4, 2, 6, 8, 5, 3, 7, 9, 1], 
                [7, 1, 3, 9, 2, 4, 8, 5, 6], 
                [9, 6, 1, 5, 3, 7, 2, 8, 4], 
                [2, 8, 7, 4, 1, 9, 6, 3, 5], 
                [3, 4, 5, 2, 8, 6, 1, 7, 9]];
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
 * Test if two 2-D arrays are equal by comparing the lengths and then the
 * elements 1 by one
 * @param {array} arr1 
 * @param {array} arr2 
 * @returns 
 */
// function isArrayEqual(array1, array2) {
//     if (array1.length !== array2.length) {
//         return false;
//     }
//     // Go through row by row
//     let allEqual = true;
//     // for (i=0; i<9; i++) {
//     //     arr1 = array1[0];
//     //     arr2 = array2[0];
//     //     let isEqual = arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
//     //     allEqual = isEqual & allEqual;
//     return allEqual;
// }


/**
 * Set up the empty grid
 * @param {array} grid 
 */
 function makeEmptyGrid(nrows, ncols){
    let table = document.getElementById("sudokuGraphic");
    while (table.lastChild) {
        table.removeChild(table.lastChild);
    }
    for (i=0; i<nrows; i++){
        let row = document.createElement("tr");
        row.classList.add(`row-${i}`);
        table.appendChild(row);
        for (j=0; j<ncols; j++){
            // To let player play the game, make a input box as a child to the cell
            let col = document.createElement("td");
            col.classList.add(`col-${j}`);
            col.classList.add("sudokubox");
            row.appendChild(col);
        }
    }
}


//TODO: Make the original squares permanently black and bold
// Make sure the permanent squares can't be changed during game
// play or when the solver runs

//TODO: Add button to call solver

//TODO: Add speed buttons, pause etc
//TODO: Add button for one step at a time

//TODO: Add button for backtracking & AC-3





/*****************************************************
    EVENTS TRIGGERED WHEN THE DOM IS FINISHED LOADING
******************************************************/

// Global variables
var puzzleType = document.getElementById("dropdownpuzzle").value;
var originalgrid = load_starting_vals(puzzleType);
var speed = 1000;   // Speed of displaying results
var wait;

// Set up the default grid after the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    makeEmptyGrid(9, 9);
    populateBoard(originalgrid);
});
  


/*****************************************************
    EVENT LISTENERS FOR USER GENERATED EVENTS
******************************************************/


// Get the desired puzzle based on the drop-down menu value
document.querySelector("#dropdownpuzzle").addEventListener("change", function() {
    puzzleType = document.getElementById("dropdownpuzzle").value;

    // The original grid will be in the global scope
    originalgrid = load_starting_vals(puzzleType);

    // Clear the Sudoku board and populate with the values from the selected puzzle
    makeEmptyGrid(9, 9);
    populateBoard(originalgrid);
});


// If the solve button is clicked, solve the game
document.querySelector("#playSudokuSolver").addEventListener("click", function() {
    // TODO: allow user to choose between solve and bactrack below, via a controller

    // Solve the board using AC-3 + backtracking, using solve, in solver.js
    makeEmptyGrid(9, 9);
    let grid = solve(originalgrid);  //, boardPlot)

    // Solve the board using backtracking alone, using backtrack, in backtrack.js
    //backtracker(originalgrid, populateSquare);  //, boardPlot)

    console.log('success');
    // Clear the Sudoku board and populate with the values from the completed puzzle
    //populateBoard(grid);

});

// document.querySelector("#playSudokuSolver").addEventListener("playSolver", function() {
//     console.log("The button was pushed.")
//     document.getElementById("#playSudokuSolver").value="ON PLAY!";
// });


// Read in the file provided by the user
// document.querySelector("#read-button").addEventListener('click', function() {
//     let file = window.document.querySelector("#file-input").files[0];
//     let reader = new FileReader();
//     reader.addEventListener('load', function(e) {
//             let text = e.target.result;
//             window.document.querySelector("#file-contents").textContent = text;
//     });
//     reader.readAsText(file);
// });

