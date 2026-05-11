// --- 1. CONFIGURACIÓN DEL CANVAS Y ESTRELLAS ---
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5 + 0.1,
  });
}

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

// --- 2. CONFIGURACIÓN DEL IFRAME (Página real) ---
const iframe = document.createElement("iframe");
iframe.src = "miunipag1.html";
iframe.style.position = "fixed";
iframe.style.top = "0";
iframe.style.left = "0";
iframe.style.width = "100%";
iframe.style.height = "100%";
iframe.style.border = "none";
iframe.style.display = "none"; // Oculto al principio
document.body.appendChild(iframe);

// Variables de estado de carga
let loadProgress = 0;
let isPageLoaded = false; 

// El navegador nos avisa que ya cargó todo
iframe.onload = function() {
  isPageLoaded = true;
};

// --- 3. NUEVA LÓGICA DE CARGA INTELIGENTE ---
const loadingText = document.getElementById("percentage");
const progressBar = document.getElementById("progressBar"); // Por si dejaste la barra de progreso
const preloaderContainer = document.getElementById("preloader-container"); 

let transitionStarted = false;

function updateLoading() {
  if (!isPageLoaded) {
    // Si la página sigue cargando en la red, avanzamos el porcentaje hasta estancarnos en 90%
    if (loadProgress < 90) {
      loadProgress += Math.random() * 1.5; 
    }
  } else {
    // Si el iframe avisó que terminó, disparamos al 100% de golpe
    loadProgress = 100;
  }

  // Actualizamos los textos y barras visuales
  if (loadingText) loadingText.textContent = `${Math.floor(loadProgress)}%`;
  if (progressBar) progressBar.style.width = loadProgress + "%";

  // Transición cuando llega al 100%
  if (loadProgress >= 100 && isPageLoaded && !transitionStarted) {
    transitionStarted = true; // Evita que este bloque se repita varias veces
    
    setTimeout(() => {
      // Ocultamos el canvas y el contenedor del preloader
      canvas.style.display = "none";
      if(preloaderContainer) preloaderContainer.style.display = "none";
      
      // Mostramos la página de la universidad
      iframe.style.display = "block";
      
      // Intentamos activar el Fullscreen
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen().catch(err => console.log("Fullscreen ignorado por el navegador:", err));
      }
    }, 600); // Pequeña pausa visual al llegar al 100%
  }
}

// --- 4. LOOP PRINCIPAL ---
let animationId;
function animate() {
  ctx.clearRect(0, 0, width, height);
  drawStars();
  drawSpinner(width / 2, height / 2);
  updateLoading();
  
  // Condición para apagar el canvas: 
  // Solo seguimos animando si no hemos terminado la transición
  if (!transitionStarted) {
    animationId = requestAnimationFrame(animate);
  } else {
    // Opcional: Permitimos que dibuje unos cuadros más durante los 600ms de gracia
    setTimeout(() => cancelAnimationFrame(animationId), 600);
  }
}

animate();