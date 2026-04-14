document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    
    const panels = {
        pro: document.getElementById('panel-pro'),
        art: document.getElementById('panel-art')
    };
    const homes = {
        pro: document.getElementById('home-pro'),
        art: document.getElementById('home-art')
    };
    const expandeds = {
        pro: document.getElementById('expanded-pro'),
        art: document.getElementById('expanded-art')
    };
    const btnBacks = {
        pro: document.getElementById('btn-back-pro'),
        art: document.getElementById('btn-back-art')
    };

    let currentState = 'home'; // Posibles estados: 'home', 'pro', 'art'

    // GESTOR CENTRAL DE ESTADOS
    function updateState(newState) {
        currentState = newState;
        
        // Limpiar todas las clases de estado del body
        body.classList.remove('pro-expanded', 'art-expanded', 'pro-hover', 'art-hover');
        
        if (newState === 'pro') {
            body.classList.add('pro-expanded');
            toggleVisibility('pro');
        } else if (newState === 'art') {
            body.classList.add('art-expanded');
            toggleVisibility('art');
        } else {
            toggleVisibility('home');
        }
    }

    // GESTOR DE VISIBILIDAD DE CONTENIDO
    function toggleVisibility(target) {
        if (target === 'home') {
            // Ocultar contenidos expandidos
            Object.values(expandeds).forEach(el => {
                el.classList.add('pointer-events-none', 'opacity-0', 'translate-y-10');
                el.classList.remove('opacity-100', 'translate-y-0');
            });
            
            // Mostrar portadas después de la transición
            setTimeout(() => {
                Object.values(homes).forEach(el => {
                    el.classList.replace('opacity-0', 'opacity-100');
                    el.classList.replace('scale-95', 'scale-100');
                });
            }, 500); 
            
            panels.pro.classList.add('cursor-pointer');
            panels.art.classList.add('cursor-pointer');
        } else {
            // Ocultar portadas
            Object.values(homes).forEach(el => {
                el.classList.replace('opacity-100', 'opacity-0');
                el.classList.replace('scale-100', 'scale-95');
            });
            
            panels.pro.classList.remove('cursor-pointer');
            panels.art.classList.remove('cursor-pointer');

            // Mostrar contenido del panel seleccionado
            setTimeout(() => {
                expandeds[target].classList.remove('pointer-events-none', 'opacity-0', 'translate-y-10');
                expandeds[target].classList.add('opacity-100', 'translate-y-0');
            }, 400);
        }
    }

    // EVENTOS DE HOVER (Para Desktop)
    panels.pro.addEventListener('mouseenter', () => { if (currentState === 'home') body.classList.add('pro-hover'); });
    panels.pro.addEventListener('mouseleave', () => { body.classList.remove('pro-hover'); });
    
    panels.art.addEventListener('mouseenter', () => { if (currentState === 'home') body.classList.add('art-hover'); });
    panels.art.addEventListener('mouseleave', () => { body.classList.remove('art-hover'); });

    // EVENTOS DE CLIC PARA ABRIR
    panels.pro.addEventListener('click', () => { if (currentState === 'home') updateState('pro'); });
    panels.art.addEventListener('click', () => { if (currentState === 'home') updateState('art'); });

    // EVENTOS DE CLIC PARA CERRAR
    btnBacks.pro.addEventListener('click', (e) => { e.stopPropagation(); updateState('home'); });
    btnBacks.art.addEventListener('click', (e) => { e.stopPropagation(); updateState('home'); });
});
