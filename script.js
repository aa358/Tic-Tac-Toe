const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
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

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !isGameActive()) {
        return;
    }

    // Update game state and UI
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer);

    // Check for a winner
    const winningCombination = checkForWinner();
    if (winningCombination) {
        // Highlight the winning cells
        highlightWinningCells(winningCombination);
        // Delay the winner announcement to allow the UI to update
        setTimeout(() => {
            alert(`Player ${currentPlayer} has won!`);
            resetGame();
        }, 10); // Small delay to ensure the UI updates
    } else if (isBoardFull()) {
        setTimeout(() => {
            alert('Game is a draw!');
            resetGame();
        }, 10);
    } else {
        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkForWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return condition; // Return the winning combination
        }
    }
    return null; // No winner yet
}

function highlightWinningCells(winningCombination) {
    winningCombination.forEach(index => {
        cells[index].classList.add('winning-cell');
    });
}

function isBoardFull() {
    return gameState.every(cell => cell !== '');
}

function isGameActive() {
    return !checkForWinner() && !isBoardFull();
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'winning-cell');
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});