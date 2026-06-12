document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initScrollSpy();
  initBeforeAfterSlider();
});

/**
 * Control del menú de navegación móvil (hamburguesa)
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navMenu) return;

  // Alternar menú al hacer clic en el botón
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Cerrar menú al hacer clic en cualquier enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Cerrar menú si se hace clic fuera del menú
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

/**
 * Efecto de fondo translúcido del Header al hacer scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('.main-header');
  
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Ejecución inicial y en el evento scroll
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Scroll Spy: Activa la pestaña correspondiente en la navegación al hacer scroll
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  if (!sections.length || !navLinks.length) return;

  const handleScrollSpy = () => {
    const scrollPosition = window.scrollY + 120; // Compensación del Header

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScrollSpy, { passive: true });
}

/**
 * Característica de Firma: Deslizador Antes / Después (Shine Slider)
 */
function initBeforeAfterSlider() {
  const container = document.getElementById('shineSliderContainer');
  const handle = document.getElementById('sliderHandle');
  
  if (!container || !handle) return;

  let isDragging = false;

  // Función para mover el deslizador según la coordenada X
  const moveSlider = (clientX) => {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    
    // Convertir a porcentaje y limitar de 0% a 100%
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    // Actualizar variable CSS en el contenedor
    container.style.setProperty('--position', `${percentage}%`);
  };

  // Eventos de Ratón (Mouse)
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    moveSlider(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    moveSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Eventos de Pantalla Táctil (Touch)
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches[0]) {
      moveSlider(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      moveSlider(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
  
  window.addEventListener('touchcancel', () => {
    isDragging = false;
  });
}


