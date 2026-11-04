/**
 * ZAFFRAN ROYAL BIRYANI - MENU & DISH DATABASE
 * Full catalog of authentic dum biryanis, starters, desserts, and sides.
 */

const MenuData = [
  // --- Hyderabadi & Chicken Biryani ---
  {
    id: 'dish-1',
    name: 'Royal Hyderabadi Chicken Dum Biryani',
    category: 'hyderabadi',
    categoryName: 'Hyderabadi Biryani',
    price: 349,
    originalPrice: 399,
    rating: 4.9,
    reviews: 320,
    isVeg: false,
    isBestseller: true,
    spiceLevel: 'Royal Medium',
    image: 'assets/images/Royal Hyderabadi Chicken Dum Biryani.jpg',
    description: 'Long-grain aged Daawat basmati slow-cooked in handi with saffron-marinated tender chicken, caramelized onions & fresh mint.'
  },
  {
    id: 'dish-2',
    name: 'Nizami Chicken 65 Biryani',
    category: 'chicken',
    categoryName: 'Chicken Biryani',
    price: 369,
    originalPrice: 429,
    rating: 4.8,
    reviews: 215,
    isVeg: false,
    isBestseller: true,
    spiceLevel: 'Spicy',
    image: 'assets/images/Nizami Chicken 65 Biryani.jpg',
    description: 'Crispy, fiery South-spiced Chicken 65 boneless bites layered over fragrant dum saffron rice with roasted curry leaves.'
  },
  {
    id: 'dish-3',
    name: 'Awadhi Lucknowi Chicken Dum Biryani',
    category: 'chicken',
    categoryName: 'Chicken Biryani',
    price: 359,
    originalPrice: 410,
    rating: 4.7,
    reviews: 140,
    isVeg: false,
    isBestseller: false,
    spiceLevel: 'Mild Fragrant',
    image: 'assets/images/Awadhi Lucknowi Chicken Dum Biryani.jpg',
    description: 'Delicate Awadhi style chicken slow cooked in rich yakhni broth, ittar essence, sweet mace and milk-infused rice.'
  },

  // --- Mutton & Ambur Biryani ---
  {
    id: 'dish-4',
    name: 'Kache Gosht Ki Mutton Dum Biryani',
    category: 'mutton',
    categoryName: 'Mutton Biryani',
    price: 469,
    originalPrice: 529,
    rating: 5.0,
    reviews: 480,
    isVeg: false,
    isBestseller: true,
    spiceLevel: 'Royal Medium',
    image: 'assets/images/Kache Gosht Ki Mutton Dum Biryani.jpg',
    description: 'Tender baby lamb cuts steeped in spiced yoghurt marinade, cooked in sealed earthen deg until succulent and juicy.'
  },
  {
    id: 'dish-5',
    name: 'Traditional Ambur Mutton Biryani',
    category: 'ambur',
    categoryName: 'Ambur Biryani',
    price: 439,
    originalPrice: 499,
    rating: 4.8,
    reviews: 190,
    isVeg: false,
    isBestseller: false,
    spiceLevel: 'Spicy',
    image: 'assets/images/Traditional Ambur Mutton Biryani.jpg',
    description: 'Classic Tamil Nadu specialty made with aromatic Seeraga Samba short-grain rice, whole garlic, red chillies and curd gravy.'
  },
  {
    id: 'dish-6',
    name: 'Kolkata Shahi Mutton & Aloo Biryani',
    category: 'mutton',
    categoryName: 'Mutton Biryani',
    price: 429,
    originalPrice: 480,
    rating: 4.7,
    reviews: 165,
    isVeg: false,
    isBestseller: false,
    spiceLevel: 'Mild',
    image: 'assets/images/Kolkata Shahi Mutton & Aloo Biryani.jpg',
    description: 'Mughlai heritage biryani infused with kewra water, golden spiced potatoes, boiled egg and melt-in-mouth mutton.'
  },

  // --- Vegetarian Biryani ---
  {
    id: 'dish-7',
    name: 'Zaffran Shahi Paneer Tikka Biryani',
    category: 'veg',
    categoryName: 'Veg Biryani',
    price: 299,
    originalPrice: 349,
    rating: 4.8,
    reviews: 230,
    isVeg: true,
    isBestseller: true,
    spiceLevel: 'Medium',
    image: 'assets/images/Zaffran Shahi Paneer Tikka Biryani.jpg',
    description: 'Charcoal-tandoor smoked malai paneer cubes marinated in ajwain spices, layered with garden herbs and saffron rice.'
  },
  {
    id: 'dish-8',
    name: 'Subz Panchmel Dum Biryani',
    category: 'veg',
    categoryName: 'Veg Biryani',
    price: 279,
    originalPrice: 319,
    rating: 4.6,
    reviews: 110,
    isVeg: true,
    isBestseller: false,
    spiceLevel: 'Mild',
    image: 'assets/images/Subz Panchmel Dum Biryani.jpg',
    description: 'Hand-picked garden florets, green beans, carrots, green peas and golden cashews simmered in royal Awadhi spice pot.'
  },
  {
    id: 'dish-9',
    name: 'Kashmiri Saffron & Dry Fruit Biryani',
    category: 'veg',
    categoryName: 'Veg Biryani',
    price: 329,
    originalPrice: 389,
    rating: 4.9,
    reviews: 185,
    isVeg: true,
    isBestseller: false,
    spiceLevel: 'Sweet & Aromatic',
    image: 'assets/images/Kashmiri Saffron & Dry Fruit Biryani.jpg',
    description: 'Pampore saffron rice infused with toasted almonds, cashews, raisins, pomegranate pearls, paneer and sweet mace.'
  },

  // --- Special Biryani & Seafood ---
  {
    id: 'dish-10',
    name: 'Royal Feast Family Platter Biryani',
    category: 'special',
    categoryName: 'Special Biryani',
    price: 999,
    originalPrice: 1199,
    rating: 5.0,
    reviews: 350,
    isVeg: false,
    isBestseller: true,
    spiceLevel: 'Royal Medium',
    image: 'assets/images/Royal Feast Family Platter Biryani.jpg',
    description: 'Grand brass platter serving 4-5 guests: Hyderabadi Chicken Biryani, Mutton Dum Biryani, 4 boiled eggs, kebabs and salan.'
  },
  {
    id: 'dish-11',
    name: 'Malabar Jumbo Prawns Dum Biryani',
    category: 'special',
    categoryName: 'Special Biryani',
    price: 499,
    originalPrice: 569,
    rating: 4.9,
    reviews: 210,
    isVeg: false,
    isBestseller: false,
    spiceLevel: 'Medium',
    image: 'assets/images/Malabar Jumbo Prawns Dum Biryani.jpg',
    description: 'Fresh Arabian Sea tiger prawns tossed in crushed peppercorns and coconut shallot masala, layered with fragrant rice.'
  },
  {
    id: 'dish-12',
    name: 'Roasted Masala Egg Dum Biryani',
    category: 'special',
    categoryName: 'Special Biryani',
    price: 269,
    originalPrice: 299,
    rating: 4.6,
    reviews: 130,
    isVeg: false,
    isBestseller: false,
    spiceLevel: 'Medium',
    image: 'assets/images/Roasted Masala Egg Dum Biryani.jpg',
    description: 'Four country eggs roasted in turmeric-chilli butter glaze, nestled in dum basmati with caramelized shallots.'
  },

  // --- Starters ---
  {
    id: 'dish-13',
    name: 'Bhatti Da Murgh Tandoori (Full)',
    category: 'starters',
    categoryName: 'Starters',
    price: 399,
    originalPrice: 449,
    rating: 4.9,
    reviews: 280,
    isVeg: false,
    isBestseller: true,
    spiceLevel: 'Spicy',
    image: 'assets/images/Bhatti Da Murgh Tandoori (Full).jpg',
    description: 'Whole chicken roasted in clay bhatti with Kashmiri deghi mirch, mustard oil, hung curd and royal chaat masala.'
  },
  {
    id: 'dish-14',
    name: 'Angara Chicken Tikka Kebab',
    category: 'starters',
    categoryName: 'Starters',
    price: 299,
    originalPrice: 349,
    rating: 4.8,
    reviews: 195,
    isVeg: false,
    isBestseller: false,
    spiceLevel: 'Spicy',
    image: 'assets/images/Angara Chicken Tikka Kebab.jpg',
    description: 'Smoked juicy chicken thigh chunks skewered over open coals, served with mint coriander dip and pickled onion rings.'
  },
  {
    id: 'dish-15',
    name: 'Galouti Mutton Seekh Kebab',
    category: 'starters',
    categoryName: 'Starters',
    price: 369,
    originalPrice: 419,
    rating: 4.9,
    reviews: 210,
    isVeg: false,
    isBestseller: true,
    spiceLevel: 'Medium',
    image: 'assets/images/Galouti Mutton Seekh Kebab.jpg',
    description: 'Minced lamb infused with 16 royal spices, smoked with clove butter, char-grilled on skewers until melt-in-mouth.'
  },
  {
    id: 'dish-16',
    name: 'Zafrani Malai Paneer Tikka',
    category: 'starters',
    categoryName: 'Starters',
    price: 269,
    originalPrice: 299,
    rating: 4.7,
    reviews: 175,
    isVeg: true,
    isBestseller: false,
    spiceLevel: 'Mild',
    image: 'assets/images/Zafrani Malai Paneer Tikka.jpg',
    description: 'Creamy malai paneer blocks marinated in cashew paste, saffron, cardamom and mild yellow peppers.'
  },

  // --- Side Dishes ---
  {
    id: 'dish-17',
    name: 'Hyderabadi Mirchi Ka Salan (Special)',
    category: 'sides',
    categoryName: 'Side Dishes',
    price: 129,
    originalPrice: 159,
    rating: 4.8,
    reviews: 160,
    isVeg: true,
    isBestseller: true,
    spiceLevel: 'Tangy & Spicy',
    image: 'assets/images/Hyderabadi Mirchi Ka Salan (Special).jpg',
    description: 'Traditional Bhavnagri green chillies simmered in roasted peanuts, sesame, dry coconut and tamarind gravy.'
  },

  // --- Desserts & Beverages ---
  {
    id: 'dish-18',
    name: 'Shahi Royal Tukda with Rabri',
    category: 'desserts',
    categoryName: 'Desserts',
    price: 179,
    originalPrice: 199,
    rating: 5.0,
    reviews: 320,
    isVeg: true,
    isBestseller: true,
    spiceLevel: 'Sweet',
    image: 'assets/images/Shahi Royal Tukda with Rabri.jpg',
    description: 'Golden fried brioche soaked in saffron cardamom syrup, submerged in slow-reduced pistachio rabri and silver vark.'
  },
  {
    id: 'dish-19',
    name: 'Gulab Jamun Flambé (2 Pcs)',
    category: 'desserts',
    categoryName: 'Desserts',
    price: 129,
    originalPrice: 149,
    rating: 4.8,
    reviews: 240,
    isVeg: true,
    isBestseller: false,
    spiceLevel: 'Sweet',
    image: 'assets/images/Gulab Jamun Flambe (2 Pcs).jpg',
    description: 'Warm mawa dumplings stuffed with green cardamom and pistachios, soaked in rose water syrup.'
  },
  {
    id: 'dish-20',
    name: 'Matka Phirni in Earthen Pot',
    category: 'desserts',
    categoryName: 'Desserts',
    price: 149,
    originalPrice: 169,
    rating: 4.9,
    reviews: 180,
    isVeg: true,
    isBestseller: false,
    spiceLevel: 'Sweet',
    image: 'assets/images/Matka Phirni in Earthen Pot.jpg',
    description: 'Chilled stone-ground rice pudding flavored with saffron strands, crushed pistachios and kewra essence.'
  },
  {
    id: 'dish-21',
    name: 'Royal Alphonso Kesar Lassi',
    category: 'beverages',
    categoryName: 'Beverages',
    price: 119,
    originalPrice: 139,
    rating: 4.9,
    reviews: 390,
    isVeg: true,
    isBestseller: true,
    spiceLevel: 'Refreshing Sweet',
    image: 'assets/images/Royal Alphonso Kesar Lassi.jpg',
    description: 'Thick whipped yogurt blended with Ratnagiri Alphonso mango pulp, saffron strands and toasted almond slivers.'
  }
];

const Menu = {
  FAVOURITES_KEY: 'zaffran_favourites',

  getFavourites() {
    try {
      return JSON.parse(localStorage.getItem(this.FAVOURITES_KEY)) || [];
    } catch (e) {
      return [];
    }
  },

  isFavourite(dishId) {
    const favs = this.getFavourites();
    return favs.includes(dishId);
  },

  toggleFavourite(dishId) {
    let favs = this.getFavourites();
    let isNowFav = false;
    if (favs.includes(dishId)) {
      favs = favs.filter(id => id !== dishId);
      isNowFav = false;
      Validation.toast('Removed from favourite dishes.', 'info');
    } else {
      favs.push(dishId);
      isNowFav = true;
      Validation.toast('Added to favourite dishes!', 'success');
    }
    localStorage.setItem(this.FAVOURITES_KEY, JSON.stringify(favs));
    
    // Update button states in UI
    document.querySelectorAll(`.fav-btn-${dishId}`).forEach(btn => {
      btn.classList.toggle('active', isNowFav);
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = isNowFav ? 'bi bi-heart-fill' : 'bi bi-heart';
      }
    });

    // If on favourites page, refresh list
    if (typeof renderFavouritesPage === 'function') {
      renderFavouritesPage();
    }
    return isNowFav;
  },

  getDishById(id) {
    return MenuData.find(d => d.id === id);
  },

  // Generate HTML for food card
  createFoodCardHTML(dish) {
    const isFav = this.isFavourite(dish.id);
    return `
      <div class="col-lg-4 col-md-6 mb-4" data-category="${dish.category}" data-veg="${dish.isVeg ? 'veg' : 'non-veg'}">
        <div class="food-card">
          <div class="food-card-thumb">
            <img src="${dish.image}" alt="${dish.name}" loading="lazy">
            <button class="food-card-fav-btn fav-btn-${dish.id} ${isFav ? 'active' : ''}" 
                    title="${isFav ? 'Remove from Favourites' : 'Add to Favourites'}" 
                    onclick="Menu.toggleFavourite('${dish.id}')">
              <i class="bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}"></i>
            </button>
            ${dish.isBestseller ? '<div class="food-card-badge"><span class="badge-gold"><i class="bi bi-star-fill"></i> Bestseller</span></div>' : ''}
          </div>
          <div class="food-card-body">
            <div class="food-card-header">
              <span class="badge bg-light text-muted small">${dish.categoryName}</span>
              <div class="food-rating">
                <i class="bi bi-star-fill text-warning"></i> ${dish.rating} <span class="text-muted fw-normal">(${dish.reviews})</span>
              </div>
            </div>
            <h5 class="food-card-title">${dish.name}</h5>
            <p class="food-card-desc">${dish.description}</p>
            <div class="food-card-footer">
              <div class="food-price">
                ₹${dish.price} <span class="original-price">₹${dish.originalPrice}</span>
              </div>
              <button class="btn btn-add-cart" onclick="Cart.add('${dish.id}')">
                <i class="bi bi-cart-plus me-1"></i> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Render a list of dishes into a container
  renderList(dishes, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    if (dishes.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="bi bi-emoji-frown display-4 text-muted mb-3 d-block"></i>
          <h4>No matching delicacies found</h4>
          <p class="text-muted">Try selecting a different category or clearing your search keywords.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = dishes.map(dish => this.createFoodCardHTML(dish)).join('');
  }
};
