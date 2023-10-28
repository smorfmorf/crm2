// checkbox.js
import { checkbox, fieldNearCheckbox, discount } from "./Elements.js";

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    fieldNearCheckbox.disabled = false;
    fieldNearCheckbox.value = discount.value;
  } else {
    fieldNearCheckbox.value = "";
    fieldNearCheckbox.disabled = true;
  }
});
