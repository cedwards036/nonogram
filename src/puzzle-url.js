const generateSolvePuzzle = require('./puzzle.js').generateSolvePuzzle;

function makePuzzleString(puzzle) {
    const rowCounts = puzzle.rowCounts.map((rowCount) => {
        return rowCount.join(',');
    }).join(';');
    const colCounts = puzzle.colCounts.map((colCount) => {
        return colCount.join(',');
    }).join(';');
    return rowCounts + '#' + colCounts;
}

function makePuzzleURLQueryString(puzzle) {
    return btoa(makePuzzleString(puzzle));
}

function decodePuzzleURLQueryString(queryString) {
    return atob(queryString);
}

function parsePuzzleString(puzzleString) {
    function parseCounts(countsStr) {
        return countsStr.split(';').map(s => s.split(',').map(s => parseInt(s)));
    }
    const split = puzzleString.split('#');
    const rowCounts = parseCounts(split[0]);
    const colCounts = parseCounts(split[1]);
    return {rowCounts: rowCounts, colCounts: colCounts};

}

function buildPuzzleFromPuzzleString(puzzleString) {
    const parsedCounts = parsePuzzleString(puzzleString);
    return generateSolvePuzzle(parsedCounts.rowCounts, parsedCounts.colCounts);
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