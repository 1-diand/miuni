const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Redimensionar canvas
window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Generar estrellas
let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5 + 0.1,
  });
}

// Simular carga
let loadProgress = 0;
const loadingText = document.getElementById("percentage");

function updateLoading() {
  if (loadProgress < 100) {
    loadProgress += Math.random() * 3;
    loadingText.textContent = `${Math.floor(loadProgress)}%`;
  } else {
    // Aquí puedes redirigir al contenido principal
    loadingText.style.opacity = 0;
    setTimeout(() => {
      document.body.innerHTML = '<h1 style="color:white;text-align:center;margin-top:20%;">¡Bienvenido a tu mundo espacial!</h1>';
    }, 600);
  }
}

// Dibujar estrellas
function drawStars() {
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    star.y += star.speed;
    if (star.y > height) {
      star.y = 0;
      star.x = Math.random() * width;
    }
  }
}

// Dibujar una nave o planeta girando
let angle = 0;
function drawSpinner(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, -20);
  ctx.lineTo(10, 10);
  ctx.lineTo(-10, 10);
  ctx.closePath();
  ctx.fillStyle = "#00f7ff";
  ctx.fill();
  ctx.restore();
  angle += 0.05;
}

// Loop principal del preloader
function animate() {
  ctx.clearRect(0, 0, width, height);
  drawStars();
  drawSpinner(width / 2, height / 2);
  updateLoading();
  requestAnimationFrame(animate);
}

animate();