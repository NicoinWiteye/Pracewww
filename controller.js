class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.setCellClickHandler(this.handleCellClick.bind(this));
        this.view.setResetHandler(this.handleReset.bind(this));
        this.render();
    }

    handleCellClick(row, col) {
        const message = this.model.makeMove(row, col);
        if (message) {
            this.view.showMessage(message);
        }
        this.render();
    }

    handleReset() {
        this.model.reset();
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