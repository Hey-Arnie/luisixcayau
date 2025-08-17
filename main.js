document.addEventListener('DOMContentLoaded', () => {
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

  function updateSlide(index) {
    goToSlide(index);
    checkPoem();
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

  // Partículas personalizadas por sección
  function initParticles(canvas, config) {
    const ctx = canvas.getContext('2d');
    const particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.max(30, Math.floor((canvas.width * canvas.height) / 15000));
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: config.type === 'network' ? Math.random() * 2 + 1 : Math.random() * 8 + 4,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          symbol: config.symbols ? config.symbols[Math.floor(Math.random() * config.symbols.length)] : null
        });
      }
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        if (config.type === 'network') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = config.color || 'rgba(0,0,0,0.3)';
          ctx.fill();
        } else {
          ctx.save();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = `${p.size}px sans-serif`;
          if (config.color) ctx.fillStyle = config.color;
          ctx.fillText(p.symbol, p.x, p.y);
          ctx.restore();
        }
      });

      if (config.type === 'network') {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            const maxDist = config.linkDistance || 100;
            if (dist < maxDist) {
              ctx.strokeStyle = config.linkColor || config.color || 'rgba(0,0,0,0.1)';
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      requestAnimationFrame(draw);
    }

    draw();
  }

  document.querySelectorAll('.particle-canvas').forEach((canvas, idx) => {
    const configs = [
      { symbols: ['★', '✦', '✧', '✩'], color: 'rgba(255,255,255,0.4)' },
      { symbols: ['♪', '♫', '♩', '♬'], color: 'rgba(0,0,0,0.3)' },
      { symbols: ['a', 'β', 'ж', '文', 'λ', 'م', 'ע', 'あ', 'क', 'Ω'], color: 'rgba(255,255,255,0.4)' },
      { type: 'network', color: 'rgba(0,0,0,0.3)', linkColor: 'rgba(0,0,0,0.1)', linkDistance: 120 }
    ];
    initParticles(canvas, configs[idx] || configs[0]);
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

  function checkPoem() {
    if (currentSlide === 2 && charIndex === 0) {
      typePoem();
    }
  }

  // Inicia en el primer slide
  updateSlide(0);
});
