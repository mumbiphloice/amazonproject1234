
import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/product.js";
import { formatCurrency } from "../utilis/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from "./paymentSummary.js";

// Render the order summary with cart details
export function renderOrderSummary() {
  const today = dayjs();  // Initialize 'today' with the current date
  let cartSummaryHTML = ""; // Initialize cartSummaryHTML inside the function

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    // Use getProduct function from products
    const matchingProduct = getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    if (matchingProduct && deliveryOption) {
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">Delivery date: ${dateString}</div>
          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}" alt="${matchingProduct.name}" />
            <div class="cart-item-details">
              <div class="product-name">${matchingProduct.name}</div>
              <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
              <div class="product-quantity">
                <span> Quantity: <span class="quantity-label">${cartItem.quantity}</span> </span>
                <span class="update-quantity-link link-primary">Update</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
              </div>
            </div>
            <div class="delivery-options">
              <div class="delivery-options-title">Choose a delivery option:</div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
          </div>
        </div>
      `;
    } else {
      console.error('No matching product or delivery option found for product ID:', productId);
    }
  });

  // Ensure `.js-order-summary` exists in the DOM
  const orderSummaryElement = document.querySelector(".js-order-summary");
  if (orderSummaryElement) {
    orderSummaryElement.innerHTML = cartSummaryHTML;
  } else {
    console.error('Element with class `.js-order-summary` not found.');
  }

  // Attach event listeners after rendering the summary
  attachEventListeners();
}

// Generate HTML for delivery options for each product
function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const deliveryDate = dayjs().add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}" />
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} Shipping</div>
        </div>
      </div>
    `;
  });

  return html;
}

// Attach event listeners for delete and delivery option change actions
function attachEventListeners() {
  // Delete product from cart
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      if (container) {
        container.remove();
        renderPaymentSummary();
      }
    });
  });

  // Update delivery option for product
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary(); // Re-render to reflect changes
      renderPaymentSummary();
    });
  });
}

// Initial rendering of the order summary
renderOrderSummary();
