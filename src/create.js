const createCreationPuzzle = require('./ui/create-puzzle.js').createCreationPuzzle;
const makePuzzleDimensionsSetter = require('./ui/puzzle-dimensions.js').makePuzzleDimensionsSetter;

const DEFAULT_DIMENSION = 5;

function initializeUI() {
    createCreationPuzzle(DEFAULT_DIMENSION, DEFAULT_DIMENSION);
    document.getElementById('xDimensionInput').defaultValue = DEFAULT_DIMENSION;
    document.getElementById('yDimensionInput').defaultValue = DEFAULT_DIMENSION;
    document.getElementById('dimensionsForm').onsubmit = makePuzzleDimensionsSetter(createCreationPuzzle);
}

initializeUI();