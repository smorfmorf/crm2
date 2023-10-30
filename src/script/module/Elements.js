//chekbox
const checkbox = document.querySelector(".modal__checkbox");
const inputDiscount = document.querySelector(".modal__input_discount");

//modal
const overlay = document.querySelector(".overlay");
const btn = document.querySelector(".panel__add-goods");
const overlay_modal_button = document.querySelector(".panel__add-goods");
const form_id = document.querySelector(".vendor-code__id");
const modal__totalPrice = document.querySelector(".modal__total-price");
const form = document.querySelector(".modal__form");
const count = document.getElementById("count");
const price = document.getElementById("price");
const discount = document.getElementById("discount_input");

//image
const imageConainer = document.querySelector(".image_upload");

//pages
const sub_pages = document.querySelector(".sub-panel__pages");
const sub_choice_pages = document.querySelector(".sub-panel__choice-pages");

//table
const tableBody = document.querySelector(".table__body");
const cms = document.querySelector(".table__body");
const cms__totalPrice = document.querySelector(".cms__total-price");

export {
  checkbox,
  inputDiscount,
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
  imageConainer,
  sub_pages,
  sub_choice_pages,
};
