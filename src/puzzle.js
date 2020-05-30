const STATES = {
    EMPTY: 'empty',
    FILLED: 'filled',
    BLANK: 'blank'
}

const MESSAGES = {
    FILL: 'fill',
    BLANK: 'blank'
}

const FSM = buildFSM();

function generateSolvePuzzle(rowCounts, colCounts) {
    const board = generateEmptyBoard(colCounts.length, rowCounts.length);
    return {rowCounts: rowCounts, colCounts: colCounts, board: board};
}

function generateCreationPuzzle(width, height) {
    const puzzle = {rowCounts: [], colCounts: []};
    for (let i = 0; i < height; i++) {
        puzzle.rowCounts.push([0])
    }
    for (let i = 0; i < width; i++) {
        puzzle.colCounts.push([0])
    }
    puzzle.board = generateEmptyBoard(width, height);
    return puzzle;
}

function generateEmptyBoard(width, height) {
    if (width === 0 || height === 0) {
        return [];
    } else {
        let board = [];
        for (let i = 0; i < height; i++) {
            board.push([]);
            for (let j = 0; j < width; j++) {
                board[i].push(STATES.EMPTY)
            }
        }
        return board;
    }
}

function makePuzzleFrom2DArray(arr) {
    const puzzle = generateCreationPuzzle(arr[0].length, arr.length);
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === 1) {
                interactWithCell(MESSAGES.FILL, i, j, puzzle);
            }
        }
    }
    for (let i = 0; i < arr.length; i++) {
        updateRowCounts(puzzle, i);
    }
    for (let i = 0; i < arr[0].length; i++) {
        updateColumnCounts(puzzle, i);
    }
    return puzzle;
}

function buildFSM() {
    function addStateTransition(finiteStateMachine, givenState, message, newState) {
        if (!finiteStateMachine.hasOwnProperty(givenState)) {
            finiteStateMachine[givenState] = {};
        }
        finiteStateMachine[givenState][message] = newState
    }
    const finiteStateMachine = {};
    addStateTransition(finiteStateMachine, STATES.EMPTY, MESSAGES.FILL, STATES.FILLED);
    addStateTransition(finiteStateMachine, STATES.EMPTY, MESSAGES.BLANK, STATES.BLANK);
    addStateTransition(finiteStateMachine, STATES.FILLED, MESSAGES.FILL, STATES.EMPTY);
    addStateTransition(finiteStateMachine, STATES.FILLED, MESSAGES.BLANK, STATES.EMPTY);
    addStateTransition(finiteStateMachine, STATES.BLANK, MESSAGES.BLANK, STATES.EMPTY);
    addStateTransition(finiteStateMachine, STATES.BLANK, MESSAGES.FILL, STATES.EMPTY);
    return finiteStateMachine;
}

function interactWithCell(msg, rowIdx, colIdx, puzzle) {
    const currentCellState = puzzle.board[rowIdx][colIdx];
    puzzle.board[rowIdx][colIdx] = FSM[currentCellState][msg];
    return puzzle;
}

function updateColumnCounts(puzzle, colIdx) {
    puzzle.colCounts[colIdx] = makeColumnCounts(puzzle, colIdx);
    return puzzle;
}

function makeColumnCounts(puzzle, colIdx) {
    const columnCounts = [];
    let i = 0;
    var curCount = 0;
    while (i < puzzle.board.length) {
        while (i < puzzle.board.length && puzzle.board[i][colIdx] === STATES.FILLED) {
            curCount++;
            i++;
        }
        if (curCount > 0) {
            columnCounts.push(curCount);
            curCount = 0;
        }
        i++;
    }
    if (columnCounts.length === 0) {
        return [0];
    } else {
        return columnCounts;
    }
}

function updateRowCounts(puzzle, rowIdx) {
    puzzle.rowCounts[rowIdx] = makeRowCounts(puzzle, rowIdx);
    return puzzle;
}

function makeRowCounts(puzzle, rowIdx) {
    const rowCounts = [];
    let i = 0;
    var curCount = 0;
    while (i < puzzle.board[0].length) {
        while (i < puzzle.board[0].length && puzzle.board[rowIdx][i] === STATES.FILLED) {
            curCount++;
            i++;
        }
        if (curCount > 0) {
            rowCounts.push(curCount);
            curCount = 0;
        }
        i++;
    }
    if (rowCounts.length === 0) {
        return [0];
    } else {
        return rowCounts;
    }
}

function puzzleIsSolved(puzzle) {
    const rowsAreCorrect = puzzle.rowCounts.reduce((result, counts, rowIdx) => {
        return result && arrEquals(makeRowCounts(puzzle, rowIdx), counts);
    }, true);
    const colsAreCorrect = puzzle.colCounts.reduce((result, counts, colIdx) => {
        return result && arrEquals(makeColumnCounts(puzzle, colIdx), counts);
    }, true);
    return rowsAreCorrect && colsAreCorrect;
}

function arrEquals(arr1, arr2) {
    if (!arr1 || !arr2) {
        return false;
    } else if (arr1.length != arr2.length) {
        return false;
    } else {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }
}

module.exports = {
    generateSolvePuzzle: generateSolvePuzzle,
    generateCreationPuzzle: generateCreationPuzzle,
    generateEmptyBoard: generateEmptyBoard,
    interactWithCell: interactWithCell,
    updateColumnCounts: updateColumnCounts,
    updateRowCounts: updateRowCounts,
    makePuzzleFrom2DArray: makePuzzleFrom2DArray,
    puzzleIsSolved: puzzleIsSolved,
    STATES: STATES,
    MESSAGES: MESSAGES
}