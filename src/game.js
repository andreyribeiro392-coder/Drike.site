const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let enemies = [];
let player = { x: 400, y: 300, health: 100 };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function startGame() {
  document.getElementById("menu").style.display = "none";
  canvas.style.display = "block";
  document.getElementById("hud").style.display = "block";

  spawnEnemies();
  gameLoop();
}

function spawnEnemies() {
  for (let i = 0; i < 5; i++) {
    enemies.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 40,
      health: 100
    });
  }
}

canvas.addEventListener("click", (e) => {
  let mx = e.clientX;
  let my = e.clientY;

  enemies.forEach(enemy => {
    let dx = enemy.x - mx;
    let dy = enemy.y - my;
    let dist = Math.sqrt(dx * dx + dy * dy);

    // AIM ASSIST (leve)
    if (dist < 60) {
      let isHeadshot = my < enemy.y - 10;

      let damage = isHeadshot ? 60 : 25;
      enemy.health -= damage;

      console.log(isHeadshot ? "HEADSHOT!" : "BODY SHOT");

      if (enemy.health <= 0) {
        enemies = enemies.filter(e => e !== enemy);
      }
    }
  });
});

function drawEnemies() {
  enemies.forEach(enemy => {
    // corpo
    ctx.fillStyle = "red";
    ctx.fillRect(enemy.x - 20, enemy.y - 20, 40, 40);

    // cabeça
    ctx.fillStyle = "yellow";
    ctx.fillRect(enemy.x - 10, enemy.y - 35, 20, 15);
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawEnemies();

  requestAnimationFrame(gameLoop);
}
