import { getCartDetailsFromLocalStorage } from "./cartLocalStorageMaupilation";

const arrLocalStorage = getCartDetailsFromLocalStorage();
export const RemoveCartProduct = (e,id)=>{
    const deleteIndx = arrLocalStorage.findIndex((value)=>value.id==id);
    arrLocalStorage.splice(deleteIndx,1);
    localStorage.setItem("CartProducts",JSON.stringify(arrLocalStorage));
    document.querySelector(`#card${id}`).remove();

};