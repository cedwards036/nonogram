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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/enter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/enter.js":
/*!**********************!*\
  !*** ./src/enter.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const createEnterPuzzle = __webpack_require__(/*! ./ui/create-puzzle.js */ \"./src/ui/create-puzzle.js\").createEnterPuzzle;\r\nconst makePuzzleDimensionsSetter = __webpack_require__(/*! ./ui/puzzle-dimensions.js */ \"./src/ui/puzzle-dimensions.js\").makePuzzleDimensionsSetter;\r\n\r\nconst DEFAULT_DIMENSION = 5;\r\n\r\nfunction initializeUI() {\r\n    const puzzle = createEnterPuzzle(DEFAULT_DIMENSION, DEFAULT_DIMENSION);\r\n    document.getElementById('xDimensionInput').defaultValue = DEFAULT_DIMENSION;\r\n    document.getElementById('yDimensionInput').defaultValue = DEFAULT_DIMENSION;\r\n    document.getElementById('dimensionsForm').onsubmit = makePuzzleDimensionsSetter(createEnterPuzzle);\r\n}\r\n\r\ninitializeUI();\n\n//# sourceURL=webpack:///./src/enter.js?");

/***/ }),

/***/ "./src/puzzle-entry-parsing.js":
/*!*************************************!*\
  !*** ./src/puzzle-entry-parsing.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function parseCountGroupString(countGroupString, maxSize) {\r\n    countGroupString = removeWhitespace(countGroupString);\r\n    if (isValidString(countGroupString)) {\r\n        var countGroup = countGroupString.split(',').map(x => parseInt(x));\r\n        countGroup = filterOutUnnecessaryZeros(countGroup);\r\n        if (countGroupSumIsTooBig(countGroup, maxSize)) {\r\n            throw new InvalidInputError('Numbers are too big for their row/column');\r\n        }\r\n        return countGroup;\r\n    } else {\r\n        throw new InvalidInputError('Input contains invalid characters or dangling commas');\r\n    }\r\n}\r\n\r\nfunction removeWhitespace(s) {\r\n    return s.replace(/\\s/g, '');\r\n}\r\n\r\nfunction isValidString(countGroupString) {\r\n    return /^\\d(,?\\s*\\d\\s*)*$/.test(countGroupString)\r\n}\r\n\r\nfunction filterOutUnnecessaryZeros(countGroup) {\r\n    if (countGroup.length > 1) {\r\n        return countGroup.filter(num => num != 0);\r\n    } else {\r\n        return countGroup;\r\n    }\r\n}\r\n\r\nfunction countGroupSumIsTooBig(countGroup, maxSize) {\r\n    return countGroup.reduce((sum, x) => sum + x, 0) + countGroup.length - 1 > maxSize\r\n}\r\n\r\nclass InvalidInputError extends Error {\r\n    constructor(message) {\r\n        super(message);\r\n        this.name = 'InvalidInputError';\r\n    }\r\n}\r\n\r\nmodule.exports = {\r\n    parseCountGroupString: parseCountGroupString,\r\n    InvalidInputError: InvalidInputError\r\n}\n\n//# sourceURL=webpack:///./src/puzzle-entry-parsing.js?");

/***/ }),

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

/***/ "./src/ui/cell-interactions.js":
/*!*************************************!*\
  !*** ./src/ui/cell-interactions.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const interactWithCell = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").interactWithCell\r\nconst updateColumnCountGroup = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").updateColumnCountGroup;\r\nconst updateRowCountGroup = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").updateRowCountGroup;\r\nconst puzzleIsSolved = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").puzzleIsSolved;\r\nconst MESSAGES = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").MESSAGES\r\nconst updateCountGroupDiv = __webpack_require__(/*! ./render-puzzle.js */ \"./src/ui/render-puzzle.js\").updateCountGroupDiv;\r\nconst updateCellStateClass = __webpack_require__(/*! ./render-puzzle.js */ \"./src/ui/render-puzzle.js\").updateCellStateClass\r\nconst getCellClass = __webpack_require__(/*! ./render-puzzle.js */ \"./src/ui/render-puzzle.js\").getCellClass;\r\nconst updatePuzzleURL = __webpack_require__(/*! ./render-puzzle-url.js */ \"./src/ui/render-puzzle-url.js\").updatePuzzleURL;\r\n\r\nfunction addCreationCellEventListeners(puzzle) {\r\n    Array.from(document.getElementsByClassName('cell')).forEach(cell => {\r\n        cell.addEventListener('click', () => {\r\n            handleCreationCellClick(puzzle, cell, MESSAGES.FILL)\r\n        });\r\n    }); \r\n}\r\n\r\nfunction addSolveCellEventListeners(puzzle) {\r\n    Array.from(document.getElementsByClassName('cell')).forEach(cell => {\r\n        cell.addEventListener('click', () => {\r\n            handleSolveCellClick(puzzle, cell, MESSAGES.FILL)\r\n        });\r\n        cell.addEventListener('contextmenu', (e) => {\r\n            handleSolveCellClick(puzzle, cell, MESSAGES.BLANK)\r\n            e.preventDefault();\r\n        });\r\n    }); \r\n}\r\n\r\nfunction handleSolveCellClick(puzzle, cell, message) {\r\n    const rowIdx = cell.getAttribute('rowIdx');\r\n    const colIdx = cell.getAttribute('colIdx');\r\n    interactWithCell(message, rowIdx, colIdx, puzzle);\r\n    updateCellStateClass(cell, getCellClass(puzzle.board[rowIdx][colIdx]));\r\n    if (puzzleIsSolved(puzzle)) {\r\n        alert('You did it!')\r\n    }\r\n}\r\n\r\nfunction handleCreationCellClick(puzzle, cell, message) {\r\n    const rowIdx = cell.getAttribute('rowIdx');\r\n    const colIdx = cell.getAttribute('colIdx');\r\n    interactWithCell(message, rowIdx, colIdx, puzzle);\r\n    updateColumnCountDivs(puzzle, colIdx);\r\n    updateRowCountDivs(puzzle, rowIdx);\r\n    updateCellStateClass(cell, getCellClass(puzzle.board[rowIdx][colIdx]));\r\n    updatePuzzleURL(puzzle);\r\n}\r\n\r\nfunction updateColumnCountDivs(puzzle, colIdx) {\r\n    updateColumnCountGroup(puzzle, colIdx);\r\n    const colCountGroupsDiv = getNthColumnCountsCol(colIdx);\r\n    updateCountGroupDiv(colCountGroupsDiv, puzzle.colCountGroups[colIdx]);\r\n}\r\n\r\nfunction getNthColumnCountsCol(n) {\r\n    return document.getElementById('colCountGroups')\r\n                   .getElementsByClassName('count-group')[n];\r\n}\r\n\r\nfunction updateRowCountDivs(puzzle, rowIdx) {\r\n    updateRowCountGroup(puzzle, rowIdx);\r\n    const rowCountGroupsDiv = getNthRowCountsCol(rowIdx);\r\n    updateCountGroupDiv(rowCountGroupsDiv, puzzle.rowCountGroups[rowIdx]);\r\n}\r\n\r\nfunction getNthRowCountsCol(n) {\r\n    return document.getElementById('rowCountGroups')\r\n                   .getElementsByClassName('count-group')[n];\r\n}\r\n\r\nmodule.exports = {\r\n    addCreationCellEventListeners: addCreationCellEventListeners,\r\n    addSolveCellEventListeners: addSolveCellEventListeners\r\n}\n\n//# sourceURL=webpack:///./src/ui/cell-interactions.js?");

/***/ }),

/***/ "./src/ui/create-puzzle.js":
/*!*********************************!*\
  !*** ./src/ui/create-puzzle.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const generateEmptyPuzzle = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").generateEmptyPuzzle\r\nconst renderPuzzle = __webpack_require__(/*! ./render-puzzle.js */ \"./src/ui/render-puzzle.js\").renderPuzzle;\r\nconst addCreationCellEventListeners = __webpack_require__(/*! ./cell-interactions.js */ \"./src/ui/cell-interactions.js\").addCreationCellEventListeners;\r\nconst updatePuzzleURL = __webpack_require__(/*! ./render-puzzle-url.js */ \"./src/ui/render-puzzle-url.js\").updatePuzzleURL;\r\n\r\nfunction createCreationPuzzle(height, width) {\r\n    return createPuzzle(height, width, addCreationCellEventListeners);\r\n}\r\n\r\nconst addEventListenersToCounts = __webpack_require__(/*! ./modal.js */ \"./src/ui/modal.js\").addEventListenersToCounts;\r\nconst addModalCloseEventListener = __webpack_require__(/*! ./modal.js */ \"./src/ui/modal.js\").addModalCloseEventListener;\r\n\r\nfunction createEnterPuzzle(height, width) {\r\n    return createPuzzle(height, width, puzzle => {\r\n        addEventListenersToCounts(puzzle);\r\n        addModalCloseEventListener(puzzle);\r\n    });\r\n}\r\n\r\nfunction createPuzzle(height, width, eventListenerFunction) {\r\n    const newPuzzle = generateEmptyPuzzle(height, width);\r\n    renderPuzzle(newPuzzle);\r\n    eventListenerFunction(newPuzzle);\r\n    updatePuzzleURL(newPuzzle);\r\n    return newPuzzle;\r\n}\r\n\r\nmodule.exports = {\r\n    createCreationPuzzle: createCreationPuzzle,\r\n    createEnterPuzzle: createEnterPuzzle\r\n}\n\n//# sourceURL=webpack:///./src/ui/create-puzzle.js?");

/***/ }),

/***/ "./src/ui/modal.js":
/*!*************************!*\
  !*** ./src/ui/modal.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const updateCountGroupDiv = __webpack_require__(/*! ./render-puzzle.js */ \"./src/ui/render-puzzle.js\").updateCountGroupDiv;\r\nconst parseCountGroupString = __webpack_require__(/*! ../puzzle-entry-parsing.js */ \"./src/puzzle-entry-parsing.js\").parseCountGroupString;\r\nconst updatePuzzleURL = __webpack_require__(/*! ./render-puzzle-url.js */ \"./src/ui/render-puzzle-url.js\").updatePuzzleURL;\r\n\r\nconst modalBackground = document.getElementsByClassName('modal-background')[0];\r\n\r\nfunction addEventListenersToCounts(puzzle) {\r\n    const colCountGroups = document.getElementById('colCountGroups').getElementsByClassName('count-group');\r\n    addEventListenersToCountGroups(puzzle, colCountGroups, openColumnModal);\r\n    const rowCountGroups = document.getElementById('rowCountGroups').getElementsByClassName('count-group');\r\n    addEventListenersToCountGroups(puzzle, rowCountGroups, openRowModal);\r\n}\r\n\r\nfunction addEventListenersToCountGroups(puzzle, countGroups, openFunction) {\r\n    Array.from(countGroups).forEach((countGroup, idx) => {\r\n        addEventListenersToCountGroup(puzzle, countGroup, idx, openFunction);\r\n    });\r\n}\r\n\r\nfunction addEventListenersToCountGroup(puzzle, countGroup, idx, openFunction) {\r\n    Array.from(countGroup.getElementsByClassName('count')).forEach(col => {\r\n        col.addEventListener('click', () => {openFunction(puzzle, countGroup, idx)});\r\n    });\r\n}\r\n\r\nfunction addModalCloseEventListener() {\r\n    document.getElementById('closeBtn').addEventListener('click', closeModal);\r\n}\r\n\r\nfunction openRowModal(puzzle, countGroupDiv, idx) {\r\n    modalBackground.style.display = 'block';\r\n    const input = document.getElementById('enterCountsInput');\r\n    input.focus();\r\n    input.value = puzzle.rowCountGroups[idx].join(',') \r\n    document.getElementById('enterCountsForm').onsubmit = () => {\r\n        try {\r\n            const newCounts = parseCountGroupString(input.value, puzzle.board[0].length);\r\n            puzzle.rowCountGroups[idx] = newCounts;\r\n            updateCountGroupDiv(countGroupDiv, newCounts);\r\n            addEventListenersToCountGroup(puzzle, countGroupDiv, idx, openRowModal);\r\n            hideError();\r\n            closeModal();\r\n            updatePuzzleURL(puzzle);\r\n        } catch (e) {\r\n            showError(e.message);\r\n        }\r\n        return false;\r\n    }\r\n}\r\n\r\nfunction openColumnModal(puzzle, countGroupDiv, idx) {\r\n    modalBackground.style.display = 'block';\r\n    const input = document.getElementById('enterCountsInput');\r\n    input.focus(); \r\n    input.value = puzzle.colCountGroups[idx].join(',')\r\n    document.getElementById('enterCountsForm').onsubmit = () => {\r\n        try {\r\n            const newCounts = parseCountGroupString(input.value, puzzle.board.length);\r\n            puzzle.colCountGroups[idx] = newCounts;\r\n            updateCountGroupDiv(countGroupDiv, newCounts);\r\n            addEventListenersToCountGroup(puzzle, countGroupDiv, idx, openColumnModal);\r\n            hideError();\r\n            closeModal();\r\n            updatePuzzleURL(puzzle);\r\n        } catch (e) {\r\n            showError(e.message);\r\n        }\r\n        return false;\r\n    }\r\n}\r\n\r\nfunction closeModal() {\r\n    hideError();\r\n    modalBackground.style.display = 'none';\r\n}\r\n\r\nfunction showError(message) {\r\n    const errorMessage = document.getElementById('enterCountsError');\r\n    errorMessage.innerHTML = message;\r\n    errorMessage.style.display = 'block';\r\n}\r\n\r\nfunction hideError() {\r\n    document.getElementById('enterCountsError').style.display = 'none';\r\n}\r\n\r\nmodule.exports = {\r\n    addEventListenersToCounts: addEventListenersToCounts,\r\n    addModalCloseEventListener: addModalCloseEventListener\r\n}\n\n//# sourceURL=webpack:///./src/ui/modal.js?");

/***/ }),

/***/ "./src/ui/puzzle-dimensions.js":
/*!*************************************!*\
  !*** ./src/ui/puzzle-dimensions.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const clearPuzzle = __webpack_require__(/*! ./render-puzzle.js */ \"./src/ui/render-puzzle.js\").clearPuzzle;\r\n\r\nfunction makePuzzleDimensionsSetter(createPuzzleFunction) {\r\n    return () => {\r\n        const height = document.getElementById('yDimensionInput').value;\r\n        const width = document.getElementById('xDimensionInput').value;\r\n        if (dimensionsAreValid(width, height)) {\r\n            clearPuzzle();\r\n            createPuzzleFunction(width, height);\r\n        } else {\r\n            resetDimensions();\r\n            alert('ERROR: invalid dimensions');\r\n        }\r\n        return false;\r\n    }\r\n}\r\n\r\nfunction dimensionsAreValid(width, height) {\r\n    const MAX_DIMENSION = 15;\r\n    const MIN_DIMENSION = 1;\r\n\r\n    function isValidDimension(value) {\r\n        return isInt(value) && value >= MIN_DIMENSION && value <= MAX_DIMENSION;\r\n    }\r\n    \r\n    //https://stackoverflow.com/a/1779019\r\n    function isInt(value) {\r\n        return /^\\d+$/.test(value);\r\n    }\r\n    return isValidDimension(height) && isValidDimension(width)\r\n}\r\n\r\nfunction resetDimensions() {\r\n    document.getElementById('yDimensionInput').value = document.getElementById('rowCountGroups').childElementCount;\r\n    document.getElementById('xDimensionInput').value = document.getElementById('colCountGroups').childElementCount;\r\n}\r\n\r\nmodule.exports = {\r\n    makePuzzleDimensionsSetter: makePuzzleDimensionsSetter\r\n}\n\n//# sourceURL=webpack:///./src/ui/puzzle-dimensions.js?");

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