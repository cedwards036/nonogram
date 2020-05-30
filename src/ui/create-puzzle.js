const generateCreationPuzzle = require('../puzzle.js').generateCreationPuzzle
const renderPuzzle = require('./render-puzzle.js').renderPuzzle;
const addCreationCellEventListeners = require('./cell-interactions.js').addCreationCellEventListeners;
const updatePuzzleURL = require('./render-puzzle-url.js').updatePuzzleURL;

function createPuzzle(height, width) {
    const newPuzzle = generateCreationPuzzle(height, width);
    renderPuzzle(newPuzzle);
    addCreationCellEventListeners(newPuzzle);
    updatePuzzleURL(newPuzzle);
    return newPuzzle;
}

module.exports = {
    createPuzzle: createPuzzle
}