const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const canvasSize = canvas.width;
const initialSnakeLength = 5;

let snake = [];
let direction = { x: 1, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;

function init() {
    snake = [];
    for (let i = initialSnakeLength; i > 0; i--) {
        snake.push({ x: i, y: 0 });
    }
    placeFood();
    score = 0;
    direction = { x: 1, y: 0 };
    gameLoop();
}

function placeFood() {
    food.x = Math.floor(Math.random() * (canvasSize / gridSize));
    food.y = Math.floor(Math.random() * (canvasSize / gridSize));
}

function gameLoop() {
    setTimeout(() => {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        if (isGameOver()) {
            alert('Game Over! Your score: ' + score);
            init();
        } else {
            gameLoop();
        }
    }, 100);
}

function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function drawSnake() {
    ctx.fillStyle = 'lime';
    snake.forEach(part => {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    });
}

function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }

    snake.unshift(newHead);
}

function isGameOver() {
    const head = snake[0];

    if (head.x < 0 || head.y < 0 || head.x >= canvasSize / gridSize || head.y >= canvasSize / gridSize) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }

    return false;
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

init();
