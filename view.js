class View {
    constructor() {
        this.boardElement = document.getElementById('board');
        this.statsElement = document.getElementById('stats');
        this.resetButton = document.getElementById('reset');
        this.startButton = document.getElementById('startGame');
        this.sizeInput = document.getElementById('size');
        this.winConditionInput = document.getElementById('winCondition');
        this.gameTypeInput = document.getElementById('gameType');
        this.scoreboardElement = document.getElementById('scoreboard'); // Initialize scoreboardElement

        this.startButton.addEventListener('click', () => this.startGame());
    }

    startGame() {
        const size = parseInt(this.sizeInput.value);
        const winCondition = parseInt(this.winConditionInput.value);
        const mode = this.gameTypeInput.value;

        // Logic to start the game with the provided parameters
        console.log(`Starting game with size: ${size}, win condition: ${winCondition}, mode: ${mode}`);

        // Initialize the game model and view based on the parameters
        this.model.size = size;
        this.model.winCondition = winCondition;
        this.model.reset();
        this.renderBoard(this.model.board);
        this.updateStats(this.model.stats);
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
