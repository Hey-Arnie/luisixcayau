// Inicializa animación Lottie para el logo
const pulseData = {
  v: '5.7.4',
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: 'pulse',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'circle',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [0, 0, 100] },
            { t: 30, s: [100, 100, 100] },
            { t: 60, s: [0, 0, 100] }
          ]
        }
      },
      ao: 0,
      shapes: [
        { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [80, 80] }, nm: 'Ellipse' },
        { ty: 'fl', c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 }, r: 1, nm: 'Fill' }
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0
    }
  ]
};

lottie.loadAnimation({
  container: document.getElementById('logo'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: pulseData
});

// Configuración de Locomotive Scroll
const scroller = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true
});

// Integración con GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.scrollerProxy('[data-scroll-container]', {
  scrollTop(value) {
    return arguments.length
      ? scroller.scrollTo(value, 0, 0)
      : scroller.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
});

scroller.on('scroll', ScrollTrigger.update);
ScrollTrigger.addEventListener('refresh', () => scroller.update());
ScrollTrigger.refresh();

// Animación de entrada para cada escena
 gsap.utils.toArray('.scene').forEach((scene) => {
  gsap.from(scene, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: scene,
      scroller: '[data-scroll-container]',
      start: 'top 80%'
    }
  });
});

// Texto con efecto máquina de escribir
const poem = 'En el silencio florecen palabras.';
const poemEl = document.getElementById('poem');
let poemStarted = false;

function startPoem() {
  if (poemStarted) return;
  poemStarted = true;
  let i = 0;
  const interval = setInterval(() => {
    poemEl.textContent += poem.charAt(i);
    i++;
    if (i >= poem.length) clearInterval(interval);
  }, 100);
}

ScrollTrigger.create({
  trigger: '#poesia',
  scroller: '[data-scroll-container]',
  start: 'top 80%',
  onEnter: startPoem
});

// Navegación suave con Locomotive Scroll
const links = document.querySelectorAll('nav a[data-scroll-to]');
links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href');
    scroller.scrollTo(target);
  });
});
