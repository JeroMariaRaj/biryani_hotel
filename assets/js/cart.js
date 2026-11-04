/**
 * ZAFFRAN ROYAL BIRYANI - SHOPPING CART LOGIC
 * Stored in localStorage with reactive badge updates and discount codes.
 */

const Cart = {
  CART_KEY: 'zaffran_cart',
  COUPON_KEY: 'zaffran_applied_coupon',

  // Valid promo discount codes
  COUPONS: {
    'ZAFFRAN10': { type: 'percent', value: 10, label: '10% Royal Welcome Discount' },
    'DUMFREE': { type: 'delivery', value: 0, label: 'Free Delivery Special' },
    'FESTIVE50': { type: 'flat', value: 50, label: '₹50 Flat Festive Off' }
  },

  init() {
    let items = this.getItems();
    // If first time visit, seed 2 default items so cart looks alive
    if (!localStorage.getItem(this.CART_KEY)) {
      items = [
        { dishId: 'dish-1', quantity: 2 },
        { dishId: 'dish-18', quantity: 1 }
      ];
      localStorage.setItem(this.CART_KEY, JSON.stringify(items));
    }
    this.updateNavBadge();
  },

  getItems() {
    try {
      return JSON.parse(localStorage.getItem(this.CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  },

  saveItems(items) {
    localStorage.setItem(this.CART_KEY, JSON.stringify(items));
    this.updateNavBadge();
  },

  add(dishId, qty = 1) {
    const dish = (typeof Menu !== 'undefined' && Menu.getDishById) ? Menu.getDishById(dishId) : null;
    const dishName = dish ? dish.name : 'Delicacy';

    let items = this.getItems();
    const existing = items.find(i => i.dishId === dishId);

    if (existing) {
      existing.quantity += qty;
    } else {
      items.push({ dishId, quantity: qty });
    }

    this.saveItems(items);
    if (typeof Validation !== 'undefined' && Validation.toast) {
      Validation.toast(`${dishName} added to cart!`, 'success');
    } else if (typeof Swal !== 'undefined') {
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `${dishName} added!`, showConfirmButton: false, timer: 2000 });
    }

    // If on cart page, re-render
    if (typeof renderCartPage === 'function') {
      renderCartPage();
    }
  },

  updateQuantity(dishId, newQty) {
    let items = this.getItems();
    if (newQty <= 0) {
      this.remove(dishId);
      return;
    }

    const item = items.find(i => i.dishId === dishId);
    if (item) {
      item.quantity = newQty;
      this.saveItems(items);
      if (typeof renderCartPage === 'function') {
        renderCartPage();
      }
    }
  },

  remove(dishId) {
    let items = this.getItems();
    const dish = (typeof Menu !== 'undefined' && Menu.getDishById) ? Menu.getDishById(dishId) : null;
    items = items.filter(i => i.dishId !== dishId);
    this.saveItems(items);

    if (dish && typeof Validation !== 'undefined' && Validation.toast) {
      Validation.toast(`${dish.name} removed from cart.`, 'info');
    }

    if (typeof renderCartPage === 'function') {
      renderCartPage();
    }
  },

  clear() {
    localStorage.removeItem(this.CART_KEY);
    localStorage.removeItem(this.COUPON_KEY);
    this.updateNavBadge();
  },

  // Calculations
  getTotals() {
    const items = this.getItems();
    let subtotal = 0;
    let totalItems = 0;

    items.forEach(item => {
      const dish = (typeof Menu !== 'undefined' && Menu.getDishById) ? Menu.getDishById(item.dishId) : null;
      if (dish) {
        subtotal += dish.price * item.quantity;
        totalItems += item.quantity;
      } else {
        totalItems += item.quantity || 1;
      }
    });

    let deliveryFee = subtotal > 0 ? 50 : 0;
    if (subtotal >= 799) {
      deliveryFee = 0; // Free delivery for orders >= 799
    }

    let discount = 0;
    const appliedCode = localStorage.getItem(this.COUPON_KEY);
    let appliedCouponInfo = null;

    if (appliedCode && this.COUPONS[appliedCode]) {
      appliedCouponInfo = this.COUPONS[appliedCode];
      if (appliedCouponInfo.type === 'percent') {
        discount = Math.round((subtotal * appliedCouponInfo.value) / 100);
      } else if (appliedCouponInfo.type === 'delivery') {
        deliveryFee = 0;
      } else if (appliedCouponInfo.type === 'flat') {
        discount = appliedCouponInfo.value;
      }
    }

    const grandTotal = Math.max(0, subtotal + deliveryFee - discount);

    return {
      totalItems,
      subtotal,
      deliveryFee,
      discount,
      grandTotal,
      appliedCode,
      appliedCouponInfo
    };
  },

  applyCoupon(code) {
    const clean = String(code).trim().toUpperCase();
    if (this.COUPONS[clean]) {
      localStorage.setItem(this.COUPON_KEY, clean);
      if (typeof Validation !== 'undefined' && Validation.toast) {
        Validation.toast(`Coupon ${clean} applied! (${this.COUPONS[clean].label})`, 'success');
      }
      return true;
    } else {
      if (typeof Validation !== 'undefined' && Validation.toast) {
        Validation.toast('Invalid promo code. Try ZAFFRAN10 or DUMFREE', 'error');
      }
      return false;
    }
  },

  removeCoupon() {
    localStorage.removeItem(this.COUPON_KEY);
    if (typeof Validation !== 'undefined' && Validation.toast) {
      Validation.toast('Coupon removed.', 'info');
    }
  },

  updateNavBadge() {
    const totals = this.getTotals();
    const badges = document.querySelectorAll('.cart-badge-count');
    badges.forEach(b => {
      b.textContent = totals.totalItems;
      b.style.display = totals.totalItems > 0 ? 'flex' : 'none';
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Cart.init();
});
