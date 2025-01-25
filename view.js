class View {
    constructor() {
        this.boardElement = document.getElementById('board');
        this.statsElement = document.getElementById('stats');
        this.resetButton = document.getElementById('reset');
        this.startButton = document.getElementById('startGame');
        this.sizeInput = document.getElementById('size');
        this.winConditionInput = document.getElementById('winCondition');
        this.gameTypeInput = document.getElementById('gameType');
        this.aiDifficultyInput = document.getElementById('aiDifficulty');
        this.scoreboardElement = document.getElementById('scoreboard'); 

        // Instantiate the TicTacToe model
        this.model = new TicTacToe();

        this.startButton.addEventListener('click', () => this.startGame(this.model)); // Pass model to startGame
    }

    

    startGame(model) {
        const size = parseInt(this.sizeInput.value);
        const winCondition = parseInt(this.winConditionInput.value);
        const mode = this.gameTypeInput.value;

        console.log(`Starting game with size: ${size}, win condition: ${winCondition}, mode: ${mode}`);

        model.size = size;
        model.winCondition = winCondition;
        if (!model.gameOver && model.board.flat().some(cell => cell !== null)) {
            console.log("Game is already in progress. Reloading the current game state.");
        } else {
            console.log("No game in progress. Resetting the board.");
            model.reset(); // Reset only if no game is in progress
        }

        // Set the grid style based on the size
        //this.boardElement.style.gridTemplateColumns = `repeat(${size}, 100px)`;
        this.boardElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

        //model.reset(); - DO NOT start 
        this.renderBoard(model.board);
        this.updateStats(model.stats);
        
    }

    renderBoard(board) {
        this.boardElement.innerHTML = '';
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('div');
                cellElement.className = 'cell';
                cellElement.textContent = cell;
                cellElement.onclick = () => {
                    this.onCellClick(rowIndex, colIndex);
                };
                this.boardElement.appendChild(cellElement);
            });
        });
    }

    updateStats(stats) {
        this.statsElement.innerHTML = `Hráč X: ${stats.X} | Hráč O: ${stats.O}`;
    }

    setResetHandler(handler) {
        this.resetButton.onclick = handler;
    }

    setCellClickHandler(handler) {
        this.onCellClick = handler;
    }

    showMessage(message) {
        alert(message);
    }

    updateScoreboard(scores) {
        this.scoreboardElement.innerHTML = scores.map(score => `Hráč: ${score.player}, Doba: ${score.duration} ms, Velikost: ${score.size}, Výhra: ${score.winCondition}`).join('<br>');
    }
}
    document.addEventListener("DOMContentLoaded", () => {
        const sizeInput = document.getElementById("size");
        const winConditionInput = document.getElementById("winCondition");

        sizeInput.addEventListener("input", () => {
            let size = parseInt(sizeInput.value);
            const winCondition = parseInt(winConditionInput.value);

            if (size > 15) {
                size = 15;
                sizeInput.value = 15; 
            }

            if (winCondition > size) {
                winConditionInput.value = size;
            }
        });

        winConditionInput.addEventListener("input", () => {
            const size = parseInt(sizeInput.value);
            const winCondition = parseInt(winConditionInput.value);

            if (winCondition > size) {
                winConditionInput.value = size;
            }
        });
    });
