const images = document.getElementsByTagName("img");
let moves = [" "," "," "," "," "," "," "," "," "];
let current_move = "X";
let play_bot = 2;
let first_move = Math.floor(Math.random() * 2) // Chooses random number of either 0 or 1

function change_board() {
    if ((first_move == 1) && (play_bot == 1)) {
        current_move = "O";
        botMoveEasy();
    } else if ((first_move == 1) && (play_bot = 2)) {
        current_move = "O";
        
        // ======================
        // let movesCopy = [...moves];
        // movesCopy[0] = "P";
        // console.log(movesCopy);
        // console.log(moves);
        // ======================
        botMoveHard();
    }

    for (let i = 0; i < images.length; ++i) {
        images[i].onclick = function() {
            if (images[i].src.endsWith("/images/WhiteSquare.png")) {
                moves[i] = current_move;
                if (current_move == "X") {
                    images[i].src = "/images/x.png";
                    current_move = "O";
                    detectEOG();
                    // If User Chooses to Play against Bot
                    if (play_bot == 1) {
                        setTimeout(function(){
                            botMoveEasy();
                            detectEOG();
                        }, 100);
                    } else if (play_bot == 2) {
                        setTimeout(function(){
                            botMoveHard();
                            detectEOG();
                        }, 100);
                    }
                } else if (current_move == "O") {
                    images[i].src = "/images/Circle.png";
                    current_move = "X";
                    detectEOG();
                }
            }
        }
    }
}

//=================================================================================================
// Returns "score" of movesCopy (Bot is always O)
function returnBestMove(movesCopy, turn) {
    // Base Cases
    if ((detectWin2(movesCopy)) && (turn == 0)) {
        return -1;
    } else if ((detectWin2(movesCopy)) && (turn == 1)) {
        return 1;
    } else if (detectTie2(movesCopy)) {
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

function botMoveHard() {
    let best_score = -10000;
    let best_index;

    for (let i = 0; i < moves.length; ++i) {
        if (moves[i] === " ") {
            let movesCopy = [...moves];
            movesCopy[i] = "O";
            let temp_score = returnBestMove(movesCopy, 1);
            console.log(temp_score);
            if (temp_score > best_score) {
                best_score = temp_score;
                best_index = i;
            }
        }
    }

    // Change moves[index of move] to a O and change the current move to "X"
    images[best_index].src = "/images/Circle.png";
    moves[best_index] = current_move;
    current_move = "X";
}
//=================================================================================================

function detectEOG() {
    // If Someone Wins
    if (detectWin()) {
        if (current_move == "X") {current_move = "O";} 
        else if (current_move == "O") {current_move = "X";}
        setTimeout(function(){
            alert("Game Over! " + current_move + " Wins!");
            window.location.reload();
         }, 100);
    }

    // If The Game Ties
    if ((detectTie()) && (!detectWin())){
        setTimeout(function(){
            alert("Game Over! The Result Is a Tie!");
            window.location.reload();
         }, 100);
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

function detectWin() {
    if (((moves[0] !== " ") && (moves[0] == moves[1]) && (moves[1] == moves[2]) && (moves[0] == moves[2])) ||
        ((moves[3] !== " ") && (moves[3] == moves[4]) && (moves[4] == moves[5]) && (moves[3] == moves[5])) ||
        ((moves[6] !== " ") && (moves[6] == moves[7]) && (moves[7] == moves[8]) && (moves[6] == moves[8])) ||
        ((moves[0] !== " ") && (moves[0] == moves[3]) && (moves[3] == moves[6]) && (moves[0] == moves[6])) ||
        ((moves[1] !== " ") && (moves[1] == moves[4]) && (moves[4] == moves[7]) && (moves[1] == moves[7])) ||
        ((moves[2] !== " ") && (moves[2] == moves[5]) && (moves[5] == moves[8]) && (moves[2] == moves[8])) ||
        ((moves[0] !== " ") && (moves[0] == moves[4]) && (moves[4] == moves[8]) && (moves[0] == moves[8])) ||
        ((moves[2] !== " ") && (moves[2] == moves[4]) && (moves[4] == moves[6]) && (moves[2] == moves[6])))
        {
            return true;
        }
        return false;
}

function detectTie() {
    for (let i = 0; i < moves.length; ++i) {
        if (moves[i] == " ") {
            return false;
        }
    }
    return true;
}

// Copy
function detectWin2(copy) {
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

function detectTie2(copy) {
    for (let i = 0; i < copy.length; ++i) {
        if (copy[i] == " ") {
            return false;
        }
    }
    return true;
}

change_board();