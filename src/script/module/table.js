// table.js
import { goodsArray, removeGoodsById, calculateTotalPrice } from "./data.js";
import { tableBody, cms, cms__totalPrice, overlay } from "./Elements.js";

function createRow(obj) {
  const row = `     <tr>
    <td class="table__cell">${obj.NumberId}</td>
    <td class="table__cell table__cell_left table__cell_name" data-id="${
      obj.NumberId
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

function changeOverlay(item) {
  overlay.classList.add("active");

  const form = document.querySelector(".modal__form");
  const close = form.querySelector(".modal__submit");
  close.remove();

  const titleInput = form.querySelector("#name");
  titleInput.value = item.title;
  const categoryInput = form.querySelector("#category");
  categoryInput.value = item.category;
  const descriptionTextarea = form.querySelector("#description");
  descriptionTextarea.value = item.description;
  const unitsInput = form.querySelector("#units");
  unitsInput.value = item.units;
  const discountInput = form.querySelector("#discount");
  discountInput.value = item.discount;
  const countInput = form.querySelector("#count");
  countInput.value = item.count;
  const priceInput = form.querySelector("#price");
  priceInput.value = item.price;

  const footer = document.querySelector(".modal__footer");
  const div = document.createElement("div");
  div.textContent = "Изменить";
  div.classList.add("modal__submit");
  footer.append(div);

  div.addEventListener("click", () => {
    item.title = form.title.value;
    item.category = form.category.value;
    item.description = form.description.value;
    item.units = form.units.value;
    item.count = form.count.value;
    item.price = form.price.value;

    renderGoodsTable();
    form.reset();
    overlay.classList.remove("active");
  });
}

function renderGoodsTable() {
  tableBody.innerHTML = ""; // Очистить таблицу перед перерисовкой

  goodsArray.forEach((item) => {
    const rowHTML = createRow(item);

    const tempDiv = document.createElement("tr");
    tempDiv.innerHTML = rowHTML;

    //кнопка change
    const btn = tempDiv.querySelector(".table__btn_edit");
    btn.addEventListener("click", () => {
      changeOverlay(item);
    });

    tableBody.append(tempDiv);
  });

  cmsTotalPrce();
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
  cms.addEventListener("click", DeleteItem);
}

function DeleteItem(event) {
  const target = event.target;
  if (target.closest(".table__btn_del")) {
    const tr = target.closest("tr");
    const data = tr.querySelector(".table__cell_name");
    const id = parseInt(data.dataset.id);
    console.log("id: ", id);
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
