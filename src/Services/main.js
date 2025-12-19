import { homeProducts } from "./HomeProducts";
import productsData from "../../api/products.json";

const list = document.querySelector(".list");
const items = document.querySelectorAll(".list .item");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const dots = document.querySelectorAll(".dots .dots-list li");

// Initialize language switcher
document.addEventListener('DOMContentLoaded', () => {
  addLanguageSwitcherToNavbar();
  updatePageContent();
});

let active = 0;

const reloadSlidder = (withTransition = true) => {
  // Slides the image
  list.style.transition = withTransition ? `0.3s ease` : `none`;
  list.style.transform = `translateX(-${active * 100}%)`;
  //changes the acitve dot
  document
    .querySelector(".dots .dots-list li.active")
    .classList.remove("active");
  dots[active].classList.add("active");

  document.querySelector(".list .item.active")?.classList.remove("active");
  items[active].classList.add("active");
};

setInterval(() => {
  active += 1;
  if (active == items.length) {
    active = 0;
    reloadSlidder(false);
  } else {
    reloadSlidder(true);
  }
}, 5000);

next.addEventListener("click", () => {
  active += 1;
  if (active == items.length) {
    active = 0;
    reloadSlidder(false);
  } else {
    reloadSlidder(true);
  }
});
prev.addEventListener("click", () => {
  active -= 1;
  if (active == -1) {
    active = items.length - 1;
    reloadSlidder(false);
  } else {
    reloadSlidder(true);
  }
});

items[active].classList.add("active");

// Calling The JSON file for products 
homeProducts(productsData);
