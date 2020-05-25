const assert = require('assert');
const generateCreationGame = require('../src/board.js').generateCreationGame;
const makeGameFrom2DArray = require('../src/board.js').makeGameFrom2DArray;
const makeGameString = require('../src/board-url.js').makeGameString;

describe('makeGameString', () => {
    it('creates a string that starts with the dimensions of the puzzle', () => {
        const threeByFourGame = generateCreationGame(3, 4);
        assert.equal('3x4', makeGameString(threeByFourGame).slice(0, 3))
        const fifteenBythreeHundredGame = generateCreationGame(15, 300);
        assert.equal('15x300', makeGameString(fifteenBythreeHundredGame).slice(0, 6))
    });

    it('lists comma-separated row counts after dimensions with each count set separated by a semi-colon', () => {
        const game = makeGameFrom2DArray([
            [1, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ]);
        assert.equal('3x3#1,1;3;0', makeGameString(game).slice(0, 11));
    });

    it('lists comma-separated col counts after row counts with each count set separated by a semi-colon', () => {
        const game = makeGameFrom2DArray([
            [1, 1, 0],
            [1, 0, 0],
            [0, 1, 1]
        ]);
        assert.equal('3x3#2;1;2#2;1,1;1', makeGameString(game));
    });
});