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
        this.isGameInProgress = false; // Track if a game is in progress

        this.view.setResetHandler(this.handleReset.bind(this)); // Set reset handler
        this.view.setCellClickHandler(this.handleCellClick.bind(this)); // Set cell click handler
        this.view.startButton.addEventListener('click', () => this.startNewGame()); // Start new game
    }

    startNewGame() {
        const size = parseInt(this.view.sizeInput.value);
        const winCondition = parseInt(this.view.winConditionInput.value);
        const mode = this.view.gameTypeInput.value;

        this.model.size = size;
        this.model.winCondition = winCondition;
        this.model.reset();
        this.view.renderBoard(this.model.board);
        this.view.updateStats(this.model.stats);
        this.isAiMode = mode === 'playerVsAI';
        this.isGameInProgress = true; // Set game in progress
        this.updateScoreboard();
    }

    handleCellClick(row, col) {
        if (!this.isGameInProgress) return; // Prevent clicks if no game is in progress

        const message = this.model.makeMove(row, col);
        if (message) {
            const duration = Date.now() - this.model.startTime; // Record game duration
            const score = {
                player: this.model.currentPlayer,
                duration: duration,
                size: this.model.size,
                winCondition: this.model.winCondition
            };
            this.scoreboard.addScore(score); // Save score
            this.model.saveGame();
            this.view.showMessage(message);
            this.updateScoreboard();
            if (this.isAiMode && !this.model.gameOver) {
                this.model.aiMove();
                this.render();
            }
        }
        this.render();

        // Check if the game is over
        if (this.model.gameOver) {
            this.isGameInProgress = false; // Clear game in progress
            this.updateScoreboard();
        }
    }

    handleReset() {
        this.model.reset();
        this.model.saveGame();
        this.isGameInProgress = false; // Reset game state
        this.view.renderBoard(this.model.board); // Re-render the board
        this.view.updateStats(this.model.stats); // Update stats
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

// Initialize application
const model = new TicTacToe();
const view = new View();
const controller = new Controller(model, view);
