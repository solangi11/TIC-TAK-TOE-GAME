document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-btn');
    const messageElement = document.getElementById('message');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (event) => {
        const cell = event.target;
        const cellIndex = cell.getAttribute('data-index');

        if (board[cellIndex] !== '' || !isGameActive) {
            return;
        }

        updateCell(cell, cellIndex);
        checkForWinner();
    };

    const updateCell = (cell, index) => {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const checkForWinner = () => {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            isGameActive = false;
            messageElement.textContent = `Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
            return;
        }

        if (!board.includes('')) {
            isGameActive = false;
            messageElement.textContent = "It's a draw!";
        }
    };

    const resetGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        isGameActive = true;
        messageElement.textContent = '';
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
