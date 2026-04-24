document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const panels = {
        pro: document.getElementById('panel-pro'),
        art: document.getElementById('panel-art')
    };
    const expandeds = {
        pro: document.getElementById('expanded-pro'),
        art: document.getElementById('expanded-art')
    };
    const btnBacks = {
        pro: document.getElementById('btn-back-pro'),
        art: document.getElementById('btn-back-art')
    };

    let currentState = 'home';

    function setPanelState(state) {
        currentState = state;
        body.classList.remove('pro-hover', 'art-hover', 'pro-expanded', 'art-expanded');
        
        if (state === 'pro-expanded') {
            body.classList.add('pro-expanded');
            expandeds.pro.style.opacity = "1";
            expandeds.pro.style.pointerEvents = "auto";
        } else if (state === 'art-expanded') {
            body.classList.add('art-expanded');
            expandeds.art.style.opacity = "1";
            expandeds.art.style.pointerEvents = "auto";
        } else {
            expandeds.pro.style.opacity = "0";
            expandeds.pro.style.pointerEvents = "none";
            expandeds.art.style.opacity = "0";
            expandeds.art.style.pointerEvents = "none";
        }
    }

    // Hover logic
    panels.pro.addEventListener('mouseenter', () => { if(currentState === 'home') body.classList.add('pro-hover'); body.classList.add('cursor-pro'); });
    panels.pro.addEventListener('mouseleave', () => { body.classList.remove('pro-hover', 'cursor-pro'); });
    
    panels.art.addEventListener('mouseenter', () => { if(currentState === 'home') body.classList.add('art-hover'); body.classList.add('cursor-art'); });
    panels.art.addEventListener('mouseleave', () => { body.classList.remove('art-hover', 'cursor-art'); });

    // Click logic
    panels.pro.addEventListener('click', () => { if(currentState === 'home') setPanelState('pro-expanded'); });
    panels.art.addEventListener('click', () => { if(currentState === 'home') setPanelState('art-expanded'); });

    // Back buttons
    btnBacks.pro.addEventListener('click', (e) => { e.stopPropagation(); setPanelState('home'); });
    btnBacks.art.addEventListener('click', (e) => { e.stopPropagation(); setPanelState('home'); });

    // Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Tecla ESC para cerrar
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setPanelState('home');
    });
});
