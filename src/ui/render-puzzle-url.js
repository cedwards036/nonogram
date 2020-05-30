const makePuzzleURLQueryString = require('../puzzle-url.js').makePuzzleURLQueryString;

function updatePuzzleURL(puzzle) {
    const url = makePuzzleURL(puzzle);
    const link = `<a href="${url}" target="_blank">${url}</a>`
    document.getElementById('puzzleURL').innerHTML = link;
}

function makePuzzleURL(puzzle) {
    const baseUrl = window.location.href.slice(0, window.location.href.lastIndexOf('/') + 1)
    return baseUrl + 'solve.html?puzzle=' + makePuzzleURLQueryString(puzzle);
}

module.exports = {
    updatePuzzleURL: updatePuzzleURL
}