const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = 800;
const height = 500;

class Rect {
  constructor(x, y, width, height, direction, isMove, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.direction = direction;
    this.isMove = isMove;
    this.speed = speed;
  }
  changeDirection(direction) {
    this.direction = direction;
  }
  moveRight(speed) {
    if (!this.isMove) return;
    this.x += speed;
  }
  moveLeft(speed) {
    if (!this.isMove) return;
    this.x -= speed;
  }
}

const smallRect = new Rect(200, height - 50, 50, 50, "right", false, 2);
const bigRect = new Rect(500, height - 100, 100, 100, "right", false, 2);

function render() {
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#FFFFFF";
  ctx.strokeRect(smallRect.x, smallRect.y, smallRect.width, smallRect.height);

  // ctx.fillStyle = "#FFFFFF"
  // ctx.fillRect(bigRect.x, bigRect.y, bigRect.width, bigRect.height);
}

function loop(timestamp) {
  let progress = timestamp - lastRender;

  render(progress);

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}

let lastRender = 0;
window.requestAnimationFrame(loop);

let isDragging = false;

function handleMouseDown(event) {
  if (
    event.offsetX >= smallRect.x &&
    event.offsetX <= smallRect.x + smallRect.width &&
    event.offsetY >= smallRect.y
  ) {
    isDragging = true;
  }
}

function handleMouseMove(event) {
  if (isDragging) {
    if (
      event.offsetX >= smallRect.x &&
      event.offsetX <= smallRect.x + smallRect.width &&
      event.offsetY >= smallRect.y
    ) {
      console.log(event.offsetX - smallRect.width)
      smallRect.x = event.offsetX - smallRect.width;
    }
  }
}

function handleMouseOut(event) {
  isDragging = false;
}

function handleMouseUp(event) {
  isDragging = false;
}

canvas.addEventListener("mousedown", function(event) {
  handleMouseDown(event);
});

canvas.addEventListener("mousemove", function(event) {
  handleMouseMove(event);
});

canvas.addEventListener("mouseup", function (event) {
  handleMouseUp(event);
});

canvas.addEventListener("mouseout", function (event) {
  handleMouseOut(event);
});

// const rectHeight = 50;
// const rectWidth = 50;
// const rect1Height = 100;
// const rect1Width = 100;
// let rectXPos = 0 + 1;
// let rectYPos = height - rectHeight - 1;
// let rect1YPos = height - rect1Height;
// let pos1 = 200;
// let pos2 = 400;
// let direction1 = "left";
// let direction2 = "left";
// let rect1Move = false;

// function renderBigRect(pos) {
//   ctx.fillStyle = "#FFFFFF";
//   ctx.fillRect(pos, rect1YPos, rect1Height, rect1Width);
// }

// function draw() {
//   ctx.clearRect(0, 0, width, height);
//   // background
//   ctx.fillStyle = "#000000";
//   ctx.fillRect(0, 0, width, height);

//   // 1 cube
//   ctx.strokeStyle = "#FFFFFF";
//   ctx.strokeRect(pos1, rectYPos, 50, 50);

//   // 2 cube
//   renderBigRect(pos2);
// }

// setInterval(() => {
//   draw();
//   // if (direction2 == "right") {
//   //   if (pos2 <= rectWidth + 2) {
//   //     direction2 = "left";
//   //   }
//   //   pos2 = pos2 - 2;
//   // }
//   // if (direction2 == "left") {
//   //   pos2 = pos2 + 2;
//   // }
//   // if (pos2 > rectWidth + 2) {
//   // } else {
//   //   direction2 = "left";
//   //   pos2 = pos2 + 2;
//   //   pos1 = pos1 - 1;
//   // }
//   ctx.font = "14px monospace";
//   ctx.fillStyle = "#FFFFFF";
//   ctx.strokeText(`Rectangle #1 position: ${pos1}`, 10, 24);
//   ctx.strokeText(`Rectangle #1 direction: ${direction1}`, 10, 44);
//   ctx.strokeText(`Rectangle #2 position: ${pos2}`, 10, 74);
//   ctx.strokeText(`Rectangle #2 direction: ${direction2}`, 10, 94);
//   if (direction2 == "left") {
//     pos2 = pos2 - 2;
//   } else if (direction2 == "right") {
//     pos2 = pos2 + 2;
//   }
//   if (pos2 === 0) {
//     direction2 = "right";
//   } else if (pos2 === pos1 + rectWidth && rect1Move) {
//     console.log("two rea")
//     direction1 = "left";
//     direction2 = "right";
//   } else if (pos2 === pos1 + rectWidth) {
//     direction2 = "right";
//     console.log("collision");
//     rect1Move = true;
//   } else if (pos2 === width - rect1Width) {
//     direction2 = "left";
//   }
//   if (rect1Move) {
//     if (direction1 == "left") {
//       pos1 = pos1 - 2;
//     } else if (direction1 == "right") {
//       pos1 = pos1 + 2;
//     }
//     if (pos1 === 0) {
//       direction1 = "right";
//     }
//   }
//   // else if (pos2 > width) {
//   //   direction2 = "right";
//   // }
// }, 10);
