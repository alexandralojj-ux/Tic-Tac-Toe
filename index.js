const Gameboard = {
    board: ["", "", "", "", "", "", "", "", ""],

    placeMarker(position, marker) {
        if (this.board[position] === "") {
        this.board[position] = marker;
        }
    }
}

function createPlayer(name, marker) {
    return {
        name,
        marker
    };
}