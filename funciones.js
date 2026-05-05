
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

