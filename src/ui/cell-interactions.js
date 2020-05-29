const interactWithCell = require('../game.js').interactWithCell
const updateColumnCounts = require('../game.js').updateColumnCounts;
const updateRowCounts = require('../game.js').updateRowCounts;
const puzzleIsSolved = require('../game.js').puzzleIsSolved;
const MESSAGES = require('../game.js').MESSAGES
const updateLineCountsColumnDiv = require('./render-game.js').updateLineCountsColumnDiv;
const updateCellStateClass = require('./render-game.js').updateCellStateClass
const getCellClass = require('./render-game.js').getCellClass;
const updateGameURL = require('./render-game-url.js').updateGameURL;

function addCreationCellEventListeners(game) {
    Array.from(document.getElementsByClassName('cell')).forEach(cell => {
        cell.addEventListener('click', () => {
            handleCreationCellClick(game, cell, MESSAGES.FILL)
        });
    }); 
}

function addSolveCellEventListeners(game) {
    Array.from(document.getElementsByClassName('cell')).forEach(cell => {
        cell.addEventListener('click', () => {
            handleSolveCellClick(game, cell, MESSAGES.FILL)
        });
        cell.addEventListener('contextmenu', (e) => {
            handleSolveCellClick(game, cell, MESSAGES.BLANK)
            e.preventDefault();
        });
    }); 
}

function handleSolveCellClick(game, cell, message) {
    const rowIdx = cell.getAttribute('rowIdx');
    const colIdx = cell.getAttribute('colIdx');
    interactWithCell(message, rowIdx, colIdx, game);
    updateCellStateClass(cell, getCellClass(game.board[rowIdx][colIdx]));
    if (puzzleIsSolved(game)) {
        alert('You did it!')
    }
}

function handleCreationCellClick(game, cell, message) {
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

module.exports = {
    addCreationCellEventListeners: addCreationCellEventListeners,
    addSolveCellEventListeners: addSolveCellEventListeners
}