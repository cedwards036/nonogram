const makeSingleContextInteraction = require('../puzzle.js').makeSingleContextInteraction;
const updateColumnCountGroup = require('../puzzle.js').updateColumnCountGroup;
const updateRowCountGroup = require('../puzzle.js').updateRowCountGroup;
const puzzleIsSolved = require('../puzzle.js').puzzleIsSolved;
const fillCell = require('../puzzle.js').fillCell;
const markCell = require('../puzzle.js').markCell;
const blankCell = require('../puzzle.js').blankCell;
const updateCountGroupDiv = require('./render-puzzle.js').updateCountGroupDiv;
const updateCellStateClass = require('./render-puzzle.js').updateCellStateClass
const getCellClass = require('./render-puzzle.js').getCellClass;
const updatePuzzleURL = require('./render-puzzle-url.js').updatePuzzleURL;

function addCreationCellEventListeners(puzzle) {
    addCellEventListeners(puzzle, makeCreationInteractionFunction, handleCreationCellClick);
}

function addSolveCellEventListeners(puzzle) {
    addCellEventListeners(puzzle, makeSolveInteractionFunction, handleSolveCellClick);
}

function addCellEventListeners(puzzle, interactionFunctionMaker, clickHandler) {
    let mouseIsDown = false;
    let interactionFunction = () => {};
    Array.from(document.getElementsByClassName('cell')).forEach(cell => {
        cell.addEventListener('mousedown', (e) => {
            e.preventDefault();
            interactionFunction = interactionFunctionMaker(puzzle, cell, e);
            clickHandler(puzzle, cell, interactionFunction);
            mouseIsDown = true;
        });
        cell.addEventListener('mouseenter', () => {
            if (mouseIsDown) {
                clickHandler(puzzle, cell, interactionFunction);
            }
        });
    }); 
    document.getElementsByTagName('body')[0].addEventListener('mouseup', () => {
        mouseIsDown = false;
    });
    document.getElementById('puzzle').addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
}

function handleSolveCellClick(puzzle, cell, interactionFunction) {
    const rowIdx = cell.getAttribute('rowIdx');
    const colIdx = cell.getAttribute('colIdx');
    interactionFunction(rowIdx, colIdx, puzzle);
    updateCellStateClass(cell, getCellClass(puzzle.board[rowIdx][colIdx]));
    if (puzzleIsSolved(puzzle)) {
        alert('You did it!')
    }
}

function handleCreationCellClick(puzzle, cell, interactionFunction) {
    const rowIdx = cell.getAttribute('rowIdx');
    const colIdx = cell.getAttribute('colIdx');
    interactionFunction(rowIdx, colIdx, puzzle);
    updateColumnCountDivs(puzzle, colIdx);
    updateRowCountDivs(puzzle, rowIdx);
    updateCellStateClass(cell, getCellClass(puzzle.board[rowIdx][colIdx]));
    updatePuzzleURL(puzzle);
}


function makeCreationInteractionFunction(puzzle, cell, event) {
    return makeCellInteractionFunction(puzzle, cell, fillCell);
}

function makeSolveInteractionFunction(puzzle, cell, event) {
    if (event.button == 0) {
        if (event.shiftKey) {
            return makeCellInteractionFunction(puzzle, cell, markCell);
        } else {
            return makeCellInteractionFunction(puzzle, cell, fillCell);
        }
    } else if (event.button == 2) {
        return makeCellInteractionFunction(puzzle, cell, blankCell);
    } else {
        return (rowIdx, colIdx, puzzle) => puzzle;
    }
}

function makeCellInteractionFunction(puzzle, cell, interaction) {
    const rowIdx = cell.getAttribute('rowIdx');
    const colIdx = cell.getAttribute('colIdx');
    return makeSingleContextInteraction(interaction, rowIdx, colIdx, puzzle);
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