// modal.js

import { addGoods, goodsArray } from "./data.js";
import { initTable, cmsTotalPrce } from "./table.js";

const overlay = document.querySelector(".overlay");
const btn = document.querySelector(".panel__add-goods");

btn.addEventListener("click", () => {
  overlay.classList.add("active");
});

overlay.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("overlay") || target.closest(".modal__close")) {
    overlay.classList.remove("active");
  }
});

function formControl() {
  const modal__totalPrice = document.querySelector(".modal__total-price");
  const form = document.querySelector(".modal__form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const obj = Object.fromEntries(formData);
    addGoods(obj);
    initTable(); // Перерисовать таблицу после добавления товара
    cmsTotalPrce();
    form.reset();
    modal__totalPrice.textContent = 0;
    overlay.classList.remove("active");
  });

  modal__totalPrice.textContent = 0 + "$";
  const count = document.getElementById("count");
  const price = document.getElementById("price");

  count.addEventListener("input", () => {
    // Добавляем слушатель для поля количества
    updateTotalPrice(); // Вызываем функцию обновления цены
  });

  price.addEventListener("input", () => {
    // Добавляем слушатель для поля цены
    updateTotalPrice(); // Вызываем функцию обновления цены
  });

  function updateTotalPrice() {
    const newPrice = parseFloat(price.value);
    const newCount = parseFloat(count.value);

    if (!isNaN(newPrice) && !isNaN(newCount)) {
      const totalPrice = newPrice * newCount;
      modal__totalPrice.textContent = totalPrice + "$";
    }
  }
}

const overlay_modal_button = document.querySelector(".panel__add-goods");
overlay_modal_button.addEventListener("click", () => {
  const form_id = document.querySelector(".vendor-code__id");
  form_id.textContent = goodsArray.length + 1;
});

window.addEventListener("click", () => {
  console.log("click");
});

export { formControl };
