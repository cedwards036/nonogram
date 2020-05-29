const assert = require('assert');
const makeGameFrom2DArray = require('../src/game.js').makeGameFrom2DArray;
const STATES = require('../src/game.js').STATES;
const makeGameString = require('../src/game-url.js').makeGameString;
const parseGameString = require('../src/game-url.js').parseGameString;
const buildGameFromGameString = require('../src/game-url.js').buildGameFromGameString;
const extractGameQuery = require('../src/game-url.js').extractGameQuery;

describe('makeGameString', () => {
    it('starts with comma-separated row counts with each count set separated by a semi-colon', () => {
        const game = makeGameFrom2DArray([
            [1, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ]);
        assert.equal('1,1;3;0', makeGameString(game).slice(0, 7));
    });

    it('lists comma-separated col counts after row counts with each count set separated by a semi-colon', () => {
        const game = makeGameFrom2DArray([
            [1, 1, 0],
            [1, 0, 0],
            [0, 1, 1]
        ]);
        assert.equal('2;1;2#2;1,1;1', makeGameString(game));
    });
});

describe('parseGameString', () => {
    it('parses the given string into an object with arrays of row counts and column counts', () => {
        const expected = {rowCounts: [[2], [1], [2]], colCounts: [[2], [1, 1], [1]]};
        assert.deepStrictEqual(expected, parseGameString('2;1;2#2;1,1;1'));
    });
});

describe('buildGameFromGameString', () => {
    it('creates an empty game with the row and column counts indicated by the game string', () => {
        const expected = {rowCounts: [[2], [1], [2], [3]], colCounts: [[2], [1, 1], [1]], board: [
            [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY],
            [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY,],
            [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY,],
            [STATES.EMPTY, STATES.EMPTY, STATES.EMPTY,]
        ]};
        assert.deepStrictEqual(expected, buildGameFromGameString('2;1;2;3#2;1,1;1'));
    });
});

describe('extractGameQuery', () => {
    it('should return the string following "puzzle=" in the given url', () => {
        assert.equal('some-query-string', extractGameQuery('https://nonogram.com?puzzle=some-query-string'));
    });
});