const renderPuzzle = require('./ui/render-puzzle.js').renderPuzzle;
const extractPuzzleQuery = require('./puzzle-url.js').extractPuzzleQuery;
const buildPuzzleFromQueryString = require('./puzzle-url.js').buildPuzzleFromQueryString;
const addSolveCellEventListeners = require('./ui/cell-interactions.js').addSolveCellEventListeners;
const addUndoAndRedoListeners = require('./ui/cell-interactions.js').addUndoAndRedoListeners;
const updateSolvePuzzle = require('./ui/render-puzzle.js').updateSolvePuzzle;

const puzzle = buildPuzzleFromQueryString(extractPuzzleQuery(window.location.href));
renderPuzzle(puzzle);
addSolveCellEventListeners(puzzle);
addUndoAndRedoListeners(puzzle, updateSolvePuzzle);