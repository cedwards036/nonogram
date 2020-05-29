const generateCreationGame = require('../game.js').generateCreationGame
const renderGame = require('./render-game.js').renderGame;
const addCreationCellEventListeners = require('./cell-interactions.js').addCreationCellEventListeners;
const updateGameURL = require('./render-game-url.js').updateGameURL;

function createGame(height, width) {
    const newGame = generateCreationGame(height, width);
    renderGame(newGame);
    addCreationCellEventListeners(newGame);
    updateGameURL(newGame);
    return newGame;
}

module.exports = {
    createGame: createGame
}