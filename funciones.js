
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

  { selector: ".capam1", speed: 0.08 },
  { selector: ".capam2", speed: 0.23 },
  { selector: ".capam3", speed: 0.28 },
  { selector: ".capam4", speed: 0.40 },
  
  { selector: ".capaA1", speed: 0.08 },
  { selector: ".capaA2", speed: 0.23 },
  { selector: ".capaA3", speed: 0.28 },
  { selector: ".capaA4", speed: 0.40 },
];

const parallaxTargets = parallaxLayers.map(layer => ({
  el: document.querySelector(layer.selector),
  speed: layer.speed,
}));

const capaCta = document.querySelector(".capa-cta");
const capaCtaWebsodios = document.querySelector(".capa-cta-websodios");
const capaCtaMapa = document.querySelector(".capa-cta-mapa");
const capaCtaArchivo = document.querySelector(".capa-cta-archivo");

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
  if (capaCtaMapa) {
    capaCtaMapa.style.transform = `translate3d(0, -${latestScroll * 0.16}px, 0)`;
  }
  if (capaCtaArchivo) {
    capaCtaArchivo.style.transform = `translate3d(0, -${latestScroll * 0.16}px, 0)`;
  }
  ticking = false;
}

const botonesMapa = document.querySelectorAll('.icono-boton');
const tarjetasMapa = document.querySelectorAll('.card');
const puntosMapa = document.querySelector('.puntos-mapa');

function cerrarTodasLasTarjetas() {
  tarjetasMapa.forEach(tarjeta => {
    tarjeta.classList.remove('card--visible');
    tarjeta.classList.add('card--hidden');
  });
  if (puntosMapa) puntosMapa.classList.remove('mapa--card-open');
}

function mostrarTarjeta(tarjeta) {
  cerrarTodasLasTarjetas();
  if (!tarjeta) return;
  tarjeta.classList.remove('card--hidden');
  tarjeta.classList.add('card--visible');
  if (puntosMapa) puntosMapa.classList.add('mapa--card-open');
}

botonesMapa.forEach(boton => {
  boton.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    const punto = boton.closest('.punto');
    const tarjeta = punto ? punto.querySelector('.card') : null;
    if (!tarjeta) return;

    if (tarjeta.classList.contains('card--hidden')) {
      mostrarTarjeta(tarjeta);
    } else {
      cerrarTodasLasTarjetas();
    }
  });
});

document.addEventListener('click', function(e) {
  if (!e.target.closest('.card') && !e.target.closest('.icono-boton')) {
    cerrarTodasLasTarjetas();
  }
});