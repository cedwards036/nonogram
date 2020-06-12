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

eval("const generateSolvePuzzle = __webpack_require__(/*! ./puzzle.js */ \"./src/puzzle.js\").generateSolvePuzzle;\r\nconst makeIncompleteCount = __webpack_require__(/*! ../src/puzzle.js */ \"./src/puzzle.js\").makeIncompleteCount;\r\n\r\nfunction makePuzzleString(puzzle) {\r\n    const rowCountGroups = puzzle.rowCountGroups.map((rowCountGroup) => {\r\n        return rowCountGroup.map(count => count.value).join(',');\r\n    }).join(';');\r\n    const colCountGroups = puzzle.colCountGroups.map((colCount) => {\r\n        return colCount.map(count => count.value).join(',');\r\n    }).join(';');\r\n    return rowCountGroups + '#' + colCountGroups;\r\n}\r\n\r\nfunction makePuzzleURLQueryString(puzzle) {\r\n    return btoa(makePuzzleString(puzzle));\r\n}\r\n\r\nfunction decodePuzzleURLQueryString(queryString) {\r\n    return atob(queryString);\r\n}\r\n\r\nfunction parsePuzzleString(puzzleString) {\r\n    function parseCounts(countsStr) {\r\n        return countsStr\r\n            .split(';')\r\n            .map(s => s.split(',')\r\n            .map(s => makeIncompleteCount(parseInt(s))));\r\n    }\r\n    const split = puzzleString.split('#');\r\n    const rowCountGroups = parseCounts(split[0]);\r\n    const colCountGroups = parseCounts(split[1]);\r\n    return {rowCountGroups: rowCountGroups, colCountGroups: colCountGroups};\r\n}\r\n\r\nfunction buildPuzzleFromPuzzleString(puzzleString) {\r\n    const parsedCounts = parsePuzzleString(puzzleString);\r\n    return generateSolvePuzzle(parsedCounts.rowCountGroups, parsedCounts.colCountGroups);\r\n}\r\n\r\nfunction buildPuzzleFromQueryString(queryString) {\r\n    return buildPuzzleFromPuzzleString(decodePuzzleURLQueryString(queryString));\r\n}\r\n\r\nfunction extractPuzzleQuery(url) {\r\n    return url.slice(url.indexOf('?puzzle=') + 8);\r\n}\r\n\r\nmodule.exports = {\r\n    makePuzzleString: makePuzzleString,\r\n    makePuzzleURLQueryString: makePuzzleURLQueryString,\r\n    parsePuzzleString: parsePuzzleString,\r\n    buildPuzzleFromPuzzleString: buildPuzzleFromPuzzleString,\r\n    buildPuzzleFromQueryString: buildPuzzleFromQueryString,\r\n    extractPuzzleQuery: extractPuzzleQuery\r\n}\n\n//# sourceURL=webpack:///./src/puzzle-url.js?");

/***/ }),

/***/ "./src/puzzle.js":
/*!***********************!*\
  !*** ./src/puzzle.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const STATES = {\r\n    EMPTY: 'empty',\r\n    BLANK: 'blank',\r\n    FILLED: 'filled',\r\n    MARKED: 'marked'\r\n}\r\n\r\nfunction generateSolvePuzzle(rowCountGroups, colCountGroups) {\r\n    const board = generateEmptyBoard(colCountGroups.length, rowCountGroups.length);\r\n    return {\r\n        rowCountGroups: rowCountGroups, \r\n        colCountGroups: colCountGroups, \r\n        board: board, \r\n        history: {\r\n            past: [],\r\n            future: []\r\n        }};\r\n}\r\n\r\nfunction generateEmptyPuzzle(width, height) {\r\n    const puzzle = {\r\n        rowCountGroups: [], \r\n        colCountGroups: [],  \r\n        history: {\r\n            past: [],\r\n            future: []\r\n        }\r\n    };\r\n    for (let i = 0; i < height; i++) {\r\n        puzzle.rowCountGroups.push([makeIncompleteCount(0)])\r\n    }\r\n    for (let i = 0; i < width; i++) {\r\n        puzzle.colCountGroups.push([makeIncompleteCount(0)])\r\n    }\r\n    puzzle.board = generateEmptyBoard(width, height);\r\n    return puzzle;\r\n}\r\n\r\nfunction generateEmptyBoard(width, height) {\r\n    if (width === 0 || height === 0) {\r\n        return [];\r\n    } else {\r\n        let board = [];\r\n        for (let i = 0; i < height; i++) {\r\n            board.push([]);\r\n            for (let j = 0; j < width; j++) {\r\n                board[i].push(STATES.EMPTY)\r\n            }\r\n        }\r\n        return board;\r\n    }\r\n}\r\n\r\nfunction makePuzzleFrom2DArray(arr) {\r\n    const puzzle = generateEmptyPuzzle(arr[0].length, arr.length);\r\n    for (let i = 0; i < arr.length; i++) {\r\n        for (let j = 0; j < arr[0].length; j++) {\r\n            if (arr[i][j] === 1) {\r\n                fillCell(i, j, puzzle);\r\n            }\r\n        }\r\n    }\r\n    for (let i = 0; i < arr.length; i++) {\r\n        updateRowCountGroup(puzzle, i);\r\n    }\r\n    for (let i = 0; i < arr[0].length; i++) {\r\n        updateColumnCountGroup(puzzle, i);\r\n    }\r\n    return puzzle;\r\n}\r\n\r\nconst fillCell = makeNonUpdatingCellInteraction(STATES.FILLED);\r\nconst blankCell = makeNonUpdatingCellInteraction(STATES.BLANK);\r\nconst markCell = makeNonUpdatingCellInteraction(STATES.MARKED);\r\nconst fillCellAndUpdateCounts = makeUpdatingCellInteraction(STATES.FILLED);\r\nconst blankCellAndUpdateCounts = makeUpdatingCellInteraction(STATES.BLANK);\r\nconst markCellAndUpdateCounts = makeUpdatingCellInteraction(STATES.MARKED);\r\n\r\nfunction makeNonUpdatingCellInteraction(state) {\r\n    return (rowIdx, colIdx, puzzle) => setCellState(state, rowIdx, colIdx, puzzle, makeSimpleCellCommand);\r\n}\r\n\r\nfunction makeUpdatingCellInteraction(state) {\r\n    return (rowIdx, colIdx, puzzle) => setCellState(state, rowIdx, colIdx, puzzle, makeCountUpdatingCellCommand);\r\n}\r\n\r\nfunction setCellState(desiredNewState, rowIdx, colIdx, puzzle, makeCellCommand) {\r\n    const oldState = puzzle.board[rowIdx][colIdx];\r\n    const newState = determineNewCellState(oldState, desiredNewState);\r\n    const command = makeCellCommand(newState, oldState, rowIdx, colIdx);\r\n    puzzle.history.past.push(command);\r\n    puzzle.history.future = [];\r\n    command.execute(puzzle);\r\n    return puzzle;\r\n}\r\n\r\nfunction determineNewCellState(oldState, newState) {\r\n    if (oldState === STATES.EMPTY) {\r\n        return newState;\r\n    } else {\r\n        return STATES.EMPTY;\r\n    }\r\n}\r\n\r\nfunction makeSimpleCellCommand(newState, oldState, rowIdx, colIdx) {\r\n    return {\r\n        execute: puzzle => {\r\n            puzzle.board[rowIdx][colIdx] = newState;\r\n            return puzzle;\r\n        },\r\n        undo: puzzle => {\r\n            puzzle.board[rowIdx][colIdx] = oldState;\r\n            return puzzle;\r\n        }\r\n    }\r\n}\r\n\r\nfunction makeCountUpdatingCellCommand(newState, oldState, rowIdx, colIdx) {\r\n    return {\r\n        execute: puzzle => {\r\n            puzzle.board[rowIdx][colIdx] = newState;\r\n            updateColumnCountGroup(puzzle, colIdx);\r\n            updateRowCountGroup(puzzle, rowIdx);\r\n            return puzzle;\r\n        },\r\n        undo: puzzle => {\r\n            puzzle.board[rowIdx][colIdx] = oldState;\r\n            updateColumnCountGroup(puzzle, colIdx);\r\n            updateRowCountGroup(puzzle, rowIdx);\r\n            return puzzle;\r\n        }\r\n    }\r\n}\r\n\r\nfunction makeSingleContextInteraction(interaction, rowIdx, colIdx, puzzle) {\r\n    const originalCellState = puzzle.board[rowIdx][colIdx];\r\n    return (rowIdx, colIdx, puzzle) => {\r\n        if (puzzle.board[rowIdx][colIdx] === originalCellState) {\r\n            interaction(rowIdx, colIdx, puzzle);\r\n        }\r\n        return puzzle;\r\n    }\r\n}\r\n\r\nfunction updateColumnCountGroup(puzzle, colIdx) {\r\n    puzzle.colCountGroups[colIdx] = makeColumnCountGroup(puzzle, colIdx);\r\n    return puzzle;\r\n}\r\n\r\nfunction makeColumnCountGroup(puzzle, colIdx) {\r\n    const columnCounts = [];\r\n    let i = 0;\r\n    var curCount = 0;\r\n    while (i < puzzle.board.length) {\r\n        while (i < puzzle.board.length && puzzle.board[i][colIdx] === STATES.FILLED) {\r\n            curCount++;\r\n            i++;\r\n        }\r\n        if (curCount > 0) {\r\n            columnCounts.push(makeIncompleteCount(curCount));\r\n            curCount = 0;\r\n        }\r\n        i++;\r\n    }\r\n    if (columnCounts.length === 0) {\r\n        return [makeIncompleteCount(0)];\r\n    } else {\r\n        return columnCounts;\r\n    }\r\n}\r\n\r\nfunction updateRowCountGroup(puzzle, rowIdx) {\r\n    puzzle.rowCountGroups[rowIdx] = makeRowCountGroup(puzzle, rowIdx);\r\n    return puzzle;\r\n}\r\n\r\nfunction makeRowCountGroup(puzzle, rowIdx) {\r\n    const rowCountGroups = [];\r\n    let i = 0;\r\n    var curCount = 0;\r\n    while (i < puzzle.board[0].length) {\r\n        while (i < puzzle.board[0].length && puzzle.board[rowIdx][i] === STATES.FILLED) {\r\n            curCount++;\r\n            i++;\r\n        }\r\n        if (curCount > 0) {\r\n            rowCountGroups.push(makeIncompleteCount(curCount));\r\n            curCount = 0;\r\n        }\r\n        i++;\r\n    }\r\n    if (rowCountGroups.length === 0) {\r\n        return [makeIncompleteCount(0)];\r\n    } else {\r\n        return rowCountGroups;\r\n    }\r\n}\r\n\r\nfunction puzzleIsSolved(puzzle) {\r\n    const rowsAreCorrect = puzzle.rowCountGroups.reduce((result, countGroup, rowIdx) => {\r\n        return result && countGroupEquals(makeRowCountGroup(puzzle, rowIdx), countGroup);\r\n    }, true);\r\n    const colsAreCorrect = puzzle.colCountGroups.reduce((result, countGroup, colIdx) => {\r\n        return result && countGroupEquals(makeColumnCountGroup(puzzle, colIdx), countGroup);\r\n    }, true);\r\n    return rowsAreCorrect && colsAreCorrect;\r\n}\r\n\r\nfunction countGroupEquals(arr1, arr2) {\r\n    if (!arr1 || !arr2) {\r\n        return false;\r\n    } else if (arr1.length != arr2.length) {\r\n        return false;\r\n    } else {\r\n        for (let i = 0; i < arr1.length; i++) {\r\n            if (arr1[i].value !== arr2[i].value) {\r\n                return false;\r\n            }\r\n        }\r\n        return true;\r\n    }\r\n}\r\n\r\nfunction makeIncompleteCount(count) {\r\n    return {value: count, isComplete: false};\r\n}\r\n\r\nfunction undo(puzzle) {\r\n    if (puzzle.history.past.length > 0) {\r\n        const command = puzzle.history.past.pop();\r\n        command.undo(puzzle);\r\n        puzzle.history.future.push(command);\r\n    }\r\n    return puzzle;\r\n}\r\n\r\nfunction redo(puzzle) {\r\n    if (puzzle.history.future.length > 0) {\r\n        const command = puzzle.history.future.pop();\r\n        command.execute(puzzle);\r\n        puzzle.history.past.push(command);\r\n    }\r\n    return puzzle;\r\n}\r\n\r\nmodule.exports = {\r\n    generateSolvePuzzle: generateSolvePuzzle,\r\n    generateEmptyPuzzle: generateEmptyPuzzle,\r\n    generateEmptyBoard: generateEmptyBoard,\r\n    fillCell: fillCell,\r\n    blankCell: blankCell,\r\n    markCell: markCell,\r\n    fillCellAndUpdateCounts: fillCellAndUpdateCounts,\r\n    blankCellAndUpdateCounts: blankCellAndUpdateCounts,\r\n    markCellAndUpdateCounts: markCellAndUpdateCounts,\r\n    setCellState: setCellState,\r\n    makeSimpleCellCommand: makeSimpleCellCommand,\r\n    makeCountUpdatingCellCommand: makeCountUpdatingCellCommand,\r\n    makeSingleContextInteraction: makeSingleContextInteraction,\r\n    updateColumnCountGroup: updateColumnCountGroup,\r\n    updateRowCountGroup: updateRowCountGroup,\r\n    makePuzzleFrom2DArray: makePuzzleFrom2DArray,\r\n    puzzleIsSolved: puzzleIsSolved,\r\n    makeIncompleteCount: makeIncompleteCount,\r\n    undo: undo,\r\n    redo: redo,\r\n    STATES: STATES,\r\n}\n\n//# sourceURL=webpack:///./src/puzzle.js?");

/***/ }),

/***/ "./src/solve.js":
/*!**********************!*\
  !*** ./src/solve.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const renderPuzzle = __webpack_require__(/*! ./ui/render-puzzle.js */ \"./src/ui/render-puzzle.js\").renderPuzzle;\r\nconst extractPuzzleQuery = __webpack_require__(/*! ./puzzle-url.js */ \"./src/puzzle-url.js\").extractPuzzleQuery;\r\nconst buildPuzzleFromQueryString = __webpack_require__(/*! ./puzzle-url.js */ \"./src/puzzle-url.js\").buildPuzzleFromQueryString;\r\nconst addSolveCellEventListeners = __webpack_require__(/*! ./ui/cell-interactions.js */ \"./src/ui/cell-interactions.js\").addSolveCellEventListeners;\r\nconst addUndoAndRedoListeners = __webpack_require__(/*! ./ui/cell-interactions.js */ \"./src/ui/cell-interactions.js\").addUndoAndRedoListeners;\r\nconst updateSolvePuzzle = __webpack_require__(/*! ./ui/render-puzzle.js */ \"./src/ui/render-puzzle.js\").updateSolvePuzzle;\r\n\r\nconst puzzle = buildPuzzleFromQueryString(extractPuzzleQuery(window.location.href));\r\nrenderPuzzle(puzzle);\r\naddSolveCellEventListeners(puzzle);\r\naddUndoAndRedoListeners(puzzle, updateSolvePuzzle);\n\n//# sourceURL=webpack:///./src/solve.js?");

/***/ }),

/***/ "./src/ui/cell-interactions.js":
/*!*************************************!*\
  !*** ./src/ui/cell-interactions.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const makeSingleContextInteraction = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").makeSingleContextInteraction;\r\nconst updateColumnCountGroup = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").updateColumnCountGroup;\r\nconst updateRowCountGroup = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").updateRowCountGroup;\r\nconst puzzleIsSolved = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").puzzleIsSolved;\r\nconst fillCell = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").fillCell;\r\nconst markCell = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").markCell;\r\nconst blankCell = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").blankCell;\r\nconst fillCellAndUpdateCounts = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").fillCellAndUpdateCounts;\r\nconst undo = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").undo;\r\nconst redo = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").redo;\r\nconst updateCountGroupDiv = __webpack_require__(/*! ./render-puzzle.js */ \"./src/ui/render-puzzle.js\").updateCountGroupDiv;\r\nconst updateCellStateClass = __webpack_require__(/*! ./render-puzzle.js */ \"./src/ui/render-puzzle.js\").updateCellStateClass\r\nconst getCellClass = __webpack_require__(/*! ./render-puzzle.js */ \"./src/ui/render-puzzle.js\").getCellClass;\r\nconst updatePuzzleURL = __webpack_require__(/*! ./render-puzzle-url.js */ \"./src/ui/render-puzzle-url.js\").updatePuzzleURL;\r\n\r\n\r\nfunction addUndoAndRedoListeners(puzzle, puzzleUpdateFunction) {\r\n    document.addEventListener('keydown', (e) => {\r\n        if (e.ctrlKey && e.key === 'z') {\r\n            undo(puzzle);\r\n            puzzleUpdateFunction(puzzle);\r\n        }\r\n        if (e.ctrlKey && e.key === 'y') {\r\n            redo(puzzle);\r\n            puzzleUpdateFunction(puzzle);\r\n        }\r\n    });\r\n}\r\n\r\nfunction addCreationCellEventListeners(puzzle) {\r\n    addCellEventListeners(puzzle, makeCreationInteractionFunction, handleCreationCellClick);\r\n}\r\n\r\nfunction addSolveCellEventListeners(puzzle) {\r\n    addCellEventListeners(puzzle, makeSolveInteractionFunction, handleSolveCellClick);\r\n}\r\n\r\nfunction addCellEventListeners(puzzle, interactionFunctionMaker, clickHandler) {\r\n    let mouseIsDown = false;\r\n    let interactionFunction = () => {};\r\n    Array.from(document.getElementsByClassName('cell')).forEach(cell => {\r\n        cell.addEventListener('mousedown', (e) => {\r\n            e.preventDefault();\r\n            interactionFunction = interactionFunctionMaker(puzzle, cell, e);\r\n            clickHandler(puzzle, cell, interactionFunction);\r\n            mouseIsDown = true;\r\n        });\r\n        cell.addEventListener('mouseenter', () => {\r\n            if (mouseIsDown) {\r\n                clickHandler(puzzle, cell, interactionFunction);\r\n            }\r\n        });\r\n    }); \r\n    document.getElementsByTagName('body')[0].addEventListener('mouseup', () => {\r\n        mouseIsDown = false;\r\n    });\r\n    document.getElementById('puzzle').addEventListener('contextmenu', (e) => {\r\n        e.preventDefault();\r\n    });\r\n}\r\n\r\nfunction handleSolveCellClick(puzzle, cell, interactionFunction) {\r\n    const rowIdx = cell.getAttribute('rowIdx');\r\n    const colIdx = cell.getAttribute('colIdx');\r\n    interactionFunction(rowIdx, colIdx, puzzle);\r\n    updateCellStateClass(cell, getCellClass(puzzle.board[rowIdx][colIdx]));\r\n    if (puzzleIsSolved(puzzle)) {\r\n        alert('You did it!')\r\n    }\r\n}\r\n\r\nfunction handleCreationCellClick(puzzle, cell, interactionFunction) {\r\n    const rowIdx = cell.getAttribute('rowIdx');\r\n    const colIdx = cell.getAttribute('colIdx');\r\n    interactionFunction(rowIdx, colIdx, puzzle);\r\n    updateColumnCountDivs(puzzle, colIdx);\r\n    updateRowCountDivs(puzzle, rowIdx);\r\n    updateCellStateClass(cell, getCellClass(puzzle.board[rowIdx][colIdx]));\r\n    updatePuzzleURL(puzzle);\r\n}\r\n\r\n\r\nfunction makeCreationInteractionFunction(puzzle, cell, event) {\r\n    return makeCellInteractionFunction(puzzle, cell, fillCellAndUpdateCounts);\r\n}\r\n\r\nfunction makeSolveInteractionFunction(puzzle, cell, event) {\r\n    if (event.button == 0) {\r\n        if (event.shiftKey) {\r\n            return makeCellInteractionFunction(puzzle, cell, markCell);\r\n        } else {\r\n            return makeCellInteractionFunction(puzzle, cell, fillCell);\r\n        }\r\n    } else if (event.button == 2) {\r\n        return makeCellInteractionFunction(puzzle, cell, blankCell);\r\n    } else {\r\n        return (rowIdx, colIdx, puzzle) => puzzle;\r\n    }\r\n}\r\n\r\nfunction makeCellInteractionFunction(puzzle, cell, interaction) {\r\n    const rowIdx = cell.getAttribute('rowIdx');\r\n    const colIdx = cell.getAttribute('colIdx');\r\n    return makeSingleContextInteraction(interaction, rowIdx, colIdx, puzzle);\r\n}\r\n\r\nfunction updateColumnCountDivs(puzzle, colIdx) {\r\n    updateColumnCountGroup(puzzle, colIdx);\r\n    const colCountGroupsDiv = getNthColumnCountsCol(colIdx);\r\n    updateCountGroupDiv(colCountGroupsDiv, puzzle.colCountGroups[colIdx]);\r\n}\r\n\r\nfunction getNthColumnCountsCol(n) {\r\n    return document.getElementById('colCountGroups')\r\n                   .getElementsByClassName('count-group')[n];\r\n}\r\n\r\nfunction updateRowCountDivs(puzzle, rowIdx) {\r\n    updateRowCountGroup(puzzle, rowIdx);\r\n    const rowCountGroupsDiv = getNthRowCountsCol(rowIdx);\r\n    updateCountGroupDiv(rowCountGroupsDiv, puzzle.rowCountGroups[rowIdx]);\r\n}\r\n\r\nfunction getNthRowCountsCol(n) {\r\n    return document.getElementById('rowCountGroups')\r\n                   .getElementsByClassName('count-group')[n];\r\n}\r\n\r\nmodule.exports = {\r\n    addCreationCellEventListeners: addCreationCellEventListeners,\r\n    addSolveCellEventListeners: addSolveCellEventListeners,\r\n    addUndoAndRedoListeners: addUndoAndRedoListeners\r\n}\n\n//# sourceURL=webpack:///./src/ui/cell-interactions.js?");

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

eval("const STATES = __webpack_require__(/*! ../puzzle.js */ \"./src/puzzle.js\").STATES;\r\nconst updatePuzzleURL = __webpack_require__(/*! ./render-puzzle-url.js */ \"./src/ui/render-puzzle-url.js\").updatePuzzleURL;\r\n\r\nfunction clearPuzzle() {\r\n    clearChildren(document.getElementById('cellGrid'));\r\n    clearChildren(document.getElementById('rowCountGroups'));\r\n    clearChildren(document.getElementById('colCountGroups'));\r\n}\r\n\r\nfunction renderPuzzle(puzzle) {\r\n    renderCellGrid(puzzle);\r\n    renderRowCounts(puzzle);\r\n    renderColCounts(puzzle);\r\n}\r\n\r\nfunction updateCreatePuzzle(puzzle) {\r\n    updatePuzzle(puzzle);\r\n    updatePuzzleURL(puzzle);\r\n}\r\n\r\nfunction updateSolvePuzzle(puzzle) {\r\n    updatePuzzle(puzzle);\r\n}\r\n\r\nfunction updatePuzzle(puzzle) {\r\n    updateRowCounts(puzzle);\r\n    updateColCounts(puzzle);\r\n    updateBoard(puzzle);\r\n}\r\n\r\nfunction updateRowCounts(puzzle) {\r\n    clearChildren(document.getElementById('rowCountGroups'));\r\n    renderRowCounts(puzzle);\r\n}\r\n\r\nfunction updateColCounts(puzzle) {\r\n    clearChildren(document.getElementById('colCountGroups'));\r\n    renderColCounts(puzzle);\r\n}\r\n\r\nfunction updateBoard(puzzle) {\r\n    Array.from(document.getElementsByClassName('row')).forEach((row, rowIdx) => {\r\n        Array.from(row.getElementsByClassName('cell')).forEach((cell, colIdx) => {\r\n            updateCellStateClass(cell, getCellClass(puzzle.board[rowIdx][colIdx]));\r\n        });\r\n    });\r\n}\r\n\r\nfunction renderCellGrid(puzzle) {\r\n    const grid = document.getElementById('cellGrid');\r\n    for (let i = 0; i < puzzle.board.length; i++) {\r\n        const row = createEmptyRow();\r\n        for (let j = 0; j < puzzle.board[i].length; j++) {\r\n            row.appendChild(createCell(puzzle.board, i, j));\r\n        }\r\n        grid.appendChild(row);\r\n    }\r\n}\r\n\r\nfunction createEmptyRow() {\r\n    const row = document.createElement('div');\r\n    row.setAttribute('class', 'row');\r\n    return row;\r\n}\r\n\r\nfunction createCell(board, rowIdx, colIdx) {\r\n    const cell = document.createElement('div');\r\n    updateCellStateClass(cell, getCellClass(board[rowIdx][colIdx]));\r\n    cell.setAttribute('rowIdx', rowIdx);\r\n    cell.setAttribute('colIdx', colIdx);\r\n    return cell;\r\n}\r\n\r\nfunction getCellClass(cellState) {\r\n    switch(cellState) {\r\n        case STATES.EMPTY:\r\n            return 'empty-cell';\r\n        case STATES.FILLED:\r\n            return 'filled-cell';\r\n        case STATES.BLANK:\r\n            return 'blank-cell';\r\n        case STATES.MARKED:\r\n            return 'marked-cell';\r\n    }\r\n}\r\n\r\nfunction updateCellStateClass(cell, stateClass) {\r\n    cell.setAttribute('class', 'cell ' + stateClass);\r\n}\r\n\r\nfunction renderRowCounts(puzzle) {\r\n    createCountsCollection(puzzle.rowCountGroups, document.getElementById('rowCountGroups'));\r\n}\r\n\r\nfunction renderColCounts(puzzle) {\r\n    createCountsCollection(puzzle.colCountGroups, document.getElementById('colCountGroups'));\r\n}\r\n\r\nfunction createCountsCollection(countGroups, parentDiv) {\r\n    countGroups.forEach(countGroup => {\r\n        parentDiv.appendChild(createCountGroupDiv(countGroup));\r\n    });\r\n    return parentDiv;\r\n}\r\n\r\nfunction createCountGroupDiv(countGroup) {\r\n    const countGroupDiv = document.createElement('div');\r\n    countGroupDiv.setAttribute('class', 'count-group');\r\n    return updateCountGroupDiv(countGroupDiv, countGroup);\r\n}\r\n\r\nfunction updateCountGroupDiv(countGroupDiv, countGroup) {\r\n    clearChildren(countGroupDiv);\r\n    countGroup.forEach(count => {\r\n        countGroupDiv.appendChild(createCountDiv(count));\r\n    });\r\n    return countGroupDiv;\r\n}\r\n\r\nfunction setCountGroupDivSizes(puzzle) {\r\n    const height = calculateDivSizeFromNumberOfCells(puzzle.board.length);\r\n    const width = calculateDivSizeFromNumberOfCells(puzzle.board[0].length);\r\n    document.getElementById('colCountGroups').style.height = `${height}px`;\r\n    document.getElementById('rowCountGroups').style.width = `${width}px`;\r\n}\r\n\r\nfunction calculateDivSizeFromNumberOfCells(numOfCells) {\r\n    const CELL_SIZE_IN_PX = 35;\r\n    return Math.ceil(numOfCells / 2) * CELL_SIZE_IN_PX;\r\n}\r\n\r\nfunction clearChildren(element) {\r\n    while (element.firstChild) {\r\n        element.removeChild(element.lastChild);\r\n    }\r\n}\r\n\r\nfunction createCountDiv(count) {\r\n    const countDiv = document.createElement('div');\r\n    countDiv.textContent = count.value;\r\n    countDiv.setAttribute('class', 'count');\r\n    return countDiv;\r\n}\r\n\r\nmodule.exports = {\r\n    renderPuzzle: renderPuzzle,\r\n    clearPuzzle: clearPuzzle,\r\n    updateCreatePuzzle: updateCreatePuzzle,\r\n    updateSolvePuzzle: updateSolvePuzzle,\r\n    renderRowCounts: renderRowCounts,\r\n    renderColCounts: renderRowCounts,\r\n    setCountGroupDivSizes: setCountGroupDivSizes,\r\n    updateCountGroupDiv: updateCountGroupDiv,\r\n    updateCellStateClass: updateCellStateClass,\r\n    getCellClass: getCellClass\r\n}\n\n//# sourceURL=webpack:///./src/ui/render-puzzle.js?");

/***/ })

/******/ });