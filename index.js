document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Mobile Menu Toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('show');
            menuToggle.innerHTML = navMenu.classList.contains('show') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            document.body.style.overflow = navMenu.classList.contains('show') ? 'hidden' : '';
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu?.contains(e.target) && !menuToggle?.contains(e.target)) {
            navMenu?.classList.remove('show');
            dropdowns.forEach(d => d.classList.remove('active'));
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });

    // Handle Dropdowns
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.dropdown-trigger');
        if (link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isActive = dropdown.classList.contains('active');
                    dropdowns.forEach(d => d.classList.remove('active'));
                    dropdown.classList.toggle('active', !isActive);
                }
            });
        }
    });

    // Animations and Observers
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '50px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate, .service-card, .counter-item, .hero-feature').forEach(element => {
        fadeObserver.observe(element);
    });

    // Testimonials Carousel
    const testimonialContainer = document.querySelector('.testimonials-container');
    if (testimonialContainer) {
        let currentSlide = 0;
        const slides = testimonialContainer.children;
        
        function showSlide(n) {
            currentSlide = (n + slides.length) % slides.length;
            testimonialContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        document.querySelector('.prev')?.addEventListener('click', () => showSlide(currentSlide - 1));
        document.querySelector('.next')?.addEventListener('click', () => showSlide(currentSlide + 1));

        // Auto advance
        setInterval(() => showSlide(currentSlide + 1), 5000);
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Add styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .fade-in { animation: fadeIn 0.5s ease forwards; }
`;
document.head.appendChild(styleSheet);