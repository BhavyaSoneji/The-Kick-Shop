import { getWishlistDetailsFromLocalStorage } from "./wishlistLocalStorageManipulation";

const arrLocalStorage = getWishlistDetailsFromLocalStorage();
export const RemoveWishlistProduct = (e, id) => {
  const deleteIndx = arrLocalStorage.findIndex((value) => value.id == id);
  arrLocalStorage.splice(deleteIndx, 1);
  localStorage.setItem("WishlistProducts", JSON.stringify(arrLocalStorage));
  document.querySelector(`#card${id}`).remove();
};
