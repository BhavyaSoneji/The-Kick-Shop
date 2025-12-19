import { getCartDetailsFromLocalStorage} from "./cartLocalStorageMaupilation";
import { addPop } from "./ShowPopup";

export const addToCart = (e, id,sellingPrice) => {

  const arrLocalStorage = getCartDetailsFromLocalStorage();

  const existingIndex = arrLocalStorage.find((value)=>value.id == id); 
  
  console.log(existingIndex);
  
  if(existingIndex==undefined){
    let qty = 1;
    let totalPrice = sellingPrice;
    arrLocalStorage.push({id,sellingPrice,qty,totalPrice});
    addPop("Add",id);
  }
  else{
    existingIndex.qty = existingIndex.qty+1;
    existingIndex.totalPrice = existingIndex.totalPrice + sellingPrice;
  }
  localStorage.setItem("CartProducts",JSON.stringify(arrLocalStorage));

};
