/* tabla de joc */

const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    function placeMarker(position, marker) {
        if (board[position] === "") {
            board[position] = marker;
        }
    }

    function getBoard() {
        return board;
    }

    return {
        placeMarker,
        getBoard
    };
})();

/* obiectul pt player */

function createPlayer(name, marker) {
    return {
        name,
        marker
    };
}

/* logica jocului */

const Game = (() => {
    const player1 = createPlayer("Alex", "X");
    const player2 = createPlayer("Maria", "O");

    let currentPlayer = player1;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWinner() {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;

        if (
            Gameboard.board[a] !== "" &&
            Gameboard.board[a] === Gameboard.board[b] &&
            Gameboard.board[a] === Gameboard.board[c]
        ) {
            return true;
            }
        }
        return false;
    }

    function checkTie() {
        return Gameboard.board.every(function(cell) {
            return cell !== "";
        });
    }


    function switchPlayer() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    function playTurn(position) {
        Gameboard.placeMarker(position, currentPlayer.marker);

        if (checkWinner()) {
            console.log(`${currentPlayer.name} wins!`);
            return;
        }

        if (checkTie()) {
            console.log("It's a tie!");
            return;
        }

        switchPlayer();
    }

    return {
        playTurn
    };
})();

