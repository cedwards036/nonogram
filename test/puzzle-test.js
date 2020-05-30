const assert = require('assert');
const generateEmptyBoard = require('../src/puzzle.js').generateEmptyBoard;
const generateEmptyPuzzle = require('../src/puzzle.js').generateEmptyPuzzle;
const generateSolvePuzzle = require('../src/puzzle.js').generateSolvePuzzle;
const interactWithCell = require('../src/puzzle.js').interactWithCell;
const updateColumnCountGroup = require('../src/puzzle.js').updateColumnCountGroup;
const updateRowCountGroup = require('../src/puzzle.js').updateRowCountGroup;
const makePuzzleFrom2DArray = require('../src/puzzle.js').makePuzzleFrom2DArray;
const puzzleIsSolved = require('../src/puzzle.js').puzzleIsSolved;
const STATES = require('../src/puzzle.js').STATES;
const MESSAGES = require('../src/puzzle.js').MESSAGES;

describe('generateEmptyPuzzle', () => {
    it('should create a colCountGroups array containing m 0 count nodes', () => {
        const puzzle = generateEmptyPuzzle(3, 4);
        assert.deepEqual([[0], [0], [0]], puzzle.colCountGroups); 
    });

    it('should create a rowCountGroups array containing n 0 count nodes', () => {
        const puzzle = generateEmptyPuzzle(3, 4);
        assert.deepEqual([[0], [0], [0], [0]], puzzle.rowCountGroups); 
    });

    it('should create an m x n puzzle board', () => {
        const puzzle = generateEmptyPuzzle(1, 2);
        assert.deepEqual([[STATES.EMPTY], [STATES.EMPTY]], puzzle.board); 
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

describe('updateColumnCountGroup', () => {
    var puzzle;
    beforeEach(() => {
        puzzle = generateEmptyPuzzle(6, 6);
    });

    it('should update to 0 if nothing is filled in the line', () => {
        puzzle = updateColumnCountGroup(puzzle, 0);
        assert.deepEqual([0], puzzle.colCountGroups[0]);
    });  

    it('should contain a single number when there is one contiguous filled stretch', () => {
        puzzle = interactWithCell(MESSAGES.FILL, 0, 0, puzzle);
        puzzle = interactWithCell(MESSAGES.FILL, 1, 0, puzzle);
        puzzle = updateColumnCountGroup(puzzle, 0);
        assert.deepEqual([2], puzzle.colCountGroups[0]);
    }); 

    it('should contain counts of contiguous filled stretches in order', () => {
        puzzle = interactWithCell(MESSAGES.FILL, 0, 3, puzzle);
        puzzle = interactWithCell(MESSAGES.FILL, 2, 3, puzzle);
        puzzle = interactWithCell(MESSAGES.FILL, 3, 3, puzzle);
        puzzle = interactWithCell(MESSAGES.FILL, 5, 3, puzzle);
        puzzle = updateColumnCountGroup(puzzle, 3);
        assert.deepEqual([1, 2, 1], puzzle.colCountGroups[3]);
    });
});

describe('updateRowCountGroup', () => {
    var puzzle;
    beforeEach(() => {
        puzzle = generateEmptyPuzzle(6, 6);
    });

    it('should update to 0 if nothing is filled in the line', () => {
        puzzle = updateRowCountGroup(puzzle, 0);
        assert.deepEqual([0], puzzle.rowCountGroups[0]);
    });  

    it('should contain a single number when there is one contiguous filled stretch', () => {
        puzzle = interactWithCell(MESSAGES.FILL, 0, 0, puzzle);
        puzzle = interactWithCell(MESSAGES.FILL, 0, 1, puzzle);
        puzzle = updateRowCountGroup(puzzle, 0);
        assert.deepEqual([2], puzzle.rowCountGroups[0]);
    }); 

    it('should contain counts of contiguous filled stretches in order', () => {
        puzzle = interactWithCell(MESSAGES.FILL, 3, 0, puzzle);
        puzzle = interactWithCell(MESSAGES.FILL, 3, 2, puzzle);
        puzzle = interactWithCell(MESSAGES.FILL, 3, 3, puzzle);
        puzzle = interactWithCell(MESSAGES.FILL, 3, 5, puzzle);
        puzzle = updateRowCountGroup(puzzle, 3);
        assert.deepEqual([1, 2, 1], puzzle.rowCountGroups[3]);
    });
});

describe('interactWithCell', () => {
    var puzzle;
    beforeEach(() => {
        puzzle = generateEmptyPuzzle(2, 2);
    });

    it('should be filled when sent the "fill" message while empty', () => {
        assert.equal(STATES.FILLED, interactWithCell(MESSAGES.FILL, 0, 0, puzzle).board[0][0]);
    });

    it('should be empty when sent the "fill" message while filled', () => {
        puzzle = interactWithCell(MESSAGES.FILL, 0, 0, puzzle);
        assert.equal(STATES.EMPTY, interactWithCell(MESSAGES.FILL, 0, 0, puzzle).board[0][0]);
    });

    it('should be marked blank when sent the "blank" message while empty', () => {
        assert.equal(STATES.BLANK, interactWithCell(MESSAGES.BLANK, 1, 0, puzzle).board[1][0]);
    });

    it('should be empty when sent the "blank" message while blank', () => {
        puzzle = interactWithCell(MESSAGES.BLANK, 1, 1, puzzle);
        assert.equal(STATES.EMPTY, interactWithCell(MESSAGES.BLANK, 1, 1, puzzle).board[0][0]);
    });

    it('should be empty when sent the "blank" message while filled', () => {
        puzzle = interactWithCell(MESSAGES.FILL, 1, 1, puzzle);
        assert.equal(STATES.EMPTY, interactWithCell(MESSAGES.BLANK, 1, 1, puzzle).board[0][0]);
    });

    it('should be empty when sent the "fill" message while blank', () => {
        puzzle = interactWithCell(MESSAGES.BLANK, 0, 0, puzzle);
        assert.equal(STATES.EMPTY, interactWithCell(MESSAGES.FILL, 0, 0, puzzle).board[0][0]);
    });
});

describe('generateSolvePuzzle', () => {
    it('should create an empty puzzle with column counts and row counts derived from the input', () => {
        const rowCountGroups = [[1, 1], [3], [2]];
        const colCountGroups = [[0], [2], [1]];
        const expected = {rowCountGroups: rowCountGroups, colCountGroups: colCountGroups, board: [
            [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY],
            [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY,],
            [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY,]
        ]};
        assert.deepEqual(expected, generateSolvePuzzle(rowCountGroups, colCountGroups));
    });
});

describe('puzzleIsSolved', () => {
    it('an empty puzzle is solved if all counts are 0', () => {
        const puzzle = generateSolvePuzzle([[0], [0]], [[0], [0]])
        assert.equal(true, puzzleIsSolved(puzzle));
    });

    it('an empty puzzle is not solved if at least one count is not 0', () => {
        const puzzle = generateSolvePuzzle([[0], [1]], [[0], [0]])
        assert.equal(false, puzzleIsSolved(puzzle));
    });

    it ('a puzzle is solved if the number of filled cells in each row and column match the respective counts', () => {
        const puzzle = makePuzzleFrom2DArray([
            [1, 0, 1, 1],
            [1, 1, 0, 0],
            [1, 1, 1, 0]
        ]);
        assert.equal(true, puzzleIsSolved(puzzle));
    });

    it ('a puzzle is not solved if the number of filled cells in each row and column does not match the respective counts', () => {
        var puzzle = makePuzzleFrom2DArray([
            [1, 0, 1, 1],
            [1, 1, 0, 0],
            [1, 1, 1, 0]
        ]);
        puzzle = interactWithCell(MESSAGES.BLANK, 0, 0, puzzle);
        assert.equal(false, puzzleIsSolved(puzzle));
    });
});
