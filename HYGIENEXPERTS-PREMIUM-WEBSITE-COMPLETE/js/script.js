// ============================================================================
// HYGIENEXPERTS PREMIUM WEBSITE JAVASCRIPT
// Advanced animations, interactions, and user experience enhancements
// ============================================================================

'use strict';

// ============================================================================
// INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollReveal();
    initScrollToTop();
    initSmoothScroll();
    initHeaderScroll();
    initCounters();
    initTestimonialSlider();
    initScrollIndicator();
});

// ============================================================================
// MOBILE MENU FUNCTIONALITY
// ============================================================================
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('mainNav');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        toggle.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close on link click
    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                toggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close on outside click
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !toggle.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================================================
// SCROLL REVEAL ANIMATIONS
// ============================================================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-slide');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

// ============================================================================
// SCROLL TO TOP BUTTON
// ============================================================================
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.premium-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================================================
// HEADER SCROLL EFFECT
// ============================================================================
function initHeaderScroll() {
    const header = document.querySelector('.premium-header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================================================
// ANIMATED COUNTERS
// ============================================================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ============================================================================
// TESTIMONIAL SLIDER
// ============================================================================
function initTestimonialSlider() {
    const slider = document.getElementById('testimonialsSlider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    
    let currentSlide = 0;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.dot');
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function goToSlide(index) {
        showSlide(index);
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Auto-advance
    setInterval(nextSlide, 8000);
    
    // Show first slide
    showSlide(0);
}

// ============================================================================
// SCROLL INDICATOR
// ============================================================================
function initScrollIndicator() {
    const indicator = document.getElementById('scrollIndicator');
    if (!indicator) return;
    
    indicator.addEventListener('click', function() {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Hide on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 200) {
            indicator.style.opacity = '0';
        } else {
            indicator.style.opacity = '0.7';
        }
    });
}

// ============================================================================
// LAZY LOADING IMAGES
// ============================================================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================================================
// FORM VALIDATION (if contact form exists)
// ============================================================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = contactForm.querySelector('[name="name"]');
        const email = contactForm.querySelector('[name="email"]');
        const phone = contactForm.querySelector('[name="phone"]');
        const message = contactForm.querySelector('[name="message"]');
        
        let isValid = true;
        
        if (name && !name.value.trim()) {
            showError(name, 'Please enter your name');
            isValid = false;
        } else if (name) {
            clearError(name);
        }
        
        if (email && !isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        } else if (email) {
            clearError(email);
        }
        
        if (phone && !phone.value.trim()) {
            showError(phone, 'Please enter your phone number');
            isValid = false;
        } else if (phone) {
            clearError(phone);
        }
        
        if (message && !message.value.trim()) {
            showError(message, 'Please enter your message');
            isValid = false;
        } else if (message) {
            clearError(message);
        }
        
        if (isValid) {
            showSuccessMessage();
            contactForm.reset();
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    let error = formGroup.querySelector('.error-message');
    
    if (!error) {
        error = document.createElement('span');
        error.className = 'error-message';
        formGroup.appendChild(error);
    }
    
    error.textContent = message;
    error.style.cssText = 'display:block;color:#FF8DA1;font-size:0.9rem;margin-top:5px;';
    input.style.borderColor = '#FF8DA1';
}

function clearError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    if (error) error.remove();
    input.style.borderColor = '';
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-notification';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
    `;
    successDiv.style.cssText = `
        position:fixed;top:100px;right:20px;background:linear-gradient(135deg,#FF8DA1,#FF9CE9);
        color:white;padding:20px 30px;border-radius:12px;box-shadow:0 10px 30px rgba(173,86,196,0.3);
        z-index:10000;animation:slideInRight 0.5s ease;max-width:400px;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => successDiv.remove(), 500);
    }, 5000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
