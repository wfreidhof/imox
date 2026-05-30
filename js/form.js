/* ============================================
   WHATSAPP FORM HANDLER
   Handles form submission and WhatsApp integration
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('whatsapp-form');
  
  if (!form) {
    console.error('Form with id "whatsapp-form" not found');
    return;
  }

  const phoneNumber = '50432436262'; // Honduran number
  const submitButton = form.querySelector('button[type="submit"]');
  const successMessage = document.querySelector('.form-success');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Show loading state
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading"></span> Sending...';

    // Get form values
    const name = encodeURIComponent(form.name.value.trim());
    const email = encodeURIComponent(form.email.value.trim());
    const eventDate = encodeURIComponent(document.getElementById('eventDate').value);
    const message = encodeURIComponent(form.message.value.trim());

    // Validate inputs
    if (!name || !email || !eventDate || !message) {
      showError('Please fill in all fields');
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      return;
    }

    // Build WhatsApp message
    const whatsappMessage = 
      `📩 *New Booking Request*%0A%0A` +
      `*Name:* ${name}%0A` +
      `*Email:* ${email}%0A` +
      `*Event Date:* ${eventDate}%0A` +
      `*Message:* ${message}`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    // Show success message
    if (successMessage) {
      successMessage.classList.add('show');
      successMessage.textContent = '✓ Redirecting to WhatsApp...';
    }

    // Simulate a short delay for UX feedback (500ms), then open WhatsApp
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
      
      // Reset form
      form.reset();
      
      // Reset button
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      
      // Hide success message after 3 seconds
      if (successMessage) {
        setTimeout(() => {
          successMessage.classList.remove('show');
        }, 3000);
      }
    }, 500);
  });

  /**
   * Display error message
   */
  function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-error';
    errorDiv.textContent = message;
    form.insertBefore(errorDiv, form.firstChild);
    
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }
});
