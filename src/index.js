const createGame = require('./ui/create-game.js').createGame;
const setGameDimensions = require('./ui/game-dimensions.js').setGameDimensions;

const DEFAULT_DIMENSION = 5;

function initializeUI() {
    createGame(DEFAULT_DIMENSION, DEFAULT_DIMENSION);
    document.getElementById('xDimensionInput').defaultValue = DEFAULT_DIMENSION;
    document.getElementById('yDimensionInput').defaultValue = DEFAULT_DIMENSION;
    document.getElementById('dimensionsForm').onsubmit = setGameDimensions;
}

initializeUI();