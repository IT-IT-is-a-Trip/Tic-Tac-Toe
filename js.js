//модуль игрового поля:
const GameBoard = (function () {
    let gameBoard = [
        '', '', '',
        '', '', '',
        '', '', ''];
    const getBoard = () => gameBoard;
    const markCell = (index, mark) => { gameBoard[index] = !gameBoard[index] ? mark : gameBoard[index] };
    const resetBoard = () => gameBoard = [
        '', '', '',
        '', '', '',
        '', '', ''];
    return {
        getBoard,
        markCell,
        resetBoard
    }
})();
//контроллер игры:
const gameController = function (
    playerOneName = 'Player one (X)',
    playerTwoName = 'Player two (O)') {
    let board = GameBoard.getBoard();
    let gameEnded = false
    const players = [
        {
            name: playerOneName,
            symbol: "X",
            winRound: false,
            wins: 0
        },
        {
            name: playerTwoName,
            symbol: 'O',
            winRound: false,
            wins: 0
        }
    ];
    let activePlayer = players[0] //активный игрок по умолчанию

    const getActivePlayer = () => activePlayer; //показывает активного игрока

    //создаёт объект из побед игроков и возвращает различные значения в зависимости от аргумента:
    const getPlayersWins = (player = 'all') => {
        const wins = {
            playerX: players[0].wins,
            playerO: players[1].wins
        }
        //возвращает число побед первого игрок
        if (player == 1) {return wins.playerX}
        //возвращает число побед второго игрока
        else if (player == 2) {return wins.playerO}
        //возвращает объект wins
        else if (player === 'all') {return wins}
        //сообщение об ошибке
        else {return " Enter 1 or 2 or all as argument "};
    }

    //смена игрока:
    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const printRoundDetails = () => {
        //создаёт "интерфейс" в консоли:
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
        if (index === '') { return };
        if (gameEnded) {
            return;
        }
        let playerMark = activePlayer.symbol; // метка активного игрока
        //заполнение ячейки меткой активного игрока:
        if (board[index]) {
            return;
        } else { GameBoard.markCell(index, playerMark) };
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
                    activePlayer.winRound = true;
                    activePlayer.wins++;
                    return;
                }
            }
            for (const i of board) {
                if (!i) return switchPlayer();
            }
            gameEnded = true;
            activePlayer.winRound = 'Tie';
            printRoundDetails();
            return console.log(`It's tie`);
        };
        checkWinner();
        printRoundDetails();
    }
    printRoundDetails();
    //метод сброса игры:
    const resetGame = () => {
        //очистка игрового поля:
        GameBoard.resetBoard();
        gameEnded = false;
        board = GameBoard.getBoard();
        //две строчки ниже вызывали баг: при победе второго игрока и рестарта игры, его статус не менялся на false.
        //пофиксил поменяв эти строчки местами xD
        activePlayer.winRound = false;
        activePlayer = players[0];
        printRoundDetails();
    }
    return {
        players,
        getPlayersWins,
        playRound,
        getActivePlayer,
        resetGame
    }
}
const game = gameController();



//UI
const screenController = (function () {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-button')
    //обновляет UI игрового поля:
    const updateGameboard = () => {
        const board = GameBoard.getBoard();
        for (let i = 0; i < board.length; i++) {
            cells[i].textContent = board[i];
            getCurrentPlayer(); 
            showWinner();
        }
    }
    const makeMove = () => {
        cells.forEach((cell, index) => {
            cells[index].addEventListener('click', () => {
                game.playRound(index);
                updateGameboard();
                showWinner();
            })
        })
    };
    const resetBoard = () => {
        game.resetGame();
        updateGameboard();
    }

    
    //вывод текущего игрока:
    const getCurrentPlayer = () => {
        let currentPlayerName = game.getActivePlayer().name
        const playerBar = document.getElementById('player-bar');
        playerBar.textContent = `${currentPlayerName} round`;
        return game.getActivePlayer().name;
    }

    //вывод сообщения о победе/ничье:
    const showWinner = () => {
        const activePlayer = game.getActivePlayer().name;
        const playerWinStatus = game.getActivePlayer().winRound;
        const modal = document.getElementById('end-game-modal');
        const endGameMessage = document.getElementById('end-game-message');
        if (playerWinStatus) {
            if (playerWinStatus === 'Tie') {
            endGameMessage.textContent = 'It`s tie';
        } else {endGameMessage.textContent = `${activePlayer} wins!`}
        modal.showModal();
        showWinnersSideBar();
    }
    }
    //кнопка рестарта игры в диаологовом окне:
    const restartGameButton = document.getElementById('restart-game');
    restartGameButton.addEventListener('click', () => {
        const modal = document.getElementById('end-game-modal');
        modal.close();
        resetBoard();
    });

    const showWinnersSideBar = () => {
        const player1 = document.getElementById('player-1-wins');
        const player2 = document.getElementById('player-2-wins');
        player1.textContent = game.getPlayersWins(1);
        player2.textContent = game.getPlayersWins(2);
    }
    resetButton.addEventListener('click', resetBoard)
    updateGameboard();
    makeMove();
})();