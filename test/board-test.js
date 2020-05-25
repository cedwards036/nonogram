const assert = require('assert');
const generateCreationBoard = require('../src/board.js').generateCreationBoard;
const generateCreationGame = require('../src/board.js').generateCreationGame;
const interactWithCell = require('../src/board.js').interactWithCell;
const updateColumnCounts = require('../src/board.js').updateColumnCounts;
const updateRowCounts = require('../src/board.js').updateRowCounts;
const STATES = require('../src/board.js').STATES;
const MESSAGES = require('../src/board.js').MESSAGES;

describe('generateCreationGame', () => {
    it('should create a colCounts array containing m 0 count nodes', () => {
        const game = generateCreationGame(3, 4);
        assert.deepEqual([[0], [0], [0]], game.colCounts); 
    });

    it('should create a rowCounts array containing n 0 count nodes', () => {
        const game = generateCreationGame(3, 4);
        assert.deepEqual([[0], [0], [0], [0]], game.rowCounts); 
    });

    it('should create an m x n game board', () => {
        const game = generateCreationGame(1, 2);
        assert.deepEqual([[STATES.EMPTY], [STATES.EMPTY]], game.board); 
    });
});

describe('generateCreationBoard', () => {
    it('should create an 0 x 0 grid if either n or m is zero', () => {
        assert.deepEqual([], generateCreationBoard(0, 0));
        assert.deepEqual([], generateCreationBoard(1, 0));
        assert.deepEqual([], generateCreationBoard(0, 1));
    });

    it('should create an m x n grid of empty cells', () => {
        assert.deepEqual([[STATES.EMPTY]], generateCreationBoard(1, 1));
        assert.deepEqual([[STATES.EMPTY, STATES.EMPTY, STATES.EMPTY]], generateCreationBoard(3, 1));
        assert.deepEqual([[STATES.EMPTY], [STATES.EMPTY], [STATES.EMPTY]], generateCreationBoard(1, 3));
        assert.deepEqual([
            [STATES.EMPTY, STATES.EMPTY],
            [STATES.EMPTY, STATES.EMPTY]
        ], generateCreationBoard(2, 2));
    });
});

describe('updateColumnCounts', () => {
    var game;
    beforeEach(() => {
        game = generateCreationGame(6, 6);
    });

    it('should update to 0 if nothing is filled in the line', () => {
        game = updateColumnCounts(game, 0);
        assert.deepEqual([0], game.colCounts[0]);
    });  

    it('should contain a single number when there is one contiguous filled stretch', () => {
        game = interactWithCell(MESSAGES.FILL, 0, 0, game);
        game = interactWithCell(MESSAGES.FILL, 1, 0, game);
        game = updateColumnCounts(game, 0);
        assert.deepEqual([2], game.colCounts[0]);
    }); 

    it('should contain counts of contiguous filled stretches in order', () => {
        game = interactWithCell(MESSAGES.FILL, 0, 3, game);
        game = interactWithCell(MESSAGES.FILL, 2, 3, game);
        game = interactWithCell(MESSAGES.FILL, 3, 3, game);
        game = interactWithCell(MESSAGES.FILL, 5, 3, game);
        game = updateColumnCounts(game, 3);
        assert.deepEqual([1, 2, 1], game.colCounts[3]);
    });
});

describe('updateRowCounts', () => {
    var game;
    beforeEach(() => {
        game = generateCreationGame(6, 6);
    });

    it('should update to 0 if nothing is filled in the line', () => {
        game = updateRowCounts(game, 0);
        assert.deepEqual([0], game.rowCounts[0]);
    });  

    it('should contain a single number when there is one contiguous filled stretch', () => {
        game = interactWithCell(MESSAGES.FILL, 0, 0, game);
        game = interactWithCell(MESSAGES.FILL, 0, 1, game);
        game = updateRowCounts(game, 0);
        assert.deepEqual([2], game.rowCounts[0]);
    }); 

    it('should contain counts of contiguous filled stretches in order', () => {
        game = interactWithCell(MESSAGES.FILL, 3, 0, game);
        game = interactWithCell(MESSAGES.FILL, 3, 2, game);
        game = interactWithCell(MESSAGES.FILL, 3, 3, game);
        game = interactWithCell(MESSAGES.FILL, 3, 5, game);
        game = updateRowCounts(game, 3);
        assert.deepEqual([1, 2, 1], game.rowCounts[3]);
    });
});

describe('interactWithCell', () => {
    var game;
    beforeEach(() => {
        game = generateCreationGame(2, 2);
    });

    it('should be filled when sent the "fill" message while empty', () => {
        assert.equal(STATES.FILLED, interactWithCell(MESSAGES.FILL, 0, 0, game).board[0][0]);
    });

    it('should be empty when sent the "fill" message while filled', () => {
        game = interactWithCell(MESSAGES.FILL, 0, 0, game);
        assert.equal(STATES.EMPTY, interactWithCell(MESSAGES.FILL, 0, 0, game).board[0][0]);
    });

    it('should be marked blank when sent the "blank" message while empty', () => {
        assert.equal(STATES.BLANK, interactWithCell(MESSAGES.BLANK, 1, 0, game).board[1][0]);
    });

    it('should be empty when sent the "blank" message while blank', () => {
        game = interactWithCell(MESSAGES.BLANK, 1, 1, game);
        assert.equal(STATES.EMPTY, interactWithCell(MESSAGES.BLANK, 1, 1, game).board[0][0]);
    });

    it('should be empty when sent the "blank" message while filled', () => {
        game = interactWithCell(MESSAGES.FILL, 1, 1, game);
        assert.equal(STATES.EMPTY, interactWithCell(MESSAGES.BLANK, 1, 1, game).board[0][0]);
    });

    it('should be empty when sent the "fill" message while blank', () => {
        game = interactWithCell(MESSAGES.BLANK, 0, 0, game);
        assert.equal(STATES.EMPTY, interactWithCell(MESSAGES.FILL, 0, 0, game).board[0][0]);
    });
});
