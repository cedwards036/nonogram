const interactWithCell = require('../puzzle.js').interactWithCell
const updateColumnCountGroup = require('../puzzle.js').updateColumnCountGroup;
const updateRowCountGroup = require('../puzzle.js').updateRowCountGroup;
const puzzleIsSolved = require('../puzzle.js').puzzleIsSolved;
const MESSAGES = require('../puzzle.js').MESSAGES
const updateCountGroupDiv = require('./render-puzzle.js').updateCountGroupDiv;
const updateCellStateClass = require('./render-puzzle.js').updateCellStateClass
const getCellClass = require('./render-puzzle.js').getCellClass;
const updatePuzzleURL = require('./render-puzzle-url.js').updatePuzzleURL;

function addCreationCellEventListeners(puzzle) {
    var mouseIsDown = false;
    Array.from(document.getElementsByClassName('cell')).forEach(cell => {
        cell.addEventListener('mousedown', (e) => {
            e.preventDefault();
            handleCreationCellClick(puzzle, cell, MESSAGES.FILL);
            mouseIsDown = true;
        });
        cell.addEventListener('mouseenter', () => {
            if (mouseIsDown) {
                handleCreationCellClick(puzzle, cell, MESSAGES.FILL);
            }
        });
    }); 
    const puzzleDiv = document.getElementById('puzzle');
    puzzleDiv.addEventListener('mouseleave', () => {
        mouseIsDown = false;
    });
    puzzleDiv.addEventListener('mouseup', () => {
        mouseIsDown = false;
    });
    puzzleDiv.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
}

function addSolveCellEventListeners(puzzle) {
    var leftMouseIsDown = false;
    var rightMouseIsDown = false;
    Array.from(document.getElementsByClassName('cell')).forEach(cell => {
        cell.addEventListener('mousedown', (e) => {
            e.preventDefault();
            if (e.button == 0) {
                handleSolveCellClick(puzzle, cell, MESSAGES.FILL);
                leftMouseIsDown = true;
            } else if (e.button == 2) {
                handleSolveCellClick(puzzle, cell, MESSAGES.BLANK);
                rightMouseIsDown = true;
            }
        });
        cell.addEventListener('mouseenter', (e) => {
            if (leftMouseIsDown) {
                handleSolveCellClick(puzzle, cell, MESSAGES.FILL);
            } else if (rightMouseIsDown) {
                handleSolveCellClick(puzzle, cell, MESSAGES.BLANK);
            }
        });
    }); 
    const puzzleDiv = document.getElementById('puzzle');
    puzzleDiv.addEventListener('mouseleave', () => {
        leftMouseIsDown = false;
        rightMouseIsDown = false;
    });
    puzzleDiv.addEventListener('mouseup', () => {
        leftMouseIsDown = false;
        rightMouseIsDown = false;
    });
    puzzleDiv.addEventListener('contextmenu', (e) => {
        e.preventDefault();
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
    updateColumnCountGroup(puzzle, colIdx);
    const colCountGroupsDiv = getNthColumnCountsCol(colIdx);
    updateCountGroupDiv(colCountGroupsDiv, puzzle.colCountGroups[colIdx]);
}

function getNthColumnCountsCol(n) {
    return document.getElementById('colCountGroups')
                   .getElementsByClassName('count-group')[n];
}

function updateRowCountDivs(puzzle, rowIdx) {
    updateRowCountGroup(puzzle, rowIdx);
    const rowCountGroupsDiv = getNthRowCountsCol(rowIdx);
    updateCountGroupDiv(rowCountGroupsDiv, puzzle.rowCountGroups[rowIdx]);
}

function getNthRowCountsCol(n) {
    return document.getElementById('rowCountGroups')
                   .getElementsByClassName('count-group')[n];
}

module.exports = {
    addCreationCellEventListeners: addCreationCellEventListeners,
    addSolveCellEventListeners: addSolveCellEventListeners
}