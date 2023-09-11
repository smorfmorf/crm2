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
      <button class="table__btn table__btn_pic" data-pic="../../img/forest.jpg"></button>
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

    tableBody.append(tempDiv);
  });
}

//*Открываем новое окно с картинкой
function openImageInNewWindow(event) {
  const target = event.target;
  const imageUrl = target.getAttribute("data-pic");

  if (imageUrl) {
    const windowHeight = 600; // Высота окна
    const windowWidth = 800; // Ширина окна
    const top = (screen.height - windowHeight) / 2;
    const left = (screen.width - windowWidth) / 2;

    // Открываем новое окно браузера
    window.open(
      imageUrl,
      "_blank",
      `width=${windowWidth}, height=${windowHeight}, top=${top}, left=${left}`
    );
  }
}

function initTable() {
  renderGoodsTable();

  // Найти все кнопки с классом table_btn_pic и добавить обработчик события на клик
  const picButtons = document.querySelectorAll(".table__btn_pic");
  picButtons.forEach((button) => {
    button.addEventListener("click", openImageInNewWindow);
  });

  //! Добавляем новый слушатель
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
