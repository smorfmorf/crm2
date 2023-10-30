// table.js
import { goodsArray, removeGoodsById } from "./data.js";
import {
  tableBody,
  cms,
  cms__totalPrice,
  overlay,
  discount,
  inputDiscount,
  imageConainer,
} from "./Elements.js";

function createRow(obj) {
  const row = `     <tr>
    <td class="table__cell">${obj.NumberId}</td>
    <td class="table__cell table__cell_left table__cell_name"  data-id="${
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

    <td class="table__cell">${(
      obj.price *
      (1 - obj.discount / 100)
    ).toFixed()}</td>

    <td class="table__cell">${(
      obj.count *
      obj.price *
      (1 - obj.discount / 100)
    ).toFixed()}</td>

    <td class="table__cell table__cell_btn-wrapper">
      <button class="table__btn table__btn_pic" data-pic="${obj.id}"></button>
      <button class="table__btn table__btn_edit"></button>
      <button class="table__btn table__btn_del"></button>
    </td>
  </tr>`;

  return row;
}

function changeOverlay(item) {
  overlay.classList.add("active");
  const formid = document.querySelector(".vendor-code__id");
  formid.textContent = item.id;
  const formPrice = document.querySelector(".modal__total-price");
  formPrice.textContent =
    (item.price * item.count * (1 - item.discount / 100)).toFixed() + "$";

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
  const discountInput = form.querySelector("#discount_input");
  discountInput.value = item.discount;
  const countInput = form.querySelector("#count");
  countInput.value = item.count;
  const priceInput = form.querySelector("#price");
  priceInput.value = item.price;

  const img = new Image();
  img.src = `http://localhost:3000/${item.image}`;
  imageConainer.innerHTML = "";
  imageConainer.append(img);

  if (img.src === "http://localhost:3000/image/notimage.jpg") {
    imageConainer.textContent = "изобраение не найдено";
  }

  discount.checked = item.discount;
  inputDiscount.disabled = item.discount ? false : true;
  inputDiscount.value = item.discount ? item.discount : "";

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
    item.discount = form.discount.value;

    fetch(`http://localhost:3000/api/goods/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

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

function addItemRender(obj, uniqueId) {
  console.log("obj: ", obj);
  obj.id = uniqueId;
  const maxOrder = goodsArray.reduce(
    (max, item) => (item.NumberId > max ? item.NumberId : max),
    0
  );
  obj.NumberId = maxOrder;
  console.log(obj);
  goodsArray.push(obj);

  const rowHTML = createRow(obj);
  const tempDiv = document.createElement("tr");
  tempDiv.innerHTML = rowHTML;

  const btn = tempDiv.querySelector(".table__btn_edit");
  btn.addEventListener("click", () => {
    changeOverlay(obj);
  });

  tableBody.append(tempDiv);

  cmsTotalPrce();
}

//*Открываем новое окно с картинкой
function openImageInNewWindow(event) {
  const target = event.target;
  const imageId = target.getAttribute("data-pic");

  const item = goodsArray.find((item) => item.id === imageId);
  // const imgString = `/assets/${imageId}.jpg`;

  const imgString = `http://localhost:3000/${item.image}`;

  if (imgString) {
    const windowHeight = 600; // Высота окна
    const windowWidth = 800; // Ширина окна
    const top = (screen.height - windowHeight) / 2;
    const left = (screen.width - windowWidth) / 2;
    // Открываем новое окно браузера
    window.open(
      imgString,
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

    const item = goodsArray.find((item) => item.NumberId == id);
    console.log("id: ", id);
    //удаляем из массива объектов данные товара
    removeGoodsById(item.NumberId);
    //удаляем строку товара из таблицы
    tr.remove();
    //пересчитываем сумму товаров в таблице
    cmsTotalPrce();

    fetch(`http://localhost:3000/api/goods/${item.id}`, {
      method: "DELETE",
    });
  }
}

function cmsTotalPrce() {
  fetch("http://localhost:3000/api/total")
    .then((res) => res.json())
    .then((data) => (cms__totalPrice.textContent = data));
  // cms__totalPrice.textContent = calculateTotalPrice().toFixed();
}

export { initTable, cmsTotalPrce, addItemRender };
