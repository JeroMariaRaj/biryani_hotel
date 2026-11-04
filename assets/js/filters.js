/**
 * ZAFFRAN ROYAL BIRYANI - FILTERING & SEARCH CONTROLLERS
 * Manages live search and category switches on Menu, Projects, and Blog.
 */

const Filters = {
  // Menu Filtering
  initMenuFilters() {
    const searchInput = document.getElementById('menuSearchInput');
    const filterButtons = document.querySelectorAll('.menu-filter-btn');
    const vegFilterCheck = document.getElementById('vegOnlyToggle');
    const sortSelect = document.getElementById('menuSortSelect');

    let currentCategory = 'all';
    let currentSearch = '';
    let vegOnly = false;
    let sortBy = 'default';

    function applyFilters() {
      let filtered = [...MenuData];

      // Category
      if (currentCategory !== 'all') {
        filtered = filtered.filter(item => item.category === currentCategory);
      }

      // Veg toggle
      if (vegOnly) {
        filtered = filtered.filter(item => item.isVeg === true);
      }

      // Search keyword
      if (currentSearch) {
        const query = currentSearch.toLowerCase();
        filtered = filtered.filter(item => 
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.categoryName.toLowerCase().includes(query)
        );
      }

      // Sort
      if (sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      }

      Menu.renderList(filtered, '#menuItemsContainer');
    }

    if (filterButtons.length > 0) {
      filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
          filterButtons.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          currentCategory = this.getAttribute('data-filter') || 'all';
          applyFilters();
        });
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        currentSearch = this.value.trim();
        applyFilters();
      });
    }

    if (vegFilterCheck) {
      vegFilterCheck.addEventListener('change', function () {
        vegOnly = this.checked;
        applyFilters();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        sortBy = this.value;
        applyFilters();
      });
    }

    // Initial render
    applyFilters();
  },

  // Project Portfolio Filtering
  initProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length > 0) {
      filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
          filterButtons.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          const filter = this.getAttribute('data-filter');

          projectItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    }
  },

  // Blog Filtering
  initBlogFilters() {
    const searchInput = document.getElementById('blogSearchInput');
    const categoryLinks = document.querySelectorAll('.blog-cat-link');
    const blogCards = document.querySelectorAll('.blog-item');

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();
        blogCards.forEach(card => {
          const title = card.querySelector('.blog-title').textContent.toLowerCase();
          const desc = card.querySelector('.blog-desc') ? card.querySelector('.blog-desc').textContent.toLowerCase() : '';
          if (title.includes(query) || desc.includes(query)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    }

    if (categoryLinks.length > 0) {
      categoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          categoryLinks.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
          const cat = this.getAttribute('data-category');

          blogCards.forEach(card => {
            if (cat === 'all' || card.getAttribute('data-category') === cat) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }
  }
};
