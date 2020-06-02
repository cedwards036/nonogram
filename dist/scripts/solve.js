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

/***/ "./src/puzzle-url.js":
/*!***************************!*\
  !*** ./src/puzzle-url.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const generateSolvePuzzle = __webpack_require__(/*! ./puzzle.js */ \"./src/puzzle.js\").generateSolvePuzzle;\r\n\r\nfunction makePuzzleString(puzzle) {\r\n    const rowCountGroups = puzzle.rowCountGroups.map((rowCountGroup) => {\r\n        return rowCountGroup.join(',');\r\n    }).join(';');\r\n    const colCountGroups = puzzle.colCountGroups.map((colCount) => {\r\n        return colCount.join(',');\r\n    }).join(';');\r\n    return rowCountGroups + '#' + colCountGroups;\r\n}\r\n\r\nfunction makePuzzleURLQueryString(puzzle) {\r\n    return btoa(makePuzzleString(puzzle));\r\n}\r\n\r\nfunction decodePuzzleURLQueryString(queryString) {\r\n    return atob(queryString);\r\n}\r\n\r\nfunction parsePuzzleString(puzzleString) {\r\n    function parseCounts(countsStr) {\r\n        return countsStr.split(';').map(s => s.split(',').map(s => parseInt(s)));\r\n    }\r\n    const split = puzzleString.split('#');\r\n    const rowCountGroups = parseCounts(split[0]);\r\n    const colCountGroups = parseCounts(split[1]);\r\n    return {rowCountGroups: rowCountGroups, colCountGroups: colCountGroups};\r\n}\r\n\r\nfunction buildPuzzleFromPuzzleString(puzzleString) {\r\n    const parsedCounts = parsePuzzleString(puzzleString);\r\n    return generateSolvePuzzle(parsedCounts.rowCountGroups, parsedCounts.colCountGroups);\r\n}\r\n\r\nfunction buildPuzzleFromQueryString(queryString) {\r\n    return buildPuzzleFromPuzzleString(decodePuzzleURLQueryString(queryString));\r\n}\r\n\r\nfunction extractPuzzleQuery(url) {\r\n    return url.slice(url.indexOf('?puzzle=') + 8);\r\n}\r\n\r\nmodule.exports = {\r\n    makePuzzleString: makePuzzleString,\r\n    makePuzzleURLQueryString: makePuzzleURLQueryString,\r\n    parsePuzzleString: parsePuzzleString,\r\n    buildPuzzleFromPuzzleString: buildPuzzleFromPuzzleString,\r\n    buildPuzzleFromQueryString: buildPuzzleFromQueryString,\r\n    extractPuzzleQuery: extractPuzzleQuery\r\n}\n\n//# sourceURL=webpack:///./src/puzzle-url.js?");

/***/ }),

/***/ "./src/puzzle.js":
/*!***********************!*\
  !*** ./src/puzzle.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const STATES = {\r\n    EMPTY: 'empty',\r\n    FILLED: 'filled',\r\n    BLANK: 'blank'\r\n}\r\n\r\nconst MESSAGES = {\r\n    FILL: 'fill',\r\n    BLANK: 'blank'\r\n}\r\n\r\nconst FSM = buildFSM();\r\n\r\nfunction generateSolvePuzzle(rowCountGroups, colCountGroups) {\r\n    const board = generateEmptyBoard(colCountGroups.length, rowCountGroups.length);\r\n    return {rowCountGroups: rowCountGroups, colCountGroups: colCountGroups, board: board};\r\n}\r\n\r\nfunction generateEmptyPuzzle(width, height) {\r\n    const puzzle = {rowCountGroups: [], colCountGroups: []};\r\n    for (let i = 0; i < height; i++) {\r\n        puzzle.rowCountGroups.push([0])\r\n    }\r\n    for (let i = 0; i < width; i++) {\r\n        puzzle.colCountGroups.push([0])\r\n    }\r\n    puzzle.board = generateEmptyBoard(width, height);\r\n    return puzzle;\r\n}\r\n\r\nfunction generateEmptyBoard(width, height) {\r\n    if (width === 0 || height === 0) {\r\n        return [];\r\n    } else {\r\n        let board = [];\r\n        for (let i = 0; i < height; i++) {\r\n            board.push([]);\r\n            for (let j = 0; j < width; j++) {\r\n                board[i].push(STATES.EMPTY)\r\n            }\r\n        }\r\n        return board;\r\n    }\r\n}\r\n\r\nfunction makePuzzleFrom2DArray(arr) {\r\n    const puzzle = generateEmptyPuzzle(arr[0].length, arr.length);\r\n    for (let i = 0; i < arr.length; i++) {\r\n        for (let j = 0; j < arr[0].length; j++) {\r\n            if (arr[i][j] === 1) {\r\n                interactWithCell(MESSAGES.FILL, i, j, puzzle);\r\n            }\r\n        }\r\n    }\r\n    for (let i = 0; i < arr.length; i++) {\r\n        updateRowCountGroup(puzzle, i);\r\n    }\r\n    for (let i = 0; i < arr[0].length; i++) {\r\n        updateColumnCountGroup(puzzle, i);\r\n    }\r\n    return puzzle;\r\n}\r\n\r\nfunction buildFSM() {\r\n    function addStateTransition(finiteStateMachine, givenState, message, newState) {\r\n        if (!finiteStateMachine.hasOwnProperty(givenState)) {\r\n            finiteStateMachine[givenState] = {};\r\n        }\r\n        finiteStateMachine[givenState][message] = newState\r\n    }\r\n    const finiteStateMachine = {};\r\n    addStateTransition(finiteStateMachine, STATES.EMPTY, MESSAGES.FILL, STATES.FILLED);\r\n    addStateTransition(finiteStateMachine, STATES.EMPTY, MESSAGES.BLANK, STATES.BLANK);\r\n    addStateTransition(finiteStateMachine, STATES.FILLED, MESSAGES.FILL, STATES.EMPTY);\r\n    addStateTransition(finiteStateMachine, STATES.FILLED, MESSAGES.BLANK, STATES.EMPTY);\r\n    addStateTransition(finiteStateMachine, STATES.BLANK, MESSAGES.BLANK, STATES.EMPTY);\r\n    addStateTransition(finiteStateMachine, STATES.BLANK, MESSAGES.FILL, STATES.EMPTY);\r\n    return finiteStateMachine;\r\n}\r\n\r\nfunction interactWithCell(msg, rowIdx, colIdx, puzzle) {\r\n    const currentCellState = puzzle.board[rowIdx][colIdx];\r\n    puzzle.board[rowIdx][colIdx] = FSM[currentCellState][msg];\r\n    return puzzle;\r\n}\r\n\r\nfunction updateColumnCountGroup(puzzle, colIdx) {\r\n    puzzle.colCountGroups[colIdx] = makeColumnCountGroup(puzzle, colIdx);\r\n    return puzzle;\r\n}\r\n\r\nfunction makeColumnCountGroup(puzzle, colIdx) {\r\n    const columnCounts = [];\r\n    let i = 0;\r\n    var curCount = 0;\r\n    while (i < puzzle.board.length) {\r\n        while (i < puzzle.board.length && puzzle.board[i][colIdx] === STATES.FILLED) {\r\n            curCount++;\r\n            i++;\r\n        }\r\n        if (curCount > 0) {\r\n            columnCounts.push(curCount);\r\n            curCount = 0;\r\n        }\r\n        i++;\r\n    }\r\n    if (columnCounts.length === 0) {\r\n        return [0];\r\n    } else {\r\n        return columnCounts;\r\n    }\r\n}\r\n\r\nfunction updateRowCountGroup(puzzle, rowIdx) {\r\n    puzzle.rowCountGroups[rowIdx] = makeRowCountGroup(puzzle, rowIdx);\r\n    return puzzle;\r\n}\r\n\r\nfunction makeRowCountGroup(puzzle, rowIdx) {\r\n    const rowCountGroups = [];\r\n    let i = 0;\r\n    var curCount = 0;\r\n    while (i < puzzle.board[0].length) {\r\n        while (i < puzzle.board[0].length && puzzle.board[rowIdx][i] === STATES.FILLED) {\r\n            curCount++;\r\n            i++;\r\n        }\r\n        if (curCount > 0) {\r\n            rowCountGroups.push(curCount);\r\n            curCount = 0;\r\n        }\r\n        i++;\r\n    }\r\n    if (rowCountGroups.length === 0) {\r\n        return [0];\r\n    } else {\r\n        return rowCountGroups;\r\n    }\r\n}\r\n\r\nfunction puzzleIsSolved(puzzle) {\r\n    const rowsAreCorrect = puzzle.rowCountGroups.reduce((result, counts, rowIdx) => {\r\n        return result && arrEquals(makeRowCountGroup(puzzle, rowIdx), counts);\r\n    }, true);\r\n    const colsAreCorrect = puzzle.colCountGroups.reduce((result, counts, colIdx) => {\r\n        return result && arrEquals(makeColumnCountGroup(puzzle, colIdx), counts);\r\n    }, true);\r\n    return rowsAreCorrect && colsAreCorrect;\r\n}\r\n\r\nfunction arrEquals(arr1, arr2) {\r\n    if (!arr1 || !arr2) {\r\n        return false;\r\n    } else if (arr1.length != arr2.length) {\r\n        return false;\r\n    } else {\r\n        for (let i = 0; i < arr1.length; i++) {\r\n            if (arr1[i] !== arr2[i]) {\r\n                return false;\r\n            }\r\n        }\r\n        return true;\r\n    }\r\n}\r\n\r\nmodule.exports = {\r\n    generateSolvePuzzle: generateSolvePuzzle,\r\n    generateEmptyPuzzle: generateEmptyPuzzle,\r\n    generateEmptyBoard: generateEmptyBoard,\r\n    interactWithCell: interactWithCell,\r\n    updateColumnCountGroup: updateColumnCountGroup,\r\n    updateRowCountGroup: updateRowCountGroup,\r\n    makePuzzleFrom2DArray: makePuzzleFrom2DArray,\r\n    puzzleIsSolved: puzzleIsSolved,\r\n    STATES: STATES,\r\n    MESSAGES: MESSAGES\r\n}\n\n//# sourceURL=webpack:///./src/puzzle.js?");

/***/ }),

/***/ "./src/solve.js":
/*!**********************!*\
  !*** ./src/solve.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const renderPuzzle = __webpack_require__(/*! ./ui/render-puzzle.js */ \"./src/ui/render-puzzle.js\").renderPuzzle;\r\nconst extractPuzzleQuery = __webpack_require__(/*! ./puzzle-url.js */ \"./src/puzzle-url.js\").extractPuzzleQuery;\r\nconst buildPuzzleFromQueryString = __webpack_require__(/*! ./puzzle-url.js */ \"./src/puzzle-url.js\").buildPuzzleFromQueryString;\r\nconst addSolveCellEventListeners = __webpack_require__(/*! ./ui/cell-interactions.js */ \"./src/ui/cell-interactions.js\").addSolveCellEventListeners\r\n\r\nconst puzzle = buildPuzzleFromQueryString(extractPuzzleQuery(window.location.href));\r\nrenderPuzzle(puzzle);\r\naddSolveCellEventListeners(puzzle);\n\n//# sourceURL=webpack:///./src/solve.js?");

/***/ }),

/***/ "./src/ui/cell-interactions.js":
/*!*************************************!*\
  !*** ./src/ui/cell-interactions.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const interactWithCell = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").interactWithCell\r\nconst updateColumnCountGroup = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").updateColumnCountGroup;\r\nconst updateRowCountGroup = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").updateRowCountGroup;\r\nconst puzzleIsSolved = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").puzzleIsSolved;\r\nconst MESSAGES = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").MESSAGES\r\nconst updateCountGroupDiv = __webpack_require__(/*! ./render-puzzle.js */ \"./src/ui/render-puzzle.js\").updateCountGroupDiv;\r\nconst updateCellStateClass = __webpack_require__(/*! ./render-puzzle.js */ \"./src/ui/render-puzzle.js\").updateCellStateClass\r\nconst getCellClass = __webpack_require__(/*! ./render-puzzle.js */ \"./src/ui/render-puzzle.js\").getCellClass;\r\nconst updatePuzzleURL = __webpack_require__(/*! ./render-puzzle-url.js */ \"./src/ui/render-puzzle-url.js\").updatePuzzleURL;\r\n\r\nfunction addCreationCellEventListeners(puzzle) {\r\n    var mouseIsDown = false;\r\n    Array.from(document.getElementsByClassName('cell')).forEach(cell => {\r\n        cell.addEventListener('mousedown', (e) => {\r\n            e.preventDefault();\r\n            handleCreationCellClick(puzzle, cell, MESSAGES.FILL);\r\n            mouseIsDown = true;\r\n        });\r\n        cell.addEventListener('mouseenter', () => {\r\n            if (mouseIsDown) {\r\n                handleCreationCellClick(puzzle, cell, MESSAGES.FILL);\r\n            }\r\n        });\r\n    }); \r\n    const puzzleDiv = document.getElementById('puzzle');\r\n    puzzleDiv.addEventListener('mouseleave', () => {\r\n        mouseIsDown = false;\r\n    });\r\n    puzzleDiv.addEventListener('mouseup', () => {\r\n        mouseIsDown = false;\r\n    });\r\n    puzzleDiv.addEventListener('contextmenu', (e) => {\r\n        e.preventDefault();\r\n    });\r\n}\r\n\r\nfunction addSolveCellEventListeners(puzzle) {\r\n    var leftMouseIsDown = false;\r\n    var rightMouseIsDown = false;\r\n    Array.from(document.getElementsByClassName('cell')).forEach(cell => {\r\n        cell.addEventListener('mousedown', (e) => {\r\n            e.preventDefault();\r\n            if (e.button == 0) {\r\n                handleSolveCellClick(puzzle, cell, MESSAGES.FILL);\r\n                leftMouseIsDown = true;\r\n            } else if (e.button == 2) {\r\n                handleSolveCellClick(puzzle, cell, MESSAGES.BLANK);\r\n                rightMouseIsDown = true;\r\n            }\r\n        });\r\n        cell.addEventListener('mouseenter', (e) => {\r\n            if (leftMouseIsDown) {\r\n                handleSolveCellClick(puzzle, cell, MESSAGES.FILL);\r\n            } else if (rightMouseIsDown) {\r\n                handleSolveCellClick(puzzle, cell, MESSAGES.BLANK);\r\n            }\r\n        });\r\n    }); \r\n    const puzzleDiv = document.getElementById('puzzle');\r\n    puzzleDiv.addEventListener('mouseleave', () => {\r\n        leftMouseIsDown = false;\r\n        rightMouseIsDown = false;\r\n    });\r\n    puzzleDiv.addEventListener('mouseup', () => {\r\n        leftMouseIsDown = false;\r\n        rightMouseIsDown = false;\r\n    });\r\n    puzzleDiv.addEventListener('contextmenu', (e) => {\r\n        e.preventDefault();\r\n    });\r\n}\r\n\r\nfunction handleSolveCellClick(puzzle, cell, message) {\r\n    const rowIdx = cell.getAttribute('rowIdx');\r\n    const colIdx = cell.getAttribute('colIdx');\r\n    interactWithCell(message, rowIdx, colIdx, puzzle);\r\n    updateCellStateClass(cell, getCellClass(puzzle.board[rowIdx][colIdx]));\r\n    if (puzzleIsSolved(puzzle)) {\r\n        alert('You did it!')\r\n    }\r\n}\r\n\r\nfunction handleCreationCellClick(puzzle, cell, message) {\r\n    const rowIdx = cell.getAttribute('rowIdx');\r\n    const colIdx = cell.getAttribute('colIdx');\r\n    interactWithCell(message, rowIdx, colIdx, puzzle);\r\n    updateColumnCountDivs(puzzle, colIdx);\r\n    updateRowCountDivs(puzzle, rowIdx);\r\n    updateCellStateClass(cell, getCellClass(puzzle.board[rowIdx][colIdx]));\r\n    updatePuzzleURL(puzzle);\r\n}\r\n\r\nfunction updateColumnCountDivs(puzzle, colIdx) {\r\n    updateColumnCountGroup(puzzle, colIdx);\r\n    const colCountGroupsDiv = getNthColumnCountsCol(colIdx);\r\n    updateCountGroupDiv(colCountGroupsDiv, puzzle.colCountGroups[colIdx]);\r\n}\r\n\r\nfunction getNthColumnCountsCol(n) {\r\n    return document.getElementById('colCountGroups')\r\n                   .getElementsByClassName('count-group')[n];\r\n}\r\n\r\nfunction updateRowCountDivs(puzzle, rowIdx) {\r\n    updateRowCountGroup(puzzle, rowIdx);\r\n    const rowCountGroupsDiv = getNthRowCountsCol(rowIdx);\r\n    updateCountGroupDiv(rowCountGroupsDiv, puzzle.rowCountGroups[rowIdx]);\r\n}\r\n\r\nfunction getNthRowCountsCol(n) {\r\n    return document.getElementById('rowCountGroups')\r\n                   .getElementsByClassName('count-group')[n];\r\n}\r\n\r\nmodule.exports = {\r\n    addCreationCellEventListeners: addCreationCellEventListeners,\r\n    addSolveCellEventListeners: addSolveCellEventListeners\r\n}\n\n//# sourceURL=webpack:///./src/ui/cell-interactions.js?");

/***/ }),

/***/ "./src/ui/render-puzzle-url.js":
/*!*************************************!*\
  !*** ./src/ui/render-puzzle-url.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const makePuzzleURLQueryString = __webpack_require__(/*! ../puzzle-url.js */ \"./src/puzzle-url.js\").makePuzzleURLQueryString;\r\n\r\nfunction updatePuzzleURL(puzzle) {\r\n    const url = makePuzzleURL(puzzle);\r\n    const link = `<a href=\"${url}\" target=\"_blank\">${url}</a>`\r\n    document.getElementById('puzzleURL').innerHTML = link;\r\n}\r\n\r\nfunction makePuzzleURL(puzzle) {\r\n    const baseUrl = window.location.href.slice(0, window.location.href.lastIndexOf('/') + 1)\r\n    return baseUrl + 'solve.html?puzzle=' + makePuzzleURLQueryString(puzzle);\r\n}\r\n\r\nmodule.exports = {\r\n    updatePuzzleURL: updatePuzzleURL\r\n}\n\n//# sourceURL=webpack:///./src/ui/render-puzzle-url.js?");

/***/ }),

/***/ "./src/ui/render-puzzle.js":
/*!*********************************!*\
  !*** ./src/ui/render-puzzle.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const STATES = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").STATES\r\n\r\nfunction clearPuzzle() {\r\n    clearChildren(document.getElementById('cellGrid'));\r\n    clearChildren(document.getElementById('colCountGroups'));\r\n    clearChildren(document.getElementById('rowCountGroups'));\r\n}\r\n\r\nfunction renderPuzzle(puzzle) {\r\n    renderCellGrid(puzzle);\r\n    renderRowCounts(puzzle);\r\n    renderColCounts(puzzle);\r\n}\r\n\r\nfunction renderCellGrid(puzzle) {\r\n    const grid = document.getElementById('cellGrid');\r\n    for (let i = 0; i < puzzle.board.length; i++) {\r\n        const row = createEmptyRow();\r\n        for (let j = 0; j < puzzle.board[i].length; j++) {\r\n            row.appendChild(createCell(puzzle.board, i, j));\r\n        }\r\n        grid.appendChild(row);\r\n    }\r\n}\r\n\r\nfunction createEmptyRow() {\r\n    const row = document.createElement('div');\r\n    row.setAttribute('class', 'row');\r\n    return row;\r\n}\r\n\r\nfunction createCell(board, rowIdx, colIdx) {\r\n    const cell = document.createElement('div');\r\n    updateCellStateClass(cell, getCellClass(board[rowIdx][colIdx]));\r\n    cell.setAttribute('rowIdx', rowIdx);\r\n    cell.setAttribute('colIdx', colIdx);\r\n    return cell;\r\n}\r\n\r\nfunction getCellClass(cellState) {\r\n    switch(cellState) {\r\n        case STATES.EMPTY:\r\n            return 'empty-cell'\r\n        case STATES.FILLED:\r\n            return 'filled-cell'\r\n        case STATES.BLANK:\r\n            return 'blank-cell'        \r\n    }\r\n}\r\n\r\nfunction updateCellStateClass(cell, stateClass) {\r\n    cell.setAttribute('class', 'cell ' + stateClass);\r\n}\r\n\r\nfunction renderRowCounts(puzzle) {\r\n    createCountsCollection(puzzle.rowCountGroups, document.getElementById('rowCountGroups'));\r\n}\r\n\r\nfunction renderColCounts(puzzle) {\r\n    createCountsCollection(puzzle.colCountGroups, document.getElementById('colCountGroups'));\r\n}\r\n\r\nfunction createCountsCollection(countGroups, parentDiv) {\r\n    countGroups.forEach(countGroup => {\r\n        parentDiv.appendChild(createCountGroupDiv(countGroup));\r\n    });\r\n    return parentDiv;\r\n}\r\n\r\nfunction createCountGroupDiv(countGroup) {\r\n    const countGroupDiv = document.createElement('div');\r\n    countGroupDiv.setAttribute('class', 'count-group');\r\n    return updateCountGroupDiv(countGroupDiv, countGroup);\r\n}\r\n\r\nfunction updateCountGroupDiv(countGroupDiv, countGroup) {\r\n    clearChildren(countGroupDiv);\r\n    countGroup.forEach(count => {\r\n        countGroupDiv.appendChild(createCountDiv(count));\r\n    });\r\n    return countGroupDiv;\r\n}\r\n\r\nfunction clearChildren(element) {\r\n    while (element.firstChild) {\r\n        element.removeChild(element.lastChild);\r\n    }\r\n}\r\n\r\nfunction createCountDiv(count) {\r\n    const countDiv = document.createElement('div');\r\n    countDiv.textContent = count;\r\n    countDiv.setAttribute('class', 'count');\r\n    return countDiv;\r\n}\r\n\r\nmodule.exports = {\r\n    renderPuzzle: renderPuzzle,\r\n    clearPuzzle: clearPuzzle,\r\n    renderRowCounts: renderRowCounts,\r\n    renderColCounts: renderRowCounts,\r\n    updateCountGroupDiv: updateCountGroupDiv,\r\n    updateCellStateClass: updateCellStateClass,\r\n    getCellClass: getCellClass\r\n}\n\n//# sourceURL=webpack:///./src/ui/render-puzzle.js?");

/***/ })

/******/ });