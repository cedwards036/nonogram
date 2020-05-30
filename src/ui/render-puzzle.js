const STATES = require('../puzzle.js').STATES

function clearPuzzle() {
    clearChildren(document.getElementById('cellGrid'));
    clearChildren(document.getElementById('colCountGroups'));
    clearChildren(document.getElementById('rowCountGroups'));
}

function renderPuzzle(puzzle) {
    renderCellGrid(puzzle);
    renderRowCounts(puzzle);
    renderColCounts(puzzle);
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

function clearChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

function createCountDiv(count) {
    const countDiv = document.createElement('div');
    countDiv.textContent = count;
    countDiv.setAttribute('class', 'count');
    return countDiv;
}

module.exports = {
    renderPuzzle: renderPuzzle,
    clearPuzzle: clearPuzzle,
    renderRowCounts: renderRowCounts,
    renderColCounts: renderRowCounts,
    updateCountGroupDiv: updateCountGroupDiv,
    updateCellStateClass: updateCellStateClass,
    getCellClass: getCellClass
}