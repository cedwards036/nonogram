const createPuzzle = require('./ui/create-puzzle.js').createPuzzle;
const setPuzzleDimensions = require('./ui/puzzle-dimensions.js').setPuzzleDimensions;

const DEFAULT_DIMENSION = 5;

function initializeUI() {
    createPuzzle(DEFAULT_DIMENSION, DEFAULT_DIMENSION);
    document.getElementById('xDimensionInput').defaultValue = DEFAULT_DIMENSION;
    document.getElementById('yDimensionInput').defaultValue = DEFAULT_DIMENSION;
    document.getElementById('dimensionsForm').onsubmit = setPuzzleDimensions;
}

initializeUI();