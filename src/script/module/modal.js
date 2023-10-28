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
  discount,
  inputDiscount,
} from "./Elements.js";

btn.addEventListener("click", () => {
  overlay.classList.add("active");
  form.reset();
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
    fetch("http://localhost:3000/api/goods", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
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

  discount.addEventListener("change", () => {
    updateTotalPrice();
  });

  inputDiscount.addEventListener("input", () => {
    updateTotalPrice();
  });

  function updateTotalPrice() {
    const newPrice = parseFloat(price.value);
    const newCount = parseFloat(count.value);

    const skidka = discount.checked ? inputDiscount.value : "0";
    inputDiscount.value = discount.checked ? inputDiscount.value : "";

    console.log("skidka: ", skidka);
    if (!isNaN(newPrice) && !isNaN(newCount)) {
      const totalPrice = newPrice * newCount - skidka;
      modal__totalPrice.textContent = totalPrice + "$";
    }
  }
}

export default formControl;
