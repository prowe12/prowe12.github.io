/**
 * Put the nav bar html text into the HTML
 */
navHtmlText = '<a class="active" href="index.html">Home</a> ' +
              '<a href="sudoku.html">Sudoku</a> ' +
              '<a href="connectFour.html">Connect Four</a>'
document.getElementById("nav").innerHTML = navHtmlText;

document.getElementById("playSudoku").addEventListener("click", function() {
    location.href = "sudoku.html"});
