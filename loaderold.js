const resources = [
  'Space.gif',
  'miunipag1.html',
  'https://code.createjs.com/1.0.0/createjs.min.js',   
  'images/MundoCuentostitulopngcopia.png',
  'images/Mundonumerostitulo.png',
  'sounds/Proyectopredeterminado3.mp3',
  'images/PlanetaABCtitulo.png',
  'images/Mundofigurastitulo.png',
  'images/Mundocuerpohumanotitulo.png',
  'images/MundoCuentostitulo.png',
  'images/Mundocolores.png',
  'images/Mundoanimaltitulo.png',
  'images/miunipag1_atlas_1.png',
  'images/miunipag1_atlas_2.png',
  'images/miunipag1_atlas_3.png',
  'images/miunipag1_atlas_4.png',
  'images/miunipag1_atlas_5.png',
  'images/miunipag1_atlas_6.png',
  'miunipag1.js',
  'sounds/cohete.mp3'
];

let progress = 0;
const progressBar = document.getElementById("progressBar");

const interval = setInterval(() => {
  progress += 1;
  progressBar.style.width = `${progress}%`;

  if (progress >= 100) {
    clearInterval(interval);
    document.getElementById("gifLoader").style.display = "none";
    document.querySelector(".progress-container").style.opacity = 0;

    // Mostrar el iframe cuando termine el preloader
    const iframe = document.getElementById("mIframe");
    iframe.style.display = "block";

    // Activar fullscreen
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) { // Safari
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // IE/Edge
      iframe.msRequestFullscreen();
    }
  }
}, 200); // Velocidad del preloader