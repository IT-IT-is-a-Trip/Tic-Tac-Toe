const GameBoard = (function () {
    let gameBoard = [
        '', '', '',
        '', '', '',
        '', '', ''];
    const getBoard = () => gameBoard;
    const markCell = (index, mark) => { gameBoard[index] = !gameBoard[index] ? mark : gameBoard[index] };
    const resetBoard = () => gameBoard = ['', '', '', '', '', '', '', '', ''];
    return {
        getBoard,
        markCell,
        resetBoard
    }
})();
const gameController = function (
    playerOneName = 'Player one (X)',
    playerTwoName = 'Player two (O)') {
    let board = GameBoard.getBoard();
    let gameEnded = false
    const players = [
        {
            name: playerOneName,
            symbol: "X",
            wins: 0
        },
        {
            name: playerTwoName,
            symbol: 'O',
            wins: 0
        }
    ];
    let activePlayer = players[0] //активный игрок по умолчанию

    const getActivePlayer = () => activePlayer; //показывает активного игрока

    //смена игрока:
    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const printRoundDetails = () => {
        //создаёт "интерфейс" в консоли
        console.log(`
            ${board[0]} | ${board[1]} | ${board[2]}
           ---------
            ${board[3]} | ${board[4]} | ${board[5]}
           ---------
            ${board[6]} | ${board[7]} | ${board[8]}
           `);
        if (!gameEnded) {
            console.log(`${getActivePlayer().name}'s turn`);
        }
    }

    const playRound = (index) => {
        if (gameEnded) {
            console.log(`${activePlayer.name} won`);
            return;
        }
        let playerMark = activePlayer.symbol; // метка активного игрока
        //заполнение ячейки меткой активного игрока:
        if (board[index]) {
            return;
        } else {GameBoard.markCell(index, playerMark)};
        //проверка победителя или ничьи по паттернам.

        const checkWinner = () => {
            if (gameEnded) {
                console.log(`${activePlayer.name} won`);
                return;
            };
            const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (board[a] && board[a] == board[b] && board[a] === board[c]) {
                    gameEnded = true;
                    console.log(`${activePlayer.name} won`);
                    activePlayer.wins++;
                    return;
                }
            }
            for (const i of board) {
                if (!i) return switchPlayer();
            }
            gameEnded = true;
            printRoundDetails();
            return console.log(`I's tie`);
        };
        checkWinner();
        printRoundDetails();
    }
    printRoundDetails();
    const resetGame = () => {
        GameBoard.resetBoard();
        gameEnded = false;
        board = GameBoard.getBoard();
        activePlayer = players[0];
        printRoundDetails();
    }
    return {
        playRound,
        getActivePlayer,
        resetGame
    }
}
const game = gameController();