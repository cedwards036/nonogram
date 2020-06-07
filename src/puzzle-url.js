const generateSolvePuzzle = require('./puzzle.js').generateSolvePuzzle;
const makeIncompleteCount = require('../src/puzzle.js').makeIncompleteCount;

function makePuzzleString(puzzle) {
    const rowCountGroups = puzzle.rowCountGroups.map((rowCountGroup) => {
        return rowCountGroup.map(count => count.value).join(',');
    }).join(';');
    const colCountGroups = puzzle.colCountGroups.map((colCount) => {
        return colCount.map(count => count.value).join(',');
    }).join(';');
    return rowCountGroups + '#' + colCountGroups;
}

function makePuzzleURLQueryString(puzzle) {
    return btoa(makePuzzleString(puzzle));
}

function decodePuzzleURLQueryString(queryString) {
    return atob(queryString);
}

function parsePuzzleString(puzzleString) {
    function parseCounts(countsStr) {
        return countsStr
            .split(';')
            .map(s => s.split(',')
            .map(s => makeIncompleteCount(parseInt(s))));
    }
    const split = puzzleString.split('#');
    const rowCountGroups = parseCounts(split[0]);
    const colCountGroups = parseCounts(split[1]);
    return {rowCountGroups: rowCountGroups, colCountGroups: colCountGroups};
}

function buildPuzzleFromPuzzleString(puzzleString) {
    const parsedCounts = parsePuzzleString(puzzleString);
    return generateSolvePuzzle(parsedCounts.rowCountGroups, parsedCounts.colCountGroups);
}

function buildPuzzleFromQueryString(queryString) {
    return buildPuzzleFromPuzzleString(decodePuzzleURLQueryString(queryString));
}

function extractPuzzleQuery(url) {
    return url.slice(url.indexOf('?puzzle=') + 8);
}

module.exports = {
    makePuzzleString: makePuzzleString,
    makePuzzleURLQueryString: makePuzzleURLQueryString,
    parsePuzzleString: parsePuzzleString,
    buildPuzzleFromPuzzleString: buildPuzzleFromPuzzleString,
    buildPuzzleFromQueryString: buildPuzzleFromQueryString,
    extractPuzzleQuery: extractPuzzleQuery
}