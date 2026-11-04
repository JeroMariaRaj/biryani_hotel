/**
 * ZAFFRAN ROYAL BIRYANI - CUSTOMER DASHBOARD CONTROLLER
 * Elevated Luxury Indian Culinary Dashboard Suite
 */

const Dashboard = {
  ADDRESSES_KEY: 'zaffran_saved_addresses',

  init() {
    this.seedDefaultAddresses();
    this.renderSidebar();
    this.bindEvents();
  },

  seedDefaultAddresses() {
    let addrs = this.getAddresses();
    if (!addrs || addrs.length === 0) {
      addrs = [
        {
          id: 'addr-1',
          type: 'Home',
          name: 'Jero Khan',
          phone: '+91 98765 43210',
          address: 'Villa #14, Royal Palms, Road No. 36, Jubilee Hills',
          city: 'Hyderabad',
          pincode: '500033',
          isDefault: true
        },
        {
          id: 'addr-2',
          type: 'Office',
          name: 'Jero Khan',
          phone: '+91 98765 43210',
          address: 'Level 5, Cyber Gateway, HITEC City',
          city: 'Hyderabad',
          pincode: '500081',
          isDefault: false
        }
      ];
      localStorage.setItem(this.ADDRESSES_KEY, JSON.stringify(addrs));
    }
  },

  getAddresses() {
    try {
      return JSON.parse(localStorage.getItem(this.ADDRESSES_KEY)) || [];
    } catch (e) {
      return [];
    }
  },

  saveAddresses(addrs) {
    localStorage.setItem(this.ADDRESSES_KEY, JSON.stringify(addrs));
  },

  // Render modern elevated dashboard sidebar
  renderSidebar() {
    const sidebarContainer = document.getElementById('dashboardSidebar');
    if (!sidebarContainer) return;

    const user = Auth.getCurrentUser() || {
      name: 'Jero Khan',
      email: 'jero@zaffranbiryani.com',
      avatar: 'assets/images/chefs/chef-1.jpg',
      memberSince: 'Oct 2024'
    };

    const currentPath = window.location.pathname;

    const navItems = [
      { href: 'dashboard.html', title: 'Overview', icon: 'bi-grid-1x2-fill' },
      { href: 'my-orders.html', title: 'My Orders', icon: 'bi-bag-check-fill' },
      { href: 'track-order.html', title: 'Track Live Order', icon: 'bi-geo-alt-fill' },
      { href: 'favourites.html', title: 'Favourite Dishes', icon: 'bi-heart-fill' },
      { href: 'order-history.html', title: 'Order History', icon: 'bi-clock-history' },
      { href: 'profile.html', title: 'Profile Settings', icon: 'bi-person-badge-fill' },
      { href: 'addresses.html', title: 'Saved Addresses', icon: 'bi-geo-fill' }
    ];

    let navHTML = navItems.map(item => {
      const isActive = currentPath.endsWith(item.href) || (currentPath.endsWith('/') && item.href === 'dashboard.html');
      return `
        <li>
          <a href="${item.href}" class="dashboard-nav-link ${isActive ? 'active' : ''}">
            <i class="bi ${item.icon}"></i>
            <span>${item.title}</span>
          </a>
        </li>
      `;
    }).join('');

    sidebarContainer.innerHTML = `
      <!-- Mobile Offcanvas Header (Visible only on mobile < 768px) -->
      <div class="d-flex justify-content-between align-items-center d-md-none mb-3 pb-2 border-bottom">
        <div class="d-flex align-items-center gap-2">
          <img src="assets/images/icons/logo.svg" alt="Zaffran" class="brand-logo-img" style="height: 32px;">
          <span class="font-heading text-primary fw-bold">Dashboard Menu</span>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#dashboardSidebar" aria-label="Close"></button>
      </div>

      <!-- User Profile Widget -->
      <div class="dash-user-profile-widget">
        <div class="position-relative d-inline-block mb-2">
          <img src="${user.avatar || 'assets/images/chefs/chef-1.jpg'}" alt="${user.name}" class="dashboard-avatar shadow-sm">
          <span class="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle p-1" style="width: 14px; height: 14px;" title="Online"></span>
        </div>
        <h5 class="font-heading mb-1 text-primary fw-bold">${user.name}</h5>
        <p class="small text-muted mb-2 text-truncate" style="font-size: 0.8rem;">${user.email}</p>
        <div class="d-flex align-items-center justify-content-center gap-2 mb-2">
          <span class="badge badge-gold px-2.5 py-1 rounded-pill" style="font-size: 0.72rem;">
            <i class="bi bi-gem me-1"></i> Nawabi Gold Tier
          </span>
        </div>
        <div class="dash-reward-panel p-2 bg-white rounded-3 border d-flex justify-content-between align-items-center small text-start shadow-xs">
          <div>
            <span class="text-muted d-block" style="font-size: 0.7rem;">Reward Coins</span>
            <strong class="text-secondary fw-bold">480 Coins</strong>
          </div>
          <a href="menu.html" class="btn btn-sm btn-outline-royal py-0 px-2" style="font-size: 0.72rem;">Redeem</a>
        </div>
      </div>

      <!-- Navigation Links -->
      <ul class="dashboard-nav">
        ${navHTML}
        <li class="border-top pt-2 mt-2">
          <a href="index.html" class="dashboard-nav-link text-primary fw-semibold">
            <i class="bi bi-arrow-left"></i>
            <span>Back to Restaurant</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" onclick="Auth.logout()" class="dashboard-nav-link text-danger">
            <i class="bi bi-box-arrow-right text-danger"></i>
            <span>Sign Out</span>
          </a>
        </li>
      </ul>

      <!-- Concierge Help Desk Card -->
      <div class="mt-4 p-3 rounded-4 bg-light border text-center shadow-xs">
        <div class="d-inline-flex p-2 rounded-circle bg-white text-primary mb-2 shadow-xs">
          <i class="bi bi-headset fs-5"></i>
        </div>
        <h6 class="font-heading fw-bold text-dark mb-1" style="font-size: 0.9rem;">Need Catering Help?</h6>
        <p class="small text-muted mb-2" style="font-size: 0.75rem;">24/7 Royal Biryani Concierge</p>
        <a href="tel:+914023456789" class="btn btn-sm btn-royal w-100 rounded-pill py-1" style="font-size: 0.75rem;">
          <i class="bi bi-telephone-fill me-1"></i> +91 40 2345 6789
        </a>
      </div>
    `;

    // Sync header avatar and name if present
    document.querySelectorAll('.dash-header-avatar').forEach(img => {
      img.src = user.avatar || 'assets/images/chefs/chef-1.jpg';
    });
    document.querySelectorAll('.dash-user-name').forEach(el => {
      el.textContent = user.name;
    });
  },

  // Calculate overview metrics for dashboard.html
  renderOverviewStats() {
    const orders = Orders.getOrders();
    const favs = Menu.getFavourites();

    const totalOrders = orders.length;
    const activeOrders = orders.filter(o => o.currentStep < 6).length;
    const completedOrders = orders.filter(o => o.currentStep === 6).length;
    const totalFavs = favs.length;

    const elTotal = document.getElementById('statTotalOrders');
    const elActive = document.getElementById('statActiveOrders');
    const elCompleted = document.getElementById('statCompletedOrders');
    const elFavs = document.getElementById('statFavs');

    if (elTotal) elTotal.textContent = totalOrders;
    if (elActive) elActive.textContent = activeOrders;
    if (elCompleted) elCompleted.textContent = completedOrders;
    if (elFavs) elFavs.textContent = totalFavs;

    // Render Recent Orders table
    const recentTableBody = document.getElementById('recentOrdersTableBody');
    if (recentTableBody) {
      if (orders.length === 0) {
        recentTableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No orders placed yet.</td></tr>`;
      } else {
        recentTableBody.innerHTML = orders.slice(0, 4).map(o => `
          <tr>
            <td>
              <span class="badge bg-light text-primary border fw-bold px-2.5 py-1.5" style="font-size: 0.8rem;">
                ${o.orderId}
              </span>
            </td>
            <td>
              <div class="fw-semibold text-dark">${o.items.map(i => `${i.name} <span class="badge bg-light text-muted border">×${i.quantity}</span>`).join(', ')}</div>
            </td>
            <td class="text-muted small">${o.date}</td>
            <td><strong class="text-primary font-heading fs-6">₹${o.totals.grandTotal}</strong></td>
            <td>
              <span class="badge ${o.currentStep === 6 ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-warning-subtle text-warning-emphasis border border-warning dash-badge-pulse'} px-2.5 py-1.5" style="font-size: 0.78rem;">
                ${o.status}
              </span>
            </td>
            <td class="text-end">
              <a href="track-order.html?orderId=${o.orderId}" class="btn btn-sm btn-royal rounded-pill py-1 px-3" style="font-size: 0.78rem;">
                <i class="bi bi-geo-alt me-1"></i> Track
              </a>
            </td>
          </tr>
        `).join('');
      }
    }
  },

  bindEvents() {
    // Save Address handler
    const addAddressForm = document.getElementById('addAddressForm');
    if (addAddressForm) {
      addAddressForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.getElementById('addrType').value;
        const name = document.getElementById('addrName').value.trim();
        const phone = document.getElementById('addrPhone').value.trim();
        const address = document.getElementById('addrLine').value.trim();
        const city = document.getElementById('addrCity').value.trim();
        const pincode = document.getElementById('addrPincode').value.trim();

        if (!name || !phone || !address || !city || !pincode) {
          Validation.toast('Please fill all address fields.', 'error');
          return;
        }

        const addrs = this.getAddresses();
        const newAddr = {
          id: 'addr-' + Date.now(),
          type: type,
          name: name,
          phone: phone,
          address: address,
          city: city,
          pincode: pincode,
          isDefault: addrs.length === 0
        };

        addrs.push(newAddr);
        this.saveAddresses(addrs);
        Validation.toast('Address added successfully!', 'success');

        const modalEl = document.getElementById('addAddressModal');
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();
        }
        addAddressForm.reset();
        this.renderAddresses();
      });
    }

    // Profile Settings Form handler
    const profileForm = document.getElementById('profileSettingsForm');
    if (profileForm) {
      const user = Auth.getCurrentUser() || { name: 'Jero Khan', email: 'jero@zaffranbiryani.com', mobile: '9876543210' };
      const nameInput = document.getElementById('profName');
      const emailInput = document.getElementById('profEmail');
      const phoneInput = document.getElementById('profPhone');

      if (nameInput) nameInput.value = user.name || '';
      if (emailInput) emailInput.value = user.email || '';
      if (phoneInput) phoneInput.value = user.mobile || '';

      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const updatedName = nameInput.value.trim();
        const updatedEmail = emailInput.value.trim();
        const updatedPhone = phoneInput.value.trim();

        if (!updatedName || !updatedEmail || !updatedPhone) {
          Validation.toast('Please fill in all profile fields.', 'error');
          return;
        }

        user.name = updatedName;
        user.email = updatedEmail;
        user.mobile = updatedPhone;
        localStorage.setItem(Auth.SESSION_KEY, JSON.stringify(user));

        Validation.alert('Profile Updated', 'Your profile details have been saved successfully.', 'success');
        this.renderSidebar();
      });
    }
  },

  // Render Address cards on addresses.html
  renderAddresses() {
    const listContainer = document.getElementById('addressesList');
    if (!listContainer) return;

    const addrs = this.getAddresses();
    if (addrs.length === 0) {
      listContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="bi bi-geo-alt text-muted" style="font-size: 3rem;"></i>
          <p class="text-muted mt-2">No delivery addresses saved yet.</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = addrs.map(addr => `
      <div class="col-md-6">
        <div class="card border ${addr.isDefault ? 'border-warning shadow-sm' : 'border-light'} rounded-4 p-4 h-100 bg-white">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div class="d-flex align-items-center gap-2">
              <span class="badge ${addr.type === 'Home' ? 'badge-maroon' : 'badge-gold'}">
                <i class="bi ${addr.type === 'Home' ? 'bi-house' : 'bi-building'} me-1"></i> ${addr.type}
              </span>
              ${addr.isDefault ? '<span class="badge bg-success small">Default</span>' : ''}
            </div>
            <div class="dropdown">
              <button class="btn btn-sm btn-light p-1 rounded-circle" type="button" data-bs-toggle="dropdown">
                <i class="bi bi-three-dots-vertical"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end shadow">
                ${!addr.isDefault ? `<li><a class="dropdown-item" href="javascript:void(0)" onclick="Dashboard.setDefaultAddress('${addr.id}')"><i class="bi bi-check-circle me-1"></i> Set as Default</a></li>` : ''}
                <li><a class="dropdown-item text-danger" href="javascript:void(0)" onclick="Dashboard.deleteAddress('${addr.id}')"><i class="bi bi-trash me-1"></i> Delete</a></li>
              </ul>
            </div>
          </div>
          <h6 class="font-heading mb-1 text-dark">${addr.name}</h6>
          <p class="text-muted small mb-2"><i class="bi bi-telephone text-secondary me-1"></i> ${addr.phone}</p>
          <p class="text-muted small mb-0">${addr.address}, ${addr.city} - ${addr.pincode}</p>
        </div>
      </div>
    `).join('');
  },

  setDefaultAddress(id) {
    let addrs = this.getAddresses();
    addrs = addrs.map(a => ({ ...a, isDefault: a.id === id }));
    this.saveAddresses(addrs);
    this.renderAddresses();
    Validation.toast('Default delivery address updated.', 'success');
  },

  deleteAddress(id) {
    Swal.fire({
      title: 'Delete Address?',
      text: 'Are you sure you want to remove this delivery location?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#741C24',
      cancelButtonColor: '#766B63',
      confirmButtonText: 'Yes, Delete'
    }).then(res => {
      if (res.isConfirmed) {
        let addrs = this.getAddresses().filter(a => a.id !== id);
        this.saveAddresses(addrs);
        this.renderAddresses();
        Validation.toast('Address removed.', 'info');
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Dashboard.init();
});
