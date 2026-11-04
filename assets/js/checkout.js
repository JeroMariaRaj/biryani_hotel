/**
 * ZAFFRAN ROYAL BIRYANI - CHECKOUT SIMULATION
 */

const Checkout = {
  ORDERS_KEY: 'zaffran_orders',

  init() {
    this.prefillCustomer();
    this.renderSummary();
    this.bindEvents();
  },

  prefillCustomer() {
    const user = Auth.getCurrentUser();
    if (!user) return;

    const nameInput = document.getElementById('checkoutName');
    const emailInput = document.getElementById('checkoutEmail');
    const phoneInput = document.getElementById('checkoutPhone');

    if (nameInput && !nameInput.value) nameInput.value = user.name;
    if (emailInput && !emailInput.value) emailInput.value = user.email;
    if (phoneInput && !phoneInput.value) phoneInput.value = user.mobile;
  },

  renderSummary() {
    const container = document.getElementById('checkoutItemsList');
    if (!container) return;

    const items = Cart.getItems();
    const totals = Cart.getTotals();

    if (items.length === 0) {
      container.innerHTML = `
        <div class="alert alert-warning text-center">
          Your cart is currently empty. <br>
          <a href="menu.html" class="btn btn-sm btn-royal mt-2">Explore Menu</a>
        </div>
      `;
      const submitBtn = document.getElementById('placeOrderBtn');
      if (submitBtn) submitBtn.disabled = true;
      return;
    }

    let html = '<div class="list-group list-group-flush mb-3">';
    items.forEach(item => {
      const dish = Menu.getDishById(item.dishId);
      if (dish) {
        html += `
          <div class="list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent">
            <div class="d-flex align-items-center gap-2">
              <span class="diet-badge ${dish.isVeg ? 'veg' : 'non-veg'}"></span>
              <span class="fw-semibold text-truncate" style="max-width: 180px;">${dish.name}</span>
              <span class="badge bg-secondary-subtle text-dark">× ${item.quantity}</span>
            </div>
            <span class="fw-bold">₹${dish.price * item.quantity}</span>
          </div>
        `;
      }
    });
    html += '</div>';

    html += `
      <div class="border-top pt-3">
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">Item Subtotal</span>
          <span>₹${totals.subtotal}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">Delivery Charges</span>
          <span class="${totals.deliveryFee === 0 ? 'text-success fw-bold' : ''}">${totals.deliveryFee === 0 ? 'FREE' : '₹' + totals.deliveryFee}</span>
        </div>
        ${totals.discount > 0 ? `
          <div class="d-flex justify-content-between mb-2 text-success">
            <span>Special Discount (${totals.appliedCode})</span>
            <span>- ₹${totals.discount}</span>
          </div>
        ` : ''}
        <div class="d-flex justify-content-between border-top pt-2 mt-2">
          <span class="fw-bold fs-5">Grand Total</span>
          <span class="fw-bold fs-5 text-primary">₹${totals.grandTotal}</span>
        </div>
      </div>
    `;

    container.innerHTML = html;
  },

  bindEvents() {
    const form = document.getElementById('checkoutForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.processOrder();
    });
  },

  processOrder() {
    const nameInput = document.getElementById('checkoutName');
    const emailInput = document.getElementById('checkoutEmail');
    const phoneInput = document.getElementById('checkoutPhone');
    const addressInput = document.getElementById('checkoutAddress');
    const cityInput = document.getElementById('checkoutCity');
    const pincodeInput = document.getElementById('checkoutPincode');
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

    // Validation
    let valid = true;
    if (!Validation.validateRequired(nameInput.value)) {
      Validation.showError(nameInput, 'Full name is required.');
      valid = false;
    } else {
      Validation.clearError(nameInput);
    }

    if (!Validation.validateEmail(emailInput.value)) {
      Validation.showError(emailInput, 'Enter a valid email.');
      valid = false;
    } else {
      Validation.clearError(emailInput);
    }

    if (!Validation.validatePhone(phoneInput.value)) {
      Validation.showError(phoneInput, 'Enter a valid 10-digit mobile number.');
      valid = false;
    } else {
      Validation.clearError(phoneInput);
    }

    if (!Validation.validateRequired(addressInput.value)) {
      Validation.showError(addressInput, 'Delivery address is required.');
      valid = false;
    } else {
      Validation.clearError(addressInput);
    }

    if (!Validation.validateRequired(cityInput.value)) {
      Validation.showError(cityInput, 'City is required.');
      valid = false;
    } else {
      Validation.clearError(cityInput);
    }

    if (!Validation.validateRequired(pincodeInput.value)) {
      Validation.showError(pincodeInput, 'Pincode is required.');
      valid = false;
    } else {
      Validation.clearError(pincodeInput);
    }

    if (!valid) return;

    const items = Cart.getItems();
    if (items.length === 0) {
      Validation.alert('Cart is Empty', 'Please add some biryani delicacies before checking out.', 'warning');
      return;
    }

    const totals = Cart.getTotals();
    const orderId = 'ZBR-' + Math.floor(10000 + Math.random() * 90000);
    const orderDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    const newOrder = {
      orderId: orderId,
      date: orderDate,
      customer: {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        address: `${addressInput.value.trim()}, ${cityInput.value.trim()} - ${pincodeInput.value.trim()}`
      },
      payment: {
        method: paymentMethod ? paymentMethod.value : 'Cash on Delivery',
        status: 'Paid / Authorized'
      },
      items: items.map(item => {
        const dish = Menu.getDishById(item.dishId);
        return {
          dishId: item.dishId,
          name: dish ? dish.name : 'Dum Biryani Item',
          price: dish ? dish.price : 0,
          quantity: item.quantity,
          isVeg: dish ? dish.isVeg : false
        };
      }),
      totals: totals,
      status: 'Kitchen Preparation',
      currentStep: 3, // 1: Placed, 2: Confirmed, 3: Prep, 4: Ready, 5: Out for delivery, 6: Delivered
      estimatedDelivery: '35 - 45 Minutes'
    };

    // Save order into localStorage
    let orders = [];
    try {
      orders = JSON.parse(localStorage.getItem(this.ORDERS_KEY)) || [];
    } catch (e) {
      orders = [];
    }
    orders.unshift(newOrder);
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));

    // Clear cart
    Cart.clear();

    // SweetAlert2 success modal
    Swal.fire({
      title: 'Royal Feast Confirmed!',
      html: `
        <div class="text-center py-2">
          <p class="text-muted mb-2">Thank you, <strong>${newOrder.customer.name}</strong>. Your royal biryani is being slow-cooked to perfection.</p>
          <div class="p-3 bg-light rounded border mb-3">
            <span class="small text-muted d-block">Order Reference ID:</span>
            <span class="fs-4 fw-bold text-primary font-heading">${orderId}</span>
          </div>
          <p class="small text-muted mb-0">Total Paid: <strong>₹${totals.grandTotal}</strong> via ${newOrder.payment.method}</p>
        </div>
      `,
      icon: 'success',
      confirmButtonText: '<i class="bi bi-geo-alt"></i> Track Live Order',
      showCancelButton: true,
      cancelButtonText: '<i class="bi bi-speedometer2"></i> Go to Dashboard',
      confirmButtonColor: '#741C24',
      cancelButtonColor: '#D99A32',
      background: document.documentElement.getAttribute('data-bs-theme') === 'dark' ? '#241E1B' : '#FFF8EF',
      color: document.documentElement.getAttribute('data-bs-theme') === 'dark' ? '#F7F1EB' : '#292421'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `track-order.html?orderId=${orderId}`;
      } else {
        window.location.href = 'dashboard.html';
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('checkoutForm')) {
    Checkout.init();
  }
});
