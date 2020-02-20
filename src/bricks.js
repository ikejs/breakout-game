import Brick from './brick';

class Bricks {
  constructor(c, r) {
    this.bricksArray = [];
    this.rowCount = r;
    this.columnCount = c;
    this.width = 75;
    this.height = 20;
    this.padding = 10;
    this.offsetTop = 30;
    this.offsetLeft = 30;
    this.setup();
  }

  setup() {
    for (let c = 0; c < this.columnCount; c += 1) {
      this.bricksArray[c] = [];
      for (let r = 0; r < this.rowCount; r += 1) {
        const x = (c * (this.width + this.padding)) + this.offsetLeft;
        const y = (r * (this.height + this.padding)) + this.offsetTop;
        this.bricksArray[c][r] = new Brick(x, y, this.width, this.height, `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`);
      }
    }
  }

  draw(ctx) {
    for (let c = 0; c < this.columnCount; c += 1) {
      for (let r = 0; r < this.rowCount; r += 1) {
        if (this.bricksArray[c][r].status === 1) {
          const brick = this.bricksArray[c][r];
          brick.render(ctx, this.width, this.height);
        }
      }
    }
  }
}

export default Bricks;
