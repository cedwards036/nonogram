const makeIncompleteCount = require('../src/puzzle.js').makeIncompleteCount;

function parseCountGroupString(countGroupString, maxSize) {
    countGroupString = removeWhitespace(countGroupString);
    if (isValidString(countGroupString)) {
        var countGroup = countGroupString.split(',').map(x => parseInt(x));
        countGroup = filterOutUnnecessaryZeros(countGroup);
        if (countGroupSumIsTooBig(countGroup, maxSize)) {
            throw new InvalidInputError('Numbers are too big for their row/column');
        }
        return countGroup.map(makeIncompleteCount);
    } else {
        throw new InvalidInputError('Input contains invalid characters or dangling commas');
    }
}

function removeWhitespace(s) {
    return s.replace(/\s/g, '');
}

function isValidString(countGroupString) {
    return /^\d(,?\s*\d\s*)*$/.test(countGroupString)
}

function filterOutUnnecessaryZeros(countGroup) {
    if (countGroup.length > 1) {
        return countGroup.filter(num => num != 0);
    } else {
        return countGroup;
    }
}

function countGroupSumIsTooBig(countGroup, maxSize) {
    return countGroup.reduce((sum, x) => sum + x, 0) + countGroup.length - 1 > maxSize
}

class InvalidInputError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidInputError';
    }
}

module.exports = {
    parseCountGroupString: parseCountGroupString,
    InvalidInputError: InvalidInputError
}