export const getCartDetailsFromLocalStorage = ()=>{
    let cartProducts = localStorage.getItem("CartProducts");
    console.log(cartProducts);
    
    if(!cartProducts){
        return [];
    }
    else{
        cartProducts = JSON.parse(cartProducts);
        return cartProducts;
    }
}