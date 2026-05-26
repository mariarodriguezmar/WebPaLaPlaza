
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
  { selector: ".capaA5", speed: 0.40 },

  { selector: ".capap1", speed: 0.08 },
  { selector: ".capap2", speed: 0.23 },
  { selector: ".capap3", speed: 0.28 },
  { selector: ".capap4", speed: 0.40 },
];

const parallaxTargets = parallaxLayers.map(layer => ({
  el: document.querySelector(layer.selector),
  speed: layer.speed,
}));

const capaCta = document.querySelector(".capa-cta");
const capaCtaWebsodios = document.querySelector(".capa-cta-websodios");
const capaCtaMapa = document.querySelector(".capa-cta-mapa");
const capaCtaArchivo = document.querySelector(".capa-cta-archivo");
const capaCarrosPostales = document.querySelector(".capa-carros-postales");
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
  if (capaCarrosPostales) {
    capaCarrosPostales.style.transform = `translate3d(0, -${latestScroll * 0.16}px, 0)`;
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

/*calculadora postales */

document.addEventListener('DOMContentLoaded', () => {

    // --- BLOQUE 1: GESTIÓN DE SELECCIONES VISUALES ---
    // Función para marcar como "seleccionado" solo un elemento por grupo
    function configurarSelectorExclusivo(idContenedor, claseObjetivo) {
        const contenedor = document.getElementById(idContenedor);
        if (!contenedor) return;

        contenedor.addEventListener('click', (e) => {
            const elementoClickeado = e.target.closest(claseObjetivo);
            if (!elementoClickeado) return;

            // Quitamos la clase 'seleccionado' a los otros elementos de este grupo
            contenedor.querySelectorAll('.seleccionado').forEach(el => el.classList.remove('seleccionado'));
            
            // Se la agregamos al elemento actual
            elementoClickeado.classList.add('seleccionado');
        });
    }

    // Activamos la interacción en tus tres bloques de menús
    configurarSelectorExclusivo('grupo-fotos', '.postal-elegible');
    configurarSelectorExclusivo('grupo-fondos', '.postal-elegible');
    
    // Como tu contenedor de frases usa una clase y no un ID, lo asignamos directamente:
    const contenedorFrases = document.querySelector('.frases-postales');
    if (contenedorFrases) {
        contenedorFrases.id = 'grupo-frases'; // Le inyectamos el ID temporalmente para compatibilidad
        configurarSelectorExclusivo('grupo-frases', '.frase-elegible');
    }


    // --- BLOQUE 2: PROCESAMIENTO Y "SUMA GRÁFICA" AL HACER CLIC ---
    const btnCrear = document.getElementById('btn-crear-postal');

    btnCrear.addEventListener('click', () => {
        // 1. Captura de datos de los elementos marcados con la clase .seleccionado
        const fotoElegida = document.querySelector('#grupo-fotos .seleccionado');   
        const fondoElegido = document.querySelector('#grupo-fondos .seleccionado'); 
        const fraseElegida = document.querySelector('#grupo-frases .seleccionado'); 

        // Validación preventiva: Si falta algún elemento detiene el script
        if (!fotoElegida || !fondoElegido || !fraseElegida) {
            alert('Por favor, selecciona una foto, un fondo y una frase para poder crear tu postal.');
            return;
        }

        // 2. Extracción de rutas e identificadores
        const rutaCara1 = fotoElegida.getAttribute('data-img');     
        const rutaFondoCara2 = fondoElegido.getAttribute('data-fondo'); 
        const idFondo = fondoElegido.getAttribute('data-id');       
        const idFrase = fraseElegida.getAttribute('data-id');       

        // 3. Matriz de combinación inteligente para los colores de las frases gráficas
        const diccionarioColores = {
            frase1: {
                fondo1: "IMG/Frase-postal-a1.webp",
                fondo2: "IMG/Frase-postal-v1.webp",
                fondo3: "IMG/Frase-postal-b1.webp",
                fondo4: "IMG/Frase-postal-v1.webp" 
            },
            frase2: {
                fondo1: "IMG/Frase-postal-a2.webp",
                fondo2: "IMG/Frase-postal-v2.webp",
                fondo3: "IMG/Frase-postal-b2.webp",
                fondo4: "IMG/Frase-postal-v2.webp"
            },
            frase3: {
                fondo1: "IMG/Frase-postal-a3.webp",
                fondo2: "IMG/Frase-postal-v3.webp",
                fondo3: "IMG/Frase-postal-b3.webp",
                fondo4: "IMG/Frase-postal-v3.webp"
            }
        };

        // Resolución de la frase con base en el fondo escogido
        const rutaFraseCorrectaCara2 = diccionarioColores[idFrase][idFondo];

        // 4. Renderizado: Inyectamos los atributos gráficos calculados en sus respectivas caras
        document.getElementById('render-foto').src = rutaCara1;              
        document.getElementById('render-fondo').src = rutaFondoCara2;         
        document.getElementById('render-frase-img').src = rutaFraseCorrectaCara2; 

        const guia = document.getElementById('postal-guia');
        const contenedorResultado = document.querySelector('.contenedor-resultado-postal');
        
        // Escondemos por completo la imagen que dice "Aquí tu postal"
        if (guia) {
            guia.style.display = 'none';
        }

        // Rompemos el display: none de la postal real armada
        contenedorResultado.style.display = 'block';

        // Disparamos la opacidad fluida de tu CSS unificado
        setTimeout(() => {
            contenedorResultado.classList.add('visible');
        }, 30);

        // Llevamos la vista del navegador al centro de la postal generada
        contenedorResultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});

