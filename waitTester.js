


let minScore = mmWalkthrough2();
console.log("Finished and got minScore: " + minScore);

// Because this function will have a delay in it, the function that calls it will need
// to wait for it to finish. Therefore this function must be asynchronus and return
// a promise
async function mmWalkthrough2(){
    console.log("in mmWalkthrough2");
    // mm_min = createMinElement();
    // let min_children = mm_min.children;
    // let table = min_children[2];
    // console.log("table: ",table);
    // let send_value = document.createElement('button');
    // send_value.style.display = "none";
    // send_value.textContent = "Return Min Value";
    // mm_min.appendChild(send_value);
    // //let col = 0;
    let minScore = 100000;
    //var minScore = 100000;
    let minCol = 0;
    let delay = 1000;

    // Every time through the for loop we have to wait longer than before
    // to update the table, so multiply the delay by the column
    async function getMinScore(minScore) {
        console.log("In getMinScore, with minScore passed as " + minScore);
        let score = 3;
        for(let col = 0; col < 6; col++){
            console.log("In for loop, with minScore now " + minScore);
            console.log("In for loop, with score of " + score);
            console.log("col: " + col);
            minScore = setTimeout( async () => {
                score -= 1;
                console.log("In setInterval of for loop, with minScore passed in as " + minScore);
                alert("In setInterval");
                //if(col>0){
                //    undoMove(col-1);
                //}
                //fakeMove(col, Math.abs(1-currentPlayer));
                //score = score - 1 //computer.evaluate(board);
                //addToTable(col, table, score);
                console.log("score:", score);
                console.log("min score: ", minScore);
                //let score = minWalkthroughLoop(col,table);
                if (score < minScore) {
                    console.log("updating score for col ", col);
                    //changeColColor(table, minCol, "black");
                    minScore = score;
                    console.log("minScore reduced to: " + minScore);
                    //minCol = col;
                    //changeColColor(table, col, "red");
                }
                return minScore;
            }, delay * col);
        }
        return minScore;
    }
      
    console.log("Before getMinScore, minScore = " + minScore);
    minScore = await getMinScore(minScore);

    // The rest of this needs to wait until all of the above finsihes
    // So the delay is set to delay * board[0].length

    // Update the depth=1 table with the minimum score
    console.log("After for loop, minScore = " + minScore);

    // What's going on here?
    //undoMove(6);
    //send_value.style.display = "block"
    //send_value.addEventListener('click', () => {
    //    return minScore;
    //})
    alert("About to return minScore");
    console.log("minscore that will be returned: " + minScore);
    return minScore;
}
console.log("minscore that was returned: " + minScore);
