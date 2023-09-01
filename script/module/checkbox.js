// checkbox.js

const checkbox = document.querySelector(".modal__checkbox");
const fieldNearCheckbox = document.querySelector(".modal__input_discount");

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    fieldNearCheckbox.disabled = false;
  } else {
    fieldNearCheckbox.value = "";
    fieldNearCheckbox.disabled = true;
  }
});
