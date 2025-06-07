// Form validation and submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Set current IST time before submission
        const istTime = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata',
            dateStyle: 'full',
            timeStyle: 'long'
        });
        document.getElementById('submission_time').value = istTime;

        // Basic form validation
        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const phone = this.querySelector('input[name="phone"]').value;
        const message = this.querySelector('textarea[name="message"]').value;
        
        let isValid = true;
        let errorMessage = '';
        
        // Name validation
        if (!name.trim()) {
            errorMessage += 'Please enter your name.\n';
            isValid = false;
        }
        
        // Email validation
        if (!email.trim() || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            errorMessage += 'Please enter a valid email address.\n';
            isValid = false;
        }
        
        // Phone validation (minimum 10 digits, allowing +, -, spaces, and parentheses)
        if (!phone.trim() || !phone.match(/^[0-9+\-\s()]{10,}$/)) {
            errorMessage += 'Please enter a valid phone number.\n';
            isValid = false;
        }
        
        // Message validation
        if (!message.trim()) {
            errorMessage += 'Please enter your message.\n';
            isValid = false;
        }
        
        if (!isValid) {
            e.preventDefault();
            alert(errorMessage);
            return;
        }

        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

        // Show success message after successful submission
        const successMessage = document.getElementById('success-message');
        if (successMessage) {
            // Add event listener for form submission completion
            window.addEventListener('submit', function() {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                successMessage.style.display = 'block';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }, { once: true });
        }
    });
}

// Phone number formatting
const phoneInput = document.querySelector('input[name="phone"]');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
} 