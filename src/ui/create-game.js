const generateCreationGame = require('../game.js').generateCreationGame
const renderGame = require('./render-game.js').renderGame;
const addCellEventListeners = require('./cell-interactions.js').addCellEventListeners;
const updateGameURL = require('./render-game-url.js').updateGameURL;

function createGame(height, width) {
    const newGame = generateCreationGame(height, width);
    renderGame(newGame);
    addCellEventListeners(newGame);
    updateGameURL(newGame);
    return newGame;
}

module.exports = {
    createGame: createGame
}