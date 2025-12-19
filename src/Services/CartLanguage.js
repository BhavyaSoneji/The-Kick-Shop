import { getCurrentLanguage, getTranslation } from "./translations.js";
import { addLanguageSwitcherToNavbar } from "./LanguageSwitcher.js";

// Initialize language support for cart page
export function initCartLanguage() {
  // Add language switcher to navbar
  addLanguageSwitcherToNavbar();
  
  // Update cart page content
  updateCartPageContent();
}

// Update cart page content based on selected language
function updateCartPageContent() {
  const currentLang = getCurrentLanguage();
  
  // Update quantity text
  const qtyTexts = document.querySelectorAll('.qty-text');
  qtyTexts.forEach(text => {
    text.textContent = getTranslation('quantity', currentLang) + ' :';
  });
  
  // Update stock text
  const stockTexts = document.querySelectorAll('.product-stock-text');
  stockTexts.forEach(text => {
    text.textContent = getTranslation('availableStock', currentLang) + ' :';
  });
  
  // Update remove button text if exists
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(button => {
    button.textContent = getTranslation('removeFromCart', currentLang);
  });
  
  // Update total price text if exists
  const totalPriceTexts = document.querySelectorAll('.total-price-text');
  totalPriceTexts.forEach(text => {
    if (text.textContent.includes('Total Price')) {
      text.textContent = getTranslation('totalPrice', currentLang) + ':';
    }
  });
  
  // Update checkout button if exists
  const checkoutButton = document.querySelector('.checkout-btn');
  if (checkoutButton) {
    checkoutButton.textContent = getTranslation('checkout', currentLang);
  }
  
  // Update continue shopping button if exists
  const continueShoppingButton = document.querySelector('.continue-shopping-btn');
  if (continueShoppingButton) {
    continueShoppingButton.textContent = getTranslation('continueShopping', currentLang);
  }
}