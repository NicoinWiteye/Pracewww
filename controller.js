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
        this.isAiMode = false; // Track if AI mode is active

        this.view.setResetHandler(this.handleReset.bind(this)); // Set reset handler
        this.view.setCellClickHandler(this.handleCellClick.bind(this)); // Set cell click handler
        this.loadGame(); // Load game state if exists
        this.updateScoreboard();

        this.view.startButton.addEventListener('click', () => this.startNewGame()); // Start new game
    }

    loadGame() {
        this.model.loadGame(); // Load the game state from local storage
        this.view.startGame(this.model);
        if (this.model.board) {
            this.view.renderBoard(this.model.board); // Render the loaded board
            this.view.updateStats(this.model.stats); // Update stats
            this.isGameInProgress = true; // Set game in progress
        }
    }

    startNewGame() {
        this.model.reset();
        const size = parseInt(this.view.sizeInput.value);
        const winCondition = parseInt(this.view.winConditionInput.value);
        const mode = this.view.gameTypeInput.value;

        this.model.size = size;
        this.model.winCondition = winCondition;
        
        this.isAiMode = mode === 'playerVsAI'; // Set AI mode based on selection
        
        this.view.startGame(this.model);
        this.view.renderBoard(this.model.board);
        this.view.updateStats(this.model.stats);

        this.isGameInProgress = true; // Set game in progress
        this.model.saveGame(); // Save the initial state of the game
        this.updateScoreboard();

        if (this.isAiMode && this.model.currentPlayer === 'O') {
            this.model.aiMove(); // AI makes the first move if applicable
            this.render();
        }
    }

    handleCellClick(row, col) {
        if (!this.isGameInProgress || this.model.gameOver) return; // Prevent clicks if no game is in progress or game is over

        if (this.model.board[row][col]) return; // Prevent clicking on an already occupied cell

        const message = this.model.makeMove(row, col);
        this.model.saveGame(); // Save the state of the game after a move
        this.render();

        if (message) {
            this.handleGameOver(message);
            return;
        }

        if (this.isAiMode && !this.model.gameOver) {
            this.model.aiMove(); // AI makes its move after the player
            this.model.saveGame(); // Save the state after AI's move
            this.render();

            if (this.model.gameOver) {
                this.handleGameOver(`${this.model.currentPlayer} vyhrál!`);
            }
        }
    }

    handleGameOver(message) {
        const duration = Date.now() - this.model.startTime;
        let playerNickname = '';

        if (message.includes('vyhrál')) {
            alert(message);
            playerNickname = prompt("Zadejte jméno hráče: ") || this.model.currentPlayer;
        } else {
            alert(message);
            playerNickname = "Remíza"; // Set nickname to "Remíza" for draws
        }

        const score = {
            player: playerNickname,
            duration: duration,
            size: this.model.size,
            winCondition: this.model.winCondition
        };

        this.scoreboard.addScore(score);
        this.isGameInProgress = false;
        this.updateScoreboard();
    }

    handleReset() {
        this.model.reset();
        this.model.saveGame(); // Save the reset state
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
