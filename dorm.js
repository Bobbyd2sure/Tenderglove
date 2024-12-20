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

    // Testimonials Data
    const testimonials = [
        {
            content: "The domiciliary care service has been excellent. The carers are professional, compassionate, and always on time.",
            author: "John Smith",
            role: "Client",
            image: "./images/port5.jpg"
        },
        {
            content: "Having regular carers visit has made such a difference to my mother's quality of life.",
            author: "Sarah Wilson",
            role: "Client's Daughter",
            image: "./images/port12.jpg"
        },
        {
            content: "The level of care and attention to detail is outstanding. Highly recommended.",
            author: "David Thompson",
            role: "Client's Son",
            image: "./images/port15.jpg"
        }
    ];

    let currentTestimonial = 0;
    const testimonialsContainer = document.querySelector('.testimonials-container');

    // Initialize Testimonials
    function initTestimonials() {
        if (!testimonialsContainer) return;
        
        // Clear any existing content
        testimonialsContainer.innerHTML = '';
        
        testimonials.forEach(testimonial => {
            const card = createTestimonialCard(testimonial);
            testimonialsContainer.appendChild(card);
        });
        
        updateTestimonialPosition();
    }

    function createTestimonialCard(testimonial) {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="testimonial-content">"${testimonial.content}"</div>
            <div class="testimonial-author">
                <div class="author-image">
                    <img src="${testimonial.image}" alt="${testimonial.author}">
                </div>
                <div class="author-info">
                    <h4>${testimonial.author}</h4>
                    <p>${testimonial.role}</p>
                </div>
            </div>
        `;
        return card;
    }

    function updateTestimonialPosition() {
        if (!testimonialsContainer) return;
        const offset = currentTestimonial * -100;
        testimonialsContainer.style.transform = `translateX(${offset}%)`;
    }

    // Testimonial Navigation
    document.getElementById('prevTestimonial')?.addEventListener('click', () => {
        if (currentTestimonial > 0) {
            currentTestimonial--;
            updateTestimonialPosition();
        }
    });

    document.getElementById('nextTestimonial')?.addEventListener('click', () => {
        if (currentTestimonial < testimonials.length - 1) {
            currentTestimonial++;
            updateTestimonialPosition();
        }
    });

    // Auto-advance testimonials
    let testimonialInterval = setInterval(() => {
        if (currentTestimonial < testimonials.length - 1) {
            currentTestimonial++;
        } else {
            currentTestimonial = 0;
        }
        updateTestimonialPosition();
    }, 5000);

    // Pause auto-advance on hover
    testimonialsContainer?.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    testimonialsContainer?.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            if (currentTestimonial < testimonials.length - 1) {
                currentTestimonial++;
            } else {
                currentTestimonial = 0;
            }
            updateTestimonialPosition();
        }, 5000);
    });

    // Touch Events for Testimonials
    let touchStartX = 0;
    let touchEndX = 0;

    testimonialsContainer?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    testimonialsContainer?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left
            if (currentTestimonial < testimonials.length - 1) {
                currentTestimonial++;
                updateTestimonialPosition();
            }
        }
        if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right
            if (currentTestimonial > 0) {
                currentTestimonial--;
                updateTestimonialPosition();
            }
        }
    });

    // Form Handling
    const enquiryForm = document.getElementById('enquiryForm');
    const successModal = document.getElementById('successModal');
    const modalClose = document.querySelector('.modal-close');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = enquiryForm.querySelector('.submit-btn');
            
            if (validateForm()) {
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

                try {
                    // Simulate form submission delay
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    // Show success modal
                    successModal?.classList.add('active');
                    
                    // Reset form
                    enquiryForm.reset();
                } catch (error) {
                    console.error('Error submitting form:', error);
                    alert('There was an error submitting your enquiry. Please try again.');
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>Send Enquiry</span><i class="fas fa-paper-plane"></i>';
                }
            }
        });
    }

    // Form Validation
    function validateForm() {
        const requiredFields = document.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        // Email validation
        const emailField = document.querySelector('input[type="email"]');
        if (emailField && emailField.value.trim() && !isValidEmail(emailField.value)) {
            isValid = false;
            emailField.classList.add('error');
        }

        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Modal Handling
    modalClose?.addEventListener('click', () => {
        successModal?.classList.remove('active');
    });

    // Click outside modal to close
    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal?.classList.remove('active');
        }
    });

    // Scroll Animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '50px'
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.fade-in').forEach(element => {
        animateOnScroll.observe(element);
    });

    // Initialize Testimonials
    initTestimonials();

    // Handle resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Update mobile menu state
            if (window.innerWidth > 768) {
                navMenu?.classList.remove('active');
            }
        }, 250);
    });
});