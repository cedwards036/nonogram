const generateEmptyPuzzle = require('../puzzle.js').generateEmptyPuzzle
const renderPuzzle = require('./render-puzzle.js').renderPuzzle;
const setCountGroupDivSizes = require('./render-puzzle.js').setCountGroupDivSizes;
const addCreationCellEventListeners = require('./cell-interactions.js').addCreationCellEventListeners;
const updatePuzzleURL = require('./render-puzzle-url.js').updatePuzzleURL;

function createCreationPuzzle(height, width) {
    return createPuzzle(height, width, addCreationCellEventListeners);
}

const addEventListenersToCounts = require('./modal.js').addEventListenersToCounts;
const addModalCloseEventListener = require('./modal.js').addModalCloseEventListener;

function createEnterPuzzle(height, width) {
    return createPuzzle(height, width, puzzle => {
        addEventListenersToCounts(puzzle);
        addModalCloseEventListener(puzzle);
    });
}

function createPuzzle(height, width, eventListenerFunction) {
    const newPuzzle = generateEmptyPuzzle(height, width);
    renderPuzzle(newPuzzle);
    setCountGroupDivSizes(newPuzzle);
    eventListenerFunction(newPuzzle);
    updatePuzzleURL(newPuzzle);
    return newPuzzle;
}

module.exports = {
    createCreationPuzzle: createCreationPuzzle,
    createEnterPuzzle: createEnterPuzzle
}