const GameBoard = (function () {
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    const getBoard = () => gameBoard;
    const markCell = (index, mark) => { gameBoard[index] = mark };
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
    const players = [
        {
            name: playerOneName,
            symbol: "X",
        },
        {
            name: playerTwoName,
            symbol: 'O',
        }
    ];
    let activePlayer = players[0] //активный игрок по умолчанию

    const getActivePlayer = () => activePlayer; //показывает активного игрока

    //смена игрока:
    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const printRoundDetails = () => {
        console.log(GameBoard.getBoard());
        console.log(`${getActivePlayer().name}'s turn`);
    }
    const playRound = (index) => {
        let playerMark = activePlayer.symbol; // метка активного игрока
        printRoundDetails();
        GameBoard.markCell(index, playerMark);
        switchPlayer();
        printRoundDetails();
    }
    return {
        playRound,
        getActivePlayer
    }
}
const game = gameController();
//победные комбинации: 012 345 678 036 147 258 048 246