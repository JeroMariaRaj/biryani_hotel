# ZAFFRAN – Premium Biryani House & Takeaway HTML Website Template

**Theme:** Modern Indian Culinary Luxury  
**Aesthetic:** Authentic Hyderabadi & Awadhi Dum Cooking Heritage  
**Target Market:** ThemeForest, TemplateMonster, Creative Market, Direct Restaurant Clients  
**Technology Stack:** HTML5, CSS3, Bootstrap 5.3.3, Vanilla JavaScript (ES6), LocalStorage  

---

## 1. Project Overview

**Zaffran Royal Biryani House & Takeaway** is a luxury commercial HTML5 website template specifically engineered for high-end biryani restaurants, takeaway cloud kitchens, and event catering companies.

Unlike generic corporate or SaaS templates, Zaffran is built from the ground up to reflect the sensory richness of traditional Indian dum cooking: deep maroon, saffron gold, warm terracotta, dark charcoal, and warm cream hues, combined with editorial food typography (*Playfair Display* and *DM Sans*).

The template delivers an end-to-end interactive restaurant customer journey:
- **Interactive Menu Browsing:** Live search, category tabs (Hyderabadi, Chicken, Mutton, Ambur, Veg, Starters, Desserts), Pure-Veg switch, and price/rating sorting.
- **Cart & Simulated Checkout:** Live item quantity updates, promo coupons (`ZAFFRAN10`, `DUMFREE`), delivery fee calculations, and instant order placement generating a real order reference ID.
- **Live Visual Order Tracking:** 6-stage cooking-to-delivery animated timeline with simulated step advancement.
- **Customer Dashboard:** Responsive customer portal with order history, saved delivery addresses (CRUD), profile management, and saved favourite dishes.
- **Party & Bulk Catering Estimator:** Interactive guest and handi deg calculator with instant portion estimation.
- **Theme & Direction Controls:** Full Dark Mode and functional Right-to-Left (RTL) mode with localStorage persistence.

---

## 2. Technology Stack & Supporting Libraries

### Core Technologies
- **HTML5:** Semantic, accessible markup with OpenGraph and SEO meta tags.
- **CSS3:** Custom design system with CSS custom properties (`--primary: #741C24`, `--secondary: #D99A32`, `--bg-warm: #FFF8EF`, `--surface: #FFFFFF`).
- **Bootstrap 5.3.3:** Responsive grid and utility system.
- **Vanilla JavaScript (ES6):** Modular, clean JavaScript with zero backend dependencies.

### Supporting Libraries (Included Locally)
- **Bootstrap Icons 1.11.3:** Sharp vector iconography for culinary indicators and controls.
- **Swiper 11:** Smooth touch carousels for food showcases and customer testimonials.
- **AOS (Animate on Scroll):** Elegant scroll reveal transitions.
- **SweetAlert2 11:** Custom-styled modal alerts, confirmations, and toast notifications.

### Frontend Storage (`localStorage`)
The entire user journey operates locally via `localStorage` without requiring a database or server:
- `zaffran_theme`: Light or Dark theme preference
- `zaffran_rtl`: LTR or RTL direction state
- `zaffran_cart`: Shopping cart items and quantities
- `zaffran_applied_coupon`: Active promo discount codes
- `zaffran_users`: Registered customer accounts
- `zaffran_current_user`: Active login session
- `zaffran_orders`: Active and archived order records
- `zaffran_favourites`: Customer favourite dish IDs
- `zaffran_saved_addresses`: Saved delivery locations

---

## 3. Complete Page Directory (26 HTML Pages)

Every main page strictly maintains a clean layout with **at most 7 main content sections**, as required by marketplace standards:

| File Name | Page Title | Key Features |
|---|---|---|
| `index.html` | Home Page 1 (Royal Landing) | Hero, Signature Biryanis, Culinary Story, Why Choose Us, Party Catering, Testimonials & CTA |
| `index-2.html` | Home Page 2 (Editorial Feast) | Full-screen hero, Chef Altaf's Reserve, Interactive Showcase, 4-Stage Dum Ritual, Bestsellers, Atmosphere Gallery, Table Booking CTA |
| `about.html` | About Us | 40-Year Heritage, Mission & Values, Dum Pukht Science, Master Chefs Team, Milestones & Awards, Experience CTA |
| `menu.html` | Royal Menu Catalog | Live Search, 10 Categories, Veg Toggle, Sort Filter, Price Strikethrough, Favourite Toggle, Add to Cart |
| `services.html` | Restaurant Services | Fine Dining, Takeaway, Home Delivery, Party Orders, Wedding Catering, Corporate Feasts, Family Combos |
| `service-details.html`| Service Details | Dynamic service switcher (`?service=wedding`, `party`, `dining`, etc.), overview, features, gallery, packages, FAQs |
| `party-orders.html` | Bulk & Party Orders | Event categories, package tiers, interactive guest and deg calculator, validated enquiry form, catering benefits |
| `blog.html` | The Royal Chronicle | Featured story, search, category pills, 6 in-depth culinary essays, popular posts sidebar, newsletter |
| `blog-details.html` | Article Reading View | Table of contents, historical lore, chef tips, Pampore saffron breakdown, author bio, social sharing |
| `contact.html` | Contact & Reservations | Info cards, validated contact form, Google Maps frame, dining & takeaway hours, FAQ accordion, CTA |
| `pricing.html` | Package Pricing | Solo meals, Nizam couple combos, family platters, small party packs, wedding catering tiers, corporate plans |
| `login.html` | Customer Login | Standalone login page, Google & Apple sign-in buttons, credentials form, responsive Theme/RTL toggles |
| `register.html` | Customer Registration | Separate register page, input validation, saves user to localStorage, redirect to login page |
| `forgot-password.html`| Password Recovery | Simulated password recovery with instant demo credentials hint |
| `cart.html` | Shopping Cart | Reactive items list, +/- quantity, remove item, subtotal, delivery fee, coupons (`ZAFFRAN10`, `DUMFREE`), checkout button |
| `checkout.html` | Checkout Simulation | Customer info pre-fill, address input, payment method (COD / Demo Online), order creation with unique ID |
| `dashboard.html` | Customer Dashboard | Welcome header, 4 metric counters, active order tracking alert, recent orders table, recommended biryani |
| `my-orders.html` | My Orders List | Status badges, items list, destination, invoice receipt modal simulator, quick track/reorder buttons |
| `track-order.html` | Live Order Tracking | 6-stage animated timeline (Placed &rarr; Confirmed &rarr; Dum Prep &rarr; Packed &rarr; Out for Delivery &rarr; Delivered), advance stage demo button |
| `favourites.html` | Saved Favourites | Grid of customer saved delicacies with one-click Add to Cart and heart toggle removal |
| `order-history.html` | Past Order Archive | Completed feasts table with one-click Reorder button (instantly repopulates active cart) |
| `profile.html` | Profile Settings | Update Name, Phone, Email, avatar selection, password change with feedback |
| `addresses.html` | Saved Addresses | Address cards (Home, Office), Set Default, Delete, Add New Address modal |
| `404.html` | Error 404 Page | Themed "Lost in the aroma of spices" visual with return home and menu buttons |
| `coming-soon.html` | Opening Soon | Gachibowli flagship announcement, live ticking countdown, VIP newsletter capture |
| `maintenance.html` | Kitchen Maintenance | Themed "Firewood deg care" message, estimated return timer, direct phone hotline |

---

## 4. How to Run Locally

This template is strictly frontend-based and requires **no build tools, no Node.js, and no database**.

### Option A: Direct Browser Launch
1. Unzip the project folder or navigate to `c:\Users\Jero\Desktop\biryani\`.
2. Double-click on `index.html` to open it directly in Google Chrome, Microsoft Edge, Firefox, or Safari.

### Option B: VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension by *Ritwick Dey* (if not already installed).
3. Right-click on `index.html` and choose **"Open with Live Server"**.
4. The site will launch on `http://127.0.0.1:5500/index.html`.

---

## 5. Demo Customer Credentials & Promo Codes

### Pre-Seeded Customer Account
For immediate exploration, a demo account is pre-configured:
- **Email:** `demo@zaffranbiryani.com`
- **Mobile Number:** `9876543210`
- **Password:** `password123`

You can also register any new account on `register.html` and log in immediately.

### Working Promo Coupon Codes
Enter any of these codes on `cart.html`:
- `ZAFFRAN10` &rarr; 10% Royal Welcome Discount
- `DUMFREE` &rarr; Free Delivery (Waives the ₹50 fee)
- `FESTIVE50` &rarr; ₹50 Flat Festive Discount

---

## 6. Color Palette & Typography

| Element | Hex Code | Purpose |
|---|---|---|
| **Primary** | `#741C24` | Deep Maroon (Headings, buttons, royal branding) |
| **Secondary** | `#D99A32` | Saffron Gold (Badges, accents, highlights) |
| **Accent** | `#C65D3A` | Warm Terracotta (Cart badge, spice tags) |
| **Warm Background** | `#FFF8EF` | Cream background for authentic luxury warmth |
| **Surface** | `#FFFFFF` | Card surfaces and input containers |
| **Main Text** | `#292421` | Dark Charcoal for sharp readability |
| **Muted Text** | `#766B63` | Subtitles, descriptions, metadata |
| **Dark Background** | `#171311` | Dark mode background |
| **Dark Surface** | `#241E1B` | Dark mode card and modal surface |

### Typography
- **Headings:** `'Playfair Display', Georgia, serif`
- **Body & Controls:** `'DM Sans', -apple-system, sans-serif`

---

## 7. Folder Structure

```
biryani/
│
├── index.html                  # Home 1 - Royal Landing
├── index-2.html                # Home 2 - Editorial Feast
├── about.html                  # About Us & 40-Year Heritage
├── menu.html                   # Royal Menu Catalog & Filters
├── services.html               # Restaurant Services Overview
├── service-details.html        # Dynamic Service Detail Page
├── party-orders.html           # Party & Bulk Orders Estimator
├── projects.html               # Real-World Catering Events Portfolio
├── project-details.html        # Individual Event Case Study
├── blog.html                   # The Royal Chronicle (Food Blog)
├── blog-details.html           # In-Depth Article Reading Experience
├── contact.html                # Contact Us, Map & Table Reservation
├── pricing.html                # Packages & Catering Pricing
├── register.html               # Customer Registration Page
├── forgot-password.html        # Password Recovery Simulation
├── cart.html                   # Shopping Cart & Promo Coupons
├── checkout.html               # Simulated Checkout & Payment
├── dashboard.html              # Customer Dashboard Overview
├── my-orders.html              # My Orders & Invoice Modal
├── track-order.html            # Live 6-Stage Visual Order Tracking
├── favourites.html             # Saved Favourite Dishes
├── order-history.html          # Order History & One-Click Reorder
├── profile.html                # My Profile & Avatar Selection
├── addresses.html              # Saved Delivery Addresses (CRUD)
├── 404.html                    # Themed Error 404 Page
├── coming-soon.html            # Opening Soon Countdown Page
├── maintenance.html            # Themed Kitchen Maintenance Page
│
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css   # Bootstrap 5.3.3 Core
│   │   ├── bootstrap-icons.css # Bootstrap Icons CSS
│   │   ├── swiper-bundle.min.css # Swiper 11 Carousel CSS
│   │   ├── aos.css             # Animate on Scroll CSS
│   │   ├── sweetalert2.min.css # SweetAlert2 Alerts CSS
│   │   ├── style.css           # Luxury Culinary Design System
│   │   ├── dark-mode.css       # Full Dark Mode Styling
│   │   ├── rtl.css             # Right-to-Left (RTL) Layout System
│   │   └── responsive.css      # Custom Breakpoint Adjustments
│   │
│   ├── js/
│   │   ├── bootstrap.bundle.min.js
│   │   ├── swiper-bundle.min.js
│   │   ├── aos.js
│   │   ├── sweetalert2.all.min.js
│   │   ├── theme.js            # Dark Mode & RTL Controller
│   │   ├── validation.js       # Form Validation & Notifications
│   │   ├── auth.js             # Customer Authentication & Login Modal
│   │   ├── menu.js             # Menu Catalog & Favourites Logic
│   │   ├── cart.js             # Shopping Cart & Coupon Calculations
│   │   ├── checkout.js         # Checkout Processing & Order Creation
│   │   ├── orders.js           # Live Tracking Timeline & Reordering
│   │   ├── dashboard.js        # Dashboard Overview, Profile, Addresses
│   │   ├── filters.js          # Menu, Project & Blog Filtering
│   │   └── main.js             # UI Interactions & Swiper Initialization
│   │
│   ├── images/
│   │   ├── hero/               # Page Banners & Hero Images
│   │   ├── biryani/            # Individual Authentic Biryani Dishes
│   │   ├── starters/           # Tandoori Starters & Kebabs
│   │   ├── desserts/           # Awadhi Sweets & Royal Beverages
│   │   ├── restaurant/         # Ambience, Interiors & Clay Pot Kitchen
│   │   ├── chefs/              # Master Ustads & Culinary Team
│   │   ├── catering/           # Outdoor Banquet Setups
│   │   ├── projects/           # High-Resolution Event Showcases
│   │   ├── blog/               # Editorial Chronicle Photography
│   │   └── icons/              # SVG Logos (Default, Light, Favicon)
│   │
│   └── fonts/
│
└── README.md                   # Documentation Manual
```

---

## 8. Quality Assurance & Browser Compatibility

Tested and verified across all standard responsive viewport widths:
- **320px & 375px:** Small Mobile devices (no overflow, touch-friendly buttons)
- **425px:** Standard Mobile screens
- **768px:** Tablets and iPad Portrait
- **1024px:** iPad Pro & Small Laptops
- **1366px:** Standard Desktops
- **1600px & 1920px:** Full HD & Ultra-wide displays

**Cross-Browser Compatibility:**
- Google Chrome (Latest)
- Mozilla Firefox (Latest)
- Microsoft Edge (Latest)
- Apple Safari (macOS & iOS)
- Android Chrome

---

© 2026 Zaffran Royal Biryani & Takeaway. Designed for ThemeForest & TemplateMonster.
