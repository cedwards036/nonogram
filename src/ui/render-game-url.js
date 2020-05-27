const makeGameURLQueryString = require('../game-url.js').makeGameURLQueryString;

function updateGameURL(game) {
    document.getElementById('gameURL').textContent = makeGameURL(game);
}

function makeGameURL(game) {
    return window.location.href + '/' + makeGameURLQueryString(game);
}

module.exports = {
    updateGameURL: updateGameURL
}