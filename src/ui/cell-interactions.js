const interactWithCell = require('../puzzle.js').interactWithCell
const updateColumnCounts = require('../puzzle.js').updateColumnCounts;
const updateRowCounts = require('../puzzle.js').updateRowCounts;
const puzzleIsSolved = require('../puzzle.js').puzzleIsSolved;
const MESSAGES = require('../puzzle.js').MESSAGES
const updateLineCountsColumnDiv = require('./render-puzzle.js').updateLineCountsColumnDiv;
const updateCellStateClass = require('./render-puzzle.js').updateCellStateClass
const getCellClass = require('./render-puzzle.js').getCellClass;
const updatePuzzleURL = require('./render-puzzle-url.js').updatePuzzleURL;

function addCreationCellEventListeners(puzzle) {
    Array.from(document.getElementsByClassName('cell')).forEach(cell => {
        cell.addEventListener('click', () => {
            handleCreationCellClick(puzzle, cell, MESSAGES.FILL)
        });
    }); 
}

function addSolveCellEventListeners(puzzle) {
    Array.from(document.getElementsByClassName('cell')).forEach(cell => {
        cell.addEventListener('click', () => {
            handleSolveCellClick(puzzle, cell, MESSAGES.FILL)
        });
        cell.addEventListener('contextmenu', (e) => {
            handleSolveCellClick(puzzle, cell, MESSAGES.BLANK)
            e.preventDefault();
        });
    }); 
}

function handleSolveCellClick(puzzle, cell, message) {
    const rowIdx = cell.getAttribute('rowIdx');
    const colIdx = cell.getAttribute('colIdx');
    interactWithCell(message, rowIdx, colIdx, puzzle);
    updateCellStateClass(cell, getCellClass(puzzle.board[rowIdx][colIdx]));
    if (puzzleIsSolved(puzzle)) {
        alert('You did it!')
    }
}

function handleCreationCellClick(puzzle, cell, message) {
    const rowIdx = cell.getAttribute('rowIdx');
    const colIdx = cell.getAttribute('colIdx');
    interactWithCell(message, rowIdx, colIdx, puzzle);
    updateColumnCountDivs(puzzle, colIdx);
    updateRowCountDivs(puzzle, rowIdx);
    updateCellStateClass(cell, getCellClass(puzzle.board[rowIdx][colIdx]));
    updatePuzzleURL(puzzle);
}

function updateColumnCountDivs(puzzle, colIdx) {
    updateColumnCounts(puzzle, colIdx);
    const colCountsDiv = getNthColumnCountsCol(colIdx);
    updateLineCountsColumnDiv(colCountsDiv, puzzle.colCounts[colIdx]);
}

function getNthColumnCountsCol(n) {
    return document.getElementById('colCounts')
                   .getElementsByClassName('counts-col')[n];
}

function updateRowCountDivs(puzzle, rowIdx) {
    updateRowCounts(puzzle, rowIdx);
    const rowCountsDiv = getNthRowCountsCol(rowIdx);
    updateLineCountsColumnDiv(rowCountsDiv, puzzle.rowCounts[rowIdx]);
}

function getNthRowCountsCol(n) {
    return document.getElementById('rowCounts')
                   .getElementsByClassName('counts-col')[n];
}

module.exports = {
    addCreationCellEventListeners: addCreationCellEventListeners,
    addSolveCellEventListeners: addSolveCellEventListeners
}