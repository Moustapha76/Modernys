
AOS.init();
// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animate stats on scroll
const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateNumber = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(updateNumber);
                    } else {
                        entry.target.textContent = target + '+';
                    }
                };
                
                updateNumber();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
};

animateStats();

// Smooth scrolling for navigation links
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

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 800);
    }
});

// Intersection Observer for fade-in animations
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // document.querySelectorAll('.about-card, .project-card, .service-card').forEach(el => {
    //     el.style.opacity = '0';
    //     el.style.transform = 'translateY(30px)';
    //     el.style.transition = 'all 0.3s ease-out';
    //     observer.observe(el);
    // });
};

observeElements();

// Button interactions
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});


    // Form Validation and Submission
const form = document.getElementById('contactForm');
const submitBtn = form.querySelector('.submit-btn');
const successMessage = document.getElementById('successMessage');

// Email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Phone validation
function isValidPhone(phone) {
    return /^[\d\s\+\-\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 9;
}

// Validate single field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    if (field.hasAttribute('required') && !value) {
        isValid = false;
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
    } else if (field.type === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
    } else if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
        isValid = false;
    }

    if (!isValid) {
        field.classList.add('error');
    } else {
        field.classList.remove('error');
    }

    return isValid;
}

// Real-time validation
form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
            validateField(field);
        }
    });
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all fields
    const fields = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;

    fields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        // Scroll to first error
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.textContent = '';

    // Simulate API call
    setTimeout(() => {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Envoyer le Message';

        // Show success message
        successMessage.classList.add('show');

        // Reset form
        form.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);

        // Log form data (in production, this would be sent to a server)
        const formData = new FormData(form);
        console.log('Form submitted with data:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    }, 2000);
});

// Smooth animations on load
window.addEventListener('load', () => {
    document.querySelectorAll('.form-group').forEach((group, index) => {
        setTimeout(() => {
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            group.style.transition = 'all 0.5s ease-out';
            
            setTimeout(() => {
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, 50);
        }, index * 50);
    });
});

// Add ripple effect to button
submitBtn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);