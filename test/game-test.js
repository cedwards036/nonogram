const assert = require('assert');
const generateEmptyBoard = require('../src/game.js').generateEmptyBoard;
const generateCreationGame = require('../src/game.js').generateCreationGame;
const generateSolveGame = require('../src/game.js').generateSolveGame;
const interactWithCell = require('../src/game.js').interactWithCell;
const updateColumnCounts = require('../src/game.js').updateColumnCounts;
const updateRowCounts = require('../src/game.js').updateRowCounts;
const makeGameFrom2DArray = require('../src/game.js').makeGameFrom2DArray;
const puzzleIsSolved = require('../src/game.js').puzzleIsSolved;
const STATES = require('../src/game.js').STATES;
const MESSAGES = require('../src/game.js').MESSAGES;

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
        assert.deepEqual([], generateEmptyBoard(0, 0));
        assert.deepEqual([], generateEmptyBoard(1, 0));
        assert.deepEqual([], generateEmptyBoard(0, 1));
    });

    it('should create an m x n grid of empty cells', () => {
        assert.deepEqual([[STATES.EMPTY]], generateEmptyBoard(1, 1));
        assert.deepEqual([[STATES.EMPTY, STATES.EMPTY, STATES.EMPTY]], generateEmptyBoard(3, 1));
        assert.deepEqual([[STATES.EMPTY], [STATES.EMPTY], [STATES.EMPTY]], generateEmptyBoard(1, 3));
        assert.deepEqual([
            [STATES.EMPTY, STATES.EMPTY],
            [STATES.EMPTY, STATES.EMPTY]
        ], generateEmptyBoard(2, 2));
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

describe('generateSolveGame', () => {
    it('should create an empty game with column counts and row counts derived from the input', () => {
        const rowCounts = [[1, 1], [3], [2]];
        const colCounts = [[0], [2], [1]];
        const expected = {rowCounts: rowCounts, colCounts: colCounts, board: [
            [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY],
            [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY,],
            [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY,]
        ]};
        assert.deepEqual(expected, generateSolveGame(rowCounts, colCounts));
    });
});

describe('puzzleIsSolved', () => {
    it('an empty puzzle is solved if all counts are 0', () => {
        const game = generateSolveGame([[0], [0]], [[0], [0]])
        assert.equal(true, puzzleIsSolved(game));
    });

    it('an empty puzzle is not solved if at least one count is not 0', () => {
        const game = generateSolveGame([[0], [1]], [[0], [0]])
        assert.equal(false, puzzleIsSolved(game));
    });

    it ('a puzzle is solved if the number of filled cells in each row and column match the respective counts', () => {
        const game = makeGameFrom2DArray([
            [1, 0, 1, 1],
            [1, 1, 0, 0],
            [1, 1, 1, 0]
        ]);
        assert.equal(true, puzzleIsSolved(game));
    });

    it ('a puzzle is not solved if the number of filled cells in each row and column does not match the respective counts', () => {
        var game = makeGameFrom2DArray([
            [1, 0, 1, 1],
            [1, 1, 0, 0],
            [1, 1, 1, 0]
        ]);
        game = interactWithCell(MESSAGES.BLANK, 0, 0, game);
        assert.equal(false, puzzleIsSolved(game));
    });
});
