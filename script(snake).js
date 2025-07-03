const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("score");
const resultDisplay = document.getElementById("result");

const box = 20;
let game;
let snake;
let food;
let dx;
let dy;
let score;

function resetGame() {
  score = 0;
  dx = box;
  dy = 0;
  snake = [{ x: 10 * box, y: 10 * box }];
  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
  scoreDisplay.innerText = "Score: " + score;
  resultDisplay.innerText = "";
}

function drawGame() {
  // Draw background
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#0f0" : "#0b0";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Move snake
  let headX = snake[0].x + dx;
  let headY = snake[0].y + dy;

  // Game Over
  if (
    headX < 0 || headX >= canvas.width ||
    headY < 0 || headY >= canvas.height ||
    snake.some(segment => segment.x === headX && segment.y === headY)
  ) {
    clearInterval(game);
    resultDisplay.innerText = "Game Over! Final Score: " + score;
    return;
  }

  // Eat food
  if (headX === food.x && headY === food.y) {
    score++;
    scoreDisplay.innerText = "Score: " + score;
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };
  } else {
    snake.pop();
  }

  snake.unshift({ x: headX, y: headY });
}

function startGame() {
  clearInterval(game); // clear if game was already running
  resetGame();
  game = setInterval(drawGame, 200); // slower speed
}

// Direction controls
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp" && dy === 0) {
    dx = 0; dy = -box;
  } else if (event.key === "ArrowDown" && dy === 0) {
    dx = 0; dy = box;
  } else if (event.key === "ArrowLeft" && dx === 0) {
    dx = -box; dy = 0;
  } else if (event.key === "ArrowRight" && dx === 0) {
    dx = box; dy = 0;
  }
});

// Start button click
startBtn.addEventListener("click", startGame);
