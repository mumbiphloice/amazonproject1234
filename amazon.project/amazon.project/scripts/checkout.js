
import { renderOrderSummary } from "./utilis/checkout/orderSummary.js";
import { renderPaymentSummary } from "./utilis/checkout/paymentSummary.js";

document.addEventListener("DOMContentLoaded", () => {
renderOrderSummary();
renderPaymentSummary();

});