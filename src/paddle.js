/* eslint-disable no-alert */

const canvas = document.getElementById('myCanvas');


class Paddle {
  constructor(w = 75, h = 20) {
    this.width = w;
    this.height = h;
    this.x = canvas.width / (2 - (w / 2));
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.width, this.height, this.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

export default Paddle;
