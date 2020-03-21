const generateCreationBoard = require('./board.js').generateCreationBoard
const interactWithCell = require('./board.js').interactWithCell
const STATES = require('./board.js').STATES
const MESSAGES = require('./board.js').MESSAGES

const board = generateCreationBoard(5, 5);
renderBoard(board);

Array.from(document.getElementsByClassName('cell')).forEach(cell => {
    cell.addEventListener('click', () => {
        handleCellClick(cell, MESSAGES.FILL)
    });
}); 

Array.from(document.getElementsByClassName('cell')).forEach(cell => {
    cell.addEventListener('contextmenu', (e) => {
        handleCellClick(cell, MESSAGES.BLANK)
        e.preventDefault();
    });
}); 

function renderBoard(board) {
    const grid = document.getElementById('cellGrid');
    for (let i = 0; i < board.length; i++) {
        const row = createEmptyRow();
        for (let j = 0; j < board[i].length; j++) {
            row.appendChild(createCell(board, i, j));
        }
        grid.appendChild(row);
    }
}

function createEmptyRow() {
    const row = document.createElement('div');
    row.setAttribute('class', 'row');
    return row;
}

function createCell(board, rowIdx, colIdx) {
    const cell = document.createElement('div');
    updateCellStateClass(cell, getCellClass(board[rowIdx][colIdx]));
    cell.setAttribute('rowIdx', rowIdx);
    cell.setAttribute('colIdx', colIdx);
    return cell;
}

function getCellClass(cellState) {
    switch(cellState) {
        case STATES.EMPTY:
            return 'empty-cell'
        case STATES.FILLED:
            return 'filled-cell'
        case STATES.BLANK:
            return 'blank-cell'        
    }
}

function updateCellStateClass(cell, stateClass) {
    cell.setAttribute('class', 'cell ' + stateClass);
}

function handleCellClick(cell, message) {
    const rowIdx = cell.getAttribute('rowIdx');
    const colIdx = cell.getAttribute('colIdx');
    interactWithCell(message, rowIdx, colIdx, board);
    updateCellStateClass(cell, getCellClass(board[rowIdx][colIdx]));
}
