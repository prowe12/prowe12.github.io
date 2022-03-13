/**
 * Put the nav bar html text into the HTML
 */
navHtmlText = '<a class="active" href="index.html">Home</a> ' +
              '<a href="sudoku.html">Sudoku</a> ' +
              '<a href="connectFour.html">Connect Four</a>'
document.getElementById("nav").innerHTML = navHtmlText;

/**
 * Button to play Sudoku
 */
//document.getElementById("playSudoku").addEventListener("click", function() {
//    location.href = "sudoku.html"});



/*****************************************************
    EVENTS TRIGGERED WHEN THE DOM IS FINISHED LOADING
******************************************************/
window.addEventListener('DOMContentLoaded', registerSudokuButtonHandler);
window.addEventListener('DOMContentLoaded', registerConnectFourButtonHandler);
//window.addEventListener('DOMContentLoaded', sudokuImageManipulator)
//window.addEventListener('DOMContentLoaded', connectFourImageManipulator)

/*****************************************************
    EVENT LISTENERS FOR USER GENERATED EVENTS
******************************************************/

/** 
 * On button click, solve Sudoku puzzle in image
 */
 function registerSudokuButtonHandler() {
    let button = document.getElementById("sudokuImage");
    button.addEventListener("click", function (event) {
        if (button.innerHTML == '<img src="sudoku/sudoku_easy_looping.gif" alt="Sudoku">') {
            imageName = "sudoku/sudoku_easy_original.jpg"
        }
        else {
            imageName = "sudoku/sudoku_easy_looping.gif"
        }
        button.innerHTML = '<img src=' + imageName + ' alt="Sudoku"></img>'
    })
}


/** 
 * On button click, solve Sudoku puzzle in image
 */
 function registerConnectFourButtonHandler() {
    let button = document.getElementById("connectFourImage");
    button.addEventListener("click", function (event) {
        if (button.innerHTML == '<img src="connect-four/ConnectFour.gif" alt="Sudoku">') {
            imageName = "connect-four/ConnectFourWin.jpg"
        }
        else {
            imageName = "connect-four/ConnectFour.gif"
        }
        button.innerHTML = '<img src=' + imageName + ' alt="Sudoku"></img>'
    })
}

// function registerButtonHandler() {
//     let button = document.getElementById("sudokuImage");
//     let imageName =  "sudoku/sudoku_easy_looping.gif"
//     button.addEventListener("click", clickToLoop("sudokuImage", imageName));
// }

// function clickToLoop( hrefID, imageName){
//     //imageName = "sudoku/sudoku_easy_original.jpg"
//     document.getElementById("sudokuImage").innerHTML = '<img src=' + imageName + ' alt="Sudoku"></img>'
// }




/**
 * Timers for image of Sudoku puzzle: Static, then moving, then static
 */

// Promise to set Sudoku image
// function delayedSetImage(hrefID, imageName, delay){
//     // After some time delay, change the image and set the promise to resolved
//     function setImage(resolve, reject){
//         setTimeout(() => {
//             document.getElementById(hrefID).innerHTML = '<img src=' + imageName + ' alt="Sudoku"></img>'
//             resolve(); // This method sets the promise to resolved
//         }, delay);
//     }
//     return new Promise(setImage)
// }

/**
 * For Sudoku image, alternate between static starting image, moving image, and static final image
 * on a loop (interval), with each occuring after a delay.
 */
//function sudokuImageManipulator() {
//    let timerID = setInterval(function(){
//        delayedSetImage('sudokuImage', "sudoku/sudoku_easy_original.jpg", 3000)
//        .then(() => delayedSetImage('sudokuImage', "sudoku/sudoku_easy_looping.gif", 3000))
//        .then(() => delayedSetImage('sudokuImage', "sudoku/sudoku_easy_complete.jpg", 10000))
//    }, 20000);
//}

/**
 * For Connect Four image, alternate between static starting image, moving image, and static final image
 * on a loop (interval), with each occuring after a delay.
 */
function connectFourImageManipulator() {
    let timerID = setInterval(function(){
        delayedSetImage('connectFourImage', "connect-four/ConnectFourWin.jpg", 10000)
        .then(() => delayedSetImage('connectFourImage', "connect-four/ConnectFour.gif", 10000))
    }, 18000);
}

