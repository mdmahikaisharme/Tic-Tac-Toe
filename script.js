// all --> values are same ? true
const all = (a, b, c) => (a===b) && (b===c) && (c!=='');


// Game Win
const gameWin = (a, b, c) => {
    // Player Win
    win = board[a];
    
    // set Title
    document.getElementById("title").innerText = `${win} Won The Game :)`;

    // hide turn 
    dturn.parentElement.style.display = "none";

    // change color
    [a, b, c].forEach(i => document.getElementById(i).style.backgroundColor="#ff000090");
  
    // Removing Listener
    [...dplaces].forEach(i => i.removeEventListener("click", clicked));
};


// Game Over
const gameOver = () => {
    // set Title
    document.getElementById("title").innerText = "Game Over :(";

    // hide turn 
    dturn.parentElement.style.display = "none";
    
    
    [...dplaces].forEach(i => {
        // change Color
        i.style.backgroundColor="#ff000090";

        // Removing Listener
        i.removeEventListener("click", clicked)
    });
    
};


// Check Win
const checkWin = () => {
    // Horizontal --> board [0]==[1]==[2] --> WIN
    [0, 3, 6].forEach(i => all(board[i], board[i+1], board[i+2]) && gameWin(i, i+1, i+2));

    // Vertical --> board [0]==[3]==[6] --> WIN
    [0, 1, 2].forEach(i => all(board[i], board[i+3], board[i+6]) && gameWin(i, i+3, i+6));

    // Angle
    all(board[0], board[4], board[8]) && gameWin(0, 4, 8); // '\'
    all(board[2], board[4], board[6]) && gameWin(2, 4, 6); // '/'

    // Run Finished
    (run===8) && !win && gameOver();
};


// Clicked Function
const clicked = (event) => {
    const target = event.target;

    // if clicked valid
    if (board[target.id] === '') {

        // set value to board
        board[target.id] = turn;

        // change Text Color
        target.innerText = turn;
        target.style.backgroundColor = '#0000007a';

        // Is Win
        checkWin();

        // Change turn
        turn = (turn === 'X') ? 'Y':'X';
        dturn.innerText = turn;

        // Run Increase
        run += 1;
    };
};


// Global Variables
const dplaces = document.getElementsByClassName("place");
const dturn = document.getElementById("turn");
let turn = 'X';
let run = 0;
let win;
let board = [
    '', '', '',
    '', '', '',
    '', '', ''
];

// Click Event
[...dplaces].forEach(i => i.addEventListener("click", clicked));