const generateCreationGame = require('./board.js').generateCreationGame
const interactWithCell = require('./board.js').interactWithCell
const updateColumnCounts = require('../src/board.js').updateColumnCounts;
const updateRowCounts = require('../src/board.js').updateRowCounts;
const STATES = require('./board.js').STATES
const MESSAGES = require('./board.js').MESSAGES

const game = generateCreationGame(5, 5);
renderGame(game);

Array.from(document.getElementsByClassName('cell')).forEach(cell => {
    cell.addEventListener('click', () => {
        handleCellClick(game, cell, MESSAGES.FILL)
    });
}); 

Array.from(document.getElementsByClassName('cell')).forEach(cell => {
    cell.addEventListener('contextmenu', (e) => {
        handleCellClick(game, cell, MESSAGES.BLANK)
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

function handleCellClick(game, cell, message) {
    const rowIdx = cell.getAttribute('rowIdx');
    const colIdx = cell.getAttribute('colIdx');
    interactWithCell(message, rowIdx, colIdx, game);
    updateColumnCountDivs(game, colIdx);
    updateRowCountDivs(game, rowIdx);
    updateCellStateClass(cell, getCellClass(game.board[rowIdx][colIdx]));
}

function updateColumnCountDivs(game, colIdx) {
    updateColumnCounts(game, colIdx);
    const colCountsDiv = getNthColumnCountsCol(colIdx);
    console.log(colCountsDiv);
    updateLineCountsColumnDiv(colCountsDiv, game.colCounts[colIdx]);
}

function getNthColumnCountsCol(n) {
    return document.getElementById('colCounts')
                   .getElementsByClassName('counts-col')[n];
}

function updateRowCountDivs(game, rowIdx) {
    updateRowCounts(game, rowIdx);
    const rowCountsDiv = getNthRowCountsCol(rowIdx);
    console.log(rowCountsDiv);
    updateLineCountsColumnDiv(rowCountsDiv, game.rowCounts[rowIdx]);
}

function getNthRowCountsCol(n) {
    return document.getElementById('rowCounts')
                   .getElementsByClassName('counts-col')[n];
}

function createCountsCollection(counts, parentDiv) {
    counts.forEach(countsArr => {
        parentDiv.appendChild(createLineCountsColumnDiv(countsArr));
    });
    return parentDiv;
}

function createLineCountsColumnDiv(lineCountsColumn) {
    const columnDiv = document.createElement('div');
    columnDiv.setAttribute('class', 'counts-col');
    return updateLineCountsColumnDiv(columnDiv, lineCountsColumn);
}

function updateLineCountsColumnDiv(columnDiv, lineCountsColumn) {
    clearChildren(columnDiv);
    lineCountsColumn.forEach(count => {
        columnDiv.appendChild(createCountDiv(count));
    });
    return columnDiv;
}

function createCountDiv(count) {
    const countDiv = document.createElement('div');
    countDiv.textContent = count;
    countDiv.setAttribute('class', 'count');
    return countDiv;
}

function clearChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}
