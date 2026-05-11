// 1. Configuración de elementos
const progressBar = document.getElementById("progressBar");
const loadingText = document.getElementById("percentage");
const preloaderContainer = document.getElementById("preloader-container");

// 2. Crear el Iframe (Visible pero detrás del preloader)
const iframe = document.createElement("iframe");
iframe.src = "miunipag1.html";
iframe.id = "mIframe";
iframe.style.position = "fixed";
iframe.style.top = "0";
iframe.style.left = "0";
iframe.style.width = "100vw";
iframe.style.height = "100vh";
iframe.style.border = "none";
iframe.style.zIndex = "1"; // Detrás del preloader
iframe.style.visibility = "hidden";
document.body.appendChild(iframe);

let loadProgress = 0;
let isIframeReady = false;

// El navegador nos avisa cuando el contenido interno está renderizado
iframe.onload = () => {
    isIframeReady = true;
};

// 3. Animación de la barra (Simulación controlada)
const interval = setInterval(() => {
    // Si la página aún no está lista, la barra se frena en 95%
    if (loadProgress < 95) {
        loadProgress += Math.random() * 2;
    } else if (isIframeReady) {
        // Solo si el iframe avisó que cargó, llegamos al 100
        loadProgress = 100;
    }

    // Actualizar visualmente
    const displayProgress = Math.min(Math.floor(loadProgress), 100);
    if (progressBar) progressBar.style.width = displayProgress + "%";
    if (loadingText) loadingText.textContent = displayProgress + "%";

    // FINAL: Cuando llega al 100 y el iframe está listo
    if (loadProgress >= 100) {
        clearInterval(interval);
        finishLoading();
    }
}, 100);

function finishLoading() {
    // Intercambio instantáneo
    iframe.style.visibility = "visible";
    if (preloaderContainer) preloaderContainer.style.display = "none";
    
    // Matar proceso de estrellas si existe
    const canvas = document.getElementById("space");
    if (canvas) canvas.style.display = "none";

    // Fullscreen
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen().catch(() => {});
    }
}

// --- MANTENER TUS ESTRELLAS SIEMPRE ACTIVAS ---
const canvas = document.getElementById("space");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let stars = Array.from({length: 100}, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.5, s: Math.random() * 0.5 + 0.2
    }));
    function anim() {
        if (preloaderContainer.style.display === "none") return;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "white";
        stars.forEach(s => {
            ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
            s.y += s.s; if (s.y > h) s.y = 0;
        });
        requestAnimationFrame(anim);
    }
    anim();
}