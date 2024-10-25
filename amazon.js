import { cart } from "../data/cart.js";
import { products } from "../data/product.js";
import{formatCurrency} from './utilis/money.js';

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
  <div class="product-container">
  <div class="product-image-container">
    <img
      class="product-image"
      src="${product.image}"/>
      
    
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
  $${formatCurrency(product.priceCents)}
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
  data-product-id="${product.id}">
  Add to Cart</button>
</div>
    `;
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      console.log("Product ID clicked: ", productId);
      addToCart(productId);
      updateCartQuantity();
    });
  });
});

function addToCart(productId) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
    console.log("Updated matching items: ", matchingItem);
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
    console.log("Added new item to cart: ", cart);
  }
}

function updateCartQuantity() {
  let cartQuantity = cart.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );

  const cartQuantityElement = document.querySelector(".js-cart-quantity");

  if (cartQuantityElement) {
    cartQuantityElement.textContent = cartQuantity; // Update the cart quantity display
    console.log("Updated cart quantity: ", cartQuantityElement.textContent); // Log for verification
  } else {
    console.error("Cart quantity element not found!"); // Error if element is not found
  }
}
