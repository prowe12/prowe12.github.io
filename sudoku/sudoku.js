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


/*****************************************************
    FUNCTIONS
******************************************************/

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

/**
 * Reset the board and the state of play (i.e. filling in the board) to the beginning
 */
 function playReset() {
    // Reset the state of play
    clearInterval(timeId);
    delay = 1000;
    imove = 0;
    running = false;
}

/**
 * Reset the board, but do not clear timers or alter the state of play
 */
 function boardReset() {
    originalgrid = loadStartingValues(puzzleType);
    makeEmptyGrid(9, 9);
    populateBoard(originalgrid);
 }


 /**
 * Populate a box of the board and move the pointer to the next box.
 * If at the final move, quit playback
 */
populator = function()  {
    if (imove < moves.length) {
        populateSquare(moves[imove][0], moves[imove][1], moves[imove][2], moves[imove][3]);
        imove++;
    }
    else {
        clearInterval(timerId);
        //TODO ???: running = false;
    };
};



/**
 * Get the step size for rewinding, depending on the delay
 * @param {*} imove 
 * @returns 
 */
function stepSizeForRewind(imove, delay) {

    let deltai = 1;              // slow: 1 step back

    if (delay <= 0) {            // fastest: 10 steps to location
        deltai = Math.round(imove/10);
    }
    else if (delay <= 10) {      // fast: 100 steps to location
        deltai = Math.round(imove/100);
    }
    else if (delay <= 100) {     // medium: 1000 steps to location
        deltai = Math.round(imove/1000);
    }

    // Do not allow deltai < 1
    if (deltai < 1) {
        deltai = 1;
    }

    return deltai;
}


/**
 * Repopulate the board back the given location (movement number)
 * 
 * The play timeline, where
 *   imove: current location
 *   location: the final location after rewind is complete
 *   jump:  the movement for one rewinding step, which depends on the delay 
 *   |-------------------|--------|-----------|
 *   0               location    imove     moves.length
 *                          
 * 
 * @param location  The location to rewind back to
 */
rewindToMove = function(location)  {

    if (location > imove) {
        throw "Rewinding, so new location must be before current";
    }
    else if (location === imove) {
        throw "Rewinding, but new location is same as current";
    }

    // Build the board at the desired location and display it
    updateGridFromMoves(originalgrid, moves, location);
    
    return;
};


/**
 * Increment the delay from large (slow) to 0 (no delay=>fastest possible speed)
 * @param {*} delay The delay for filling in boxes in the puzzle
 * @returns  The delay for filling in boxes in the puzzle
 */
function incrementDelay(delay, buttonType) {
    let forwardText;
    let rewindText;


    // There are 4 speeds: slow (1000), medium (100), fast (10), fastest (0)
    // bump up to the next speed (periodic boundary conditions) 
    if (delay <= 0) {          // fastest -> slow
        delay = 1000;
        rewindText = '<<'
        forwardText = '>>'
    }
    else if (delay <= 10) {    // fast -> fastest
        delay = 0;
        rewindText = '<'
        forwardText = '>'
    }
    else if (delay <= 100) {   // medium -> fast
        delay = 10;
        rewindText = '<<<<'
        forwardText = '>>>>'
    }
    else if (delay > 100) {   // slow -> medium
        delay = 100;
        rewindText = '<<<'
        forwardText = '>>>'
    }

    if (buttonType === 'rewind') {
        delayText = rewindText;
    }
    else {
        delayText = forwardText;
    };

    return [delay, delayText];
 }




/*****************************************************
    EVENTS TRIGGERED WHEN THE DOM IS FINISHED LOADING
******************************************************/

// Global variables
//TODO: Do these all have to be globals?
var puzzleType = document.getElementById("dropdownpuzzle").value;
var originalgrid = loadStartingValues(puzzleType);

var rewindToBegButton = document.getElementById("rewindToBeg");
var rewindButton = document.getElementById("rewind");
var playButton = document.getElementById("playPause");
var fastForwardButton = document.getElementById("fastForward");
var forwardToEndButton = document.getElementById("forwardToEnd");
var stepButton = document.getElementById("step");
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
//var pauseButton = document.getElementById("pauseButton");

let moves = [];
let timeId;
let imove = 0;
let running = false;
let delay = 1000;           // default delay


// Set up the default grid after the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    makeEmptyGrid(9, 9);
    populateBoard(originalgrid);

    // Start with controls disabled, since the user needs to choose a method
    stepButton.disabled = true;
    playButton.disabled = true;
    fastForwardButton.disabled = true;
    rewindButton.disabled = true;
    forwardToEndButton.disabled = true;
    rewindToBegButton.disabled = true;
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

    // Start with controls disabled, since the user needs to choose a method
    stepButton.disabled = true;
    playButton.disabled = true;
    fastForwardButton.disabled = true;
    rewindButton.disabled = true;
    forwardToEndButton.disabled = true;
    rewindToBegButton.disabled = true;
    
});


// Solver demo for backtracking
document.querySelector("#solverDemoBacktrack").addEventListener("click", function() {

    // Reset the state of play and the board
    playReset();
    boardReset();   

    // Print a message while we wait for the solver
    let explanation = document.querySelector(`.explanation`);
    explanation.innerHTML = "<p>You have chosen backtracking.</p><p>Please wait while I solve the puzzle.</p>";
    
    // Solve the board using backtracking alone, using backtrack, in backtrack.js
    let result = backtracker(originalgrid);
    finalgrid = originalgrid;

    let msg = result[0];
    moves = result[1];

    // We wrote over the original grid, so recreate it
    originalgrid = loadStartingValues(puzzleType);

    // Enable the controls
    stepButton.disabled = false;
    playButton.disabled = false;
    fastForwardButton.disabled = false;
    rewindButton.disabled = false;
    forwardToEndButton.disabled = false;
    rewindToBegButton.disabled = false;

    // Write the message saying it's been solved
    explanation.innerHTML = "<p>I have solved the puzzle using backtracking.</p><p>Use the controls to play the solution.</p>";

    
});


// Solver demo for backtracking + AC-3
// TODO: The evil puzzle, and maybe all puzzles, is giving the wrong answer 
// (e.g. there are a lot of ones). Remember this was seen before. Perhaps it was
// fixed in the main version? Compare codes to find out. Or perhaps it was
// correct here before making all the changes to save the moves -
// copy this code to a temporary directory and undo all the changes in this branch
// to find out (then copy the temp dir code back in, fix the problem, and commit)
document.querySelector("#playSudokuSolver").addEventListener("click", function() {
    // Reset the state of play and the board
    playReset();
    boardReset();   

    // Print a message while we wait for the solver
    let explanation = document.querySelector(`.explanation`);
    explanation.innerHTML = "<p>You have chosen backtracking.</p><p>Please wait while I solve the puzzle.</p>";

    // Solve the board using AC-3 + backtracking, using solve, in solver.js
    // return an array with a message regarding whether the solver was successful
    // as well as the moves.
    // The moves array has an array for each move, containing the:
    // row, column, value, and method used to get the value
    let result = solve(originalgrid);

    let msg = result[0];
    moves = result[1];

    // We wrote over the original grid, so recreate it
    originalgrid = loadStartingValues(puzzleType);

    // Enable the controls
    stepButton.disabled = false;
    playButton.disabled = false;
    fastForwardButton.disabled = false;
    rewindButton.disabled = false;
    forwardToEndButton.disabled = false;
    rewindToBegButton.disabled = false;
    
    // Write the message saying it's been solved
    explanation.innerHTML = "<p>I have solved the puzzle using AC-3 and backtracking.</p><p>Use the controls to play the solution.</p>";
});


// Event listener for the play button
//TODO: If you click play twice, it won't pause anymore.
playButton.addEventListener("click", function() {

    if (imove === moves.length) {
        // Nothing to do, so return
        return;
    }

    if (!(running)) {
        // Start play using the current delay;
        timeId = setInterval(populator, delay);
        running = true;
        // Change button text to "Pause"
        playPause = document.getElementById("playPause");
        playPause.innerText = "Pause";
    }
    else {
        // Pause   
        clearInterval(timeId);
        running = false;  
        // Change button text to "Play"
        playPause = document.getElementById("playPause");
        playPause.innerText = "Play";
              
    }
});


// Event listener for the step button, which fills in the next box only
stepButton.addEventListener("click", function() {
    running = false;

    // Stop play, decrease the delay, and fill in the next box
    clearInterval(timeId);
    populator();
});


// Event listener for the fast forward button >>
// Stop play, change the delay, and restart play
fastForwardButton.addEventListener("click", function() {
    running = true;

    // Change play button text to "Pause"
    playPause = document.getElementById("playPause");
    playPause.innerText = "Pause";
    
    // Stop play
    clearInterval(timeId);

    // Increment the delay
    [delay, delayText] = incrementDelay(delay, "fastforward");
    
    // Change button text to delayTest
    fastForward = document.getElementById("fastForward");
    fastForward.innerText = delayText;

    // Restart play at the new speed
    timeId = setInterval(populator, delay);

});


// Event listener for the forward to end button >>|
forwardToEndButton.addEventListener("click", function() {
    running = true;
    // Stop play if any
    clearInterval(timeId);

    // Fill in board to end;
    running = true;
    for (imove=imove; imove<moves.length; imove++) {
        populateSquare(moves[imove][0], moves[imove][1], moves[imove][2], moves[imove][3]);
    }

    // Set play/pause button to display "Play"
    playPause.innerText = "Play";
    running = false;
});


// Event listener for the rewind button <<
// Rewind is tricky. We cannot undo the last move, because we don't know what was in
// the square before the last move occurred. So instead we have to redo all moves up to
// that point
rewindButton.addEventListener("click", function() {
    running = true;

    // Stop play or rewind
    clearInterval(timeId);

    if (imove === 0) {
        // Nothing to do, so return
        return;
    }

    // While running in rewind, Pause will be enabled
    playPause.innerText = "Pause";

    //TODO: Only increment the delay if this button is active
    // Increment the delay
    delay = incrementDelay(delay, 'rewind');

    // Set the rewind step size, because redrawing the board for all moves every step is very slow
    let deltai = stepSizeForRewind(imove, delay);

    /**
     * Depopulate the board, replaying to imove and then moving imove back a box.
     * Stop after the 0th move (the beginning board)
     */
    depopulator = function()  {
        if (imove > 0) {
            rewindToMove(Math.max(imove - deltai, 0));
            imove -= deltai;
        }
        else {
            clearInterval(timeId);
            imove = 0;
            // Since it is stopped, Play is enabled
            running = false;
            playPause.innerText = "Play";
        };
    };

    // Rewind at current delay;
    timeId = setInterval(depopulator, delay);
    return;
 });


// Event listener for the rewind to beginning button |<<
rewindToBegButton.addEventListener("click", function() {
    running = true;

    // Stop play, reset the grid, index to moves, and control values (all globals)
    playReset();
    boardReset();

    running = false;
});



// Event listener for the pause button
// pauseButton.addEventListener("click", function() {
//     // Pause   
//     clearInterval(timeId);
// });


// // Function for play/pause button
// function playpause() {
//     // Find out the status of the play/pause button
//     ppbutton = getElementById("playButton");
//     if (ppbutton.play) {
//         // Play invoked, switch to pause option
//     }
//     else {
//         // Pause invoked, switch to play option
//     }
// }

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

