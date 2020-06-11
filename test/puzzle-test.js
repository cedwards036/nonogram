const assert = require('assert');
const generateEmptyBoard = require('../src/puzzle.js').generateEmptyBoard;
const generateEmptyPuzzle = require('../src/puzzle.js').generateEmptyPuzzle;
const generateSolvePuzzle = require('../src/puzzle.js').generateSolvePuzzle;
const setCellState = require('../src/puzzle.js').setCellState;
const makeSimpleCellCommand = require('../src/puzzle.js').makeSimpleCellCommand;
const makeCountUpdatingCellCommand = require('../src/puzzle.js').makeCountUpdatingCellCommand;
const fillCell = require('../src/puzzle.js').fillCell;
const makeSingleContextInteraction = require('../src/puzzle.js').makeSingleContextInteraction;
const updateColumnCountGroup = require('../src/puzzle.js').updateColumnCountGroup;
const updateRowCountGroup = require('../src/puzzle.js').updateRowCountGroup;
const makePuzzleFrom2DArray = require('../src/puzzle.js').makePuzzleFrom2DArray;
const puzzleIsSolved = require('../src/puzzle.js').puzzleIsSolved;
const makeIncompleteCount = require('../src/puzzle.js').makeIncompleteCount;
const undo = require('../src/puzzle.js').undo;
const redo = require('../src/puzzle.js').redo;
const STATES = require('../src/puzzle.js').STATES;

describe('generateEmptyPuzzle', () => {
    it('should create a colCountGroups array containing m 0 count nodes', () => {
        const puzzle = generateEmptyPuzzle(3, 4);
        assert.deepEqual([
            [makeIncompleteCount(0)], 
            [makeIncompleteCount(0)], 
            [makeIncompleteCount(0)]
        ], puzzle.colCountGroups); 
    });

    it('should create a rowCountGroups array containing n 0 count nodes', () => {
        const puzzle = generateEmptyPuzzle(3, 4);
        assert.deepEqual([
            [makeIncompleteCount(0)], 
            [makeIncompleteCount(0)], 
            [makeIncompleteCount(0)],
            [makeIncompleteCount(0)]
        ], puzzle.rowCountGroups); 
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
        assert.deepEqual([makeIncompleteCount(0)], puzzle.colCountGroups[0]);
    });  

    it('should contain a single number when there is one contiguous filled stretch', () => {
        puzzle = fillCell(0, 0, puzzle);
        puzzle = fillCell(1, 0, puzzle);
        puzzle = updateColumnCountGroup(puzzle, 0);
        assert.deepEqual([makeIncompleteCount(2)], puzzle.colCountGroups[0]);
    }); 

    it('should contain counts of contiguous filled stretches in order', () => {
        puzzle = fillCell(0, 3, puzzle);
        puzzle = fillCell(2, 3, puzzle);
        puzzle = fillCell(3, 3, puzzle);
        puzzle = fillCell(5, 3, puzzle);
        puzzle = updateColumnCountGroup(puzzle, 3);
        assert.deepEqual([
            makeIncompleteCount(1),
            makeIncompleteCount(2),
            makeIncompleteCount(1)
        ], puzzle.colCountGroups[3]);
    });
});

describe('updateRowCountGroup', () => {
    var puzzle;
    beforeEach(() => {
        puzzle = generateEmptyPuzzle(6, 6);
    });

    it('should update to 0 if nothing is filled in the line', () => {
        puzzle = updateRowCountGroup(puzzle, 0);
        assert.deepEqual([makeIncompleteCount(0)], puzzle.rowCountGroups[0]);
    });  

    it('should contain a single number when there is one contiguous filled stretch', () => {
        puzzle = fillCell(0, 0, puzzle);
        puzzle = fillCell(0, 1, puzzle);
        puzzle = updateRowCountGroup(puzzle, 0);
        assert.deepEqual([makeIncompleteCount(2)], puzzle.rowCountGroups[0]);
    }); 

    it('should contain counts of contiguous filled stretches in order', () => {
        puzzle = fillCell(3, 0, puzzle);
        puzzle = fillCell(3, 2, puzzle);
        puzzle = fillCell(3, 3, puzzle);
        puzzle = fillCell(3, 5, puzzle);
        puzzle = updateRowCountGroup(puzzle, 3);
        assert.deepEqual([
            makeIncompleteCount(1),
            makeIncompleteCount(2),
            makeIncompleteCount(1)
        ], puzzle.rowCountGroups[3]);
    });
});

describe('setCellState', () => {
    it('executes the given cell command', () => {
        let puzzle = generateEmptyPuzzle(2, 2);
        puzzle = setCellState(STATES.FILLED, 1, 0, puzzle, makeSimpleCellCommand);
        assert.equal(STATES.FILLED, puzzle.board[1][0]);
    });

    it('adds the given cell command to the puzzle\'s past', () => {
        let puzzle = generateEmptyPuzzle(2, 2);
        puzzle = setCellState(STATES.FILLED, 1, 0, puzzle, makeSimpleCellCommand);
        const command = puzzle.history.past[0];
        puzzle = command.undo(puzzle);
        assert.equal(STATES.EMPTY, puzzle.board[1][0]);
        puzzle = command.execute(puzzle);
        assert.equal(STATES.FILLED, puzzle.board[1][0]);
    });

    it('erases the puzzle\'s current future', () => {
        let puzzle = generateEmptyPuzzle(2, 2);
        puzzle = setCellState(STATES.FILLED, 1, 0, puzzle, makeSimpleCellCommand);
        puzzle = undo(puzzle);
        puzzle = setCellState(STATES.MARKED, 1, 0, puzzle, makeSimpleCellCommand);
        assert.equal(0, puzzle.history.future.length);
    });
});

describe('cell commands', () => {
    describe('simple cell command', () => {
        it('sets the specified cell to the new state when executed', () => {
            let puzzle = generateEmptyPuzzle(2, 2);
            const command = makeSimpleCellCommand(STATES.FILLED, STATES.EMPTY, 0, 0);
            puzzle = command.execute(puzzle);
            assert.equal(STATES.FILLED, puzzle.board[0][0]);
        });

        it('sets the specified cell to the old state when undone', () => {
            let puzzle = generateEmptyPuzzle(2, 2);
            puzzle = fillCell(0, 0, puzzle);
            const command = makeSimpleCellCommand(STATES.FILLED, STATES.EMPTY, 0, 0);
            puzzle = command.undo(puzzle);
            assert.equal(STATES.EMPTY, puzzle.board[0][0]);
        });
    });

    describe('count-updating cell command', () => {
        it('sets the specified cell to the new state when executed', () => {
            let puzzle = generateEmptyPuzzle(2, 2);
            const command = makeCountUpdatingCellCommand(STATES.FILLED, STATES.EMPTY, 0, 0);
            puzzle = command.execute(puzzle);
            assert.equal(STATES.FILLED, puzzle.board[0][0]);
        });

        it('updates the row and col counts when executed', () => {
            let puzzle = generateEmptyPuzzle(2, 2);
            const command = makeCountUpdatingCellCommand(STATES.FILLED, STATES.EMPTY, 0, 0);
            puzzle = command.execute(puzzle);
            assert.deepEqual([makeIncompleteCount(1)], puzzle.colCountGroups[0]);
            assert.deepEqual([makeIncompleteCount(1)], puzzle.rowCountGroups[0]);
        });

        it('sets the specified cell to the old state when undone', () => {
            let puzzle = generateEmptyPuzzle(2, 2);
            puzzle = fillCell(0, 0, puzzle);
            const command = makeCountUpdatingCellCommand(STATES.FILLED, STATES.EMPTY, 0, 0);
            puzzle = command.undo(puzzle);
            assert.equal(STATES.EMPTY, puzzle.board[0][0]);
        });

        it('updates the row and col counts when undone', () => {
            let puzzle = generateEmptyPuzzle(2, 2);
            puzzle = fillCell(0, 0, puzzle);
            const command = makeCountUpdatingCellCommand(STATES.FILLED, STATES.EMPTY, 0, 0);
            puzzle = command.undo(puzzle);
            assert.deepEqual([makeIncompleteCount(0)], puzzle.colCountGroups[0]);
            assert.deepEqual([makeIncompleteCount(0)], puzzle.rowCountGroups[0]);
        });
    });
});

describe('makeSingleContextInteraction', () => {
    it('should create a reusable function that interacts with the board if the current cell state matches the original cell state', () => {
        let puzzle = generateEmptyPuzzle(2, 2);
        const interact = makeSingleContextInteraction(fillCell, 0, 0, puzzle);
        puzzle = interact(0, 0, puzzle);
        puzzle = interact(0, 1, puzzle);
        assert.equal(STATES.FILLED, puzzle.board[0][0]);
        assert.equal(STATES.FILLED, puzzle.board[0][1]);
    });

    it('should create a reusable function that does not interact with the board if the current cell state does not match the original cell state', () => {
        let puzzle = makePuzzleFrom2DArray([[1, 0], [1, 1]]);
        const interact = makeSingleContextInteraction(fillCell, 0, 0, puzzle);
        puzzle = interact(0, 1, puzzle);
        assert.equal(STATES.EMPTY, puzzle.board[0][1]);
    });
});

describe('generateSolvePuzzle', () => {
    it('should create an empty puzzle with column counts and row counts derived from the input', () => {
        const rowCountGroups = [[1, 1], [3], [2]];
        const colCountGroups = [[0], [2], [1]];
        const expected = {
            rowCountGroups: rowCountGroups, 
            colCountGroups: colCountGroups, 
            board: [
                [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY],
                [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY,],
                [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY,]
            ],
            history: {
                past: [],
                future: []
            }
        };
        assert.deepEqual(expected, generateSolvePuzzle(rowCountGroups, colCountGroups));
    });
});

describe('puzzleIsSolved', () => {
    it('an empty puzzle is solved if all counts are 0', () => {
        const puzzle = generateSolvePuzzle(
            [[makeIncompleteCount(0)], [makeIncompleteCount(0)]], 
            [[makeIncompleteCount(0)], [makeIncompleteCount(0)]]
        )
        assert.equal(true, puzzleIsSolved(puzzle));
    });

    it('an empty puzzle is not solved if at least one count is not 0', () => {
        const puzzle = generateSolvePuzzle(
            [[makeIncompleteCount(0)], [makeIncompleteCount(1)]], 
            [[makeIncompleteCount(0)], [makeIncompleteCount(0)]]
        )
        assert.equal(false, puzzleIsSolved(puzzle));
    });

    it('a puzzle is solved if the number of filled cells in each row and column match the respective counts', () => {
        const puzzle = makePuzzleFrom2DArray([
            [1, 0, 1, 1],
            [1, 1, 0, 0],
            [1, 1, 1, 0]
        ]);
        assert.equal(true, puzzleIsSolved(puzzle));
    });

    it('a puzzle is not solved if the number of filled cells in each row and column does not match the respective counts', () => {
        var puzzle = makePuzzleFrom2DArray([
            [1, 0, 1, 1],
            [1, 1, 0, 0],
            [1, 1, 1, 0]
        ]);
        puzzle = fillCell(0, 1, puzzle);
        assert.equal(false, puzzleIsSolved(puzzle));
    });
});

describe('undo', () => {
    it('reverts the puzzle\'s cells to their previous state', () => {
        let puzzle = generateEmptyPuzzle(2, 2);
        puzzle = setCellState(STATES.FILLED, 1, 0, puzzle, makeSimpleCellCommand);
        puzzle = undo(puzzle);
        assert.equal(STATES.EMPTY, puzzle.board[1][0]); 
    });

    it('moves the most recent item from the puzzle\'s past to its future', () => {
        let puzzle = generateEmptyPuzzle(2, 2);
        puzzle = setCellState(STATES.FILLED, 1, 0, puzzle, makeSimpleCellCommand);
        const pastFunc = puzzle.history.past[0];
        puzzle = undo(puzzle);
        assert.equal(pastFunc, puzzle.history.future[0]); 
        assert.notEqual(pastFunc, puzzle.history.past[0]);
    });

    it('does nothing if the puzzle has no past commands', () => {
        let puzzle = generateEmptyPuzzle(2, 2);
        puzzle = undo(puzzle);
        assert.equal(STATES.EMPTY, puzzle.board[1][0]); 
    });
});

describe('redo', () => {
    it('reverts the puzzle\'s most recent undo', () => {
        let puzzle = generateEmptyPuzzle(2, 2);
        puzzle = setCellState(STATES.FILLED, 1, 0, puzzle, makeSimpleCellCommand);
        puzzle = undo(puzzle);
        puzzle = redo(puzzle);
        assert.equal(STATES.FILLED, puzzle.board[1][0]); 
    });

    it('moves the most recent item from the puzzle\'s future to its past', () => {
        let puzzle = generateEmptyPuzzle(2, 2);
        puzzle = setCellState(STATES.FILLED, 1, 0, puzzle, makeSimpleCellCommand);
        puzzle = undo(puzzle);
        const futureFunc = puzzle.history.future[0];
        puzzle = redo(puzzle);
        assert.equal(futureFunc, puzzle.history.past[0]); 
        assert.notEqual(futureFunc, puzzle.history.future[0]); 
    });

    it('does nothing if the puzzle has no future commands', () => {
        let puzzle = generateEmptyPuzzle(2, 2);
        puzzle = setCellState(STATES.FILLED, 1, 0, puzzle, makeSimpleCellCommand);
        puzzle = redo(puzzle);
        assert.equal(STATES.FILLED, puzzle.board[1][0]); 
    });
});
