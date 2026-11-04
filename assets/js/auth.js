/**
 * ZAFFRAN ROYAL BIRYANI - CUSTOMER AUTHENTICATION
 * Manages registration, demo login modal, session persistence in localStorage.
 */

const Auth = {
  USERS_KEY: 'zaffran_users',
  SESSION_KEY: 'zaffran_current_user',

  // Initialize demo data
  init() {
    let users = this.getUsers();
    if (!users || users.length === 0) {
      users = [
        {
          id: 'USR-101',
          name: 'Jero Khan',
          email: 'demo@zaffranbiryani.com',
          mobile: '9876543210',
          password: 'password123',
          avatar: 'assets/images/chefs/chef-1.jpg',
          memberSince: 'Oct 2024'
        }
      ];
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }

    // Start logged out by default so navbar displays a clean Login button

    this.renderNavAuth();
    this.ensureLoginModal();
    this.bindEvents();
  },

  getUsers() {
    try {
      return JSON.parse(localStorage.getItem(this.USERS_KEY)) || [];
    } catch (e) {
      return [];
    }
  },

  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(this.SESSION_KEY));
    } catch (e) {
      return null;
    }
  },

  isLoggedIn() {
    return this.getCurrentUser() !== null;
  },

  loginUser(user, notify = true) {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    this.renderNavAuth();
    if (notify) {
      Validation.toast(`Welcome back, ${user.name}!`, 'success');
    }
  },

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    this.renderNavAuth();
    Validation.toast('You have been logged out successfully.', 'info');
    // If currently on a dashboard page, redirect to home
    if (window.location.pathname.includes('dashboard') ||
        window.location.pathname.includes('my-orders') ||
        window.location.pathname.includes('track-order') ||
        window.location.pathname.includes('favourites') ||
        window.location.pathname.includes('order-history') ||
        window.location.pathname.includes('profile') ||
        window.location.pathname.includes('addresses')) {
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    }
  },

  // Authenticate user by email/mobile and password
  authenticate(identifier, password) {
    const users = this.getUsers();
    const cleanId = String(identifier).trim().toLowerCase();
    const user = users.find(u => 
      (u.email.toLowerCase() === cleanId || u.mobile.replace(/\D/g, '') === cleanId.replace(/\D/g, '')) &&
      u.password === password
    );
    return user || null;
  },

  // Register new customer
  register(userData) {
    const users = this.getUsers();
    const cleanEmail = userData.email.trim().toLowerCase();
    const cleanMobile = userData.mobile.replace(/\D/g, '');

    // Check duplicate
    const exists = users.some(u => 
      u.email.toLowerCase() === cleanEmail || u.mobile.replace(/\D/g, '') === cleanMobile
    );

    if (exists) {
      return { success: false, message: 'An account with this email or mobile number already exists.' };
    }

    const newUser = {
      id: 'USR-' + Math.floor(100 + Math.random() * 900),
      name: userData.name.trim(),
      email: cleanEmail,
      mobile: userData.mobile.trim(),
      password: userData.password,
      avatar: 'assets/images/chefs/chef-2.jpg',
      memberSince: 'Nov 2026'
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return { success: true, user: newUser };
  },

  // Render navigation authentication widget (Login button or User avatar dropdown)
  renderNavAuth() {
    const authContainers = document.querySelectorAll('.nav-auth-container');
    const user = this.getCurrentUser();

    authContainers.forEach(container => {
      if (user) {
        container.innerHTML = `
          <div class="dropdown">
            <button class="btn btn-sm btn-royal d-flex align-items-center gap-2 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="${user.avatar || 'assets/images/chefs/chef-1.jpg'}" alt="${user.name}" class="rounded-circle" style="width: 26px; height: 26px; object-fit: cover; border: 1.5px solid var(--secondary);">
              <span class="d-none d-md-inline">${user.name.split(' ')[0]}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow">
              <li><h6 class="dropdown-header text-truncate font-heading">${user.name}</h6></li>
              <li><a class="dropdown-item" href="dashboard.html"><i class="bi bi-speedometer2"></i> Dashboard</a></li>
              <li><a class="dropdown-item" href="my-orders.html"><i class="bi bi-bag-check"></i> My Orders</a></li>
              <li><a class="dropdown-item" href="track-order.html"><i class="bi bi-geo-alt"></i> Track Order</a></li>
              <li><a class="dropdown-item" href="favourites.html"><i class="bi bi-heart"></i> Favourite Dishes</a></li>
              <li><a class="dropdown-item" href="profile.html"><i class="bi bi-person-gear"></i> Profile Settings</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-danger" href="javascript:void(0)" onclick="Auth.logout()"><i class="bi bi-box-arrow-right text-danger"></i> Logout</a></li>
            </ul>
          </div>
        `;
      } else {
        container.innerHTML = `
          <a href="login.html" class="btn btn-sm btn-outline-royal d-flex align-items-center gap-2">
            <i class="bi bi-person"></i>
            <span>Login</span>
          </a>
        `;
      }
    });

    // Dashboard opens directly without interception
  },

  // Open the Login Modal
  showLoginModal(customMessage = null) {
    window.location.href = 'login.html';
  },

  // Ensure modal HTML exists in DOM
  ensureLoginModal() {
    if (document.getElementById('loginModal')) return;

    const modalHTML = `
      <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <div>
                <h5 class="modal-title font-heading mb-1" id="loginModalLabel">Welcome to Zaffran</h5>
                <p class="small text-muted mb-0">Sign in to order, track feasts &amp; manage your profile</p>
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="alert alert-info py-2 px-3 small d-none login-notice mb-3"></div>
              


              <form id="loginModalForm" novalidate>
                <div class="mb-3">
                  <label for="loginIdentifier" class="form-label">Email or Mobile Number</label>
                  <div class="input-group">
                    <span class="input-group-text bg-light"><i class="bi bi-person"></i></span>
                    <input type="text" class="form-control" id="loginIdentifier" placeholder="Enter email or 10-digit mobile"  required>
                  </div>
                </div>

                <div class="mb-3">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <label for="loginPassword" class="form-label mb-0">Password</label>
                    <a href="forgot-password.html" class="small text-secondary fw-semibold">Forgot Password?</a>
                  </div>
                  <div class="input-group">
                    <span class="input-group-text bg-light"><i class="bi bi-lock"></i></span>
                    <input type="password" class="form-control" id="loginPassword" placeholder="Enter your password"  required>
                    <button class="btn btn-outline-secondary" type="button" id="togglePasswordBtn">
                      <i class="bi bi-eye"></i>
                    </button>
                  </div>
                </div>

                <div class="d-flex justify-content-between align-items-center mb-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="rememberMeCheck" checked>
                    <label class="form-check-label small" for="rememberMeCheck">Remember Me</label>
                  </div>
                </div>

                <button type="submit" class="btn btn-royal w-100 py-2">
                  <i class="bi bi-box-arrow-in-right"></i> Sign In to Account
                </button>
              </form>

              <div class="text-center mt-4 pt-3 border-top">
                <p class="small text-muted mb-0">
                  Don't have an account yet? 
                  <a href="register.html" class="text-primary fw-bold">Register Now</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  },

  bindEvents() {
    document.addEventListener('submit', function (e) {
      if (e.target && e.target.id === 'loginModalForm') {
        e.preventDefault();
        const identifierInput = document.getElementById('loginIdentifier');
        const passwordInput = document.getElementById('loginPassword');

        const identifier = identifierInput.value.trim();
        const password = passwordInput.value;

        if (!identifier) {
          Validation.showError(identifierInput, 'Please enter your email or mobile.');
          return;
        } else {
          Validation.clearError(identifierInput);
        }

        if (!password) {
          Validation.showError(passwordInput, 'Please enter your password.');
          return;
        } else {
          Validation.clearError(passwordInput);
        }

        const user = Auth.authenticate(identifier, password);
        if (user) {
          Auth.loginUser(user);
          const modalEl = document.getElementById('loginModal');
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();

          // Redirect to dashboard if requested or stay
          if (window.location.pathname.includes('register.html') || window.location.pathname.includes('forgot-password.html')) {
            window.location.href = 'dashboard.html';
          }
        } else {
          Validation.alert('Login Failed', 'Invalid credentials. Please verify your email/mobile and password, or use demo credentials.', 'error');
        }
      }
    });

    // Password show/hide toggle
    document.addEventListener('click', function (e) {
      const toggleBtn = e.target.closest('#togglePasswordBtn');
      if (toggleBtn) {
        const passInput = document.getElementById('loginPassword');
        const icon = toggleBtn.querySelector('i');
        if (passInput.type === 'password') {
          passInput.type = 'text';
          icon.className = 'bi bi-eye-slash';
        } else {
          passInput.type = 'password';
          icon.className = 'bi bi-eye';
        }
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Auth.init();
});
