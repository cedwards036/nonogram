const assert = require('assert');
const generateEmptyBoard = require('../src/puzzle.js').generateEmptyBoard;
const generateCreationPuzzle = require('../src/puzzle.js').generateCreationPuzzle;
const generateSolvePuzzle = require('../src/puzzle.js').generateSolvePuzzle;
const interactWithCell = require('../src/puzzle.js').interactWithCell;
const updateColumnCounts = require('../src/puzzle.js').updateColumnCounts;
const updateRowCounts = require('../src/puzzle.js').updateRowCounts;
const makePuzzleFrom2DArray = require('../src/puzzle.js').makePuzzleFrom2DArray;
const puzzleIsSolved = require('../src/puzzle.js').puzzleIsSolved;
const STATES = require('../src/puzzle.js').STATES;
const MESSAGES = require('../src/puzzle.js').MESSAGES;

describe('generateCreationPuzzle', () => {
    it('should create a colCounts array containing m 0 count nodes', () => {
        const puzzle = generateCreationPuzzle(3, 4);
        assert.deepEqual([[0], [0], [0]], puzzle.colCounts); 
    });

    it('should create a rowCounts array containing n 0 count nodes', () => {
        const puzzle = generateCreationPuzzle(3, 4);
        assert.deepEqual([[0], [0], [0], [0]], puzzle.rowCounts); 
    });

    it('should create an m x n puzzle board', () => {
        const puzzle = generateCreationPuzzle(1, 2);
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

describe('updateColumnCounts', () => {
    var puzzle;
    beforeEach(() => {
        puzzle = generateCreationPuzzle(6, 6);
    });

    it('should update to 0 if nothing is filled in the line', () => {
        puzzle = updateColumnCounts(puzzle, 0);
        assert.deepEqual([0], puzzle.colCounts[0]);
    });  

    it('should contain a single number when there is one contiguous filled stretch', () => {
        puzzle = interactWithCell(MESSAGES.FILL, 0, 0, puzzle);
        puzzle = interactWithCell(MESSAGES.FILL, 1, 0, puzzle);
        puzzle = updateColumnCounts(puzzle, 0);
        assert.deepEqual([2], puzzle.colCounts[0]);
    }); 

    it('should contain counts of contiguous filled stretches in order', () => {
        puzzle = interactWithCell(MESSAGES.FILL, 0, 3, puzzle);
        puzzle = interactWithCell(MESSAGES.FILL, 2, 3, puzzle);
        puzzle = interactWithCell(MESSAGES.FILL, 3, 3, puzzle);
        puzzle = interactWithCell(MESSAGES.FILL, 5, 3, puzzle);
        puzzle = updateColumnCounts(puzzle, 3);
        assert.deepEqual([1, 2, 1], puzzle.colCounts[3]);
    });
});

describe('updateRowCounts', () => {
    var puzzle;
    beforeEach(() => {
        puzzle = generateCreationPuzzle(6, 6);
    });

    it('should update to 0 if nothing is filled in the line', () => {
        puzzle = updateRowCounts(puzzle, 0);
        assert.deepEqual([0], puzzle.rowCounts[0]);
    });  

    it('should contain a single number when there is one contiguous filled stretch', () => {
        puzzle = interactWithCell(MESSAGES.FILL, 0, 0, puzzle);
        puzzle = interactWithCell(MESSAGES.FILL, 0, 1, puzzle);
        puzzle = updateRowCounts(puzzle, 0);
        assert.deepEqual([2], puzzle.rowCounts[0]);
    }); 

    it('should contain counts of contiguous filled stretches in order', () => {
        puzzle = interactWithCell(MESSAGES.FILL, 3, 0, puzzle);
        puzzle = interactWithCell(MESSAGES.FILL, 3, 2, puzzle);
        puzzle = interactWithCell(MESSAGES.FILL, 3, 3, puzzle);
        puzzle = interactWithCell(MESSAGES.FILL, 3, 5, puzzle);
        puzzle = updateRowCounts(puzzle, 3);
        assert.deepEqual([1, 2, 1], puzzle.rowCounts[3]);
    });
});

describe('interactWithCell', () => {
    var puzzle;
    beforeEach(() => {
        puzzle = generateCreationPuzzle(2, 2);
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
        const rowCounts = [[1, 1], [3], [2]];
        const colCounts = [[0], [2], [1]];
        const expected = {rowCounts: rowCounts, colCounts: colCounts, board: [
            [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY],
            [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY,],
            [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY,]
        ]};
        assert.deepEqual(expected, generateSolvePuzzle(rowCounts, colCounts));
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
