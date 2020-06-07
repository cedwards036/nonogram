const assert = require('assert');
const makePuzzleFrom2DArray = require('../src/puzzle.js').makePuzzleFrom2DArray;
const makeIncompleteCount = require('../src/puzzle.js').makeIncompleteCount;
const STATES = require('../src/puzzle.js').STATES;
const makePuzzleString = require('../src/puzzle-url.js').makePuzzleString;
const parsePuzzleString = require('../src/puzzle-url.js').parsePuzzleString;
const buildPuzzleFromPuzzleString = require('../src/puzzle-url.js').buildPuzzleFromPuzzleString;
const extractPuzzleQuery = require('../src/puzzle-url.js').extractPuzzleQuery;

describe('makePuzzleString', () => {
    it('starts with comma-separated row counts with each count set separated by a semi-colon', () => {
        const puzzle = makePuzzleFrom2DArray([
            [1, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ]);
        assert.equal('1,1;3;0', makePuzzleString(puzzle).slice(0, 7));
    });

    it('lists comma-separated col counts after row counts with each count set separated by a semi-colon', () => {
        const puzzle = makePuzzleFrom2DArray([
            [1, 1, 0],
            [1, 0, 0],
            [0, 1, 1]
        ]);
        assert.equal('2;1;2#2;1,1;1', makePuzzleString(puzzle));
    });
});

describe('parsePuzzleString', () => {
    it('parses the given string into an object with arrays of row counts and column counts', () => {
        const expected = {
            rowCountGroups: [
                [makeIncompleteCount(2)], 
                [makeIncompleteCount(1)], 
                [makeIncompleteCount(2)]
            ], 
            colCountGroups: [
                [makeIncompleteCount(2)], 
                [makeIncompleteCount(1), makeIncompleteCount(1)], 
                [makeIncompleteCount(1)]
            ]
        };
        assert.deepStrictEqual(expected, parsePuzzleString('2;1;2#2;1,1;1'));
    });
});

describe('buildPuzzleFromPuzzleString', () => {
    it('creates an empty puzzle with the row and column counts indicated by the puzzle string', () => {
        const expected = {
            rowCountGroups: [
                [makeIncompleteCount(2)], 
                [makeIncompleteCount(1)], 
                [makeIncompleteCount(2)],
                [makeIncompleteCount(3)]
            ], 
            colCountGroups: [
                [makeIncompleteCount(2)], 
                [makeIncompleteCount(1), makeIncompleteCount(1)], 
                [makeIncompleteCount(1)]
            ], 
            board: [
                [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY],
                [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY,],
                [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY,],
                [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY,]
            ]
        };
        assert.deepStrictEqual(expected, buildPuzzleFromPuzzleString('2;1;2;3#2;1,1;1'));
    });
});

describe('extractPuzzleQuery', () => {
    it('should return the string following "puzzle=" in the given url', () => {
        assert.equal('some-query-string', extractPuzzleQuery('https://nonogram.com?puzzle=some-query-string'));
    });
});