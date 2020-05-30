const createEnterPuzzle = require('./ui/create-puzzle.js').createEnterPuzzle;
const makePuzzleDimensionsSetter = require('./ui/puzzle-dimensions.js').makePuzzleDimensionsSetter;

const DEFAULT_DIMENSION = 5;

function initializeUI() {
    const puzzle = createEnterPuzzle(DEFAULT_DIMENSION, DEFAULT_DIMENSION);
    document.getElementById('xDimensionInput').defaultValue = DEFAULT_DIMENSION;
    document.getElementById('yDimensionInput').defaultValue = DEFAULT_DIMENSION;
    document.getElementById('dimensionsForm').onsubmit = makePuzzleDimensionsSetter(createEnterPuzzle);
}

initializeUI();