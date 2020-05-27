const STATES = {
    EMPTY: 'empty',
    FILLED: 'filled',
    BLANK: 'blank'
}

const MESSAGES = {
    FILL: 'fill',
    BLANK: 'blank'
}

const creationFSM = buildCreationFSM();

function generateSolveGame(rowCounts, colCounts) {
    const board = generateEmptyBoard(rowCounts.length, colCounts.length);
    return {rowCounts: rowCounts, colCounts: colCounts, board: board};
}

function generateCreationGame(m, n) {
    const game = {rowCounts: [], colCounts: []};
    for (let i = 0; i < n; i++) {
        game.rowCounts.push([0])
    }
    for (let i = 0; i < m; i++) {
        game.colCounts.push([0])
    }
    game.board = generateEmptyBoard(m, n);
    return game;
}

function generateEmptyBoard(m, n) {
    if (m === 0 || n === 0) {
        return [];
    } else {
        let board = [];
        for (let i = 0; i < n; i++) {
            board.push([]);
            for (let j = 0; j < m; j++) {
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

function buildCreationFSM() {
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
    game.board[rowIdx][colIdx] = creationFSM[currentCellState][msg];
    return game;
}

function updateColumnCounts(game, colIdx) {
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
        game.colCounts[colIdx] = [0];
    } else {
        game.colCounts[colIdx] = columnCounts;
    }
    return game;
}

function updateRowCounts(game, rowIdx) {
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
        game.rowCounts[rowIdx] = [0];
    } else {
        game.rowCounts[rowIdx] = rowCounts;
    }
    return game;
}

module.exports = {
    generateSolveGame: generateSolveGame,
    generateCreationGame: generateCreationGame,
    generateEmptyBoard: generateEmptyBoard,
    interactWithCell: interactWithCell,
    updateColumnCounts: updateColumnCounts,
    updateRowCounts: updateRowCounts,
    makeGameFrom2DArray: makeGameFrom2DArray,
    STATES: STATES,
    MESSAGES: MESSAGES
}