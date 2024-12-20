document.addEventListener('DOMContentLoaded', () => {
    // Navigation Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-nav')) {
            navMenu?.classList.remove('active');
        }
    });

    // Dropdown menu handling for mobile
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    if (window.innerWidth <= 768) {
        dropdownTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const dropdownMenu = trigger.nextElementSibling;
                dropdownMenu?.classList.toggle('active');
            });
        });
    }

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton?.classList.add('visible');
        } else {
            backToTopButton?.classList.remove('visible');
        }
    });

    backToTopButton?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
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

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Quality cards hover effect
    document.querySelectorAll('.quality-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.background = 'var(--primary-color)';
            this.style.color = 'var(--white)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.background = 'var(--light-bg)';
            this.style.color = 'var(--text-color)';
        });
    });

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

        @media (prefers-reduced-motion: reduce) {
            .animate-in {
                animation: none;
                opacity: 1;
                transform: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Handle resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reset animations on resize
            document.querySelectorAll('.animate-in').forEach(el => {
                el.classList.remove('animate-in');
                void el.offsetWidth; // Trigger reflow
                el.classList.add('animate-in');
            });

            // Update mobile menu state
            if (window.innerWidth > 768) {
                navMenu?.classList.remove('active');
            }
        }, 250);
    });

    // Add loading state handler
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Error handling for animations
    window.addEventListener('error', (e) => {
        console.error('Animation error:', e.error);
        // Disable animations if there's an error
        document.body.classList.add('no-animations');
    });
});