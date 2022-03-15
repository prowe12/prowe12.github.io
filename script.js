/**
 * Put the nav bar html text into the HTML
 */
navHtmlText = '<ul>' +
              '<li><a href="index.html">Home</a></li>' +
              '<li><a href="sudoku.html">Sudoku</a>' +
              '<li><a href="connectFour.html">Connect Four</a></li>' +
              '</ul>'
document.getElementById("nav").innerHTML = navHtmlText;

// ' ' +
//               ' ' +
//               '' + 
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



/*****************************************************
    EVENT LISTENERS FOR USER GENERATED EVENTS
******************************************************/

/** 
 * On button click, solve Sudoku puzzle in image
 */
 function registerSudokuButtonHandler() {
    let button = document.getElementById("sudokuButton");
    button.addEventListener("click", function changeImage(event) {
        let currentImage = document.querySelector('#sudokuImage').getAttribute('src');
        let imageName1 = "sudoku/sudoku_easy_original.jpg";
        let imageName2 = "sudoku/sudoku_easy_looping.gif";
        if (currentImage == imageName1) { 
            document.querySelector('#sudokuImage').setAttribute('src', imageName2);
        }
        else {
            document.querySelector('#sudokuImage').setAttribute('src', imageName1);
        }
    });
}


/** 
 * On button click, solve Connect Four puzzle in image
 */
 function registerConnectFourButtonHandler() {
    let button = document.getElementById("connectFourImage");
    button.addEventListener("click", function changeImage(event) {
        let currentImage = document.querySelector('#connectFourImage').getAttribute('src');
        let imageName3 = "connect-four/ConnectFourWin.jpg";
        let imageName4 = "connect-four/ConnectFour.gif";
        if (currentImage == imageName3) { 
            document.querySelector('#connectFourImage').setAttribute('src', imageName4);
        }
        else {
            document.querySelector('#connectFourImage').setAttribute('src', imageName3);
        }
    });
}
