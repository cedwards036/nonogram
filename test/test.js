const assert = require('assert');
const generateCreationBoard = require('../src/boardCreation.js').generateCreationBoard

describe('generateCreationBoard', () => {
    it('should create an 0 x 0 grid if either n or m is zero', () => {
        assert.deepEqual([], generateCreationBoard(0, 0));
        assert.deepEqual([], generateCreationBoard(1, 0));
        assert.deepEqual([], generateCreationBoard(0, 1));
    });

    it('should create an n x m grid of empty cells', () => {
        assert.deepEqual([['empty']], generateCreationBoard(1, 1));
        assert.deepEqual([['empty', 'empty', 'empty']], generateCreationBoard(1, 3));
        assert.deepEqual([['empty'], ['empty'], ['empty']], generateCreationBoard(3, 1));
        assert.deepEqual([
            ['empty', 'empty'],
            ['empty', 'empty']
        ], generateCreationBoard(2, 2));
    });
});
