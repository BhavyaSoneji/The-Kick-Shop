import products from "../../api/nike_new_releases_2022_2025.json";
import { addToCart } from "../Services/AddToCart";
import { addToWishlist } from "../Services/AddToWishlist";
import { UpdateCartLength, UpdateWishlistLength } from "./NavBar";
import { openProductModal, setupProductModal } from './ProductModal.js';

const productContainer = document.querySelector(".product-container");
const productTemplate = document.querySelector(".product-card-template");
let productType_AIP = [];

/* -------- Fetch category + subcategory from URL -------- */
const fetchSubCategory = () => {
  const url = window.location.search;
  const params = new URLSearchParams(url);
  const category = params.get("category");
  const subCategory = params.get("subCategory");
  return { category, subCategory };
};

/* -------- Render Products -------- */
export const getProducts = (category, subCategory) => {
  productContainer.innerHTML = "";
  productType_AIP = [];

  products.forEach((curProd) => {
    if (
      (!category || curProd.gender.toLowerCase() === category.toLowerCase()) &&
      (!subCategory ||
        curProd.productType.toLowerCase() === subCategory.toLowerCase())
    ) {
      const {
        id,
        productType,
        productName,
        productImage,
        rating,
        pricing: { sellingPrice, originalPrice, currency },
        stock,
        description
      } = curProd;

      productType_AIP.push(productType);

      const productClone = document.importNode(productTemplate.content, true);
      productClone.querySelector('#cardValue').setAttribute('id', `card${id}`);
      productClone.querySelector('.product-type').textContent = productType;
      productClone.querySelector('.product-name').textContent = productName;
      productClone.querySelector('.product-img').src = productImage;
      productClone.querySelector('.product-img').alt = productName;
      productClone.querySelector('.product-rating').textContent = `Rating : ${rating}/5`;
      productClone.querySelector('.product-selling-price').textContent = `${currency} ${sellingPrice}`;
      productClone.querySelector('.product-orignal-price').textContent = `${currency} ${originalPrice}`;
      productClone.querySelector('.product-stock').textContent = stock;

      productClone.querySelector('.cart-btn').addEventListener('click', (e) => {
        addToCart(e, id, sellingPrice);
        UpdateCartLength();
      });

      productClone.querySelector('.wishlist-btn').addEventListener('click', (e) => {
        addToWishlist(e, id, productName);
        UpdateWishlistLength();
      });

      // Add event listener for modal popup
      productClone.querySelector('.product-card-container').addEventListener('click', (e) => {
        if (e.target.closest('.btn-container')) return;
        console.log(curProd);
        
        openProductModal(curProd);
      });

      productContainer.appendChild(productClone);
    }
  });
};
export const DropDownEvent = () => {
  document.querySelector(".dropdown-menu").addEventListener("click", (e) => {
    console.log(e.target);
    getProducts(e.target.textContent, null);
  });
};

/* -------- Manage Active State -------- */
const setActive = (selectedElement) => {
  document
    .querySelectorAll(
      ".list-catergory li, .list-catergory-item-men ul li, .list-catergory-item-women ul li"
    )
    .forEach((el) => el.classList.remove("active"));
  selectedElement.classList.add("active");
};

/* -------- Build Subcategory Menus -------- */
const buildSubCategoryMenus = () => {
  const UniqueTypes = new Set(productType_AIP);
  const ulMen = document.createElement("ul");
  const ulWomen = document.createElement("ul");

  UniqueTypes.forEach((value) => {
    // Men subcategory
    const li1 = document.createElement("li");
    const a1 = document.createElement("a");
    a1.textContent = value;
    li1.appendChild(a1);
    ulMen.appendChild(li1);

    a1.addEventListener("click", (e) => {
      e.preventDefault();
      getProducts("Men", value);
      setActive(li1);
    });

    // Women subcategory
    const li2 = document.createElement("li");
    const a2 = document.createElement("a");
    a2.textContent = value;
    li2.appendChild(a2);
    ulWomen.appendChild(li2);

    a2.addEventListener("click", (e) => {
      e.preventDefault();
      getProducts("Women", value);
      setActive(li2);
    });
  });

  ulMen.classList.add("sub-category");
  ulWomen.classList.add("sub-category");

  document.querySelector(".list-catergory-item-men").appendChild(ulMen);
  document.querySelector(".list-catergory-item-women").appendChild(ulWomen);
};

/* -------- Category Clicks (Men/Women) -------- */
const setupCategoryClicks = () => {
  const menCategory = document.querySelector(".list-catergory-item-men");
  const womenCategory = document.querySelector(".list-catergory-item-women");

  if (menCategory) {
    menCategory.addEventListener("click", (e) => {
      e.preventDefault();
      if(e.target.tagName == "LI"){
        if (!(e.target.classList.contains("open"))) {
          getProducts("Men", null);
          setActive(menCategory);
        }
        else{
          getProducts(null, null);
        }
        menCategory.classList.toggle("open"); // toggle subcategory
      }
    });
  }

  if (womenCategory) {
    womenCategory.addEventListener("click", (e) => {
     if(e.target.tagName == "LI"){
        if (!(e.target.classList.contains("open"))) {
          getProducts("Women", null);
          setActive(womenCategory);
        }
        else{
          getProducts(null, null);
        }
        womenCategory.classList.toggle("open"); // toggle subcategory
      }
    });
  }
};

/* -------- Initialize -------- */
document.addEventListener("DOMContentLoaded", () => {
  const { category, subCategory } = fetchSubCategory();
  getProducts(category, subCategory);
  buildSubCategoryMenus();
  setupCategoryClicks();
});

// Setup modal close logic on DOMContentLoaded
if (!window._productModalCloseSetup) {
  window._productModalCloseSetup = true;
  document.addEventListener('DOMContentLoaded', setupProductModal);
}
