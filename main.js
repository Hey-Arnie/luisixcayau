// Animaciones de entrada para cada escena
const scenes = document.querySelectorAll('.scene');

// Observa las secciones y aplica una clase cuando entren en pantalla
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Inicia el efecto de máquina de escribir al llegar a la sección de poesía
      if (entry.target.id === 'poesia') {
        typePoem();
      }
    }
  });
}, { threshold: 0.3 });

scenes.forEach(scene => observer.observe(scene));

// Desplazamiento suave desde la navegación
const navLinks = document.querySelectorAll('.site-nav a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Texto del poema con efecto de máquina de escribir
const poemText = 'En el silencio florecen palabras.';
const poemEl = document.getElementById('poem');
let poemIndex = 0;
let typing = false;

function typePoem() {
  if (typing) return; // evita reiniciar la animación
  typing = true;
  (function type() {
    if (poemIndex < poemText.length) {
      poemEl.textContent += poemText.charAt(poemIndex);
      poemIndex++;
      setTimeout(type, 100);
    }
  })();
}
