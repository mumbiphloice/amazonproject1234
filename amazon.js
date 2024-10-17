import { cart } from "../data/cart.js";

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
  <div class="product-container">
  <div class="product-image-container">
    <img
      class="product-image"
      src="${product.image}">
      
    />
  </div>

  <div class="product-name">
   ${product.name}
  </div>
  <div class="product-rating-container">
    <img
      class="product-rating-stars"
      src="https://github.com/SuperSimpleDev/javascript-course/blob/main/2-copy-of-code/lesson-13/images/ratings/rating-25.png?raw=true"
      alt="Rating"
    />
    <div class="product-rating-count">${product.rating.count}</div>
  </div>
  <div class="product-price">
  ${(product.priceCents / 100).toFixed(2)}
  </div>
  <div class="product-quantity-container">
    <label>Quantity:</label>
    <input type="number" min="1" value="1" />
  </div>
  <div class="added-to-cart">
    <img
      src="https://github.com/SuperSimpleDev/javascript-course/blob/main/2-copy-of-code/lesson-13/images/icons/cart-icon.png?raw=true"
      alt="Check Icon"
    />
    Added to cart
  </div>
  <button class="add-to-cart-button
  button-primary js-add-to-cart"
  data-product-name="${product.name}">
  Add to Cart</button>
</div>
    `;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    button.dataset;
    const productName = button.dataset.productName;

    let matchingItem;

    cart.forEach((item) => {
      if (productName === item.productName) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        productName: productName,
        quantity: 1,
      });
    }

    console.log(cart);
  });
});
