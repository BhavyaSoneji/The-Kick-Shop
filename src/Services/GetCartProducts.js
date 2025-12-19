import { getCartDetailsFromLocalStorage } from "./cartLocalStorageMaupilation";
import products from "../../api/products.json";
import { RemoveCartProduct } from "./RemoveCartProduct";
import { cartLength, UpdateCartLength } from "./NavBar";
import { addPop } from "./ShowPopup";

let arrLocalStorage = getCartDetailsFromLocalStorage();

const updateTotals = () => {
  arrLocalStorage = getCartDetailsFromLocalStorage();
  let sub_total = 0;
  arrLocalStorage.forEach((element) => {
    sub_total += element.totalPrice;
  });
  document.querySelector(".sub-total-amount").textContent = "₹" + sub_total;
  document.querySelector(".tax-amount ").textContent = "₹" + sub_total * 0.1;
  document.querySelector(".final-total-amount").textContent =
    "₹" + parseInt(sub_total + sub_total * 0.1);
};

updateTotals();

document.addEventListener("DOMContentLoaded", () => {
  arrLocalStorage = getCartDetailsFromLocalStorage();
});

const cart_products = document.querySelector(".cart-products");
if (arrLocalStorage.length === 0) {
  cart_products.innerHTML = "No Products added to Cart";
} else {
  const cart_product_template = document.querySelector(
    "#cart-product-template"
  );
  let filterProducts = products.filter((proc) => {
    return arrLocalStorage.some((cartPro) => cartPro.id == proc.id);
  });

  filterProducts.forEach((currPro) => {
    let {
      id,
      productType,
      productName,
      productImage,
      pricing: { sellingPrice },
      stock,
    } = currPro;

    let existingItemIndex = arrLocalStorage.findIndex(
      (value) => value.id == id
    );

    const productClone = document.importNode(
      cart_product_template.content,
      true
    );
    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
    productClone.querySelector(".product-type").textContent = productType;
    productClone.querySelector(".product-name").textContent = productName;
    productClone.querySelector(".product-name").title = productName;
    productClone.querySelector(".product-img").src = productImage;
    productClone.querySelector(".product-img").alt = productName;

    const qtyElem = productClone.querySelector(".qty-amount");
    qtyElem.textContent = arrLocalStorage[existingItemIndex].qty;

    const priceElem = productClone.querySelector(".product-selling-price");
    priceElem.textContent =
      "₹" + (sellingPrice * arrLocalStorage[existingItemIndex].qty).toString();

    productClone.querySelector(".product-stock").textContent = stock;

    // + button
    productClone.querySelector(".btn-inc").addEventListener("click", (e) => {
      arrLocalStorage[existingItemIndex].qty =
        arrLocalStorage[existingItemIndex].qty + 1;
      arrLocalStorage[existingItemIndex].totalPrice =
        sellingPrice * arrLocalStorage[existingItemIndex].qty;
      qtyElem.textContent = arrLocalStorage[existingItemIndex].qty;
      priceElem.textContent =
        "₹" +
        (sellingPrice * arrLocalStorage[existingItemIndex].qty).toString();
      localStorage.setItem("CartProducts", JSON.stringify(arrLocalStorage));
      console.log(arrLocalStorage);
      updateTotals();
    });

    // - button
    productClone.querySelector(".btn-dec").addEventListener("click", (e) => {
      if (arrLocalStorage[existingItemIndex].qty > 1) {
        arrLocalStorage[existingItemIndex].qty--;
        arrLocalStorage[existingItemIndex].totalPrice =
          sellingPrice * arrLocalStorage[existingItemIndex].qty;
        qtyElem.textContent = arrLocalStorage[existingItemIndex].qty;
        priceElem.textContent =
          "₹" +
          (sellingPrice * arrLocalStorage[existingItemIndex].qty).toString();
        localStorage.setItem("CartProducts", JSON.stringify(arrLocalStorage));
      }
      updateTotals();
    });

    // Remove on click
    productClone.querySelector(".btn-remove").addEventListener("click", (e) => {
      RemoveCartProduct(e, id);
      addPop("Delete", id);
      updateTotals();
      UpdateCartLength();
      if(arrLocalStorage.length==0){
        cart_products.innerHTML = "No Products added to Cart";
      };
    });

    cart_products.appendChild(productClone);
  });
}
