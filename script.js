// ================== NEO CHAT - JAVASCRIPT INTERACTIVO ==================
// Funciones principales para mejorar la experiencia de usuario

// ====== CONFIGURACIÓN INICIAL ======
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funciones
    initAnimations();
    initScrollEffects();
    initFormValidation();
    initPlanInteractions();
    initNavbarEffects();
    initLoadingEffects();
    initTooltips();
    initCounters();
    initParallaxEffects();
    initSmoothScrolling();
    initThemeToggle();
});

// ====== ANIMACIONES Y EFECTOS VISUALES ======
function initAnimations() {
    // Animación de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.card, .funcionalidades .d-flex, .plan-card, .creator-card, h1, h2, h3');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ====== EFECTOS DE SCROLL ======
function initScrollEffects() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Efecto de navbar al hacer scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Efecto parallax para el logo circular
        const logoCircular = document.querySelector('.logo-circular');
        if (logoCircular) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            logoCircular.style.transform = `translateY(${parallax}px) rotate(${scrolled * 0.1}deg)`;
        }
        
        lastScrollTop = scrollTop;
    });
}

// ====== VALIDACIÓN DE FORMULARIOS ======
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const formObject = {};
            
            // Validar campos requeridos
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    showFieldError(field, 'Este campo es obligatorio');
                    isValid = false;
                } else {
                    clearFieldError(field);
                }
                
                // Validación específica por tipo
                if (field.type === 'email' && field.value) {
                    if (!isValidEmail(field.value)) {
                        showFieldError(field, 'Ingresa un email válido');
                        isValid = false;
                    }
                }
            });
            
            if (isValid) {
                showSuccessMessage('¡Mensaje enviado correctamente!');
                form.reset();
            }
        });
        
        // Validación en tiempo real
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

function validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(field, 'Este campo es obligatorio');
        return false;
    }
    
    if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        showFieldError(field, 'Ingresa un email válido');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('is-invalid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ====== INTERACCIONES DE PLANES ======
function initPlanInteractions() {
    const planCards = document.querySelectorAll('.plan-card');
    
    planCards.forEach(card => {
        // Efecto hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            
            // Efecto de brillo
            const shine = document.createElement('div');
            shine.className = 'shine-effect';
            this.appendChild(shine);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            
            const shine = this.querySelector('.shine-effect');
            if (shine) {
                shine.remove();
            }
        });
        
        // Click en botón de plan
        const planButton = card.querySelector('a[href="#"]');
        if (planButton) {
            planButton.addEventListener('click', function(e) {
                e.preventDefault();
                const planName = card.querySelector('h4').textContent;
                showPlanModal(planName);
            });
        }
    });
}

function showPlanModal(planName) {
    // Crear modal dinámico
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">¡Excelente elección!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                    <i class="bi bi-check-circle-fill text-success" style="font-size: 3rem;"></i>
                    <p class="mt-3">Has seleccionado el <strong>${planName}</strong></p>
                    <p>¿Te gustaría continuar con el proceso de registro?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <a href="contacto.html" class="btn btn-primary">Continuar</a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Limpiar modal después de cerrar
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
}

// ====== EFECTOS DE NAVBAR ======
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efecto de resaltado en enlaces activos
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.color = 'var(--color-header-hover)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.color = '';
        });
    });
    
    // Efecto de cambio de color en scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(179, 217, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'var(--color-header)';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// ====== EFECTOS DE CARGA ======
function initLoadingEffects() {
    // Mostrar loader al cargar la página
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-3">Cargando Neo Chat...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Ocultar loader cuando la página esté cargada
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 300);
        }, 1000);
    });
}

// ====== TOOLTIPS ======
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// ====== CONTADORES ANIMADOS ======
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// ====== EFECTOS PARALLAX ======
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ====== SCROLL SUAVE ======
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ====== TOGGLE DE TEMA ======
function initThemeToggle() {
    // Verificar si ya existe el botón de tema
    if (document.querySelector('.theme-toggle')) {
        return;
    }
    
    // Crear botón de tema
    const themeToggle = document.createElement('button');
    themeToggle.className = 'btn btn-outline-secondary theme-toggle';
    themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
    themeToggle.title = 'Cambiar tema';
    
    // Agregar al navbar
    const navbar = document.querySelector('.navbar .container');
    if (navbar) {
        // Crear un contenedor para el botón si no existe
        let buttonContainer = navbar.querySelector('.theme-toggle-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'theme-toggle-container d-flex align-items-center';
            navbar.appendChild(buttonContainer);
        }
        buttonContainer.appendChild(themeToggle);
    }
    
    // Funcionalidad del toggle
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        this.innerHTML = isDark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }
}

// ====== MENSAJES DE ÉXITO/ERROR ======
function showSuccessMessage(message) {
    showNotification(message, 'success');
}

function showErrorMessage(message) {
    showNotification(message, 'error');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi bi-${type === 'success' ? 'check-circle-fill' : 'exclamation-triangle-fill'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ====== EFECTOS DE TECLADO ======
document.addEventListener('keydown', function(e) {
    // Efecto de partículas al presionar teclas
    if (e.key === 'Enter' || e.key === ' ') {
        createParticles(e.clientX, e.clientY);
    }
});

function createParticles(x, y) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.animationDelay = Math.random() * 0.5 + 's';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// ====== UTILIDADES ======
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ====== EXPORTAR FUNCIONES GLOBALES ======
window.NeoChat = {
    showSuccessMessage,
    showErrorMessage,
    createParticles,
    debounce,
    throttle
};
