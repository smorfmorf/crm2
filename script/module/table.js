// table.js

import { goodsArray, removeGoodsById, calculateTotalPrice } from "./data.js";
import { tableBody, cms, cms__totalPrice } from "./Elements.js";

function createRow(obj) {
  const row = `     <tr>
    <td class="table__cell">${obj.id}</td>
    <td class="table__cell table__cell_left table__cell_name" data-id="${
      obj.id
    }">
      <span class="table__cell-id">id: ${
        obj.order === undefined ? obj.id : obj.order
      }</span>
      ${obj.title}
    </td>
    <td class="table__cell table__cell_left">${obj.category}</td>
    <td class="table__cell">${obj.units}</td>
    <td class="table__cell">${obj.count}</td>
    <td class="table__cell">${obj.price}</td>
    <td class="table__cell">${obj.count * obj.price}</td>
    <td class="table__cell table__cell_btn-wrapper">
      <button class="table__btn table__btn_pic"></button>
      <button class="table__btn table__btn_edit"></button>
      <button class="table__btn table__btn_del"></button>
    </td>
  </tr>`;

  return row;
}

function renderGoodsTable() {
  tableBody.innerHTML = ""; // Очистить таблицу перед перерисовкой

  goodsArray.forEach((item) => {
    const rowHTML = createRow(item);
    const tempDiv = document.createElement("tr");
    tempDiv.innerHTML = rowHTML;
    tableBody.appendChild(tempDiv);
  });
}

function initTable() {
  renderGoodsTable();

  //! Добавляем новый слушатель  тут код закоментирован
  cms.addEventListener("click", handleDeleteButtonClick);
}

function handleDeleteButtonClick(event) {
  const target = event.target;
  if (target.closest(".table__btn_del")) {
    const tr = target.closest("tr");
    const data = tr.querySelector(".table__cell_name");
    const id = parseInt(data.dataset.id);
    //удаляем из массива объектов данные товара
    removeGoodsById(id);
    //удаляем строку товара из таблицы
    tr.remove();
    //пересчитываем сумму товаров в таблице
    cmsTotalPrce();
  }
}
function cmsTotalPrce() {
  cms__totalPrice.textContent = calculateTotalPrice();
}

export { initTable, cmsTotalPrce };
