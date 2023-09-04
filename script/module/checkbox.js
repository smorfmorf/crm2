// checkbox.js
import { checkbox, fieldNearCheckbox } from "./Elements.js";

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    fieldNearCheckbox.disabled = false;
  } else {
    fieldNearCheckbox.value = "";
    fieldNearCheckbox.disabled = true;
  }
});
