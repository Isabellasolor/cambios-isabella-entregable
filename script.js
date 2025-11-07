// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Exchange Rates Calculation
// Simulando tasas promedio de casas de cambio de Cúcuta
// En producción, esto debería consultar una API real
async function fetchExchangeRates() {
    try {
        // Valores base simulados (en producción, estos vendrían de una API)
        // Para USD: promedio típico en Cúcuta alrededor de 4000-4200 COP
        const baseRates = {
            usd: {
                compra: 4000,  // Promedio de compra
                venta: 4100    // Promedio de venta
            },
            eur: {
                compra: 4300,  // Aproximadamente 1.075 veces USD
                venta: 4400
            },
            ves: {
                compra: 0.12,  // Tasa aproximada VES/COP
                venta: 0.15
            }
        };

        // Aplicar ajuste: +40 en venta, -40 en compra
        const adjustedRates = {
            cop: {
                compra: 1 - (40 / 1000000), // Ajuste mínimo para COP
                venta: 1 + (40 / 1000000)
            },
            usd: {
                compra: baseRates.usd.compra - 40,
                venta: baseRates.usd.venta + 40
            },
            eur: {
                compra: baseRates.eur.compra - 40,
                venta: baseRates.eur.venta + 40
            },
            ves: {
                compra: baseRates.ves.compra - (40 / 1000000),
                venta: baseRates.ves.venta + (40 / 1000000)
            }
        };

        // Actualizar la UI
        updateRatesDisplay(adjustedRates);

        // Intentar obtener tasas reales si hay una API disponible
        // fetch('https://api.example.com/exchange-rates')
        //     .then(response => response.json())
        //     .then(data => {
        //         // Procesar datos reales
        //     })
        //     .catch(error => {
        //         console.log('Usando tasas simuladas:', error);
        //     });

    } catch (error) {
        console.error('Error al obtener tasas de cambio:', error);
        // Usar valores por defecto en caso de error
        setDefaultRates();
    }
}

function updateRatesDisplay(rates) {
    // Formatear números con separadores de miles
    const formatNumber = (num) => {
        if (num >= 1) {
            return new Intl.NumberFormat('es-CO', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(num);
        } else {
            return num.toFixed(4);
        }
    };

    // COP
    document.getElementById('cop-compra').textContent = `$${formatNumber(rates.cop.compra)}`;
    document.getElementById('cop-venta').textContent = `$${formatNumber(rates.cop.venta)}`;

    // USD
    document.getElementById('usd-compra').textContent = `$${formatNumber(rates.usd.compra)}`;
    document.getElementById('usd-venta').textContent = `$${formatNumber(rates.usd.venta)}`;

    // EUR
    document.getElementById('eur-compra').textContent = `€${formatNumber(rates.eur.compra)}`;
    document.getElementById('eur-venta').textContent = `€${formatNumber(rates.eur.venta)}`;

    // VES
    document.getElementById('ves-compra').textContent = `Bs. ${formatNumber(rates.ves.compra)}`;
    document.getElementById('ves-venta').textContent = `Bs. ${formatNumber(rates.ves.venta)}`;
}

function setDefaultRates() {
    const defaultRates = {
        cop: { compra: 1, venta: 1 },
        usd: { compra: 3960, venta: 4140 },
        eur: { compra: 4260, venta: 4440 },
        ves: { compra: 0.12, venta: 0.15 }
    };
    updateRatesDisplay(defaultRates);
}

// Modal para Galería
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImg.src = imageSrc;
}

// Cerrar modal
const modal = document.getElementById('imageModal');
const closeModal = document.querySelector('.close-modal');

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar modal al hacer clic fuera de la imagen
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});

// Actualizar tasas cada 5 minutos
fetchExchangeRates();
setInterval(fetchExchangeRates, 300000); // 5 minutos

// Animación de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animación
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.rate-card, .regulation-item, .news-card, .gallery-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Efecto parallax suave en scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const bannerTop = document.querySelector('.banner-top');
    const bannerBottom = document.querySelector('.banner-bottom');
    
    if (bannerTop) {
        bannerTop.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    if (bannerBottom) {
        bannerBottom.style.transform = `translateY(${-scrolled * 0.1}px)`;
    }
});

// Formspree Form Handler
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        formStatus.className = 'form-status';
        formStatus.style.display = 'none';
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.className = 'form-status success';
                formStatus.textContent = '¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.';
                formStatus.style.display = 'block';
                contactForm.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    formStatus.className = 'form-status error';
                    formStatus.textContent = 'Error: ' + Object.values(data.errors).map(error => error.join(', ')).join(', ');
                } else {
                    formStatus.className = 'form-status error';
                    formStatus.textContent = 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.';
                }
                formStatus.style.display = 'block';
            }
        } catch (error) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Hubo un error de conexión. Por favor, verifica tu conexión e intenta nuevamente.';
            formStatus.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

