class TicTacToe {
    constructor(size = 3, winCondition = 3) {
        this.size = size;
        this.winCondition = winCondition;
        this.board = Array.from({ length: size }, () => Array(size).fill(null));
        this.currentPlayer = 'X';
        this.stats = { X: 0, O: 0 };
        this.gameOver = false;
        this.startTime = Date.now(); // Inicializace času hry
    }

    makeMove(row, col) {
        if (!this.gameOver && !this.board[row][col]) {
            this.board[row][col] = this.currentPlayer;
            if (this.checkWin()) {
                this.stats[this.currentPlayer]++;
                this.gameOver = true;
                return `${this.currentPlayer} vyhrál!`; // Prompt for nickname
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
        this.startTime = Date.now(); // Resetování času hry
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
            this.startTime = gameState.startTime || Date.now(); // Načtení času hry
        }
    }

    aiMove() {
        const emptyCells = [];
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (!this.board[row][col]) {
                    emptyCells.push({ row, col });
                }
            }
        }
        if (emptyCells.length > 0) {
            const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.makeMove(row, col);
        }
    }
}
