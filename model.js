class TicTacToe {
    constructor(size = 3) {
        this.size = size;
        this.board = Array.from({ length: size }, () => Array(size).fill(null));
        this.currentPlayer = 'X';
        this.stats = { X: 0, O: 0 };
        this.gameOver = false;
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

        return winConditions.some(condition => condition.every(cell => cell === this.currentPlayer));
    }

    reset() {
        this.board = Array.from({ length: this.size }, () => Array(this.size).fill(null));
        this.currentPlayer = 'X';
        this.gameOver = false;
    }
}