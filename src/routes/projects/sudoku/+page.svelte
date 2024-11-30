<script lang='ts'>
    import {onMount} from 'svelte';
    import { makeEmptyGrid } from './sudoku.js'
    import { loadStartingValues } from './sudoku.js'
    import { boardReset} from './sudoku.js'
    import { toggle} from './sudoku.js'
    import { getDelayFromSpeed } from './sudoku.js'
    import { showdomain } from './sudoku.js'
    import { clearDomainFromTable } from './sudoku.js'
    import { solve } from './solver.js'
    // import { runBacktrackSolver} from './sudoku.js'

    import { backtracker } from './backtrack.js'
 
    import { updateGridFromMoves } from './sudoku.js'
    import { stepSizeForRewind } from './sudoku.js'
    import { boxborder } from './sudoku.js'
    import { removeboxborder } from './sudoku.js'
    import { runForInterval } from './sudoku.js'
    import { populateSquare} from './sudoku.js'
    import { populateBoard } from './sudoku.js';

    let speed = 20;
    let method = 'backtracking';
    let moves = [];
    let timeId;
    let imove = 0;
    let running = false;
    let outlined = false;
    let stepMethodMsg = {
            'backtracking': "<p>Solving the outlined square with backtracking.</p><p>If there is more than one value in the domain, backtracking tries one, makes a note of the others, and then moves on to the next box.<p>This continues until it encounters an empty square, and then it backs up.</p><p>Click 'Step' again to keep going.",
            'ac3': "<p>Solving the outlined square with AC-3.</p><p>AC-3 solves any boxes with only one value in the domain first. After solving a box, the domains of all the boxes that depend on it are recomputed.</p><p>If all incomplete boxes have more than one value in the domain, it uses backtracking to try out a value from the domain of a square.</p>"
    }
    // Create dictionaries to hold all the possible messages for display
    let methodSpecificMsgsForDomain = {
        backtracking: "<p>Click 'Step' to see backtracking in action.</p>",
        ac3: "<p>AC-3 solves only the squares with a single value in the domain.</p><p>Click 'Step' to see AC-3 in action.</p>"
    }
    let puzzleType = 'Easy';
    let originalgrid = loadStartingValues(puzzleType);
    let currentgrid = loadStartingValues(puzzleType);

    // TODO: delete, for testing
    let isLoading = true;

    /**
    * Populate a box of the board and move the pointer to the next box.
    * If at the final move, quit playback
    * Also update the grid to the current state
    * @param {array} moves  Array of arrays of moves, where inner array is [row, col, value, string]
    */
    let populator = function(moves) {
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
    
    
    onMount(async () => {


        // Load and execute the JavaScript files in order
        // await import('./boardPlot.js');
        // await import('./getUnassignedVariable.js');
        // await import('./variable.js');
        // await import('./constraints.js');
        // await import('./backtrack.js');
        // await import('./solver.js');
        // await import('./sudoku.js'); // Calls code in solver.js
        
        // Use the imported function
        const grid = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ];

        // makeEmptyGrid(9,9);
        // populateBoard(grid);

        // Global variables
        let puzzleType = (document.getElementById("dropdownpuzzle") as HTMLSelectElement)?.value || 'easy';        
        let rewindToBegButton = document.getElementById("rewindToBeg");
        let rewindButton = document.getElementById("rewind");
        let playButton = document.getElementById("playPause");
        let forwardToEndButton = document.getElementById("forwardToEnd");
        let stepButton = document.getElementById("step");
        let stepBackButton = document.getElementById("stepBack");
        let slider = document.getElementById("myRange");
        let output = document.getElementById("demo");
        let speedSlider = document.querySelector(".slider");
        let pauseButton = document.getElementById("pauseButton");
        let sudokuSolverMethod = document.getElementById("playSudokuSolver");
        let backtrackSolverMethod = document.getElementById("solverDemoBacktrack");

        let playOrRewind = populator;

        let ANIMATION_SPEED = speedSlider.value || 12;
        let delay = 10 ** (3 - ANIMATION_SPEED / 100);           // default delay


        // // Set up the default grid after the DOM content is loaded
        // document.addEventListener("DOMContentLoaded", function () {
        //     makeEmptyGrid(9, 9);
        //     populateBoard(originalgrid);

        //     // Reset the state of play and the board
        //     playReset();
        //     boardReset();
        //     runBacktrackSolver(puzzleType);
        // });

        /*****************************************************
            EVENT LISTENERS FOR USER GENERATED EVENTS
        ******************************************************/
        // Get the desired puzzle based on the drop-down menu value
        document.querySelector("#dropdownpuzzle").addEventListener("change", function () {
            refreshControls();
            puzzleType = document.getElementById("dropdownpuzzle").value;

            // Reset the original grid and the current grid
            originalgrid = loadStartingValues(puzzleType);
            currentgrid = loadStartingValues(puzzleType);

            // Clear the Sudoku board and populate with the values from the selected puzzle
            imove = 0;
            moves = [];
            makeEmptyGrid(9, 9);
            populateBoard(originalgrid);

            // Default is Backtracking
            moves = runBacktrackSolver(puzzleType);
        });

        // Solver demo for backtracking
        document.querySelector("#solverDemoBacktrack").addEventListener("click", function () {
            method = 'backtracking';
            refreshControls();
            setupForControls(currentgrid);
            moves = runBacktrackSolver(puzzleType);
        });

        // Solver demo for backtracking + AC-3
        document.querySelector("#playSudokuSolver").addEventListener("click", function () {
            method = 'ac3';
            refreshControls();
            setupForControls(currentgrid);

            // Highlight the button for the selected solver, and put the other back to normal
            //let solverMethod = document.getElementById("playSudokuSolver");
            //solverMethod.classList.add("selectedsolver");
            sudokuSolverMethod.classList.add("selectedsolver");

            //let nonsolverMethod = document.getElementById("solverDemoBacktrack");
            //nonsolverMethod.classList.remove("selectedsolver");
            backtrackSolverMethod.classList.remove("selectedsolver");

            // Reset the state of play and the board
            playReset();
            boardReset(puzzleType);

            // Print a message while we wait for the solver
            let state = document.querySelector(".state");
            state.innerHTML = "<p>You have chosen backtracking.</p><p>Please wait while I solve the puzzle.</p>";
            let explanation = document.querySelector(".explanation");
            explanation.innerHTML = "<p></p>";

            // Solve the board using AC-3 + backtracking, using solve, in solver.js
            // return an array with a message regarding whether the solver was successful
            // as well as the moves.
            // The moves array has an array for each move, containing the:
            // row, column, value, and method used to get the value
            let grid = loadStartingValues(puzzleType);
            let result = solve(grid);
            let finalgrid = grid;

            let msg = result[0];
            moves = result[1];

            // Write the message saying it's been solved
            state.innerHTML = "<p>Solve using AC-3 and backtracking. You can: </p>1) Choose another puzzle or solver on the left. <p>2) Use the controls to play the solution.</p><p>3) Click 'Show the domain' to walk through an explanation of the solution.";
        });

        // Event listener for the slider that controls the speed of play or rewind
        speedSlider.addEventListener('click', () => {
            // The speed varies from: slowest (delay=1000), medium (100), fast (10), fastest (0)
            // The speed varies from: slowest (delay=1000) to fastest (delay=0)
            // speed = 0 => delay = 1000, or 10**(3-speed) = 1000
            // speed = 1 => delay = 100, or 10**2 = 100
            // speed = 2 => delay = 10, or 10**1 = 10
            // speed = 3 => delay = 1 (which is converted to 0)

            /* Get the new speed from the slider */
            ANIMATION_SPEED = speedSlider.value;
            delay = getDelayFromSpeed(ANIMATION_SPEED);

            if (running) {
                // If the solver animation is running, stop it
                // and restart with the new speed
                // Stop play
                clearInterval(timeId);

                // Restart play at the new speed
                timeId = runForInterval(playOrRewind, moves, delay)
            };
        });

        // Event listener for the play button
        playButton.addEventListener("click", function () {
            // Unhilight all control buttons and highlight the button of interest
            setupForControls(currentgrid);
            refreshControls();
            playButton.classList.add('selected');

            // Stop play or rewind, if in progress
            clearInterval(timeId);

            // Set to running, with explanation
            running = true;
            let state = document.querySelector(".state");
            state.innerHTML = "<p>Playing Solution.</p>";

            if (imove >= moves.length) {
                // Finished with solution
                let state = document.querySelector(".state");
                state.innerHTML = "<p>Puzzle Complete!</p><p>Continue using controls or choose a different puzzle or solver.</p>";
                let explanation = document.querySelector(".explanation");
                explanation.innerHTML = "<p></p>";
                running = false;

                // Done, so deselect the button
                playButton.classList.remove('selected');
                return;
            }

            // Get the speed from the slider, and the delay
            ANIMATION_SPEED = speedSlider.value;
            delay = getDelayFromSpeed(ANIMATION_SPEED);

            // Start play using the current delay;
            //timeId = setInterval(populator, delay);
            timeId = runForInterval(populator, moves, delay)

            // Set playOrRewind to the populator for play, so the slider can use it to control the speed
            playOrRewind = populator;
        });

        // Event listener for the rewind button <<
        // Rewind is tricky. We cannot undo the last move, because we don't know what was in
        // the square before the last move occurred. So instead we have to redo all moves up to
        // that point
        rewindButton.addEventListener("click", function () {
            console.log('rewinding');

            // Unlight all control buttons and highlight the button of interest
            setupForControls(currentgrid);
            refreshControls();
            rewindButton.classList.add("selected");

            // Stop play or rewind
            clearInterval(timeId);

            // We will be rewinding, so set running to true and print a message
            running = true;
            let state = document.querySelector(".state");
            let explanation = document.querySelector(".explanation");
            explanation.innerHTML = "<p></p>";

            // Check if we are aleady at the beginning or not and display appropriate message. Return if at beginning.
            if (imove === 0) {
                // Already at the beginning, so print message and return
                state.innerHTML = "<p>At the beginning.</p><p>Use controls to play the solution.</p><p>Or choose a different puzzle or solver.</p>";
                return;
            }
            state.innerHTML = "<p>Rewinding.</p>";

            /* Get the new speed from the slider */
            ANIMATION_SPEED = speedSlider.value;
            delay = getDelayFromSpeed(ANIMATION_SPEED);

            // Set the rewind step size, because redrawing the board for all moves every step is very slow
            let deltai = stepSizeForRewind(imove, delay);

            /**
             * Depopulate the board, replaying to imove and then moving imove back a box.
             * Stop after the 0th move (the beginning board)
             * @param {array} moves Array of array of moves, with inner array of [row, col, values, string]
             */
            let depopulator = function (moves) {
                if (imove > 0) {
                    currentgrid = rewindToMove(Math.max(imove - deltai, 0), currentgrid);
                    imove -= deltai;
                }
                else {
                    // We have rewound to the very beginning
                    clearInterval(timeId);
                    imove = 0;
                    running = false;
                    // Print a message while we wait for the solver
                    let state = document.querySelector(`.explanation`);
                    state.innerHTML = "<p>Rewound to beginning.</p><p>Continue using controls to play the solution.</p><p>Or choose a different puzzle or solver.</p>";
                    rewindButton.classList.remove("selected");
                };
            };

            // Rewind at current delay;
            timeId = runForInterval(depopulator, moves, delay);

            // Set playOrRewind to the depopulator for rewinding, so the slider can change the speed
            playOrRewind = depopulator;
        });
        

        // Event listener for the forward to end button >>|
        forwardToEndButton.addEventListener("click", async function () {

            // Stop play if any
            clearInterval(timeId);

            // Unlight all buttons and highlight the button of interest
            setupForControls(currentgrid);
            refreshControls();
            forwardToEndButton.classList.add("selected");

            // Print message that forward to end is in progress
            let state = document.querySelector(".state");
            state.innerHTML = "<p>Working on completing the puzzle. Please wait.</p>";

            running = true;

            // Fill in board to end. This can take some time, so return a promise and 
            // make the rest of the code wait until it completes.
            function fwdToEnd(): Promise<void> {
                return new Promise<void>((resolve, reject) => {
                    setTimeout(() => {
                        forwardToEndButton.classList.add("selected");
                        for (imove = imove; imove < moves.length; imove++) {
                            populateSquare(moves[imove][0], moves[imove][1], moves[imove][2], moves[imove][3]);
                        }
                        resolve();
                    }, 0);
                })
            }

            await fwdToEnd();

            // Finished with solution
            state = document.querySelector(".state");
            state.innerHTML = "<p>Puzzle Completed!</p><p>Continue using controls to play the solution.</p><p>Or choose a different puzzle or solver.</p>";
            let explanation = document.querySelector(".explanation");
            explanation.innerHTML = "<p></p>";
            running = false;
            forwardToEndButton.classList.remove("selected");

            // From rewindtobeg

        });

        /**
         * Draw a box around the next square to be populated.
         * Then populate the box and move the pointer to the next box.
         * If at the final move, quit playback
         * Also update the grid to the current state
         */
        function steppopulator() {
            if (!outlined && !(typeof moves === 'undefined') && (!(typeof imove === 'undefined')) && (!(typeof moves[imove] === 'undefined'))) {
                // Draw a box around the next square that will be populated.
                boxborder(moves[imove][0], moves[imove][1], moves[imove][3]);

                // There is an outline drawn. Next time we will not draw the outline
                outlined = true;
            }
            else {
                // The populator should remove the box
                if (outlined) {
                    removeboxborder(moves[imove][0], moves[imove][1], moves[imove][3]);
                }
                populator(moves);
                // Next time we will draw the box again
                outlined = false;
            }
        };

        /**
         * Reset the board and the state of play (i.e. filling in the board) to the beginning
         */
        function runBacktrackSolver(puzzleType) {

            // Highlight the button for the selected solver, and put the other back to normal
            let solverMethod = document.getElementById("solverDemoBacktrack");
            solverMethod.classList.add("selectedsolver");

            let nonsolverMethod = document.getElementById("playSudokuSolver");
            nonsolverMethod.classList.remove("selectedsolver");

            // Reset the state of play and the board
            playReset();
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
            let moves = result[1]; // row, column, value, method

            // Write the message saying it's been solved
            state.innerHTML = "<p><b>Suggested use</b></p><p>Use the top set of controls<br> and the speed slider to<br>move through the solution.</p>or<p></p><p>Click 'Show the domain'<br>and 'step' to step through<br>the solution.</p><br><p>Choose a new puzzle and <br>solver on the left.</p>";

            return moves
        }


        // Event listener for the rewind to beginning button |<<
        rewindToBegButton.addEventListener("click", async function () {
            // Unlight all buttons and highlight the button of interest

            setupForControls(currentgrid);
            refreshControls();
            rewindToBegButton.classList.add("selected");

            running = true;

            function rwdToBeg() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        // Stop play, reset the grid, index to moves, and control values (all globals)
                        playReset();
                        boardReset(puzzleType);
                        resolve();
                    }, 100);
                })
            }

            await rwdToBeg();

            // Back at beginning
            let state = document.querySelector(".state");
            state.innerHTML = "<p>At the beginning.</p><p>Continue using controls to play the solution.</p><p>Or choose a different puzzle or solver.</p>";
            let explanation = document.querySelector(".explanation");
            explanation.innerHTML = "<p></p>";
            running = false;
            rewindToBegButton.classList.remove("selected");
        });

        // Event listener for the pause button
        pauseButton.addEventListener("click", function () {
            running = false;
            // Unlight all buttons and highlight the button of interest
            refreshControls();
            pauseButton.classList.add("selected");

            let state = document.querySelector(".state");
            state.innerHTML = "<p>Paused.</p>"
            let explanation = document.querySelector(".explanation");
            explanation.innerHTML = "<p></p>";
            clearInterval(timeId);
        });

        // Event listener for the show domain button
        showDomainButton.addEventListener("click", function () {

            // Unhighlight all buttons
            refreshControls();

            // Toggle on/off
            let button = document.getElementById("showDomainButton");
            toggle(button);

            let state = document.querySelector(".state");
            let explanation = document.querySelector(".explanation");
            clearInterval(timeId);

            // Highlight or unhighlight the button
            if (button.value === "ON") {
                showDomainButton.classList.add("selected");
                let msg = "<p>Showing the domain of each square.</p><p>The domain consists of all the numbers 0-9 that are not already present in the same row, column, or 3x3 square." + methodSpecificMsgsForDomain[method]

                state.innerHTML = msg;
                explanation.innerHTML = "<p></p>";
                showdomain(currentgrid);
            }
            else {
                showDomainButton.classList.remove("selected");
                state.innerHTML = "<p>Removed the domain for each square.</p>"
                explanation.innerHTML = "<p></p>";
                clearDomainFromTable(currentgrid);
            }

        });

        // Event listener for the step button, which fills in the next box only
        stepButton.addEventListener("click", function () {
            // Unlight all buttons and highlight the button of interest
            refreshControls();
            stepButton.classList.add("selected");

            running = false;

            let state = document.querySelector(".state");
            state.innerHTML = stepMethodMsg[method];
            let explanation = document.querySelector(".explanation");
            explanation.innerHTML = "<p></p>";
            running = false;

            // Stop play, decrease the delay, and fill in the next box
            clearInterval(timeId);
            steppopulator();

            // unhighlight the button
            document.getElementById('step').classList.remove('selected');
            stepButton.classList.remove("selected");

            // If the show domain button is selected, update the domain shown
            let button = document.getElementById("showDomainButton");
            if (button.value === "ON") {
                showdomain(currentgrid);
            }
        });

        // Event listener for taking a single step back
        // Rewind is tricky. We cannot undo the last move, because we don't know what was in
        // the square before the last move occurred. So instead we have to redo all moves up to
        // that point
        stepBackButton.addEventListener("click", function () {

            // Unlight all control buttons and highlight the button of interest
            refreshControls();

            stepBackButton.classList.add("selected");

            // Stop play or rewind
            clearInterval(timeId);

            // We will be rewinding, so set running to true and print a message
            let state = document.querySelector(".state");
            let explanation = document.querySelector(".explanation");
            explanation.innerHTML = "<p></p>";

            // Check if we are aleady at the beginning or not and display appropriate message. Return if at beginning.
            if (imove === 0) {
                stepBack.style.setProperty("border", "none");
                // Already at the beginning, so print message and return
                state.innerHTML = "<p>At the beginning.</p><p>Use controls to play the solution.</p><p>Or choose a different puzzle or solver.</p>";
                return;
            }
            state.innerHTML = "<p>Undoing the previous step.</p>";

            let button = document.getElementById("showDomainButton");

            /**
             * Redraw board at previous move
             */
            if (imove > 0) {
                currentgrid = rewindToMove(Math.max(imove - 1, 0), currentgrid);
                // If the show domain button is selected, update the domain shown
                if (button.value === "ON") {
                    let move = moves[imove];
                    let domain = getDomain(move[0], move[1], currentgrid);
                    showdomain(currentgrid);
                }
                imove -= 1;
            }
            else {
                // We have rewound to the very beginning
                clearInterval(timeId);
                // If the show domain button is selected, update the domain shown
                if (button.value === "ON") {
                    let move = moves[imove]
                    let domain = getDomain(move[0], move[1], currentgrid)
                    showdomain(currentgrid);
                }
                imove = 0;
                running = false;
                // Print a message while we wait for the solver
                let state = document.querySelector(`.explanation`);
                state.innerHTML = "<p>Undid all moves back to beginning.</p><p>Continue using controls to play the solution.</p><p>Or choose a different puzzle or solver.</p>";
            };

                stepBackButton.classList.remove("selected");
        });

        /**
         * Unlight all control buttons (play, rewind, etc)
         */
        function refreshControls() {
            // Deselect all buttons - remove "selected" class from all play buttons
            rewindToBegButton.classList.remove("selected");
            rewindButton.classList.remove("selected");
            pauseButton.classList.remove("selected");
            playButton.classList.remove("selected");
            forwardToEndButton.classList.remove("selected");

            stepButton.classList.remove("selected");
            stepBackButton.classList.remove("selected");
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

            // Turn off the domain, if on
            setupForControls(currentgrid);
        }

        /**
         * For running operations that should not show the domain, when the
         * domain is on. Check if the domain button is on and, if so, turn it off
         * and remove the domain from the display board. Also remove any box outlines
         */
        function setupForControls(currentgrid) {
            let button = document.getElementById("showDomainButton");
            if (button.value === "ON") {
                button.value = "OFF";
                //TODO: better way to do the following?
                showDomainButton.classList.remove("selected");
                clearDomainFromTable(currentgrid);
            }

            if (outlined && !(typeof moves === 'undefined') && !(typeof imove === 'undefined')) {
                removeboxborder(moves[imove][0], moves[imove][1], moves[imove][3]);
                outlined = false;
            }
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
         * @param {number} location  The location to rewind back to
         */
        function rewindToMove(location, currentgrid) {
            // Do any actions that need to be done before control functions, such as
            // removing the outline
            setupForControls(currentgrid);

            if (location > imove) {
                throw "Rewinding, so new location must be before current";
            }
            else if (location === imove) {
                throw "Rewinding, but new location is same as current";
            }
            
            // TODO: why is this originalgrid?
            // Build the board at the desired location and display it
            // Remember that we start all over from the original grid
            // and add all the moves up to the current location
            let newgrid = updateGridFromMoves(originalgrid, moves, location, outlined);

            return newgrid;
        };

        try {
            makeEmptyGrid(9, 9);
            populateBoard(grid);
            isLoading = false;
            playReset();
            boardReset(puzzleType);
            moves = runBacktrackSolver(puzzleType);
        } catch (error) {
            console.error('Error during grid setup:', error);
        }

    });


</script>

<svelte:head>
    <meta charset="utf-8" />
    <title>Sudoku Solver</title>
    <link rel="stylesheet" href="/src/routes/projects/sudoku/styles.css">
    <link rel="stylesheet" href="/src/routes/projects/sudoku/sudokuStyles.css">
</svelte:head>


<main>
    <div>
        <div class="mx-auto max-w-4xl flex flex-col px-6 py-4 mt-6">
        <h1 class="text-4xl flex justify-center mb-2">Sudoku Solver</h1>
    </div>

    <div class="mx-auto max-w-4xl px-6 py-4 mb-10 prose">
        Under construction. Some features are not yet implemented. For fully functional code please see my
        <a href="https://github.com/prowe12/game-solvers/tree/main/sudoku">Python Sudoku Solver</a>
        and <a href="https://github.com/prowe12/gamesolverhub/tree/master/sudoku" >Javascript & CSS Sudoku Solver</a>.
    </div>

    <div class="max-w-8xl flex justify-center">
        <div id="grid-container-puzzle">

        <!-- Row 1, column 1 -->
        <div>
            <fieldset id="selections">
                <legend>Selections</legend>

                <!-- Choose a puzzle from a drop-down list -->
                Choose Puzzle<br>
                <select name="puzzle" id="dropdownpuzzle" class="button">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="evil">Evil</option>
                    <option value="random">Random</option>
                </select>
                <br>
                <br>

                Choose Solver <br>

                <button name="solverDemoBacktrack" id="solverDemoBacktrack" class="button">Backtracking</button>
                <br>
                <button name="playSudokuSolver" id="playSudokuSolver" class="button">AC-3 and Backtracking</button>
                <br>

                <!-- Add later  -->
                <!-- Read in your own Sudoku file  -->
                <!-- <input type="file" id="file-input">
            <button id="read-button">Load File</button>
            <pre id="file-contents"></pre>  -->

            </fieldset>

            <br> <br>
            <div class="colorkeybox">
                <h2>Key for colors</h2>
                <p class="backtrack">Backtracking</p>
                <p class="finalAC3">AC-3, solved</p>
                <p class="backtrackPlusAC3">AC-3, value may change</p>
            </div>

        </div>

        <!-- Row 1, column 2 -->
        <div>
            <!-- Print the Sudoku board to the screen -->
            <!-- <div class="flex justify-center px-8 mx-8 mb-20">
                <div class="px-4 mx-4 max-w-3xl text-xl">
                    <p class="mb-4">Loading...</p>
                </div>
            </div> -->
        
            <table id="sudokuGraphic"></table>

            <div>
                {#if isLoading}
                    <div class="flex justify-center items-center w-[380px] h-[356px] bg-gray-200">
                        <p>Loading puzzle ...</p>
                    </div>
                {:else}
                    <table id="sudokuGraphic"></table>
                {/if}
            </div>


            <!-- Put the fieldset in a div so we can center it -->
            <div id="sudokuControls">
                <fieldset id="controls">
                    <legend>Controls</legend>

                    <!-- Play Controls -->
                    <button type="button" id="rewindToBeg" class="button controlButton">Restart</button>
                    <button type="button" id="rewind" class="button controlButton">Rewind</button>
                    <button type="button" id="pauseButton" class="button controlButton">Pause</button>
                    <button type="button" id="playPause" class="button controlButton">Play</button>
                    <button type="button" id="forwardToEnd" class="button controlButton">Finish</button>

                    <!-- Slider for controlling the speed of playback -->
                    <!-- Speed <input class="slider anim-speed" type=range min=0 max=300 value=20></input> -->
                    <label for="speed">Speed</label>
                    <input id="speed" class="slider anim-speed" type="range" min="0" max="300" bind:value={speed}>
                    
                    <p>Current speed: {speed}</p>
                    <br>
                    <br>
                    <!-- Button to show the domain of each square -->
                    <button type="button" id="showDomainButton" class="button controlButton" value="OFF">
                        Show the domain
                    </button>
                    &nbsp; &nbsp;
                    <button type="button" id="step" class="button controlButton">Step</button>
                    <button type="button" id="stepBack" class="button controlButton">Undo</button>
                </fieldset>
            </div>

        </div>

        <!-- Row 1, column 3 -->
        <div>
            <p class="state"></p>
            <p class="explanation"></p>
        </div>
    </div>

    <div class="spacebelow"></div>

    </main>


    <div class="howto">
        <h1>How to Play</h1>
        <p>A Sudoku board is made up of a 9x9 grid of 81 boxes. The grid includes 9 subgrids
            of size 3x3.
        <p>The board starts with preset or "fixed" numbers
            that cannot be changed. The player's task is to solve the puzzle by filling in the
            remaining boxes.</p>
        <p>The puzzle is solved when each of the 81 boxes contain an integer
            between 1 and 9, and all of the integers 1-9 appear in every row, column, and
            3x3 subgrid of the board. </p>
    </div>

    <div class="howto">
        <h1>How the Solver Works</h1>
        <p>Sudoku is a type of Constraint Satisfaction Problem, or
            <a href="https://en.wikipedia.org/wiki/Constraint_satisfaction_problem">CSP</a>.
            The solver uses the Arc Consistency Algorithm #3 (
            <a href="https://en.wikipedia.org/wiki/AC-3_algorithm">AC-3</a>), and
            <a href="https://simple.wikipedia.org/wiki/Backtracking">backtracking</a> with the
            Minimum Remaining Values and degree heuristics.
        </p>
    </div>

    <div class="row">
        <div class="col1">
            <center>
                <h3>AC-3</h3>
            </center>
            <p>To use AC-3, first every box of the cell is given a domain of possible integers 1-9,
                with the exception of the boxes with fixed starting values. For fixed boxes, the domain
                consists of the fixed value.</p>

            <p>Next, a list of constraints is created for each
                box. For example, the box at (row, column) = (1,1) must not have the same value
                as any box in its row (e.g. the boxes at (1,1), (1,2), ... (1,9)), any box in its
                column (i.e. (2,1), (3,1), ... (9,1)), or any box in its subgrid (i.e. (1,2), (1,3), (2,1), (2,2),
                (2,3)
                (3,1), (3,2), (3,3)). Leaving out repeats, these represent the 20 constraints for box (1,1).</p>

            <p>AC-3 progresses by going through the list of constraints one by one. For each box x<sub>i</sub> and
                constraining box x<sub>j</sub>, if there is a single value in the domain of x<sub>j</sub>, that
                value is
                removed from the domain of x<sub>i</sub>. If this causes the domain of x<sub>i</sub> to contain only
                a
                single value, then a new set of "reverse
                constraints" is added to the list of constraints, to be worked through. For the reverse constraints,
                the box that was previously x<sub>i</sub> becomes the constraining box x<sub>j</sub> for all the
                boxes
                that share its row,
                column, and subgrid.</p>

            <p>After all the constraints have been worked through, the puzzle may not be completely solved. Thus
                AC-3 is not necessarily sufficient to find a solution, if one exists. In this case, another method
                is
                needed.</p>
        </div>

        <div class="col1">
            <center>
                <h3>Backtracking</h3>
            </center>
            <p>Backtracking uses a trial-and-error approach to solve the puzzle. For an empty Sudoku box,
                a value is selected from the domain of allowable values. These can be chosen randomly, in order, or
                using a heuristic as described below.

            <p>The guess value is placed in the box and used to constrain the boxes that share the row, column, and
                subgrid. The process is repeated for another empty Sudoku box, new constraints are accounted for, and so
                on.</p>

            <p>This continues until either the puzzle is solved, or a box is found to have no allowable value
                (because all values 1-9 are already present in the row, column,
                and subgrid).</p>
            <p> If there is no allowable value, the algorithm "backtracks" to the last box that had multiple values
                in its domain, emptying boxes as it backs up. A different value from the domain is tried, and the
                algorithm proceeds forward again for as long as it can. Because of the need to undo changes when the
                algorithm backtracks, recursion is generally used.</p>

            <p>Backtracking can be used alone or with another method like AC-3. For example, if AC-3 gets stuck,
                backtracking can take over. Unlike AC-3, backtracking can almost always solve a Sudoku puzzle if it is
                solveable.
            </p>
        </div>
    </div>

    <div class="howto">
        <center>
            <h3>Heuristic</h3>
        </center>
        <p>To speed up the solver, a heuristic can be used. A <a href="https://en.wikipedia.org/wiki/Heuristic">
            heuristic</a> is a problem-solving technique "that is not guaranteed to be optimal, perfect, or
            rational, but is nevertheless sufficient for reaching an immediate, short-term goal or approximation".
            Useful heuristics for Sudoku include:
        </p>
        <p>The Minimum Remaining Values (MRV) heuristic speeds up the sover by choosing the next box to solve by
            identifying the box with the shortest list of allowable values.
        </p>
        <p> The degree heuristic speeds up the solver by choosing the value involved in the largest number of
            constraints with remaining unassigned values.
        </p>

    </div>
