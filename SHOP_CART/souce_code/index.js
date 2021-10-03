window.addEventListener("load", function ()
{
  // numbers products in slider
  const numItemInSlide = 6;
  //list products
  const slideProducts = document.querySelector(".slide-products");
  // 1 products
  const sliderItems = document.querySelectorAll(".item-product");
  // 2 button change slider
  const nextBtn = document.querySelector(".slider-next");
  const prevBtn = document.querySelector(".slider-prev");

  const dotItems = document.querySelectorAll(".slider-dot-item");

  // width 1 product
  const sliderItemWidth = sliderItems[0].offsetWidth;
  console.log(sliderItemWidth);
  // numbers products
  const slidesLength = sliderItems.length;

  // width list
  const widthSlide = document.querySelector(".related-products").offsetWidth;

  // spacing 2 products
  const spaceItem =
    (widthSlide - numItemInSlide * sliderItemWidth) / (numItemInSlide - 1);

  console.log(spaceItem);
  let positionX = 0;
  let index = 0;
  nextBtn.addEventListener("click", function () {
    handleChangeSlide(1);
  });
  prevBtn.addEventListener("click", function () {
    handleChangeSlide(-1);
  });

  [...dotItems].forEach((item) =>
    item.addEventListener("click", function (e) {
      [...dotItems].forEach((el) => el.classList.remove("active"));
      e.target.classList.add("active");
      const slideIndex = parseInt(e.target.dataset.index);
      index = slideIndex;
      positionX = -1 * index * (sliderItemWidth + spaceItem);
      slideProducts.style = `transform: translateX(${positionX}px)`;
    })
  );

  function handleChangeSlide(status) {
    if (status === 1) {
      if (index >= slidesLength - numItemInSlide) {
        index = slidesLength - numItemInSlide;
        return;
      }
      positionX = positionX - (sliderItemWidth + spaceItem);
      slideProducts.style = `transform: translateX(${positionX}px)`;
      index++;
    } else if (status === -1) {
      if (index <= 0) {
        index = 0;
        return;
      }
      positionX = positionX + (sliderItemWidth + spaceItem);
      slideProducts.style = `transform: translateX(${positionX}px)`;
      index--;
    }
    [...dotItems].forEach((el) => el.classList.remove("active"));
    dotItems[index].classList.add("active");
  }

  ///// Code collapse
    const errorLists = document.querySelectorAll(".error-img");
    const itemInCart = document.querySelector(".item-in-cart");
    // console.log(typeof itemInCart.innerText);
    let total = parseInt(itemInCart.innerText);
    errorLists.forEach((item) => item.addEventListener("click", function (e)
    {   
        e.target.parentNode.parentNode.remove();
        total--;
        itemInCart.innerText = total.toString();
    }))
});
