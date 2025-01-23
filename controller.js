class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.initGame();
    }

    async initGame() {
        const settings = await this.view.getGameSettings();
        this.model.size = settings.size;
        this.model.winCondition = settings.winCondition;
        this.model.reset();
        this.view.renderBoard(this.model.board);
        this.view.updateStats(this.model.stats);
        this.model.loadGame();
        this.render();
    }

    handleCellClick(row, col) {
        const message = this.model.makeMove(row, col);
        if (message) {
            this.view.showMessage(message);
            this.model.saveGame();
        }
        this.render();
    }

    handleReset() {
        this.model.reset();
        this.model.saveGame();
        this.render();
    }

    render() {
        this.view.renderBoard(this.model.board);
        this.view.updateStats(this.model.stats);
    }
}

// Inicializace aplikace
const model = new TicTacToe();
const view = new View();
const controller = new Controller(model, view);