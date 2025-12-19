import { getWishlistDetailsFromLocalStorage } from "./wishlistLocalStorageManipulation";
import { addPop } from "./ShowPopup";

export const addToWishlist = (e, id, productName) => {

  const arrLocalStorage = getWishlistDetailsFromLocalStorage();

  const existingIndex = arrLocalStorage.find((value) => value.id == id);

  console.log(existingIndex);

  if (existingIndex == undefined) {
    arrLocalStorage.push({ id, productName });
    addPop("Wishlist", id);
  } else {
    // Remove from wishlist if already exists
    const removeIndex = arrLocalStorage.findIndex((value) => value.id == id);
    arrLocalStorage.splice(removeIndex, 1);
    addPop("Removed from Wishlist", id);
  }
  localStorage.setItem("WishlistProducts", JSON.stringify(arrLocalStorage));
};
