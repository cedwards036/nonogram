const interactWithCell = require('../game.js').interactWithCell
const updateColumnCounts = require('../game.js').updateColumnCounts;
const updateRowCounts = require('../game.js').updateRowCounts;
const MESSAGES = require('../game.js').MESSAGES
const updateLineCountsColumnDiv = require('./render-game.js').updateLineCountsColumnDiv;
const updateCellStateClass = require('./render-game.js').updateCellStateClass
const getCellClass = require('./render-game.js').getCellClass;
const updateGameURL = require('./render-game-url.js').updateGameURL;

function addCellEventListeners(game) {
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

module.exports = {
    addCellEventListeners: addCellEventListeners
}