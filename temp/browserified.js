(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function generateCreationBoard(m, n) {
    if (m === 0 || n === 0) {
        return [];
    } else {
        let board = [];
        for (let i = 0; i < m; i++) {
            board.push([]);
            for (let j = 0; j < n; j++) {
                board[i].push('empty')
            }
        }
        return board;
    }
}

module.exports = {
    generateCreationBoard: generateCreationBoard
}
},{}],2:[function(require,module,exports){
const generateCreationBoard = require('../src/boardCreation.js').generateCreationBoard
renderBoard(generateCreationBoard(5, 5));

Array.from(document.getElementsByClassName("cell")).forEach(cell => {
    cell.addEventListener("click", () => {
        cell.style.backgroundColor = "black"
    });
}); 

function renderBoard(board) {
    const grid = document.getElementById("cellGrid");
    for (let i = 0; i < board.length; i++) {
        const row = createEmptyRow();
        for (let j = 0; j < board[i].length; j++) {
            row.appendChild(createBlankCell());
        }
        grid.appendChild(row);
    }
}

function createEmptyRow() {
    return document.createElement('div');
}

function createBlankCell() {
    const cell = document.createElement('div');
    cell.setAttribute('class', 'cell');
    return cell;
}

},{"../src/boardCreation.js":1}]},{},[1,2]);
