const STATES = require('../puzzle.js').STATES;
const updatePuzzleURL = require('./render-puzzle-url.js').updatePuzzleURL;

function clearPuzzle() {
    clearChildren(document.getElementById('cellGrid'));
    clearChildren(document.getElementById('rowCountGroups'));
    clearChildren(document.getElementById('colCountGroups'));
}

function renderPuzzle(puzzle) {
    renderCellGrid(puzzle);
    renderRowCounts(puzzle);
    renderColCounts(puzzle);
}

function updateCreatePuzzle(puzzle) {
    updatePuzzle(puzzle);
    updatePuzzleURL(puzzle);
}

function updateSolvePuzzle(puzzle) {
    updatePuzzle(puzzle);
}

function updatePuzzle(puzzle) {
    updateRowCounts(puzzle);
    updateColCounts(puzzle);
    updateBoard(puzzle);
}

function updateRowCounts(puzzle) {
    clearChildren(document.getElementById('rowCountGroups'));
    renderRowCounts(puzzle);
}

function updateColCounts(puzzle) {
    clearChildren(document.getElementById('colCountGroups'));
    renderColCounts(puzzle);
}

function updateBoard(puzzle) {
    Array.from(document.getElementsByClassName('row')).forEach((row, rowIdx) => {
        Array.from(row.getElementsByClassName('cell')).forEach((cell, colIdx) => {
            updateCellStateClass(cell, getCellClass(puzzle.board[rowIdx][colIdx]));
        });
    });
}

function renderCellGrid(puzzle) {
    const grid = document.getElementById('cellGrid');
    for (let i = 0; i < puzzle.board.length; i++) {
        const row = createEmptyRow();
        for (let j = 0; j < puzzle.board[i].length; j++) {
            row.appendChild(createCell(puzzle.board, i, j));
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
            return 'empty-cell';
        case STATES.FILLED:
            return 'filled-cell';
        case STATES.BLANK:
            return 'blank-cell';
        case STATES.MARKED:
            return 'marked-cell';
    }
}

function updateCellStateClass(cell, stateClass) {
    cell.setAttribute('class', 'cell ' + stateClass);
}

function renderRowCounts(puzzle) {
    createCountsCollection(puzzle.rowCountGroups, document.getElementById('rowCountGroups'));
}

function renderColCounts(puzzle) {
    createCountsCollection(puzzle.colCountGroups, document.getElementById('colCountGroups'));
}

function createCountsCollection(countGroups, parentDiv) {
    countGroups.forEach(countGroup => {
        parentDiv.appendChild(createCountGroupDiv(countGroup));
    });
    return parentDiv;
}

function createCountGroupDiv(countGroup) {
    const countGroupDiv = document.createElement('div');
    countGroupDiv.setAttribute('class', 'count-group');
    return updateCountGroupDiv(countGroupDiv, countGroup);
}

function updateCountGroupDiv(countGroupDiv, countGroup) {
    clearChildren(countGroupDiv);
    countGroup.forEach(count => {
        countGroupDiv.appendChild(createCountDiv(count));
    });
    return countGroupDiv;
}

function setCountGroupDivSizes(puzzle) {
    const height = calculateDivSizeFromNumberOfCells(puzzle.board.length);
    const width = calculateDivSizeFromNumberOfCells(puzzle.board[0].length);
    document.getElementById('colCountGroups').style.height = `${height}px`;
    document.getElementById('rowCountGroups').style.width = `${width}px`;
}

function calculateDivSizeFromNumberOfCells(numOfCells) {
    const CELL_SIZE_IN_PX = 35;
    return Math.ceil(numOfCells / 2) * CELL_SIZE_IN_PX;
}

function clearChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

function createCountDiv(count) {
    const countDiv = document.createElement('div');
    countDiv.textContent = count.value;
    countDiv.setAttribute('class', 'count');
    return countDiv;
}

module.exports = {
    renderPuzzle: renderPuzzle,
    clearPuzzle: clearPuzzle,
    updateCreatePuzzle: updateCreatePuzzle,
    updateSolvePuzzle: updateSolvePuzzle,
    renderRowCounts: renderRowCounts,
    renderColCounts: renderRowCounts,
    setCountGroupDivSizes: setCountGroupDivSizes,
    updateCountGroupDiv: updateCountGroupDiv,
    updateCellStateClass: updateCellStateClass,
    getCellClass: getCellClass
}