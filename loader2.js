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

const progressBar = document.getElementById("progressBar");
let loadedCount = 0;
const totalResources = resources.length;

// Función para actualizar la barra basada en archivos cargados
function updateProgress() {
  loadedCount++;
  const realPercentage = Math.floor((loadedCount / totalResources) * 100);
  
  progressBar.style.width = `${realPercentage}%`;

  if (loadedCount === totalResources) {
    finishLoading();
  }
}

// Función finalizadora
function finishLoading() {
  setTimeout(() => {
    const iframe = document.getElementById("mIframe");
    const preloader = document.getElementById("preloader-container");

    // 1. Preparamos el iframe invisible pero ocupando espacio
    iframe.style.opacity = "0";
    iframe.style.display = "block";
    iframe.style.transition = "opacity 0.8s ease-in-out";

    // 2. Ocultamos el preloader con suavidad
    if (preloader) preloader.style.transition = "opacity 0.5s";
    if (preloader) preloader.style.opacity = "0";

    setTimeout(() => {
      if (preloader) preloader.style.display = "none";
      // 3. Mostramos el iframe suavemente
      iframe.style.opacity = "1";

      // Intentar Fullscreen
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen().catch(() => {});
      }
    }, 1000);
    
  }, 1000); 
}
// CARGA REAL: Recorremos el array y descargamos cada cosa
resources.forEach(url => {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Error al cargar');
      updateProgress();
    })
    .catch(error => {
      console.error("No se pudo cargar:", url);
      // Contamos el error como "terminado" para que la barra no se trabe
      updateProgress(); 
    });
});