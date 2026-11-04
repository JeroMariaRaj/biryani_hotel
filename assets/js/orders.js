/**
 * ZAFFRAN ROYAL BIRYANI - ORDERS & LIVE TRACKING
 * Manages order list, live tracking timeline animation, and reordering.
 */

const Orders = {
  ORDERS_KEY: 'zaffran_orders',

  // Stages of order tracking
  STAGES: [
    { step: 1, title: 'Order Placed', desc: 'Order received and logged in system', icon: 'bi-receipt' },
    { step: 2, title: 'Order Confirmed', desc: 'Kitchen acknowledged & ingredients allocated', icon: 'bi-check-circle' },
    { step: 3, title: 'Dum Preparation', desc: 'Aged basmati & meat sealed on slow coals', icon: 'bi-fire' },
    { step: 4, title: 'Ready for Dispatch', desc: 'Handi packed in insulated thermal carrier', icon: 'bi-box-seam' },
    { step: 5, title: 'Out for Delivery', desc: 'Royal courier rider en route to your location', icon: 'bi-scooter' },
    { step: 6, title: 'Delivered', desc: 'Feast handed over hot and fresh', icon: 'bi-house-heart' }
  ],

  init() {
    this.seedSampleOrders();
  },

  seedSampleOrders() {
    let orders = this.getOrders();
    if (!orders || orders.length === 0) {
      orders = [
        {
          orderId: 'ZBR-78321',
          date: '03 Nov 2026, 01:15 PM',
          customer: {
            name: 'Jero Khan',
            email: 'demo@zaffranbiryani.com',
            phone: '+91 98765 43210',
            address: 'Royal Palms Villa #14, Jubilee Hills, Hyderabad - 500033'
          },
          payment: {
            method: 'Online UPI (Demo)',
            status: 'Completed'
          },
          items: [
            { dishId: 'dish-1', name: 'Royal Hyderabadi Chicken Dum Biryani', price: 349, quantity: 2, isVeg: false },
            { dishId: 'dish-17', name: 'Hyderabadi Mirchi Ka Salan (Special)', price: 129, quantity: 1, isVeg: true }
          ],
          totals: {
            subtotal: 827,
            deliveryFee: 0,
            discount: 0,
            grandTotal: 827
          },
          status: 'Dum Preparation',
          currentStep: 3,
          estimatedDelivery: '25 - 35 Minutes'
        },
        {
          orderId: 'ZBR-65120',
          date: '28 Oct 2026, 08:30 PM',
          customer: {
            name: 'Jero Khan',
            email: 'demo@zaffranbiryani.com',
            phone: '+91 98765 43210',
            address: 'Royal Palms Villa #14, Jubilee Hills, Hyderabad - 500033'
          },
          payment: {
            method: 'Cash on Delivery',
            status: 'Paid on Delivery'
          },
          items: [
            { dishId: 'dish-4', name: 'Kache Gosht Ki Mutton Dum Biryani', price: 469, quantity: 1, isVeg: false },
            { dishId: 'dish-18', name: 'Shahi Royal Tukda with Rabri', price: 179, quantity: 1, isVeg: true }
          ],
          totals: {
            subtotal: 648,
            deliveryFee: 70,
            discount: 0,
            grandTotal: 718
          },
          status: 'Delivered',
          currentStep: 6,
          estimatedDelivery: 'Delivered'
        }
      ];
      localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
    }
  },

  getOrders() {
    try {
      return JSON.parse(localStorage.getItem(this.ORDERS_KEY)) || [];
    } catch (e) {
      return [];
    }
  },

  getOrderById(orderId) {
    const orders = this.getOrders();
    return orders.find(o => o.orderId === orderId) || orders[0];
  },

  // Reorder: adds all items of an order back into the active cart
  reorder(orderId) {
    const order = this.getOrderById(orderId);
    if (!order) return;

    order.items.forEach(item => {
      Cart.add(item.dishId, item.quantity);
    });

    Validation.toast(`Items from order ${orderId} added to cart!`, 'success');
    setTimeout(() => {
      window.location.href = 'cart.html';
    }, 800);
  },

  // Render tracking timeline on track-order.html
  renderLiveTracking(orderId) {
    const container = document.getElementById('trackingContainer');
    if (!container) return;

    const order = this.getOrderById(orderId);
    if (!order) {
      container.innerHTML = `
        <div class="alert alert-warning text-center">
          <h5>No Order Found</h5>
          <p>We could not find order ${orderId}. Please check your order ID or go to My Orders.</p>
          <a href="my-orders.html" class="btn btn-royal btn-sm">View My Orders</a>
        </div>
      `;
      return;
    }

    const currentStep = order.currentStep || 3;
    const progressPercent = Math.min(100, Math.round(((currentStep - 1) / (this.STAGES.length - 1)) * 100));

    let stepsHTML = '';
    this.STAGES.forEach(s => {
      let stateClass = '';
      if (s.step < currentStep) stateClass = 'completed';
      else if (s.step === currentStep) stateClass = 'active';

      stepsHTML += `
        <div class="timeline-step ${stateClass}">
          <div class="timeline-step-icon">
            <i class="bi ${s.icon}"></i>
          </div>
          <div class="timeline-step-title">${s.title}</div>
          <div class="timeline-step-time">${s.step <= currentStep ? 'Completed' : 'Pending'}</div>
        </div>
      `;
    });

    let itemsSummaryHTML = order.items.map(i => `
      <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
        <div>
          <span class="diet-badge ${i.isVeg ? 'veg' : 'non-veg'} me-2"></span>
          <span class="fw-semibold">${i.name}</span>
          <span class="text-muted small"> × ${i.quantity}</span>
        </div>
        <span class="fw-bold">₹${i.price * i.quantity}</span>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
        <div class="card-header bg-royal text-white py-3 px-4 d-flex justify-content-between align-items-center flex-wrap gap-2" style="background: linear-gradient(135deg, var(--primary) 0%, #58141A 100%);">
          <div>
            <span class="badge badge-gold mb-1">LIVE TRACKING</span>
            <h4 class="font-heading text-white mb-0">Order #${order.orderId}</h4>
          </div>
          <div class="text-end">
            <span class="small text-light d-block">Estimated Arrival:</span>
            <span class="fs-5 fw-bold text-warning">${order.estimatedDelivery}</span>
          </div>
        </div>

        <div class="card-body p-4">
          <!-- Visual Timeline Bar -->
          <div class="timeline-track">
            <div class="timeline-track-progress" style="width: ${progressPercent}%;"></div>
            ${stepsHTML}
          </div>

          <!-- Live Step Status Box -->
          <div class="p-3 bg-light rounded-3 border d-flex align-items-center justify-content-between flex-wrap gap-3 my-4">
            <div class="d-flex align-items-center gap-3">
              <div class="spinner-grow text-warning" role="status" style="width: 2.2rem; height: 2.2rem;">
                <span class="visually-hidden">Live</span>
              </div>
              <div>
                <h6 class="mb-1 text-primary fw-bold">Current Stage: ${this.STAGES[currentStep - 1].title}</h6>
                <p class="small text-muted mb-0">${this.STAGES[currentStep - 1].desc}</p>
              </div>
            </div>
            <button class="btn btn-sm btn-outline-gold" onclick="Orders.simulateNextStep('${order.orderId}')">
              <i class="bi bi-play-circle"></i> Advance Stage (Demo)
            </button>
          </div>

          <div class="row g-4 mt-2">
            <div class="col-md-6">
              <h6 class="font-heading text-primary border-bottom pb-2">Delivery Destination</h6>
              <p class="mb-1 fw-bold">${order.customer.name}</p>
              <p class="text-muted small mb-1"><i class="bi bi-geo-alt text-secondary"></i> ${order.customer.address}</p>
              <p class="text-muted small mb-0"><i class="bi bi-telephone text-secondary"></i> ${order.customer.phone}</p>
            </div>
            <div class="col-md-6">
              <h6 class="font-heading text-primary border-bottom pb-2">Ordered Delicacies</h6>
              ${itemsSummaryHTML}
              <div class="d-flex justify-content-between pt-2 fw-bold">
                <span>Grand Total:</span>
                <span class="text-primary fs-5">₹${order.totals.grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Demo tool: advance stage to show live simulation
  simulateNextStep(orderId) {
    let orders = this.getOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return;

    if (order.currentStep < 6) {
      order.currentStep += 1;
      order.status = this.STAGES[order.currentStep - 1].title;
      if (order.currentStep === 6) {
        order.estimatedDelivery = 'Delivered';
      }
      localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
      Validation.toast(`Order stage advanced to: ${order.status}`, 'success');
      this.renderLiveTracking(orderId);
    } else {
      order.currentStep = 1;
      order.status = this.STAGES[0].title;
      order.estimatedDelivery = '35 - 45 Minutes';
      localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
      Validation.toast('Tracking reset to Order Placed for testing.', 'info');
      this.renderLiveTracking(orderId);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Orders.init();
});
