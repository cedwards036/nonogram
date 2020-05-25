const generateCreationGame = require('./board.js').generateCreationGame
const interactWithCell = require('./board.js').interactWithCell
const updateColumnCounts = require('./board.js').updateColumnCounts;
const updateRowCounts = require('./board.js').updateRowCounts;
const makeGameURLComponent = require('./board-url.js').makeGameURLComponent;
const STATES = require('./board.js').STATES
const MESSAGES = require('./board.js').MESSAGES

const MAX_DIMENSION = 15;
const MIN_DIMENSION = 1;
const DEFAULT_DIMENSION = 5;

updateGameURL(createGame(DEFAULT_DIMENSION, DEFAULT_DIMENSION));

document.getElementById('xDimensionInput').defaultValue = DEFAULT_DIMENSION;
document.getElementById('yDimensionInput').defaultValue = DEFAULT_DIMENSION;
document.getElementById('dimensionsForm').onsubmit = setDimensions;

function setDimensions() {
    const height = document.getElementById('yDimensionInput').value;
    const width = document.getElementById('xDimensionInput').value;
    if (isValidDimension(height, MAX_DIMENSION, MIN_DIMENSION) && 
            isValidDimension(width, MAX_DIMENSION, MIN_DIMENSION)) {
        clearGame();
        updateGameURL(createGame(width, height));
    } else {
        document.getElementById('yDimensionInput').value = document.getElementById('rowCounts').childElementCount;
        document.getElementById('xDimensionInput').value = document.getElementById('colCounts').childElementCount;
        alert('ERROR: invalid dimensions');
    }
    return false;
}

function isValidDimension(value, max, min) {
    return isInt(value) && value >= min && value <= max;
}

//https://stackoverflow.com/a/1779019
function isInt(value) {
    return /^\d+$/.test(value);
}


function createGame(height, width) {
    const newGame = generateCreationGame(height, width);
    renderGame(newGame);

    Array.from(document.getElementsByClassName('cell')).forEach(cell => {
        cell.addEventListener('click', () => {
            handleCellClick(newGame, cell, MESSAGES.FILL)
        });
    }); 

    Array.from(document.getElementsByClassName('cell')).forEach(cell => {
        cell.addEventListener('contextmenu', (e) => {
            handleCellClick(newGame, cell, MESSAGES.BLANK)
            e.preventDefault();
        });
    }); 
    return newGame;
}

function clearGame() {
    document.getElementById('cellGrid').innerHTML = '';
    document.getElementById('colCounts').innerHTML = '';
    document.getElementById('rowCounts').innerHTML = '';
}

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
    updateGameURL(game);
}

function updateColumnCountDivs(game, colIdx) {
    updateColumnCounts(game, colIdx);
    const colCountsDiv = getNthColumnCountsCol(colIdx);
    updateLineCountsColumnDiv(colCountsDiv, game.colCounts[colIdx]);
}

function getNthColumnCountsCol(n) {
    return document.getElementById('colCounts')
                   .getElementsByClassName('counts-col')[n];
}

function updateRowCountDivs(game, rowIdx) {
    updateRowCounts(game, rowIdx);
    const rowCountsDiv = getNthRowCountsCol(rowIdx);
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

function updateGameURL(game) {
    document.getElementById('gameURL').textContent = makeGameURL(game);
}

function makeGameURL(game) {
    return window.location.href + '/' + makeGameURLComponent(game);
}