/**
 * ZAFFRAN ROYAL BIRYANI - MAIN INTERACTION SCRIPT
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar-custom');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 2. Back to Top Button
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 60
    });
  }

  // 4. Initialize Swiper Carousels
  if (typeof Swiper !== 'undefined') {
    // Testimonial Swiper
    if (document.querySelector('.testimonial-swiper')) {
      new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 }
        }
      });
    }

    // Bestseller / Signature Swiper
    if (document.querySelector('.bestseller-swiper')) {
      new Swiper('.bestseller-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1200: { slidesPerView: 4 }
        }
      });
    }
  }

  // 5. Party Orders Guest & Biryani Calculator
  const guestCountInput = document.getElementById('calcGuests');
  if (guestCountInput) {
    const btnMinus = document.getElementById('btnGuestMinus');
    const btnPlus = document.getElementById('btnGuestPlus');
    const biryaniTypeSelect = document.getElementById('calcBiryaniType');

    function updatePartyCalculation() {
      const guests = parseInt(guestCountInput.value) || 25;
      const type = biryaniTypeSelect ? biryaniTypeSelect.value : 'chicken';

      // 1 kg authentic biryani serves ~ 3.5 guests
      const approxKg = Math.ceil(guests / 3.5);
      const approxDegs = Math.ceil(approxKg / 10); // 10kg standard handi deg

      // Pricing estimation
      let pricePerGuest = 280; // standard chicken
      if (type === 'mutton') pricePerGuest = 390;
      else if (type === 'veg') pricePerGuest = 230;
      else if (type === 'special') pricePerGuest = 450;

      const estimatedTotal = guests * pricePerGuest;

      const elKg = document.getElementById('calcKgOutput');
      const elDegs = document.getElementById('calcDegsOutput');
      const elPortions = document.getElementById('calcPortionsOutput');
      const elTotal = document.getElementById('calcTotalOutput');

      if (elKg) elKg.textContent = `${approxKg} kg`;
      if (elDegs) elDegs.textContent = `${approxDegs} Handi Degs`;
      if (elPortions) elPortions.textContent = `${guests} Portions`;
      if (elTotal) elTotal.textContent = `₹${estimatedTotal.toLocaleString('en-IN')}`;
    }

    if (btnMinus) {
      btnMinus.addEventListener('click', () => {
        let val = parseInt(guestCountInput.value) || 25;
        if (val > 15) {
          guestCountInput.value = val - 5;
          updatePartyCalculation();
        }
      });
    }

    if (btnPlus) {
      btnPlus.addEventListener('click', () => {
        let val = parseInt(guestCountInput.value) || 25;
        guestCountInput.value = val + 5;
        updatePartyCalculation();
      });
    }

    guestCountInput.addEventListener('input', updatePartyCalculation);
    if (biryaniTypeSelect) {
      biryaniTypeSelect.addEventListener('change', updatePartyCalculation);
    }

    updatePartyCalculation();
  }

  // 6. Generic Newsletter Form
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && Validation.validateEmail(emailInput.value)) {
        Validation.toast('Thank you for subscribing to royal culinary updates!', 'success');
        this.reset();
      } else {
        Validation.toast('Please enter a valid email address.', 'error');
      }
    });
  });

  // 7. Contact Form Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('contactName');
      const email = document.getElementById('contactEmail');
      const phone = document.getElementById('contactPhone');
      const subject = document.getElementById('contactSubject');
      const message = document.getElementById('contactMessage');

      let valid = true;
      if (!Validation.validateRequired(name.value)) {
        Validation.showError(name, 'Name is required.');
        valid = false;
      } else Validation.clearError(name);

      if (!Validation.validateEmail(email.value)) {
        Validation.showError(email, 'Valid email required.');
        valid = false;
      } else Validation.clearError(email);

      if (!Validation.validatePhone(phone.value)) {
        Validation.showError(phone, 'Valid 10-digit phone number required.');
        valid = false;
      } else Validation.clearError(phone);

      if (!Validation.validateRequired(message.value)) {
        Validation.showError(message, 'Message is required.');
        valid = false;
      } else Validation.clearError(message);

      if (valid) {
        Validation.alert(
          'Enquiry Received!',
          `Thank you ${name.value}. Our royal catering manager will connect with you at ${phone.value} within 30 minutes.`,
          'success'
        );
        contactForm.reset();
      }
    });
  }

  // 8. Party Order Form Handler
  const partyOrderForm = document.getElementById('partyOrderForm');
  if (partyOrderForm) {
    partyOrderForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('partyName');
      const phone = document.getElementById('partyPhone');
      const email = document.getElementById('partyEmail');
      const eventDate = document.getElementById('partyDate');
      const guests = document.getElementById('partyGuests');

      let valid = true;
      if (!Validation.validateRequired(name.value)) {
        Validation.showError(name, 'Customer Name is required.');
        valid = false;
      } else Validation.clearError(name);

      if (!Validation.validatePhone(phone.value)) {
        Validation.showError(phone, 'Mobile number is required.');
        valid = false;
      } else Validation.clearError(phone);

      if (!Validation.validateEmail(email.value)) {
        Validation.showError(email, 'Valid email is required.');
        valid = false;
      } else Validation.clearError(email);

      if (!Validation.validateRequired(eventDate.value)) {
        Validation.showError(eventDate, 'Please choose an event date.');
        valid = false;
      } else Validation.clearError(eventDate);

      if (!Validation.validateRequired(guests.value)) {
        Validation.showError(guests, 'Please specify guest count.');
        valid = false;
      } else Validation.clearError(guests);

      if (valid) {
        Validation.alert(
          'Catering Request Logged!',
          `We have received your bulk catering request for ${guests.value} guests on ${eventDate.value}. Our master chef will review your menu requirements.`,
          'success'
        );
        partyOrderForm.reset();
      }
    });
  }
});
