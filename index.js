document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Mobile Menu Toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu?.contains(e.target) && !menuToggle?.contains(e.target)) {
            navMenu?.classList.remove('active');
            dropdowns.forEach(d => d.classList.remove('active'));
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
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

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const counterOptions = {
        threshold: 1,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // Animation duration in milliseconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, counterOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // Testimonial Carousel
    const testimonialContainer = document.querySelector('.testimonial-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentSlide = 0;
    const totalSlides = testimonialCards.length;

    function updateCarousel() {
        if (testimonialContainer) {
            testimonialContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    }

    document.querySelector('.carousel-button.prev')?.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    document.querySelector('.carousel-button.next')?.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });

    // Auto advance carousel
    let carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 5000);

    // Pause carousel on hover
    testimonialContainer?.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });

    testimonialContainer?.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    });

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    navMenu?.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            const formData = new FormData(contactForm);
            console.log('Form submitted with data:', Object.fromEntries(formData));
            
            // Reset form
            contactForm.reset();
            
            // Show success message (you could create a better UI for this)
            alert('Thank you for your message. We will get back to you soon!');
        });
    }

    // Animation on Scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const animationOptions = {
        threshold: 0.2,
        rootMargin: '50px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animationObserver.unobserve(entry.target);
            }
        });
    }, animationOptions);

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
});