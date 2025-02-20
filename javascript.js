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
        let changeTurns = false;
        let endGame = false;
        let tieGame = false;

        if (board[row][column].getValue() === '') {
            console.log(`adding mark "${player.markSymbol}" to (${row}, ${column})`);
            board[row][column].addMark(player.markSymbol);
            document.querySelector(`[index="${row}${column}"]`).textContent = player.markSymbol;
            changeTurns = true;
            endGame = checkWin();
            tieGame = checkTie();
            return {
                changeTurns,
                endGame,
                tieGame
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
        
        // check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0].getValue() == board[i][1].getValue() &&
                board[i][0].getValue() == board[i][2].getValue() &&
                board[i][0].getValue() !== '') {
                    winCondition = true;
                }
        }

        for (let j = 0; j < 3; j++) {
            if (board[0][j].getValue() == board[1][j].getValue() &&
                board[0][j].getValue() == board[2][j].getValue() &&
                board[0][j].getValue() !== '') {
                    winCondition = true;
                }
        }

        // check diagonal 1
        if (board[0][0].getValue() == board[1][1].getValue() &&
            board[0][0].getValue() == board[2][2].getValue() &&
            board[0][0].getValue() !== '') {
                winCondition = true;
        }

        // check diagonal 2
        if (board[2][0].getValue() == board[1][1].getValue() &&
        board[2][0].getValue() == board[0][2].getValue() &&
        board[2][0].getValue() !== '') {
            winCondition = true;
        }
        
        return winCondition;
    }

    const checkTie = () => {

        let row1Blank = board[0].filter((square) => square.getValue().length == 0);
        let row2Blank = board[1].filter((square) => square.getValue().length == 0);
        let row3Blank = board[2].filter((square) => square.getValue().length == 0);

        console.log(row1Blank.length);

        if (row1Blank.length + row2Blank.length + row3Blank.length == 0) {
            return true;
        } else return false;

    }

    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                board[i][j] = square();
            }
        }
    }


    return {
        getBoard,
        markSquare,
        printBoard,
        resetBoard
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

    const playRound = (row, column) => {
        let postRound = board.markSquare(row, column, getActivePlayer());
        if (postRound.endGame == true) {
            board.printBoard();
            console.log(`Game over! ${getActivePlayer().name} wins!`);
            board.resetBoard();
            printNewRound();
        } else if (postRound.tieGame == true) {
            board.printBoard();
            console.log('Game over! Tie!');
            board.resetBoard();
            printNewRound();
        } else if (postRound.changeTurns == true) {
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

// UI

let game = gameController();

const gameContainer = document.querySelector(".gameContainer");

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        const square = document.createElement("div");
        square.setAttribute('class', `gameSquare row${i} col${j}`);
        square.setAttribute('index', `${i}${j}`);
        // square.setAttribute('col', `${j}`);
        square.textContent = "square";
        gameContainer.appendChild(square);

        square.addEventListener("click", () => {
            const row = document.querySelector(`[index="${i}${j}"]`).getAttribute('index').substring(0,1);
            const col = document.querySelector(`[index="${i}${j}"]`).getAttribute('index').substring(1,2);
            game.playRound(row, col);
        });
    }
}

const newGameButton = document.querySelector('#newGameButton');

newGameButton.addEventListener('click', () => {
    game = gameController();
})