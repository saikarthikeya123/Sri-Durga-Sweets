// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Order buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn-primary').forEach(button => {
        if (button.textContent.trim() === 'Order Now') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const card = this.closest('.snack-card');
                if (card) {
                    const productName = card.querySelector('h3').textContent;
                    const price = card.querySelector('.price').textContent;
                    
                    alert(`Sri Durga Sweets\n\nThank you for your interest in ${productName}!\nPrice: ${price}\n\nPlease call us or visit our shop to place your order:\nCall: +91 98483 44355\nVisit: Indira Market Road, Near Tata-Gudi Center, Bhadrachalam, Telangana`);
                }
            });
        }
    });
}); 