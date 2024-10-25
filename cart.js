
export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: '1'
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart)); // Corrected the comma
}

export function addToCart(productId) {
  let matchingItem = cart.find((cartItem) => productId === cartItem.productId);

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart; // Moved this outside of the loop
  saveToStorage(); // Called saveToStorage after modifying cart
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem = cart.find((cartItem) => productId === cartItem.productId);

  if (matchingItem) { // Check if matchingItem is found
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
}
