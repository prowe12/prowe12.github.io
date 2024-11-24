// // @ts-check

// /**
//  * Populate the Sudoku board graphic with the values from grid
//  * This should only be done when a new puzzle is selected, not during
//  * game play or when the solver is working.
//  * @param {array} grid 
//  */
// export function populateBoard(grid){
//     let nrows = grid.length;
//     let ncols = grid[0].length;

//     // Put all non-zero values into the grid
//     for (let i=0; i<nrows; i++){
//         for (let j=0; j<ncols; j++){
//             // initializeSquare(i, j);
//             if (grid[i][j] > 0) {
//                 populateSquare(i, j, grid[i][j], 'fixed');
//             }
//         }
//     }
// }

   
// /**
//  * Add an outline around a box in the board display
//  * @param {number} irow 
//  * @param {number} icol
//  * @param {String} boxStyle 
//  */
// export function boxborder(irow, icol, boxStyle='empty') { 
//     // Get the sudoku box at the row and column and draw a border
//     let box = document.querySelector(`.row-${irow} .col-${icol}`);
//     box.classList.add("boxborder");
// }


// /**
//  * Remove the outline around a box in the board display
//  * @param {number} irow 
//  * @param {number} icol
//  * @param {String} boxStyle 
//  */
// export function removeboxborder(irow, icol, boxStyle='empty') { 
//     // Get the sudoku box at the row and column and draw a border
//     let box = document.querySelector(`.row-${irow} .col-${icol}`);
//     box.classList.remove("boxborder");
// }


// /**
//  * Populate a Sudoku board graphic square based on given row and col
//  * @param {number} irow 
//  * @param {number} icol
//  */
//     export function initializeSquare(irow, icol) { 
//         // console.log(`Initializing square at row ${irow}, col ${icol}`);
        
//         // Ensure the row exists
//         let row = document.querySelector(`.row-${irow}`);
//         if (!row) {
//             row = document.createElement('div');
//             row.classList.add(`row-${irow}`);
//             let gridContainer = document.getElementById('grid-container-puzzle');
//             if (gridContainer) {
//                 gridContainer.appendChild(row);
//             } else {
//                 console.warn('Grid container element not found.');
//                 return;
//             }
//         }
    
//         // Create the column element
//         let box = document.createElement('div');
//         box.classList.add(`col-${icol}`);
//         box.classList.add('empty');
//         box.innerHTML = '';
    
//         // Append the column element to the row
//         row.appendChild(box);
    
//         // Query the element again to verify it exists
//         let box2 = document.querySelector(`.row-${irow} .col-${icol}`);

   
//     // TODO: set the message
//     // let messages = {
//     //     'fixed': '<p>Puzzle ready!</p><p>Choose another puzzle or choose a solver.</p>',
//     //     'backtrack': '<p>Solved with backtracking.</p>',
//     //     'backtrackPlusAC3': '<p>Solved with AC-3 during backtracking.</p>',
//     //     'finalAC3': '<p>Solving with AC-3: final solution for box.</p>',
//     //     'AC3': '<p>Solving with AC-3.</p>',
//     //     'none': '<p>none</p>',
//     //     '': '<p>unknown</p>',
//     //     'empty': '<p>empty</p>',
//     //     'undobacktrack': '<p>Undoing square that was solved with backtracking.</p>',
//     //     'undobacktrackPlusAC3': '<p>Undoing square that was solved with AC-3 during backtracking.</p>',
//     //     'undofinalAC3': '<p>Undoing square that was solved with AC-3.</p>',
//     //     'undoAC3': '<p>Undoing square that was solved with AC-3.</p>'
//     // }

//     // if (!(messages.hasOwnProperty(boxStyle))) {
//     //     let msg = "boxStyle " + boxStyle + " not defined";
//     //     throw msg;
//     // }

//     // // Also, indicate in the explanation text what is happening
//     // let explanation = document.querySelector(`.explanation`);
//     // explanation.innerHTML = messages[boxStyle];
//     return;

// }


// /**
//  * Populate a Sudoku board graphic square based on given row and col
//  * @param {number} irow 
//  * @param {number} icol
//  * @param {number} value 
//  * @param {String} boxStyle 
//  * @throws error if bad value given for style of sudoku box
//  */
// export function populateSquare(irow, icol, value, boxStyle='none') { 
//     // Allowed values for modifiable cell properties
//     let explanationMsg;
//     let allowedBoxStyles = ['empty', 'fixed', 'backtrack', 'AC3', 'backtrackPlusAC3', 'finalAC3', 'domain'];
//     let allowedValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

//     // If the value is outside the range, throw error
//     if (!(value in allowedValues)) {
//         let msg = "Bad value in square at " + irow + ", " + icol + ": " + value;
//         throw msg;
//     } 
    
//     // The Sudoku cell at irow, icol
//     let box = document.querySelector(`.row-${irow} .col-${icol}`);

//     // Catch if box is null
//     if (!(box)) {
//         console.warn(`Element with selector .row-${irow} .col-${icol} not found.`);
//     }

//     if (box) {
//     // If this box has already been set to fixed, we should not be changing it
//     if (box.className.indexOf("fixed") !== -1) {
//         return;
//     }

//     // Clear out all box style classes
//     for (let thisStyle of allowedBoxStyles) {
//         box.classList.remove(thisStyle);
//     }

//     // Add the input box style class. If it is not an allowed value, use default
//     if (allowedBoxStyles.indexOf(boxStyle) !== -1) {
//         box.classList.add(boxStyle);
//     }

//     // Put the number in the box, unless it is zero, then keep empty
//     if (value === 0) {
//         box.innerHTML = '';
//     }
//     else  {
//         box.innerHTML = String(value);
//     }
//     }

//     let messages = {
//         'fixed': '<p>Puzzle ready!</p><p>Choose another puzzle or choose a solver.</p>',
//         'backtrack': '<p>Solved with backtracking.</p>',
//         'backtrackPlusAC3': '<p>Solved with AC-3 during backtracking.</p>',
//         'finalAC3': '<p>Solving with AC-3: final solution for box.</p>',
//         'AC3': '<p>Solving with AC-3.</p>',
//         'none': '<p>none</p>',
//         '': '<p>unknown</p>',
//         'empty': '<p>empty</p>',
//         'undobacktrack': '<p>Undoing square that was solved with backtracking.</p>',
//         'undobacktrackPlusAC3': '<p>Undoing square that was solved with AC-3 during backtracking.</p>',
//         'undofinalAC3': '<p>Undoing square that was solved with AC-3.</p>',
//         'undoAC3': '<p>Undoing square that was solved with AC-3.</p>'
//     }

//     if (!(messages.hasOwnProperty(boxStyle))) {
//         let msg = "boxStyle " + boxStyle + " not defined";
//         throw msg;
//     }

//     // Also, indicate in the explanation text what is happening
//     let explanation = document.querySelector(`.explanation`);
//     explanation.innerHTML = messages[boxStyle];
//     return;

// }


// /**
//  * Get the grid for the board up to a certain point (location) in the list of moves,
//  * from a starting grid.
//  * @param {array} grid  Array of arrays of the values on the sudoku board
//  * @param {array} moves  Array of arrays of moves: [row, col, value, string]
//  * @param {number} location  The index to the location in the list of moves
//  * @param {boolean} outlined  True if there is an outline around moves[location+1]
//  * @return grid
// */
// export function updateGridFromMoves(grid, moves, location, outlined) {
//     let nrows = grid.length;
//     let ncols = grid[0].length;
//     let newgrid = new Array(nrows); 
//     let solverMethod = new Array(nrows);
//     let move;

//     // If we are at end of puzzle, there is nothing to do, so return
//     if (location >= moves.length-1) {
//         location = moves.length-1;
//         //return;
//     }

//     let lastmove = moves[location+1];

//     //TODO: If any square is outlined, remove the outline
//     if (outlined) {
//         removeboxborder(lastmove[0], lastmove[1], lastmove[2]);
//     }
    
//     // Create empty grid (grid of zeros)
//     for (let i=0; i<nrows; i++) {
//         newgrid[i] = new Array(ncols); 
//         solverMethod[i] = new Array(ncols); 
//         for (let j=0; j<ncols; j++) {
//             let val = grid[i][j];
//             if (val > 0) {
//                 solverMethod[i][j] = 'fixed';
//             }
//             else {
//                 solverMethod[i][j] = '';
//             }
//             newgrid[i][j] = val;
//         }
//     };

//     // Create grid of final moves at location
//     for (let iloc=0; iloc<location; iloc++) {
//         // Go through all the moves and get each
//         // then set the value in newgrid and
//         // the method in solverMethod
//         move = moves[iloc];  // row, column, value
//         newgrid[move[0]][move[1]] = move[2];
//         solverMethod[move[0]][move[1]] = move[3]; 
//     };

//     // If we are in step mode, the very next move is the one we are undoing
//     // If in rewind, this is done by blocks and so does not apply
//     move = moves[location];  // row, column, value
//     solverMethod[move[0]][move[1]] = move[3]; 
    

//     // Put all values into the display grid
//     for (let i=0; i<nrows; i++){
//         for (let j=0; j<ncols; j++){
//             populateSquare(i, j, newgrid[i][j], solverMethod[i][j]);
//         }
//     };

    
//     // Put the last square on again, so its message will show up
//     populateSquare(move[0], move[1], 0, "undo"+move[3]);

//     return newgrid;
// }
