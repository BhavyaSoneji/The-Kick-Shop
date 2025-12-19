import { getWishlistDetailsFromLocalStorage } from "./wishlistLocalStorageManipulation";
import products from "../../api/products.json";
import { RemoveWishlistProduct } from "./RemoveWishlistProduct";
import { wishlistLength, UpdateWishlistLength, UpdateCartLength } from "./NavBar";
import { addPop } from "./ShowPopup";
import { addToCart } from "./AddToCart";

let arrLocalStorage = getWishlistDetailsFromLocalStorage();

document.addEventListener("DOMContentLoaded", () => {
  arrLocalStorage = getWishlistDetailsFromLocalStorage();
});

const wishlist_products = document.querySelector(".wishlist-products");
if (arrLocalStorage.length === 0) {
  wishlist_products.innerHTML = `
    <div class="empty-wishlist">
      <i class="fa-solid fa-heart-crack"></i>
      <p>No Products added to Wishlist</p>
      <a href="./ProductsPage.html" class="btn-btn-black">Continue Shopping</a>
    </div>
  `;
} else {
  const wishlist_product_template = document.querySelector(
    "#wishlist-product-template"
  );
  let filterProducts = products.filter((proc) => {
    return arrLocalStorage.some((wishlistPro) => wishlistPro.id == proc.id);
  });

  filterProducts.forEach((currPro) => {
    let {
      id,
      productType,
      productName,
      productImage,
      pricing: { sellingPrice, originalPrice, currency },
      stock,
    } = currPro;

    const productClone = document.importNode(
      wishlist_product_template.content,
      true
    );
    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
    productClone.querySelector(".product-type").textContent = productType;
    productClone.querySelector(".product-name").textContent = productName;
    productClone.querySelector(".product-name").title = productName;
    productClone.querySelector(".product-img").src = productImage;
    productClone.querySelector(".product-img").alt = productName;

    productClone.querySelector(".product-selling-price").textContent =
      `${currency} ${sellingPrice}`;
    productClone.querySelector(".product-orignal-price").textContent =
      `${currency} ${originalPrice}`;

    productClone.querySelector(".product-stock").textContent = stock;

    // Add to Cart button
    productClone
      .querySelector(".btn-add-to-cart")
      .addEventListener("click", (e) => {
        addToCart(e, id, sellingPrice);
        UpdateCartLength();
        addPop("Add", id);
      });

    // Remove from wishlist
    productClone.querySelector(".btn-remove").addEventListener("click", (e) => {
      RemoveWishlistProduct(e, id);
      addPop("Removed from Wishlist", id);
      UpdateWishlistLength();
      arrLocalStorage = getWishlistDetailsFromLocalStorage();
      if (arrLocalStorage.length == 0) {
        wishlist_products.innerHTML = `
          <div class="empty-wishlist">
            <i class="fa-solid fa-heart-crack"></i>
            <p>No Products added to Wishlist</p>
            <a href="./ProductsPage.html" class="btn-btn-black">Continue Shopping</a>
          </div>
        `;
      }
    });

    wishlist_products.appendChild(productClone);
  });
}
