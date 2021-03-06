const clearPuzzle = require('./render-puzzle.js').clearPuzzle;

function makePuzzleDimensionsSetter(createPuzzleFunction) {
    return () => {
        const yInput = document.getElementById('yDimensionInput');
        const xInput = document.getElementById('xDimensionInput');
        const height = yInput.value;
        const width = xInput.value;
        if (dimensionsAreValid(width, height)) {
            const intHeight = parseInt(height);
            const intWidth = parseInt(width);
            clearPuzzle();
            createPuzzleFunction(intWidth, intHeight);
            //reassign the integer values to the input to remove any leading zeros
            // e.g. convert '005' -> '5'
            yInput.value = intHeight;
            xInput.value = intWidth;
        } else {
            resetDimensions();
            alert('ERROR: invalid dimensions');
        }
        return false;
    }
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

function resetDimensions() {
    document.getElementById('yDimensionInput').value = document.getElementById('rowCountGroups').childElementCount;
    document.getElementById('xDimensionInput').value = document.getElementById('colCountGroups').childElementCount;
}

module.exports = {
    makePuzzleDimensionsSetter: makePuzzleDimensionsSetter
}