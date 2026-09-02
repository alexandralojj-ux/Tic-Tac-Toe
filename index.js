/* tabla de joc */

const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""]

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

    let player1;
    let player2;

    let currentPlayer;
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

    function startGame(player1Name, player2Name) {
        player1 = createPlayer(player1Name, "X");
        player2 = createPlayer(player2Name, "O");

        currentPlayer = player1;
        gameOver = false;

        return `${currentPlayer.name}'s turn (${currentPlayer.marker})`;
    }

    function checkWinner() {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;

        if (
            Gameboard.getBoard()[a] !== "" &&
            Gameboard.getBoard()[a] === Gameboard.getBoard()[b] &&
            Gameboard.getBoard()[a] === Gameboard.getBoard()[c]
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
        if (!currentPlayer) {
            return;
        }

        if (gameOver) {
            return;
        }

        Gameboard.placeMarker(position, currentPlayer.marker);

        if (checkWinner()) {
            gameOver = true;
            return `${currentPlayer.name} wins!`;
        }

        if (checkTie()) {
            gameOver = true;
            return "It's a tie!";
        }

        switchPlayer();

        return `${currentPlayer.name}'s turn (${currentPlayer.marker})`;
    }

    return {
        playTurn,
        resetGame,
        startGame
    };
})();

const displayController = (() => {

    const gameboardElement = document.querySelector("#gameboard");
    const gameMessage = document.querySelector("#game-message");
    const restartButton = document.querySelector("#restart-button");
    const startButton = document.querySelector("#start-button");

    startButton.addEventListener("click", function() {
        const player1Name = document.querySelector("#player1-name").value;
        const player2Name = document.querySelector("#player2-name").value;

        if (player1Name === "" || player2Name === "") {
            return;
        }

        const message = Game.startGame(player1Name, player2Name);
        gameMessage.textContent = message;
        render();
    });

    restartButton.addEventListener("click", function() {
        Game.resetGame();
        gameMessage.textContent = "";
        render();
    });

    function showMessage(message) {
        gameMessage.textContent = message;
    }

    function render() {
        gameboardElement.innerHTML = "";

        const board = Gameboard.getBoard();

        board.forEach(function(cell, index) {
            const cellElement = document.createElement("button");
            
            cellElement.textContent = cell;
            cellElement.dataset.index = index;

            cellElement.addEventListener("click", function() {
                const message = Game.playTurn(index);

                if (message) {
                    showMessage(message);
                }

                render();
            });

            gameboardElement.appendChild(cellElement);
        });
    }

    return {
        render
    };
})();

