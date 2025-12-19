export const addPop = (event, id) => {
  const popupDiv = document.createElement("div");
  popupDiv.classList.add("popup");
  console.log(popupDiv);
  
  if (event == "Add") {
    popupDiv.innerText= "Product Added to Cart Successfully !";
  } else {
    popupDiv.innerText= "Product removed from Cart !";
  }
  document.body.appendChild(popupDiv);

  setTimeout(()=>{
    popupDiv.remove();
  },2000)
};
