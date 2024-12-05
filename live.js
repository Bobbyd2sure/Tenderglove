document.addEventListener('DOMContentLoaded', () => {
    const testimonials = [
        {
            content: "The live-in carer has become part of our family. Their dedication to my mother's wellbeing is outstanding.",
            author: "Sarah Wilson",
            role: "Client's Daughter",
            image: "./images/port12.jpg"
        },
        {
            content: "Having 24/7 professional care has given us complete peace of mind. The level of support is exceptional.",
            author: "David Thompson",
            role: "Client's Son",
            image: "./images/port15.jpg"
        },
        {
            content: "The personalized care and attention to detail has made a huge difference to my father's quality of life.",
            author: "Emily Davis",
            role: "Client's Daughter",
            image: "./images/port13.jpg"
        }
    ];

    let currentTestimonial = 0;
    const testimonialsContainer = document.getElementById('testimonialsContainer');

    function initTestimonials() {
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
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

                await new Promise(resolve => setTimeout(resolve, 2000));
                
                successModal?.classList.add('active');
                enquiryForm.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error submitting your enquiry. Please try again.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Send Enquiry</span><i class="fas fa-paper-plane"></i>';
            }
        });
    }

    document.querySelector('.modal-close')?.addEventListener('click', () => {
        successModal?.classList.remove('active');
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
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
            if (currentTestimonial < testimonials.length - 1) {
                currentTestimonial++;
                updateTestimonialPosition();
            }
        }
        if (touchEndX - touchStartX > swipeThreshold) {
            if (currentTestimonial > 0) {
                currentTestimonial--;
                updateTestimonialPosition();
            }
        }
    });
});