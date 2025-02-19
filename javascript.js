function gameboard() {
    const rows = 3;
    const cols = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(square());
        }
    }

    const getBoard = () => board;

    const markSquare = (row, column, player) => {
        if (!board[row][column].getValue() === '') {
            board[row][column].addMark();
        } else {
            return;
        }
    };

    const printBoard = () => {
        const boardWithMarks = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithMarks);
    };

    return {
        getBoard,
        markSquare,
        printBoard
    };
}

function square() {
    let value = '';

    const addMark = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addMark,
        getValue
    };
}

gameboard();
gameboard.printBoard();