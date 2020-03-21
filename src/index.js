const generateCreationBoard = require('../src/boardCreation.js').generateCreationBoard
renderBoard(generateCreationBoard(5, 5));

Array.from(document.getElementsByClassName('cell')).forEach(cell => {
    cell.addEventListener('click', () => {
        cell.classList.toggle('filled-cell');
    });
}); 

function renderBoard(board) {
    const grid = document.getElementById('cellGrid');
    for (let i = 0; i < board.length; i++) {
        const row = createEmptyRow();
        for (let j = 0; j < board[i].length; j++) {
            row.appendChild(createBlankCell());
        }
        grid.appendChild(row);
    }
}

function createEmptyRow() {
    const row = document.createElement('div');
    row.setAttribute('class', 'row');
    return row;
}

function createBlankCell() {
    const cell = document.createElement('div');
    cell.setAttribute('class', 'cell');
    return cell;
}
