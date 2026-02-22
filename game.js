console.log("game loaded");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  vx: 0,
  vy: 0,
  radius: 20
};

let touch = null;

canvas.addEventListener("touchstart", e => {
  touch = e.touches[0];
});

canvas.addEventListener("touchmove", e => {
  touch = e.touches[0];
});

canvas.addEventListener("touchend", () => {
  touch = null;
});

function update() {
  if (touch) {
    const dx = touch.clientX - player.x;
    const dy = touch.clientY - player.y;
    const dist = Math.hypot(dx, dy);

    if (dist > 1) {
      const force = 0.2;
      player.vx += (dx / dist) * force;
      player.vy += (dy / dist) * force;
    }
  }

  // friction
  player.vx *= 0.99;
  player.vy *= 0.99;

  player.x += player.vx;
  player.y += player.vy;

  // wrap screen
  if (player.x < 0) player.x = canvas.width;
  if (player.x > canvas.width) player.x = 0;
  if (player.y < 0) player.y = canvas.height;
  if (player.y > canvas.height) player.y = 0;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
