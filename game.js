const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = { x: 180, y: 550, width: 40, height: 40, color: "cyan", speed: 5 };
let blocks = [];
let gameOver = false;
let score = 0;

function spawnBlock() {
  const size = 40;
  const x = Math.floor(Math.random() * (canvas.width - size));
  blocks.push({ x, y: -size, width: size, height: size, speed: 3 });
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBlocks() {
  ctx.fillStyle = "red";
  blocks.forEach(b => ctx.fillRect(b.x, b.y, b.width, b.height));
}

function moveBlocks() {
  blocks.forEach(b => b.y += b.speed);
}

function detectCollision(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.height + rect1.y > rect2.y;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px sans-serif";
  ctx.fillText("Score: " + score, 10, 30);
}

function gameLoop() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBlocks();
  drawScore();
  moveBlocks();

  blocks.forEach(b => {
    if (detectCollision(player, b)) {
      gameOver = true;
      alert("Game Over! Score: " + score);
      location.reload();
    }
  });

  blocks = blocks.filter(b => b.y < canvas.height);
  score++;

  requestAnimationFrame(gameLoop);
}

setInterval(spawnBlock, 800);
requestAnimationFrame(gameLoop);

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") player.x -= player.speed;
  if (e.key === "ArrowRight") player.x += player.speed;
});
