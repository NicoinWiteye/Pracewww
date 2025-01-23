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

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.scoreboard = new Scoreboard();

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
        this.isAiMode = settings.mode === 'ai';
        
        // Set the cell click handler
        this.view.setCellClickHandler(this.handleCellClick.bind(this));
        
        this.updateScoreboard();
    }

    handleCellClick(row, col) {
        const message = this.model.makeMove(row, col);
        if (message) {
            const duration = Date.now() - this.model.startTime; // Zaznamenání doby trvání hry
            const score = {
                player: this.model.currentPlayer,
                duration: duration,
                size: this.model.size,
                winCondition: this.model.winCondition
            };
            this.scoreboard.addScore(score); // Uložení skóre
            this.model.saveGame();
            this.view.showMessage(message);
            this.updateScoreboard();
            if (this.isAiMode && !this.model.gameOver) {
                this.model.aiMove();
                this.render();
            }
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

    updateScoreboard() {
        const scores = this.scoreboard.getScores();
        this.view.updateScoreboard(scores);
    }
}

// Inicializace aplikace
const model = new TicTacToe();
const view = new View();
const controller = new Controller(model, view);
