
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
window.addEventListener("scroll", parallaxScroll);

function parallaxScroll(){

  const scrolled = window.scrollY;

  document.querySelector(".capa1").style.transform =
  `translateY(-${scrolled * 0.08}px)`;

  document.querySelector(".capa2").style.transform =
  `translateY(-${scrolled * 0.16}px)`;

  document.querySelector(".capa3").style.transform =
  `translateY(-${scrolled * 0.28}px)`;

  document.querySelector(".capa4").style.transform =
  `translateY(-${scrolled * 0.4}px)`;

}

/*parallax cta home*/
window.addEventListener("scroll", function () {

  const scroll = window.scrollY;

  document.querySelector(".capa-cta").style.transform =
    `translateY(${scroll * -0.12}px)`;

});

/*parallax cta websodios*/
window.addEventListener("scroll", function () {

  const scroll = window.scrollY;

  document.querySelector(".capa-cta-websodios").style.transform =
    `translateY(${scroll * -0.12}px)`;

});



