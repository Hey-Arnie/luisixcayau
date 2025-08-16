// Desplazamiento suave para los enlaces de navegación
document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// Animación de aparición con Intersection Observer
const scenes = document.querySelectorAll('.scene');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.id === 'poesia') {
        startPoem();
      }
    }
  });
}, { threshold: 0.3 });

scenes.forEach((scene) => observer.observe(scene));

// Animación de máquina de escribir para el poema
const poem = 'En el silencio florecen palabras.';
const poemEl = document.getElementById('poem');
let poemIndex = 0;
let poemStarted = false;

function startPoem() {
  if (poemStarted) return;
  poemStarted = true;
  poemEl.classList.add('typing');
  typePoem();
}

function typePoem() {
  if (poemIndex < poem.length) {
    poemEl.textContent += poem.charAt(poemIndex++);
    setTimeout(typePoem, 100);
  } else {
    poemEl.classList.remove('typing');
  }
}
