const STATES = {
    EMPTY: 'empty',
    BLANK: 'blank',
    FILLED: 'filled',
    MARKED: 'marked'
}

function generateSolvePuzzle(rowCountGroups, colCountGroups) {
    const board = generateEmptyBoard(colCountGroups.length, rowCountGroups.length);
    return {
        rowCountGroups: rowCountGroups, 
        colCountGroups: colCountGroups, 
        board: board, 
        history: {
            past: [],
            future: []
        }};
}

function generateEmptyPuzzle(width, height) {
    const puzzle = {
        rowCountGroups: [], 
        colCountGroups: [],  
        history: {
            past: [],
            future: []
        }
    };
    for (let i = 0; i < height; i++) {
        puzzle.rowCountGroups.push([makeIncompleteCount(0)])
    }
    for (let i = 0; i < width; i++) {
        puzzle.colCountGroups.push([makeIncompleteCount(0)])
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
                fillCell(i, j, puzzle);
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

const fillCell = makeNonUpdatingCellInteraction(STATES.FILLED);
const blankCell = makeNonUpdatingCellInteraction(STATES.BLANK);
const markCell = makeNonUpdatingCellInteraction(STATES.MARKED);
const fillCellAndUpdateCounts = makeUpdatingCellInteraction(STATES.FILLED);
const blankCellAndUpdateCounts = makeUpdatingCellInteraction(STATES.BLANK);
const markCellAndUpdateCounts = makeUpdatingCellInteraction(STATES.MARKED);

function makeNonUpdatingCellInteraction(state) {
    return (rowIdx, colIdx, puzzle) => setCellState(state, rowIdx, colIdx, puzzle, makeSimpleCellCommand);
}

function makeUpdatingCellInteraction(state) {
    return (rowIdx, colIdx, puzzle) => setCellState(state, rowIdx, colIdx, puzzle, makeCountUpdatingCellCommand);
}

function setCellState(desiredNewState, rowIdx, colIdx, puzzle, makeCellCommand) {
    const oldState = puzzle.board[rowIdx][colIdx];
    const newState = determineNewCellState(oldState, desiredNewState);
    const command = makeCellCommand(newState, oldState, rowIdx, colIdx);
    puzzle.history.past.push(command);
    puzzle.history.future = [];
    command.execute(puzzle);
    return puzzle;
}

function determineNewCellState(oldState, newState) {
    if (oldState === STATES.EMPTY) {
        return newState;
    } else {
        return STATES.EMPTY;
    }
}

function makeSimpleCellCommand(newState, oldState, rowIdx, colIdx) {
    return {
        execute: puzzle => {
            puzzle.board[rowIdx][colIdx] = newState;
            return puzzle;
        },
        undo: puzzle => {
            puzzle.board[rowIdx][colIdx] = oldState;
            return puzzle;
        }
    }
}

function makeCountUpdatingCellCommand(newState, oldState, rowIdx, colIdx) {
    return {
        execute: puzzle => {
            puzzle.board[rowIdx][colIdx] = newState;
            updateColumnCountGroup(puzzle, colIdx);
            updateRowCountGroup(puzzle, rowIdx);
            return puzzle;
        },
        undo: puzzle => {
            puzzle.board[rowIdx][colIdx] = oldState;
            updateColumnCountGroup(puzzle, colIdx);
            updateRowCountGroup(puzzle, rowIdx);
            return puzzle;
        }
    }
}

function makeSingleContextInteraction(interaction, rowIdx, colIdx, puzzle) {
    const originalCellState = puzzle.board[rowIdx][colIdx];
    return (rowIdx, colIdx, puzzle) => {
        if (puzzle.board[rowIdx][colIdx] === originalCellState) {
            interaction(rowIdx, colIdx, puzzle);
        }
        return puzzle;
    }
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
            columnCounts.push(makeIncompleteCount(curCount));
            curCount = 0;
        }
        i++;
    }
    if (columnCounts.length === 0) {
        return [makeIncompleteCount(0)];
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
            rowCountGroups.push(makeIncompleteCount(curCount));
            curCount = 0;
        }
        i++;
    }
    if (rowCountGroups.length === 0) {
        return [makeIncompleteCount(0)];
    } else {
        return rowCountGroups;
    }
}

function puzzleIsSolved(puzzle) {
    const rowsAreCorrect = puzzle.rowCountGroups.reduce((result, countGroup, rowIdx) => {
        return result && countGroupEquals(makeRowCountGroup(puzzle, rowIdx), countGroup);
    }, true);
    const colsAreCorrect = puzzle.colCountGroups.reduce((result, countGroup, colIdx) => {
        return result && countGroupEquals(makeColumnCountGroup(puzzle, colIdx), countGroup);
    }, true);
    return rowsAreCorrect && colsAreCorrect;
}

function countGroupEquals(arr1, arr2) {
    if (!arr1 || !arr2) {
        return false;
    } else if (arr1.length != arr2.length) {
        return false;
    } else {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i].value !== arr2[i].value) {
                return false;
            }
        }
        return true;
    }
}

function makeIncompleteCount(count) {
    return {value: count, isComplete: false};
}

function undo(puzzle) {
    if (puzzle.history.past.length > 0) {
        const command = puzzle.history.past.pop();
        command.undo(puzzle);
        puzzle.history.future.push(command);
    }
    return puzzle;
}

function redo(puzzle) {
    if (puzzle.history.future.length > 0) {
        const command = puzzle.history.future.pop();
        command.execute(puzzle);
        puzzle.history.past.push(command);
    }
    return puzzle;
}

module.exports = {
    generateSolvePuzzle: generateSolvePuzzle,
    generateEmptyPuzzle: generateEmptyPuzzle,
    generateEmptyBoard: generateEmptyBoard,
    fillCell: fillCell,
    blankCell: blankCell,
    markCell: markCell,
    fillCellAndUpdateCounts: fillCellAndUpdateCounts,
    blankCellAndUpdateCounts: blankCellAndUpdateCounts,
    markCellAndUpdateCounts: markCellAndUpdateCounts,
    setCellState: setCellState,
    makeSimpleCellCommand: makeSimpleCellCommand,
    makeCountUpdatingCellCommand: makeCountUpdatingCellCommand,
    makeSingleContextInteraction: makeSingleContextInteraction,
    updateColumnCountGroup: updateColumnCountGroup,
    updateRowCountGroup: updateRowCountGroup,
    makePuzzleFrom2DArray: makePuzzleFrom2DArray,
    puzzleIsSolved: puzzleIsSolved,
    makeIncompleteCount: makeIncompleteCount,
    undo: undo,
    redo: redo,
    STATES: STATES,
}