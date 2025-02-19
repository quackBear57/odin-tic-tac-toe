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
            console.log(`adding mark "${player.markSymbol}" to (${row}, ${column})`);
            board[row][column].addMark(player.markSymbol);
            changeTurns = true;
            return changeTurns;
        } else {
            console.log(`invalid move, space at (${row}, ${column}) already taken`);
            changeTurns = false;
            return changeTurns;
        }
    };

    const printBoard = () => {
        const boardWithMarks = board.map((row) => row.map((square) => square.getValue()));
        console.log(boardWithMarks);
    };

    const checkWin = () => {
        let winCondition = false;
        let winningPlayer = "";
        
        // check rows
        for (let i = 0; i < board.length; i++) {
            if (board[i][0] === board[i][1]) {
                // check next row
                if (board[i][0] === board[i][2]) {
                    // win!
                    winCondition = true;
                    winningPlayer = board[i][0].getValue().name;
                    return {
                        winCondition,
                        winningPlayer
                    };
                }
            }
        }

        // check columns
        for (let j = 0; j < board[0].length; j++) {
            if (board[0][j] === board[1][j]) {
                //check next column
                if (board[0][j] === board[2][j]) {
                    winCondition = true;
                    winningPlayer = board[0][j].getValue().name;
                    return {
                        winCondition,
                        winningPlayer
                    };
                }
            }
        }

        // check diagonal 1
        if (board[0][0] === board[1][1]) {
            // check next
            if (board[0][0] === board[2][2]) {
                winCondition = true;
                winningPlayer = board[1][1].getValue().name;
                return {
                    winCondition,
                    winningPlayer
                };
        }
        }

        // check diagonal 2
        if (board[2][0] === board[1][1]) {
            // check next
            if (board[2][0] === board[0][2]) {
                winCondition = true;
                winningPlayer = board[1][1].getValue().name;
                return {
                    winCondition,
                    winningPlayer
                };
            }
        }
        
        return {
            winCondition,
            winningPlayer
        };
    }

    return {
        getBoard,
        markSquare,
        printBoard,
        checkWin
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
            endGame = board.checkWin();
            if (endGame.winCondition === true) {
                console.log(`${endGame.winningPlayer} wins!`);
                return;
            }
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