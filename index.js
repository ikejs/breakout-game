/* eslint-disable no-alert */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

let ballColor = 'blue';

const ballRadius = 10;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const brickRowCount = 4;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let interval;

let score = 0;

const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function changeBallColor() {
  const letters = '0123456789ABCDEF';
  let newColor = '#';
  for (let i = 0; i < 6; i += 1) {
    newColor += letters[Math.floor(Math.random() * 16)];
  }
  ballColor = newColor;
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score += 1 * 1200;
          if (score === brickRowCount * brickColumnCount) {
            alert(`YOU WIN, CONGRATULATIONS! Score: ${score}`);
            document.location.reload();
            clearInterval(interval);
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function draw() {
  if (rightPressed) {
    paddleX += 4;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 4;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      changeBallColor();
      score -= 500;
    } else {
      alert(`GAME OVER! Score: ${score}`);
      document.location.reload();
      clearInterval(interval);
    }
  }

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();
  x += dx;
  y += dy;
}

interval = setInterval(draw, 10);
