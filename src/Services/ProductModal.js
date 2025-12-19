import { addToCart } from "./AddToCart";

// ProductModal.js
export function setupProductModal() {
  const modal = document.getElementById('product-modal');
  if (!modal) return;
  // Close modal on close button
  modal.querySelector('.product-modal-close').addEventListener('click', () => {
    modal.classList.remove('active');
    modal.style.display = 'none';
  });
  // Close modal on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
  });
}

function showImageUnavailable(modal, product) {
  const img = modal.querySelector('.modal-product-img');
  img.style.display = 'none';
  let placeholder = modal.querySelector('.modal-image-placeholder');
  if (!placeholder) {
    placeholder = document.createElement('div');
    placeholder.className = 'modal-image-placeholder';
    placeholder.innerHTML = `
      <div class="modal-image-unavailable-text">IMAGE</div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" alt="Nike Logo" class="modal-image-logo" />
      <div class="modal-image-unavailable-text">UNAVAILABLE</div>
    `;
    img.parentNode.appendChild(placeholder);
  }
  placeholder.style.display = 'flex';
  // Hide all right-side info except name
  modal.querySelector('.modal-product-name').textContent = product.productName || '';
  [
    '.modal-product-price',
    '.modal-product-sizes',
    '.modal-shipping-stock',
    '.modal-add-to-cart',
    '.modal-buy-now',
    '.modal-product-description',
    '.modal-product-features'
  ].forEach(sel => {
    const el = modal.querySelector(sel);
    if (el) el.style.display = 'none';
  });
}

function showImageAvailable(modal) {
  const img = modal.querySelector('.modal-product-img');
  img.style.display = '';
  const placeholder = modal.querySelector('.modal-image-placeholder');
  if (placeholder) placeholder.style.display = 'none';
  // Show all right-side info
  [
    '.modal-product-price',
    '.modal-product-sizes',
    '.modal-shipping-stock',
    '.modal-add-to-cart',
    '.modal-buy-now',
    '.modal-product-description',
    '.modal-product-features'
  ].forEach(sel => {
    const el = modal.querySelector(sel);
    if (el) el.style.display = '';
  });
}

export function openProductModal(product) {
  const modal = document.getElementById('product-modal');
  if (!modal) return;
  modal.classList.add('active');
  modal.style.display = 'flex';
  // Image
  const img = modal.querySelector('.modal-product-img');
  img.src = product.productImage || '';
  img.alt = product.productName || 'Product Image';
  // Handle image load/error
  let imageLoaded = false;
  function handleImageError() {
    if (!imageLoaded) {
      showImageUnavailable(modal, product);
    }
  }
  function handleImageLoad() {
    imageLoaded = true;
    showImageAvailable(modal);
  }
  img.onload = handleImageLoad;
  img.onerror = handleImageError;
  // If no image, show placeholder immediately
  if (!product.productImage) {
    showImageUnavailable(modal, product);
  } else {
    // Reset to show all info until image load event
    showImageAvailable(modal);
  }
  // Name
  modal.querySelector('.modal-product-name').textContent = product.productName;
  // Price
  modal.querySelector('.modal-product-price').textContent = `${product.currency || 'Rs.'} ${product.sellingPrice || product.price || ''}`;
  // Sizes
  const sizes = product.sizes || ['S', 'M', 'L', 'XL'];
  const sizeOptions = modal.querySelector('.modal-size-options');
  sizeOptions.innerHTML = '';
  sizes.forEach(size => {
    const btn = document.createElement('button');
    btn.className = 'modal-size-btn';
    btn.textContent = size;
    btn.onclick = () => {
      sizeOptions.querySelectorAll('.modal-size-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    };
    sizeOptions.appendChild(btn);
  });
  // Stock
  modal.querySelector('.modal-product-stock').textContent = product.stock ? 'In stock, ready to ship' : 'Out of stock';
  // Description
  modal.querySelector('.modal-product-description').textContent = product.description || '';
  // Features
  const features = product.features || [
    'All-over print',
    'Full button down placket and collar',
    'Front left patch pocket',
    'Natural corozo buttons throughout',
    'Curved hemline'
  ];
  const featuresList = modal.querySelector('.modal-product-features');
  featuresList.innerHTML = '';
  features.forEach(f => {
    const li = document.createElement('li');
    li.textContent = f;
    featuresList.appendChild(li);
  });
  // Add to cart/Buy now (dummy handlers)
  modal.querySelector('.modal-add-to-cart').onclick = (e) => {
    alert('Added to cart!');
    console.log(product);
    addToCart(e,product.id,product.sellingPrice);
  };
  modal.querySelector('.modal-buy-now').onclick = () => {
    alert('Proceed to buy!');
  };
  
}
