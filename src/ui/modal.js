const updateCountGroupDiv = require('./render-puzzle.js').updateCountGroupDiv;
const parseCountGroupString = require('../puzzle-entry-parsing.js').parseCountGroupString;
const updatePuzzleURL = require('./render-puzzle-url.js').updatePuzzleURL;

const modalBackground = document.getElementsByClassName('modal-background')[0];

function addEventListenersToCounts(puzzle) {
    const colCountGroups = document.getElementById('colCountGroups').getElementsByClassName('count-group');
    addEventListenersToCountGroups(puzzle, colCountGroups, openColumnModal);
    const rowCountGroups = document.getElementById('rowCountGroups').getElementsByClassName('count-group');
    addEventListenersToCountGroups(puzzle, rowCountGroups, openRowModal);
}

function addEventListenersToCountGroups(puzzle, countGroups, openFunction) {
    Array.from(countGroups).forEach((countGroup, idx) => {
        addEventListenersToCountGroup(puzzle, countGroup, idx, openFunction);
    });
}

function addEventListenersToCountGroup(puzzle, countGroup, idx, openFunction) {
    countGroup.addEventListener('click', () => {openFunction(puzzle, countGroup, idx)});
}

function addModalCloseEventListener() {
    document.getElementById('closeBtn').addEventListener('click', closeModal);
}

function openRowModal(puzzle, countGroupDiv, idx) {
    modalBackground.style.display = 'block';
    const input = document.getElementById('enterCountsInput');
    input.focus();
    input.value = puzzle.rowCountGroups[idx].join(',') 
    document.getElementById('enterCountsForm').onsubmit = () => {
        try {
            const newCounts = parseCountGroupString(input.value, puzzle.board[0].length);
            puzzle.rowCountGroups[idx] = newCounts;
            updateCountGroupDiv(countGroupDiv, newCounts);
            addEventListenersToCountGroup(puzzle, countGroupDiv, idx, openRowModal);
            hideError();
            closeModal();
            updatePuzzleURL(puzzle);
        } catch (e) {
            showError(e.message);
        }
        return false;
    }
}

function openColumnModal(puzzle, countGroupDiv, idx) {
    modalBackground.style.display = 'block';
    const input = document.getElementById('enterCountsInput');
    input.focus(); 
    input.value = puzzle.colCountGroups[idx].join(',')
    document.getElementById('enterCountsForm').onsubmit = () => {
        try {
            const newCounts = parseCountGroupString(input.value, puzzle.board.length);
            puzzle.colCountGroups[idx] = newCounts;
            updateCountGroupDiv(countGroupDiv, newCounts);
            addEventListenersToCountGroup(puzzle, countGroupDiv, idx, openColumnModal);
            hideError();
            closeModal();
            updatePuzzleURL(puzzle);
        } catch (e) {
            showError(e.message);
        }
        return false;
    }
}

function closeModal() {
    hideError();
    modalBackground.style.display = 'none';
}

function showError(message) {
    const errorMessage = document.getElementById('enterCountsError');
    errorMessage.innerHTML = message;
    errorMessage.style.display = 'block';
}

function hideError() {
    document.getElementById('enterCountsError').style.display = 'none';
}

module.exports = {
    addEventListenersToCounts: addEventListenersToCounts,
    addModalCloseEventListener: addModalCloseEventListener
}