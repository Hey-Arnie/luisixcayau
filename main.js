
        // DOM Content Loaded garantiza que el JS no se ejecute hasta que el HTML exista.
        document.addEventListener('DOMContentLoaded', () => {
            
            // Estado global simple
            const state = { view: 'home' }; 
            
            // Nodos del DOM
            const panels = {
                pro: document.getElementById('panel-pro'),
                art: document.getElementById('panel-art')
            };
            const homes = {
                pro: document.getElementById('home-pro'),
                art: document.getElementById('home-art')
            };
            const hovers = {
                pro: document.getElementById('hover-text-pro'),
                art: document.getElementById('hover-text-art')
            };
            const expandeds = {
                pro: document.getElementById('expanded-pro'),
                art: document.getElementById('expanded-art')
            };
            const btnBacks = {
                pro: document.getElementById('btn-back-pro'),
                art: document.getElementById('btn-back-art')
            };

            // Lógica de Hover
            function resetHover() {
                if (state.view !== 'home') return;
                panels.pro.style.width = '50%';
                panels.art.style.width = '50%';
                hovers.pro.style.opacity = '0';
                hovers.art.style.opacity = '0';
            }

            panels.pro.addEventListener('mouseenter', () => {
                if (state.view !== 'home') return;
                panels.pro.style.width = '65%';
                panels.art.style.width = '35%';
                hovers.pro.style.opacity = '1';
                hovers.art.style.opacity = '0';
            });
            
            panels.pro.addEventListener('mouseleave', resetHover);

            panels.art.addEventListener('mouseenter', () => {
                if (state.view !== 'home') return;
                panels.pro.style.width = '35%';
                panels.art.style.width = '65%';
                hovers.art.style.opacity = '1';
                hovers.pro.style.opacity = '0';
            });
            
            panels.art.addEventListener('mouseleave', resetHover);

            // Lógica de Expansión
            function openPanel(side) {
                if (state.view !== 'home') return;
                state.view = side;

                // 1. Desvanecer contenido Home
                Object.values(homes).forEach(home => {
                    home.classList.replace('opacity-100', 'opacity-0');
                    home.classList.replace('scale-100', 'scale-95');
                });
                
                // 2. Bloquear interacciones hover en el fondo
                Object.values(panels).forEach(panel => {
                    panel.classList.remove('cursor-pointer', 'hover:bg-slate-900');
                });

                // 3. Modificar anchos y mostrar contenido
                if (side === 'pro') {
                    panels.pro.style.width = '100%';
                    panels.art.style.width = '0%';
                    setTimeout(() => {
                        expandeds.pro.classList.remove('pointer-events-none', 'opacity-0', 'translate-y-10');
                        expandeds.pro.classList.add('opacity-100', 'translate-y-0');
                    }, 400);
                } else {
                    panels.pro.style.width = '0%';
                    panels.art.style.width = '100%';
                    setTimeout(() => {
                        expandeds.art.classList.remove('pointer-events-none', 'opacity-0', 'translate-y-10');
                        expandeds.art.classList.add('opacity-100', 'translate-y-0');
                    }, 400);
                }
            }

            panels.pro.addEventListener('click', () => openPanel('pro'));
            panels.art.addEventListener('click', () => openPanel('art'));

            // Lógica para regresar
            function closePanels(event) {
                event.stopPropagation(); // Crucial: evita que el clic burbujee al panel contenedor
                state.view = 'home';

                // 1. Ocultar contenido expandido
                Object.values(expandeds).forEach(expanded => {
                    expanded.classList.add('pointer-events-none', 'opacity-0', 'translate-y-10');
                    expanded.classList.remove('opacity-100', 'translate-y-0');
                });

                // 2. Restaurar anchos y clases base
                panels.pro.style.width = '50%';
                panels.art.style.width = '50%';
                
                Object.values(panels).forEach(panel => {
                    panel.classList.add('cursor-pointer', 'hover:bg-slate-900');
                });

                // 3. Restaurar contenido Home
                setTimeout(() => {
                    Object.values(homes).forEach(home => {
                        home.classList.replace('opacity-0', 'opacity-100');
                        home.classList.replace('scale-95', 'scale-100');
                    });
                }, 500);
                
                resetHover();
            }

            btnBacks.pro.addEventListener('click', closePanels);
            btnBacks.art.addEventListener('click', closePanels);
        });
