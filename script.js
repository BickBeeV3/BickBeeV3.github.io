const images = document.getElementsByTagName("img");
let moves = [" "," "," "," "," "," "," "," "," "];
let current_move = "X";

function change_board() {
    for (let i = 0; i < images.length; ++i) {
        images[i].onclick = function() {
            if (images[i].src.endsWith("/images/WhiteSquare.png")) {
                moves[i] = current_move;
                if (current_move == "X") {
                    images[i].src = "/images/x.png";
                    current_move = "O";
                } else if (current_move == "O") {
                    images[i].src = "/images/Circle.png";
                    current_move = "X";
                }
            }
            // If Someone Wins
            if (detectWin()) {
                if (current_move == "X") {current_move = "O";} 
                else if (current_move == "O") {current_move = "X";}
                setTimeout(function(){
                    alert("Game Over! " + current_move + " Wins!");
                    window.location.reload();
                 }, 100);
            }
        }
    }
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

change_board();