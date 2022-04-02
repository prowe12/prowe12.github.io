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
function loadStartingValues(puzzle='easy'){
    let grid;

    if (puzzle === 'random') {
        let puzzleTypes = ['easy', 'medium', 'hard', 'evil'];
        randint = Math.floor(puzzleTypes.length * Math.random());
        puzzle = puzzleTypes[randint];
     }

    //TODO: Add all the puzzles here
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
        // grid = [[5, 3, 0, 0, 7, 0, 0, 0, 0], 
        //         [6, 0, 0, 1, 9, 5, 0, 0, 0], 
        //         [0, 9, 8, 0, 0, 0, 0, 6, 0], 
        //         [8, 0, 0, 0, 6, 0, 0, 0, 3], 
        //         [4, 0, 0, 8, 0, 3, 0, 0, 1], 
        //         [7, 0, 0, 0, 2, 0, 0, 0, 6], 
        //         [0, 6, 0, 0, 0, 0, 2, 8, 0], 
        //         [0, 0, 0, 4, 1, 9, 6, 3, 5], 
        //         [0, 0, 0, 2, 8, 6, 1, 7, 9]];
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



/*****************************************************
    EVENTS TRIGGERED WHEN THE DOM IS FINISHED LOADING
******************************************************/

// Global variables
var puzzleType = document.getElementById("dropdownpuzzle").value;
var originalgrid = loadStartingValues(puzzleType);
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

    // The original grid will be in the global scope - actually it seems it is not deepcopied
    // and is therefore written over?
    originalgrid = loadStartingValues(puzzleType);

    // Clear the Sudoku board and populate with the values from the selected puzzle
    imove = 0;
    moves = [];
    makeEmptyGrid(9, 9);
    populateBoard(originalgrid);
});


// Solver demo for backtracking
document.querySelector("#solverDemoBacktrack").addEventListener("click", function() {

    // Reset the grid and the index to moves, and the control values (all globals)
    reset();

    // Solve the board using backtracking alone, using backtrack, in backtrack.js
    let result = backtracker(originalgrid, populateSquare);

    let msg = result[0];
    moves = result[1];
});


// Solver demo for backtracking + AC-3
// TODO: The evil puzzle, and maybe all puzzles, is giving the wrong answer 
// (e.g. there are a lot of ones). Remember this was seen before. Perhaps it was
// fixed in the main version? Compare codes to find out. Or perhaps it was
// correct here before making all the changes to save the moves -
// copy this code to a temporary directory and undo all the changes in this branch
// to find out (then copy the temp dir code back in, fix the problem, and commit)
document.querySelector("#playSudokuSolver").addEventListener("click", function() {
    // Reset the grid and the index to moves, and the control values (all globals)
    reset();

    // Solve the board using AC-3 + backtracking, using solve, in solver.js
    // return an array with a message regarding whether the solver was successful
    // as well as the moves.
    // The moves array has an array for each move, containing the:
    // row, column, value, and method used to get the value
    let result = solve(originalgrid);

    let msg = result[0];
    moves = result[1];
    
});

function reset() {
    clearInterval(timeId);
    delay = 1000;
    imove = 0;
    originalgrid = loadStartingValues(puzzleType);
    makeEmptyGrid(9, 9);
    populateBoard(originalgrid);
}


// Globals
//TODO: Do these all have to be globals?
var rewindToBegButton = document.getElementById("rewindToBeg");
var rewindButton = document.getElementById("rewind");
var playButton = document.getElementById("playButton");
var pauseButton = document.getElementById("pauseButton");
var fastForwardButton = document.getElementById("fastForward");
var forwardToEndButton = document.getElementById("forwardToEnd");
let moves = [];
let timeId;
let pause = true;
let imove = 0;
let delay = 1000;


// Event listener for the play button
//TODO: If you click play twice, it won't pause anymore.
playButton.addEventListener("click", function() {
    // Start play using the current delay;
    timeId = setInterval(populator, delay);
});

populator = function()  {
    if (imove < moves.length) {
        populateSquare(moves[imove][0], moves[imove][1], moves[imove][2], moves[imove][3]);
        imove++;
    }
    else {
        clearInterval(setInterval);
    };
};

// Event listener for the pause button
pauseButton.addEventListener("click", function() {
    // Pause   
    clearInterval(timeId);
});

// Event listener for the fast forward button >>
fastForwardButton.addEventListener("click", function() {
    // Stop play, decrease the delay, and restart play
    clearInterval(timeId);
    delay /= 10;
    timeId = setInterval(populator, delay);
});

// Event listener for the rewind button <<
rewindButton.addEventListener("click", function() {
    // Stop play, increase the delay, and restart play
    clearInterval(timeId);
    delay *= 10;
    timeId = setInterval(populator, delay);
});

// Event listener for the forward to end button >>|
forwardToEndButton.addEventListener("click", function() {
    for (imove=imove; imove<moves.length; imove++) {
        populateSquare(moves[imove][0], moves[imove][1], moves[imove][2], moves[imove][3]);
    }
});

// Event listener for the rewind to beginning button |<<
rewindToBegButton.addEventListener("click", function() {
    // Stop play
    clearInterval(timeId);
    // Reset the grid, the index to moves, and the control values (all globals)
    reset();
});



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

