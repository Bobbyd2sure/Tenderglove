// Domiciliary Care Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
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

    // Initialize Testimonials Slider
    let currentTestimonial = 0;
    const testimonialsContainer = document.querySelector('.testimonials-container');

    function initTestimonials() {
        testimonials.forEach(testimonial => {
            const testimonialCard = createTestimonialCard(testimonial);
            testimonialsContainer.appendChild(testimonialCard);
        });
        updateTestimonialPosition();
    }

    function createTestimonialCard(testimonial) {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="testimonial-content">${testimonial.content}</div>
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
        const offset = currentTestimonial * -100;
        testimonialsContainer.style.transform = `translateX(${offset}%)`;
    }

    // Testimonial Navigation
    const prevButton = document.getElementById('prevTestimonial');
    const nextButton = document.getElementById('nextTestimonial');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            if (currentTestimonial > 0) {
                currentTestimonial--;
                updateTestimonialPosition();
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentTestimonial < testimonials.length - 1) {
                currentTestimonial++;
                updateTestimonialPosition();
            }
        });
    }

    // Initialize testimonials
    initTestimonials();

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

    // Form Handling
    const enquiryForm = document.getElementById('enquiryForm');
    const successModal = document.getElementById('successModal');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = enquiryForm.querySelector('.submit-btn');

            try {
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Show success modal
                if (successModal) {
                    successModal.classList.add('active');
                }

                // Reset form
                enquiryForm.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error submitting your enquiry. Please try again.');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Send Enquiry</span><i class="fas fa-paper-plane"></i>';
            }
        });
    }

    // Modal Handling
    const modalClose = document.querySelector('.modal-close');
    if (modalClose && successModal) {
        modalClose.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Touch Events for Testimonials
    let touchStartX = 0;
    let touchEndX = 0;

    testimonialsContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    testimonialsContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
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
    }
});