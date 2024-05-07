// Get references to HTML elements
const board = document.getElementById('board'); // The tic-tac-toe board
const resetButton = document.getElementById('reset'); // The reset button
const resultDisplay = document.getElementById('result'); // The section to display game result

// Initialize game state variables
let currentPlayer = 'X'; // Tracks current player ('X' or 'O')
let cells = ['', '', '', '', '', '', '', '', '']; // Represents the state of each cell on the board

// Function to render the tic-tac-toe board
function renderBoard() {
  // Clear the board
  board.innerHTML = '';
  // Loop through each cell in the cells array
  cells.forEach((value, index) => {
    // Create a new cell element
    const cell = document.createElement('div');
    cell.classList.add('cell'); // Add 'cell' class for styling
    cell.textContent = value; // Set the text content of the cell to 'X', 'O', or ''
    // Add a click event listener to handle cell clicks
    cell.addEventListener('click', () => handleCellClick(index));
    // Append the cell to the board
    board.appendChild(cell);
  });
}

// Function to handle cell clicks
function handleCellClick(index) {
  // Check if the clicked cell is empty and there is no winner yet
  if (cells[index] === '' && !checkWinner()) {
    // Set the value of the clicked cell to the current player
    cells[index] = currentPlayer;
    // Render the updated board
    renderBoard();
    // Check for a winner after each move
    if (checkWinner()) {
      // If there's a winner, display the winner
      resultDisplay.textContent = currentPlayer + ' wins!';
    } else if (!cells.includes('')) {
      // If the board is full and there's no winner, it's a draw
      resultDisplay.textContent = 'It\'s a draw!';
    } else {
      // Switch to the next player
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

// Function to check for a winner
function checkWinner() {
  // Define winning combinations
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // Loop through each winning combination
  for (let condition of winConditions) {
    // Destructure the winning combination into variables a, b, and c
    const [a, b, c] = condition;
    // Check if all cells in the winning combination are occupied by the same player
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return true; // Return true if there's a winner
    }
  }
  return false; // Return false if there's no winner
}

// Function to reset the game
function resetGame() {
  // Reset game state variables
  cells = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  // Render the initial board
  renderBoard();
  // Clear the game result display
  resultDisplay.textContent = '';
}

// Add event listener to the reset button to reset the game when clicked
resetButton.addEventListener('click', resetGame);

// Render the initial board
renderBoard();
