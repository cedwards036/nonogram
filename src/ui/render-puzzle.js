const STATES = require('../puzzle.js').STATES

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
    createCountsCollection(puzzle.rowCounts, document.getElementById('rowCounts'));
}

function renderColCounts(puzzle) {
    createCountsCollection(puzzle.colCounts, document.getElementById('colCounts'));
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
    updateLineCountsColumnDiv: updateLineCountsColumnDiv,
    updateCellStateClass: updateCellStateClass,
    getCellClass: getCellClass
}