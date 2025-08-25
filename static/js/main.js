// World Fitness - Modern Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
    
    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section nav link
                const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${section.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Update active nav on scroll
    window.addEventListener('scroll', debounce(updateActiveNav, 100));
    
    // Navbar background on scroll
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(220, 38, 38, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'var(--primary-red)';
            navbar.style.backdropFilter = 'none';
        }
    }
    
    window.addEventListener('scroll', debounce(updateNavbarBackground, 100));
    
    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const image = this.querySelector('.gallery-image');
            const imageSrc = image.src;
            const imageAlt = image.alt;
            
            // Create lightbox modal
            const lightboxModal = createLightboxModal(imageSrc, imageAlt, index);
            document.body.appendChild(lightboxModal);
            
            // Show modal
            const modal = new bootstrap.Modal(lightboxModal);
            modal.show();
            
            // Remove modal from DOM when hidden
            lightboxModal.addEventListener('hidden.bs.modal', function() {
                document.body.removeChild(lightboxModal);
            });
        });
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .pricing-card, .schedule-item, .gallery-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Contact form phone number formatting (Georgian format)
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format as Georgian phone number: +995 XXX XX XX XX
            if (value.startsWith('995')) {
                value = value.substring(3);
            }
            
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `+995 ${value}`;
                } else if (value.length <= 5) {
                    value = `+995 ${value.substring(0, 3)} ${value.substring(3)}`;
                } else if (value.length <= 7) {
                    value = `+995 ${value.substring(0, 3)} ${value.substring(3, 5)} ${value.substring(5)}`;
                } else {
                    value = `+995 ${value.substring(0, 3)} ${value.substring(3, 5)} ${value.substring(5, 7)} ${value.substring(7, 9)}`;
                }
            }
            
            e.target.value = value;
        });
    });
    
    // Current time and pricing display update
    function updatePricingDisplay() {
        const now = new Date();
        const dayOfMonth = now.getDate();
        const pricingElements = document.querySelectorAll('.current-price-display');
        
        pricingElements.forEach(element => {
            const priceElement = element.querySelector('.display-6, .display-4');
            const periodElement = element.querySelector('.small, p');
            
            if (dayOfMonth <= 8) {
                if (priceElement) priceElement.textContent = '70₾';
                if (periodElement) periodElement.textContent = 'თვის 1-8 რიცხვამდე';
            } else {
                if (priceElement) priceElement.textContent = '110₾';
                if (periodElement) periodElement.textContent = 'ამჟამინდელი ფასი';
            }
        });
    }
    
    // Update pricing on page load
    updatePricingDisplay();
    
    // Performance optimization: Lazy load gallery images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('.gallery-image[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add scroll-to-top functionality
    const scrollToTopBtn = createScrollToTopButton();
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
});

// Utility Functions

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

function createLightboxModal(imageSrc, imageAlt, index) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = `lightboxModal${index}`;
    modal.tabIndex = -1;
    
    modal.innerHTML = `
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content bg-dark">
                <div class="modal-header border-0">
                    <h5 class="modal-title text-white">World Fitness Gallery</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center p-0">
                    <img src="${imageSrc}" alt="${imageAlt}" class="img-fluid rounded">
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i data-feather="arrow-up"></i>';
    button.className = 'scroll-to-top btn btn-primary rounded-circle position-fixed';
    button.style.cssText = `
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        border: none;
    `;
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initialize feather icon for the button
    button.addEventListener('DOMNodeInserted', function() {
        feather.replace();
    });
    
    return button;
}

// Add custom CSS for enhanced animations
const customStyles = `
    <style>
        .scroll-to-top {
            transition: all 0.3s ease;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
        }
        
        .navbar {
            transition: all 0.3s ease;
        }
        
        .nav-link.active {
            color: #fca5a5 !important;
            font-weight: 600;
        }
        
        .gallery-image {
            transition: transform 0.3s ease;
        }
        
        .gallery-item:hover .gallery-image {
            transform: scale(1.1);
        }
        
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', customStyles);
