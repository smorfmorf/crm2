//chekbox
const checkbox = document.querySelector(".modal__checkbox");
const fieldNearCheckbox = document.querySelector(".modal__input_discount");

//modal
const overlay = document.querySelector(".overlay");
const btn = document.querySelector(".panel__add-goods");
const overlay_modal_button = document.querySelector(".panel__add-goods");
const form_id = document.querySelector(".vendor-code__id");
const modal__totalPrice = document.querySelector(".modal__total-price");
const form = document.querySelector(".modal__form");
const count = document.getElementById("count");
const price = document.getElementById("price");
const discount = document.getElementById("discount");

//table
const tableBody = document.querySelector(".table__body");
const cms = document.querySelector(".table__body");
const cms__totalPrice = document.querySelector(".cms__total-price");

export {
  checkbox,
  fieldNearCheckbox,
  overlay,
  btn,
  form_id,
  modal__totalPrice,
  overlay_modal_button,
  form,
  count,
  price,
  tableBody,
  cms,
  cms__totalPrice,
  discount,
};
