class View {
    constructor() {
        this.boardElement = document.getElementById('board');
        this.statsElement = document.getElementById('stats');
        this.resetButton = document.getElementById('reset');
        this.scoreboardElement = document.getElementById('scoreboard');
    }

    async getGameSettings() {
        const size = parseInt(prompt("Zadejte velikost hracího pole (např. 3):")) || 3;
        const winCondition = parseInt(prompt("Zadejte počet symbolů potřebných pro výhru (např. 3):")) || 3;
        const mode = prompt("Chcete hrát proti AI nebo proti hráči? (zadejte 'AI' nebo 'hráč')").toLowerCase();
        return { size, winCondition, mode };
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