/**
 * ZAFFRAN ROYAL BIRYANI - FORM VALIDATION & NOTIFICATION UTILITIES
 */

const Validation = {
  // Regex patterns
  patterns: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^(\+?[0-9]{1,4}[\s-]?)?[0-9]{9,12}$/,
    name: /^[a-zA-Z\s]{2,50}$/,
    password: /^.{6,}$/ // min 6 characters
  },

  validateEmail(email) {
    return this.patterns.email.test(String(email).trim());
  },

  validatePhone(phone) {
    return this.patterns.phone.test(String(phone).replace(/\s+/g, ''));
  },

  validateRequired(val) {
    return val !== null && val !== undefined && String(val).trim().length > 0;
  },

  validatePassword(password) {
    return this.patterns.password.test(password);
  },

  showError(inputElement, message) {
    if (!inputElement) return;
    inputElement.classList.add('is-invalid');
    inputElement.classList.remove('is-valid');

    // Find or create feedback element
    let feedback = inputElement.parentElement.querySelector('.invalid-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      inputElement.parentElement.appendChild(feedback);
    }
    feedback.textContent = message;
    feedback.style.display = 'block';
  },

  clearError(inputElement) {
    if (!inputElement) return;
    inputElement.classList.remove('is-invalid');
    inputElement.classList.add('is-valid');

    const feedback = inputElement.parentElement.querySelector('.invalid-feedback');
    if (feedback) {
      feedback.style.display = 'none';
    }
  },

  resetForm(formElement) {
    if (!formElement) return;
    formElement.reset();
    formElement.querySelectorAll('.is-invalid, .is-valid').forEach(el => {
      el.classList.remove('is-invalid', 'is-valid');
    });
    formElement.querySelectorAll('.invalid-feedback').forEach(el => {
      el.style.display = 'none';
    });
  },

  // SweetAlert2 Toast & Alerts helper
  toast(title, icon = 'success') {
    if (typeof Swal !== 'undefined') {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: document.documentElement.getAttribute('data-bs-theme') === 'dark' ? '#241E1B' : '#FFF8EF',
        color: document.documentElement.getAttribute('data-bs-theme') === 'dark' ? '#F7F1EB' : '#292421',
        iconColor: '#D99A32'
      });
      Toast.fire({
        icon: icon,
        title: title
      });
    } else {
      alert(title);
    }
  },

  alert(title, text, icon = 'info') {
    if (typeof Swal !== 'undefined') {
      return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonColor: '#741C24',
        background: document.documentElement.getAttribute('data-bs-theme') === 'dark' ? '#241E1B' : '#FFF8EF',
        color: document.documentElement.getAttribute('data-bs-theme') === 'dark' ? '#F7F1EB' : '#292421'
      });
    } else {
      alert(`${title}: ${text}`);
      return Promise.resolve();
    }
  }
};
