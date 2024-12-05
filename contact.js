// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Form Handling
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const modalClose = document.querySelector('.modal-close');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Form Submission Handler
    async function handleFormSubmit(e) {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.submit-btn');
        
        if (validateForm()) {
            // Show loading state
            submitBtn.classList.add('loading');

            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success modal
                showModal(successModal);
                
                // Reset form
                contactForm.reset();
                
                // Remove loading state
                submitBtn.classList.remove('loading');
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error submitting the form. Please try again.');
                submitBtn.classList.remove('loading');
            }
        }
    }

    // Form Validation
    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        // Remove all existing error messages
        contactForm.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });

        // Check each required field
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                const formGroup = field.closest('.form-group');
                formGroup.classList.add('error');
                
                // Add error message if it doesn't exist
                if (!formGroup.querySelector('.error-message')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'This field is required';
                    formGroup.appendChild(errorMessage);
                }
            }
        });

        // Email validation
        const emailField = contactForm.querySelector('#email');
        if (emailField && emailField.value.trim() && !isValidEmail(emailField.value)) {
            isValid = false;
            const formGroup = emailField.closest('.form-group');
            formGroup.classList.add('error');
            if (!formGroup.querySelector('.error-message')) {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Please enter a valid email address';
                formGroup.appendChild(errorMessage);
            }
        }

        return isValid;
    }

    // Email Validation Helper
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Modal Handling
    function showModal(modal) {
        modal.classList.add('active');
    }

    function hideModal(modal) {
        modal.classList.remove('active');
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            hideModal(successModal);
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Smooth Scroll for Anchor Links
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

    // Animation on Scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '50px'
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.contact-card, .faq-item, .contact-form, .contact-info-container').forEach(element => {
        animateOnScroll.observe(element);
    });

    // Add animation styles if not present
    if (!document.querySelector('#animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
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
                animation: fadeIn 0.6s ease forwards;
            }
        `;
        document.head.appendChild(style);
    }

    // Handle form input animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.closest('.form-group').classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.closest('.form-group').classList.remove('focused');
            }
        });
    });
});