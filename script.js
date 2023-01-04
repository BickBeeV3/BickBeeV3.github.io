const images = document.getElementsByTagName("img");
let moves = [" "," "," "," "," "," "," "," "," "];
let current_move = "X";
let play_bot = 1;
let first_move = Math.floor(Math.random() * 2) // Chooses random number of either 0 or 1

function change_board() {
    if ((first_move == 1) && (play_bot == 1)) {
        current_move = "O";
        botMoveEasy();
    } else if ((first_move == 1) && (play_bot = 2)) {
        current_move = "O";
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

//=================================================================================================
function botMoveHard() {
    // Dont Forget to change moves[index of move] to a O
    // And change the current move to "X"
}
//=================================================================================================

function botMoveEasy() {
    var unused_squares = [];
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

change_board();