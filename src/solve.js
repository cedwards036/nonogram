const renderGame = require('./ui/render-game.js').renderGame;
const extractGameQuery = require('./game-url.js').extractGameQuery;
const buildGameFromQueryString = require('./game-url.js').buildGameFromQueryString;
const addSolveCellEventListeners = require('./ui/cell-interactions.js').addSolveCellEventListeners

const game = buildGameFromQueryString(extractGameQuery(window.location.href));
renderGame(game);
addSolveCellEventListeners(game);