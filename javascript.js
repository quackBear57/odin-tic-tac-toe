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

    let changeTurns = true;

    const markSquare = (row, column, player) => {
        if (board[row][column].getValue() === '') {
            console.log(`adding mark ${player.markSymbol} to ${row}, ${column}`)
            board[row][column].addMark(player.markSymbol);
            changeTurns = true;
            return changeTurns
        } else {
            console.log(`invalid move, space at ${row}, ${column} already taken`);
            changeTurns = false;
            return changeTurns;
        }
    };

    const printBoard = () => {
        const boardWithMarks = board.map((row) => row.map((square) => square.getValue()));
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

function gameController(
    playerOneName = "Player 1",
    playerTwoName = "Player 2"
) {

    const players = [
        {name: playerOneName, markSymbol: 'x'},
        {name: playerTwoName, markSymbol: 'o'}
    ];
    
    const board = gameboard();

    let activePlayer = players[0];

    const changePlayers = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    let changeTurnAfterRound = true;
    const playRound = (row, column) => {
        changeTurnAfterRound = board.markSquare(row, column, getActivePlayer());
        if (changeTurnAfterRound === true) {
            changePlayers();
            printNewRound();
        } else {
            printNewRound();
        }
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const game = gameController();