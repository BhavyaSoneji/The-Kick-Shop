import { getCartDetailsFromLocalStorage } from "./cartLocalStorageMaupilation";
import { getWishlistDetailsFromLocalStorage } from "./wishlistLocalStorageManipulation";

export const cartLength = () => {
  const length = getCartDetailsFromLocalStorage().length;
  return length == null ? 0 : length;
};

export const wishlistLength = () => {
  const length = getWishlistDetailsFromLocalStorage().length;
  return length == null ? 0 : length;
};

export const UpdateCartLength = () => {
  document.querySelector(".cart-count").innerHTML = cartLength();
};

export const UpdateWishlistLength = () => {
  document.querySelector(".wishlist-count").innerHTML = wishlistLength();
};

export const NavBar = () => {
  return `
  <div class="overlay"></div>
  <div class="section-logo">
  <img src="assets/logo.png" class="logo" />
  </div>
  <div class="flex-nav-link">
  <ul>
  <li class="nav-list dropdown">
  <a class="nav-link" href="./ProductsPage.html">Shop</a>
  <ul class="dropdown-menu">
  <li><a class="dropdown-link">Men</a></li>
  <li><a class="dropdown-link">Women</a></li>
  </ul>
            </li>
            <li class="nav-list"><a href="" class="nav-link">About</a></li>
            <li class="nav-list"><a href="" class="nav-link">Theme</a></li>
            </ul>
            </div>
            <div class="icons-section">
            <div class="btn-btn-black wishlist">
            <i class="fa-solid fa-heart"></i>
            <span class="wishlist-count">${wishlistLength()}</span>
              </div>
            <div class="btn-btn-black cart">
            <i class="fa-solid fa-bag-shopping"></i>
            <span class="cart-count">${cartLength()}</span>
              </div>
              <div class="hamburger">
              <i class="fa-solid fa-bars"></i>
              </div>
              </div>`;
};
