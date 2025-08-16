// Slider horizontal
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;
  currentSlide = index;
  slider.style.transform = `translateX(-${index * 100}vw)`;
  slides.forEach((s, i) => s.classList.toggle('active', i === index));
}

// Navegación superior
const navLinks = document.querySelectorAll('.site-nav a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const idx = parseInt(link.dataset.slide, 10);
    updateSlide(idx);
  });
});

// Gestos táctiles para cambiar de slide
let startX = 0;
slider.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].clientX - startX;
  if (diff < -50) updateSlide(currentSlide + 1);
  if (diff > 50) updateSlide(currentSlide - 1);
});

// Navegación con teclas de flecha
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') updateSlide(currentSlide + 1);
  if (e.key === 'ArrowLeft') updateSlide(currentSlide - 1);
});

// Desplazamiento con scroll del mouse
let wheelLock = false;
document.addEventListener('wheel', e => {
  if (wheelLock) return;
  if (e.deltaY > 0) updateSlide(currentSlide + 1);
  if (e.deltaY < 0) updateSlide(currentSlide - 1);
  wheelLock = true;
  setTimeout(() => (wheelLock = false), 800);
});

// Partículas personalizadas por sección
function initParticles(canvas, { color, type, char }) {
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 30 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      if (type === 'circle') {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      } else if (type === 'square') {
        ctx.fillRect(p.x, p.y, p.r * 2, p.r * 2);
      } else if (type === 'text') {
        ctx.font = `${p.r * 4}px Poppins`;
        ctx.fillText(char, p.x, p.y);
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
}

const particleConfigs = [
  { color: 'rgba(255,255,255,0.8)', type: 'circle' },
  { color: 'rgba(255,255,255,0.8)', type: 'text', char: '♪' },
  { color: 'rgba(173,216,230,0.8)', type: 'text', char: '✦' },
  { color: 'rgba(255,255,255,0.8)', type: 'square' }
];

document.querySelectorAll('.particle-canvas').forEach((canvas, idx) => {
  initParticles(canvas, particleConfigs[idx]);
});

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

// Inicia la escritura cuando se llega al slide de poesía
function checkPoem() {
  if (currentSlide === 2 && charIndex === 0) {
    typePoem();
  }
}

// Actualizar al cambiar de slide
function updateSlide(index) {
  goToSlide(index);
  checkPoem();
  triggerScrollAnim();
}

// Inicia en el primer slide
updateSlide(0);

// Animación de flash al cambiar de sección
function triggerScrollAnim() {
  const flash = document.querySelector('.scroll-anim');
  flash.classList.add('active');
  setTimeout(() => flash.classList.remove('active'), 500);
}

