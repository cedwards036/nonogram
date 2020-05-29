/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/solve.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game-url.js":
/*!*************************!*\
  !*** ./src/game-url.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const generateSolveGame = __webpack_require__(/*! ./game.js */ \"./src/game.js\").generateSolveGame;\r\n\r\nfunction makeGameString(game) {\r\n    const rowCounts = game.rowCounts.map((rowCount) => {\r\n        return rowCount.join(',');\r\n    }).join(';');\r\n    const colCounts = game.colCounts.map((colCount) => {\r\n        return colCount.join(',');\r\n    }).join(';');\r\n    return rowCounts + '#' + colCounts;\r\n}\r\n\r\nfunction makeGameURLQueryString(game) {\r\n    return btoa(makeGameString(game));\r\n}\r\n\r\nfunction decodeGameURLQueryString(queryString) {\r\n    return atob(queryString);\r\n}\r\n\r\nfunction parseGameString(gameString) {\r\n    function parseCounts(countsStr) {\r\n        return countsStr.split(';').map(s => s.split(',').map(s => parseInt(s)));\r\n    }\r\n    const split = gameString.split('#');\r\n    const rowCounts = parseCounts(split[0]);\r\n    const colCounts = parseCounts(split[1]);\r\n    return {rowCounts: rowCounts, colCounts: colCounts};\r\n\r\n}\r\n\r\nfunction buildGameFromGameString(gameString) {\r\n    const parsedCounts = parseGameString(gameString);\r\n    return generateSolveGame(parsedCounts.rowCounts, parsedCounts.colCounts);\r\n}\r\n\r\nfunction buildGameFromQueryString(queryString) {\r\n    return buildGameFromGameString(decodeGameURLQueryString(queryString));\r\n}\r\n\r\nfunction extractGameQuery(url) {\r\n    return url.slice(url.indexOf('?puzzle=') + 8);\r\n}\r\n\r\nmodule.exports = {\r\n    makeGameString: makeGameString,\r\n    makeGameURLQueryString: makeGameURLQueryString,\r\n    parseGameString: parseGameString,\r\n    buildGameFromGameString: buildGameFromGameString,\r\n    buildGameFromQueryString: buildGameFromQueryString,\r\n    extractGameQuery: extractGameQuery\r\n}\n\n//# sourceURL=webpack:///./src/game-url.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const STATES = {\r\n    EMPTY: 'empty',\r\n    FILLED: 'filled',\r\n    BLANK: 'blank'\r\n}\r\n\r\nconst MESSAGES = {\r\n    FILL: 'fill',\r\n    BLANK: 'blank'\r\n}\r\n\r\nconst FSM = buildFSM();\r\n\r\nfunction generateSolveGame(rowCounts, colCounts) {\r\n    const board = generateEmptyBoard(colCounts.length, rowCounts.length);\r\n    return {rowCounts: rowCounts, colCounts: colCounts, board: board};\r\n}\r\n\r\nfunction generateCreationGame(width, height) {\r\n    const game = {rowCounts: [], colCounts: []};\r\n    for (let i = 0; i < height; i++) {\r\n        game.rowCounts.push([0])\r\n    }\r\n    for (let i = 0; i < width; i++) {\r\n        game.colCounts.push([0])\r\n    }\r\n    game.board = generateEmptyBoard(width, height);\r\n    return game;\r\n}\r\n\r\nfunction generateEmptyBoard(width, height) {\r\n    if (width === 0 || height === 0) {\r\n        return [];\r\n    } else {\r\n        let board = [];\r\n        for (let i = 0; i < height; i++) {\r\n            board.push([]);\r\n            for (let j = 0; j < width; j++) {\r\n                board[i].push(STATES.EMPTY)\r\n            }\r\n        }\r\n        return board;\r\n    }\r\n}\r\n\r\nfunction makeGameFrom2DArray(arr) {\r\n    const game = generateCreationGame(arr[0].length, arr.length);\r\n    for (let i = 0; i < arr.length; i++) {\r\n        for (let j = 0; j < arr[0].length; j++) {\r\n            if (arr[i][j] === 1) {\r\n                interactWithCell(MESSAGES.FILL, i, j, game);\r\n            }\r\n        }\r\n    }\r\n    for (let i = 0; i < arr.length; i++) {\r\n        updateRowCounts(game, i);\r\n    }\r\n    for (let i = 0; i < arr[0].length; i++) {\r\n        updateColumnCounts(game, i);\r\n    }\r\n    return game;\r\n}\r\n\r\nfunction buildFSM() {\r\n    function addStateTransition(finiteStateMachine, givenState, message, newState) {\r\n        if (!finiteStateMachine.hasOwnProperty(givenState)) {\r\n            finiteStateMachine[givenState] = {};\r\n        }\r\n        finiteStateMachine[givenState][message] = newState\r\n    }\r\n    const finiteStateMachine = {};\r\n    addStateTransition(finiteStateMachine, STATES.EMPTY, MESSAGES.FILL, STATES.FILLED);\r\n    addStateTransition(finiteStateMachine, STATES.EMPTY, MESSAGES.BLANK, STATES.BLANK);\r\n    addStateTransition(finiteStateMachine, STATES.FILLED, MESSAGES.FILL, STATES.EMPTY);\r\n    addStateTransition(finiteStateMachine, STATES.FILLED, MESSAGES.BLANK, STATES.EMPTY);\r\n    addStateTransition(finiteStateMachine, STATES.BLANK, MESSAGES.BLANK, STATES.EMPTY);\r\n    addStateTransition(finiteStateMachine, STATES.BLANK, MESSAGES.FILL, STATES.EMPTY);\r\n    return finiteStateMachine;\r\n}\r\n\r\nfunction interactWithCell(msg, rowIdx, colIdx, game) {\r\n    const currentCellState = game.board[rowIdx][colIdx];\r\n    game.board[rowIdx][colIdx] = FSM[currentCellState][msg];\r\n    return game;\r\n}\r\n\r\nfunction updateColumnCounts(game, colIdx) {\r\n    game.colCounts[colIdx] = makeColumnCounts(game, colIdx);\r\n    return game;\r\n}\r\n\r\nfunction makeColumnCounts(game, colIdx) {\r\n    const columnCounts = [];\r\n    let i = 0;\r\n    var curCount = 0;\r\n    while (i < game.board.length) {\r\n        while (i < game.board.length && game.board[i][colIdx] === STATES.FILLED) {\r\n            curCount++;\r\n            i++;\r\n        }\r\n        if (curCount > 0) {\r\n            columnCounts.push(curCount);\r\n            curCount = 0;\r\n        }\r\n        i++;\r\n    }\r\n    if (columnCounts.length === 0) {\r\n        return [0];\r\n    } else {\r\n        return columnCounts;\r\n    }\r\n}\r\n\r\nfunction updateRowCounts(game, rowIdx) {\r\n    game.rowCounts[rowIdx] = makeRowCounts(game, rowIdx);\r\n    return game;\r\n}\r\n\r\nfunction makeRowCounts(game, rowIdx) {\r\n    const rowCounts = [];\r\n    let i = 0;\r\n    var curCount = 0;\r\n    while (i < game.board[0].length) {\r\n        while (i < game.board[0].length && game.board[rowIdx][i] === STATES.FILLED) {\r\n            curCount++;\r\n            i++;\r\n        }\r\n        if (curCount > 0) {\r\n            rowCounts.push(curCount);\r\n            curCount = 0;\r\n        }\r\n        i++;\r\n    }\r\n    if (rowCounts.length === 0) {\r\n        return [0];\r\n    } else {\r\n        return rowCounts;\r\n    }\r\n}\r\n\r\nfunction puzzleIsSolved(game) {\r\n    const rowsAreCorrect = game.rowCounts.reduce((result, counts, rowIdx) => {\r\n        return result && arrEquals(makeRowCounts(game, rowIdx), counts);\r\n    }, true);\r\n    const colsAreCorrect = game.colCounts.reduce((result, counts, colIdx) => {\r\n        return result && arrEquals(makeColumnCounts(game, colIdx), counts);\r\n    }, true);\r\n    return rowsAreCorrect && colsAreCorrect;\r\n}\r\n\r\nfunction arrEquals(arr1, arr2) {\r\n    if (!arr1 || !arr2) {\r\n        return false;\r\n    } else if (arr1.length != arr2.length) {\r\n        return false;\r\n    } else {\r\n        for (let i = 0; i < arr1.length; i++) {\r\n            if (arr1[i] !== arr2[i]) {\r\n                return false;\r\n            }\r\n        }\r\n        return true;\r\n    }\r\n}\r\n\r\nmodule.exports = {\r\n    generateSolveGame: generateSolveGame,\r\n    generateCreationGame: generateCreationGame,\r\n    generateEmptyBoard: generateEmptyBoard,\r\n    interactWithCell: interactWithCell,\r\n    updateColumnCounts: updateColumnCounts,\r\n    updateRowCounts: updateRowCounts,\r\n    makeGameFrom2DArray: makeGameFrom2DArray,\r\n    puzzleIsSolved: puzzleIsSolved,\r\n    STATES: STATES,\r\n    MESSAGES: MESSAGES\r\n}\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/solve.js":
/*!**********************!*\
  !*** ./src/solve.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const renderGame = __webpack_require__(/*! ./ui/render-game.js */ \"./src/ui/render-game.js\").renderGame;\r\nconst extractGameQuery = __webpack_require__(/*! ./game-url.js */ \"./src/game-url.js\").extractGameQuery;\r\nconst buildGameFromQueryString = __webpack_require__(/*! ./game-url.js */ \"./src/game-url.js\").buildGameFromQueryString;\r\nconst addSolveCellEventListeners = __webpack_require__(/*! ./ui/cell-interactions.js */ \"./src/ui/cell-interactions.js\").addSolveCellEventListeners\r\n\r\nconst game = buildGameFromQueryString(extractGameQuery(window.location.href));\r\nrenderGame(game);\r\naddSolveCellEventListeners(game);\n\n//# sourceURL=webpack:///./src/solve.js?");

/***/ }),

/***/ "./src/ui/cell-interactions.js":
/*!*************************************!*\
  !*** ./src/ui/cell-interactions.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const interactWithCell = __webpack_require__(/*! ../game.js */ \"./src/game.js\").interactWithCell\r\nconst updateColumnCounts = __webpack_require__(/*! ../game.js */ \"./src/game.js\").updateColumnCounts;\r\nconst updateRowCounts = __webpack_require__(/*! ../game.js */ \"./src/game.js\").updateRowCounts;\r\nconst puzzleIsSolved = __webpack_require__(/*! ../game.js */ \"./src/game.js\").puzzleIsSolved;\r\nconst MESSAGES = __webpack_require__(/*! ../game.js */ \"./src/game.js\").MESSAGES\r\nconst updateLineCountsColumnDiv = __webpack_require__(/*! ./render-game.js */ \"./src/ui/render-game.js\").updateLineCountsColumnDiv;\r\nconst updateCellStateClass = __webpack_require__(/*! ./render-game.js */ \"./src/ui/render-game.js\").updateCellStateClass\r\nconst getCellClass = __webpack_require__(/*! ./render-game.js */ \"./src/ui/render-game.js\").getCellClass;\r\nconst updateGameURL = __webpack_require__(/*! ./render-game-url.js */ \"./src/ui/render-game-url.js\").updateGameURL;\r\n\r\nfunction addCreationCellEventListeners(game) {\r\n    Array.from(document.getElementsByClassName('cell')).forEach(cell => {\r\n        cell.addEventListener('click', () => {\r\n            handleCreationCellClick(game, cell, MESSAGES.FILL)\r\n        });\r\n    }); \r\n}\r\n\r\nfunction addSolveCellEventListeners(game) {\r\n    Array.from(document.getElementsByClassName('cell')).forEach(cell => {\r\n        cell.addEventListener('click', () => {\r\n            handleSolveCellClick(game, cell, MESSAGES.FILL)\r\n        });\r\n        cell.addEventListener('contextmenu', (e) => {\r\n            handleSolveCellClick(game, cell, MESSAGES.BLANK)\r\n            e.preventDefault();\r\n        });\r\n    }); \r\n}\r\n\r\nfunction handleSolveCellClick(game, cell, message) {\r\n    const rowIdx = cell.getAttribute('rowIdx');\r\n    const colIdx = cell.getAttribute('colIdx');\r\n    interactWithCell(message, rowIdx, colIdx, game);\r\n    updateCellStateClass(cell, getCellClass(game.board[rowIdx][colIdx]));\r\n    if (puzzleIsSolved(game)) {\r\n        alert('You did it!')\r\n    }\r\n}\r\n\r\nfunction handleCreationCellClick(game, cell, message) {\r\n    const rowIdx = cell.getAttribute('rowIdx');\r\n    const colIdx = cell.getAttribute('colIdx');\r\n    interactWithCell(message, rowIdx, colIdx, game);\r\n    updateColumnCountDivs(game, colIdx);\r\n    updateRowCountDivs(game, rowIdx);\r\n    updateCellStateClass(cell, getCellClass(game.board[rowIdx][colIdx]));\r\n    updateGameURL(game);\r\n}\r\n\r\nfunction updateColumnCountDivs(game, colIdx) {\r\n    updateColumnCounts(game, colIdx);\r\n    const colCountsDiv = getNthColumnCountsCol(colIdx);\r\n    updateLineCountsColumnDiv(colCountsDiv, game.colCounts[colIdx]);\r\n}\r\n\r\nfunction getNthColumnCountsCol(n) {\r\n    return document.getElementById('colCounts')\r\n                   .getElementsByClassName('counts-col')[n];\r\n}\r\n\r\nfunction updateRowCountDivs(game, rowIdx) {\r\n    updateRowCounts(game, rowIdx);\r\n    const rowCountsDiv = getNthRowCountsCol(rowIdx);\r\n    updateLineCountsColumnDiv(rowCountsDiv, game.rowCounts[rowIdx]);\r\n}\r\n\r\nfunction getNthRowCountsCol(n) {\r\n    return document.getElementById('rowCounts')\r\n                   .getElementsByClassName('counts-col')[n];\r\n}\r\n\r\nmodule.exports = {\r\n    addCreationCellEventListeners: addCreationCellEventListeners,\r\n    addSolveCellEventListeners: addSolveCellEventListeners\r\n}\n\n//# sourceURL=webpack:///./src/ui/cell-interactions.js?");

/***/ }),

/***/ "./src/ui/render-game-url.js":
/*!***********************************!*\
  !*** ./src/ui/render-game-url.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const makeGameURLQueryString = __webpack_require__(/*! ../game-url.js */ \"./src/game-url.js\").makeGameURLQueryString;\r\n\r\nfunction updateGameURL(game) {\r\n    const url = makeGameURL(game);\r\n    const link = `<a href=\"${url}\" target=\"_blank\">${url}</a>`\r\n    document.getElementById('gameURL').innerHTML = link;\r\n}\r\n\r\nfunction makeGameURL(game) {\r\n    const baseUrl = window.location.href.slice(0, window.location.href.lastIndexOf('/') + 1)\r\n    return baseUrl + 'solve.html?puzzle=' + makeGameURLQueryString(game);\r\n}\r\n\r\nmodule.exports = {\r\n    updateGameURL: updateGameURL\r\n}\n\n//# sourceURL=webpack:///./src/ui/render-game-url.js?");

/***/ }),

/***/ "./src/ui/render-game.js":
/*!*******************************!*\
  !*** ./src/ui/render-game.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const STATES = __webpack_require__(/*! ../game.js */ \"./src/game.js\").STATES\r\n\r\nfunction renderGame(game) {\r\n    renderCellGrid(game);\r\n    renderRowCounts(game);\r\n    renderColCounts(game);\r\n}\r\n\r\nfunction renderCellGrid(game) {\r\n    const grid = document.getElementById('cellGrid');\r\n    for (let i = 0; i < game.board.length; i++) {\r\n        const row = createEmptyRow();\r\n        for (let j = 0; j < game.board[i].length; j++) {\r\n            row.appendChild(createCell(game.board, i, j));\r\n        }\r\n        grid.appendChild(row);\r\n    }\r\n}\r\n\r\nfunction createEmptyRow() {\r\n    const row = document.createElement('div');\r\n    row.setAttribute('class', 'row');\r\n    return row;\r\n}\r\n\r\nfunction createCell(board, rowIdx, colIdx) {\r\n    const cell = document.createElement('div');\r\n    updateCellStateClass(cell, getCellClass(board[rowIdx][colIdx]));\r\n    cell.setAttribute('rowIdx', rowIdx);\r\n    cell.setAttribute('colIdx', colIdx);\r\n    return cell;\r\n}\r\n\r\nfunction getCellClass(cellState) {\r\n    switch(cellState) {\r\n        case STATES.EMPTY:\r\n            return 'empty-cell'\r\n        case STATES.FILLED:\r\n            return 'filled-cell'\r\n        case STATES.BLANK:\r\n            return 'blank-cell'        \r\n    }\r\n}\r\n\r\nfunction updateCellStateClass(cell, stateClass) {\r\n    cell.setAttribute('class', 'cell ' + stateClass);\r\n}\r\n\r\nfunction renderRowCounts(game) {\r\n    createCountsCollection(game.rowCounts, document.getElementById('rowCounts'));\r\n}\r\n\r\nfunction renderColCounts(game) {\r\n    createCountsCollection(game.colCounts, document.getElementById('colCounts'));\r\n}\r\n\r\nfunction createCountsCollection(counts, parentDiv) {\r\n    counts.forEach(countsArr => {\r\n        parentDiv.appendChild(createLineCountsColumnDiv(countsArr));\r\n    });\r\n    return parentDiv;\r\n}\r\n\r\nfunction createLineCountsColumnDiv(lineCountsColumn) {\r\n    const columnDiv = document.createElement('div');\r\n    columnDiv.setAttribute('class', 'counts-col');\r\n    return updateLineCountsColumnDiv(columnDiv, lineCountsColumn);\r\n}\r\n\r\nfunction updateLineCountsColumnDiv(columnDiv, lineCountsColumn) {\r\n    clearChildren(columnDiv);\r\n    lineCountsColumn.forEach(count => {\r\n        columnDiv.appendChild(createCountDiv(count));\r\n    });\r\n    return columnDiv;\r\n}\r\n\r\nfunction clearChildren(element) {\r\n    while (element.firstChild) {\r\n        element.removeChild(element.lastChild);\r\n    }\r\n}\r\n\r\nfunction createCountDiv(count) {\r\n    const countDiv = document.createElement('div');\r\n    countDiv.textContent = count;\r\n    countDiv.setAttribute('class', 'count');\r\n    return countDiv;\r\n}\r\n\r\nmodule.exports = {\r\n    renderGame: renderGame,\r\n    updateLineCountsColumnDiv: updateLineCountsColumnDiv,\r\n    updateCellStateClass: updateCellStateClass,\r\n    getCellClass: getCellClass\r\n}\n\n//# sourceURL=webpack:///./src/ui/render-game.js?");

/***/ })

/******/ });