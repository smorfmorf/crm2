// modal.js

import { addGoods } from "./data.js";
import { initTable, cmsTotalPrce } from "./table.js";

import {
  overlay,
  btn,
  overlay_modal_button,
  form_id,
  modal__totalPrice,
  form,
  count,
  price,
} from "./Elements.js";

btn.addEventListener("click", () => {
  overlay.classList.add("active");
});

overlay.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("overlay") || target.closest(".modal__close")) {
    overlay.classList.remove("active");
  }
});

let uniqueId = null;

overlay_modal_button.addEventListener("click", () => {
  uniqueId = Date.now();
  //!id - формы
  form_id.textContent = uniqueId;
});

function formControl() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const obj = Object.fromEntries(formData);
    fetch("https://elegant-proud-car.glitch.me/api/goods", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          //генерировать ошибку, которая будет передана в catch()
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        alert("goods", response);
      })
      .catch((err) => {
        alert(`Ошибка ${err.message}`);
      });
    addGoods(obj, uniqueId);
    initTable(); // Перерисовать таблицу после добавления товара
    cmsTotalPrce();
    form.reset();
    modal__totalPrice.textContent = 0;
    overlay.classList.remove("active");
  });

  modal__totalPrice.textContent = 0 + "$";

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

export default formControl;
