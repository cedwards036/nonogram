const makeGameURLComponent = require('../game-url.js').makeGameURLComponent;

function updateGameURL(game) {
    document.getElementById('gameURL').textContent = makeGameURL(game);
}

function makeGameURL(game) {
    return window.location.href + '/' + makeGameURLComponent(game);
}

module.exports = {
    updateGameURL: updateGameURL
}