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
  move (direction, speed) {
    if (this.isMove) {
      if (direction === "right") {
        this.x += speed;
      } else if (direction === "left") {
        this.x -= speed;
      }
    }
  }
}

const smallRect = new Rect(200, height - 50, 50, 50, "right", false, 0);
const bigRect = new Rect(500, height - 100, 100, 100, "right", false, 0);

let x = 0;

function render(progress) {
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#FFFFFF";
  ctx.strokeRect(smallRect.x, smallRect.y, smallRect.width, smallRect.height);
  
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`smallRect position: ${smallRect.x}`, 30, 30);
  ctx.fillText(`smallRect isMove: ${smallRect.isMove}`, 30, 50);
  ctx.fillText(`smallRect speed: ${smallRect.speed}`, 30, 70);
  // ctx.fillStyle = "#FFFFFF"
  // ctx.fillRect(bigRect.x, bigRect.y, bigRect.width, bigRect.height);
}

function checkCollision(x) {
  if (x <= 0) {
    smallRect.isMove = false;
  } else if (x + smallRect.width >= 800) {
    smallRect.isMove = false;
  }
}

let tempLeft = null;
let tempRight = null;
let mouseDownPos = null;
let beginMoveTime = null;
let startMoving = null;
let endMoving = null;
let startMovingPos = null;

function loop(timestamp) {
  let progress = timestamp - lastRender;

  checkCollision(smallRect.x);

  if (smallRect.isMove && smallRect.direction === "right") {
    smallRect.move("right", smallRect.speed);
  } else if (smallRect.isMove && smallRect.direction === "left") {
    smallRect.move("left", smallRect.speed);
  }

  function handleMouseDown(event) {
    if (
      event.offsetX >= smallRect.x &&
      event.offsetX <= smallRect.x + smallRect.width &&
      event.offsetY >= smallRect.y
    ) {
      smallRect.isMove = false;
      isDragging = true;
      mouseDownPos = event.offsetX;
      tempLeft = event.offsetX - smallRect.x;
      tempRight = smallRect.width - (event.offsetX - smallRect.x);

      // фиксируем время начала движения куба
      startMoving = Date.now();
      startMovingPos = event.offsetX;
    }
  }

  function handleMouseMove(event) {
    if (isDragging) {
      {
        let stop = false;
        if (event.offsetX - tempLeft <= 0 || event.offsetX + tempRight >= 800) {
          stop = true;
        }
        if (stop === false) {
          smallRect.x = event.offsetX - tempLeft;

          if (event.offsetX > mouseDownPos) {
            smallRect.direction = "right";
          } else if (event.offsetX < mouseDownPos) {
            smallRect.direction = "left";
          }
        }
      }
    }
  }
  
  function handleMouseOut(event) {
    isDragging = false;
  }
  
  function handleMouseUp(event) {
    isDragging = false;

    // фиксируем время завершения движения куба
    endMoving = Date.now();
    endMovingPos = event.offsetX;

    let t = (endMoving - startMoving); // Время движения в миллисекундах
    let S = (endMovingPos - startMovingPos); // Пройденное кубом расстояние (насколько передвинул куб пользователь)
    let U = S / t; // количество пройденных пикселей за миллисекунду
    switch (true) {
      case (U < 0.5):
        smallRect.speed = 2;
        break;
      case (U > 0.5 && U < 0.7):
        smallRect.speed = 4;
        break;
      case (U > 0.7 && U < 1):
        smallRect.speed = 6;
        break;
      case (U > 1):
        smallRect.speed = 8;
        break;
      default:
        smallRect.speed = 2;
    }
    smallRect.isMove = true;
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

  render(timestamp);

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}

let lastRender = 0;
window.requestAnimationFrame(loop);

let isDragging = false;

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
