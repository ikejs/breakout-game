import Ball from './ball';
import Bricks from './bricks';
import Paddle from './paddle';

/* eslint-disable no-alert */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let lives = 6;

// Create Ball
const ball = new Ball(canvas.width / 2, canvas.height - 30, 10, 10, 10, 'blue');
const ballRadius = 10;

// Create Paddle
const paddle = new Paddle(10, 75); // width, height

// Create Bricks
const bricks = new Bricks(5, 4); // horizontal, vertical


let rightPressed = false;
let leftPressed = false;

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

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddle.width / 2;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);


function collisionDetection() {
  for (let c = 0; c < bricks.columnCount; c += 1) {
    for (let r = 0; r < bricks.rowCount; r += 1) {
      const b = bricks.bricksArray[c][r];
      if (b.status === 1) {
        if (ball.x > b.x && ball.x < b.x + bricks.width && ball.y > b.y && ball.y < b.y + bricks.height) {
          ball.dy = -ball.dy;
          b.status = 0;
          score += 1;
          if (bricks.rowCount * bricks.columnCount === score) {
            alert(`YOU WIN, CONGRATULATIONS! Score: ${score}`);
            document.location.reload();
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

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function draw() {
  // move paddle right
  if (rightPressed) {
    paddle.x += 4;
    if (paddle.x + paddle.width > canvas.width) {
      paddle.x = canvas.width - paddle.width;
    }
    // move paddle left
  } else if (leftPressed) {
    paddle.x -= 4;
    if (paddle.x < 0) {
      paddle.x = 0;
    }
  }


  if (ball.y + ball.dy < ballRadius) {
    // paddle hit top 
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ballRadius) {
    // paddle hit the bottom 

    console.log(ball.x, paddle.x, ball.x, paddle.x + paddle.width);
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      console.log('-- Ball Hit Paddle --')
      // ball hit paddle 
      ball.dy = -ball.dy;
      ball.changeColor();
    } else {
      lives -= 1;
      if (!lives) {
        alert(`GAME OVER! Score: ${score}`);
        document.location.reload();
      } else {
        ball.reset();
        paddle.x = (canvas.width - paddle.width) / 2;
      }
    }
  }

  if (ball.x + ball.dx > canvas.width - ballRadius || ball.x + ball.dx < ballRadius) {
    ball.dx = -ball.dx;
  }

  if (ball.y + ball.dy > canvas.height - ballRadius || ball.y + ball.dy < ballRadius) {
    ball.dy = -ball.dy;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.render(ctx);
  bricks.draw(ctx);
  paddle.draw(ctx);
  drawScore();
  drawLives();
  collisionDetection();
  ball.move();

  requestAnimationFrame(draw);
}

draw();
