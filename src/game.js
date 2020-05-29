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

function generateSolveGame(rowCounts, colCounts) {
    const board = generateEmptyBoard(colCounts.length, rowCounts.length);
    return {rowCounts: rowCounts, colCounts: colCounts, board: board};
}

function generateCreationGame(width, height) {
    const game = {rowCounts: [], colCounts: []};
    for (let i = 0; i < height; i++) {
        game.rowCounts.push([0])
    }
    for (let i = 0; i < width; i++) {
        game.colCounts.push([0])
    }
    game.board = generateEmptyBoard(width, height);
    return game;
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

function makeGameFrom2DArray(arr) {
    const game = generateCreationGame(arr[0].length, arr.length);
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === 1) {
                interactWithCell(MESSAGES.FILL, i, j, game);
            }
        }
    }
    for (let i = 0; i < arr.length; i++) {
        updateRowCounts(game, i);
    }
    for (let i = 0; i < arr[0].length; i++) {
        updateColumnCounts(game, i);
    }
    return game;
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

function interactWithCell(msg, rowIdx, colIdx, game) {
    const currentCellState = game.board[rowIdx][colIdx];
    game.board[rowIdx][colIdx] = FSM[currentCellState][msg];
    return game;
}

function updateColumnCounts(game, colIdx) {
    game.colCounts[colIdx] = makeColumnCounts(game, colIdx);
    return game;
}

function makeColumnCounts(game, colIdx) {
    const columnCounts = [];
    let i = 0;
    var curCount = 0;
    while (i < game.board.length) {
        while (i < game.board.length && game.board[i][colIdx] === STATES.FILLED) {
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

function updateRowCounts(game, rowIdx) {
    game.rowCounts[rowIdx] = makeRowCounts(game, rowIdx);
    return game;
}

function makeRowCounts(game, rowIdx) {
    const rowCounts = [];
    let i = 0;
    var curCount = 0;
    while (i < game.board[0].length) {
        while (i < game.board[0].length && game.board[rowIdx][i] === STATES.FILLED) {
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

function puzzleIsSolved(game) {
    const rowsAreCorrect = game.rowCounts.reduce((result, counts, rowIdx) => {
        return result && arrEquals(makeRowCounts(game, rowIdx), counts);
    }, true);
    const colsAreCorrect = game.colCounts.reduce((result, counts, colIdx) => {
        return result && arrEquals(makeColumnCounts(game, colIdx), counts);
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
    generateSolveGame: generateSolveGame,
    generateCreationGame: generateCreationGame,
    generateEmptyBoard: generateEmptyBoard,
    interactWithCell: interactWithCell,
    updateColumnCounts: updateColumnCounts,
    updateRowCounts: updateRowCounts,
    makeGameFrom2DArray: makeGameFrom2DArray,
    puzzleIsSolved: puzzleIsSolved,
    STATES: STATES,
    MESSAGES: MESSAGES
}