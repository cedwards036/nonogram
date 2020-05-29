const makeGameURLQueryString = require('../game-url.js').makeGameURLQueryString;

function updateGameURL(game) {
    const url = makeGameURL(game);
    const link = `<a href="${url}" target="_blank">${url}</a>`
    document.getElementById('gameURL').innerHTML = link;
}

function makeGameURL(game) {
    const baseUrl = window.location.href.slice(0, window.location.href.lastIndexOf('/') + 1)
    return baseUrl + 'solve.html?puzzle=' + makeGameURLQueryString(game);
}

module.exports = {
    updateGameURL: updateGameURL
}