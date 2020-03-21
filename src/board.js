const STATES = {
    EMPTY: 'empty',
    FILLED: 'filled',
    BLANK: 'blank'
}

const MESSAGES = {
    FILL: 'fill',
    BLANK: 'blank'
}

const finiteStateMachine = buildFSM();

function generateCreationBoard(m, n) {
    if (m === 0 || n === 0) {
        return [];
    } else {
        let board = [];
        for (let i = 0; i < m; i++) {
            board.push([]);
            for (let j = 0; j < n; j++) {
                board[i].push(STATES.EMPTY)
            }
        }
        return board;
    }
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

function interactWithCell(msg, rowIdx, colIdx, board) {
    const currentCellState = board[rowIdx][colIdx];
    board[rowIdx][colIdx] = finiteStateMachine[currentCellState][msg];
    return board;
}

module.exports = {
    generateCreationBoard: generateCreationBoard,
    interactWithCell: interactWithCell,
    STATES: STATES,
    MESSAGES: MESSAGES
}