document.addEventListener('DOMContentLoaded', () => {
    // 1. MOTOR DEL CURSOR MAGNÉTICO
    const cur  = document.getElementById('cur');
    const curR = document.getElementById('cur-r');
    let mx=0, my=0, rx=0, ry=0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cur.style.transform = `translate(${mx-4.5}px,${my-4.5}px)`;
    });
    
    (function loop(){
      rx += (mx-rx)*.11; ry += (my-ry)*.11;
      curR.style.transform = `translate(${rx-15}px,${ry-15}px)`;
      requestAnimationFrame(loop);
    })();

    // Hacer grande el cursor al pasar por botones o tarjetas
    document.querySelectorAll('a, button, .bc, .half, .pcard, iframe').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-big'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-big'));
    });

    // 2. EFECTO DE LUZ AZUL AL PASAR POR LIX
    const halfLix = document.getElementById('half-lix');
    if(halfLix) {
        halfLix.addEventListener('mouseenter', () => document.body.classList.add('on-lix'));
        halfLix.addEventListener('mouseleave', () => {
            if(window.activePanel !== 'lix') document.body.classList.remove('on-lix');
        });
    }

    // 3. TECLA ESCAPE PARA CERRAR
    document.addEventListener('keydown', e => {
        if(e.key === 'Escape') window.closePanel();
    });
});

// 4. FUNCIONES GLOBALES DE APERTURA/CIERRE
window.activePanel = null;

window.openPanel = function(id) {
  window.activePanel = id;
  document.getElementById('panel-'+id).classList.add('open');
  document.getElementById('split').classList.add('locked');
  if (id === 'lix') document.body.classList.add('on-lix');
};

window.closePanel = function() {
  if (!window.activePanel) return;
  document.getElementById('panel-'+window.activePanel).classList.remove('open');
  document.getElementById('split').classList.remove('locked');
  document.body.classList.remove('on-lix');
  window.activePanel = null;
};
