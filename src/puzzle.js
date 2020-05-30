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

function generateSolvePuzzle(rowCountGroups, colCountGroups) {
    const board = generateEmptyBoard(colCountGroups.length, rowCountGroups.length);
    return {rowCountGroups: rowCountGroups, colCountGroups: colCountGroups, board: board};
}

function generateEmptyPuzzle(width, height) {
    const puzzle = {rowCountGroups: [], colCountGroups: []};
    for (let i = 0; i < height; i++) {
        puzzle.rowCountGroups.push([0])
    }
    for (let i = 0; i < width; i++) {
        puzzle.colCountGroups.push([0])
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
    const puzzle = generateEmptyPuzzle(arr[0].length, arr.length);
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === 1) {
                interactWithCell(MESSAGES.FILL, i, j, puzzle);
            }
        }
    }
    for (let i = 0; i < arr.length; i++) {
        updateRowCountGroup(puzzle, i);
    }
    for (let i = 0; i < arr[0].length; i++) {
        updateColumnCountGroup(puzzle, i);
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

function updateColumnCountGroup(puzzle, colIdx) {
    puzzle.colCountGroups[colIdx] = makeColumnCountGroup(puzzle, colIdx);
    return puzzle;
}

function makeColumnCountGroup(puzzle, colIdx) {
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

function updateRowCountGroup(puzzle, rowIdx) {
    puzzle.rowCountGroups[rowIdx] = makeRowCountGroup(puzzle, rowIdx);
    return puzzle;
}

function makeRowCountGroup(puzzle, rowIdx) {
    const rowCountGroups = [];
    let i = 0;
    var curCount = 0;
    while (i < puzzle.board[0].length) {
        while (i < puzzle.board[0].length && puzzle.board[rowIdx][i] === STATES.FILLED) {
            curCount++;
            i++;
        }
        if (curCount > 0) {
            rowCountGroups.push(curCount);
            curCount = 0;
        }
        i++;
    }
    if (rowCountGroups.length === 0) {
        return [0];
    } else {
        return rowCountGroups;
    }
}

function puzzleIsSolved(puzzle) {
    const rowsAreCorrect = puzzle.rowCountGroups.reduce((result, counts, rowIdx) => {
        return result && arrEquals(makeRowCountGroup(puzzle, rowIdx), counts);
    }, true);
    const colsAreCorrect = puzzle.colCountGroups.reduce((result, counts, colIdx) => {
        return result && arrEquals(makeColumnCountGroup(puzzle, colIdx), counts);
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
    generateEmptyPuzzle: generateEmptyPuzzle,
    generateEmptyBoard: generateEmptyBoard,
    interactWithCell: interactWithCell,
    updateColumnCountGroup: updateColumnCountGroup,
    updateRowCountGroup: updateRowCountGroup,
    makePuzzleFrom2DArray: makePuzzleFrom2DArray,
    puzzleIsSolved: puzzleIsSolved,
    STATES: STATES,
    MESSAGES: MESSAGES
}