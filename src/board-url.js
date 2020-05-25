function makeGameString(game) {
    const dimensions = game.colCounts.length + 'x' + game.rowCounts.length;
    const rowCounts = game.rowCounts.map((rowCount) => {
        return rowCount.join(',');
    }).join(';');
    const colCounts = game.colCounts.map((colCount) => {
        return colCount.join(',');
    }).join(';');
    return dimensions + '#' + rowCounts + '#' + colCounts;
}

function makeGameURLComponent(game) {
    return btoa(makeGameString(game));
}

module.exports = {
    makeGameString: makeGameString,
    makeGameURLComponent: makeGameURLComponent
}