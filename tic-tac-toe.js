/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});
const assert = require('assert');

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    board[position] = mark.toUpperCase();
}

// TODO: print the game board as described at the top of this code skeleton
// Will not be tested in Part 1
function printBoard() {
    console.log(
        board[1] + " | " + board[2] + " | " + board[3] + "\n" +
        "---------\n" +
        board[4] + " | " + board[5] + " | " + board[6] + "\n" +
        "---------\n" +
        board[7] + " | " + board[8] + " | " + board[9] + "\n" 
    );
}



// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String
function isInt(value) {
    let x = parseFloat(value);
    return !isNaN(value) && Number.isInteger(x); 
  }

function validateMove(position) {
    return (isInt(position) === true && board[position] === " ") 
}

// TODO: list out all the combinations of winning, you will neeed this (done)
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    let i;
    let j;
    
    for (i = 0; i < winCombinations.length; i++) { //the level1 array
        let pointsEarned =0;
        for (j = 0; j < winCombinations[i].length; j++) {//the level2 array
            if (board[winCombinations[i][j]] === player) {
                pointsEarned++;
            }   
        }  
        if (pointsEarned === 3) {
            return true;
        }
    }

    
    return false;
    
}


// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    for (let i = 0; i < Object.keys(board).length; i++) {
        if (board[i] === " ") {
            return false;
        }
    }
    return true;
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    while(!winnerIdentified){
        let position = prompt(player + "'s turn, input: ");

        if(validateMove(position) === true){
            markBoard(position, player);
            printBoard();

            if(checkWin(player) === true){
                console.log("Player " + player + " wins! Congratulation Player " + player + "!");
                winnerIdentified = true;
                return;
            }
            if(checkFull() === true){
                console.log ("It is a Tie Game! \\^o^/");
                winnerIdentified = true;
                return;
            }
            player === "X"? playTurn("O") : playTurn("X")
        }

        else {
            console.log("The Input is Incorrect, Please Key in Another Input. ");
            playTurn(player);
        }

        var yesOrNo = prompt ("Do you want to play one more time? (Y/N)");
        anotherGame(yesOrNo);
        
    }
}
  

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false
let currentTurnPlayer = 'X'


while (!winnerIdentified){
    playTurn(currentTurnPlayer);
    // feel free to add logic here if needed, e.g. announcing winner or tie
}


// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
function anotherGame(yesOrNo) {
    if (winnerIdentified == true){
      if (yesOrNo == "Y"){
        board = {
            1: ' ', 2: ' ', 3: ' ',
            4: ' ', 5: ' ', 6: ' ',
            7: ' ', 8: ' ', 9: ' '
        };
       
        console.log('Game started: \n\n' +
        ' 1 | 2 | 3 \n' +
        ' --------- \n' +
        ' 4 | 5 | 6 \n' +
        ' --------- \n' +
        ' 7 | 8 | 9 \n');
  
        winnerIdentified = false;
        currentTurnPlayer = 'X';
  
        while (!winnerIdentified){
            playTurn(currentTurnPlayer);
        }
    }
  
    else{
        console.log("Okay, see you next time! =D");
        process.exit(1); 
    } 
  }
}


