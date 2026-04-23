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

    let currentState = 'home'; 

    function updateState(newState) {
        currentState = newState;
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

    function toggleVisibility(target) {
        if (target === 'home') {
            Object.values(expandeds).forEach(el => {
                el.classList.add('pointer-events-none', 'opacity-0');
                el.classList.remove('opacity-100');
            });
            
            setTimeout(() => {
                Object.values(homes).forEach(el => {
                    el.classList.replace('opacity-0', 'opacity-100');
                    el.classList.replace('scale-95', 'scale-100');
                });
            }, 500); 
            
            panels.pro.classList.add('cursor-pointer');
            panels.art.classList.add('cursor-pointer');
        } else {
            Object.values(homes).forEach(el => {
                el.classList.replace('opacity-100', 'opacity-0');
                el.classList.replace('scale-100', 'scale-95');
            });
            
            panels.pro.classList.remove('cursor-pointer');
            panels.art.classList.remove('cursor-pointer');

            setTimeout(() => {
                expandeds[target].classList.remove('pointer-events-none', 'opacity-0');
                expandeds[target].classList.add('opacity-100');
            }, 400);
        }
    }

    // HOVER EVENTS
    panels.pro.addEventListener('mouseenter', () => { 
        if (currentState === 'home') body.classList.add('pro-hover'); 
        body.classList.add('cursor-pro'); 
        body.classList.remove('cursor-art'); 
    });
    panels.pro.addEventListener('mouseleave', () => { body.classList.remove('pro-hover'); });
    
    panels.art.addEventListener('mouseenter', () => { 
        if (currentState === 'home') body.classList.add('art-hover'); 
        body.classList.add('cursor-art'); 
        body.classList.remove('cursor-pro'); 
    });
    panels.art.addEventListener('mouseleave', () => { body.classList.remove('art-hover'); });

    // CLICK EVENTS
    panels.pro.addEventListener('click', () => { if (currentState === 'home') updateState('pro'); });
    panels.art.addEventListener('click', () => { if (currentState === 'home') updateState('art'); });

    btnBacks.pro.addEventListener('click', (e) => { e.stopPropagation(); updateState('home'); });
    btnBacks.art.addEventListener('click', (e) => { e.stopPropagation(); updateState('home'); });

    // ESCAPE KEY TO CLOSE
    document.addEventListener('keydown', (e) => { 
        if(e.key === 'Escape' && currentState !== 'home') updateState('home'); 
    });

    // CUSTOM CURSOR LOGIC
    const customCursor = document.getElementById('custom-cursor');
    if(customCursor) {
        document.addEventListener('mousemove', (e) => {
            customCursor.style.left = e.clientX + 'px';
            customCursor.style.top = e.clientY + 'px';
        });

        const interactiveEls = document.querySelectorAll('a, button, .group, iframe');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => body.classList.remove('cursor-hover'));
        });
    }
});
