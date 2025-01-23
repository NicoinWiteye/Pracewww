class View {
    constructor() {
        this.boardElement = document.getElementById('board');
        this.statsElement = document.getElementById('stats');
        this.resetButton = document.getElementById('reset');
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
}