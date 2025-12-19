export const getWishlistDetailsFromLocalStorage = () => {
  let wishlistProducts = localStorage.getItem("WishlistProducts");

  if (wishlistProducts == null) {
    return [];
  } else {
    wishlistProducts = JSON.parse(wishlistProducts);
    return wishlistProducts;
  }
};
