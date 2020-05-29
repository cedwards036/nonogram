const generateSolveGame = require('./game.js').generateSolveGame;

function makeGameString(game) {
    const rowCounts = game.rowCounts.map((rowCount) => {
        return rowCount.join(',');
    }).join(';');
    const colCounts = game.colCounts.map((colCount) => {
        return colCount.join(',');
    }).join(';');
    return rowCounts + '#' + colCounts;
}

function makeGameURLQueryString(game) {
    return btoa(makeGameString(game));
}

function decodeGameURLQueryString(queryString) {
    return atob(queryString);
}

function parseGameString(gameString) {
    function parseCounts(countsStr) {
        return countsStr.split(';').map(s => s.split(',').map(s => parseInt(s)));
    }
    const split = gameString.split('#');
    const rowCounts = parseCounts(split[0]);
    const colCounts = parseCounts(split[1]);
    return {rowCounts: rowCounts, colCounts: colCounts};

}

function buildGameFromGameString(gameString) {
    const parsedCounts = parseGameString(gameString);
    return generateSolveGame(parsedCounts.rowCounts, parsedCounts.colCounts);
}

function buildGameFromQueryString(queryString) {
    return buildGameFromGameString(decodeGameURLQueryString(queryString));
}

function extractGameQuery(url) {
    return url.slice(url.indexOf('?puzzle=') + 8);
}

module.exports = {
    makeGameString: makeGameString,
    makeGameURLQueryString: makeGameURLQueryString,
    parseGameString: parseGameString,
    buildGameFromGameString: buildGameFromGameString,
    buildGameFromQueryString: buildGameFromQueryString,
    extractGameQuery: extractGameQuery
}