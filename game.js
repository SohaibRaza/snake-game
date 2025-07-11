// Game configuration and constants
const CONFIG = {
    LEVELS: [
        { speed: 150, scoreToNext: 50, color: '#2ecc71' },
        { speed: 120, scoreToNext: 100, color: '#3498db' },
        { speed: 90, scoreToNext: 200, color: '#9b59b6' },
        { speed: 70, scoreToNext: 300, color: '#e67e22' },
        { speed: 50, scoreToNext: Infinity, color: '#e74c3c' }
    ],
    GRID_SIZE: 20,
    INITIAL_SNAKE_POSITION: { x: 10, y: 10 },
    POINTS_PER_FOOD: 10,
    CANVAS_SIZE: 400
};

// State management
class GameState {
    constructor() {
        this.score = 0;
        this.level = 0;
        this.gameOver = false;
        this.paused = false;
    }

    getCurrentLevel() {
        return CONFIG.LEVELS[this.level];
    }

    updateScore(points) {
        this.score += points;
        if (this.level < CONFIG.LEVELS.length - 1 && 
            this.score >= CONFIG.LEVELS[this.level].scoreToNext) {
            this.level++;
            return true;
        }
        return false;
    }
}

// Snake entity
class Snake {
    constructor() {
        this.reset();
    }

    reset() {
        this.position = [{ ...CONFIG.INITIAL_SNAKE_POSITION }];
        this.direction = { x: 0, y: 0 };
        this.nextDirection = { x: 0, y: 0 };
        this.expanded = false;
    }

    update() {
        this.direction = this.nextDirection;
        const head = { 
            x: this.position[0].x + this.direction.x,
            y: this.position[0].y + this.direction.y
        };
        this.position.unshift(head);
        if (!this.expanded) {
            this.position.pop();
        }
        this.expanded = false;
    }

    expand() {
        this.expanded = true;
    }

    checkCollision() {
        const head = this.position[0];
        if (head.x < 0 || head.x >= CONFIG.GRID_SIZE || 
            head.y < 0 || head.y >= CONFIG.GRID_SIZE) {
            return true;
        }
        return this.position.slice(1).some(segment => 
            segment.x === head.x && segment.y === head.y
        );
    }
}

// Input handler
class InputHandler {
    constructor(onDirectionChange) {
        this.onDirectionChange = onDirectionChange;
        this.bindControls();
    }

    bindControls() {
        document.addEventListener('keydown', (e) => {
            const directions = {
                'ArrowUp': { x: 0, y: -1 },
                'ArrowDown': { x: 0, y: 1 },
                'ArrowLeft': { x: -1, y: 0 },
                'ArrowRight': { x: 1, y: 0 }
            };

            if (directions[e.key]) {
                this.onDirectionChange(directions[e.key]);
            }
        });
    }
}

// Renderer
class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cellSize = CONFIG.CANVAS_SIZE / CONFIG.GRID_SIZE;
    }

    clear() {
        this.ctx.fillStyle = '#34495e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawSnake(snake, color) {
        snake.position.forEach((segment, index) => {
            this.ctx.fillStyle = index === 0 ? '#e74c3c' : color;
            this.ctx.fillRect(
                segment.x * this.cellSize,
                segment.y * this.cellSize,
                this.cellSize - 1,
                this.cellSize - 1
            );
        });
    }

    drawFood(food) {
        this.ctx.fillStyle = '#f1c40f';
        this.ctx.fillRect(
            food.x * this.cellSize,
            food.y * this.cellSize,
            this.cellSize - 1,
            this.cellSize - 1
        );
    }

    updateUI(score, level) {
        document.getElementById('score').textContent = `Score: ${score} - Level: ${level + 1}`;
    }

    showGameOver(score, callback) {
        const gameOver = document.getElementById('game-over');
        gameOver.style.opacity = '0';
        gameOver.style.display = 'block';
        document.getElementById('final-score').textContent = score;
        
        // Smooth fade-in animation
        requestAnimationFrame(() => {
            gameOver.style.transition = 'opacity 0.5s ease-in';
            gameOver.style.opacity = '1';
        });

        const playAgainBtn = document.querySelector('#game-over button');
        playAgainBtn.onclick = () => {
            gameOver.style.opacity = '0';
            setTimeout(() => {
                gameOver.style.display = 'none';
                callback();
            }, 500);
        };
    }
}

// Main game class
class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.state = new GameState();
        this.snake = new Snake();
        this.renderer = new Renderer(this.canvas);
        this.food = this.generateFood();

        this.inputHandler = new InputHandler((newDirection) => {
            const { x, y } = this.snake.direction;
            if (!(newDirection.x === -x && newDirection.y === -y)) {
                this.snake.nextDirection = newDirection;
            }
        });

        this.gameLoop();
    }

    generateFood() {
        let food;
        do {
            food = {
                x: Math.floor(Math.random() * CONFIG.GRID_SIZE),
                y: Math.floor(Math.random() * CONFIG.GRID_SIZE)
            };
        } while (this.snake.position.some(segment => 
            segment.x === food.x && segment.y === food.y
        ));
        return food;
    }

    update() {
        if (this.state.gameOver || this.state.paused) return;

        this.snake.update();

        const head = this.snake.position[0];
        if (head.x === this.food.x && head.y === this.food.y) {
            this.snake.expand();
            this.food = this.generateFood();
            const levelUp = this.state.updateScore(CONFIG.POINTS_PER_FOOD);
            if (levelUp) {
                this.showLevelUpAnimation();
            }
        }

        if (this.snake.checkCollision()) {
            this.state.gameOver = true;
            this.renderer.showGameOver(this.state.score, () => this.restart());
        }
    }

    showLevelUpAnimation() {
        this.state.paused = true;
        const levelDiv = document.createElement('div');
        levelDiv.textContent = `Level ${this.state.level + 1}!`;
        levelDiv.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 48px;
            color: ${CONFIG.LEVELS[this.state.level].color};
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        `;
        this.canvas.parentElement.appendChild(levelDiv);

        setTimeout(() => {
            levelDiv.style.opacity = '1';
            setTimeout(() => {
                levelDiv.style.opacity = '0';
                setTimeout(() => {
                    levelDiv.remove();
                    this.state.paused = false;
                }, 500);
            }, 1000);
        }, 0);
    }

    draw() {
        this.renderer.clear();
        this.renderer.drawSnake(this.snake, CONFIG.LEVELS[this.state.level].color);
        this.renderer.drawFood(this.food);
        this.renderer.updateUI(this.state.score, this.state.level);
    }

    gameLoop() {
        this.update();
        this.draw();
        setTimeout(
            () => requestAnimationFrame(() => this.gameLoop()),
            CONFIG.LEVELS[this.state.level].speed
        );
    }

    restart() {
        this.state = new GameState();
        this.snake.reset();
        this.food = this.generateFood();
    }
}

// Initialize game
let game = new Game();