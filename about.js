document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Stats counter animation
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        let count = 0;
        const duration = 2000; // Animation duration in milliseconds
        const step = (target / duration) * 20; // Update every 20ms

        const updateCount = () => {
            if (count < target) {
                count += step;
                el.textContent = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = target;
            }
        };

        updateCount();
    }

    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('.stat-number');
                if (counter) {
                    animateCounter(counter);
                    statsObserver.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach(stat => {
        statsObserver.observe(stat);
    });

    // Animation on scroll for features and quality cards
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animateObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .quality-card, .mission-content').forEach(element => {
        animateObserver.observe(element);
    });

    // Add hover effect listeners for feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.feature-hover')?.classList.add('show');
        });

        card.addEventListener('mouseleave', function() {
            this.querySelector('.feature-hover')?.classList.remove('show');
        });
    });

    // Add scroll-based parallax effect to hero image
    const heroImage = document.querySelector('.hero-bg');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // Add animation classes if not present in CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }

        .feature-hover.show {
            opacity: 1;
        }

        .quality-card {
            opacity: 0;
            transform: translateX(-20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .quality-card.animate-in {
            opacity: 1;
            transform: translateX(0);
        }

        @media (prefers-reduced-motion: reduce) {
            .animate-in {
                animation: none;
                opacity: 1;
                transform: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Optional: Add loading state handler
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Handle mobile menu if present
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Add resize handler for animations
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reset any position-based animations
            document.querySelectorAll('.animate-in').forEach(el => {
                el.style.transform = '';
            });
        }, 250);
    });
});