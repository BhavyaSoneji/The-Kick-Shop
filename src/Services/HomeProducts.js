import { addToCart } from "./AddToCart";
import { addToWishlist } from "./AddToWishlist";
import { cartLength, UpdateCartLength, UpdateWishlistLength } from "./NavBar";
import { openProductModal, setupProductModal } from './ProductModal.js';
const productContainer = document.querySelector(".product-container");
const productTemplate = document.querySelector(".product-card-template");

export const model = ()=>{
  return `
  <div class="product-modal-content">
    <span class="product-modal-close">&times;</span>
    <div class="modal-main">
      <div class="modal-left">
        <img class="modal-product-img" src="" alt="Product Image" />
      </div>
      <div class="modal-right">
        <h2 class="modal-product-name"></h2>
        <p class="modal-product-price"></p>
        <div class="modal-product-sizes">
          <span>SIZE</span>
          <div class="modal-size-options"></div>
        </div>
        <div class="modal-shipping-stock">
          <div class="modal-shipping"><i class="fa fa-globe"></i> Free worldwide shipping</div>
          <div class="modal-stock"><span class="modal-stock-dot"></span> <span class="modal-product-stock"></span></div>
        </div>
        <button class="modal-add-to-cart">Add to cart</button>
        <button class="modal-buy-now">Buy it now</button>
        <div class="modal-product-description"></div>
        <ul class="modal-product-features"></ul>
      </div>
    </div>
  </div>
  `
};

export const homeProducts = (products) => {
  if (!products) return false;

  products.forEach((curProd) => {
    const {
      id,
      productType,
      productName,
      productImage,
      rating,
      description,
      pricing: { sellingPrice, originalPrice, currency },
      stock,
      quantity,
    } = curProd;

    const productClone = document.importNode(productTemplate.content, true);

    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
    productClone.querySelector(".product-type").textContent = productType;
    productClone.querySelector(".product-name").textContent = productName;
    // productClone.querySelector('.product-description').textContent = description;
    productClone.querySelector(".product-img").src = productImage;
    productClone.querySelector(".product-img").alt = productName;
    productClone.querySelector(".product-rating").textContent = `Rating : ${rating}/5`
    productClone.querySelector(
      ".product-selling-price"
    ).textContent = `${currency} ${sellingPrice}`;
    productClone.querySelector(
      ".product-orignal-price"
    ).textContent = `${currency} ${originalPrice}`;
    productClone.querySelector(".product-stock").textContent = stock;

    productClone
      .querySelector(".cart-btn")
      .addEventListener("click", (e) => {
        addToCart(e, id, sellingPrice);
        UpdateCartLength();
      });

    productClone
      .querySelector(".wishlist-btn")
      .addEventListener("click", (e) => {
        addToWishlist(e, id, productName);
        UpdateWishlistLength();
      });

    // Add event listener for modal popup
    productClone.querySelector('.product-card-container').addEventListener('click', (e) => {
      if (e.target.closest('.btn-container')) return;
      openProductModal({
        productImage,
        productName,
        productType,
        rating,
        description,
        sellingPrice,
        originalPrice,
        currency,
        stock
      });
    });

    productContainer.appendChild(productClone);
  });
};

// Setup modal close logic on DOMContentLoaded
if (!window._productModalCloseSetup) {
  window._productModalCloseSetup = true;
  document.addEventListener('DOMContentLoaded', setupProductModal);
}
