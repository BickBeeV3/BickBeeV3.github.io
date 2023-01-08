// Variables
const images = document.getElementsByTagName("img");
let moves = [" "," "," "," "," "," "," "," "," "];
let current_move = "X";
let play_bot = 1;
let first_move = Math.floor(Math.random() * 2) // Chooses random number of either 0 or 1
let turn_heading = document.getElementById("turn-heading");
let easybotbtn = document.getElementById("easybot");
let hardbotbtn = document.getElementById("hardbot");
let player1scoreheading = document.getElementById("player1score");
let player2scoreheading = document.getElementById("player2score");
let player1score = 0;
let player2score = 0;
let pause = false;

// Functions
function change_board() {
    if ((first_move == 1) && (play_bot == 1)) {
        current_move = "O";
        botMoveEasy();
    } else if ((first_move == 1) && (play_bot = 2)) {
        current_move = "O";
        botMoveHard();
    }
}

function botMoveEasy() {
    let unused_squares = [];
    for (let i = 0; i < moves.length; ++i) {
        if (moves[i] === " ") {
            unused_squares.push(i);
        }
    }
    var random_index = unused_squares[Math.floor(Math.random() * unused_squares.length)];
    images[random_index].src = "/images/Circle.png";
    moves[random_index] = current_move;
    current_move = "X";
}

function botMoveHard() {
    let best_score = -10000;
    let best_index;

    for (let i = 0; i < moves.length; ++i) {
        if (moves[i] === " ") {
            let movesCopy = [...moves];
            movesCopy[i] = "O";
            let temp_score = returnBestMove(movesCopy, 1);
            if (temp_score > best_score) {
                best_score = temp_score;
                best_index = i;
            }
        }
    }

    images[best_index].src = "/images/Circle.png";
    moves[best_index] = current_move;
    current_move = "X";
}

// Returns "score" of movesCopy (Bot is always O)
function returnBestMove(movesCopy, turn) {
    // Base Cases
    if ((detectWin(movesCopy)) && (turn == 0)) {
        return -1;
    } else if ((detectWin(movesCopy)) && (turn == 1)) {
        return 1;
    } else if (detectTie(movesCopy)) {
        return 0;
    }

    if (turn === 0) {
        let current_max = -1000;
        for (let i = 0; i < movesCopy.length; ++i) {
            if (movesCopy[i] === " ") {
                let movesCopy2 = [...movesCopy];
                movesCopy2[i] = "O";
                current_max = Math.max(current_max, returnBestMove(movesCopy2, 1));
            }
        }
        return current_max;
    } else if (turn === 1) {
        let current_min = 1000;
        for (let i = 0; i < movesCopy.length; ++i) {
            if (movesCopy[i] === " ") {
                let movesCopy2 = [...movesCopy];
                movesCopy2[i] = "X";
                current_min = Math.min(current_min, returnBestMove(movesCopy2, 0));
            }
        }
        return current_min;
    }
}

function clearBoard() {
    pause = false;
    moves = [" "," "," "," "," "," "," "," "," "];
    current_move = "X";
    for (let i = 0; i < moves.length; ++i) {
        images[i].src = "/images/WhiteSquare.png";
    }
    first_move = Math.abs(first_move - 1);
    change_board();
}

function detectEOG(copy) {
    // If Someone Wins
    if (detectWin(copy)) {
        if (current_move == "X") {current_move = "O";} 
        else if (current_move == "O") {current_move = "X";}
        setTimeout(function(){
            alert("Game Over! " + current_move + " Wins!");
            if (current_move === "X") {
                ++player1score;
                player1scoreheading.innerHTML = "Player:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + player1score;
            } else {
                ++player2score;
                if (play_bot == 1) {
                    player2scoreheading.innerHTML = "Easy BOT:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + player2score;
                } else {
                    player2scoreheading.innerHTML = "Unbeatable BOT:&nbsp;&nbsp;" + player2score;
                }
            }
            clearBoard();
         }, 300);
         return true;
    }

    // If The Game Ties
    if ((detectTie(copy)) && (!detectWin(copy))){
        setTimeout(function(){
            alert("Game Over! The Result Is a Tie!");
            clearBoard();
         }, 150);
         return true;
    }
    return false;
}

function detectWin(copy) {
    if (((copy[0] !== " ") && (copy[0] == copy[1]) && (copy[1] == copy[2]) && (copy[0] == copy[2])) ||
        ((copy[3] !== " ") && (copy[3] == copy[4]) && (copy[4] == copy[5]) && (copy[3] == copy[5])) ||
        ((copy[6] !== " ") && (copy[6] == copy[7]) && (copy[7] == copy[8]) && (copy[6] == copy[8])) ||
        ((copy[0] !== " ") && (copy[0] == copy[3]) && (copy[3] == copy[6]) && (copy[0] == copy[6])) ||
        ((copy[1] !== " ") && (copy[1] == copy[4]) && (copy[4] == copy[7]) && (copy[1] == copy[7])) ||
        ((copy[2] !== " ") && (copy[2] == copy[5]) && (copy[5] == copy[8]) && (copy[2] == copy[8])) ||
        ((copy[0] !== " ") && (copy[0] == copy[4]) && (copy[4] == copy[8]) && (copy[0] == copy[8])) ||
        ((copy[2] !== " ") && (copy[2] == copy[4]) && (copy[4] == copy[6]) && (copy[2] == copy[6])))
        {
            return true;
        }
        return false;
}

function detectTie(copy) {
    for (let i = 0; i < copy.length; ++i) {
        if (copy[i] == " ") {
            return false;
        }
    }
    return true;
}

// Code Run At Start
for (let i = 0; i < images.length; ++i) {
    images[i].onclick = function() {
        if (!pause) {
            pause = true;
            if (images[i].src.endsWith("/images/WhiteSquare.png")) {
                moves[i] = current_move;
                if (current_move == "X") {
                    images[i].src = "/images/x.png";
                    current_move = "O";
                    // If User Chooses to Play against Bot
                    if (!detectEOG(moves)) {
                        if (play_bot == 1) {
                            turn_heading.innerHTML = "BOT's Turn"
                            setTimeout(function(){
                                botMoveEasy();
                                detectEOG(moves);
                                turn_heading.innerHTML = "Player's Turn"
                                pause = false;
                            }, 150);
                        } else if (play_bot == 2) {
                            turn_heading.innerHTML = "BOT's Turn"
                            setTimeout(function(){
                                botMoveHard();
                                detectEOG(moves);
                                turn_heading.innerHTML = "Player's Turn"
                                pause = false;
                            }, 150);
                        }
                    }
                } else if (current_move == "O") {
                    images[i].src = "/images/Circle.png";
                    current_move = "X";
                    detectEOG(moves);
                }
            }
            setTimeout(function(){
                pause = false;
            }, 100);
        }
    }
}

easybotbtn.onclick = function() {
    play_bot = 1;
    clearBoard();
    player1score = 0;
    player2score = 0;
    player1scoreheading.innerHTML = "Player:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0";
    player2scoreheading.innerHTML = "Easy BOT:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0";
};

hardbotbtn.onclick = function() {
    play_bot = 2;
    clearBoard();
    player1score = 0;
    player2score = 0;
    player1scoreheading.innerHTML = "Player:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0";
    player2scoreheading.innerHTML = "Unbeatable BOT:&nbsp;&nbsp;0";
};

change_board();