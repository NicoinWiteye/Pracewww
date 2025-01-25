class TicTacToe {
    constructor(size = 3, winCondition = 3) {
        this.first = false;
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
        const directions = [
            { x: 1, y: 0 }, // Horizontální
            { x: 0, y: 1 }, // Vertikální
            { x: 1, y: 1 }, // Diagonála vlevo-dolů
            { x: 1, y: -1 } // Diagonála vlevo-nahoru
        ];
    
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.board[row][col] === this.currentPlayer) {
                    for (const { x, y } of directions) {
                        if (this.checkDirection(row, col, x, y)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    
    checkDirection(startRow, startCol, deltaX, deltaY) {
        let count = 0;
        for (let i = 0; i < this.winCondition; i++) {
            const row = startRow + i * deltaY;
            const col = startCol + i * deltaX;
    
            if (
                row >= 0 &&
                row < this.size &&
                col >= 0 &&
                col < this.size &&
                this.board[row][col] === this.currentPlayer
            ) {
                count++;
                if (count === this.winCondition) {
                    return true;
                }
            } else {
                break;
            }
        }
        return false;
    }


    checkLine(line) {
        let count = 0;
        for (let cell of line) {
            if (cell === this.currentPlayer) {
                count++;
                if (count === this.winCondition) {
                    return true;
                }
            } else {
                count = 0; // Reset count if the sequence is broken
            }
        }
        return false;
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
        // 1. AI checks if it can win in the current move
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (!this.board[row][col]) {
                    this.board[row][col] = this.currentPlayer; // Simulate AI move
                    if (this.checkWin()) {
                        this.gameOver = true; // End the game if AI wins
                        return; // AI wins
                    }
                    this.board[row][col] = null; // Undo the move
                }
            }
        }
    
        // 2. AI checks if it needs to block the opponent
        const opponent = this.currentPlayer === 'X' ? 'O' : 'X';
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (!this.board[row][col]) {
                    this.board[row][col] = opponent; // Simulate opponent's move
                    if (this.checkWin()) {
                        this.board[row][col] = this.currentPlayer; // Block opponent
                        return;
                    }
                    this.board[row][col] = null; // Undo the move
                }
            }
        }
    
        // 3. AI chooses the center if available
        const center = Math.floor(this.size / 2);
        if (!this.board[center][center]) {
            this.board[center][center] = this.currentPlayer;
            return;
        }
    
        // 4. AI picks a random empty cell
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
            this.board[row][col] = this.currentPlayer;
        }
    }
    
    
    
}
