const cells = document.querySelectorAll('.cell');
const playerScoreElement = document.querySelector('#player-score');
const computerScoreElement = document.querySelector('#computer-score');
const resetButton = document.querySelector('#reset-button');
const gameOverMessage = document.querySelector('#game-over-message');

let playerScore = 0;
let computerScore = 0;
let currentPlayer = 'X';
let gameIsOver = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function resetGame() {
  currentPlayer = 'X';
  gameIsOver = false;
  gameOverMessage.innerHTML = '';
  cells.forEach(cell => {
    cell.innerHTML = '';
    cell.removeEventListener('click', handleCellClick);
    cell.addEventListener('click', handleCellClick, { once: true });
  });
}
function handleCellClick(e) {
    if (gameIsOver) return;
    const cell = e.target;
    cell.innerHTML = currentPlayer;
    if (checkForWin()) {
      gameIsOver = true;
      gameOverMessage.innerHTML = `${currentPlayer} wins!`;
      if (currentPlayer === 'X') {
        playerScore++;
        playerScoreElement.innerHTML = `Player: ${playerScore}`;
      } else {
        computerScore++;
        computerScoreElement.innerHTML = `Computer: ${computerScore}`;
      }
    } else if (checkForDraw()) {
      gameIsOver = true;
      gameOverMessage.innerHTML = 'Draw!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (currentPlayer === 'O') {
        // simulate computer move after a short delay
        setTimeout(() => {
          const emptyCells = Array.from(cells).filter(cell => cell.innerHTML === '');
          const randomIndex = Math.floor(Math.random() * emptyCells.length);
          emptyCells[randomIndex].click();
        }, 500);
      }
    }
  }
  

function checkForWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].innerHTML === currentPlayer;
    });
  });
}

function checkForDraw() {
  return [...cells].every(cell => {
    return cell.innerHTML !== '';
  });
}

resetGame();

resetButton.addEventListener('click', resetGame);