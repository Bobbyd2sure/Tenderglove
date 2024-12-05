// Job Application JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Add animation styles
    const style = document.createElement('style');
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

        .slide-in {
            opacity: 0;
            transform: translateX(-20px);
            transition: all 0.6s ease;
        }

        .slide-in.active {
            opacity: 1;
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);

    // Download Form Handler
    const downloadButton = document.getElementById('downloadForm');
    if (downloadButton) {
        downloadButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Placeholder for actual download functionality
            alert('Application form download will be available soon. Please contact our recruitment team for assistance.');
        });
    }

    // Smooth Scroll
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
                }
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
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const elementsToAnimate = [
        '.job-type',
        '.requirement-card',
        '.process-step',
        '.download-card',
        '.support-option'
    ].join(', ');

    document.querySelectorAll(elementsToAnimate).forEach(element => {
        animateOnScroll.observe(element);
    });

    // Process Steps Animation
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.animationDelay = `${index * 0.2}s`;
    });

    // Requirements Cards Hover Effect
    const requirementCards = document.querySelectorAll('.requirement-card');
    requirementCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Form Download Section Enhancement
    const downloadSection = document.querySelector('.form-download');
    if (downloadSection) {
        downloadSection.addEventListener('mouseenter', () => {
            downloadSection.querySelector('.download-content')?.classList.add('active');
        });
    }

    // Mobile Menu Toggle (if present)
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Form Validation (if form exists)
    const applicationForm = document.querySelector('.application-form');
    if (applicationForm) {
        applicationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            validateForm();
        });
    }

    // Helper function for form validation
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

        if (isValid) {
            alert('Form validation successful! This is a placeholder for form submission.');
        } else {
            alert('Please fill in all required fields.');
        }
    }

    // Add loading state handler
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Handle errors gracefully
    window.addEventListener('error', (e) => {
        console.error('An error occurred:', e.error);
        // Prevent breaking the entire script
        return false;
    });

    // Cleanup function
    return () => {
        // Remove observers and event listeners if needed
        animateOnScroll.disconnect();
        if (downloadButton) {
            downloadButton.removeEventListener('click', () => {});
        }
    };
});