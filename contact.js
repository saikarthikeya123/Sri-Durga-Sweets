// Form validation and submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const phone = this.querySelector('input[name="phone"]').value;
        const inquiryType = this.querySelector('select[name="inquiry_type"]').value;
        const message = this.querySelector('textarea[name="message"]').value;
        
        // Validation
        let isValid = true;
        let errorMessage = '';
        
        if (!name.trim()) {
            errorMessage += 'Please enter your name.\n';
            isValid = false;
        }
        
        if (!email.trim() || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            errorMessage += 'Please enter a valid email address.\n';
            isValid = false;
        }
        
        if (!phone.trim() || !phone.match(/^[0-9]{10}$/)) {
            errorMessage += 'Please enter a valid 10-digit phone number.\n';
            isValid = false;
        }
        
        if (!inquiryType) {
            errorMessage += 'Please select an inquiry type.\n';
            isValid = false;
        }
        
        if (!message.trim()) {
            errorMessage += 'Please enter your message.\n';
            isValid = false;
        }
        
        if (!isValid) {
            alert(errorMessage);
            return;
        }

        // If form is valid, prepare submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        // Set current timestamp
        const now = new Date();
        const submissionTime = now.toLocaleString('en-US', { 
            timeZone: 'Asia/Kolkata',
            dateStyle: 'full',
            timeStyle: 'long'
        });

        // Prepare form data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('inquiry_type', inquiryType);
        formData.append('message', message);
        formData.append('submission_time', submissionTime);

        // Send form data
        fetch('https://formsubmit.co/durgasweets123@gmail.com', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                window.location.href = 'thank-you.html';
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Sorry, there was an error sending your message. Please try again later.');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
    });
}

// Phone number formatting
const phoneInput = document.querySelector('input[name="phone"]');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '').slice(0, 10);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Show success message if redirected back with success parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const successMessage = document.getElementById('success-message');
        if (successMessage) {
            successMessage.style.display = 'block';
            // Hide the message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    }
}); 