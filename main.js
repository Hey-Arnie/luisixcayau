// Configuración del deslizamiento horizontal
const slider = document.getElementById('slider');
const sections = document.querySelectorAll('.scene');
const indicator = document.querySelector('.slide-indicator');
let currentIndex = 0;
let startX = 0;

function goToSection(index) {
  if (index < 0 || index >= sections.length) return;
  currentIndex = index;
  slider.style.transform = `translateX(-${100 * index}vw)`;
  updateIndicator();
}

function updateIndicator() {
  indicator.style.display = currentIndex < sections.length - 1 ? 'block' : 'none';
}

// Navegación superior
document.querySelectorAll('nav a').forEach((link, idx) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    goToSection(idx);
  });
});

// Indicador derecho para avanzar
indicator.addEventListener('click', () => {
  goToSection(currentIndex + 1);
});

// Deslizamiento con gestos o mouse
slider.addEventListener('pointerdown', (e) => {
  startX = e.clientX;
});

slider.addEventListener('pointerup', (e) => {
  const diff = e.clientX - startX;
  if (diff > 50) {
    goToSection(currentIndex - 1);
  } else if (diff < -50) {
    goToSection(currentIndex + 1);
  }
});

updateIndicator();

// Animación de aparición con Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.id === 'poesia') {
        startPoem();
      }
    }
  });
}, { threshold: 0.6 });

sections.forEach((scene) => observer.observe(scene));

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
