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
        let changeTurns = true;
                
        if (board[row][column].getValue() === '') {
            console.log(`adding mark "${player.markSymbol}" to (${row}, ${column})`);
            board[row][column].addMark(player.markSymbol);
            changeTurns = true;
            const endGameCheck = checkWin();
            // console.log({endGameCheck});
            return {
                changeTurns,
                endGameCheck
            };
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
        let winningMark = "";
        
        console.log(`value at 0,0 ${board[0][0].getValue()}`);

        //come back to this logic, ensure nothing is all blank for win

        // check rows
        for (let i = 0; i < board.length; i++) {
            if (board[i][0].getValue() === '') {
                // nothing
            } else if (board[i][0].getValue() === board[i][1].getValue()) {
                // check next row
                if (board[i][0].getValue() === board[i][2].getValue()) {
                    // win!
                    winCondition = true;
                    winningMark = board[i][0].getValue();
                }
            }
        }

        // check columns
        for (let j = 0; j < board[0].length; j++) {
            if (board[0][j].getValue() === '') {
                // nothing
            } else if (board[0][j].getValue() === board[1][j].getValue()) {
                //check next column
                if (board[0][j].getValue() === board[2][j].getValue()) {
                    winCondition = true;
                    winningMark = board[0][j].getValue();
                }
            }
        }

        // check diagonal 1
        if (board[0][0].getValue() === "") {
            // nothing
        } else if (board[0][0].getValue() === board[1][1].getValue()) {
            // check next
            if (board[0][0].getValue() === board[2][2].getValue()) {
                winCondition = true;
                winningMark = board[1][1].getValue();
            }
        }

        // check diagonal 2
        if (board[2][0].getValue() === board[1][1].getValue()) {
            // check next
            if (board[2][0].getValue() === board[0][2].getValue()) {
                winCondition = true;
                winningMark = board[1][1].getValue();
            }
        }
        
        return {
            winCondition,
            winningPlayer: winningMark
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

    // let changeTurnAfterRound = true;
    const playRound = (row, column) => {
        let changeTurnAfterRound = board.markSquare(row, column, getActivePlayer());
        // console.log({changeTurnAfterRound});
        console.log(changeTurnAfterRound.endGameCheck.winCondition);
        if (changeTurnAfterRound.endGameCheck.winCondition === true) {
            board.printBoard();
            console.log(`Game over! ${changeTurnAfterRound.endGameCheck.winningPlayer} wins!`);
        } else if (changeTurnAfterRound.changeTurns === true) {
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