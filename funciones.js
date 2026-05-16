
/* ── Menú: abrir / cerrar ── */
const header = document.getElementById('header');

function abrirMenu() {
  header.classList.add('abierto');
  document.body.style.overflow = 'hidden';
}

function cerrarMenu() {
  header.classList.remove('abierto');
  document.body.style.overflow = '';
}

/* Cerrar con tecla ESC */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') cerrarMenu();
});



/*Parallax home*/
const parallaxLayers = [
  { selector: ".capa1", speed: 0.08 },
  { selector: ".capa2", speed: 0.16 },
  { selector: ".capa3", speed: 0.28 },
  { selector: ".capa4", speed: 0.40 },

  { selector: ".capaw1", speed: 0.08 },
  { selector: ".capaw2", speed: 0.16 },
  { selector: ".capaw3", speed: 0.28 },
  { selector: ".capaw4", speed: 0.40 },
];

const parallaxTargets = parallaxLayers.map(layer => ({
  el: document.querySelector(layer.selector),
  speed: layer.speed,
}));

const capaCta = document.querySelector(".capa-cta");
const capaCtaWebsodios = document.querySelector(".capa-cta-websodios");

let latestScroll = 0;
let ticking = false;

window.addEventListener("scroll", () => {
  latestScroll = window.pageYOffset || document.documentElement.scrollTop || 0;

  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

function updateParallax() {
  parallaxTargets.forEach(target => {
    if (!target.el) return;
    target.el.style.transform = `translate3d(0, -${latestScroll * target.speed}px, 0)`;
  });

  if (capaCta) {
    capaCta.style.transform = `translate3d(0, -${latestScroll * 0.16}px, 0)`;
  }

  if (capaCtaWebsodios) {
    capaCtaWebsodios.style.transform = `translate3d(0, -${latestScroll * 0.16}px, 0)`;
  }

  ticking = false;
}

const boton = document.getElementById('boton-mapa');
    const tarjeta = document.getElementById('card-mapa');

    boton.addEventListener('click', function(e) {
      e.preventDefault(); 
      e.stopPropagation();
        // Si el botón funciona como un "toggle" (abre y cierra)
        if (tarjeta.classList.contains('card--hidden')) {
            tarjeta.classList.remove('card--hidden');
            tarjeta.classList.add('card--visible');
        } else {
            tarjeta.classList.remove('card--visible');
            tarjeta.classList.add('card--hidden');
        }
    });

  document.addEventListener('click', function(e) {
    // Si la tarjeta está visible Y el clic NO fue dentro de ella
    if (tarjeta.classList.contains('card--visible') && !e.target.closest('.card')) {
        tarjeta.classList.remove('card--visible');
        tarjeta.classList.add('card--hidden');
    }
});