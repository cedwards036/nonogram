const createPuzzle = require('./create-puzzle.js').createPuzzle;

function setPuzzleDimensions() {
    const height = document.getElementById('yDimensionInput').value;
    const width = document.getElementById('xDimensionInput').value;
    if (dimensionsAreValid(width, height)) {
        clearPuzzle();
        createPuzzle(width, height);
    } else {
        resetDimensions();
        alert('ERROR: invalid dimensions');
    }
    return false;
}

function dimensionsAreValid(width, height) {
    const MAX_DIMENSION = 15;
    const MIN_DIMENSION = 1;

    function isValidDimension(value) {
        return isInt(value) && value >= MIN_DIMENSION && value <= MAX_DIMENSION;
    }
    
    //https://stackoverflow.com/a/1779019
    function isInt(value) {
        return /^\d+$/.test(value);
    }
    return isValidDimension(height) && isValidDimension(width)
}

function clearPuzzle() {
    document.getElementById('cellGrid').innerHTML = '';
    document.getElementById('colCounts').innerHTML = '';
    document.getElementById('rowCounts').innerHTML = '';
}

function resetDimensions() {
    document.getElementById('yDimensionInput').value = document.getElementById('rowCounts').childElementCount;
    document.getElementById('xDimensionInput').value = document.getElementById('colCounts').childElementCount;
}

module.exports = {
    setPuzzleDimensions: setPuzzleDimensions
}