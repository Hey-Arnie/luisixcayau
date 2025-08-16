// Navegación suave entre secciones
const navLinks = document.querySelectorAll('.site-nav a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Observador para animar secciones al entrar en pantalla
const scenes = document.querySelectorAll('.scene');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

scenes.forEach(scene => observer.observe(scene));

// Texto del poema con efecto de máquina de escribir
const poemText = 'En el silencio florecen palabras.';
const poemEl = document.getElementById('poem');
let charIndex = 0;

function typePoem() {
  if (charIndex < poemText.length) {
    poemEl.textContent += poemText.charAt(charIndex);
    charIndex++;
    setTimeout(typePoem, 100);
  }
}

// Inicia la escritura cuando la sección de poesía aparece
const poemObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      typePoem();
      poemObserver.disconnect(); // ejecutar una sola vez
    }
  });
}, { threshold: 0.5 });

poemObserver.observe(poemEl);
