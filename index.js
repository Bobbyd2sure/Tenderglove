  document.addEventListener('DOMContentLoaded', () => {
        // Mobile Menu Toggle
        const nav = document.querySelector('.main-nav');
        const menuButton = document.createElement('button');
        menuButton.className = 'menu-toggle';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        nav.appendChild(menuButton);
    
        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.main-nav ul');
    
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('show');
                menuToggle.innerHTML = navMenu.classList.contains('show') ? 
                    '<i class="fas fa-times"></i>' : 
                    '<i class="fas fa-bars"></i>';
            });
        }
    
        // Mobile Dropdown Toggle
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });
    
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target)) {
                navMenu?.classList.remove('show');
                dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#services') return; // Skip services dropdown toggle
            
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking
                mainNav?.classList.remove('show');
            }
        });
    });

    // Hide dropdown when scrolling on mobile
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll) {
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
        lastScroll = currentScroll;
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky navigation with color change
const nav = document.querySelector('nav');
const sections = document.querySelectorAll('.section');

function updateNavigation() {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
        nav.style.backgroundColor = 'rgba(106, 13, 173, 0.9)';
    } else {
        nav.style.backgroundColor = 'var(--primary-color)';
    }

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const id = section.getAttribute('id');
            document.querySelector(`nav a[href="#${id}"]`).classList.add('active');
        } else {
            const id = section.getAttribute('id');
            document.querySelector(`nav a[href="#${id}"]`).classList.remove('active');
        }
    });
}

window.addEventListener('scroll', updateNavigation);

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for CTA button
    document.querySelector('.cta-button').addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Parallax effect for hero image
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const heroImg = document.querySelector('.main-hero-img');
                const scrolled = window.pageYOffset;
                if (heroImg) {
                    heroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Intersection Observer for service cards animation
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '50px'
    };

    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                serviceObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        serviceObserver.observe(card);
    });

    // Optional: Image lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // Observe all images for lazy loading
    document.querySelectorAll('.hero-img, .service-img').forEach(img => {
        imageObserver.observe(img);
    });
});

// Add this to your existing CSS
const fadeInKeyframes = `
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}`;

// Add the keyframes to the document
const style = document.createElement('style');
style.textContent = fadeInKeyframes;
document.head.appendChild(style);

// Animation effect for service cards and counter items
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .counter-item').forEach(item => {
    observer.observe(item);
});


// Why Choose Us Section JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Counter Animation
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        let count = 0;
        const duration = 2000; // Animation duration in milliseconds
        const increment = target / (duration / 16); // 60fps

        const updateCount = () => {
            if (count < target) {
                count += increment;
                el.textContent = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = target;
            }
        };

        updateCount();
    }

    // Intersection Observer for Counter Animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe all counters
    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });

    // Image Loading and Animation
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // If using data-src for lazy loading
                const img = entry.target.querySelector('img');
                if (img && img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                
                imageObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    // Observe image wrappers
    document.querySelectorAll('.image-wrapper').forEach(wrapper => {
        imageObserver.observe(wrapper);
    });

    // Optional: Add smooth reveal animation for reasons list
    const reasonsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                reasonsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '20px'
    });

    document.querySelectorAll('.reasons-list li').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        reasonsObserver.observe(item);
    });
});

// Add this to your existing CSS if not already present
const styles = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fade-in {
        animation: fadeIn 0.5s ease forwards;
    }
`;

// Add the styles to the document
if (!document.querySelector('#animation-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'animation-styles';
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Testimonial carousel
const testimonialContainer = document.querySelector('.testimonial-container');
const testimonials = document.querySelectorAll('.testimonial-card');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

let currentIndex = 0;

function showTestimonial(index) {
    const offset = -index * 100;
    testimonialContainer.style.transform = `translateX(${offset}%)`;
}

function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
}

function prevTestimonial() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
}

nextButton.addEventListener('click', nextTestimonial);
prevButton.addEventListener('click', prevTestimonial);

// Auto-advance testimonials every 7 seconds
let autoAdvance = setInterval(nextTestimonial, 7000);

// Pause auto-advance on hover
testimonialContainer.addEventListener('mouseenter', () => {
    clearInterval(autoAdvance);
});

testimonialContainer.addEventListener('mouseleave', () => {
    autoAdvance = setInterval(nextTestimonial, 7000);
});

// Touch support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

testimonialContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

testimonialContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
        nextTestimonial();
    }
    if (touchEndX - touchStartX > 50) {
        prevTestimonial();
    }
}

// Animated counters
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    let count = 0;
    const increment = target / 200;

    function updateCount() {
        if (count < target) {
            count += increment;
            el.textContent = Math.ceil(count);
            requestAnimationFrame(updateCount);
        } else {
            el.textContent = target;
        }
    }

    updateCount();
}

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');

function toggleBackToTopButton() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
}

window.addEventListener('scroll', toggleBackToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Email.js integration
(function() {
    emailjs.init("YOUR_USER_ID"); // Replace with your Email.js user ID
})();

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function() {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            e.target.reset();
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }, 3000);
        }, function(error) {
            console.error('Email sending failed:', error);
            submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }, 3000);
        });
});

// Add smooth reveal animation to sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.section').forEach(section => {
    revealObserver.observe(section);
});