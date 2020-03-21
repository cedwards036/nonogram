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