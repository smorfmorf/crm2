// checkbox.js
import { checkbox, inputDiscount, discount } from "./Elements.js";

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    inputDiscount.disabled = false;
    inputDiscount.value = discount.value;
  } else {
    inputDiscount.value = "";
    inputDiscount.disabled = true;
  }
});
