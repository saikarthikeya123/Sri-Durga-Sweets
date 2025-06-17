// Initialize EmailJS
(function() {
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
})();

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Handle contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(event) {
    // Set current IST time
    const now = new Date();
    const istTime = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    document.getElementById('submission_time').value = istTime;
});

// Phone number formatting
const phoneInput = document.querySelector('input[name="phone"]');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '').slice(0, 10);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
        navbar.style.backgroundColor = '#fff';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.classList.remove('navbar-scrolled');
        navbar.style.backgroundColor = '';
        navbar.style.boxShadow = '';
    }
});

function validateForm() {
    const form = document.querySelector('.contact-form');
    const errorDiv = document.getElementById('form-error');
    const submitButton = document.getElementById('submit-button');
    
    // Reset error message
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';

    // Validate name
    const name = form.querySelector('input[name="name"]').value;
    if (name.length < 3) {
        errorDiv.textContent = 'Name must be at least 3 characters long';
        errorDiv.style.display = 'block';
        return false;
    }

    // Validate phone
    const phone = form.querySelector('input[name="phone"]').value;
    if (!/^[0-9]{10}$/.test(phone)) {
        errorDiv.textContent = 'Please enter a valid 10-digit phone number';
        errorDiv.style.display = 'block';
        return false;
    }

    // Validate message
    const message = form.querySelector('textarea[name="message"]').value;
    if (message.length < 10) {
        errorDiv.textContent = 'Message must be at least 10 characters long';
        errorDiv.style.display = 'block';
        return false;
    }

    // Disable submit button to prevent double submission
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="button-text">Sending...</span>';

    // Log form submission
    console.log('Form submission started');
    
    // Submit the form
    try {
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => {
            console.log('Form submission response:', response);
            if (response.ok) {
                console.log('Form submitted successfully');
                // Show success message
                const successMessage = document.getElementById('success-message');
                if (successMessage) {
                    successMessage.style.display = 'block';
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                }
                // Reset form
                form.reset();
            } else {
                console.error('Form submission failed');
                errorDiv.textContent = 'There was an error submitting the form. Please try again.';
                errorDiv.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            errorDiv.textContent = 'There was an error submitting the form. Please try again.';
            errorDiv.style.display = 'block';
        })
        .finally(() => {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = '<span class="button-text">Send Message</span>';
        });
    } catch (error) {
        console.error('Form submission error:', error);
        errorDiv.textContent = 'There was an error submitting the form. Please try again.';
        errorDiv.style.display = 'block';
        submitButton.disabled = false;
        submitButton.innerHTML = '<span class="button-text">Send Message</span>';
    }

    return false; // Prevent default form submission
}

// Show success message after form submission
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'true') {
        const successMessage = document.getElementById('success-message');
        if (successMessage) {
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    }
}); 