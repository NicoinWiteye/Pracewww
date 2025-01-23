class TicTacToe {
    constructor(size = 3, winCondition = 3) {
        this.size = size;
        this.winCondition = winCondition;
        this.board = Array.from({ length: size }, () => Array(size).fill(null));
        this.currentPlayer = 'X';
        this.stats = { X: 0, O: 0 };
        this.gameOver = false;
        this.startTime = null;
    }

    makeMove(row, col) {
        if (!this.gameOver && !this.board[row][col]) {
            this.board[row][col] = this.currentPlayer;
            if (this.checkWin()) {
                this.stats[this.currentPlayer]++;
                this.gameOver = true;
                return `${this.currentPlayer} vyhrál!`;
            } else if (this.board.flat().every(cell => cell)) {
                this.gameOver = true;
                return 'Remíza!';
            } else {
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            }
        }
        return null;
    }

    checkWin() {
        const winConditions = [
            ...this.board, // rows
            ...this.board[0].map((_, colIndex) => this.board.map(row => row[colIndex])), // columns
            this.board.map((row, index) => row[index]), // main diagonal
            this.board.map((row, index) => row[this.size - 1 - index]) // anti diagonal
        ];

        return winConditions.some(condition => condition.filter(cell => cell).length >= this.winCondition && condition.every(cell => cell === this.currentPlayer));
    }

    reset() {
        this.board = Array.from({ length: this.size }, () => Array(this.size).fill(null));
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.startTime = null;
    }

    saveGame() {
        const gameState = {
            board: this.board,
            currentPlayer: this.currentPlayer,
            stats: this.stats,
            gameOver: this.gameOver,
            size: this.size,
            winCondition: this.winCondition,
            startTime: this.startTime
        };
        localStorage.setItem('ticTacToeGame', JSON.stringify(gameState));
    }

    loadGame() {
        const gameState = JSON.parse(localStorage.getItem('ticTacToeGame'));
        if (gameState) {
            this.board = gameState.board;
            this.currentPlayer = gameState.currentPlayer;
            this.stats = gameState.stats;
            this.gameOver = gameState.gameOver;
            this.size = gameState.size;
            this.winCondition = gameState.winCondition;
            this.startTime = gameState.startTime;
        }
    }
}
class Scoreboard {
    constructor() {
        this.scores = JSON.parse(localStorage.getItem('ticTacToeScores')) || [];
    }

    addScore(score) {
        this.scores.push(score);
        localStorage.setItem('ticTacToeScores', JSON.stringify(this.scores));
    }

    getScores() {
        return this.scores;
    }
}