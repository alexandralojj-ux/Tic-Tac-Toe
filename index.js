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

    function resetBoard() {
        board.fill("");
    }

    return {
        placeMarker,
        getBoard,
        resetBoard
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
    function resetGame() {
        Gameboard.resetBoard();
        currentPlayer = player1;
        gameOver = false;
    }

    const player1 = createPlayer("Alex", "X");
    const player2 = createPlayer("Maria", "O");

    let currentPlayer = player1;
    let gameOver = false;

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
            Gameboard.board()[a] !== "" &&
            Gameboard.board()[a] === Gameboard.board[b] &&
            Gameboard.board()[a] === Gameboard.board[c]
        ) {
            return true;
            }
        }
        return false;
    }

    function checkTie() {
        return Gameboard.getBoard().every(function(cell) {
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
        if (gameOver) {
            return;
        }

        Gameboard.placeMarker(position, currentPlayer.marker);

        if (checkWinner()) {
            console.log(`${currentPlayer.name} wins!`);
            gameOver = true;
            return;
        }

        if (checkTie()) {
            console.log("It's a tie!");
            gameOver = true;
            return;
        }

        switchPlayer();
    }

    return {
        playTurn,
        resetGame
    };
})();

const displayController = (() => {

    const gameboardElement = document.querySelector("#gameboard");

    function render() {
        gameboardElement.innerHTML = "";

        const board = Gameboard.getBoard();

        board.forEach(function(cell, index) {
            const cellElement = document.createElement("button");
            
            cellElement.textContent = cell;
            cellElement.dataset.index = index;

            cellElement.addEventListener("click", function() {
                Game.playTurn(index);
                render();
            });

            gameboardElement.appendChild(cellElement);
        });
    }

    return {
        render
    };
})();

displayController.render();

