const generateCreationGame = require('./board.js').generateCreationGame
const interactWithCell = require('./board.js').interactWithCell
const STATES = require('./board.js').STATES
const MESSAGES = require('./board.js').MESSAGES

const game = generateCreationGame(5, 5);
renderGame(game);

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

function renderGame(game) {
    renderCellGrid(game);
    renderRowCounts(game);
    renderColCounts(game);
}

function renderCellGrid(game) {
    const grid = document.getElementById('cellGrid');
    for (let i = 0; i < game.board.length; i++) {
        const row = createEmptyRow();
        for (let j = 0; j < game.board[i].length; j++) {
            row.appendChild(createCell(game.board, i, j));
        }
        grid.appendChild(row);
    }
}

function renderRowCounts(game) {
    createCountsCollection(game.rowCounts, document.getElementById('rowCounts'));
}

function renderColCounts(game) {
    createCountsCollection(game.colCounts, document.getElementById('colCounts'));
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
    interactWithCell(message, rowIdx, colIdx, game);
    updateCellStateClass(cell, getCellClass(game.board[rowIdx][colIdx]));
}

function createCountsCollection(counts, parentDiv) {
    counts.forEach(countNode => {
        parentDiv.appendChild(createCountsColumn(countNode));
    });
    return parentDiv;
}

function createCountsColumn(headCountNode) {
    const countsCol = document.createElement('div');
    countsCol.setAttribute('class', 'counts-col');
    var curNode = headCountNode;
    while (curNode !== null) {
        countsCol.appendChild(createCountDiv(curNode));
        curNode = curNode.next;
    }
    return countsCol;
}

function createCountDiv(countNode) {
    const count = document.createElement('div');
    count.textContent = countNode.count;
    count.setAttribute('class', 'count');
    return count;
}
