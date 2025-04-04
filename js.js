const gameBoard = (function() {
    let gameBoard = ['','','','','','','','',''];
    const getBoard = () => gameBoard;
    const markCell = (index, mark) => {gameBoard[index] = mark};
    const resetBoard = () => gameBoard = ['','','','','','','','',''];
    return {
        getBoard,
        markCell,
        resetBoard
    }
})();
//победные комбинации: 012 345 678 036 147 258 048 246

