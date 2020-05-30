const assert = require('assert');
const parseCountGroupString = require('../src/puzzle-entry-parsing.js').parseCountGroupString;
const InvalidInputError = require('../src/puzzle-entry-parsing.js').InvalidInputError;

describe('parseCountGroupString', () => {
    it('splits a comma-separated string of numbers into an array of integers', () => {
        assert.deepStrictEqual([1, 23, 4, 5], parseCountGroupString('1,23,4,5', 36))
    });

    it('ignores extra whitespace when parsing', () => {
        assert.deepStrictEqual([1, 23, 4, 5], parseCountGroupString(' 1  ,    23, 4,5     ', 36))
    });

    it('ignores zeros if there are non-zero numbers in the count group', () => {
        assert.deepStrictEqual([1, 1], parseCountGroupString('1,0,1', 5))
    });

    it('does not ignore zero if zero is the only number in the count group', () => {
        assert.deepStrictEqual([0], parseCountGroupString('0', 5))
    });

    it('throws an error if the string contains characters besides digits, commas, and whitespace', () => {
        assert.throws(() => {parseCountGroupString('1;2;3;4;5', 19)}, InvalidInputError);
        assert.throws(() => {parseCountGroupString('', 0)}, InvalidInputError);
        assert.throws(() => {parseCountGroupString('1,a,2', 4)}, InvalidInputError);
    });

    it('throws an error if the string contains commas that are not between two numbers', () => {
        assert.throws(() => {parseCountGroupString(',1,2,3', 19)}, InvalidInputError);
        assert.throws(() => {parseCountGroupString('1,2,3,', 4)}, InvalidInputError);
        assert.throws(() => {parseCountGroupString(',', 4)}, InvalidInputError);
    });

    it('throws an error if the digits could not possibly fit in the column or row they describe', () => {
        assert.throws(() => {parseCountGroupString('1,1,1', 3)}, InvalidInputError);
        assert.throws(() => {parseCountGroupString('2,5', 2)}, InvalidInputError);
    });
});